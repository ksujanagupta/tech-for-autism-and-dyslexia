import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget the CSS
import "jspdf-autotable";
import Loader from "../../Components/Loader";

const AdminViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    date: "",
    time: "",
    consultationType: "all",
    doctor: "all",
    status: "all",
  });

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      const centreId = sessionStorage.getItem("centreId");
      try {
        const response = await axios.get(
          `/api/admins/getAppointments/${centreId}`,
          {
            headers: {
              Authorization: `${sessionStorage.getItem("token")}`,
            },
          }
        );
        setAppointments(response.data);
        setFilteredAppointments(response.data); // Initially show all appointments
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments");
        setLoading(false);
        console.error(err);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    let filtered = appointments;

    if (filters.date) {
      filtered = filtered.filter((appointment) => {
        const appointmentDate = new Date(
          appointment.appointmentDate
        ).toLocaleDateString();
        return appointmentDate === new Date(filters.date).toLocaleDateString();
      });
    }

    if (filters.time) {
      filtered = filtered.filter(
        (appointment) => appointment.appointmentTime === filters.time
      );
    }

    if (filters.consultationType !== "all") {
      filtered = filtered.filter(
        (appointment) =>
          appointment.consultationType === filters.consultationType
      );
    }

    if (filters.doctor !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.doctorId?.name === filters.doctor
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === filters.status
      );
    }

    setFilteredAppointments(filtered);
  }, [filters, appointments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to generate and download PDF for an appointment
  const viewAppointmentPDF = (appointment) => {
    const doc = new jsPDF();

    const marginLeft = 10;
    const marginTop = 20;
    const lineHeight = 8;
    let verticalOffset = marginTop;

    // Add header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Total Solutions", marginLeft, verticalOffset);
    verticalOffset += lineHeight + 5; // Add extra space after the header
    // Add header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Total Solutions", marginLeft, verticalOffset);
    verticalOffset += lineHeight + 5; // Add extra space after the header

    // Add document heading
    doc.setFontSize(18);
    doc.text("Appointment Details", marginLeft, verticalOffset);
    verticalOffset += lineHeight + 10; // Add extra space after the heading
    // Add document heading
    doc.setFontSize(18);
    doc.text("Appointment Details", marginLeft, verticalOffset);
    verticalOffset += lineHeight + 10; // Add extra space after the heading

    // Add a horizontal line
    doc.setLineWidth(0.5);
    doc.line(marginLeft, verticalOffset, 200 - marginLeft, verticalOffset);
    verticalOffset += 10; // Add space after the line
    // Add a horizontal line
    doc.setLineWidth(0.5);
    doc.line(marginLeft, verticalOffset, 200 - marginLeft, verticalOffset);
    verticalOffset += 10; // Add space after the line

    // Reset font for content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    // Reset font for content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Add appointment details
    doc.text(
      `Appointment Date: ${formatDate(appointment.appointmentDate)}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    // Add appointment details
    doc.text(
      `Appointment Date: ${formatDate(appointment.appointmentDate)}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(
      `Appointment Time: ${appointment.appointmentTime}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Appointment Time: ${appointment.appointmentTime}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(`Status: ${appointment.status}`, marginLeft, verticalOffset);
    verticalOffset += lineHeight;
    doc.text(`Status: ${appointment.status}`, marginLeft, verticalOffset);
    verticalOffset += lineHeight;

    doc.text(
      `Consultation Type: ${appointment.consultationType}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Consultation Type: ${appointment.consultationType}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(
      `Child Name: ${appointment.childId?.name || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Child Name: ${appointment.childId?.name || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(
      `Doctor Name: ${appointment.doctorId?.name || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Doctor Name: ${appointment.doctorId?.name || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(
      `Parent Name: ${appointment.parentId?.name || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Parent Name: ${appointment.parentId?.name || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(
      `Parent Email: ${appointment.parentId?.email || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Parent Email: ${appointment.parentId?.email || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(
      `Parent Phone: ${appointment.parentId?.phone || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Parent Phone: ${appointment.parentId?.phone || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(
      `Address: ${appointment.parentId?.address || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Address: ${appointment.parentId?.address || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    doc.text(
      `Child Concerns: ${appointment.childConcerns || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;
    doc.text(
      `Child Concerns: ${appointment.childConcerns || "N/A"}`,
      marginLeft,
      verticalOffset
    );
    verticalOffset += lineHeight;

    // Add a border around the content
    doc.setLineWidth(0.2);
    doc.rect(
      marginLeft - 5,
      marginTop - 10,
      190,
      verticalOffset - marginTop + 10
    );
    // Add a border around the content
    doc.setLineWidth(0.2);
    doc.rect(
      marginLeft - 5,
      marginTop - 10,
      190,
      verticalOffset - marginTop + 10
    );

    // Save the PDF
    // doc.save(`appointment_${appointment._id}.pdf`);
    doc.output("dataurlnewwindow");
  };

  const handlePrescriptionUpload = async (appointmentId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("appointmentId", appointmentId);

    try {
      await axios.post("/api/admins/uploadPrescription", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${sessionStorage.getItem("token")}`,
        },
      });

      toast.success("Prescription uploaded successfully");
    } catch (error) {
      console.error("Error uploading prescription:", error);
      toast.error("Failed to upload prescription");
    }
  };

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const uniqueConsultationTypes = [
    ...new Set(appointments.map((appointment) => appointment.consultationType)),
  ];
  const uniqueDoctors = [
    ...new Set(appointments.map((appointment) => appointment.doctorId?.name)),
  ];

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="p-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl text-center font-bold text-[#ab1c1c] mb-8">
              Appointments
            </h1>

            <div className="flex flex-wrap justify-center mb-6 bg-red-50 p-4 rounded-lg space-x-4">
              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#ab1c1c] focus:border-[#ab1c1c] sm:text-sm rounded-md"
                />
              </div>

              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <select
                  name="time"
                  value={filters.time}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#ab1c1c] focus:border-[#ab1c1c] sm:text-sm rounded-md"
                >
                  <option value="">All</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                </select>
              </div>

              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#ab1c1c] focus:border-[#ab1c1c] sm:text-sm rounded-md"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Approved</option>
                </select>
              </div>

              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Consultation Type
                </label>
                <select
                  name="consultationType"
                  value={filters.consultationType}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#ab1c1c] focus:border-[#ab1c1c] sm:text-sm rounded-md"
                >
                  <option value="all">All</option>
                  {uniqueConsultationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Doctor
                </label>
                <select
                  name="doctor"
                  value={filters.doctor}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#ab1c1c] focus:border-[#ab1c1c] sm:text-sm rounded-md"
                >
                  <option value="all">All</option>
                  {uniqueDoctors.map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-20 border border-red-100">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-[#ab1c1c] text-white">
                    <th className="px-5 py-3 border-b-2 border-[#8e1818] text-left text-sm font-semibold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#8e1818] text-left text-sm font-semibold uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#8e1818] text-left text-sm font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#8e1818] text-left text-sm font-semibold uppercase tracking-wider">
                      Consultation Type
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#8e1818] text-left text-sm font-semibold uppercase tracking-wider">
                      Child Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#8e1818] text-left text-sm font-semibold uppercase tracking-wider">
                      Doctor Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-[#8e1818] text-left text-sm font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="hover:bg-red-50 transition duration-200"
                    >
                      <td className="px-5 py-5 border-b border-red-100 text-sm">
                        <p className="text-[#ab1c1c] whitespace-nowrap">
                          {formatDate(appointment.appointmentDate)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-red-100 text-sm">
                        <p className="text-[#ab1c1c] whitespace-nowrap">
                          {appointment.appointmentTime}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-red-100 text-sm">
                        <span
                          className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status==="completed"?"Approved":appointment.status==="rejected"?"Rejected":"Pending"}
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-red-100 text-sm">
                        <p className="text-[#ab1c1c] whitespace-nowrap">
                          {appointment.consultationType}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-red-100 text-sm">
                        <p className="text-[#ab1c1c] whitespace-nowrap">
                          {appointment.childId?.name || "N/A"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-red-100 text-sm">
                        <p className="text-[#ab1c1c] whitespace-nowrap">
                          {appointment.doctorId?.name || "N/A"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-red-100 text-sm">
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => viewAppointmentPDF(appointment)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>Download PDF</span>
                          </button>
                          <div className="relative">
                            <input
                              type="file"
                              id={`prescription-upload-${appointment._id}`}
                              className="hidden"
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={(event) =>
                                handlePrescriptionUpload(appointment._id, event)
                              }
                            />
                            <label
                              htmlFor={`prescription-upload-${appointment._id}`}
                              className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-9.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Upload Prescription</span>
                            </label>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViewAppointment;
