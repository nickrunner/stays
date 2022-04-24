import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PropsWithChildren, useState } from "react";

import { Nav } from "../AppBar/AppBar";
import { NavItemProps } from "./NavItem";
import { PortalSidebar } from "./PortalSidebar";

const PortalLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280
  }
}));

export interface PortalLayoutProps {
  navItems: NavItemProps[][];
  sidebarSelector: any[];
}

export const PortalLayout = (props: PropsWithChildren<PortalLayoutProps>) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <PortalLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%"
          }}>
          {props.children}
        </Box>
      </PortalLayoutRoot>
      <Nav transparent={false} onSidebarOpen={() => setSidebarOpen(true)} />
      <PortalSidebar
        items={props.navItems}
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        selector={props.sidebarSelector}
      />
    </>
  );
};
