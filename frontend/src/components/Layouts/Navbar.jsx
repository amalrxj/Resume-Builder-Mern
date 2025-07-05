import { Link } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  return (
    <div
      className="h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-4 sticky top-0 z-30"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard" className="flex items-center gap-2">
          <h2 className="text-lg md:text-xl font-medium text-black leading-3">
            Resume Builder
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
