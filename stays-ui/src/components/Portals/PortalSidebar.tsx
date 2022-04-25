import { ChatRounded, Login, Person, Settings, ShoppingBag } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";

import { content } from "../../content";
import StaysLogo from "../../graphics/StaysLogo";
import { theme } from "../../Theme";
import { NavItem, NavItemProps } from "./NavItem";

export interface PortalSidebarProps {
  onClose: () => void;
  open: boolean;
  items: NavItemProps[][];
  selector: any[];
}

export const PortalSidebar = (props: PortalSidebarProps) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const cntnt = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "primary.dark"
        }}>
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <img height={60} src={content.images.logo.white} alt="Stays Logo"></img>
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                borderRadius: 1,
                backgroundColor: "rgba(255, 255, 255, 0.04)"
              }}>
              <div>{props.selector[0]}</div>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            {props.items[0].map((item) => (
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
            ))}
          </Box>
        </div>

        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3
          }}
        />
        <Box sx={{ px: 2 }}>
          <Box
            sx={{
              borderRadius: 1,
              backgroundColor: "rgba(255, 255, 255, 0.04)"
            }}>
            <div>{props.selector[1]}</div>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, my: 3 }}>
          {props.items[1].map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}>
          <Typography color="neutral.100" variant="subtitle2">
            Need help?
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%"
              }
            }}></Box>
          <NextLink href="https://material-kit-pro-react.devias.io/" passHref>
            <Button
              color="primary"
              component="a"
              endIcon={<OpenInNewIcon />}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained">
              Contact Us
            </Button>
          </NextLink>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280
          }
        }}
        variant="permanent">
        {cntnt}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary">
      {cntnt}
    </Drawer>
  );
};
