import { useState } from 'react';
import { pizzas } from '../utils/pizzas';
import { FormattedPrice } from '../utils/formattedprice';
import { nanoid } from 'nanoid';
import './cart.css';


const Cart = () => {
  const [cart, setCart] = useState(
    pizzas.map((pizza) => ({ ...pizza, quantity: 1 }))
  );
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((cartPizza) =>
        cartPizza.id === id ? { ...cartPizza, quantity: cartPizza.quantity + 1 } : cartPizza
      )
    );
  };
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((cartPizza) =>
          cartPizza.id === id ? { ...cartPizza, quantity: cartPizza.quantity - 1 } : cartPizza
        )
        .filter((cartPizza) => cartPizza.quantity > 0)
    );
  };
  const total = cart.reduce(
    (sum, cartPizza) => sum + cartPizza.price * cartPizza.quantity,
    0
  );
  return (
    <div className="cart">
    <h2>Detalles del pedido:</h2>
    <div className="cart-summary">
      {cart.map((cartPizza) => (
          <div key={cartPizza.id} className="cart-pizza">
            <img src={cartPizza.img} alt={cartPizza.name} className="cart-img" />
            <div className="cart-details">
              <span className="cart-name">{cartPizza.name}</span>
              <ul className='cart-list'>
                {cartPizza.ingredients.map((ingredient) => (
                  <li key={nanoid()}>{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</li>
                ))}
              </ul>
            </div>
            <div className="cart-controls">
            <span className="cart-price">{FormattedPrice(cartPizza.price)}</span>
              <button className="control-button" onClick={() => decreaseQuantity(cartPizza.id)}>-</button>
              <span className="cart-quantity">{cartPizza.quantity}</span>
              <button className="control-button" onClick={() => increaseQuantity(cartPizza.id)}>+</button>
            </div>
          </div>
        
      ))}
    </div>
    <h3 className="cart-total">Total: {FormattedPrice(total)}</h3>
    <button className="pay-button">Pagar</button>
  </div>
  );
};

export default Cart;
