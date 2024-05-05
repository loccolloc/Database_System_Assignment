
import PropTypes from 'prop-types'; 
import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';
import './styles.css'; 
import { useNavigate } from 'react-router-dom'; 
function Products(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    
    navigate(`/detail/${props.id}`); 
  };
  return (
    <div className='productList' onClick={handleClick}>
      <div className='productCard'>
        <img src={`data:image/png;base64,${props.image}`} alt='product-img' className='productImage'></img>
  
        <FaShoppingCart className={"productCard__cart"} />
        <FaRegBookmark className={"productCard__wishlist"} />
        <FaFireAlt className={"productCard__fastSelling"} />
  
        <div className='productCard__content'>
          <h3 className='productName'>{props.name}</h3>
          <div className='displayStack__1'>
            <div className='productPrice'>${props.list_price}</div>
            <div className='productDiscount'>{props.discount}% off</div>
          </div>
          <div className='displayStack__2'>
            <div className='productState'>{props.state}</div>
            <div className='productRating'>
              <FaStar className='starIcon' />
              {props.rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


Products.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  list_price: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Products;