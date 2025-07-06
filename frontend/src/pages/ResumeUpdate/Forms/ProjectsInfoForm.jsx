import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuTrash, LuPlus } from "react-icons/lu";

const ProjectsInfoForm = ({
  projectsInfo,
  addArrayItem,
  updateArrayitem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {projectsInfo.map((project, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg border-gray-200/80 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="Project Title"
                  placeholder="Enter project title"
                  type="text"
                  value={project.title || ""}
                  onChange={(e) => {
                    updateArrayitem(index, "title", e.target.value);
                  }}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  placeholder="Short description of the project"
                  className="form-input w-full mt-1"
                  rows={3}
                  value={project.description || ""}
                  onChange={(e) => {
                    updateArrayitem(index, "description", e.target.value);
                  }}
                ></textarea>
              </div>
              <Input
                label="Project Link"
                placeholder="Enter project link"
                type="url"
                value={project.github || ""}
                onChange={(e) => {
                  updateArrayitem(index, "github", e.target.value);
                }}
              />
              <Input
                label="Live Link"
                placeholder="Enter live project link"
                type="url"
                value={project.liveDemo || ""}
                onChange={(e) => {
                  updateArrayitem(index, "liveDemo", e.target.value);
                }}
              />
            </div>
            {projectsInfo.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 bg-purple-100 text-sm text-purple-800 font-medium rounded hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              title: "",
              description: "",
              github: "",
              liveDemo: "",
            })
          }
        >
          <LuPlus /> Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsInfoForm;
