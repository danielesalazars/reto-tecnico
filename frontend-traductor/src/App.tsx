import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TranslatePage } from "./pages/translate.page";

export function App() {
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
}

export default App;
