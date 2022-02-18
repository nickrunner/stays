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
        
        <div>
            {props.children}
        </div>
    );
}
