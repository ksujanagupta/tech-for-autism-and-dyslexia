// src/components/VerbalTestsTab.jsx
import React from "react";
import { useForm } from "react-hook-form";

const VerbalTestsTab = ({ register, errors, selectedOption, handleCheckboxChange, setActiveTab, setValue }) => {
  // Add state to hold the calculated scores
  const [tqScores, setTqScores] = React.useState({
    information: "",
    comprehension: "",
    arithmetic: "",
    similarities: "",
    vocabulary: "",
    digitSpan: "",
  });
  const [averageIQ, setAverageIQ] = React.useState("");

  const handleCalculate = () => {
    // Add your calculation logic here
    console.log("Calculating based on Verbal Tests...");

    // Example calculation for TQ scores and average IQ
    // const informationScore = parseFloat(getValues("information")) || 0;
    // const comprehensionScore = parseFloat(getValues("comprehension")) || 0;
    // const arithmeticScore = parseFloat(getValues("arithmetic")) || 0;
    // const similaritiesScore = parseFloat(getValues("similarities")) || 0;
    // const vocabularyScore = parseFloat(getValues("vocabulary")) || 0;
    // const digitSpanScore = parseFloat(getValues("digitSpan")) || 0;

    // // Calculate TQ scores (example logic)
    // setTqScores({
    //   information: (informationScore * 1.5).toFixed(2), // Example multiplier
    //   comprehension: (comprehensionScore * 1.5).toFixed(2),
    //   arithmetic: (arithmeticScore * 1.5).toFixed(2),
    //   similarities: (similaritiesScore * 1.5).toFixed(2),
    //   vocabulary: (vocabularyScore * 1.5).toFixed(2),
    //   digitSpan: (digitSpanScore * 1.5).toFixed(2),
    // });

    // // Calculate average IQ (example logic)
    // const totalScore = informationScore + comprehensionScore + arithmeticScore + similaritiesScore + vocabularyScore + digitSpanScore;
    // const averageScore = totalScore / 6; // Assuming 6 scores
    // setAverageIQ((averageScore * 10).toFixed(2)); // Example IQ calculation
  };

  return (
    <div className="space-y-6">
      {/* Raw Scores and TQ Scores Table */}
      <div className="grid grid-cols-2 gap-4">
        {/* Information */}
        <div className="flex flex-col">
          <label htmlFor="information" className="text-base font-medium text-gray-700">Information</label>
          <input
            id="information"
            type="number"
            placeholder="Enter information score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("information", { required: "Information is required" })}
          />
          {errors.information && <p className="text-sm text-red-500 mt-1">{errors.information.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Information Score</label>
          <input
            type="text"
            value={tqScores.information}
            readOnly
            placeholder="TQ Information Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>

        {/* Comprehension */}
        <div className="flex flex-col">
          <label htmlFor="comprehension" className="text-base font-medium text-gray-700">Comprehension</label>
          <input
            id="comprehension"
            type="number"
            placeholder="Enter comprehension score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("comprehension", { required: "Comprehension is required" })}
          />
          {errors.comprehension && <p className="text-sm text-red-500 mt-1">{errors.comprehension.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Comprehension Score</label>
          <input
            type="text"
            value={tqScores.comprehension}
            readOnly
            placeholder="TQ Comprehension Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>

        {/* Arithmetic */}
        <div className="flex flex-col">
          <label htmlFor="arithmetic" className="text-base font-medium text-gray-700">Arithmetic</label>
          <input
            id="arithmetic"
            type="number"
            placeholder="Enter arithmetic score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("arithmetic", { required: "Arithmetic score is required" })}
          />
          {errors.arithmetic && <p className="text-sm text-red-500 mt-1">{errors.arithmetic.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Arithmetic Score</label>
          <input
            type="text"
            value={tqScores.arithmetic}
            readOnly
            placeholder="TQ Arithmetic Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>

        {/* Similarities */}
        <div className="flex flex-col">
          <label htmlFor="similarities" className="text-base font-medium text-gray-700">Similarities</label>
          <input
            id="similarities"
            type="number"
            placeholder="Enter similarities score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("similarities", { required: "Similarities score is required" })}
          />
          {errors.similarities && <p className="text-sm text-red-500 mt-1">{errors.similarities.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Similarities Score</label>
          <input
            type="text"
            value={tqScores.similarities}
            readOnly
            placeholder="TQ Similarities Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>
      </div>

      {/* Checkboxes for Vocabulary and Digit Span */}
      <div className="flex items-center space-x-3 mt-4">
        <input
          type="checkbox"
          id="vocabularyCheck"
          checked={selectedOption === "vocabulary"}
          onChange={() => handleCheckboxChange("vocabulary")}
        />
        <label htmlFor="vocabularyCheck" className="text-base">Vocabulary</label>
      </div>
      <div className="flex items-center space-x-3 mt-4">
        <input
          type="checkbox"
          id="digitSpanCheck"
          checked={selectedOption === "digitSpan"}
          onChange={() => handleCheckboxChange("digitSpan")}
        />
        <label htmlFor="digitSpanCheck" className="text-base">Digit Span</label>
      </div>

      {/* Raw Scores and TQ Scores for Vocabulary and Digit Span */}
      {selectedOption === "vocabulary" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="vocabulary" className="text-base font-medium text-gray-700">Vocabulary</label>
            <input
              id="vocabulary"
              type="number"
              placeholder="Enter vocabulary score"
              className={`block w-full px-4 py-3 mt-1 border rounded-lg text-base text-gray-900 border-gray-300 ${errors.vocabulary ? "border-red-500" : ""}`}
              {...register("vocabulary", { required: "Vocabulary score is required" })}
            />
            {errors.vocabulary && <p className="text-sm text-red-500">{errors.vocabulary.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium text-gray-700">TQ Vocabulary Score</label>
            <input
              type="text"
              value={tqScores.vocabulary}
              readOnly
              placeholder="TQ Vocabulary Score"
              className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
            />
          </div>
        </div>
      )}
      {selectedOption === "digitSpan" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="digitSpan" className="text-base font-medium text-gray-700">Digit Span</label>
            <input
              id="digitSpan"
              type="number"
              placeholder="Enter digit span score"
              className={`block w-full px-4 py-3 mt-1 border rounded-lg text-base text-gray-900 border-gray-300 ${errors.digitSpan ? "border-red-500" : ""}`}
              {...register("digitSpan", { required: "Digit Span score is required" })}
            />
            {errors.digitSpan && <p className="text-sm text-red-500">{errors.digitSpan.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-base font-medium text-gray-700">TQ Digit Span Score</label>
            <input
              type="text"
              value={tqScores.digitSpan}
              readOnly
              placeholder="TQ Digit Span Score"
              className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
            />
          </div>
        </div>
      )}

      {/* Display Average IQ */}
      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-gray-700">Average IQ</h3>
        <input
          type="text"
          value={averageIQ}
          readOnly
          placeholder="Average IQ"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 text-white bg-gray-500 rounded-lg"
          onClick={() => setActiveTab("tab2")} // Navigate to Test Information
        >
          Previous
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-[#9b1c1c] rounded-lg"
          onClick={handleCalculate} // Calculate
        >
          Calculate
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-[#9b1c1c] rounded-lg"
          onClick={() => setActiveTab("tab4")} // Navigate to Performance Tests
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VerbalTestsTab;