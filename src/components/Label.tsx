import React from "react";

const Label = ({ label }: { label: string }) => {
  return (
    <div className="flex gap-10 justify-between">
      <label htmlFor="input" className="text-green-600 font-extrabold text-2xl">
        {label}
      </label>
    </div>
  );
};

export default Label;
