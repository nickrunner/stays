import { Box, Container } from "@mui/material";
import StaysPage from "../../StaysPage";
import CmsFrame from "../CmsFrame";
import AddStay from '../../../components/Stay/AddStay';
import { StayContext } from "../../../components/Stay/StayContext";

export default function AddStaysCms()
{
    return (
        <StaysPage>
            <Box sx={{ display: 'flex' }}>
                <CmsFrame />
                <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
                    <StayContext>
                        <AddStay />
                    </StayContext>
                </Container>
            </Box>
        </StaysPage>
    );
}
