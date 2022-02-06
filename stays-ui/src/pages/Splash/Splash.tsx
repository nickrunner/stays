import './Splash.css';
import { images } from "../../content";
export default function Splash() {
  return (
    <div className="Splash">
        <header className="Splash-header">
            <img src={images.logo.purple} className="Splash-logo" alt="logo" />
        </header>
    </div>
  );
}


