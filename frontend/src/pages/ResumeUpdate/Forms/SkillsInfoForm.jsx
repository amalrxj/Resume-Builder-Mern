import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuTrash, LuPlus } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const SkillsInfoForm = ({
  skillsInfo,
  addArrayItem,
  updateArrayitem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-3">
      <h2 className=" text-lg font-semibold text-gray-900 ">
        Skills Information
      </h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {skillsInfo.map((skill, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg border-gray-200/80 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Skill"
                placeholder="Enter your skill"
                type="text"
                value={skill.name || ""}
                onChange={(e) => {
                  updateArrayitem(index, "skill", e.target.value);
                }}
              />
              <div className="flex flex-col">
                <label className="text-sm text-slate-700 mb-1">
                  Proficiency ({skill.progress / 20 || 0}/5)
                </label>
                <div className="mt-5">
                  <RatingInput
                    value={skill.progress || 0}
                    total={5}
                    onChange={(newValue) => {
                      updateArrayitem(index, "progress", newValue);
                    }}
                  />
                </div>
              </div>
            </div>

            {skillsInfo.length > 1 && (
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
          onClick={() =>
            addArrayItem({
              skill: "",
              progress: 0,
            })
          }
          className="self-start flex items-center gap-2 px-4 py-2 bg-purple-100 text-sm text-purple-800 font-medium rounded hover:bg-purple-200 cursor-pointer"
        >
          <LuPlus /> Add Skill
        </button>
      </div>
    </div>
  );
};

export default SkillsInfoForm;
