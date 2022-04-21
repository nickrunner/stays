import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/router";
import React from "react";

import { StaysAppBarProps } from "./AppBar";

export interface NavTabProps extends StaysAppBarProps {
  text: string;
  to: string;
  sx?: any;
  icon?: any;
}

export default function NavTab(props: NavTabProps) {
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
    <Tab
      icon={props.icon}
      iconPosition="start"
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      sx={{
        display: { xs: "none", md: "block" },
        p: 2,
        mt: 1,
        mr: 4,
        color: !props.transparent || scroll ? "primary.dark" : "primary.light",
        hover: "#6c5ee6",
        textTransform: "none",
        ...props.sx
      }}
      label={props.text}
      href={props.to}></Tab>
  );
}
