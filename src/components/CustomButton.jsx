import PropTypes from 'prop-types';

const CustomButton = ({text}) => {
  return (
    <button className='button-primary'>{text}</button>
  )
}
CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CustomButton