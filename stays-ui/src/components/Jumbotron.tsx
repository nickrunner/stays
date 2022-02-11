import { Box, Container } from "@mui/material";
import { table } from "console";
import { isPropertySignature } from "typescript";


export default function Jumbotron(props: any) {

    return (
      <Box
            sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 350,
            bgcolor: 'primary.main',
            zIndex: -1,
            justifyContent: "center"
            
        }}>
            <img
                className='HeroImage'
                src={props.backgroundImage}
                width="100%"
                height="100%"
            />

        </Box>
    )
}