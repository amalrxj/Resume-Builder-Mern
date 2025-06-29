import React from "react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/Inputs/Input";
import { useNavigate } from "react-router-dom";

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });
      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while creating the resume.");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[70vw] p-7 flex flex-col justify-center ">
      <h3 className="text-lg font-semibold text-black">Create New Resume</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Give your resume a title to get started.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label="Resume Title"
          placeholder="John's Resume"
          type="text"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
