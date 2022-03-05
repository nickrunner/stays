import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Modal } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import * as React from 'react';

import { Promotion, PromotionRecord } from '../../../../common/models/Promotion';
import { PromotionClient } from '../../clients/promotionClient';
import CmsFrame from '../CmsFrame';
import Copyright from '../Copyright';
import AddPromotion from './AddPromotion';
import PromotionsTable from './PromotionsTable';

export default function PromotionCms() {
  const [promotions, setPromotions] = React.useState<PromotionRecord[]>([]);
  const [selectedPromotion, setSelectedPromotion] = React.useState<Promotion | undefined>(
    undefined
  );
  const [addOpen, setAddOpen] = React.useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const getPromotions = async () => {
    const promotions: PromotionRecord[] = await new PromotionClient().getPromotions();
    setPromotions(promotions);
  };

  React.useEffect(() => {
    setPromotions([]);
    getPromotions();
    return;
  }, []);

  function handlePromotionSelection(promotion: PromotionRecord) {
    setSelectedPromotion(promotion);
  }

  return (
    <React.Fragment>
      <Modal open={addOpen} onClose={handleAddClose}>
        <AddPromotion />
      </Modal>

      <Box sx={{ display: 'flex' }}>
        <CmsFrame />
        <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
                <Button
                  variant="contained"
                  sx={{ m: 1, width: 200 }}
                  onClick={() => setAddOpen(true)}>
                  <AddIcon />
                  Add Promotion
                </Button>

                <Button
                  variant="contained"
                  sx={{ m: 1, width: 200 }}
                  disabled={selectedPromotion == undefined}>
                  <EditIcon />
                  Edit Promotion
                </Button>
                <Button
                  variant="contained"
                  sx={{ m: 1, width: 200, bgcolor: 'error.main' }}
                  disabled={selectedPromotion == undefined}>
                  <DeleteIcon />
                  Delete Promotion
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 600
                }}>
                <PromotionsTable
                  onSelect={(promotion: PromotionRecord) => {
                    handlePromotionSelection(promotion);
                  }}
                  promotions={promotions}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 600,
                  overflow: 'auto'
                }}></Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </React.Fragment>
  );
}
