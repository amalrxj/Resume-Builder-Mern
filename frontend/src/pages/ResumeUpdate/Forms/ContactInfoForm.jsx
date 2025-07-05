import React from "react";
import Input from "../../../components/Inputs/Input";

const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Contact Information
      </h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            label="Address"
            placeholder="Short Address"
            type="text"
            value={contactInfo?.location || ""}
            onChange={({ target }) => updateSection("location", target.value)}
          />
        </div>
        <Input
          label="Email"
          placeholder="john@gmail.com"
          type="email"
          value={contactInfo?.email || ""}
          onChange={({ target }) => updateSection("email", target.value)}
        />
        <Input
          label="Phone Number"
          placeholder="123-456-7890"
          type="tel"
          value={contactInfo?.phone || ""}
          onChange={({ target }) => updateSection("phone", target.value)}
        />
        <Input
          label="LinkedIn"
          placeholder="https://www.linkedin.com/in/yourprofile"
          type="url"
          value={contactInfo?.linkedin || ""}
          onChange={({ target }) => updateSection("linkedin", target.value)}
        />
        <Input
          label="GitHub"
          placeholder="https://github.com/yourusername"
          type="url"
          value={contactInfo?.github || ""}
          onChange={({ target }) => updateSection("github", target.value)}
        />
        <div className="md:col-span-2">
          <Input
            label="Website"
            placeholder="https://yourwebsite.com"
            type="url"
            value={contactInfo?.website || ""}
            onChange={({ target }) => updateSection("website", target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
