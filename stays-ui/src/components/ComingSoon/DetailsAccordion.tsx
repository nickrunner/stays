import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

export interface DetailsAccordionProps {
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

export default function DetailsAccordion(props: DetailsAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography variant="h5" color="text.primary" gutterBottom sx={{ mt: 2 }}>
          {props.header}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}
