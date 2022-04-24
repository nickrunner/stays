import { Cottage, RoomService, StayPrimaryLandscape } from "@mui/icons-material";
import { display } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

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

export default function HostPortal(props: any) {
  const [orgs, setOrgs] = React.useState<OrgRecord[]>([]);
  const [stays, setStays] = React.useState<StayRecord[]>([]);
  const { globalState, dispatch } = React.useContext(globalContext);
  const router = useRouter();

  function handleStayChange(stay: StayRecord) {
    dispatch({ type: "HOSTING_SELECT_STAY", payload: stay });
  }

  function handleOrgChange(org: OrgRecord) {
    dispatch({ type: "HOSTING_SELECT_ORG", payload: org });
  }

  async function getStays(orgId: string) {
    const userStays: StayRecord[] = await new OrgClient().getOrgsStays(orgId);
    setStays(userStays);
  }

  async function getOrgs() {
    const userOrgs: OrgRecord[] = await new UserClient().getUserOrgs();
    setOrgs(userOrgs);
    dispatch({ type: "HOSTING_SELECT_ORG", payload: userOrgs[0] }); // Todo - select different org
    if (userOrgs.length > 0) {
      getStays(userOrgs[0].id);
    }
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
    console.log("Global State: " + JSON.stringify(globalState, null, 2));
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
        icon: <StayPrimaryLandscape fontSize="small" />,
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
        href: "/hosts/portal/membership",
        icon: <Cottage fontSize="small" />,
        title: "Membership"
      },
      {
        href: "/hosts/portal/promotions",
        icon: <StayPrimaryLandscape fontSize="small" />,
        title: "Promotions"
      },
      {
        href: "/hosts/portal/offers",

        icon: <RoomService fontSize="small" />,
        title: "Offers"
      },
      {
        href: "/hosts/portal/cancellations",

        icon: <RoomService fontSize="small" />,
        title: "Cacellations"
      },
      {
        href: "/hosts/portal/early-booking",

        icon: <RoomService fontSize="small" />,
        title: "Early Booking"
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
          />,
          <StaySelector
            key="staySelect"
            defaultStayId={getSelectedStayId()}
            onStaySelected={(stay: StayRecord) => {
              handleStayChange(stay);
            }}
            orgId={getSelectedOrgId()}
            stays={stays}
          />
        ]}>
        {props.children}
      </PortalLayout>
    </HostingContext>
  );
}
