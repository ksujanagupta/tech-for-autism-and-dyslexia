import React from "react";
import { useForm } from "react-hook-form";

const PerformanceTestsTab = ({ register, errors, setActiveTab }) => {
  const [tqScores, setTqScores] = React.useState({
    pictureCompletion: "",
    blockDesign: "",
    objectAssembly: "",
    coding: "",
    mazes: "",
  });
  const [averageIQ, setAverageIQ] = React.useState("");
  const [finalIQ, setFinalIQ] = React.useState("");

  const handleCalculate = () => {
    // Add your calculation logic here
    console.log("Calculating based on Performance Tests...");

    // Example calculation for TQ scores and average IQ
    // const pictureCompletionScore = parseFloat(getValues("pictureCompletion")) || 0;
    // const blockDesignScore = parseFloat(getValues("blockDesign")) || 0;
    // const objectAssemblyScore = parseFloat(getValues("objectAssembly")) || 0;
    // const codingScore = parseFloat(getValues("coding")) || 0;
    // const mazesScore = parseFloat(getValues("mazes")) || 0;

    // // Calculate TQ scores (example logic)
    // setTqScores({
    //   pictureCompletion: (pictureCompletionScore * 1.5).toFixed(2), // Example multiplier
    //   blockDesign: (blockDesignScore * 1.5).toFixed(2),
    //   objectAssembly: (objectAssemblyScore * 1.5).toFixed(2),
    //   coding: (codingScore * 1.5).toFixed(2),
    //   mazes: (mazesScore * 1.5).toFixed(2),
    // });

    // // Calculate average IQ (example logic)
    // const totalScore = pictureCompletionScore + blockDesignScore + objectAssemblyScore + codingScore + mazesScore;
    // const averageScore = totalScore / 5; // Assuming 5 scores
    // setAverageIQ((averageScore * 10).toFixed(2)); // Example IQ calculation

    // // Set final IQ (example logic, can be adjusted as needed)
    // setFinalIQ((averageScore * 10).toFixed(2)); // Example final IQ calculation
  };

  return (
    <div className="space-y-6">
      {/* Raw Scores and TQ Scores Table */}
      <div className="grid grid-cols-2 gap-4">
        {/* Picture Completion */}
        <div className="flex flex-col">
          <label htmlFor="pictureCompletion" className="text-base font-medium text-gray-700">Picture Completion</label>
          <input
            id="pictureCompletion"
            type="number"
            placeholder="Enter Picture Completion score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("pictureCompletion", { required: "Picture Completion score is required" })}
          />
          {errors.pictureCompletion && <p className="text-sm text-red-500 mt-1">{errors.pictureCompletion.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Picture Completion Score</label>
          <input
            type="text"
            value={tqScores.pictureCompletion}
            readOnly
            placeholder="TQ Picture Completion Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>

        {/* Block Design */}
        <div className="flex flex-col">
          <label htmlFor="blockDesign" className="text-base font-medium text-gray-700">Block Design</label>
          <input
            id="blockDesign"
            type="number"
            placeholder="Enter Block Design score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("blockDesign", { required: "Block Design score is required" })}
          />
          {errors.blockDesign && <p className="text-sm text-red-500 mt-1">{errors.blockDesign.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Block Design Score</label>
          <input
            type="text"
            value={tqScores.blockDesign}
            readOnly
            placeholder="TQ Block Design Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>

        {/* Object Assembly */}
        <div className="flex flex-col">
          <label htmlFor="objectAssembly" className="text-base font-medium text-gray-700">Object Assembly</label>
          <input
            id="objectAssembly"
            type="number"
            placeholder="Enter Object Assembly score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("objectAssembly", { required: "Object Assembly score is required" })}
          />
          {errors.objectAssembly && <p className="text-sm text-red-500 mt-1">{errors.objectAssembly.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Object Assembly Score</label>
          <input
            type="text"
            value={tqScores.objectAssembly}
            readOnly
            placeholder="TQ Object Assembly Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>

        {/* Coding */}
        <div className="flex flex-col">
          <label htmlFor="coding" className="text-base font-medium text-gray-700">Coding</label>
          <input
            id="coding"
            type="number"
            placeholder="Enter Coding score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("coding", { required: "Coding score is required" })}
          />
          {errors.coding && <p className="text-sm text-red-500 mt-1">{errors.coding.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Coding Score</label>
          <input
            type="text"
            value={tqScores.coding}
            readOnly
            placeholder="TQ Coding Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>

        {/* Mazes */}
        <div className="flex flex-col">
          <label htmlFor="mazes" className="text-base font-medium text-gray-700">Mazes</label>
          <input
            id="mazes"
            type="number"
            placeholder="Enter Mazes score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
            {...register("mazes", { required: "Mazes score is required" })}
          />
          {errors.mazes && <p className="text-sm text-red-500 mt-1">{errors.mazes.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="text-base font-medium text-gray-700">TQ Mazes Score</label>
          <input
            type="text"
            value={tqScores.mazes}
            readOnly
            placeholder="TQ Mazes Score"
            className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
          />
        </div>
      </div>

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

      {/* Display Final IQ */}
      <div className="flex flex-col">
        <h3 className="text-lg font-medium text-gray-700">Final IQ</h3>
        <input
          type="text"
          value={finalIQ}
          readOnly
          placeholder="Final IQ"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 text-white bg-gray-500 rounded-lg"
          onClick={() => setActiveTab("tab3")} // Navigate to Verbal Tests
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
          onClick={() => setActiveTab("tab5")} // Navigate to Recommendations
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PerformanceTestsTab;