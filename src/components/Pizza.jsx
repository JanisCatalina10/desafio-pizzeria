import { useEffect, useState } from "react";
import "./Pizza.css";
import { FormattedPrice } from "../utils/formattedprice";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const apiUrl = "http://localhost:5000/api/pizzas/p001";
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener pizza");
        }
        const data = await response.json();
        console.log(data);
        setPizza(data);
      } catch (error) {
        console.error("Error al obtener pizza:", error);
      }
    };
    fetchPizza();
  }, []);
  if (pizza === null) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="pizza-container">
      <h2 className="pizza-name">
        {pizza.name.charAt(0).toUpperCase() + pizza.name.slice(1).toLowerCase()}
      </h2>
      <img className="pizza-img" src={pizza.img} alt={pizza.name} />
      <p className="pizza-desc">{pizza.desc}</p>
      <ul className="ing-list">
        <h3 className="pizza-ing">Ingredientes:</h3>
        {pizza.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.charAt(0).toUpperCase() +
              ingredient.slice(1).toLowerCase()}
            {index < ingredient.length - 1 && ", "}
          </li>
        ))}
      </ul>
      <p className="pizza-price">Precio: {FormattedPrice(pizza.price)}</p>
      <button className="pizza-btn">Agregar al carrito</button>
    </div>
  );
};

export default Pizza;
