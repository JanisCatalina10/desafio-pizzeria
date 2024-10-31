import { useState } from "react";
import Header from "../components/Header"
import CardPizza from "./CardPizza";
import "./Home.css"
import { pizzas } from '../utils/pizzas';

const Home = () => {
  const [pizzaList] = useState(pizzas);
  return (
    <>
    <div><Header/> </div>
      <div className="card-grid">
        {pizzaList.map((pizza) => (
          <CardPizza
            key={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
          />
        ))}
      </div>
    </>
  )
}

export default Home