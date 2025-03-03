
import React from "react";

export interface ProfileHeaderProps {
  title?: string;
  subtitle?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  title = "Min Profil", 
  subtitle = "Administrer dine personoplysninger og indstillinger"
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default ProfileHeader;
