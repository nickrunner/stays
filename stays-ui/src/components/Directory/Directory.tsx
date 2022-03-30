import { Close, Filter, Filter1, FilterList } from "@mui/icons-material";
import { Box, Button, Drawer, IconButton, Paper, SwipeableDrawer, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUpdateEffect } from "react-use";

import { StayClient } from "../../clients/stayClient";
import { StayRecord, StaySearchFilter } from "../../models";
import { Nav } from "../AppBar/AppBar";
import SectionHead from "../general/SectionHead";
import SwipeableEdgeDrawer from "../general/SwipeableEdgeDrawer";
import AppBarFilters from "./AppBarFilters";
import DirectoryListings from "./DirectoryListings";
import Filters from "./Filters";

export default function Directory(props: any) {
  const router = useRouter();
  const { query, isReady } = useRouter();
  const [staysArr, setStaysArr] = React.useState<StayRecord[]>(props.stays ?? []);
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [filter, setFilter] = React.useState<StaySearchFilter>({});
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState({ lastEvaluatedKey: 0, count: 12 });

  function updateUrl() {
    router.push({
      pathname: "/directory",
      query: { search: encodeURI(searchPhrase), filter: encodeURI(JSON.stringify(filter)) }
    });
  }

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

  useEffect(() => {
    if (!isReady) return;
    if (!query) return;
    if (query.filter) {
      setFilter(JSON.parse(decodeURI(query.filter as string)));
    }
    if (query.searchPhrase) {
      setSearchPhrase(query.search as string);
    }

    return;
  }, [isReady]);

  useUpdateEffect(() => {
    updateUrl();
    getStays();
    return;
  }, [filter]);

  useUpdateEffect(() => {
    updateUrl();
    getStays();
    return;
  }, [searchPhrase]);

  async function handleSearch(phrase: string) {
    setStaysArr([]);
    setSearchPhrase(phrase);
    getStays();
  }

  function handleFilterChange(filter: StaySearchFilter) {
    updateUrl();
    setFilter(filter);
  }

  function handleDrawerOpen() {
    return null;
  }

  function handleDrawerClose() {
    return null;
  }

  function handleOpenFilters() {
    setFiltersOpen(true);
  }

  return (
    <Box sx={{ display: "grid" }}>
      <Nav variant="search" transparent={false} onSearch={(phrase) => handleSearch(phrase)}>
        <AppBarFilters
          filter={filter}
          onChange={(filter: StaySearchFilter) => {
            handleFilterChange(filter);
          }}></AppBarFilters>
        <Box sx={{ width: "100%", display: { xs: "flex", lg: "none" }, justifyContent: "center" }}>
          <Button
            sx={{ maxHeight: 45, minWidth: 200, m: 2 }}
            size="medium"
            variant="outlined"
            onClick={handleOpenFilters}
            startIcon={<FilterList />}>
            Filters (0)
          </Button>
        </Box>
      </Nav>

      <Box sx={{ display: "flex", mt: 0, justifyContent: "center", height: "85%" }}>
        <Drawer anchor={"bottom"} open={filtersOpen} sx={{ heigh: "85%", borderRadius: "25px" }}>
          <Box
            sx={{
              borderRadius: "2px",
              height: "85%",
              display: "flex",
              gap: 2,
              justifyContent: "center",
              bgcolor: "background.default"
            }}>
            <Box
              sx={{
                width: "100%",
                p: 2,
                position: "fixed",
                zIndex: 2,
                bgcolor: "background.default",
                display: "flex",
                justifyContent: "center"
              }}>
              <Box sx={{ position: "absolute", top: 10, left: 10 }}>
                <IconButton
                  onClick={() => {
                    setFiltersOpen(false);
                  }}>
                  <Close sx={{ fontSize: "50px" }} />
                </IconButton>
              </Box>
              <Typography variant="h3">Apply Filters</Typography>
            </Box>
            <Box sx={{ mt: 10, overflow: "auto" }}>
              <Filters
                filter={filter}
                onChange={(filter: StaySearchFilter) => {
                  handleFilterChange(filter);
                }}
              />
            </Box>
          </Box>
        </Drawer>

        <Box component="main" sx={{ mt: { xs: 15, lg: 25 }, zIndex: 0, p: 5 }}>
          <DirectoryListings stays={staysArr} />
        </Box>
      </Box>
    </Box>
  );
}
