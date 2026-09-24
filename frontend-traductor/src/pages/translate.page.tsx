import React from "react";
import { TranslateScreen } from "../screens/translate.screen";

export const TranslatePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col justify-start py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-full mx-auto">
        <TranslateScreen />
      </div>
    </main>
  );
};
export default TranslatePage;
