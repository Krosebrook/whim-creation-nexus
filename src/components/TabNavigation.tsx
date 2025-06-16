
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { designSystem, getIconContainerStyles } from '@/lib/design-system';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  color: 'green' | 'blue' | 'purple' | 'orange' | 'indigo';
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-white text-gray-800 shadow-md shadow-gray-200/60 border border-gray-200/80'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
            }`}
          >
            <IconComponent className={`w-4 h-4 mr-2 ${isActive ? `text-${tab.color}-600` : ''}`} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
