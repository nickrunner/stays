import stays_purple from "../../static/img/stays_purple.png";
import './Splash.css';

export default function Splash() {
  return (
    <div className="Splash">
        <header className="Splash-header">
            <img src={stays_purple} className="Splash-logo" alt="logo" />
        </header>
    </div>
  );
}


