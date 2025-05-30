import React from "react";
import { useFormContext } from "react-hook-form";
import { FormData } from "../../types/formTypes";

interface PersonalDetailsTabProps {
  age: number | null;
  setAge: React.Dispatch<React.SetStateAction<number | null>>;
}

const PersonalDetailsTab: React.FC<PersonalDetailsTabProps> = ({ age, setAge }) => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-[#9b1c1c] mb-6">Personal Details</h2>
      
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-base font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("name", { required: "Name is required" })}
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <label htmlFor="gender" className="text-base font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("gender", { required: "Gender is required" })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col">
        <label htmlFor="dob" className="text-base font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          id="dob"
          type="date"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("dob", { required: "Date of birth is required" })}
          autoComplete="bday"
        />
        {errors.dob && (
          <p className="text-sm text-red-500 mt-1">{errors.dob.message}</p>
        )}
        {age !== null && (
          <p className="text-sm text-gray-700 mt-2">Age: {age} years</p>
        )}
      </div>

      {/* Date of Testing */}
      <div className="flex flex-col">
        <label htmlFor="dateOfTesting" className="text-base font-medium text-gray-700">
          Date of Testing
        </label>
        <input
          id="dateOfTesting"
          type="date"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("dateOfTesting", { required: "Date of testing is required" })}
        />
        {errors.dateOfTesting && (
          <p className="text-sm text-red-500 mt-1">{errors.dateOfTesting.message}</p>
        )}
      </div>

      {/* Class */}
      <div className="flex flex-col">
        <label htmlFor="class" className="text-base font-medium text-gray-700">
          Class
        </label>
        <input
          id="class"
          type="text"
          placeholder="Enter your class"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("class", { required: "Class is required" })}
          autoComplete="off"
        />
        {errors.class && (
          <p className="text-sm text-red-500 mt-1">{errors.class.message}</p>
        )}
      </div>

      {/* Informant */}
      <div className="flex flex-col">
        <label htmlFor="informant" className="text-base font-medium text-gray-700">
          Informant
        </label>
        <input
          id="informant"
          type="text"
          placeholder="Enter the name of informant"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("informant", { required: "Informant is required" })}
          autoComplete="off"
        />
        {errors.informant && (
          <p className="text-sm text-red-500 mt-1">{errors.informant.message}</p>
        )}
      </div>

      {/* School Name */}
      <div className="flex flex-col">
        <label htmlFor="school" className="text-base font-medium text-gray-700">
          School Name
        </label>
        <input
          id="school"
          type="text"
          placeholder="Enter school name"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("school", { required: "School name is required" })}
          autoComplete="off"
        />
        {errors.school && (
          <p className="text-sm text-red-500 mt-1">{errors.school.message}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsTab;