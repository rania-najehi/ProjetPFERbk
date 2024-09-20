import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { saveAs } from "file-saver";

// Set PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfMessage = ({ pdfUrl }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [error, setError] = useState(null);

  // Generate a thumbnail from the first page of the PDF
  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const pdf = await pdfjs.getDocument(
          `http://localhost:4000/uploads/${pdfUrl}`
        ).promise;
        const page = await pdf.getPage(1);
        const scale = 0.5; // Smaller scale for thumbnail
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        const thumbnailDataUrl = canvas.toDataURL();
        setThumbnailUrl(thumbnailDataUrl); // Store the thumbnail data as an image URL
      } catch (error) {
        console.error("Error generating thumbnail:", error);
        setError("Failed to generate PDF thumbnail.");
      }
    };

    generateThumbnail();
  }, [pdfUrl]);

  // Handle PDF download
  const handleDownload = () => {
    saveAs(`http://localhost:4000/uploads/${pdfUrl}`, "file.pdf");
  };

  return (
    <div className="pdf-message">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {thumbnailUrl ? (
            <div className="pdf-thumbnail">
              <img
                src={thumbnailUrl}
                alt="PDF thumbnail"
                style={{ width: "100%", cursor: "pointer" }}
              />
            </div>
          ) : (
            <div>Loading thumbnail...</div>
          )}
          <div className="pdf-controls">
            <DownloadIcon color="secondary" onClick={handleDownload} />
          </div>
        </>
      )}
    </div>
  );
};

export default PdfMessage;
