import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TranslatePage } from "../pages/translate.page";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/endorse/translate" element={<TranslatePage />} />
        <Route
          path="*"
          element={<Navigate to="/endorse/translate" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
