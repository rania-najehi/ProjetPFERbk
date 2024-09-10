import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import img from "../../images/pdf.png";

// Specify the URL for the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfMessage = ({ pdfUrl, cancelFileUpload }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  console.log("pdfUrldsffffffffffff", pdfUrl);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading document:", error);
    setError("Failed to load PDF file. Please check the file and try again.");
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleDownload = () => {
    // Create an anchor element
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop(); // Set the filename for download
    link.click();
  };

  return (
    <div className="pdf_preview">
      <div className="pdf_header">
        <img
          src={img}
          alt="PDF Icon"
          style={{ width: "100px", height: "150px", margin: "20px" }}
        />
        <p className="pdf_name">{pdfUrl}</p>
      </div>
      <div className="pdf_viewer">
        <Document
          file={`http://localhost:4000/uploads/${pdfUrl}`}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading="Loading PDF..."
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="pdf_controls">
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default PdfMessage;
