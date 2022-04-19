import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Modal } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";

import { SitePromotionClient } from "../../clients/sitePromotionClient";
import { SitePromotion, SitePromotionRecord } from "../../models";
import CmsFrame from "../CmsFrame";
import Copyright from "../Copyright";
import AddSitePromotion from "./AddSitePromotion";
import SitePromotionsTable from "./SitePromotionsTable";

export default function SitePromotionCms() {
  const [promotions, setSitePromotions] = React.useState<SitePromotionRecord[]>([]);
  const [selectedSitePromotion, setSelectedSitePromotion] = React.useState<
    SitePromotion | undefined
  >(undefined);
  const [addOpen, setAddOpen] = React.useState(false);
  const handleAddClose = () => setAddOpen(false);

  const getSitePromotions = async () => {
    const promotions: SitePromotionRecord[] = await new SitePromotionClient().getSitePromotions();
    setSitePromotions(promotions);
  };

  React.useEffect(() => {
    setSitePromotions([]);
    getSitePromotions();
    return;
  }, []);

  function handleSitePromotionSelection(promotion: SitePromotionRecord) {
    setSelectedSitePromotion(promotion);
  }

  return (
    <React.Fragment>
      <Modal open={addOpen} onClose={handleAddClose}>
        <AddSitePromotion />
      </Modal>

      <Box sx={{ display: "flex" }}>
        <CmsFrame />
        <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "row" }}>
                <Button
                  variant="contained"
                  sx={{ m: 1, width: 200 }}
                  onClick={() => setAddOpen(true)}>
                  <AddIcon />
                  Add SitePromotion
                </Button>

                <Button
                  variant="contained"
                  sx={{ m: 1, width: 200 }}
                  disabled={selectedSitePromotion == undefined}>
                  <EditIcon />
                  Edit SitePromotion
                </Button>
                <Button
                  variant="contained"
                  sx={{ m: 1, width: 200, bgcolor: "error.main" }}
                  disabled={selectedSitePromotion == undefined}>
                  <DeleteIcon />
                  Delete SitePromotion
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 600
                }}>
                <SitePromotionsTable
                  onSelect={(promotion: SitePromotionRecord) => {
                    handleSitePromotionSelection(promotion);
                  }}
                  promotions={promotions}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 600,
                  overflow: "auto"
                }}></Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </React.Fragment>
  );
}
