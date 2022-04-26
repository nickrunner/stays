import {
  Approval,
  AppShortcut,
  BookmarkAdded,
  CancelScheduleSend,
  Cottage,
  Dashboard,
  Instagram,
  LocalOffer,
  Loyalty,
  RoomService,
  StayPrimaryLandscape
} from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { display } from "@mui/system";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

import { OrgClient } from "../../../clients/orgClient";
import { StayClient } from "../../../clients/stayClient";
import { UserClient } from "../../../clients/userClient";
import { globalContext } from "../../../GlobalStore";
import { Org, OrgRecord, Role, StayRecord, User } from "../../../models";
import { Nav } from "../../AppBar/AppBar";
import Section from "../../general/Section";
import { NavItemProps } from "../NavItem";
import { PortalLayout } from "../PortalLayout";
import Applications from "./Applications";
import { HostingContext, hostingContext } from "./HostingContext";
import MyStays from "./MyStays";
import { OrgSelector } from "./OrgSelector";
import Services from "./Services";
import { StaySelector } from "./StaySelector";

export interface HostPortalProps {
  onStaysReceived?: (stays: StayRecord[]) => void;
  onOrgsReceived?: (orgs: OrgRecord[]) => void;
}

export default function HostPortal(props: PropsWithChildren<HostPortalProps>) {
  const [orgs, setOrgs] = React.useState<OrgRecord[]>([]);
  const [stays, setStays] = React.useState<StayRecord[]>([]);
  const { globalState, dispatch } = React.useContext(globalContext);

  function handleStayChange(stay: StayRecord) {
    if (stay) {
      dispatch({ type: "HOSTING_SELECT_STAY", payload: stay });
    }
  }

  function handleOrgChange(org: OrgRecord) {
    dispatch({ type: "HOSTING_SELECT_ORG", payload: org });
  }

  async function getStays(orgId: string) {
    const userStays: StayRecord[] = await new OrgClient().getOrgsStays(orgId);
    if (getSelectedStayId() === "") {
      dispatch({ type: "HOSTING_SELECT_STAY", payload: userStays[0] });
    }
    setStays(userStays);
    if (props.onStaysReceived) {
      props.onStaysReceived(userStays);
    }
  }

  async function getOrgs() {
    const userOrgs: OrgRecord[] = await new UserClient().getUserOrgs();

    setOrgs(userOrgs);
    if (getSelectedOrgId() === "") {
      dispatch({ type: "HOSTING_SELECT_ORG", payload: userOrgs[0] }); // Todo - select different org
    }
    if (props.onOrgsReceived) {
      props.onOrgsReceived(userOrgs);
    }
    if (userOrgs.length > 0) {
      await getStays(userOrgs[0].id);
    }
  }

  function getSelectedStayPhoto() {
    if (!globalState) {
      return "";
    }
    if (!globalState.hosting) {
      return "";
    }
    if (!globalState.hosting.selectedStay) {
      return "";
    }
    return globalState.hosting.selectedStay.photos[0].url;
  }

  function getSelectedStayName() {
    if (!globalState) {
      return "";
    }
    if (!globalState.hosting) {
      return "";
    }
    if (!globalState.hosting.selectedStay) {
      return "";
    }
    return globalState.hosting.selectedStay.name;
  }

  function getSelectedOrgId() {
    if (!globalState) {
      return "";
    }
    if (!globalState.hosting) {
      return "";
    }
    if (!globalState.hosting.selectedOrg) {
      return "";
    }
    return globalState.hosting.selectedOrg.id;
  }

  function getSelectedStayId() {
    if (!globalState) {
      return "";
    }
    if (!globalState.hosting) {
      return "";
    }
    if (!globalState.hosting.selectedStay) {
      return "";
    }
    return globalState.hosting.selectedStay.id;
  }

  React.useEffect(() => {
    if (!globalState.isSignedIn) {
      return;
    }
    getOrgs();
    return;
  }, []);

  const items: NavItemProps[][] = [
    [
      {
        href: "/hosts/portal/dashboard",
        icon: <Dashboard fontSize="small" />,
        title: "Dashboard"
      },
      {
        href: "/hosts/portal/membership",
        icon: <Loyalty fontSize="small" />,
        title: "Membership"
      },
      {
        href: "/hosts/portal/promotions",
        icon: <Instagram fontSize="small" />,
        title: "Promotions"
      },
      {
        href: "/hosts/portal/offers",

        icon: <LocalOffer fontSize="small" />,
        title: "Offers"
      },
      {
        href: "/hosts/portal/cancellations",

        icon: <CancelScheduleSend fontSize="small" />,
        title: "Cacellations"
      },
      {
        href: "/hosts/portal/early-booking",

        icon: <BookmarkAdded fontSize="small" />,
        title: "Early Booking"
      }
    ],
    [
      {
        href: "/hosts/portal/stays",
        icon: <Cottage fontSize="small" />,
        title: "My Stays"
      },
      {
        href: "/hosts/portal/applications",
        icon: <Approval fontSize="small" />,
        title: "Applications"
      },
      {
        href: "/hosts/portal/services",
        icon: <RoomService fontSize="small" />,
        title: "Services"
      }
    ]
  ];

  return (
    <HostingContext>
      <PortalLayout
        navItems={items}
        sidebarSelector={[
          <StaySelector
            key="staySelect"
            defaultStayId={getSelectedStayId()}
            onStaySelected={(stay: StayRecord) => {
              handleStayChange(stay);
            }}
            orgId={getSelectedOrgId()}
            stays={stays}
          />,
          <OrgSelector
            key="orgSelect"
            defaultOrgId={getSelectedOrgId()}
            onOrgSelected={(org: OrgRecord) => {
              handleOrgChange(org);
            }}
            orgId={getSelectedOrgId()}
            orgs={orgs}
          />
        ]}>
        <Box sx={{ justifyContent: "start", display: "flex" }}>
          <Avatar sx={{ height: 60, width: 60, mr: 2 }} src={getSelectedStayPhoto()}></Avatar>
          <Typography sx={{ mt: 1.5 }} align="center" variant="h4">
            {getSelectedStayName()}
          </Typography>
        </Box>
        {props.children}
      </PortalLayout>
    </HostingContext>
  );
}
