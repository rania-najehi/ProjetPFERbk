import React, { useState } from "react";
import { Container, Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OneSection from "./OneSection.jsx";
import Information from "./sectionContent/Information.jsx";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import StudentPreview from "./sectionContent/preview.jsx";
import WorkHistory from "./sectionContent/WorkHistory.jsx";
import Education from "./sectionContent/Education.jsx";
import SchoolIcon from "@mui/icons-material/School";
import Projects from "./sectionContent/Projects.jsx";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import Skills from "./sectionContent/Stack.jsx";
import BoltIcon from "@mui/icons-material/Bolt";
import { UserProvider } from "../../context/cvGeneratorContext.jsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const initialSections = [
  {
    id: 1,
    icon: <AccountBoxIcon sx={{ color: "#fff", fontSize: 30 }} />,
    title: "Personal Information",
    content: <Information />,
  },
  {
    id: 2,
    title: "Work History",
    icon: <WorkOutlineIcon sx={{ color: "#fff", fontSize: 30 }} />,
    content: <WorkHistory />,
  },
  {
    id: 3,
    title: "Education",
    icon: <SchoolIcon sx={{ color: "#fff", fontSize: 30 }} />,
    content: <Education />,
  },
  {
    id: 4,
    title: "Projects",
    icon: <FolderCopyIcon sx={{ color: "#fff", fontSize: 30 }} />,
    content: <Projects />,
  },
  {
    id: 5,
    title: "Skills",
    icon: <BoltIcon sx={{ color: "#fff", fontSize: 30 }} />,
    content: <Skills />,
  },
];

const AllSections = () => {
  const [sections, setSections] = useState(initialSections);
  const navigate = useNavigate();
  return (
    <UserProvider>
      <Container sx={{ p: 4 }} display="flex" disableGutters={false}>
        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow settings
            p: 2, // Padding
            mb: 2,
            borderRadius: 2, // Border radius
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography
              color="#ff007b"
              // letterSpacing={3}
              fontSize={30}
              fontWeight={500}
            >
              Create your cv
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 3,
              }}
            >
              <Button
                onClick={() => navigate("/dashboard/preview")}
                variant="contained"
                sx={{
                  fontSize: 15,
                  bgcolor: "#ff007b",
                  "&:hover": {
                    bgcolor: "white", // Background color on hover
                    color: "#ff007b",
                  },
                }}
                endIcon={
                  <VisibilityIcon
                    sx={{
                      fontSize: 15,
                      color: "white",
                      "&:hover": {
                        color: "#ff007b",
                      },
                    }}
                  />
                }
              >
                Preview
              </Button>
              <Button
                onClick={() => navigate("/dashboard/createCv")}
                variant="contained"
                sx={{
                  fontSize: 15,
                  bgcolor: "#ff007b",
                  "&:hover": {
                    bgcolor: "white", // Background color on hover
                    color: "#ff007b",
                  },
                }}
                endIcon={
                  <FileDownloadIcon
                    sx={{
                      fontSize: 15,
                      color: "white",
                      "&:hover": {
                        color: "#ff007b",
                      },
                    }}
                  />
                }
              >
                Download
              </Button>
            </Box>
          </Box>
          {/* <Typography fontSize={40} letterSpacing={3}>
            Go through the steps to acomplish a proffessional Cv,
            <br /> Your patience and your details are matter to recruiters,
            <br />
            so take the time to fill out the details
          </Typography> */}
        </Box>
        <Box>
          {sections.map((section) => (
            <OneSection key={section.id} section={section} />
          ))}
        </Box>
      </Container>
    </UserProvider>
  );
};

export default AllSections;
