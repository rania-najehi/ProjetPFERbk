import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Typography, Divider } from "@mui/material";
const theme = createTheme({
  // Create a custom theme
  palette: {
    primary: {
      main: "#ff007b", // Your main color (e.g., #ff007b)
    },
    secondary: {
      main: "#c20052", // Your secondary color (e.g., #c20052)
    },
  },
});
export default function ResponsiveDatePickers({
  selectedDate,
  handleDateChange,
}) {
  return (
    <Grid>
      <Typography variant="h6">Check specific event by date</Typography>
      <Divider style={{ margin: "10px 0" }} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <DemoContainer
            components={[
              "DatePicker",
              "MobileDatePicker",
              "DesktopDatePicker",
              "StaticDatePicker",
            ]}
          >
            <DemoItem>
              <StaticDatePicker
                label="Basic picker"
                value={selectedDate}
                onChange={(newValue) => handleDateChange(newValue)}
                // Disable past dates
                minDate={dayjs()}
                // defaultValue={dayjs()}
              />
            </DemoItem>
          </DemoContainer>
        </ThemeProvider>
      </LocalizationProvider>
    </Grid>
  );
}
