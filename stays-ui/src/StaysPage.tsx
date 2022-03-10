import React, { useContext } from "react";

import { UserClient } from "../src/clients/userClient";
import { globalContext } from "../src/GlobalStore";
import { EventClient } from "./clients/eventClient";

export default function StaysPage(props: any) {
  const { dispatch } = useContext(globalContext);

  React.useEffect(() => {
    handleResize();

    function handleResize() {
      dispatch({ type: "RESIZE", payload: window.innerWidth < 600 });
    }
    const eventClient = new EventClient();
    eventClient.setPage(window.location.pathname);

    console.log("Getting self");

    if (!props.noLogin) {
      new UserClient()
        .getSelf()
        .then((value) => {
          console.log("Got self: ", { value });
          dispatch({ type: "GET_SELF", payload: value });
        })
        .catch((reason) => {
          console.log("Not signed in: ", { reason });
          dispatch({ type: "GET_SELF", payload: undefined });
        })
        .finally(() => {
          console.log("Get Self Finish");
        });
    }
  }, []);

  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
}
