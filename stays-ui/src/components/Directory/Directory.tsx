import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useUpdateEffect } from "react-use";

import { StayClient } from "../../clients/stayClient";
import { StayRecord, StaySearchFilter } from "../../models";
import { Nav } from "../AppBar/AppBar";
import SwipeableEdgeDrawer from "../general/SwipeableEdgeDrawer";
import AppBarFilters from "./AppBarFilters";
import DirectoryListings from "./DirectoryListings";

export default function Directory(props: any) {
  const router = useRouter();
  const { query, isReady } = useRouter();
  const [staysArr, setStaysArr] = React.useState<StayRecord[]>(props.stays ?? []);
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [filter, setFilter] = React.useState<StaySearchFilter>({});
  const [pagination, setPagination] = React.useState({ lastEvaluatedKey: 0, count: 10 });

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

  return (
    <Box sx={{ display: "grid" }}>
      <Nav variant="search" transparent={false} onSearch={(phrase) => handleSearch(phrase)}>
        <AppBarFilters
          filter={filter}
          onChange={(filter: StaySearchFilter) => {
            handleFilterChange(filter);
          }}></AppBarFilters>
      </Nav>

      <Box sx={{ display: "flex", mt: 0, justifyContent: "center" }}>
        <SwipeableEdgeDrawer>
          <Box sx={{ p: 5, overflow: "auto" }}>
            <AppBarFilters
              filter={filter}
              onChange={(filter: StaySearchFilter) => {
                handleFilterChange(filter);
              }}
            />
          </Box>
        </SwipeableEdgeDrawer>

        <Box component="main" sx={{ mt: 25, zIndex: 0, p: 5 }}>
          <DirectoryListings stays={staysArr} />
        </Box>
      </Box>
    </Box>
  );
}
