import React from "react";
import "./Load.css";

const Load = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="load">
      <div className="spinner"></div>
    </div>
  );
};

export default Load;
