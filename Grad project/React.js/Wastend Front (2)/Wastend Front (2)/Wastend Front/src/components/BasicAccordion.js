import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

export default function ControlledAccordions() {
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
          backgroundColor: "transparent",
          color: "var(--text)",
          padding: "20px",
          border: "1px solid var(--main-button)",
          margin: "0 0 8px 0",
        }}
      >
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography sx={{ textAlign: "start" }}>Global Team</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "start" }}>
            Our B Corp status means you can expect fair wages, a healthy
            environment, high working standards, and a job that gives more to
            the planet than it takes.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
          backgroundColor: "transparent",
          color: "var(--text)",
          padding: "20px",
          border: "1px solid var(--main-button)",
          margin: "0 0 8px 0",
        }}
      >
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography sx={{ textAlign: "start" }}>
            Business with purpose
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Expand your horizons by working closely with talented people from
            all over the globe. Learn from different cultures and work in a
            mission-driven environment.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{
          backgroundColor: "transparent",
          color: "var(--text)",
          padding: "20px",
          border: "1px solid var(--main-button)",
          margin: "0 0 8px 0",
        }}
      >
        <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography sx={{ textAlign: "start" }}>Colleagues </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Good causes attract good people. Spend your working hours alongside
            like-minded colleagues with the common goal of making the world a
            better place.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
