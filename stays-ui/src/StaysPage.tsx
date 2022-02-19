import { ThemeProvider } from "@mui/material";
import React, { useContext } from "react";
import { theme } from "./Theme";
import { User } from "../src/models/User";
import { UserClient } from "../src/clients/userClient";
import { globalContext, GlobalStore } from "../src/GlobalStore";



export default function StaysPage(props: any){
    const {globalState, dispatch} = useContext(globalContext);

    React.useEffect(() => {
        
        handleResize();

        function handleResize() {
            dispatch({type:"RESIZE", payload:(window.innerWidth < 600)});
        }
        
        console.log("Getting self");

        new UserClient().getSelf().then((value) => {
            console.log("Got self: ", {value});
            dispatch({type: "GET_SELF", payload: value});
        } ).catch((reason) => {
            console.log("Not signed in: ", {reason});
            dispatch({type: "GET_SELF", payload: undefined});
        }).finally(() => {
            console.log("Get Self Finish");
        });
        window.addEventListener('resize', handleResize)
  
        
    return () => window.removeEventListener('resize', handleResize)
    }, []);


    return (
        
        <div>
            <main></main>
            {props.children}
        </div>
    );
}
