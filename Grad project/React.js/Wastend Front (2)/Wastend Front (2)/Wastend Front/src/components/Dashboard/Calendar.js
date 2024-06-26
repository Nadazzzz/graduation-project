import * as React from "react";
import Nav from "./Nav";
import "./styles/Calendar.css";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DashboardHeader from "./DashboardHeader";
import Swal from "sweetalert2";
function Calendar() {
  if (sessionStorage.getItem("SupplierId") === null)
    window.location.href = "http://localhost:3001/MyStoreLogin";
  const mealId = sessionStorage.getItem("mealId");
  const [firstDay, setFirstDay] = useState(null);
  const [lastDay, setLastDay] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (firstDay === null || lastDay === null) return;
    const reqData = {
      firstDay: firstDay,
      lastDay: lastDay,
    };
    const response = await fetch(
      `http://172.29.176.1/calendar/calendar/${mealId}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(reqData),
      }
    );
    if (!response.ok) {
      handleClose();
      Swal.fire({
        title: "Error!",
        text: "Error Adding Days",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      handleClose();
      Swal.fire({
        title: "Great!",
        text: "Days Added Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="page-main">
      <Nav />
      <DashboardHeader />
      <div className="content-area">
        <div className="content">
          <div className="calendar">
            <div className="date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                  <DemoItem label="Calendar ">
                    <p>
                      The Calendar gives you an overview of the days customers
                      can come by your store and pick up a Surprise Bag. The
                      days shown in the Calendar match your weekly schedule, but
                      if there are temporary changes to your schedule, you can
                      add these as Special Days here.
                    </p>
                    <DateCalendar disablePast={true} className="Calendar" />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              <button onClick={handleOpen} className="primary-button">
                Add special day
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h2 style={{ marginBottom: "20px" }}> Add special days</h2>
                  <div className="date-selectors">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          value={firstDay}
                          onChange={(date) => setFirstDay(date)}
                          label="First Day"
                        />
                        <DatePicker
                          value={lastDay}
                          onChange={(date) => setLastDay(date)}
                          label="Last Day"
                          minDate={firstDay}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <button
                    onClick={() => handleSubmit()}
                    className="primary-button"
                  >
                    Add dates
                  </button>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
