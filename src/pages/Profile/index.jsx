import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FoLayout from "@/components/FoLayout";
import { useTranslation } from "react-i18next";
const Profile = () => {
   const { t } = useTranslation();
   const location = useLocation();
   useEffect(() => {
     // 在這裡可以根據location來進行相應的處理，例如顯示不同的內容等
     console.log("Current location:", location.pathname);
   }, [location]);
  return (
    <FoLayout>
      <div>profile</div>
    </FoLayout>
  );
};

export default Profile;
