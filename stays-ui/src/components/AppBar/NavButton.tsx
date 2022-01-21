import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';


export default function NavButton(props: any){
    let navigate = useNavigate();

    const [mobile, setMobile] = React.useState(false);
    const [scroll, setScroll] = React.useState(false);
    React.useEffect(() => {
      handleResize();
      function handleResize() {
        setMobile(window.innerWidth < 600);
      }
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', () => {setScroll(window.scrollY != 0 )});

      return () => window.removeEventListener('resize', handleResize)
    }, []);


    return  (
        <Button
         variant = "text"
         style={{display: mobile ? 'none' : 'block'}}
         sx={
             {
                 p:2, 
                 mt:1, 
                 mr:4,
                 color: ((!props.changeColor) || scroll) ? "primary.dark" : "primary.light",
                }
            } 
         onClick={() => navigate(props.to)}
         >
          {props.text}
        </Button>
    )
}