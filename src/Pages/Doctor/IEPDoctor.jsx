import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Loader from '../../Components/Loader';

export default function IEPDoctor() {
  const [responses, setResponses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitText, setSubmitText] = useState('');
  const therapistName = sessionStorage.getItem('therapistName');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('1');
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed in JavaScript
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonthDetails, setSelectedMonthDetails] = useState(null);
  const [doctorFeedback, setDoctorFeedback] = useState('');
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/doctors/childIEP/${sessionStorage.getItem('childId')}`,
          { headers: { Authorization: `${sessionStorage.getItem('token')}` } }
        );
        setResponses(response.data);
      } catch (error) {
        toast.error('Error fetching data: ' + error, { autoClose: 2000 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewIEP = (response) => {
    const doc = new jsPDF();
    const tableData = [];
    let yOffset = 20; // Initial vertical position

    const therapyName = response?.therapy || 'N/A';
    const therapist = therapistName;
    const month = response?.startingMonth + ' ' + response?.startingYear || 'N/A';
    const doctorName = response.doctorId.name || 'N/A';

    response.monthlyGoals.forEach((goalData) => {
        const numberedGoals = goalData.goals
            .map((goal, index) => `${index + 1}) ${goal}`)
            .join('\n\n');
        tableData.push([
            goalData.month,
            goalData.target,
            numberedGoals,
            goalData.performance
                ? goalData.performance.map((perf, index) => `${index + 1}) ${perf}`).join('\n')
                : 'N/A',
            goalData.therapistFeedback || 'N/A',
            goalData.doctorFeedback || 'N/A',
        ]);
    });

    doc.setFontSize(18);
    doc.text('Individualized Education Program (IEP)', 14, yOffset);
    yOffset += 10;
    
    doc.setFontSize(12);
    doc.text(`Child : ${sessionStorage.getItem("childName")}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Therapist: ${therapist}`, 14, yOffset);
    yOffset += 10;

    doc.text(`Doctor: ${doctorName}`, 14, yOffset);
    yOffset += 10;

    doc.text(`Centre: ${sessionStorage.getItem("centreName")}`, 14, yOffset);
    yOffset += 10;

    doc.text(`Therapy: ${therapyName}`, 14, yOffset);
    yOffset += 10;
    doc.text(`Starting Year and Month: ${month}`, 14, yOffset);
    autoTable(doc, {
        head: [['Month', 'Long-Term Goals', 'Short-Term Goals', 'Performance', 'Therapist Feedback', 'Doctor Feedback']],
        body: tableData,
        startY: yOffset + 10, // Ensure table starts below text
    });

    doc.output('dataurlnewwindow');
};


  const handleInputChange = (e, monthIndex, goalIndex, field) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      if (field === 'goals' && monthIndex !== undefined && goalIndex !== undefined) {
        updatedData.monthlyGoals[monthIndex].latest.goals[goalIndex] = value;
      } else if (field === 'target' && monthIndex !== undefined && goalIndex === null) {
        updatedData.monthlyGoals[monthIndex].latest.target = value;
      } else if (name === 'therapy') {
        updatedData.therapy = value;
      } else if (name === 'startingMonth') {
        const startMonth = parseInt(value);
        updatedData.startingMonth = new Date(0, startMonth - 1).toLocaleString('default', { month: 'long' });
        updatedData.selectedMonths = [startMonth, (startMonth % 12) + 1, ((startMonth + 1) % 12) + 1];
        updatedData.monthlyGoals = updatedData.selectedMonths.map((month) => ({
          month: new Date(0, month - 1).toLocaleString('default', { month: 'long' }),
          target: '',
          goals: [''],
        }));
        updatedData.selectedMonthsNames = updatedData.selectedMonths.map((month) =>
          new Date(0, month - 1).toLocaleString('default', { month: 'long' })
        );
      } else if (name === 'year') {
        updatedData.startingYear = value;

        // Re-evaluate disabled months when the year changes
        if (value === currentYear.toString()) {
          updatedData.startingMonth = Math.max(updatedData.startingMonth, currentMonth);
        }
      } else if (name === 'feedback') {
        updatedData.feedback = value;
      }
      return updatedData;
    });
    console.log(formData);
  };

  const handleViewPerformance = (response, monthIndex) => {
    const monthDetails = {
      month: response.selectedMonthsNames[monthIndex],
      performance: response.monthlyGoals[monthIndex]?.performance,
      target: response.monthlyGoals[monthIndex]?.target,
      goals: response.monthlyGoals[monthIndex]?.goals,
      therapistFeedback: response.monthlyGoals[monthIndex]?.therapistFeedback,
    };

    setDoctorFeedback(response.monthlyGoals[monthIndex].doctorFeedback || '');
    setSelectedMonthDetails(monthDetails);
    setIsModalOpen(true);
  };

  const handleModalOpen = (response, monthIndex) => {
    const isEdit = Boolean(response);
    // console.log(isEdit);
    setIsEditMode(isEdit);
    setSubmitText(isEdit ? 'Update Progress' : 'Assign');

    if (isEdit) {
      setSelectedMonth(monthIndex);
      const editData = JSON.parse(JSON.stringify(response));
      editData.iepId = response._id;
      setFormData(editData);
    } else {
      const initialSelectedMonths = [1, 2, 3];
      setFormData({
        iepId: '',
        doctorId: sessionStorage.getItem('doctorId'),
        therapy: '',
        therapistName: therapistName,
        feedback: '',
        monthlyGoals: initialSelectedMonths.map((month) => ({
          month: new Date(0, month - 1).toLocaleString('default', { month: 'long' }),
          target: '',
          goals: [''],
        })),
        startingYear: currentYear,
        startingMonth: new Date().getMonth() + 1,
        selectedMonths: initialSelectedMonths,
        selectedMonthsNames: initialSelectedMonths.map((month) =>
          new Date(0, month - 1).toLocaleString('default', { month: 'long' })
        ),
      });
      console.log(formData);
      setSelectedMonth(null);
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setFormData(null);
    setShowModal(false);
    setIsEditMode(false);
    setSelectedMonth(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonLoading(true);
    // Validation for starting month and year
    const selectedYear = parseInt(formData.startingYear, 10);
    const selectedMonth = parseInt(formData.startingMonth, 10);

    if (selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
      toast.error('Starting month and year cannot be in the past.', { autoClose: 2000 });
      return;
    }

    try {
      await axios.put(
        `/api/doctors/assignIEP/${sessionStorage.getItem('childId')}`,
        formData,
        { headers: { Authorization: `${sessionStorage.getItem('token')}` } }
      );
      setShowModal(false);
      toast.success('Data saved successfully', { autoClose: 2000 });
      const response = await axios.get(
        `/api/doctors/childIEP/${sessionStorage.getItem('childId')}`,
        { headers: { Authorization: `${sessionStorage.getItem('token')}` } }
      );
      setResponses(response.data);
      setIsButtonLoading(false);
    } catch (error) {
      toast.error('Error submitting form', { autoClose: 2000 });
      setIsButtonLoading(false);
    }
  };

  const addGoal = (monthIndex) => {
    if (isEditMode && monthIndex !== selectedMonth) return;

    setFormData((prevData) => {
      const updatedGoals = [...prevData.monthlyGoals];
      updatedGoals[monthIndex].goals.push('');
      return { ...prevData, monthlyGoals: updatedGoals };
    });
  };

  const removeGoal = (monthIndex, goalIndex) => {
    if (isEditMode && monthIndex !== selectedMonth) return;

    setFormData((prevData) => {
      const updatedGoals = [...prevData.monthlyGoals];
      updatedGoals[monthIndex].goals = updatedGoals[monthIndex].goals.filter((_, index) => index !== goalIndex);
      return { ...prevData, monthlyGoals: updatedGoals };
    });
  };

  const handleDoctorFeedback = (e) => {
    setDoctorFeedback(e.target.value);
  };

  const handleFeedback = async () => {
    try {
      const response = await axios.put(
        `/api/doctors/IEPfeedback/${sessionStorage.getItem('childId')}`,
        {
          feedback: doctorFeedback,
          month: selectedMonthDetails.month,
        },
        { headers: { Authorization: `${sessionStorage.getItem('token')}` } }
      );
      if (response.status === 200) {
        setIsModalOpen(false);
        toast.success('Feedback submitted successfully', { autoClose: 2000 });
        const updatedResponses = await axios.get(
          `/api/therapists/childIEP/${sessionStorage.getItem('childId')}`,
          { headers: { Authorization: `${sessionStorage.getItem('token')}` } }
        );
        setResponses(updatedResponses.data);
      }
    } catch (error) {
      toast.error('Error submitting form', { autoClose: 2000 });
    }
  };

  const renderMonthlyGoals = () => {
    return (formData.selectedMonths ? formData.monthlyGoals : []).map((monthGoal, monthIndex) => {
      if (isEditMode && monthIndex !== selectedMonth) return null;

      const isDisabled = isEditMode && monthIndex !== selectedMonth;

      return (
        <div key={monthIndex} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h5 className="text-lg font-semibold mb-3">{monthGoal.latest.month}</h5>
          <h6 className="text-blue-600 font-medium mb-2">Long-Term Goal</h6>
          <div className="mb-3">
            <input
              type="text"
              className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Long-Term Goal"
              value={monthGoal.latest.target}
              onChange={(e) => handleInputChange(e, monthIndex, null, 'target')}
              disabled={isDisabled}
            />
          </div>
          <h6 className="text-blue-600 font-medium mb-2">Short-Term Goals</h6>
          {monthGoal.latest.goals.map((goal, goalIndex) => (
            <div key={goalIndex} className="flex items-center mb-3">
              <input
                type="text"
                className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Short-Term Goal ${goalIndex + 1}`}
                value={goal}
                onChange={(e) => handleInputChange(e, monthIndex, goalIndex, 'goals')}
                disabled={isDisabled}
              />
              {!isDisabled && (
                <button
                  type="button"
                  className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => removeGoal(monthIndex, goalIndex)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {!isDisabled && (
            <button
              type="button"
              className="w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => addGoal(monthIndex)}
            >
              Add Goal
            </button>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto sm:mt-16 md:mt-16 lg:mt-28 xl:mt-32 2xl:mt-28">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Individual Education Plan (IEP) {'>'} {sessionStorage.getItem("childName")} </h1>
          <div className="flex space-x-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              onClick={() => handleModalOpen(null)}
            >
              Assign IEP
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : responses.length === 0 ? (
          <h3 className="text-center text-gray-600">No IEPs assigned</h3>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-4 text-left text-blue-900">S.No</th>
                  <th className="p-4 text-left text-blue-900">Therapy</th>
                  <th className="p-4 text-left text-blue-900">Month 1</th>
                  <th className="p-4 text-left text-blue-900">Month 2</th>
                  <th className="p-4 text-left text-blue-900">Month 3</th>
                  <th className="p-4 text-left text-blue-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {responses
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((response, index) => (
                    <tr key={index} className="border-b border-blue-200 hover:bg-blue-50">
                      <td className="p-4 text-gray-700">{index + 1}</td>
                      <td className="p-4 text-gray-700">{response.therapy}</td>
                      {response.selectedMonthsNames.map((month, idx) => (
                        <td key={idx} className="p-4">
                          <div className="flex flex-col space-y-2">
                            <span className="text-blue-600 font-semibold">{month}</span>
                            <div className="flex space-x-2">
                              <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg shadow-md transition duration-300"
                                onClick={() => handleModalOpen(response, idx)}
                              >
                                Edit
                              </button>
                              {response.monthlyGoals[idx]?.performance && (
                                <button
                                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-lg shadow-md transition duration-300"
                                  onClick={() => handleViewPerformance(response, idx)}
                                >
                                  View Performance
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      ))}
                      <td className="p-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                          onClick={() => handleViewIEP(response)}
                        >
                          IEP Report
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {showModal && formData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"> {/* Increased z-index */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-blue-200 flex justify-between items-center">
                <h5 className="text-2xl font-bold text-blue-900">{isEditMode ? 'Edit IEP Progress' : 'Assign New IEP'}</h5>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 text-2xl border-2 px-3 py-1 rounded border-blue-500"
                  onClick={handleModalClose}
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Therapy Type</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="therapy"
                      value={formData.therapy}
                      onChange={handleInputChange}
                      placeholder="Enter therapy type"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Therapist Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="therapistName"
                      value={therapistName}
                      disabled
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Year</label>
                    <select
                      className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="year"
                      value={formData.startingYear}
                      onChange={handleInputChange}
                      disabled={isEditMode}
                    >
                      <option value="">Select year</option>
                      <option value={currentYear}>{currentYear}</option>
                      <option value={currentYear + 1}>{currentYear + 1}</option>
                    </select>
                  </div>

                  {!isEditMode && (
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">Select Starting Month</label>
                      <select
                        className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="startingMonth"
                        value={formData.startingMonth}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value="">Select month</option>
                        {[...Array(12).keys()].map((i) => {
                          const monthValue = i + 1;
                          const isDisabled = formData.startingYear === currentYear.toString() && monthValue < currentMonth;
                          return (
                            <option key={i} value={monthValue} disabled={isDisabled}>
                              {new Date(0, i).toLocaleString('default', { month: 'long' })}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Long-Term and Short-Term Goals</label>
                    {renderMonthlyGoals()}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Feedback</label>
                    <textarea
                      className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      placeholder="Feedback for the month"
                    />
                  </div>
                  {isButtonLoading ? (
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  ) : (

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                  >
                    {submitText}
                  </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && selectedMonthDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"> {/* Increased z-index */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-blue-200 flex justify-between items-center">
                <h5 className="text-2xl font-bold text-blue-900">
                  Performance for {selectedMonthDetails.month}
                </h5>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 text-2xl border-2 px-3 py-1 rounded border-blue-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h6 className="text-blue-600 font-medium text-xl mb-2">Long-Term Goal</h6>
                  <p className="text-gray-700">{selectedMonthDetails.target}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h6 className="text-blue-600 font-medium text-xl mb-2">Short-Term Goals and Performances</h6>
                  {selectedMonthDetails.goals && selectedMonthDetails.performance && selectedMonthDetails.goals.length > 0 ? (
                    <div className="space-y-2">
                      {selectedMonthDetails.goals.map((goal, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-gray-700 text-lg"><span className='text-blue-600 font-medium'>{index + 1}. </span> {goal}</p>
                          <p className="text-gray-600 mt-2">
                            Performance: {selectedMonthDetails.performance[index] ? (
                              <span className="bg-blue-500 text-white px-2 py-1 rounded-full">
                                {selectedMonthDetails.performance[index]}%
                              </span>
                            ) : (
                              <span className="text-gray-500">Performance not given</span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No goals or performance data available.</p>
                  )}
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h6 className="text-blue-600 font-medium mb-2 text-xl">Therapist Feedback</h6>
                  <p className="text-gray-700">{selectedMonthDetails.therapistFeedback || 'No feedback available'}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h6 className="text-blue-600 font-medium mb-2 text-xl">Feedback</h6>
                  <input
                    type="text"
                    className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={doctorFeedback}
                    onChange={handleDoctorFeedback}
                    placeholder="Enter feedback based on the child performance"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-blue-200">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                  onClick={handleFeedback}
                >
                  Submit Feedback
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ml-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}