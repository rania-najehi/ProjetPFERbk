import { useState, useEffect } from "react";

const useFileUpload = (socket) => {
  const [fileSocket, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  useEffect(() => {}, []);
  const handleFileChangeSocket = (event) => {
    var file = event.target.files[0];
    const chunkSize = 1024 * 1024; // 1MB chunk size (adjust as needed)
    let offset = 0;
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      const buffer = new Uint8Array(arrayBuffer);
      console.log("buffer", buffer);
      socket.emit("fileUpload", {
        file: { filename: file.name, buffer, type: file.type },
      });
      offset += buffer.byteLength;

      if (offset < file.size) {
        readSlice(offset);
      } else {
        // Handle file upload completion
        console.log("File upload completed");
      }
      console.log("herre your file", event.target.files[0]);
      // Listen for the server response
    };

    // handleSubmitFile(event.target.files[0]);
  };
  const readSlice = (offset) => {
    const slice = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(slice);
  };
  const handleSubmitFile = () => {};

  return {
    handleFileChangeSocket,
    handleSubmitFile,
    fileSocket,
    uploadedFile,
  };
};

export default useFileUpload;
