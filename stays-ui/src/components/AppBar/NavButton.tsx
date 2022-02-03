import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { StaysAppBarProps } from "./AppBar";
import { globalContext } from "../../GlobalStore";

export interface NavButtonProps extends StaysAppBarProps {
  text: string;
  to: string;
}

export default function NavButton(props: NavButtonProps){
    let navigate = useNavigate();
    const { globalState, dispatch } = React.useContext(globalContext);
    const [scroll, setScroll] = React.useState(false);

    React.useEffect(() => {

      function handleScroll(){
        setScroll(window.scrollY != 0 );
      }

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll)
    }, []);


    return  (
        <Button
         variant = "text"
         style={{display: globalState.mobile ? 'none' : 'block'}}
         sx={
             {
                 p:2, 
                 mt:1, 
                 mr:4,
                 color: ((!props.transparent) || scroll) ? "primary.dark" : "primary.light",
                }
            } 
         onClick={() => navigate(props.to)}
         >
          {props.text}
        </Button>
    )
}