import React from "react";
import { useState } from "react";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password || password.length < 8) {
      setError("Please enter a valid password (min 8 characters)");
      return;
    }

    setError("");

    // signup api call
    try {
      console.log("Signup API call with", {
        fullName,
        email,
        password,
        profileImageUrl,
      });
    } catch (error) {
      setError("Something went wrong. Please try again.", error);
    }
  };
  return (
    <div className=" w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black ">Create an account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today and start your journey with us.
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector setImage={setProfilePic} image={profilePic} />

        <div className=" grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            id="full-name"
            name="full-name"
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
          />
          <Input
            id="email"
            name="email"
            label="Email Address"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            id="password"
            name="password"
            label="Password"
            placeholder="Min 8 Characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {error && (
            <p className="text-red-500 text-xs pb-2.5" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <p className="text-xs text-slate-800 mt-3">
            Already have an account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
