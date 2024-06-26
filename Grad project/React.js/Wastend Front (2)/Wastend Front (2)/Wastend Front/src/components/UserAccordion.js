import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

export default function UserAccordion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          backgroundColor: "var(--main-color)",
          color: "var(--text)",
          padding: "20px",
          border: "1px solid var(--main-button)",
          margin: "30px 0 8px 0",
        }}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            How much does it cost?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "start" }}>
            It is 100% free to download the app. You only pay for the discounted
            Surprise Bags you purchase.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          backgroundColor: "var(--main-color)",
          color: "var(--text)",
          padding: "20px",
          border: "1px solid var(--main-button)",
          margin: "0 0 8px 0",
        }}
      >
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            Do you have a list with stores in the neighborhood?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "start" }}>
            the neighborhood? You can download the app and see all the stores
            around you who are part of our movement. The app is free, so it is
            easy to check
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{
          backgroundColor: "var(--main-color)",
          color: "var(--text)",
          padding: "20px",
          border: "1px solid var(--main-button)",
          margin: "0 0 8px 0",
        }}
      >
        <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
            What kind of products can I find on the app?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "start" }}>
            You can find a large range of products as we work with many
            different stores. Bread and pastries from bakeries, freshly cooked
            meals from restaurants, breakfast from hotels, buffet food, and
            groceries from the supermarket! Any fresh surplus food can be sold
            on the app. Some products might have reached the best before date,
            but are still be good for consumption.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
