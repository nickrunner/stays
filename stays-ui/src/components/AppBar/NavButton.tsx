import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from 'react';
import { StaysAppBarProps } from "./AppBar";
import { globalContext } from "../../GlobalStore";

export interface NavButtonProps extends StaysAppBarProps {
  text: string;
  to: string;
}

export default function NavButton(props: NavButtonProps){
    let router = useRouter();
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
         sx={
             {
                 display:{ xs:'none',  md: 'block'},
                 p:2, 
                 mt:1, 
                 mr:4,
                 color: ((!props.transparent) || scroll) ? "primary.dark" : "primary.light",
                }
            } 
         onClick={() => router.push(props.to)}
         >
          {props.text}
        </Button>
    )
}