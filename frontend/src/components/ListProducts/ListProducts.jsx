import Products from "./Products"; 
import "./styles.css"; 
import React, { useState, useEffect } from "react";
import createApiClient from "../../api/axios";
import Pagination from "./Pagination";

export default function ListProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); 
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchProductsByType = (type) => {
    const axios = createApiClient();
    const query = type ? `/products/getByType?type=${encodeURIComponent(type)}` : '/products/all';
    axios.get(query)
      .then(response => {
        setProductData(response.data);
        setSearchQuery(""); 
      })
      .catch(error => {
        console.error("Failed to fetch products by type:", error);
      });
  };
  useEffect(() => {
    fetchProductsByType(""); 
  }, []);
  useEffect(() => {
    const axios = createApiClient();
   
    const query = searchQuery.trim() ? `/products/getByName?name=${encodeURIComponent(searchQuery)}` : '/products/all';
    axios
      .get(query)
      .then((response) => {
        if (response.data.length > 0) { 
          setProductData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery]); 
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  return (
    <div className="products-container">
      <h1 className="mt-10" style={{ fontSize: "30px" }}>
        Products
      </h1>
      <input
        style={{ marginLeft: 520, marginRight:520, marginTop:40, padding:3, fontSize:17, background: 'transparent',    border: '1px solid black'
      }}
        type="text"
        placeholder="Search Products"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
<div className="d-flex mt-5">
<button onClick={() => fetchProductsByType('')}  type="button" style={{ fontSize: 20, marginLeft: 'auto', color: 'black', marginRight: 5 }} className="btn btn-danger">
          All
        </button> 
<button onClick={() => fetchProductsByType('Trà')} type="button" style={{ fontSize: 20,  color: 'black', marginRight: 5 }} className="btn btn-success">
          Trà
        </button>     <button onClick={() => fetchProductsByType('Cà phê')} type="button" style={{ fontSize: 20, marginRight: 'auto', color: 'black' }} className="btn btn-warning">
          Coffee
        </button>
</div>
     
     
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
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
