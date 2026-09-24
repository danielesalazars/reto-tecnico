import React from "react";

interface JsonEditorCardProps {
  title: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  loading?: boolean;
  isError?: boolean;
}

export const JsonEditorCard: React.FC<JsonEditorCardProps> = ({
  title,
  value,
  onChange,
  readOnly = false,
  placeholder,
  buttonText,
  onButtonClick,
  loading = false,
  isError = false,
}) => {
  return (
    <div className="flex flex-col h-full bg-white p-5 rounded-2xl shadow-md border border-gray-200">
      <label className="block text-base font-semibold text-gray-800 mb-3">
        {title}
      </label>

      <textarea
        className={`w-full h-[480px] p-4 border rounded-xl font-mono text-sm focus:ring-2 focus:outline-none transition resize-y ${
          isError
            ? "border-red-400 bg-red-50 text-red-900"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        } ${readOnly ? "bg-gray-900 text-green-400" : "bg-white text-gray-800"}`}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
      />

      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition disabled:bg-blue-300 shadow-sm cursor-pointer"
        >
          {loading ? "Procesando..." : buttonText}
        </button>
      )}
    </div>
  );
};
export default JsonEditorCard;
