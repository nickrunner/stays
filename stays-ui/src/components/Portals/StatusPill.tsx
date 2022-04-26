import { Box } from "@mui/material";

import { theme } from "../../Theme";
export interface StatusPillProps {
  children: any;
  color: string;
}

export const StatusPill = (props: StatusPillProps) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: props.color,
        borderRadius: 12,
        cursor: "default",
        display: "inline-flex",
        flexGrow: 0,
        flexShrink: 0,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.pxToRem(12),
        lineHeight: 2,
        fontWeight: 600,
        justifyContent: "center",
        letterSpacing: 0.5,
        minWidth: 20,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        textTransform: "uppercase",
        whiteSpace: "nowrap"
      }}>
      {props.children}
    </Box>
  );
};
