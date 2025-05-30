import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "../../types/formTypes";
import { fetchTQScore } from "../../services/api";

interface PerformanceTestsTabProps {
  age: number | null;
  tqScores: Record<string, number | null>;
  setTqScores: React.Dispatch<React.SetStateAction<Record<string, number | null>>>;
}

const PerformanceTestsTab: React.FC<PerformanceTestsTabProps> = ({ age, tqScores, setTqScores }) => {
  const { register, formState: { errors }, watch } = useFormContext<FormData>();

  // Watch for changes in performance test fields
  const pictureCompletion = watch("pictureCompletion");
  const blockDesign = watch("blockDesign");
  const objectAssembly = watch("objectAssembly");
  const coding = watch("coding");
  const mazes = watch("mazes");

  // Fetch TQ scores when raw scores change
  useEffect(() => {
    const fetchScores = async () => {
      if (age) {
        // Fetch Picture Completion TQ Score
        if (pictureCompletion) {
          try {
            const score = await fetchTQScore(age, "performance", "Picture", pictureCompletion);
            setTqScores(prev => ({ ...prev, pictureCompletion: score }));
          } catch (error) {
            console.error("Error fetching Picture Completion TQ score:", error);
          }
        }

        // Fetch Block Design TQ Score
        if (blockDesign) {
          try {
            const score = await fetchTQScore(age, "performance", "Block", blockDesign);
            setTqScores(prev => ({ ...prev, blockDesign: score }));
          } catch (error) {
            console.error("Error fetching Block Design TQ score:", error);
          }
        }

        // Fetch Object Assembly TQ Score
        if (objectAssembly) {
          try {
            const score = await fetchTQScore(age, "performance", "Object", objectAssembly);
            setTqScores(prev => ({ ...prev, objectAssembly: score }));
          } catch (error) {
            console.error("Error fetching Object Assembly TQ score:", error);
          }
        }

        // Fetch Coding TQ Score
        if (coding) {
          try {
            const score = await fetchTQScore(age, "performance", "Coding", coding);
            setTqScores(prev => ({ ...prev, coding: score }));
          } catch (error) {
            console.error("Error fetching Coding TQ score:", error);
          }
        }

        // Fetch Mazes TQ Score
        if (mazes) {
          try {
            const score = await fetchTQScore(age, "performance", "Maze", mazes);
            setTqScores(prev => ({ ...prev, mazes: score }));
          } catch (error) {
            console.error("Error fetching Mazes TQ score:", error);
          }
        }
      }
    };

    fetchScores();
  }, [age, pictureCompletion, blockDesign, objectAssembly, coding, mazes, setTqScores]);

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-[#9b1c1c] mb-6">Performance Tests</h2>
      
      {/* Picture Completion */}
      <div className="flex flex-col">
        <label htmlFor="pictureCompletion" className="text-base font-medium text-gray-700">
          Picture Completion
        </label>
        <input
          id="pictureCompletion"
          type="number"
          placeholder="Enter Picture Completion score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("pictureCompletion", { required: "Picture Completion score is required" })}
        />
        {errors.pictureCompletion && (
          <p className="text-sm text-red-500 mt-1">{errors.pictureCompletion.message}</p>
        )}
        {tqScores.pictureCompletion && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.pictureCompletion}
          </p>
        )}
      </div>

      {/* Block Design */}
      <div className="flex flex-col">
        <label htmlFor="blockDesign" className="text-base font-medium text-gray-700">
          Block Design
        </label>
        <input
          id="blockDesign"
          type="number"
          placeholder="Enter Block Design score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("blockDesign", { required: "Block Design score is required" })}
        />
        {errors.blockDesign && (
          <p className="text-sm text-red-500 mt-1">{errors.blockDesign.message}</p>
        )}
        {tqScores.blockDesign && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.blockDesign}
          </p>
        )}
      </div>

      {/* Object Assembly */}
      <div className="flex flex-col">
        <label htmlFor="objectAssembly" className="text-base font-medium text-gray-700">
          Object Assembly
        </label>
        <input
          id="objectAssembly"
          type="number"
          placeholder="Enter Object Assembly score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("objectAssembly", { required: "Object Assembly score is required" })}
        />
        {errors.objectAssembly && (
          <p className="text-sm text-red-500 mt-1">{errors.objectAssembly.message}</p>
        )}
        {tqScores.objectAssembly && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.objectAssembly}
          </p>
        )}
      </div>

      {/* Coding */}
      <div className="flex flex-col">
        <label htmlFor="coding" className="text-base font-medium text-gray-700">
          Coding
        </label>
        <input
          id="coding"
          type="number"
          placeholder="Enter Coding score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("coding", { required: "Coding score is required" })}
        />
        {errors.coding && (
          <p className="text-sm text-red-500 mt-1">{errors.coding.message}</p>
        )}
        {tqScores.coding && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.coding}
          </p>
        )}
      </div>

      {/* Mazes */}
      <div className="flex flex-col">
        <label htmlFor="mazes" className="text-base font-medium text-gray-700">
          Mazes
        </label>
        <input
          id="mazes"
          type="number"
          placeholder="Enter Mazes score"
          className="block w-full px-4 py-3 mt-2 border rounded-lg text-base text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("mazes", { required: "Mazes score is required" })}
        />
        {errors.mazes && (
          <p className="text-sm text-red-500 mt-1">{errors.mazes.message}</p>
        )}
        {tqScores.mazes && (
          <p className="text-sm text-green-600 font-medium mt-1">
            TQ Score: {tqScores.mazes}
          </p>
        )}
      </div>
    </div>
  );
};

export default PerformanceTestsTab;