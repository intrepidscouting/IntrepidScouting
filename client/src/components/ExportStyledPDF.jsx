import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport} from '@fortawesome/free-solid-svg-icons';
import logo from '/African Talent.png';

const ExportStyledPDF = ({player, evaluation}) => {
    
    // Function to format the date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString();  // This will format the date according to the user's locale
        };
    
    // Adding an Image (e.g., logo or profile picture)
    const imgWidth = 40; // Width of the image
    const imgHeight = 40; // Height of the image
    const imgX = 85; // Horizontal position of the image
    const imgY = 40; // Vertical position of the image

    const generatePDF = () => {

      const doc = new jsPDF();
        
      // Adding Image to PDF
      doc.addImage(player.Image, "JPEG", imgX, imgY, imgWidth, imgHeight);
      doc.addImage(logo, "JPEG", 40, 13, 20, 20);
      const startX = 105;
      const startY = 20;
  
      // Title and Subtitle
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.text("Comprehensive Player Report", startX, startY, { align: "center" });
  
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Report on ${player.First_name} ${player.Last_name}`, startX, startY + 10, { align: "center" });
  
      // Divider
      doc.setDrawColor(0, 0, 0);
      doc.line(20, 35, 190, 35);
  
      // Basic Details Section
      doc.setFontSize(14);
      doc.setTextColor(40);
      // doc.text("Player Details", 20, 0);
  
      doc.setFontSize(12);
      doc.setTextColor(50);
      doc.text(`Name: ${player.First_name} ${player.Last_name}`, 20, 90);
      doc.text(`Date of Birth: ${formatDate(player.Date_of_Birth)}`, 20, 100);
      doc.text(`Nationality: ${player.Nationality}`, 20, 110);
      doc.text(`Position: ${player.Position}`, 20, 120);
      doc.text(`Preferred Foot: ${player.Preferred_Foot}`, 20, 130);
      doc.text(`Region_scouted_in: ${player.Region_scouted_in}`, 110, 140);

      doc.text(`Club: ${player.Club}`, 110, 90);
      doc.text(`Height: ${player.Height}`, 110, 100);
      doc.text(`Coached by: ${player.Name_of_Coach}`, 110, 110);
      doc.text(`Coach Tel: ${player.Number_of_coach}`, 110, 120);
      doc.text(`Scouted_By: ${player.Scouted_By}`, 110, 130);
  
      // Evaluation Table Title
      const evaluationStartY = 150;
      doc.setFontSize(18);
      doc.setTextColor(100);
      doc.text("Player Evaluation", 100, evaluationStartY, { align: "center" });
  
      const margin = 14;
      const lineHeight = 10;
      let yCoordinate = 165;
      delete evaluation._id;
      delete evaluation.Player_id;
      const rows = Object.entries(evaluation).map(([key, value]) => [
        key,
        value,
      ]);

      // Loop through each key-value pair in the JSON object
      Object.keys(evaluation).forEach(key => {
      // Skip the fields you want to exclude (like the email)
      if (key === 'title' || key === 'email') return;

      // Add the section key as a heading
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text(key.charAt(0).toUpperCase() + key.slice(1), margin, yCoordinate);
      yCoordinate += lineHeight;

      // Add the content of the section
      doc.setFontSize(12);
      const textWidth = 180; // Maximum width for text wrapping
      const splitContent = doc.splitTextToSize(evaluation[key], textWidth);
      doc.text(splitContent, margin, yCoordinate);
      yCoordinate += splitContent.length * lineHeight + 5;

      // Check if the content would overflow the page
      if (yCoordinate + lineHeight > 280) {
        doc.addPage();
        yCoordinate = 20; // Reset y-coordinate for the new page
      }
    });
  
      
  
      // Save the PDF
      doc.save("Evaluation_Report.pdf");
    };

  return (
    <div>
      <button onClick={generatePDF}>
      <FontAwesomeIcon icon={faFileExport}/>
      </button>
    </div>
  );
};

export default ExportStyledPDF;
