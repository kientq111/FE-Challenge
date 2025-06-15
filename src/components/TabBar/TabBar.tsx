import React from "react";
import "./tab-bar.scss";

export type Tab = {
  id: string;
  label: string;
  icon?: string;
};

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => {
  return (
    <nav className={`tab-bar ${className}`}>
      <div className="tab-bar__container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-bar__tab ${
              activeTab === tab.id ? "tab-bar__tab--active" : ""
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon && <span className="tab-bar__tab-icon">{tab.icon}</span>}
            <span className="tab-bar__tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabBar;
