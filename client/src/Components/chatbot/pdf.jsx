import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Specify the URL for the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
          {/* Render only the first page and scale it to fit within 150x150 */}
          <Page
            pageNumber={1}
            // scale={0.5} // Adjust scale to fit 150px width (tweak for a better fit if needed)
            width={150} // Enforce the width of 150px
            height={150} // Enforce the height of 150px
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      )}

      <div>
        <p className="pdf_name">{pdfUrl.name ? pdfUrl.name : pdfUrl}</p>
        <button className="close-button" onClick={cancelFileUpload}>
          ×
        </button>
      </div>
    </div>
  );
};

export default PdfPreview;
