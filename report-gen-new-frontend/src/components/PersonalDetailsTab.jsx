// src/components/PersonalDetailsTab.jsx
import React from "react";
import { useForm } from "react-hook-form";

const PersonalDetailsTab = ({ register, errors, setValue, calculateAge, age, setActiveTab }) => {
  return (
    <div className="space-y-6">
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-base font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("name", { required: "Name is required" })}
          autoComplete="name"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>
      {/* Gender */}
      <div className="flex flex-col">
                <label htmlFor="gender" className="text-base font-medium text-gray-700">Gender</label>
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
                {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>}
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col">
                <label htmlFor="dob" className="text-base font-medium text-gray-700">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
                  {...register("dob", { required: "Date of birth is required" })}
                  autoComplete="bday"
                  onChange={(e) => {
                    setValue("dob", e.target.value);
                    calculateAge(e.target.value);
                  }}
                />
                {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob.message}</p>}
                {age && <p className="text-sm text-gray-700 mt-2">Age: {age} years</p>}
              </div>

              {/* Date of Testing */}
              <div className="flex flex-col">
                <label htmlFor="dateOfTesting" className="text-base font-medium text-gray-700">Date of Testing</label>
                <input
                  id="dateOfTesting"
                  type="date"
                  className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
                  {...register("dateOfTesting", { required: "Date of testing is required" })}
                />
                {errors.dateOfTesting && <p className="text-sm text-red-500 mt-1">{errors.dateOfTesting.message}</p>}
              </div>

              {/* Class */}
              <div className="flex flex-col">
                <label htmlFor="class" className="text-base font-medium text-gray-700">Class</label>
                <input
                  id="class"
                  type="text"
                  placeholder="Enter your class"
                  className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
                  {...register("class", { required: "Class is required" })}
                  autoComplete="off"
                />
                {errors.class && <p className="text-sm text-red-500 mt-1">{errors.class.message}</p>}
              </div>

              {/* Informant */}
              <div className="flex flex-col">
                <label htmlFor="informant" className="text-base font-medium text-gray-700">Informant</label>
                <input
                  id="informant"
                  type="text"
                  placeholder="Enter the name of informant"
                  className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
                  {...register("informant", { required: "Informant is required" })}
                  autoComplete="off"
                />
                {errors.informant && <p className="text-sm text-red-500 mt-1">{errors.informant.message}</p>}
              </div>

              {/* School Name */}
              <div className="flex flex-col">
                <label htmlFor="school" className="text-base font-medium text-gray-700">School Name</label>
                <input
                  id="school"
                  type="text"
                  placeholder="Enter school name"
                  className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
                  {...register("school", { required: "School name is required" })}
                  autoComplete="off"
                />
                {errors.school && <p className="text-sm text-red-500 mt-1">{errors.school.message}</p>}
              </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 text-white bg-gray-500 rounded-lg"
          onClick={() => setActiveTab("tab5")} // Navigate to Recommendations
        >
          Previous
        </button>
        <button
          type="button"
          className="px-4 py-2 text-white bg-[#9b1c1c] rounded-lg"
          onClick={() => setActiveTab("tab2")} // Navigate to Test Information
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;