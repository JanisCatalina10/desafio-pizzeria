import { Link } from "react-router-dom";
import { FormattedPrice } from "../utils/formattedprice";

const Navigation = () => {
  const total = 25000;
  const token = true;
  const formattedValue = FormattedPrice(total);

  return (
    <nav className="navbar">
      <ul className="nav-items">
        <h2 className="navbar-title">¡Pizzeria Mamma Mia!</h2>
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        <li className="right-item">
          <Link to="/cart">🛒 Total: {formattedValue}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
