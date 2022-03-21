import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";

export interface FilterAccordionProps {
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  icon?: unknown;
}

export default function FilterAccordion(props: FilterAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Box sx={{ display: "flex", gap: 1 }}>
          {props.icon}
          <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ ml: 2 }}>
            {props.header}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}
