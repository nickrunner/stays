import { Box, Container } from "@mui/material";
import StaysPage from "../../StaysPage";
import CmsFrame from "../CmsFrame";
import AddStay from '../../../components/AddStay/AddStay';
import { AddStayContext } from "../../../components/AddStay/AddStayContext";

export default function AddStaysCms()
{
    return (
        <StaysPage>
            <Box sx={{ display: 'flex' }}>
                <CmsFrame />
                <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
                    <AddStayContext>
                        <AddStay />
                    </AddStayContext>
                </Container>
            </Box>
        </StaysPage>
    );
}
