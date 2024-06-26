import React, { useState } from "react";
import Nav from "./Nav";
import Switch from "@mui/material/Switch";
import "./styles/Schedule.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import DashboardHeader from "./DashboardHeader";
import Swal from "sweetalert2";

function Schedule() {
  if (sessionStorage.getItem("SupplierId") === null)
    window.location.href = "http://localhost:3001/MyStoreLogin";
  const mealId = sessionStorage.getItem("mealId");
  const SupplierId = sessionStorage.getItem("SupplierId");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [pickUpTimes, setPickUpTimes] = useState({});
  const [dailyLimit, setDailyLimit] = useState(0);
  const weekDays = [
    "sunday",
    "monday",
    "tuesday",
    "wednsday",
    "thursday",
    "friday",
    "saturday",
  ];

  const handleSwitch = (day, checked) => {
    setDaysOfWeek((prevDays) =>
      checked ? [...prevDays, day] : prevDays.filter((d) => d !== day)
    );
  };

  const handleLimitChange = (day, limit) => {
    setDailyLimit(limit);
  };

  const handleTimeChange = (day, time) => {
    setPickUpTimes((prevTimes) => ({ ...prevTimes, [day]: time }));
    console.log(Object.values(pickUpTimes));
    console.log(daysOfWeek);
  };

  const sendRequest = () => {
    if (daysOfWeek.length === 0 || pickUpTimes === null || dailyLimit === 0) {
      Swal.fire({
        title: "Missing Values",
        text: "Please Fill All the required Values",
        icon: "error",
      });
      return;
    }

    const requestData = {
      daysOfWeek: daysOfWeek,
      pickUpTimes: Object.values(pickUpTimes),
      dailyLimit: dailyLimit,
    };

    fetch(`http://172.29.176.1/calendar/calendar/${mealId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          Swal.fire({
            title: "Failed To Update Schedule",
            text: "There was an error updating your schedule",
            icon: "error",
          });
          throw new Error("Failed to send request");
        }
        Swal.fire({
          title: "Done",
          text: "Schedule updated Successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };

  return (
    <div className="page-main">
      <Nav />
      <DashboardHeader />

      <div className="content-area">
        <div className="content">
          <div className="weekly-sch">
            {weekDays.map((day) => (
              <Day
                key={day}
                day={day}
                handleSwitch={handleSwitch}
                handleLimitChange={handleLimitChange}
                handleTimeChange={handleTimeChange}
              />
            ))}
            <button className="primary-button" onClick={sendRequest}>
              Update Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Day({ day, handleSwitch, handleLimitChange, handleTimeChange }) {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(0);
  const [pickUpTime, setPickUpTime] = useState(null);

  const toggleSwitch = () => {
    setSwitchChecked((prevChecked) => !prevChecked);
    handleSwitch(day, !switchChecked);
  };

  const handleLimitInputChange = (e) => {
    const limit = parseInt(e.target.value);
    if (!isNaN(limit)) {
      setDailyLimit(limit);
      handleLimitChange(day, limit);
    }
  };
  return (
    <div className="row" key={day} id={day}>
      <h5>{day}</h5>
      {/* Switch */}
      <div className="switch">
        <Switch
          checked={switchChecked}
          onChange={toggleSwitch}
          inputProps={{ "aria-label": "controlled" }}
        />
        <label>Pick-up</label>
      </div>
      {/* Switch */}

      {/* Day Limit */}
      <div className="inputs" id={day}>
        <div className="day-limit">
          <input
            type="number"
            value={dailyLimit}
            onChange={handleLimitInputChange}
            min={0}
            max={30}
          />{" "}
          <label>Daily Limit: 30</label>
        </div>
        {/* Day Limit */}

        {/* Time Pickers */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Pick-up Time"
            value={pickUpTime}
            onChange={(newValue) => {
              setPickUpTime(newValue);
              handleTimeChange(day, newValue);
            }}
            disabled={!switchChecked}
            renderInput={(params) => <input {...params} />}
          />
        </LocalizationProvider>
        {/* Time Pickers */}
      </div>
    </div>
  );
}

export default Schedule;
