
import Products from './Products'; // Import the Products component
import './styles.css'; // Ensure the path to the CSS file is correct
import React, { useState,useEffect  } from 'react';
import Pagination from './Pagination';
const productData = [
    {
      id: 1,
      name: "Đường Đen Sữa Đá",
      image:
        "https://product.hstatic.net/1000075078/product/1686716532_dd-suada_c180c6187e644babbac7019a2070231e.jpg",
      productType: "openBackHeadphones",
      price: 45.000,
      rating: 5,
      timeLeft: 27,
      totalSales: 7479 
    },
    {
      id: 2,
      name: "Cà Phê Sữa Nóng",
      image:
        "https://product.hstatic.net/1000075078/product/1639377770_cfsua-nong_9a47f58888e7444a9979e0d117d49ad3.jpg",
      productType: "openBackHeadphones",
      price: 169,
      rating: 5,
      timeLeft: 24,
      totalSales: 6898
    },
    {
      id: 3,
      name: "Bạc Sỉu",
      image:
        "https://product.hstatic.net/1000075078/product/1639377904_bac-siu_525b9fa5055b41f183088c8e479a9472.jpg",
      productType: "openBackHeadphones",
      price: 170,
      rating: 4,
      timeLeft: 21,
      totalSales: 6347 
    },
    {
        id: 4,
        name: "Đường Đen Sữa Đá",
        image:
          "https://product.hstatic.net/1000075078/product/1686716532_dd-suada_c180c6187e644babbac7019a2070231e.jpg",
        productType: "openBackHeadphones",
        price: 45.000,
        rating: 5,
        timeLeft: 27,
        totalSales: 7479 
      },
      {
        id: 5,
        name: "Cà Phê Sữa Nóng",
        image:
          "https://product.hstatic.net/1000075078/product/1639377770_cfsua-nong_9a47f58888e7444a9979e0d117d49ad3.jpg",
        productType: "openBackHeadphones",
        price: 169,
        rating: 5,
        timeLeft: 24,
        totalSales: 6898
      },
      {
        id: 6,
        name: "Bạc Sỉu",
        image:
          "https://product.hstatic.net/1000075078/product/1639377904_bac-siu_525b9fa5055b41f183088c8e479a9472.jpg",
        productType: "openBackHeadphones",
        price: 170,
        rating: 4,
        timeLeft: 21,
        totalSales: 6347 
      } ,
      {
        id: 7,
        name: "Bạc Sỉu",
        image:
          "https://product.hstatic.net/1000075078/product/1639377904_bac-siu_525b9fa5055b41f183088c8e479a9472.jpg",
        productType: "openBackHeadphones",
        price: 170,
        rating: 4,
        timeLeft: 21,
        totalSales: 6347 
      } 
  ];
  export default function ListProducts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6); // Đặt là 6 sản phẩm mỗi trang
    useEffect(() => {
      console.log("Current Page:", currentPage);
    }, [currentPage]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
      <div className='products-container'>
        <h1 className='mt-10'   style={{ fontSize: "30px" }}>Products</h1>
        <div className='App'>
          {currentItems.map(item => ( 
            <Products 
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              totalSales={item.totalSales}
              timeLeft={item.timeLeft}
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
