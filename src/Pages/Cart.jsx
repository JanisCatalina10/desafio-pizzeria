import { useCart } from "../context/UseCart";
import { useUser } from "../context/UseUser";
import { FormattedPrice } from "../utils/formattedprice";
import "./cart.css";

const Cart = () => {
  const { cart, addToCart, removeFromCart, total } = useCart();
  const { token } = useUser();

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
      <button className="pay-button" disabled={!token}>
        Pagar
      </button>{" "}
      {!token && (
        <p className="auth-warning">Por favor, inicia sesión para continuar.</p>
      )}
    </div>
  );
};

export default Cart;
