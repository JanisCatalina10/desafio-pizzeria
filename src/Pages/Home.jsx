import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./Home.css";
import CardPizza from "../views/CardPizza";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const url = "http://localhost:5000/api/pizzas";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener pizzas");
        }
        const data = await response.json();
        console.log(data);
        setPizzas(data);
      } catch (error) {
        console.error("Error al obtener las pizzas:", error);
      }
    };
    fetchPizzas();
  }, []);
  return (
    <>
      <div>
        <Header />{" "}
      </div>
      <div className="card-grid">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            img={pizza.img}
            showMoreButton={true}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
