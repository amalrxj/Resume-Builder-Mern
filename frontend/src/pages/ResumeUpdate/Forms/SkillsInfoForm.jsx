import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuTrash, LuPlus } from "react-icons/lu";

const SkillsInfoForm = ({
  skillsInfo,
  addArrayItem,
  updateArrayitem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className=" text-lg font-semibold text-gray-900 ">
        Skills Information
      </h2>
      <div className="">
        {skillsInfo.map((skill, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg border-gray-200/80 relative"
          >
            <Input
              label="Skill"
              onChange={(e) => {
                updateArrayitem(index, "skill", e.target.value);
              }}
              placeholder="Enter your skill"
              type="text"
              value={skill.skill || ""}
            />
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
          className="self-start flex items-center gap-2 px-4 py-2 bg-purple-100 text-sm font-medium rounded hover:bg-purple-200 cursor-pointer"
          onClick={() => {
            addArrayItem({
              skill: "",
            });
          }}
        >
          <LuPlus />
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default SkillsInfoForm;
