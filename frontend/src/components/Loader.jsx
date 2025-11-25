import React from "react";

const Loader = ({ label = "Analyzing code..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-blue-500 animate-bounce" />
        <div className="h-3 w-3 rounded-full bg-sky-400 animate-bounce [animation-delay:0.15s]" />
        <div className="h-3 w-3 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.3s]" />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
};

export default Loader;
