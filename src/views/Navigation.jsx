import { FormattedPrice } from '../utils/formattedprice';

const Navigation = () => {
  const total = 25000;
  const token = false;
  const formattedValue = FormattedPrice (total)

  return (
    <nav className="navbar">
      <ul className="nav-items">
      <h2 className="navbar-title">¡Pizzeria Mamma Mia!</h2>
        <li><a href="#Home">Home</a></li>
        {token ? (
          <>
            <li><a href="#Profile">Profile</a></li>
            <li><a href="#Logout">Logout</a></li>
          </>
        ) : (
          <>
            <li><a href="#Login">Login</a></li>
            <li><a href="#Register">Register</a></li>
          </>
        )}
        <li className="right-item">
          <a href="#Total">🛒 Total: {formattedValue}</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation