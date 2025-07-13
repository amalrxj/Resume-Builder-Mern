/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from "react-icons/lu";
import TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import StepProgress from "../../components/StepProgress";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationInfoForm from "./Forms/EducationInfoForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";
import CertificationsInfoForm from "./Forms/CertificationsInfoForm";
import ProjectsInfoForm from "./Forms/ProjectsInfoForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import { validateEmail } from "../../utils/helper";
import RenderResume from "../../components/ResumeTemplates/RenderResume";

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: "",
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        college: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateAndNext = (e) => {
    const errors = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push("Full Name is required.");
        if (!designation.trim()) errors.push("Designation is required.");
        if (!summary.trim()) errors.push("Summary is required.");
        break;
      }
      case "contact-info": {
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !validateEmail(email))
          errors.push("Email is required.");
        if (!phone.trim()) errors.push("Phone number is required.");
        break;
      }

      case "work-experience":
        {
          resumeData.workExperience.forEach(
            ({ company, role, startDate, endDate }, index) => {
              if (!company.trim())
                errors.push(
                  `Company name is required in work experience ${index + 1}.`
                );
              if (!role.trim())
                errors.push(
                  `Role is required in work experience ${index + 1}.`
                );
              if (!startDate || !endDate)
                errors.push(
                  `Start date and end date is required in work experience ${
                    index + 1
                  }.`
                );
            }
          );
        }
        break;

      case "education-info":
        {
          resumeData.education.forEach(
            ({ degree, institution, startDate, endDate }, index) => {
              if (!degree.trim())
                errors.push(`Degree is required in education ${index + 1}.`);
              if (!institution.trim())
                errors.push(`College is required in education ${index + 1}.`);
              if (!startDate || !endDate)
                errors.push(
                  `Start date and end date is required in education ${
                    index + 1
                  }.`
                );
            }
          );
        }
        break;

      case "skills":
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`Skill name is required in skill ${index + 1}.`);
          if (progress < 1 || progress > 100)
            errors.push(
              `Progress must be between 1 and 100 in skill ${index + 1}.`
            );
        });
        break;

      case "projects":
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Project title is required in project ${index + 1}.`);
          if (!description.trim())
            errors.push(
              `Project description is required in project ${index + 1}.`
            );
        });
        break;

      case "certifications":
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            errors.push(
              `Certification title is required in certification ${index + 1}.`
            );
          if (!issuer.trim())
            errors.push(`Issuer is required in certification ${index + 1}.`);
        });
        break;

      case "additionalInfo":
        if (resumeData.languages.length === 0) {
          !resumeData.languages[0].name?.trim();
        }
        {
          errors.push("At least one language is required.");
        }

        if (resumeData.interests.length === 0) {
          !resumeData.interests[0]?.trim();
        }
        {
          errors.push("At least one interest is required.");
        }
        break;

      default:
        break;
    }
    if (errors.length > 0) {
      setError(errors.join(", "));
      return;
    }
    setError("");
    goToNextStep(e);
  };

  const goToNextStep = (e) => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "additionalInfo") {
      setOpenPreviewModal(true);
      return;
    }
    const currentIndex = pages.indexOf(currentPage);
    if (currentPage !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = (e) => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );
      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => {
              updateSection("contactInfo", key, value);
            }}
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayitem={(index, key, value) => {
              updateArrayitem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("workExperience", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("workExperience", index);
            }}
          />
        );
      case "education-info":
        return (
          <EducationInfoForm
            educationInfo={resumeData?.education}
            updateArrayitem={(index, key, value) => {
              updateArrayitem("education", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("education", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("education", index);
            }}
          />
        );
      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayitem={(index, key, value) => {
              updateArrayitem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("skills", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("skills", index);
            }}
          />
        );
      case "projects":
        return (
          <ProjectsInfoForm
            projectsInfo={resumeData?.projects}
            updateArrayitem={(index, key, value) => {
              updateArrayitem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("projects", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("projects", index);
            }}
          />
        );
      case "certifications":
        return (
          <CertificationsInfoForm
            certificationsInfo={resumeData?.certifications}
            updateArrayitem={(index, key, value) => {
              updateArrayitem("certifications", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("certifications", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("certifications", index);
            }}
          />
        );
      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayitem={(section, index, key, value) =>
              updateArrayitem(section, index, key, value)
            }
            addArrayItem={(section, newIndex) =>
              addArrayItem(section, newIndex)
            }
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
          />
        );
      default:
        break;
    }
  };

  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateArrayitem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section], newItem];
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      // const updatedArray = prev[section].filter((_, i) => i !== index);
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );
      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;
        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled Resume",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interest: resumeInfo?.interest || prevState?.interest,
        }));
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while fetching resume details.");
      }
    }
  };

  const uploadResumeImages = async () => {};

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {};

  const handleDeleteResume = async () => {};

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeDownloadRef,
  });

  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({ ...prevState, title: value }))
            }
          />
          <div className="flex items-center gap-4">
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className="text-sm" />
              <span className="hidden md:block">Change Theme</span>
            </button>
            <button className="btn-small-light " onClick={handleDeleteResume}>
              <LuTrash2 className="text-sm" />
              <span className="hidden md:block">Delete </span>
            </button>
            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload className="text-sm" />
              <span className="hidden md:block">Preview & Download</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
            <StepProgress progress={0} />
            {renderForm()}

            <div className="mx-5">
              {error && (
                <div className="flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert className="text-md" />
                  {error}
                </div>
              )}
              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button
                  className="btn-small-light"
                  onClick={goBack}
                  disabled={loading}
                >
                  <LuArrowLeft className="text-md" />
                  Back
                </button>
                <button
                  className="btn-small-light"
                  onClick={uploadResumeImages}
                  disabled={loading}
                >
                  <LuSave className="text-md" />
                  {loading ? "Saving..." : "Save & Next"}
                </button>
                <button
                  className="btn-small"
                  onClick={validateAndNext}
                  disabled={loading}
                >
                  {currentPage === "additionalInfo" && (
                    <LuDownload className="text-md" />
                  )}
                  {currentPage === "additionalInfo"
                    ? "Preview & Download"
                    : "Next"}
                  {currentPage !== "additionalInfo" && (
                    <LuArrowLeft className="text-md rotate-180" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="h-[100vh]" ref={resumeRef}>
            <RenderResume
              templateId={resumeData?.template?.name || ""}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette || []}
              containerWidth={baseWidth}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;
