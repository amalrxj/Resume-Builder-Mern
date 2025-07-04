import React, { useState } from "react";
import { LuCheck, LuPencil } from "react-icons/lu";

const TitleInput = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {showInput ? (
        <>
          <input
            type="text"
            placeholder="Resume Title"
            className="text-sm md:text-lg bg-transparent outline-none text-black font-semibold border-b border-gray-300 pb-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="cursor-pointer">
            <LuCheck
              className="text-sm text-purple-600"
              onClick={() => setShowInput((prevState) => !prevState)}
            />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-sm md:text-lg font-semibold">{title}</h2>
          <button className="cursor-pointer">
            <LuPencil
              className="text-sm text-purple-600"
              onClick={() => setShowInput((prevState) => !prevState)}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default TitleInput;
