import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import axios from 'axios';  // Import axios here
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-rater/lib/react-rater.css";
import "./App.css"
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Rating from '@mui/material/Rating';

const ProductDetail = () => {
  const idUser= window.localStorage.getItem('id');
  const [comments, setComments] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const [productDetailItem, setProductDetailItem] = useState(null);
  const [comment, setComment] = useState([]);
  const [score, setScore] = useState(0); 
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [editingScore, setEditingScore] = useState(0);
  const role= window.localStorage.getItem('role');
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/review/getByProductId/${id}`);
      const data = await response.json();
      const commentsWithIds = data.map((comment, index) => ({
        ...comment,
        id: index ,
      }));
      setComment(commentsWithIds);
    } catch (error) {
      console.error('Lỗi khi lấy bình luận:', error);
    }
  };
  useEffect(() => {
    fetch(`http://localhost:8080/order/getLatestByUserId/${idUser}`)
        .then(response => response.json())
        .then((data) => {setOrderDetails(data.order_details);
            setOrder(data);
            console.log("gio hang:",data);
        })
        .catch(error => console.error('Error fetching order details:', error));
}, []);
  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(`http://localhost:8080/products/get/${id}`);
      const data = await response.json();
      
      setProductDetailItem(data);
      
      
      
    };
    fetchComments();
    fetchProductDetail();
  }, [id]);
  const handleAddToCart = async () => {
    const existingProduct = orderDetails.find(detail => detail.product_id === parseInt(id));

    const quantity = existingProduct ? existingProduct.quantity + 1 : 1;

    const payload = {
        order_id: order.id, 
        product_id: parseInt(id),
        quantity: quantity
    };
if(existingProduct)
  {
    try {
      const response = await axios.put('http://localhost:8080/order/updateProduct', payload);
      toast.success("Product added to cart successfully!");
      console.log('Product added to cart successfully:', response.data);
      if (existingProduct) {
          const updatedOrderDetails = orderDetails.map(detail =>
              detail.product_id === parseInt(id) ? { ...detail, quantity: quantity } : detail
          );
          setOrderDetails(updatedOrderDetails);
      } else {
          setOrderDetails([...orderDetails, {
              order_id: order.order_id,
              product_id: parseInt(id),
              quantity: quantity,
              image: productDetailItem.image 
          }]);
      }
  } catch (error) {
      console.error('Failed to add product to cart:', error);
      toast.error("Failed to add product to cart!");
  }

  }else{
    try {
      const response = await axios.put('http://localhost:8080/order/addProduct', payload);
      toast.success("Product added to cart successfully!");
      console.log('Product added to cart successfully:', response.data);
      if (existingProduct) {
          const updatedOrderDetails = orderDetails.map(detail =>
              detail.product_id === parseInt(id) ? { ...detail, quantity: quantity } : detail
          );
          setOrderDetails(updatedOrderDetails);
      } else {
          setOrderDetails([...orderDetails, {
              order_id: order.order_id,
              product_id: parseInt(id),
              quantity: quantity,
              image: productDetailItem.image  
          }]);
      }
  } catch (error) {
      console.error('Failed to add product to cart:', error);
      toast.error("You do not have address to order!");
  }

  }
  
};

  function handleDelete(userId, productId) {
    axios.delete(`http://localhost:8080/review/delete?user_id=${userId}&product_id=${productId}`)
    .then(response => {
      console.log('Delete successful', response.data);
      fetchComments();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const payload = {
      comment: comments,
      score:score,
      customer_id: parseInt(idUser),
      product_id: parseInt(id)
    };

    try {
      const response = await axios.post('http://localhost:8080/review/post', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setComments([...comments, response.data]);  
      setComments('');  
      console.log('thành công:', response.data);
      await fetchComments();
    } catch (error) {
      console.error('thất bại:', error);
    }
  };


  const renderComment = () => {
    return comment.map((comment, index) => {
      const isEditing = editingCommentId === comment.id;
  
      return (
        <div key={index} className="border rounded-md p-4 ml-3 my-3">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editingCommentText}
                onChange={(e) => setEditingCommentText(e.target.value)}
              />
              <Rating
              className="ml-3"
                name="simple-controlled"
                value={editingScore}
                onChange={(event, newValue) => setEditingScore(newValue)}
              />
              <button className="ml-5" onClick={(e) => handleSaveEdit(e)}>Lưu</button>
              <button className="ml-5" onClick={() => setEditingCommentId(null)}>Hủy</button>
            </div>
          ) : (
            <div>
              <h3 className="font-bold">{comment.username}</h3>
              <Rating name="read-only" value={comment.score} readOnly />
              <p className="text-gray-600 mt-2">{comment.comment}</p>
              {(comment.customer_id == idUser || role === "admin") && (
                <div className='mt-5'>
                  <button onClick={() => handleDelete(comment.customer_id, comment.product_id)}>
                    Xóa
                  </button>
                  <button className='ml-5' onClick={() => startEdit(comment)}>
                    Chỉnh sửa
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    });
  };
  
  const handleSaveEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('http://localhost:8080/review/put', {
        comment: editingCommentText,
        score: editingScore,
        customer_id: idUser,
        product_id: id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Cập nhật thành công:', response.data);
      setEditingCommentId(null);
      fetchComments();
    } catch (error) {
      console.error('Cập nhật thất bại:', error);
    }
  };
  
  const startEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.comment);
    setEditingScore(comment.score);
  };
  
 

  if (!productDetailItem) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      

      <div className="container mx-auto px-4">
      <ToastContainer />
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={[{
            thumbnail: `data:image/png;base64,${productDetailItem.image}`
          }]}
        />
      </div>
      
      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {productDetailItem.name}
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={productDetailItem.rating}
            />
            <p className="ml-3 text-sm text-gray-400">
              ({productDetailItem.reviews} reviews)
            </p>
          </div>
        </div>
        <p className="mt-5 font-bold">
          Availability:{" "}
          {productDetailItem.state.trim() === "available" ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>
        <p className="font-bold">
          Category:{" "}
          <span className="font-normal">{productDetailItem.type}</span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
          {productDetailItem.listPrice.toLocaleString('vi-VN')}{"  đồng"}

        </p>
        <p className="mt-5 font-bold">
        
          {productDetailItem.discount >0  ? (
            <span className="text-green-600">Sale off {productDetailItem.discount }%</span>
          ) : (
            <span className="text-red-600"></span>
          )}
        </p>
        <div className="mt-7 flex flex-row items-center gap-6">
        {role !== "admin" && (
            <button className="flex h-12 w-full items-center justify-center bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 duration-150 ease-in-out" onClick={handleAddToCart}>
            <BiShoppingBag className="mr-2" />
  Add to Cart
</button>

)}
        </div>
      </div>
         {/* Commment */}
         <div className="w-full bg-white rounded-lg border p-2 my-9 mx-6">
                        <h3 className="font-bold " style={{fontSize:'17px'}}>Bình luận</h3>
                        <form onSubmit={handleSubmit} className='mt-5' >
                            <div className="flex flex-col">{renderComment()}</div>
                            <div className="w-full px-3 my-2">
                                <div className="flex gap-3 justify-between mb-2 ml-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src="https://louisville.edu/enrollmentmanagement/images/person-icon/image" 
                                            className="object-cover w-8 h-8 rounded-full 
        border-2 border-emerald-400  shadow-emerald-400
        "
                                            
                                        />
                                        <h3 className="font-bold">{}</h3>
                                    </div>
                                    <Rating
  name="simple-controlled"
  value={score}
  onChange={(event, newValue) => {
    setScore(newValue);
  }}
/>
                                    {/* <Rating name="half-rating" defaultValue={5} precision={1} /> */}
                                </div>

                                <textarea
                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                    name="comment"
                                    placeholder="Để lại bình luận của bạn"
                                    value={comments}
                                    onChange={e => setComments(e.target.value)}

                                 
                                />
                              
                            </div>
                            <div className="w-full flex justify-end px-3">
                                <input
                                    type="submit"
                                    className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
                                    defaultValue="Post Comment"
                                    value="Đăng"  
                                />
                            </div>
                        </form>
                    </div>
              
                
                
    </section>
    
  );
};

export default ProductDetail;
