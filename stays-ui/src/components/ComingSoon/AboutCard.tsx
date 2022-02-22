import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";

export default function AboutCard(props: any) {
    return (
    <Card
    sx={{maxWidth:"sm"}}
    >
    <CardHeader
        title={props.title}
        subheader={props.subheader}
        action={props.children}
        titleTypographyProps={{ 
            align: 'center',
            variant: 'h3', 
            color: "common.black"
        }}
        subheaderTypographyProps={{
            align: 'center',
        variant: "subtitle1",
        color:"primary.main"
        }}
        sx={{
        
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
        }}
    />
    <CardContent>
        <ul>
        {props.description.map((line: any) => (
            <Typography
                component="li"
                variant="subtitle1"
                align="left"
                sx={{p:1, ml:5}}
                key={line}
            >
                {line}
            </Typography>
        
        
        ))}
        </ul>
    </CardContent>
    </Card>
    );
}