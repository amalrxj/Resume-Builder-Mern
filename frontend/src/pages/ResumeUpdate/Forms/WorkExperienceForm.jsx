import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const WorkExperienceForm = ({
  workExperience,
  updateArrayitem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className=" px-5 pt-5 ">
      <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {workExperience.map((experience, index) => (
          <div
            className="border border-gray-200 rounded-md p-4 relative"
            key={index}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company"
                placeholder="ABC Corp"
                type="text"
                value={experience.company || ""}
                onChange={({ target }) =>
                  updateArrayitem(index, "company", target.value)
                }
              />
              <Input
                label="Role"
                placeholder="Software Engineer"
                type="text"
                value={experience.role || ""}
                onChange={({ target }) =>
                  updateArrayitem(index, "role", target.value)
                }
              />
              <Input
                label="Start Date"
                type="month"
                value={experience.startDate || ""}
                onChange={({ target }) =>
                  updateArrayitem(index, "startDate", target.value)
                }
              />
              <Input
                label="End Date"
                type="month"
                value={experience.endDate || ""}
                onChange={({ target }) =>
                  updateArrayitem(index, "endDate", target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className=" text-xs font-medium text-slate-600 ">
                Description
              </label>
              <textarea
                placeholder="Describe your responsibilities in this role."
                className="form-input w-full mt-1"
                rows={3}
                value={experience.description || ""}
                onChange={({ target }) =>
                  updateArrayitem(index, "description", target.value)
                }
              />
            </div>
            {workExperience.length > 1 && (
              <button
                type="button"
                className="absolute top-3 right-3 p-1 text-sm text-red-600 hover:underline cursor-pointer"
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="self-start flex items-center gap-2 px-4 py-2 rounded text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
          onClick={() =>
            addArrayItem({
              company: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          <LuPlus className="w-4 h-4" />
          Add Work Experience
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
