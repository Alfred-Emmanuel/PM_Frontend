import React, { useState } from "react";

interface AddItemButtonProps {
  buttonText: string;
  placeholder: string;
  confirmButtonText: string;
  onConfirm: (value: string) => void;
  customInputContainerClass?: string;
  customButtonClass?: string;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({
  buttonText,
  placeholder,
  confirmButtonText,
  onConfirm,
  customInputContainerClass,
  customButtonClass,
}) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (inputValue.trim()) {
      onConfirm(inputValue);
      setInputValue("");
      setIsInputVisible(false);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      {/* Button to toggle input */}
      {!isInputVisible && (
        <button
          onClick={() => setIsInputVisible(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-gray-600"
        >
          <span className="mr-2 text-lg">+</span> {buttonText}
        </button>
      )}

      {/* Input and confirm button */}
      {isInputVisible && (
        <div
          className={
            customInputContainerClass
              ? customInputContainerClass
              : "flex items-center space-x-2"
          }
        >
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 bg-primary text-white"
          />
          <button
            onClick={handleConfirm}
            className={
              customButtonClass
                ? customButtonClass
                : "px-4 py-2 bg-teal-400 text-black rounded-lg hover:bg-teal-500"
            }
          >
            {confirmButtonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddItemButton;
