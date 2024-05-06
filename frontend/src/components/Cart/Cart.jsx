import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import React, { useEffect, useState } from 'react';

export default function QuantityEdit() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [order, setOrder] = useState({});
    const id= window.localStorage.getItem('id');

    const navigate = useNavigate(); // Sử dụng hook useNavigate
    const handleInvoiceClick = () => {
        navigate('/invoice'); // Điều hướng sang trang Login
      };
      const handleBackClick = () => {
        navigate('/listproducts'); // Điều hướng sang trang Login
      };
      useEffect(() => {
        fetch(`http://localhost:8080/order/getByUserId/${id}`)
            .then(response => response.json())
            .then((data) => {setOrderDetails(data[0].order_details);
                setOrder(data[0]);
                console.log("gio hang:",data[0]);
            })
            .catch(error => console.error('Error fetching order details:', error));
    }, []);

    return (
        <section className={styles.hCustom} style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol size="12">
                        <MDBCard className={styles.cardRegistration}>
                            <MDBCardBody className="p-0">
                                <MDBRow className="g-0">
                                    <MDBCol lg="8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <MDBTypography tag="h1" className="font-bold fw-bold mb-0 text-black">
                                                    Shopping Cart
                                                </MDBTypography>
                                                <MDBTypography className="font-bold mb-0 text-muted">
                                                    {orderDetails.length} items
                                                </MDBTypography>
                                            </div>
        
                                            <hr className="my-4" />
        
                                            {/* Products List - Example product */}
                                          {/* Products List from API */}
                                          {orderDetails.map((item, index) => (
                                                <MDBRow key={index} className="mb-4 d-flex justify-content-between align-items-center">
                                                    <MDBCol md="2" lg="2" xl="2">
                                                        <MDBCardImage
                                                        src={`data:image/png;base64,${item.image}`}
                                                            
                                                            fluid className="rounded-3" alt={item.name} />
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3">
                                                        <MDBTypography tag="h6" className="text-muted font-bold">
                                                            {item.category}
                                                        </MDBTypography>
                                                        <MDBTypography tag="h6" className="text-black mb-0 font-bold">
                                                            {item.name}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                        <MDBInput type="number" min="0" defaultValue={item.quantity} size="sm" />
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                        <MDBTypography tag="h6" className="font-bold mb-0">
                                                        {item.cost.toLocaleString('vi-VN')} đồng
                                                             
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                        <a href="#!" className="text-muted">
                                                            <MDBIcon fas icon="times" />
                                                        </a>
                                                    </MDBCol>
                                                </MDBRow>
                                            ))}
        
                                            <div className="pt-5">
                                                <MDBTypography tag="h6" className="mb-0">
                                                    <MDBCardText tag="a" href="#!" className="text-body font-bold">
                                                        <button onClick={handleBackClick}     > <i className="fa fa-step-backward"></i> Back to shop</button>
                                                    </MDBCardText>
                                                </MDBTypography>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol lg="4" className={styles.bgGrey}>
                                        <div className="p-5">
                                            <MDBTypography tag="h3" className={`${styles.summary} mb-5 mt-2 pt-1 font-bold`}>
                                                Summary
                                            </MDBTypography>
        
                                            <hr className="my-4" />
                                            {orderDetails.map((item, index) => (
    <div key={index} className="d-flex justify-content-between mb-4 font-bold">
        <MDBTypography tag="h5" className={styles.items}>
             item{item.product_id}
        </MDBTypography>
        <MDBTypography tag="h5"> {item.cost ? item.cost.toLocaleString('vi-VN') : '0'} đồng </MDBTypography>
    </div>
))}

                                           
        
                                            {/* Shipping Section */}
                                            <MDBTypography tag="h5" className="text-uppercase mb-3 font-bold">
                                                Shipping
                                            </MDBTypography>
                                            <div className="mb-4 pb-2">
                                                <select className="select p-2 rounded" style={{ width: "100%" }}>
                                                    <option value="1">Standard-Delivery -      {order.delivery_charges ? order.delivery_charges.toLocaleString('vi-VN') : '0'} đồng
</option>
                                                    {/* <option value="2">Express-Delivery - €10.00</option> */}
                                                </select>
                                            </div>
        
                                           
                                          
                                            <hr className="my-4" />
        
                                            <div className="d-flex justify-content-between mb-5">
                                                <MDBTypography tag="h5" className="text-uppercase font-bold">
                                                    Total price
                                                </MDBTypography>
                                                <MDBTypography  className="text-uppercase font-bold" tag="h5">
                                                {(order.total_cost+order.delivery_charges).toLocaleString('vi-VN')} đồng
                                                     </MDBTypography>
                                            </div>
        
                                            <button  onClick={handleInvoiceClick} className="btn btn-dark btn-lg btn-block text-white" >
    Go to checkout
</button>

                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
