import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SiniestroPage } from "./pages/siniestro.page";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/siniestros/gestion" element={<SiniestroPage />} />
        <Route
          path="*"
          element={<Navigate to="/siniestros/gestion" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
