
import React from "react";
import { JobPosting } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Calendar, Trash2, FileText, Link, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { da } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";

interface JobListComponentProps {
  jobPostings: JobPosting[];
  isDeleting: boolean;
  onJobDelete: (id: string) => void;
}

const JobListComponent: React.FC<JobListComponentProps> = ({
  jobPostings,
  isDeleting,
  onJobDelete,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, session, user } = useAuth();

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true,
        locale: da 
      });
    } catch (error) {
      return "Ukendt dato";
    }
  };

  const formatDeadline = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString('da-DK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "-";
    }
  };

  const handleCreateApplication = (job: JobPosting) => {
    if (!isAuthenticated || !session) {
      localStorage.setItem('redirectAfterLogin', `/cover-letter/generator?jobId=${job.id}&step=1&direct=true`);
      toast({
        title: "Log ind kræves",
        description: "Du skal være logget ind for at oprette en ansøgning.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    navigate(`/cover-letter/generator?jobId=${job.id}&step=1&direct=true`);
  };
  
  const handleEditJob = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  if (jobPostings.length === 0) {
    return null; // Empty state handled by parent
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Stilling</TableHead>
            <TableHead className="text-left">Virksomhed</TableHead>
            <TableHead className="text-left">Oprettet</TableHead>
            <TableHead className="text-left">Frist</TableHead>
            <TableHead className="text-left">Handlinger</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobPostings.map((job) => (
            <TableRow key={job.id} className="border-b-0">
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{formatDate(job.created_at)}</TableCell>
              <TableCell>{formatDeadline(job.deadline)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleCreateApplication(job)}
                    title="Opret ansøgning"
                    aria-label="Opret ansøgning for dette job"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditJob(job.id)}
                    title="Rediger jobopslag"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {job.url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => window.open(job.url, "_blank")}
                      title="Åbn jobopslag"
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onJobDelete(job.id)}
                    disabled={isDeleting}
                    title="Slet jobopslag"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobListComponent;
