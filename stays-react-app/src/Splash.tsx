import stays_purple from "./static/img/stays_purple.png";
import './Splash.css';
import Button from '@mui/material/Button';
import React from "react";

function Splash() {
  return (

    <div className="Splash">
        <header className="Splash-header">
            <img src={stays_purple} className="Splash-logo" alt="logo" />
            <p>
            <code>hey you</code>
            </p>
            <Button className="Splash-link" variant="contained" href="./test">Click me :)</Button>
        </header>
    </div>

  );
}

export default Splash;
