import { Container, ThemeProvider } from "@mui/material";
import React, { Dispatch, ReactElement, ReactNode, useContext, useRef } from "react";
import { theme } from "../Theme";
import { User } from "../models/User";
import { UserClient } from "../clients/userClient";
import Reducer from "../reducer";
import { useInRouterContext } from "react-router-dom";
import { globalContext } from "../GlobalStore";



export default function StaysPage(props: any){
    const {globalState, dispatch} = useContext(globalContext);

    React.useEffect(() => {
        
        handleResize();

        function handleResize() {
            dispatch({type:"RESIZE", payload:(window.innerWidth < 600)});
        }

        const getSelf = async() => {
            console.log("Getting self");
            try{
                const self: User = await new UserClient().getSelf();
                console.log("Got self: ", {self});
                dispatch({type: "GET_SELF", payload: self});

            }
            catch(e){
                console.log("Not signed in: ", {e});
                dispatch({type: "GET_SELF", payload: undefined});
            }
        }
        getSelf();
  
        window.addEventListener('resize', handleResize)
    return 
    }, []);


    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}
