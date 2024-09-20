import React, { useContext, useEffect, useState, useRef } from "react";
import PdfDocument from "./PrintComponent.jsx";
import Resume from "./CV.jsx";
import { Context } from "../../../main.jsx";
import { Container, CircularProgress, Button, Box } from "@mui/material";
import ReactToPrint from "react-to-print";
import axios from "axios";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import "./CreateCv.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function CreateCv() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [binaryImg, setBinaryImg] = useState("");
  const printRef = useRef();
  const { token } = useContext(Context);
  const convertImageToBase64 = (url) => {
    return axios
      .get(url, {
        responseType: "blob",
      })
      .then((response) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(response.data);
        });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getSections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("====================================");
        console.log("data cv", response.data);
        console.log("====================================");
        setData(response.data);
        if (
          response.data &&
          response.data.user &&
          response.data.user.studentAvatar
        ) {
          const avatarBase64 = await convertImageToBase64(
            `http://localhost:4000/uploads/${response.data.user.studentAvatar}`
          );
          console.log("====================================");
          console.log("avatarBase64", avatarBase64);
          console.log("====================================");
          setBinaryImg(avatarBase64);
        }
      } catch (error) {
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <div className="loader2"></div>;
  }

  return (
    <Container maxWidth={false} sx={{ p: 3 }}>
      {data ? (
        <>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <ReactToPrint
              trigger={() => (
                <Button variant="contained" color="primary">
                  Print CV
                </Button>
              )}
              content={() => printRef.current}
            />
            <PDFDownloadLink
              document={<PdfDocument data={data} binaryImg={binaryImg} />}
              fileName="cv.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <Button variant="contained" color="secondary">
                    Download PDF
                  </Button>
                )
              }
            </PDFDownloadLink>
          </Box>
          {/* <Resume data={data} binaryImg={binaryImg} />w */}
          <Box
            sx={{
              border: "1px solid #ccc",
              marginTop: 2,
              width: "100%",
              height: "80vh",
            }}
          >
            <PDFViewer width="100%" height="100%">
              <PdfDocument data={data} binaryImg={binaryImg} />
            </PDFViewer>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default CreateCv;
