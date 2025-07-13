import React from "react";
import {
  LuMail,
  LuPhone,
  LuMapPinHouse,
  LuUser,
  LuRss,
  LuGithub,
  LuMap,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import LanguageSection from "../ResumeSections/languageSection";
import { formatYearMonth } from "../../utils/helper";
import WorkExperience from "../ResumeSections/WorkExperience";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ color, text }) => {
  return (
    <div className="relative w-fit mb-2.5">
      <span
        className="absolute bottom-0 left-0 w-full h-1.5"
        style={{ backgroundColor: color }}
      ></span>
      <h2 className={`relative text-sm font-bold`}>{text}</h2>
    </div>
  );
};

const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth, baseWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-3 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      <div className="grid grid-cols-12 gap-8">
        <div
          className="col-span-4 py-10"
          style={{ backgroundColor: themeColors[0] }}
        >
          <div className="flex flex-col items-center px-2">
            <div
              className="w-[100px] h-[100px] max-w-[110px] max-h-[110px] flex items-center justify-center rounded-full"
              style={{ backgroundColor: themeColors[1] }}
            >
              {resumeData.profileInfo.profilePreviewUrl ? (
                <img
                  src={resumeData.profileInfo.profilePreviewUrl}
                  className="w-[90px] h-[90px] rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full"
                  style={{ color: themeColors[1] }}
                >
                  <LuUser />
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold mt-3">
              {resumeData.profileInfo.fullName}
            </h2>
            <p className="text-sm text-center">
              {resumeData.profileInfo.designation}
            </p>
          </div>
          <div className="my-6 mx-6">
            <div className="flex flex-col gap-4">
              <ContactInfo
                icon={<LuMapPinHouse />}
                iconBG={themeColors[2]}
                value={resumeData?.contactInfo?.location || ""}
              />
              <ContactInfo
                icon={<LuMail />}
                iconBG={themeColors[2]}
                value={resumeData?.contactInfo?.email || ""}
              />
              <ContactInfo
                icon={<LuPhone />}
                iconBG={themeColors[2]}
                value={resumeData?.contactInfo?.phone || ""}
              />
              {resumeData?.contactInfo?.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.linkedin || ""}
                />
              )}
              {resumeData?.contactInfo?.website && (
                <ContactInfo
                  icon={<LuRss />}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.website || ""}
                />
              )}
              {resumeData?.contactInfo?.github && (
                <ContactInfo
                  icon={<LuGithub />}
                  iconBG={themeColors[2]}
                  value={resumeData?.contactInfo?.github || ""}
                />
              )}
            </div>

            <div className="mt-5">
              <Title text="Education" color={themeColors[1]} />
              {resumeData.education.map((edu, index) => (
                <EducationInfo
                  key={`education_${index}`}
                  degree={edu.degree}
                  institution={edu.institution}
                  duration={`${formatYearMonth(
                    edu.startDate
                  )} - ${formatYearMonth(edu.endDate)}`}
                />
              ))}
            </div>

            <div className="mt-5">
              <Title text="Languages" color={themeColors[1]} />
              <LanguageSection
                languages={resumeData.languages}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
              />
            </div>
          </div>
        </div>
        <div className="col-span-8 pt-10 mr-10 pb-5">
          <div>
            <Title text="Summary" color={themeColors[1]} />
            <p className="text-sm font-medium">
              {resumeData.profileInfo.summary}
            </p>
          </div>
          <div className="mt-4">
            <Title text="Work Experience" color={themeColors[1]} />
            {resumeData.workExperience.map((work, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={work.company}
                role={work.role}
                duration={`${formatYearMonth(
                  work.startDate
                )} - ${formatYearMonth(work.endDate)}`}
                durationColor={themeColors[4]}
                description={work.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
