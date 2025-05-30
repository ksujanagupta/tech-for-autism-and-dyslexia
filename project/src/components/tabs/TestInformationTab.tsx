import React from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "../../types/formTypes";

const TestInformationTab: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-[#9b1c1c] mb-6">Test Information</h2>
      
      {/* Tests Administered */}
      <div className="flex flex-col">
        <label htmlFor="testsadministered" className="text-base font-medium text-gray-700">
          Tests Administered
        </label>
        <input
          id="testsadministered"
          type="text"
          placeholder="Enter the test administered"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("testsadministered", { required: "Tests Administered is required" })}
        />
        {errors.testsadministered && (
          <p className="text-sm text-red-500 mt-1">{errors.testsadministered.message}</p>
        )}
      </div>

      {/* Other Test */}
      <div className="flex flex-col">
        <label htmlFor="otherTest" className="text-base font-medium text-gray-700">
          Other Test
        </label>
        <input
          id="otherTest"
          type="text"
          placeholder="Enter other test name"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("otherTest", { required: "Other test is required" })}
        />
        {errors.otherTest && (
          <p className="text-sm text-red-500 mt-1">{errors.otherTest.message}</p>
        )}
      </div>

      {/* Reading Age */}
      <div className="flex flex-col">
        <label htmlFor="readingAge" className="text-base font-medium text-gray-700">
          Reading Age
        </label>
        <input
          id="readingAge"
          type="number"
          placeholder="Enter reading age"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("readingAge", { required: "Reading Age is required" })}
        />
        {errors.readingAge && (
          <p className="text-sm text-red-500 mt-1">{errors.readingAge.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">Below than</p>
      </div>

      {/* Spelling Age */}
      <div className="flex flex-col">
        <label htmlFor="spellingAge" className="text-base font-medium text-gray-700">
          Spelling Age
        </label>
        <input
          id="spellingAge"
          type="number"
          placeholder="Enter spelling age"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("spellingAge", { required: "Spelling Age is required" })}
        />
        {errors.spellingAge && (
          <p className="text-sm text-red-500 mt-1">{errors.spellingAge.message}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">Below than 1</p>
      </div>
    </div>
  );
};

export default TestInformationTab;