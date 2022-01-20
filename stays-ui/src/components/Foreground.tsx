import { Box, Container } from "@mui/material";


export default function Foreground(props: any) {

    return (
          <Box
              sx={{
              position: 'relative',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              bgcolor: 'background.default',
              zIndex: -1,
              justifyContent: "center"
              
          }}>
  
          </Box>
    )
}