import React, { useState, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, setPreview, preview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (setPreview) {
      setPreview(null);
    }
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-50 relative cursor-pointer">
          <LuUser className="text-4xl text-purple-500" />
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-linear-to-r from-purple-500/85 to-purple-600  absolute -bottom-1 -right-1 cursor-pointer">
            <LuUpload
              className="text-white "
              onClick={onChooseFile}
              type="button"
            />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile Photo"
            className="w-20 h-20 rounded-full object-cover "
          />
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-red-500 absolute -bottom-1 -right-1 cursor-pointer"
            onClick={handleRemoveImage}
            type="button"
          >
            <LuTrash className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
