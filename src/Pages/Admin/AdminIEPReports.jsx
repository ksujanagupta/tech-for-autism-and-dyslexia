import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import hospitalogo from "../../assets/totalsolutions.jpg";
import Loader from "../../Components/Loader.jsx";

export default function AdminIEPReports() {
  const { childId } = useParams();
  const [iepData, setIepData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIEPData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/admins/iep/${childId}`, {
          headers: {
            Authorization: `${sessionStorage.getItem("token")}`,
          },
        });
        setIepData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error fetching IEP data:", error);
      }
    };

    fetchIEPData();
  }, [childId]);

  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg"));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const generateIEPPDF = async (iep) => {
    try {
      const doc = new jsPDF();

      // Initial setup
      let yOffset = 15;

      // Validate IEP data
      if (!iep || !iep.monthlyGoals) {
        doc.setFontSize(14);
        doc.text("No IEP data available", doc.internal.pageSize.width / 2, 20, {
          align: "center",
        });
        doc.output("dataurlnewwindow");
        return;
      }

      // Helper function to calculate age
      const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      // Extract data safely with fallbacks
      const therapyName = iep?.therapy || "N/A";
      const therapist = iep?.therapistName || "N/A";
      const month =
        iep?.startingMonth && iep?.startingYear
          ? `${iep.startingMonth} ${iep.startingYear}`
          : "N/A";
      const doctorName = iep?.doctorId?.name || "N/A";
      const childName = iep?.childId?.name || "N/A";
      let childGender = iep?.childId?.gender || "N/A";
      const childDOB = iep?.childId?.dob.split("T")[0] || "N/A";
      const childAge = calculateAge(iep?.childId?.dob) || "N/A";
      childGender = childGender.charAt(0).toUpperCase() + childGender.slice(1);

      // Add hospital logo
      try {
        const hospitalLogo = await loadImage(hospitalogo);
        doc.addImage(hospitalLogo, "PNG", 15, 10, 40, 20);
      } catch (e) {
        console.log("Failed to add logo:", e);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Hospital Logo", 15, 20);
      }

      // Hospital information
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(
        [
          `Total Solution - Barkatpura`,
          `3-4-495/B, 1st Floor, YMCA Near More Super Market, Hyderabad, Telangana 500027, IN`,
          "Phone: +91 88860 08697",
        ],
        15,
        35
      );

      // Header with styling
      doc.setFillColor(63, 81, 181); // Indigo color
      doc.rect(2, 50, doc.internal.pageSize.width - 4, 25, "F");

      // Title - center-aligned
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255); // White text
      doc.setFont("helvetica", "bold");
      doc.text(
        "Individualized Education Program (IEP)",
        doc.internal.pageSize.width / 2,
        65,
        { align: "center" }
      );

      // Reset text color
      doc.setTextColor(0, 0, 0);

      // Child info section
      const infoBoxY = 85;
      const infoBoxHeight = 65;
      doc.setFillColor(240, 240, 250); // Light indigo background
      doc.roundedRect(
        10,
        infoBoxY,
        doc.internal.pageSize.width - 20,
        infoBoxHeight,
        3,
        3,
        "F"
      );

      // Child name header - left-aligned
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`Child: ${childName}`, 15, infoBoxY + 12); // Align to the left (x = 15)

      // Set up columns
      const colWidth = (doc.internal.pageSize.width - 40) / 2;
      const leftColX = 20;
      const rightColX = leftColX + colWidth + 10;
      const valueIndent = 25;

      // Draw table-like lines
      const lineY1 = infoBoxY + 18;
      doc.setDrawColor(200, 200, 220);
      doc.setLineWidth(0.2);
      doc.line(15, lineY1, doc.internal.pageSize.width - 15, lineY1);

      // First row
      let rowY = infoBoxY + 28;
      doc.setFont("helvetica", "bold");
      doc.text("Therapist:", leftColX, rowY);
      doc.setFont("helvetica", "normal");
      doc.text(therapist, leftColX + valueIndent, rowY);

      doc.setFont("helvetica", "bold");
      doc.text("Starting:", rightColX, rowY);
      doc.setFont("helvetica", "normal");
      doc.text(month, rightColX + valueIndent, rowY);

      // Second row
      rowY += 12;
      doc.setFont("helvetica", "bold");
      doc.text("Doctor:", leftColX, rowY);
      doc.setFont("helvetica", "normal");
      doc.text(doctorName, leftColX + valueIndent, rowY);

      doc.setFont("helvetica", "bold");
      doc.text("DOB:", rightColX, rowY);
      doc.setFont("helvetica", "normal");
      doc.text(
        `${childDOB} (${childAge} years)`,
        rightColX + valueIndent,
        rowY
      );

      // Third row
      rowY += 12;
      doc.setFont("helvetica", "bold");
      doc.text("Therapy:", leftColX, rowY);
      doc.setFont("helvetica", "normal");
      doc.text(therapyName, leftColX + valueIndent, rowY);

      doc.setFont("helvetica", "bold");
      doc.text("Gender:", rightColX, rowY);
      doc.setFont("helvetica", "normal");
      doc.text(`${childGender}`, rightColX + valueIndent, rowY);

      // Prepare table data
      const tableData = [];

      if (Array.isArray(iep.monthlyGoals) && iep.monthlyGoals.length > 0) {
        iep.monthlyGoals.forEach((goalData) => {
          const numberedGoals = Array.isArray(goalData.goals)
            ? goalData.goals
                .map((goal, index) => `${index + 1}) ${goal}`)
                .join("\n\n")
            : "N/A";

          const performanceText = Array.isArray(goalData.performance)
            ? goalData.performance
                .map((perf, index) => `${index + 1}) ${perf}`)
                .join("\n\n")
            : "N/A";

          tableData.push([
            goalData.month || "N/A",
            goalData.target || "N/A",
            numberedGoals,
            performanceText,
            goalData.therapistFeedback || "N/A",
            goalData.doctorFeedback || "N/A",
          ]);
        });
      }

      // Add table
      autoTable(doc, {
        head: [
          [
            "Month",
            "Long-Term Goals",
            "Short-Term Goals",
            "Performance",
            "Therapist Feedback",
            "Doctor Feedback",
          ],
        ],
        body: tableData,
        startY: infoBoxY + infoBoxHeight + 10,
        styles: {
          fontSize: 10,
          cellPadding: 3,
          lineColor: [63, 81, 181],
          valign: "middle",
        },
        headStyles: {
          fillColor: [63, 81, 181],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "center",
        },
        alternateRowStyles: {
          fillColor: [240, 240, 250],
        },
        columnStyles: {
          0: { cellWidth: 20, halign: "center" },
          1: { cellWidth: 30, halign: "left" },
          2: { cellWidth: 35, halign: "left" },
          3: { cellWidth: 35, halign: "left" },
          4: { cellWidth: 35, halign: "left" },
          5: { cellWidth: 35, halign: "left" },
        },
        margin: { top: 10 },
      });

      // Add footer
      const today = new Date();
      const formattedDate = today.toLocaleDateString();
      const footerY = doc.internal.pageSize.height - 20;
      doc.setDrawColor(63, 81, 181);
      doc.setLineWidth(0.5);
      doc.line(10, footerY, doc.internal.pageSize.width - 10, footerY);

      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text(
        `Generated on: ${formattedDate}`,
        doc.internal.pageSize.width - 15,
        doc.internal.pageSize.height - 10,
        { align: "right" }
      );
      doc.text(
        "Confidential Medical Document",
        15,
        doc.internal.pageSize.height - 10
      );

      // Display the PDF
      doc.output("dataurlnewwindow");
    } catch (error) {
      console.log("Error generating PDF:", error);
      alert("Failed to generate PDF");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-6 mt-4">
      <h1 className="text-2xl font-bold text-[#ab1c1c] text-center mb-6">IEP Reports</h1>
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-red-100">
              <th className="px-6 py-3 border-b-2 border-red-200 text-left text-sm font-semibold text-[#ab1c1c]">
                Therapy
              </th>
              <th className="px-6 py-3 border-b-2 border-red-200 text-left text-sm font-semibold text-[#ab1c1c]">
                Starting Month
              </th>
              <th className="px-6 py-3 border-b-2 border-red-200 text-left text-sm font-semibold text-[#ab1c1c]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {iepData.map((iep, index) => (
              <tr key={index} className="hover:bg-red-50 transition-colors">
                <td className="px-6 py-4 border-b border-red-100 text-sm text-gray-700">
                  {iep.therapy}
                </td>
                <td className="px-6 py-4 border-b border-red-100 text-sm text-gray-700">
                  {iep.startingMonth} {iep.startingYear}
                </td>
                <td className="px-6 py-4 border-b border-red-100 text-sm">
                  <button
                    onClick={() => generateIEPPDF(iep)}
                    className="bg-green-600 text-white px-3 py-2 text-sm rounded-md shadow hover:bg-green-700 transition"
                  >
                    Generate PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
