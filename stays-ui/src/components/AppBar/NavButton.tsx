import { Button } from "@mui/material";
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

  React.useEffect(() => {
    function handleScroll() {
      setScroll(window.scrollY != 0);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button
      startIcon={props.icon}
      variant="text"
      sx={{
        display: { xs: "none", md: "block" },
        p: 2,
        mt: 1,
        mr: 4,
        color: !props.transparent || scroll ? "primary.dark" : "primary.light",
        hover: "#6c5ee6",
        ...props.sx
      }}
      onClick={() => router.push(props.to)}>
      {props.text}
    </Button>
  );
}
