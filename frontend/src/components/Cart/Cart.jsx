import { useNavigate } from 'react-router-dom'; 
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
import axios from 'axios';  
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
export default function QuantityEdit() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [order, setOrder] = useState({});
    const id= window.localStorage.getItem('id');
    console.log("id: ", id);
    const navigate = useNavigate(); 
    
      console.log(orderDetails);
    
    const handleInvoiceClick = () => {
        navigate('/invoice'); 
      };
      const handleBackClick = () => {
        navigate('/listproducts'); 
      };
      useEffect(() => {
        fetch(`http://localhost:8080/order/getLatestByUserId/${id}`)
            .then(response => response.json())
            .then(data => {
                setOrderDetails(data.order_details);
                setOrder(data);
            })
            .catch(error => {
                console.error('Error fetching order details:', error);
                toast.error('Failed to fetch order details');
            });
    }, [id]);
    const deleteProduct = (product_id) => {
        axios.put('http://localhost:8080/order/removeProduct', {
            order_id: order.id,
            product_id: product_id,
        })
        .then(response => {
           
            setOrderDetails(currentDetails => 
                currentDetails.filter(item => item.product_id !== product_id)
            );
            setOrder(prevOrder => ({
                ...prevOrder,
                total_cost: prevOrder.total_cost - response.data.costReduction,
             
            }));
    
            toast.success("Product deleted successfully!");
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            toast.error('Error deleting product');
        });
    };

    const updateProductQuantity = (newQuantity, productId,newCost) => {
        axios.put('http://localhost:8080/order/updateProduct', {
            order_id: order.id,
            product_id: productId,
            quantity: newQuantity,
        })
        .then(response => {
            setOrderDetails(currentDetails =>
                currentDetails.map(item =>
                    item.product_id === productId ? { ...item, quantity: newQuantity,cost:newCost } : item
                )
            );
            toast.success("Quantity updated successfully!");
        })
        .catch(error => {
            console.error('Error updating product quantity:', error);
            toast.error('Error updating product quantity');
        });
    };

    const handleDecrement = (quantity, productId,unitPrice,cost) => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            const newCost=cost-unitPrice;
            updateProductQuantity(newQuantity, productId,newCost);
            setOrder(prevOrder => ({
                ...prevOrder,
                total_cost: prevOrder.total_cost - unitPrice,
              
            }));
        }
    };

    const handleIncrement = (quantity, productId,unitPrice,cost) => {
        const newQuantity = quantity + 1;
        const newCost=cost+unitPrice;
        updateProductQuantity(newQuantity, productId,newCost);
        setOrder(prevOrder => ({
            ...prevOrder,
            total_cost: prevOrder.total_cost + unitPrice,
           
        }));
    };

    return (
        <section className={styles.hCustom} style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
            <ToastContainer />
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
                                                            
                                                            fluid className="rounded-3" alt={item.product_name} />
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="3">
                                                        <MDBTypography tag="h6" className="text-muted font-bold">
                                                            {item.category}
                                                        </MDBTypography>
                                                        <MDBTypography tag="h6" className="text-black mb-0 font-bold">
                                                            {item.product_name}
                                                        </MDBTypography>
                                                    </MDBCol>

                                                    <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                    <MDBBtn color="light" onClick={() => handleDecrement(item.quantity, item.product_id,item.cost/item.quantity,item.cost)} disabled={item.quantity <= 0}>-</MDBBtn>

                                                        <MDBInput type="number" min="0" value={item.quantity} size="sm" />
                                                        <MDBBtn  onClick={()=>{handleIncrement(item.quantity,item.product_id,item.cost/item.quantity,item.cost)}} color="light" >+</MDBBtn>

                                                    </MDBCol>
                                                    <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                        <MDBTypography tag="h6" className="font-bold mb-0">
                                                        {item.cost.toLocaleString('vi-VN')} đồng
                                                             
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    <MDBCol onClick={()=>{deleteProduct(item.product_id)}} md="1" lg="1" xl="1" className="text-end">
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
        {item.product_name}
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
                                                <MDBTypography className="text-uppercase font-bold" tag="h5">
    {order.total_cost === 0 ||isNaN(order.total_cost)
        ? "0 đồng"
        : (order.total_cost + order.delivery_charges).toLocaleString('vi-VN') + " đồng"}
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
