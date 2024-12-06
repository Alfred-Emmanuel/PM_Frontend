import { FC, PropsWithChildren } from "react";

interface CustomModalProps {
  // isVisible: boolean;
  onClose: () => void;
  className?: string;
}

const CustomModal: FC<PropsWithChildren<CustomModalProps>> = ({
  // isVisible,
  onClose,
  className,
  children,
}) => {
  // if (!isVisible) return null;

  return (
    <div className={className}>
      <div className="flex flex-col justify-start ">
        {children}
        <button
          className=" mt-2 bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
