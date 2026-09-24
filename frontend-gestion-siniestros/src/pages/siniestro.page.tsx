import React from "react";
import { SiniestroGestionScreen } from "../screens/siniestro-gestion.screen";

export const SiniestroPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col justify-start py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-full mx-auto">
        <SiniestroGestionScreen />
      </div>
    </main>
  );
};
export default SiniestroPage;
