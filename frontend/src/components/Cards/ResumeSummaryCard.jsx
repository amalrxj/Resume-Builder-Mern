import React, { useEffect, useState } from "react";
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color || "#ffffff");
        })
        .catch((err) => {
          setBgColor("#ffffff");
          console.error("Error fetching image color:", err);
        });
    }
  }, [imgUrl]);

  return (
    <div
      className="h-[300px] md:h-[350px] flex flex-col items-center justify-between rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer"
      style={{ backgroundColor: bgColor }}
      onClick={onSelect}
    >
      <div className="p-4 w-full flex items-center justify-center h-[250px]">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt="Resume preview"
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
            No Preview
          </div>
        )}
      </div>
      <div className="w-full bg-white px-4 py-3">
        <h5 className="text-sm font-medium truncate">{title}</h5>
        <p className="text-xs font-medium text-gray-600 mt-0.5">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
