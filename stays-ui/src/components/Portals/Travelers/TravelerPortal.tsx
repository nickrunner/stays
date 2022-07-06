import { Loyalty, Settings } from "@mui/icons-material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useRouter } from "next/router";
import React from "react";

import { globalContext } from "../../../GlobalStore";
import Greeting from "../../AppBar/Greeting";
import { NavItemProps } from "../NavItem";
import { PortalLayout } from "../PortalLayout";

export default function TravelerPortal(props: any) {
  const [tabValue, setValue] = React.useState(0);
  const { globalState } = React.useContext(globalContext);
  const router = useRouter();

  React.useEffect(() => {
    if (!globalState.isSignedIn) {
      router.push("/");
    }
    if (!globalState.self) {
      router.push("/");
    }
    return;
  }, []);

  const items: NavItemProps[][] = [
    [
      {
        href: "/travelers/portal/opportunities",
        icon: <FmdBadIcon fontSize="small" />,
        title: "Opportunities"
      },
      {
        href: "/travelers/portal/favorites",
        icon: <FavoriteIcon fontSize="small" />,
        title: "Favorites"
      },
      {
        href: "/travelers/portal/giveaways",
        icon: <LocalOfferIcon fontSize="small" />,
        title: "Giveaways"
      },
      {
        href: "/travelers/portal/cancellations",
        icon: <CancelScheduleSendIcon fontSize="small" />,
        title: "Cancellations"
      },
      {
        href: "/travelers/portal/early-booking",
        icon: <BookmarkAddedIcon fontSize="small" />,
        title: "Early Booking"
      }
    ],
    [
      {
        href: "/travelers/portal/account",
        icon: <Settings fontSize="small" />,
        title: "Account"
      },
      {
        href: "/travelers/portal/membership",
        icon: <Loyalty fontSize="small" />,
        title: "Membership"
      }
    ]
  ];

  return (
    <React.Fragment>
      <PortalLayout navItems={items} sidebarSelector={[<Greeting key="greeting" />]}>
        {props.children}
      </PortalLayout>
    </React.Fragment>
  );
}
