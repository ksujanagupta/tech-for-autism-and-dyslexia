// src/components/RecommendationsTab.jsx
import React from "react";
import { useForm } from "react-hook-form";

const RecommendationsTab = ({ register, errors, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex flex-col">
        <label htmlFor="summary" className="text-base font-medium text-gray-700">Summary</label>
        <textarea
          id="summary"
          placeholder="Enter summary"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("summary", { required: "Summary is required" })}
        />
        {errors.summary && <p className="text-sm text-red-500 mt-1">{errors.summary.message}</p>}
      </div>
      {/* Recommendation 1 */}
      <div className="flex flex-col">
                <label htmlFor="recommendation1" className="text-base font-medium text-gray-700">Recommendation 1</label>
                <input
                  id="recommendation1"
                  type="text"
                  placeholder="Enter Recommendation 1"
                  className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
                  {...register("recommendation1", { required: "Recommendation 1 is required" })}
                />
                {errors.recommendation1 && <p className="text-sm text-red-500 mt-1">{errors.recommendation1.message}</p>}
              </div>

              {/* Recommendation 2 */}
              <div className="flex flex-col">
                <label htmlFor="recommendation2" className="text-base font-medium text-gray-700">Recommendation 2</label>
                <input
                  id="recommendation2"
                  type="text"
                  placeholder="Enter Recommendation 2"
                  className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
                  {...register("recommendation2", { required: "Recommendation 2 is required" })}
                />
                {errors.recommendation2 && <p className="text-sm text-red-500 mt-1">{errors.recommendation2.message}</p>}
              </div>

              {/* Recommendation 3 */}
              <div className="flex flex-col">
                <label htmlFor="recommendation3" className="text-base font-medium text-gray-700">Recommendation 3</label>
                <input
                  id="recommendation3"
                  type="text"
                  placeholder="Enter Recommendation 3"
                  className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
                  {...register("recommendation3", { required: "Recommendation 3 is required" })}
                />
                {errors.recommendation3 && <p className="text-sm text-red-500 mt-1">{errors.recommendation3.message}</p>}
              </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 text-white bg-gray-500 rounded-lg"
          onClick={() => setActiveTab("tab4")} // Navigate to Performance Tests
        >
          Previous
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-[#9b1c1c] rounded-lg"
          onClick={() => {
            // Handle final submission or any other action
            console.log("Final submission or action here");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RecommendationsTab;