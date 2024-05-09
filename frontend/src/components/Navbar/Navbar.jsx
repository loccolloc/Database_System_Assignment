
import { FaCoffee } from "react-icons/fa";
import Hcmut from "../../assets/website/hcmutlog.png";
import { useNavigate } from 'react-router-dom'; 
import { FaPowerOff } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from 'axios';
const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },

 
];
const Navbar = () => {
  const [order, setOrder] = useState({});
  const role = window.localStorage.getItem('role');
  const id= window.localStorage.getItem('id');

  const navigate = useNavigate(); 
  const handleOrderClick = () => {
    navigate('/login'); 
  };
  function postNewOrder() {
    const employeeId = Math.floor(Math.random() * 16); 
    const postData = {
        employee_id: employeeId,
        account_id: id, 
        delivery_address: "hcmut",
        delivery_charges: 20000
    };

    axios.post('http://localhost:8080/order/post', postData)
        .then(response => {
            console.log("Order posted successfully: ", response.data);
            navigate('/cart'); 
        })
        .catch(error => {
            console.error("Failed to post order:", error);
        });
}
  const handleCartClick = () => {

    fetch(`http://localhost:8080/order/getLatestByUserId/${id}`)
        
    .then(data => {
        
        if (data.headers.get('content-length') === '0') {
         console.log("chua co dia chi")
          
                   postNewOrder();
                 
                  
        }else{
          console.log("du lieu khoong rong");
          navigate('/cart'); 
        }
    })
    .catch(error => {
        console.log("dia chi khong co", error);
        // postNewOrder();
       
    });
  
  };
  const handleProductClick = () => {
    navigate('/listproducts'); 
  };
  const handleLogoutClick = () => {
    localStorage.clear();
    navigate('/'); 
        window.location.reload();
  };
  const handleProfileClick = () => {
    navigate('/Dashboard'); 
  };
  return (
    <>
      <div className="bg-white from-secondary to-secondary/90 shadow-md bg-gray-900 text-white">
        <div className="container py-2">
          <div className="flex justify-between items-center">
            {/* Logo section */}
            <div data-aos="fade-down" data-aos-once="true">
              <a
                href="#"
                className="font-bold text-gray-500 text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive"
              >
                <img src={Hcmut} alt="hcmut" className="w-14" />
                Tây Nguyên Legend

              </a>
            </div>

            {/* Link section */}
            <div
              data-aos="fade-down"
              data-aos-once="true"
              data-aos-delay="300"
              className="flex  justify-between items-center gap-4"
            >
              <ul className="hidden  sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block  text-xl py-4 px-4 text-gray-500 hover:text-white duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
              </ul>
              {(role === "admin" || role === "user") && (
                <button
                  className="bg-blue-800 hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3"
                  onClick={handleProfileClick}
                >
                  <FaUserAlt  className="text-xl text-white drop-shadow-sm cursor-pointer" />
                </button>
              )}
              <button
                className="bg-blue-800 hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3"
                onClick={(role === 'admin' || role === 'user') ? handleProductClick : handleOrderClick}
              >
                Order
                <FaCoffee className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
              {role === "user" && (
                <button
                  className="hover:scale-105 duration-200 text-black px-4 py-2 flex items-center gap-3"
                  onClick={handleCartClick}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              )}
 {(role === "admin" || role === "user") && (
                <button
                  className="bg-blue-800 hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3"
                  onClick={handleLogoutClick}
                >
                  <FaPowerOff className="text-xl text-white drop-shadow-sm cursor-pointer" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
