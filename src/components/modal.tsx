import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string; // For custom styles
  height?: string; // e.g., "300px"
  width?: string; // e.g., "400px"
  //   parentRef?: React.RefObject<HTMLElement>; // Reference to the parent container
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  className = "",
  height = "200px",
  width = "300px",
  //   parentRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  //   useEffect(() => {
  //     if (parentRef?.current && modalRef.current && isVisible) {
  //       const parentRect = parentRef.current.getBoundingClientRect();
  //       const modalHeight = parseInt(height, 10);

  //       // Determine where to position the modal
  //       if (window.innerHeight - parentRect.bottom > modalHeight) {
  //         setPosition("bottom");
  //       } else if (parentRect.top > modalHeight) {
  //         setPosition("top");
  //       } else {
  //         setPosition("bottom"); // Default to bottom if no space
  //       }
  //     }
  //   }, [isVisible, parentRef, height]);

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`relative ${className}`}
        ref={modalRef}
        style={{
          height,
          width,
          position: "absolute",
          top: position === "top" ? "unset" : undefined,
          bottom: position === "bottom" ? "unset" : undefined,
          transform: position === "top" ? "translateY(-100%)" : "translateY(0)",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
