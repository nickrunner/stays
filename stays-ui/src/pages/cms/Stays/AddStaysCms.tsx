import { Box, Container } from "@mui/material";
import StaysPage from "../../StaysPage";
import CmsFrame from "../CmsFrame";
import AddStay from '../../../components/AddStay/AddStay';

export default function AddStaysCms()
{
    return (
        <StaysPage>
            <Box sx={{ display: 'flex' }}>
                <CmsFrame />
                <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
                    <AddStay />
                </Container>
            </Box>
        </StaysPage>
    );
}
