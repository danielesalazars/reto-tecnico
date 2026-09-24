import { Routes, Route, Navigate } from "react-router-dom";
import { SiniestroPage } from "../pages/siniestro.page";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/siniestros/gestion" element={<SiniestroPage />} />
      <Route path="*" element={<Navigate to="/siniestros/gestion" replace />} />
    </Routes>
  );
};
