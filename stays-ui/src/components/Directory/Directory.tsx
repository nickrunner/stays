import { Box, Drawer, SwipeableDrawer, Toolbar } from "@mui/material";
import React from "react";
import { useUpdateEffect } from "react-use";

import { StayClient } from "../../clients/stayClient";
import { StayRecord, StaySearchFilter } from "../../models";
import { Nav } from "../AppBar/AppBar";
import SearchBar from "../general/SearchBar";
import SwipeableEdgeDrawer from "../general/SwipeableEdgeDrawer";
import DirectoryFilter from "./DirectoryFilter";
import DirectoryListings from "./DirectoryListings";

export default function Directory(props: any) {
  const [staysArr, setStaysArr] = React.useState<StayRecord[]>(props.stays ?? []);
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [filter, setFilter] = React.useState<StaySearchFilter>({ enable: true });
  const [pagination, setPagination] = React.useState({ lastEvaluatedKey: 0, count: 10 });

  const getStays = async () => {
    console.log("GETTING STAYS with filter: " + JSON.stringify(filter, null, 2));
    try {
      const newStays = await new StayClient().getStays(searchPhrase, filter, pagination);
      setStaysArr([]);
      setStaysArr(newStays);
    } catch (err) {
      console.log("FAILED getting stays: " + JSON.stringify(err, null, 2));
    }
  };

  async function handleScroll() {
    // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight -40) {
    //   await getStays();
    // }
  }

  useUpdateEffect(() => {
    console.log("Filter use effect");
    getStays();
    return;
  }, [filter]);

  useUpdateEffect(() => {
    getStays();
    return;
  }, [searchPhrase]);

  React.useEffect(() => {
    getStays();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSearch(phrase: string) {
    setStaysArr([]);
    setSearchPhrase(phrase);
    console.log("Searching with phrase: " + phrase);
    getStays();
  }

  function handleFilterChange(filter: StaySearchFilter) {
    console.log("FILTER CHANGE");
    setFilter(filter);
  }

  function handleDrawerOpen() {
    return null;
  }

  function handleDrawerClose() {
    return null;
  }

  return (
    <React.Fragment>
      <Nav variant="search" transparent={false} onSearch={(phrase) => handleSearch(phrase)} />
      <Box sx={{ display: "flex", mt: 10 }}>
        <SwipeableEdgeDrawer>
          <Box sx={{ p: 5, overflow: "auto" }}>
            <DirectoryFilter
              filter={filter}
              onChange={(filter: StaySearchFilter) => {
                handleFilterChange(filter);
              }}
            />
          </Box>
        </SwipeableEdgeDrawer>

        <Box sx={{ height: "100%", display: { xs: "none", sm: "block" } }}>
          <Drawer
            anchor="left"
            variant="permanent"
            sx={{
              width: 350,
              height: "100%",
              [`& .MuiDrawer-paper`]: { width: 350, height: "100%", boxSizing: "border-box" }
            }}>
            <Box sx={{ mt: 15, height: "100%", p: 0, overflow: "auto" }}>
              <DirectoryFilter
                filter={filter}
                onChange={(filter: StaySearchFilter) => {
                  handleFilterChange(filter);
                }}
              />
            </Box>
          </Drawer>
        </Box>

        <Box component="main">
          <DirectoryListings stays={staysArr} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
