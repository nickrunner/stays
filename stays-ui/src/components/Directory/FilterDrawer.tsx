import { Global } from "@emotion/react";
import { Close, FilterList } from "@mui/icons-material";
import { Box, Button, IconButton, SwipeableDrawer, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import React from "react";

import { StaySearchFilter } from "../../models";
import Filters from "./Filters";

export interface FilterDrawerProps {
  onFilterChange: (filter: StaySearchFilter) => void;
  filter: StaySearchFilter;
}
const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default
}));
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800]
}));
const drawerBleeding = 56;
export default function FilterDrawer(props: FilterDrawerProps) {
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [filter, setFilter] = React.useState(props.filter);
  function handleDrawerOpen() {
    setFiltersOpen(true);
    return null;
  }

  function handleDrawerClose() {
    setFiltersOpen(false);
    return null;
  }

  function handleOpenFilters() {
    setFiltersOpen(true);
  }

  function handleFilterChange(filter: StaySearchFilter) {
    setFilter(filter);
    props.onFilterChange(filter);
  }

  return (
    <React.Fragment>
      <Button
        sx={{ maxHeight: 45, minWidth: 300, m: 2 }}
        size="medium"
        variant="outlined"
        onClick={handleOpenFilters}
        startIcon={<FilterList />}>
        Filters (0)
      </Button>
      <Root>
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(85% - ${drawerBleeding}px)`,
              overflow: "auto"
            }
          }}
        />
        <SwipeableDrawer
          anchor={"bottom"}
          open={filtersOpen}
          onClose={() => handleDrawerClose()}
          onOpen={() => handleDrawerOpen()}
          swipeAreaWidth={drawerBleeding}
          sx={{ height: "85%", borderRadius: "25px" }}
          ModalProps={{
            keepMounted: false
          }}>
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0
            }}>
            <Box
              sx={{
                width: "100%",
                p: 2,
                mt: 6,
                position: "fixed",
                zIndex: 2,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                bgcolor: "background.default",
                display: "flex",
                justifyContent: "center"
              }}>
              <Typography variant="h3">Apply Filters</Typography>
              <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                <IconButton
                  onClick={() => {
                    setFiltersOpen(false);
                  }}>
                  <Close sx={{ fontSize: "50px" }} />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ mt: 16, overflow: "auto" }}>
              <Filters
                filter={props.filter}
                onChange={(filter: StaySearchFilter) => {
                  handleFilterChange(filter);
                }}
              />
            </Box>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </React.Fragment>
  );
}
