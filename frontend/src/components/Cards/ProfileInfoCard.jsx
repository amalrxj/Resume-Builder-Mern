import React from "react";
import { UserContext } from "../../context/user_Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem("token");
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          alt="image"
          className="w-10 h-10 bg-gray-300 rounded-full mr-3"
        />
        <div>
          <div className="font-bold leading-3 text-sm text-gray-800">
            {user.name || ""}
          </div>
          <button
            className="text-purple-500 text-sm font-medium cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
