
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { JobPosting } from "../lib/types";
import { JobFormData } from "@/services/coverLetter/types";
import UrlField from "./job-form/UrlField";
import JobDescriptionField from "./job-form/JobDescriptionField";
import JobInfoFields from "./job-form/JobInfoFields";
import SubmitButton from "./job-form/SubmitButton";
import { useTimer } from "./job-form/useTimer";
import { useJobExtraction } from "./job-form/useJobExtraction";
import { useNavigate } from "react-router-dom";

interface JobPostingFormProps {
  onSubmit: (jobData: JobFormData) => void;
  onSave?: (jobData: JobFormData) => Promise<void>;
  initialData?: JobPosting;
  isLoading?: boolean;
}

const JobPostingForm: React.FC<JobPostingFormProps> = ({
  onSubmit,
  onSave,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || "",
    company: initialData?.company || "",
    description: initialData?.description || "",
    contact_person: initialData?.contact_person || "",
    url: initialData?.url || "",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { elapsed, formattedTime, resetTimer } = useTimer(isLoading);
  const { isExtracting, extractInfoFromDescription } = useJobExtraction(formData, setFormData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.company || !formData.description) {
      toast({
        title: "Manglende information",
        description: "Udfyld venligst som minimum jobtitel, virksomhed og beskrivelse",
        variant: "destructive",
      });
      return;
    }

    resetTimer();
    onSubmit(formData);
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.company || !formData.description) {
      toast({
        title: "Manglende information",
        description: "Udfyld venligst som minimum jobtitel, virksomhed og beskrivelse",
        variant: "destructive",
      });
      return;
    }

    if (onSave) {
      try {
        setIsSaving(true);
        await onSave(formData);
        toast({
          title: "Jobopslag gemt",
          description: "Dit jobopslag er blevet gemt. Du kan generere en ansøgning senere.",
        });
        navigate("/dashboard");
      } catch (error) {
        console.error("Error saving job posting:", error);
        toast({
          title: "Fejl ved gem",
          description: "Der opstod en fejl under gem af jobopslaget.",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UrlField 
        value={formData.url} 
        onChange={handleChange} 
        disabled={isLoading || isSaving} 
      />

      <div className="space-y-4">
        <JobDescriptionField 
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading || isSaving}
          onExtract={extractInfoFromDescription}
          isExtracting={isExtracting}
        />

        <JobInfoFields 
          title={formData.title}
          company={formData.company}
          contactPerson={formData.contact_person}
          onChange={handleChange}
          disabled={isLoading || isSaving}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading || isSaving}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2" />
              Gemmer...
            </span>
          ) : (
            "Gem til senere"
          )}
        </button>
        
        <SubmitButton 
          isLoading={isLoading} 
          elapsedTime={formattedTime}
          className="flex-1"
        />
      </div>
    </form>
  );
};

export default JobPostingForm;
