import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import "./CardPizza.css";
import { FormattedPrice } from "../utils/formattedprice";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";

const CardPizza = ({ name, desc, price, ingredients, img, showMoreButton }) => {
  const formattedPrice = FormattedPrice(price);
  console.log(ingredients);
  return (
    <div className="card-container">
      <div className="cards">
        <Card style={{ width: "25rem" }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>
              <h2>
                {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
              </h2>
            </Card.Title>
            <hr />
            <Card.Text>
              <p className="desc-text">{desc}</p>
            </Card.Text>
            <Card.Text>
              <h3>Ingredientes:</h3>
              <ul className="ing-list">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.charAt(0).toUpperCase() +
                      ingredient.slice(1).toLowerCase()}
                    {index < ingredients.length - 1 && ", "}
                  </li>
                ))}
              </ul>
            </Card.Text>
            <hr />
            <Card.Text>
              <p className="price-text">Precio: {formattedPrice}</p>
            </Card.Text>
            <div className="button-container">
              {showMoreButton && (
                <Link to="/pizza/001">
                  <CustomButton text="Ver más" />{" "}
                </Link>
              )}
              <CustomButton text="Añadir" />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

CardPizza.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
  showMoreButton: PropTypes.bool,
};

export default CardPizza;
