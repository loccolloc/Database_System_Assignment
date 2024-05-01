import Products from "./Products"; // Import the Products component
import "./styles.css"; // Ensure the path to the CSS file is correct
import React, { useState, useEffect } from "react";
import createApiClient from "../../api/axios";
import Pagination from "./Pagination";
import blobToImage from "../../api/blobToImage";

export default function ListProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Đặt là 6 sản phẩm mỗi trang
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const axios = createApiClient();
    axios
      .get("/products/all")
      .then((response) => {
        setProductData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Current Page:", currentPage);
  }, [currentPage]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products-container">
      <h1 className="mt-10" style={{ fontSize: "30px" }}>
        Products
      </h1>
      <div className="App">
        {currentItems.map((item) => (
          <Products
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            type={item.type}
            state={item.state}
            list_price={item.list_price}
            discount={item.discount}
            rating={item.rating}
          />
        ))}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={productData.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
