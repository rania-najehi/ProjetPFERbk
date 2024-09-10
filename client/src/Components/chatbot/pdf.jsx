import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import img from "../../images/pdf.png";

// Specify the URL for the worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfPreview = ({ pdfUrl, cancelFileUpload }) => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null); // Clear any previous error
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading document:", error);
    setError("Failed to load PDF file. Please check the file and try again.");
  };

  return (
    <div className="pdf_holder">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading="Loading PDF..."
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
      <div>
        <img
          src={img}
          alt="PDF Thumbnail"
          style={{ width: "100px", height: "150px", margin: "20px" }}
        />
        <p className="pdf_name">{pdfUrl.name ? pdfUrl.name : pdfUrl}</p>
        <button className="close-button" onClick={cancelFileUpload}>
          ×
        </button>
      </div>
    </div>
  );
};

export default PdfPreview;
