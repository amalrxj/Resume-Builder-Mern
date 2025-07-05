import React, { useContext } from "react";
import { UserContext } from "../../context/user_Context";
import Navbar from "./Navbar";

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);
  if (!user) return null;
  return (
    <div className="dashboard-layout">
      <Navbar activeMenu={activeMenu} />
      <div className="container mx-auto pt-4 pb-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
