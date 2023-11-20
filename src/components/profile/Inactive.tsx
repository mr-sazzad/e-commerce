import Loading from "@/app/Loading";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { setToLocalStorage } from "@/helpers/localStorage";
import { useGetCurrentUserQuery } from "@/redux/api/users/userApi";
import React from "react";

// ... (imports remain unchanged)

const Inactive = ({ setToggle }: { setToggle: (value: string) => void }) => {
  const currentUser = getUserFromLocalStorage() as any;
  const { data: user, isLoading } = useGetCurrentUserQuery(currentUser?.id);

  const handleEditModeOn = () => {
    setToLocalStorage("editMode", "active");
    setTimeout(() => {
      setToggle("active");
    }, 500);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-5">
      <p>👋 Hello,</p>
      <p className="ml-2">{user?.name}!</p>
      <p className="mt-5">
        Take a moment to ensure your information is up to date. Keeping your
        profile information accurate helps us serve you better and enhances your
        overall experience. We hope you are doing well and are enjoying your
        time on our platform. If you have any questions or need assistance,
        please don&lsquo;t hesitate to reach out to us. Thank you for being a
        part of our community!
      </p>
      <button
        className="px-4 py-2 mt-4 hover:text-white rounded-sm hover:bg-gray-700 transition-all duration-300 border border-gray-300"
        onClick={handleEditModeOn}
      >
        Update Profile
      </button>
    </div>
  );
};

export default Inactive;
