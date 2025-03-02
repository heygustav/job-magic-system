
import React from "react";
import ProfileLoader from "@/components/profile/ProfileLoader";
import ProfileContainer from "@/components/profile/ProfileContainer";
import { useProfileData } from "@/hooks/useProfileData";

// Define the type for the form data
export interface PersonalInfoFormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
  education: string;
  skills: string;
}

const Profile: React.FC = () => {
  const {
    formData,
    setFormData,
    isLoading,
    isProfileLoading,
    handleChange,
    handleSubmit,
  } = useProfileData();

  if (isProfileLoading) {
    return <ProfileLoader />;
  }

  return (
    <ProfileContainer
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      setFormData={setFormData}
      isLoading={isLoading}
    />
  );
};

export default Profile;
