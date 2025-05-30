import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "../../types/formTypes";
import { fetchTQScore } from "../../services/api";

interface VerbalTestsTabProps {
  age: number | null;
  tqScores: Record<string, number | null>;
  setTqScores: React.Dispatch<React.SetStateAction<Record<string, number | null>>>;
}

const VerbalTestsTab: React.FC<VerbalTestsTabProps> = ({ age, tqScores, setTqScores }) => {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormData>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Watch for changes in verbal test fields
  const information = watch("information");
  const comprehension = watch("comprehension");
  const arithmetic = watch("arithmetic");
  const similarities = watch("similarities");
  const vocabulary = watch("vocabulary");
  const digitSpan = watch("digitSpan");

  // Initialize selectedOption based on form data
  useEffect(() => {
    if (vocabulary) {
      setSelectedOption("vocabulary");
    } else if (digitSpan) {
      setSelectedOption("digitSpan");
    }
  }, [vocabulary, digitSpan]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      setValue("vocabulary", "");
      setValue("digitSpan", "");
    } else {
      setSelectedOption(option);
      // Clear the other field when switching options
      if (option === "vocabulary") {
        setValue("digitSpan", "");
      } else {
        setValue("vocabulary", "");
      }
    }
  };

  // Fetch TQ scores when raw scores change
  useEffect(() => {
    const fetchScores = async () => {
      if (age) {
        // Fetch Information TQ Score
        if (information) {
          try {
            const score = await fetchTQScore(age, "verbal", "Information", information);
            setTqScores(prev => ({ ...prev, information: score }));
          } catch (error) {
            console.error("Error fetching Information TQ score:", error);
          }
        }

        // Fetch Comprehension TQ Score
        if (comprehension) {
          try {
            const score = await fetchTQScore(age, "verbal", "Comprehension", comprehension);
            setTqScores(prev => ({ ...prev, comprehension: score }));
          } catch (error) {
            console.error("Error fetching Comprehension TQ score:", error);
          }
        }

        // Fetch Arithmetic TQ Score
        if (arithmetic) {
          try {
            const score = await fetchTQScore(age, "verbal", "Arithmetic", arithmetic);
            setTqScores(prev => ({ ...prev, arithmetic: score }));
          } catch (error) {
            console.error("Error fetching Arithmetic TQ score:", error);
          }
        }

        // Fetch Similarities TQ Score
        if (similarities) {
          try {
            const score = await fetchTQScore(age, "verbal", "Similarities", similarities);
            setTqScores(prev => ({ ...prev, similarities: score }));
          } catch (error) {
            console.error("Error fetching Similarities TQ score:", error);
          }
        }

        // Fetch Vocabulary TQ Score
        if (vocabulary) {
          try {
            const score = await fetchTQScore(age, "verbal", "Vocabulary", vocabulary);
            setTqScores(prev => ({ ...prev, vocabulary: score }));
          } catch (error) {
            console.error("Error fetching Vocabulary TQ score:", error);
          }
        }

        // Fetch Digit Span TQ Score
        if (digitSpan) {
          try {
            const score = await fetchTQScore(age, "verbal", "Digit", digitSpan);
            setTqScores(prev => ({ ...prev, digitSpan: score }));
          } catch (error) {
            console.error("Error fetching Digit Span TQ score:", error);
          }
        }
      }
    };

    fetchScores();
  }, [age, information, comprehension, arithmetic, similarities, vocabulary, digitSpan, setTqScores]);

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-[#9b1c1c] mb-6">Verbal Tests</h2>
      
      {/* Information */}
      <div className="flex flex-col">
        <label htmlFor="information" className="text-base font-medium text-gray-700">
          Information
        </label>
        <input
          id="information"
          type="number"
          placeholder="Enter information score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("information", { required: "Information is required" })}
        />
        {errors.information && (
          <p className="text-sm text-red-500 mt-1">{errors.information.message}</p>
        )}
        {tqScores.information && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.information}
          </p>
        )}
      </div>

      {/* Comprehension */}
      <div className="flex flex-col">
        <label htmlFor="comprehension" className="text-base font-medium text-gray-700">
          Comprehension
        </label>
        <input
          id="comprehension"
          type="number"
          placeholder="Enter comprehension score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("comprehension", { required: "Comprehension is required" })}
        />
        {errors.comprehension && (
          <p className="text-sm text-red-500 mt-1">{errors.comprehension.message}</p>
        )}
        {tqScores.comprehension && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.comprehension}
          </p>
        )}
      </div>

      {/* Arithmetic */}
      <div className="flex flex-col">
        <label htmlFor="arithmetic" className="text-base font-medium text-gray-700">
          Arithmetic
        </label>
        <input
          id="arithmetic"
          type="number"
          placeholder="Enter arithmetic score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("arithmetic", { required: "Arithmetic score is required" })}
        />
        {errors.arithmetic && (
          <p className="text-sm text-red-500 mt-1">{errors.arithmetic.message}</p>
        )}
        {tqScores.arithmetic && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.arithmetic}
          </p>
        )}
      </div>

      {/* Similarities */}
      <div className="flex flex-col">
        <label htmlFor="similarities" className="text-base font-medium text-gray-700">
          Similarities
        </label>
        <input
          id="similarities"
          type="number"
          placeholder="Enter similarities score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("similarities", { required: "Similarities score is required" })}
        />
        {errors.similarities && (
          <p className="text-sm text-red-500 mt-1">{errors.similarities.message}</p>
        )}
        {tqScores.similarities && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.similarities}
          </p>
        )}
      </div>

      {/* Vocabulary OR Digit Span */}
      <div className="flex flex-col space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-base font-medium text-gray-700">
          Select one: Vocabulary or Digit Span
        </p>

        {/* Vocabulary Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="vocabularyCheck"
            checked={selectedOption === "vocabulary"}
            onChange={() => handleCheckboxChange("vocabulary")}
            className="w-4 h-4 text-[#9b1c1c] border-gray-300 rounded focus:ring-[#9b1c1c]"
          />
          <label htmlFor="vocabularyCheck" className="text-base text-gray-700">
            Vocabulary
          </label>
        </div>
        
        {selectedOption === "vocabulary" && (
          <div className="pl-7">
            <input
              id="vocabulary"
              type="number"
              placeholder="Enter vocabulary score"
              className={`block w-full px-4 py-3 border rounded-lg text-base text-gray-900 ${
                errors.vocabulary ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200`}
              {...register("vocabulary", {
                required: selectedOption === "vocabulary" ? "Vocabulary score is required" : false,
              })}
            />
            {errors.vocabulary && (
              <p className="text-sm text-red-500 mt-1">{errors.vocabulary.message}</p>
            )}
            {tqScores.vocabulary && (
              <p className="text-sm text-green-600 font-medium mt-1">
                TQ Score: {tqScores.vocabulary}
              </p>
            )}
          </div>
        )}

        {/* Digit Span Checkbox */}
        <div className="flex items-center space-x-3 mt-2">
          <input
            type="checkbox"
            id="digitSpanCheck"
            checked={selectedOption === "digitSpan"}
            onChange={() => handleCheckboxChange("digitSpan")}
            className="w-4 h-4 text-[#9b1c1c] border-gray-300 rounded focus:ring-[#9b1c1c]"
          />
          <label htmlFor="digitSpanCheck" className="text-base text-gray-700">
            Digit Span
          </label>
        </div>
        
        {selectedOption === "digitSpan" && (
          <div className="pl-7">
            <input
              id="digitSpan"
              type="number"
              placeholder="Enter digit span score"
              className={`block w-full px-4 py-3 border rounded-lg text-base text-gray-900 ${
                errors.digitSpan ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200`}
              {...register("digitSpan", {
                required: selectedOption === "digitSpan" ? "Digit Span score is required" : false,
              })}
            />
            {errors.digitSpan && (
              <p className="text-sm text-red-500 mt-1">{errors.digitSpan.message}</p>
            )}
            {tqScores.digitSpan && (
              <p className="text-sm text-green-600 font-medium mt-1">
                TQ Score: {tqScores.digitSpan}
              </p>
            )}
          </div>
        )}
        
        {/* Error message if neither is selected */}
        {!selectedOption && (
          <p className="text-sm text-red-500 mt-1">
            Please select either Vocabulary or Digit Span.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerbalTestsTab;