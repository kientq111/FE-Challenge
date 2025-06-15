import React from "react";
import "./ViewToggle.scss";

interface ViewToggleProps {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onViewModeChange,
  className = "",
}) => {
  return (
    <div className={`view-toggle ${className}`}>
      <button
        className={`view-toggle__button ${
          viewMode === "list" ? "view-toggle__button--active" : ""
        }`}
        onClick={() => onViewModeChange("list")}
        aria-label="List view"
      >
        <span className="view-toggle__icon">☰</span>
      </button>
      <button
        className={`view-toggle__button ${
          viewMode === "grid" ? "view-toggle__button--active" : ""
        }`}
        onClick={() => onViewModeChange("grid")}
        aria-label="Grid view"
      >
        <span className="view-toggle__icon">⊞</span>
      </button>
    </div>
  );
};

export default ViewToggle;
