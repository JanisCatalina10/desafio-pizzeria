import { useCart } from "../context/UseCart";
import { useUser } from "../context/UseUser";
import { FormattedPrice } from "../utils/formattedprice";
import axios from "axios";
import Swal from "sweetalert2";
import "./cart.css";

const Cart = () => {
  const { cart, addToCart, removeFromCart, total } = useCart();
  const { token } = useUser();

  const handleCheckout = async () => {
    if (!token) {
      Swal.fire({
        title: "Error",
        text: "Debes iniciar sesión para realizar el pago",
        icon: "error",
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/checkouts",
        { cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Compra exitosa",
          text: "Gracias por tu compra",
          icon: "success",
        });
      }
    } catch {
      Swal.fire({
        title: "Error",
        text: "No se pudo realizar el pago",
        icon: "error",
      });
    }
  };

  return (
    <div className="cart">
      <h2>Detalles del pedido:</h2>
      <div className="cart-summary">
        {cart.map((cartPizza) => (
          <div key={cartPizza.id} className="cart-pizza">
            <img
              src={cartPizza.img}
              alt={cartPizza.name}
              className="cart-img"
            />
            <div className="cart-details">
              <span className="cart-name">{cartPizza.name}</span>
              <ul className="cart-list">
                {cartPizza.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="cart-controls">
              <span className="cart-price">
                {FormattedPrice(cartPizza.price)}
              </span>
              <button
                className="control-button"
                onClick={() => removeFromCart(cartPizza.id)}
              >
                -
              </button>
              <span className="cart-quantity">{cartPizza.quantity}</span>
              <button
                className="control-button"
                onClick={() => addToCart(cartPizza)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3 className="cart-total">Total: {FormattedPrice(total)}</h3>
      <button className="pay-button" onClick={handleCheckout} disabled={!token}>
        Pagar
      </button>{" "}
      {!token && (
        <p className="auth-warning">Por favor, inicia sesión para continuar.</p>
      )}
    </div>
  );
};

export default Cart;
