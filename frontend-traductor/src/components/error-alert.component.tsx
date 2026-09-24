import React from "react";

interface ErrorAlertProps {
  title?: string;
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = "Error de Validación:",
  message,
}) => {
  if (!message) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-sm font-mono text-xs whitespace-pre-wrap">
      <strong className="font-bold block mb-1">{title}</strong>
      {message}
    </div>
  );
};
export default ErrorAlert;
