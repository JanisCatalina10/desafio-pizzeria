import { Link } from "react-router-dom";
import "./NotFound.css";

const Notfound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <Link to="/">Volver a la página de inicio</Link>
      </div>
    </div>
  );
};

export default Notfound;
