
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobPostingForm from "../components/JobPostingForm";
import CoverLetterPreview from "../components/CoverLetterPreview";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { GenerationStatus } from "../components/GenerationStatus";
import ErrorDisplay from "../components/ErrorDisplay";
import { useAuth } from "@/components/AuthProvider";
import { useCoverLetterGeneration } from "@/hooks/useCoverLetterGeneration";
import { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const CoverLetterGenerator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId");
  const letterId = searchParams.get("letterId");
  const { session } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { toast } = useToast();
  
  // Convert Supabase user to our app's User type
  const user: User | null = session?.user ? {
    id: session.user.id,
    email: session.user.email || "",
    name: session.user.user_metadata?.name || "", // Get name from metadata if available
    profileComplete: false // Default value
  } : null;

  const {
    step,
    isGenerating,
    isLoading,
    loadingState,
    generationPhase,
    generationProgress,
    selectedJob,
    generatedLetter,
    generationError,
    setStep,
    fetchJob,
    fetchLetter,
    handleJobFormSubmit,
    handleEditLetter,
    handleSaveLetter,
    resetError,
  } = useCoverLetterGeneration(user);

  useEffect(() => {
    let mounted = true;
    
    const initializeGenerator = async () => {
      try {
        if (user) {
          if (jobId) {
            console.log("Initializing generator with jobId:", jobId);
            const job = await fetchJob(jobId);
            
            // If the job exists but there's no letter, we'll stay on step 1
            // and let the user click generate to create a letter
            console.log("Job fetched, checking for any existing letters");
          } else if (letterId) {
            console.log("Initializing generator with letterId:", letterId);
            await fetchLetter(letterId);
          }
        }
      } catch (error) {
        console.error("Error initializing generator:", error);
        if (mounted) {
          toast({
            title: "Fejl ved indlæsning",
            description: "Der opstod en fejl under indlæsning af data.",
            variant: "destructive",
          });
        }
      } finally {
        if (mounted) {
          setIsInitialLoading(false);
        }
      }
    };

    initializeGenerator();
    
    return () => {
      mounted = false;
    };
  }, [user, jobId, letterId, fetchJob, fetchLetter, toast]);

  // Determine loading state - either initial loading or generation in progress
  const showLoadingSpinner = isInitialLoading || isLoading;

  // Get appropriate loading message
  const getLoadingMessage = () => {
    if (isGenerating && generationProgress?.message) {
      return generationProgress.message;
    }
    if (isGenerating) {
      if (generationPhase === 'user-fetch') return "Henter brugerdata...";
      if (generationPhase === 'job-save') return "Gemmer jobdetaljer...";
      if (generationPhase === 'generation') return "Genererer ansøgning...";
      if (generationPhase === 'letter-save') return "Gemmer ansøgning...";
      return "Genererer ansøgning...";
    }
    if (loadingState === "saving") return "Gemmer ændringer...";
    if (loadingState === "initializing") return "Indlæser data...";
    return "Indlæser jobinformation...";
  };

  // Show loading state when initializing or generating
  if (showLoadingSpinner) {
    const progressValue = generationProgress?.progress || 0;
    console.log("Showing loading spinner with progress:", progressValue);
    return <LoadingSpinner message={getLoadingMessage()} progress={progressValue} />;
  }

  console.log("Rendering state:", { 
    step, 
    generatedLetter: generatedLetter?.id, 
    selectedJob: selectedJob?.id, 
    generationError,
    phase: generationPhase,
    progress: generationProgress
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900">
              {step === 1 ? "Indtast jobdetaljer" : "Din ansøgning"}
            </h1>
            <p className="mt-1 text-sm sm:text-lg text-gray-600">
              {step === 1
                ? "Angiv information om jobbet, du søger"
                : "Gennemgå og rediger din AI-genererede ansøgning"}
            </p>
          </div>
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black w-full sm:w-auto"
            >
              Rediger jobdetaljer
            </button>
          )}
        </div>

        {/* Error message section */}
        {generationError && (
          <ErrorDisplay
            title="Der opstod en fejl"
            message={generationError}
            onRetry={resetError}
            phase={generationPhase as any}
          />
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          {step === 1 ? (
            <div className="p-4 sm:p-6">
              <JobPostingForm
                onSubmit={handleJobFormSubmit}
                initialData={selectedJob || undefined}
                isLoading={isGenerating}
              />
              {isGenerating && (
                <GenerationStatus 
                  phase={generationPhase || 'generation'} 
                  progress={generationProgress?.progress || 0}
                  message={generationProgress?.message}
                  onRetry={resetError}
                />
              )}
            </div>
          ) : (
            <div className="p-4 sm:p-6">
              {generatedLetter && selectedJob ? (
                <CoverLetterPreview
                  content={generatedLetter.content}
                  jobTitle={selectedJob.title}
                  company={selectedJob.company}
                  onEdit={handleEditLetter}
                  onSave={handleSaveLetter}
                />
              ) : (
                <div className="text-left py-10">
                  <p className="text-gray-500">
                    Der opstod en fejl ved indlæsning af ansøgningen. Prøv igen.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Gå tilbage
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
