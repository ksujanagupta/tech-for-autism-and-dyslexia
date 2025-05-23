import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
        <form onSubmit={handleSubmit((data) => console.log(data))} className="w-full max-w-2xl space-y-6">
          {/* Tab 1 Content (Personal Details) */}
          {activeTab === "tab1" && (
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
            </div>
          )}
          {activeTab === "tab2" && (
  <div className="space-y-6">
    {/* Tests Administered */}
    <div className="flex flex-col">
      <label htmlFor="testsadministered" className="text-base font-medium text-gray-700">Tests Administered</label>
      <input
        id="testsadministered"
        type="text"
        placeholder="Enter the test administered"
        className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
        {...register("testsadministered", { required: "Tests Administered is required" })}
      />
      {errors.testsadministered && <p className="text-sm text-red-500 mt-1">{errors.testsadministered.message}</p>}
    </div>

    {/* Other Test */}
    <div className="flex flex-col">
      <label htmlFor="otherTest" className="text-base font-medium text-gray-700">Other Test</label>
      <input
        id="otherTest"
        type="text"
        placeholder="Enter other test name"
        className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
        {...register("otherTest", { required: "Other test is required" })}
      />
      {errors.otherTest && <p className="text-sm text-red-500 mt-1">{errors.otherTest.message}</p>}
    </div>

    {/* Reading Age */}
    <div className="flex flex-col">
      <label htmlFor="readingAge" className="text-base font-medium text-gray-700">Reading Age</label>
      <input
        id="readingAge"
        type="number"
        placeholder="Enter reading age"
        className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
        {...register("readingAge", { required: "Reading Age is required" })}
      />
      {errors.readingAge && <p className="text-sm text-red-500 mt-1">{errors.readingAge.message}</p>}
      <p className="text-sm text-gray-500 mt-1">Below than</p> {/* Added text below Reading Age */}
    </div>

    {/* Spelling Age */}
    <div className="flex flex-col">
      <label htmlFor="spellingAge" className="text-base font-medium text-gray-700">Spelling Age</label>
      <input
        id="spellingAge"
        type="number"
        placeholder="Enter spelling age"
        className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
        {...register("spellingAge", { required: "Spelling Age is required" })}
      />
      {errors.spellingAge && <p className="text-sm text-red-500 mt-1">{errors.spellingAge.message}</p>}
      <p className="text-sm text-gray-500 mt-1">Below than 1</p> {/* Added text below Spelling Age */}
    </div>
  </div>
)}
{activeTab === "tab3" && (
  <div className="space-y-6">
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

    {/* Vocabulary OR Digit Span */}
    <div className="flex flex-col space-y-4">
      <p className="text-base font-medium text-gray-700">Select one: Vocabulary or Digit Span</p>

      {/* Vocabulary Checkbox */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="vocabularyCheck"
          checked={selectedOption === "vocabulary"}
          onChange={() => {
            handleCheckboxChange("vocabulary");
            setValue("digitSpan", ""); // Clear Digit Span when Vocabulary is selected
          }}
        />
        <label htmlFor="vocabularyCheck" className="text-base">Vocabulary</label>
      </div>
      {selectedOption === "vocabulary" && (
        <input
          id="vocabulary"
          type="number"
          placeholder="Enter vocabulary score"
          className={`block w-full px-4 py-3 mt-1 border rounded-lg text-base text-gray-900 border-gray-300 ${errors.vocabulary ? "border-red-500" : ""}`}
          {...register("vocabulary", { required: "Vocabulary score is required" })}
        />
      )}
      {errors.vocabulary && <p className="text-sm text-red-500">{errors.vocabulary.message}</p>}

      {/* Digit Span Checkbox */}
      <div className="flex items-center space-x-3 mt-4">
        <input
          type="checkbox"
          id="digitSpanCheck"
          checked={selectedOption === "digitSpan"}
          onChange={() => {
            handleCheckboxChange("digitSpan");
            setValue("vocabulary", ""); // Clear Vocabulary when Digit Span is selected
          }}
        />
        <label htmlFor="digitSpanCheck" className="text-base">Digit Span</label>
      </div>
      {selectedOption === "digitSpan" && (
        <input
          id="digitSpan"
          type="number"
          placeholder="Enter digit span score"
          className={`block w-full px-4 py-3 mt-1 border rounded-lg text-base text-gray-900 border-gray-300 ${errors.digitSpan ? "border-red-500" : ""}`}
          {...register("digitSpan", { required: "Digit Span score is required" })}
        />
      )}
      {errors.digitSpan && <p className="text-sm text-red-500">{errors.digitSpan.message}</p>}
      
      {/* General Error Message */}
      {(!selectedOption) && (
        <p className="text-sm text-red-500">Please fill either Vocabulary or Digit Span.</p>
      )}
    </div>
  </div>
)}
{activeTab === "tab4" && (
  <div className="space-y-6">
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
  </div>
)}

          {/* Tab 5 Content (Recommendations) */}
          {activeTab === "tab5" && (
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
            </div>
          )}

          {/* Display TQ Score if available */}
          {tqScore !== null && (
            <div className="mt-4">
              <p className="text-lg font-semibold">TQ Score: {tqScore}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="relative flex justify-center w-full px-6 py-3 text-base font-medium text-white bg-[#9b1c1c] border border-transparent rounded-lg group hover:bg-[#8e1818] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9b1c1c] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TabForm;
