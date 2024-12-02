import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TOAST_OPTIONS = {
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showToastError = (message: string) => {
  toast.error(message || "An error occurred. Please try again.", TOAST_OPTIONS);
};

export const showToastSuccess = (message: string) => {
  toast.success(message || "Operation completed successfully.", TOAST_OPTIONS);
};
