import React from "react";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
      <div
        className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            {showActionBtn && (
              <button
                className="btn-small-light mr-12"
                onClick={() => onActionClick()}
              >
                {actionBtnIcon && <img src={actionBtnIcon} alt="Action Icon" />}
                {actionBtnText}
              </button>
            )}
          </div>
        )}
        <button
          className="text-gray-400 hover:bg-gray-200 bg-transparent rounded-lg hover:text-gray-900 text-sm w-8 h-8 absolute top-2 right-2 flex items-center justify-center"
          type="button "
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
