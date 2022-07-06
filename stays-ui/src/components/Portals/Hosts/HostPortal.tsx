import { CalendarToday, List } from "@material-ui/icons";
import { Analytics, Approval, Cottage, Dashboard, Loyalty, RoomService } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

import { OrgClient } from "../../../clients/orgClient";
import { StayClient } from "../../../clients/stayClient";
import { UserClient } from "../../../clients/userClient";
import { globalContext } from "../../../GlobalStore";
import { OrgRecord, StayRecord } from "../../../models";
import { NavItemProps } from "../NavItem";
import { PortalLayout } from "../PortalLayout";
import { HostingContext } from "./HostingContext";
import { OrgSelector } from "./OrgSelector";
import { StaySelector } from "./StaySelector";

export interface HostPortalProps {
  onStaysReceived?: (stays: StayRecord[]) => void;
  onOrgsReceived?: (orgs: OrgRecord[]) => void;
}

export default function HostPortal(props: PropsWithChildren<HostPortalProps>) {
  const [orgs, setOrgs] = React.useState<OrgRecord[]>([]);
  const [stays, setStays] = React.useState<StayRecord[]>([]);
  const { globalState, dispatch } = React.useContext(globalContext);

  const router = useRouter();
  const staySpecific: boolean =
    router.pathname.includes("dashboard") ||
    router.pathname.includes("listing") ||
    router.pathname.includes("analytics") ||
    router.pathname.includes("membership") ||
    router.pathname.includes("calendar");

  async function handleStayChange(stay: StayRecord) {
    if (stay) {
      const s = await new StayClient().getStay(stay.id);
      dispatch({ type: "HOSTING_SELECT_STAY", payload: s });
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
    ],
    [
      {
        href: "/hosts/portal/dashboard",
        icon: <Dashboard fontSize="small" />,
        title: "Dashboard"
      },
      {
        href: "/hosts/portal/listing",
        icon: <List fontSize="small" />,
        title: "Listing"
      },
      {
        href: "/hosts/portal/listing",
        icon: <Analytics fontSize="small" />,
        title: "Analytics"
      },
      {
        href: "/hosts/portal/membership",
        icon: <Loyalty fontSize="small" />,
        title: "Membership"
      },
      {
        href: "/hosts/portal/promotions",
        icon: <CalendarToday fontSize="small" />,
        title: "Calendar"
      }
    ]
  ];

  return (
    <HostingContext>
      <PortalLayout
        navItems={items}
        sidebarSelector={[
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
        <Box sx={{ justifyContent: "start", display: staySpecific ? "flex" : "none" }}>
          <Avatar sx={{ height: 60, width: 60, mr: 2 }} src={getSelectedStayPhoto()}></Avatar>
          <StaySelector
            key="staySelect"
            defaultStayId={getSelectedStayId()}
            onStaySelected={(stay: StayRecord) => {
              handleStayChange(stay);
            }}
            orgId={getSelectedOrgId()}
            stays={stays}
          />
        </Box>
        {props.children}
      </PortalLayout>
    </HostingContext>
  );
}
