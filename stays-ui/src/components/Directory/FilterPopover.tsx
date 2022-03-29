import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Popover,
  Typography
} from "@mui/material";
import React from "react";

export interface FilterAccordionProps {
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  icon?: React.ReactNode;
  onClear: () => void;
  width?: number;
}

export default function FilterPopover(props: FilterAccordionProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? props.header : undefined;
  return (
    <React.Fragment>
      <Button
        sx={{ maxHeight: 45 }}
        aria-describedby={id}
        size="small"
        variant="outlined"
        startIcon={props.icon}
        onClick={handleClick}>
        {props.header}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}>
        <Paper sx={{ width: props.width ?? 300, p: 5 }}>{props.children}</Paper>
      </Popover>
    </React.Fragment>
  );
}
