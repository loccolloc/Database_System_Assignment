import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import "./App.css"

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetailItem, setProductDetailItem] = useState(null);
  const role= window.localStorage.getItem('role');
  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(`http://localhost:8080/products/get/${id}`);
      const data = await response.json();
      
      setProductDetailItem(data);
      console.log("trang chi tiet: ", productDetailItem.available);
    };

    fetchProductDetail();
  }, [id]);

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
          ${productDetailItem.list_price}{" "}
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
    </section>
  );
};

export default ProductDetail;
