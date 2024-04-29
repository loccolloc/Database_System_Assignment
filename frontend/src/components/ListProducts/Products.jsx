
import PropTypes from 'prop-types'; 
import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';
import './styles.css'; 
import { useNavigate } from 'react-router-dom'; 
function Products(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/detail'); 
  };
  return (
    <div className='productList' onClick={handleClick}>
      <div className='productCard'>
        <img src={props.image} alt='product-img' className='productImage'></img>
  
        <FaShoppingCart className={"productCard__cart"} />
        <FaRegBookmark className={"productCard__wishlist"} />
        <FaFireAlt className={"productCard__fastSelling"} />
  
        <div className='productCard__content'>
          <h3 className='productName'>{props.name}</h3>
          <div className='displayStack__1'>
            <div className='productPrice'>${props.price}</div>
            <div className='productSales'>{props.totalSales} units sold</div>
          </div>
          <div className='displayStack__2'>
            <div className='productRating'>
              {[...Array(props.rating)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <div className='productTime'>{props.timeLeft} days left</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define prop types for the Products component
Products.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  totalSales: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Products;
