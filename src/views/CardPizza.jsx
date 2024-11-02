import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import './CardPizza.css'; 
import { FormattedPrice } from '../utils/formattedprice';
import CustomButton from '../components/CustomButton';
import { nanoid } from 'nanoid'

const CardPizza = ({name, price, ingredients, img}) => {
  const formattedPrice = FormattedPrice(price);
  console.log(ingredients);
    return (
        <div className="card-container">
        <div className="cards">
          <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title><h2>{name}</h2></Card.Title>
              <hr />
              <Card.Text>
                <h3>Ingredientes:</h3>
                <ul className='ing-list'>
                {ingredients.map((ingredient) => (
                  <li key={nanoid()}>{ingredient}</li> 
                ))}
              </ul>
              </Card.Text>
              <hr />
              <Card.Text>
                <p className='price-text'>
                  Precio: {formattedPrice}
                </p>
              </Card.Text>
              <div className="button-container"> 
                <CustomButton text="Ver más"/>
                <CustomButton text="Añadir" />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
  )
}

CardPizza.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired, 
    img: PropTypes.string.isRequired,
};


export default CardPizza