import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import axios from 'axios';  // Import axios here

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

  const { id } = useParams();
  const [productDetailItem, setProductDetailItem] = useState(null);
  const [comment, setComment] = useState([]);
  const [score, setScore] = useState(0); // Assuming you have a way to set this, like a rating component

  const role= window.localStorage.getItem('role');
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/review/getByProductId/${id}`);
      const data = await response.json();
      setComment(data);
      console.log("Dữ liệu bình luận mới:", data);
    } catch (error) {
      console.error('Lỗi khi lấy bình luận:', error);
    }
  };
  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(`http://localhost:8080/products/get/${id}`);
      const data = await response.json();
      
      setProductDetailItem(data);
      
      
      
    };
    fetchComments();
    fetchProductDetail();
  }, [id]);
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
      setComments([...comments, response.data]);  // Optionally update UI without refresh
      setComments('');  // Clear the comment box
      console.log('thành công:', response.data);
      await fetchComments();
    } catch (error) {
      console.error('thất bại:', error);
    }
  };


  const renderComment = () => {
    return comment.map((comment, index) => {
     
        return (
            <div key={index} className="border rounded-md p-4 ml-3 my-3">
                <div className="flex gap-3 justify-between">
                    <div className="flex items-center gap-1">
                        <img
                            src="https://louisville.edu/enrollmentmanagement/images/person-icon/image" 
                            className="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "
                            alt="1"
                        />

                        <h3 className="font-bold">{comment.username}</h3>
                        <Rating name="read-only" value={comment.score} readOnly />

                    </div>
                    {/* <Rating value={5} precision={1} readOnly /> */}

                </div>
                <div className="text-gray-700 text-sm mb-4 mt-2">Đăng vào {comment.time}</div>
                <p className="text-gray-600 mt-2">{comment.comment}</p>
                {(comment.customer_id == idUser || role === "admin") && (
                    <button
                    onClick={() => handleDelete(comment.customer_id, comment.product_id)} // Use dynamic values as needed

                        className="text-gray-500 hover:text-gray-700">
                        <i class="fa fa-trash-alt"></i> Xóa
                    </button>
                )}
            </div>
        );
    });
};

  if (!productDetailItem) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
    
      <div className="container mx-auto px-4">
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
          ${productDetailItem.listPrice}{" "}
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
        <button className="flex h-12 w-full items-center justify-center bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 duration-150 ease-in-out">
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
