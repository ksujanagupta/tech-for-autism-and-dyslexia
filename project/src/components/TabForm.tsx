import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PersonalDetailsTab from "./tabs/PersonalDetailsTab";
import TestInformationTab from "./tabs/TestInformationTab";
import VerbalTestsTab from "./tabs/VerbalTestsTab";
import PerformanceTestsTab from "./tabs/PerformanceTestsTab";
import RecommendationsTab from "./tabs/RecommendationsTab";
import TabNavigation from "./TabNavigation";
import { checkTabCompletion } from "../utils/formValidation";
import { FormData } from "../types/formTypes";

const TabForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [age, setAge] = useState<number | null>(null);
  const [tqScores, setTqScores] = useState<Record<string, number | null>>({});
  const [tabsCompleted, setTabsCompleted] = useState({
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false,
    tab5: false,
  });

  // Load saved form data from localStorage
  const savedData = localStorage.getItem("patientData");
  const defaultValues = savedData ? JSON.parse(savedData) : {};

  const methods = useForm<FormData>({
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, watch, setValue, formState } = methods;

  // Watch all form fields to determine tab completion
  const formValues = watch();

  // Update tab completion status when form values change
  useEffect(() => {
    setTabsCompleted({
      tab1: checkTabCompletion("tab1", formValues),
      tab2: checkTabCompletion("tab2", formValues),
      tab3: checkTabCompletion("tab3", formValues),
      tab4: checkTabCompletion("tab4", formValues),
      tab5: checkTabCompletion("tab5", formValues),
    });
  }, [formValues]);

  // Calculate age when DOB changes
  useEffect(() => {
    if (formValues.dob) {
      const birthDate = new Date(formValues.dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge);
      setValue("age", calculatedAge);
    }
  }, [formValues.dob, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      // Save data to localStorage
      localStorage.setItem("patientData", JSON.stringify(data));
      console.log("Form submitted:", data);
      
      // Additional submit logic can be added here
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSave = () => {
    // Save current form state to localStorage
    const currentData = methods.getValues();
    localStorage.setItem("patientData", JSON.stringify(currentData));
    console.log("Data saved to localStorage");
  };

  // Navigation handlers
  const handlePrevious = () => {
    const currentTabNumber = parseInt(activeTab.replace("tab", ""));
    if (currentTabNumber > 1) {
      setActiveTab(`tab${currentTabNumber - 1}`);
    }
  };

  const handleNext = () => {
    const currentTabNumber = parseInt(activeTab.replace("tab", ""));
    if (currentTabNumber < 5) {
      setActiveTab(`tab${currentTabNumber + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f1f1f1] to-[#e5e5e5] flex flex-col items-center justify-start px-0 py-12">
      {/* Tab Headers */}
      <div className="w-full flex justify-center border-b border-gray-300 pb-4 sticky top-0 z-10 bg-gradient-to-b from-[#f1f1f1] to-[#e5e5e5] px-4">
        <div className="w-full max-w-4xl flex flex-wrap md:flex-nowrap">
          <button
            type="button"
            className={`w-full py-2 text-lg font-semibold text-[#9b1c1c] ${
              activeTab === "tab1" ? "border-b-2 border-[#9b1c1c]" : "text-gray-600"
            } transition-colors duration-200 hover:text-[#9b1c1c]`}
            onClick={() => handleTabChange("tab1")}
            disabled={false} // Personal details is always enabled
          >
            Personal Details
          </button>
          <button
            type="button"
            className={`w-full py-2 text-lg font-semibold ${
              activeTab === "tab2" ? "border-b-2 border-[#9b1c1c] text-[#9b1c1c]" : 
              tabsCompleted.tab1 ? "text-gray-600 hover:text-[#9b1c1c]" : "text-gray-400 cursor-not-allowed"
            } transition-colors duration-200`}
            onClick={() => handleTabChange("tab2")}
            disabled={!tabsCompleted.tab1}
          >
            Test Information
          </button>
          <button
            type="button"
            className={`w-full py-2 text-lg font-semibold ${
              activeTab === "tab3" ? "border-b-2 border-[#9b1c1c] text-[#9b1c1c]" : 
              tabsCompleted.tab2 ? "text-gray-600 hover:text-[#9b1c1c]" : "text-gray-400 cursor-not-allowed"
            } transition-colors duration-200`}
            onClick={() => handleTabChange("tab3")}
            disabled={!tabsCompleted.tab2}
          >
            Verbal Tests
          </button>
          <button
            type="button"
            className={`w-full py-2 text-lg font-semibold ${
              activeTab === "tab4" ? "border-b-2 border-[#9b1c1c] text-[#9b1c1c]" : 
              tabsCompleted.tab3 ? "text-gray-600 hover:text-[#9b1c1c]" : "text-gray-400 cursor-not-allowed"
            } transition-colors duration-200`}
            onClick={() => handleTabChange("tab4")}
            disabled={!tabsCompleted.tab3}
          >
            Performance Tests
          </button>
          <button
            type="button"
            className={`w-full py-2 text-lg font-semibold ${
              activeTab === "tab5" ? "border-b-2 border-[#9b1c1c] text-[#9b1c1c]" : 
              tabsCompleted.tab4 ? "text-gray-600 hover:text-[#9b1c1c]" : "text-gray-400 cursor-not-allowed"
            } transition-colors duration-200`}
            onClick={() => handleTabChange("tab5")}
            disabled={!tabsCompleted.tab4}
          >
            Recommendations
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full flex flex-col items-center px-4 py-8 space-y-6 mt-4">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-6">
            {activeTab === "tab1" && <PersonalDetailsTab age={age} setAge={setAge} />}
            {activeTab === "tab2" && <TestInformationTab />}
            {activeTab === "tab3" && <VerbalTestsTab age={age} tqScores={tqScores} setTqScores={setTqScores} />}
            {activeTab === "tab4" && <PerformanceTestsTab age={age} tqScores={tqScores} setTqScores={setTqScores} />}
            {activeTab === "tab5" && <RecommendationsTab />}

            {/* Tab Navigation */}
            <TabNavigation 
              activeTab={activeTab}
              handlePrevious={handlePrevious}
              handleSave={handleSave}
              handleNext={handleNext}
              handleSubmit={handleSubmit(onSubmit)}
              tabsCompleted={tabsCompleted}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TabForm;