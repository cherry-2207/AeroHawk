import React from "react";

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    // The className from Header will set height/width of this container
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      <span className="font-bold text-xl text-white">AeroHawk</span>
    </div>
  );
};

export default Logo;
