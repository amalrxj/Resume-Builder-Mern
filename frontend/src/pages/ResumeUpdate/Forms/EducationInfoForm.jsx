import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuTrash, LuPlus } from "react-icons/lu";

const EducationInfoForm = ({
  educationInfo,
  addArrayItem,
  updateArrayitem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Education Information
      </h2>
      <div className="mt-4 flex flex-col gap-4 mb-3">
        {educationInfo.map((education, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg border-gray-200/80 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Degree"
                onChange={(e) => {
                  updateArrayitem(index, "degree", e.target.value);
                }}
                placeholder="Enter your degree"
                type="text"
                value={education.degree || ""}
              />
              <Input
                label="Institution"
                onChange={(e) => {
                  updateArrayitem(index, "institution", e.target.value);
                }}
                placeholder="Enter institution name"
                type="text"
                value={education.institution || ""}
              />
              <Input
                label="Start Date"
                onChange={(e) => {
                  updateArrayitem(index, "startDate", e.target.value);
                }}
                placeholder="Enter start date"
                type="month"
                value={education.startDate || ""}
              />
              <Input
                label="End Date"
                onChange={(e) => {
                  updateArrayitem(index, "endDate", e.target.value);
                }}
                placeholder="Enter end date"
                type="month"
                value={education.endDate || ""}
              />
            </div>
            {educationInfo.length > 1 && (
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
          onClick={() => {
            addArrayItem({
              degree: "",
              institution: "",
              startDate: "",
              endDate: "",
            });
          }}
        >
          <LuPlus /> Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationInfoForm;
