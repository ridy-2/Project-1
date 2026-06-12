import { toast } from "react-toastify";

export const toastSuccess = (message) =>
  toast.success(message, { position: "top-right", autoClose: 2000 });

export const toastError = (message) =>
  toast.error(message, { position: "top-right", autoClose: 2000 });