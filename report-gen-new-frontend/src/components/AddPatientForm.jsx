import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PersonalDetailsTab from "./PersonalDetailsTab";
import TestInformationTab from "./TestInformationTab";
import VerbalTestsTab from "./VerbalTestsTab";
import PerformanceTestsTab from "./PerformanceTestsTab";
import RecommendationsTab from "./RecommendationsTab";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm();
  const [age, setAge] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [tqScore, setTqScore] = useState(null);

  const onSubmit = async (data) => {
    const hasVocabulary = data.vocabulary?.trim() !== "";
    const hasDigitSpan = data.digitSpan?.trim() !== "";
  
    if ((hasVocabulary && hasDigitSpan) || (!hasVocabulary && !hasDigitSpan)) {
      setError("vocabulary", {
        type: "manual",
        message: "Please fill either Vocabulary or Digit Span (not both or none)",
      });
      return;
    }
  
    // Fetch TQ score from backend
    try {
      const response = await fetch(`/getTQScore?age=${age}&section=${data.class}&name=${data.name}&raw_score=${data.vocabulary || data.digitSpan}`);
      const result = await response.json();
      if (response.ok) {
        setTqScore(result.tq_score);
      } else {
        setTqScore(null);
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error fetching TQ score:', error);
    }
  
    // Store data in localStorage
    localStorage.setItem('patientData', JSON.stringify(data));
  
    // continue with valid data
    console.log(data);
  };
  

  // Function to calculate age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      setAge(age - 1);
    } else {
      setAge(age);
    }
  };

  const handleCheckboxChange = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      setValue("vocabulary", "");
      setValue("digitSpan", "");
    } else {
      setSelectedOption(option);
      // Clear the other field when switching options
      if (option === "vocabulary") {
        setValue("digitSpan", ""); // Clear Digit Span if Vocabulary is selected
      } else {
        setValue("vocabulary", ""); // Clear Vocabulary if Digit Span is selected
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f1f1f1] to-[#e5e5e5] flex flex-col items-center justify-start px-0 py-12">
      {/* Tab Headers (Sticky without white background) */}
      <div className="w-full flex justify-center space-x-8 border-b border-gray-300 pb-4 sticky top-0 z-10 bg-gradient-to-b from-[#f1f1f1] to-[#e5e5e5]">
        <button
          type="button"
          className={`w-full py-2 text-lg font-semibold text-[#9b1c1c] ${
            activeTab === "tab1" ? "border-b-2 border-[#9b1c1c]" : "text-gray-600"
          } transition-colors duration-200 hover:text-[#9b1c1c]`}
          onClick={() => setActiveTab("tab1")}
        >
          Personal Details
        </button>
        <button
          type="button"
          className={`w-full py-2 text-lg font-semibold text-[#9b1c1c] ${
            activeTab === "tab2" ? "border-b-2 border-[#9b1c1c]" : "text-gray-600"
          } transition-colors duration-200 hover:text-[#9b1c1c]`}
          onClick={() => setActiveTab("tab2")}
        >
          Test Information
        </button>
        <button
          type="button"
          className={`w-full py-2 text-lg font-semibold text-[#9b1c1c] ${
            activeTab === "tab3" ? "border-b-2 border-[#9b1c1c]" : "text-gray-600"
          } transition-colors duration-200 hover:text-[#9b1c1c]`}
          onClick={() => setActiveTab("tab3")}
        >
          Verbal Tests
        </button>
        <button
          type="button"
          className={`w-full py-2 text-lg font-semibold text-[#9b1c1c] ${
            activeTab === "tab4" ? "border-b-2 border-[#9b1c1c]" : "text-gray-600"
          } transition-colors duration-200 hover:text-[#9b1c1c]`}
          onClick={() => setActiveTab("tab4")}
        >
          Performance Tests
        </button>
        <button
          type="button"
          className={`w-full py-2 text-lg font-semibold text-[#9b1c1c] ${
            activeTab === "tab5" ? "border-b-2 border-[#9b1c1c]" : "text-gray-600"
          } transition-colors duration-200 hover:text-[#9b1c1c]`}
          onClick={() => setActiveTab("tab5")}
        >
          Recommendations
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full flex flex-col items-center px-4 py-8 space-y-6 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-6">
          {activeTab === "tab1" && (
            <PersonalDetailsTab 
              register={register} 
              errors={errors} 
              setValue={setValue} 
              calculateAge={calculateAge} 
              age={age} 
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "tab2" && (
            <TestInformationTab 
              register={register} 
              errors={errors} 
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "tab3" && (
            <VerbalTestsTab 
              register={register} 
              errors={errors} 
              selectedOption={selectedOption} 
              handleCheckboxChange={handleCheckboxChange} 
              setActiveTab={setActiveTab} 
              setValue={setValue} // Pass setValue here
            />
          )}
          {activeTab === "tab4" && (
            <PerformanceTestsTab 
              register={register} 
              errors={errors} 
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "tab5" && (
            <RecommendationsTab 
              register={register} 
              errors={errors} 
              setActiveTab={setActiveTab}
            />
          )}
          {/* Display TQ Score if available */}
          {tqScore !== null && (
            <div className="mt-4">
              <p className="text-lg font-semibold">TQ Score: {tqScore}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TabForm;
