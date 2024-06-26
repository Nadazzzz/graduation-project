import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

export default function BusinessAccordion() {
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
          <Typography sx={{ textAlign: "start" }}>
            How does this benefit my store?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: "start" }}>
            The Wastend app lets you reduce your food waste and earn back money
            on stock that would have been thrown away - a win-win. Further
            still, 76% of customers who discover a store through Wastend will
            return as full-paying customers.
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
            How much extra work does this create for my business?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Signing up to Wastend is free, and you won't pay anything unless you
            sell food through the app. Once you start selling food, we'll deduct
            an annual fee and a small commission on each Surprise Bag sold. This
            commission fee varies depending on what you charge for your Surprise
            Bags. Reach out to our team, and we'll walk you through it.
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
          <Typography sx={{ textAlign: "start" }}>
            How do I get paid?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We'll send you the money you've earned from Wastend on a quarterly
            basis. All you have to do is give us your bank account details - you
            can do this using MyStore on the app or on desktop.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        sx={{
          backgroundColor: "transparent",
          color: "var(--text)",
          padding: "20px",
          border: "1px solid var(--main-button)",
          margin: "0 0 8px 0",
        }}
      >
        <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography sx={{ textAlign: "start" }}>
            Do I need to supply my own takeaway bags or packaging?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            While we encourage customers to bring their own containers or bags,
            often they'll need to use a takeaway bag you provide. If you already
            have packaging that works for this purpose, you're welcome to use
            it.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
