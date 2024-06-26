import React from "react";

function DateModal() {
  return (
    <>
      <div className="head">
        <p>Add special days</p>
      </div>
      <div className="modal-content">
        <div className="block">
          <label htmlFor="firstDay">First Day</label>
          <input
            id="firstDay"
            type="date"
            value="${ChosenYear}-${ChosenMonth}-${ChosenDay}"
          />
        </div>
        <div className="block">
          <label htmlFor="secDay">Second Day</label>
          <input
            id="secDay"
            type="date"
            value="${ChosenYear}-${ChosenMonth}-${ChosenDay}"
          />
        </div>
        <button id="addDate" className="modal-add-date">
          Add Dates
        </button>
      </div>{" "}
    </>
  );
}

export default DateModal;
