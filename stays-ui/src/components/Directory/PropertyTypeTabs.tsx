import { TabContext, TabList } from "@mui/lab";
import { Tab } from "@mui/material";
import React from "react";

export default function PropertyTypeTabs(props: any) {
  const [value, setValue] = React.useState("1");
  return (
    <TabContext value={value}>
      <TabList aria-label="lab API tabs example">
        <Tab label="A-Frame" value="1" />
        <Tab label="Cabin/Cottage" value="2" />
        <Tab label="Treehouse" value="3" />
      </TabList>
    </TabContext>
  );
}
