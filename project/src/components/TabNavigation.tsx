import React from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  handlePrevious: () => void;
  handleSave: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  tabsCompleted: {
    tab1: boolean;
    tab2: boolean;
    tab3: boolean;
    tab4: boolean;
    tab5: boolean;
  };
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  handlePrevious,
  handleSave,
  handleNext,
  handleSubmit,
  tabsCompleted,
}) => {
  // Determine if Previous button should be disabled
  const isPreviousDisabled = activeTab === 'tab1';
  
  // Determine if Next button should be disabled
  const getNextDisabled = () => {
    switch (activeTab) {
      case 'tab1': return !tabsCompleted.tab1;
      case 'tab2': return !tabsCompleted.tab2;
      case 'tab3': return !tabsCompleted.tab3;
      case 'tab4': return !tabsCompleted.tab4;
      case 'tab5': return false; // On the last tab, Next is always disabled
      default: return false;
    }
  };
  
  // Determine if Save button should be disabled (never disabled)
  const isSaveDisabled = false;
  
  // Determine if we're on the last tab
  const isLastTab = activeTab === 'tab5';
  
  return (
    <div className="flex justify-between mt-8 gap-4">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          isPreviousDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <ChevronLeft size={18} />
        Previous
      </button>
      
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaveDisabled}
        className="flex items-center gap-2 px-6 py-2 bg-[#9b1c1c] text-white rounded-lg transition-all duration-200 hover:bg-[#8e1818]"
      >
        <Save size={18} />
        Save
      </button>
      
      {isLastTab ? (
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg transition-all duration-200 hover:bg-green-700"
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          disabled={getNextDisabled()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            getNextDisabled()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#9b1c1c] text-white hover:bg-[#8e1818]'
          }`}
        >
          Next
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
};

export default TabNavigation;