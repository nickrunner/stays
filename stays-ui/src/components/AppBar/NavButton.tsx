import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { StaysAppBarProps } from "./AppBar";

export interface NavButtonProps extends StaysAppBarProps {
  text: string;
  to: string;
  sx?: any;
  icon?: any;
}

export default function NavButton(props: NavButtonProps) {
  const router = useRouter();
  const [scroll, setScroll] = React.useState(false);
  const active: boolean = router.pathname.includes(props.to);

  React.useEffect(() => {
    function handleScroll() {
      setScroll(window.scrollY != 0);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button
      variant={active ? "text" : "text"}
      size="small"
      sx={{
        width: { xs: 75, sm: 100 },
        height: { xs: 60, sm: 60 },
        display: "block",
        p: 0,
        py: 0,
        mt: 1,
        mr: 1,
        color: !props.transparent || scroll ? "primary.dark" : "primary.light",
        bgcolor: active ? "action.selected" : "",
        "&:hover": {
          backgroundColor: "action.hover",
          color: "primary.dark"
        },

        ...props.sx
      }}
      onClick={() => router.push(props.to)}>
      <Box
        sx={{
          color: active
            ? "primary.main"
            : props.transparent && !scroll
            ? "primary.main"
            : "primary.dark"
        }}>
        {props.icon}
      </Box>
      <Typography sx={{ display: { xs: "block", sm: "none" } }} variant="caption">
        {props.text}
      </Typography>
      <Box sx={{ display: { xs: "none", sm: "block", fontWeight: active ? "bold" : "" } }}>
        {props.text}
      </Box>
    </Button>
  );
}
