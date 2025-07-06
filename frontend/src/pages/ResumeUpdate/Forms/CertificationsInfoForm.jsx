import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuTrash, LuPlus } from "react-icons/lu";

const CertificationsInfoForm = ({
  certificationsInfo,
  addArrayItem,
  updateArrayitem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5">
      <h2 className=" text-lg font-semibold text-gray-900  ">Certifications</h2>
      <div className=" mt-4 flex flex-col gap-4 mb-3">
        {certificationsInfo.map((certification, index) => (
          <div
            className="border border-gray-200/80 p-4 rounded-lg relative"
            key={index}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Certification Name"
                placeholder="Enter certification name"
                type="text"
                value={certification.title || ""}
                onChange={(e) => {
                  updateArrayitem(index, "title", e.target.value);
                }}
              />
              <Input
                label="Issuing Organization"
                placeholder="Enter issuing organization"
                type="text"
                value={certification.issuer || ""}
                onChange={(e) => {
                  updateArrayitem(index, "issuer", e.target.value);
                }}
              />
              <Input
                label="Issue Date"
                placeholder="Enter issue date"
                type="date"
                value={certification.year || ""}
                onChange={(e) => {
                  updateArrayitem(index, "year", e.target.value);
                }}
              />
            </div>
            {certificationsInfo.length > 1 && (
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
              issuer: "",
              year: "",
            })
          }
        >
          <LuPlus />
          Add Certification
        </button>
      </div>
    </div>
  );
};

export default CertificationsInfoForm;
