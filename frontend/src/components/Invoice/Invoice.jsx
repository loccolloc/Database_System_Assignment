import  {Component} from 'react';
import styles from "./style.module.css";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 

export default function HeaderComponent() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrder] = useState({});
  const id= window.localStorage.getItem('id');
  const uname= window.localStorage.getItem('username');
  const navigate = useNavigate(); 


  useEffect(() => {
    fetch(`http://localhost:8080/order/getLatestByUserId/${id}`)
        .then(response => response.json())
        .then(data => {
            setOrderDetails(data.order_details);
            console.log("order_details",orderDetails);
            setOrder(data);
            console.log("order",order);
        })
        .catch(error => {
            console.error('Error fetching order details:', error);
            toast.error('Failed to fetch order details');
        });
}, [id]);
const handleConfirmClick = () => {
  fetch(`http://localhost:8080/order/setAsFinished/${order.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      navigate('/thanks'); 
      toast.success('Order has been set as finished.');
    } else {
      throw new Error('Failed to update order status');
    }
  })
  .catch(error => {
    console.error('Error updating order status:', error);
    toast.error('Failed to update order status');
  });
};

    return(
        <div className="mt-8 ml-10 mr-10">
          <ToastContainer/>
             <header>

             <h1 className="py-4 px-3 font-bold" style={{ fontSize: '17px' }}> INVOICE </h1>
             {( order.total_cost) && (    <div style={{marginLeft:'560px'}}>              <button onClick={handleConfirmClick} style={{ fontSize: '17px',background:'black', color:'white', borderRadius:5,padding:'5px' }}> Xác nhận</button>
</div> )}
{order ? (
<address className='mt-3'>
  <p className='font-bold' style={{ fontSize: '12px' }}> Start Time: {order.start_time} </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> Delivery Address: {order.delivery_address}  </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> Acccount id: {order.account_id} </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> Display name: {uname} </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> Employee id: {order.employee_id}  </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> State of order: {order.state}  </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> Type of order: {order.type}  </p>

</address>
 ) : (<p>No order details available.</p>
)}
<span>
  <img alt="MAHESH" src="https://thumbs.dreamstime.com/b/steam-coffee-drinks-cup-shop-logo-designs-inspiration-isolated-white-background-129122317.jpg" className="rounded float-right align-top" />          
</span>
        
</header>
          <article>
            <address>
            <p className={styles.infosys}>Infosys LTD</p>        
            </address>        
            
            <table className={`${styles.table} ${styles.firstTable}`}>
            <tbody>
              <tr>
                <th><span >Invoice #</span></th>
                <td><span >{order.id}</span></td>
              </tr>
              <tr>
                <th><span >Date</span></th>
                <td><span >{order.start_time}</span></td>
              </tr>
              {/* <tr>
                <th><span >Amount Due</span></th>
                <td><span id="prefix" ></span><span></span></td>
              </tr> */}
              </tbody>
            </table>

            <table className={`${styles.table} ${styles.secondTable}`}>
              <thead>
                <tr>
                  <th><span >Item</span></th>
                  <th><span >Product Id</span></th>
                  <th><span >Cost</span></th>
                  <th><span >Quantity</span></th>
                  <th><span >Price</span></th>
                </tr>
              </thead>
              <tbody>
              {orderDetails.map((item, index) => (<tr key={index}>
                <td><a className={styles.cut}></a><span>{item.product_name}</span></td>
                  <td><span >{item.product_id}</span></td>
                  <td><span data-prefix>$</span><span >{item.cost}</span></td>
                  <td><span >{item.quantity}</span></td>
                  <td><span data-prefix></span><span> {item.cost.toLocaleString('vi-VN')} đồng</span></td>
                </tr>))}
                
              </tbody>
            </table>
            <table className={`${styles.table} ${styles.firstTable}`}>
            <tbody>
              
              <tr>
                
                <th><span >Total</span></th>
                <td><span data-prefix></span><span>      {order.total_cost?(order.total_cost+order.delivery_charges).toLocaleString('vi-VN'): `0`} đồng</span></td>
              </tr>
              <tr>
                <th><span >Shipping charge</span></th>
                <td><span data-prefix></span><span > {order.total_cost?(order.delivery_charges?(order.delivery_charges).toLocaleString('vi-VN'):0):`0`} đồng</span></td>
              </tr>
              <tr>
                <th><span >Total product price</span></th>
                <td><span data-prefix></span><span > {order.total_cost?(order.total_cost).toLocaleString('vi-VN'): `0`} đồng</span></td>
              </tr>
              <tr>
                <th><span >Amount Paid</span></th>
                <td><span data-prefix></span><span >0.00</span></td>
              </tr>
             
              </tbody>
            </table>                      
          </article>

          <aside>
          <h1 className={styles.notes} id="notes">Additional Notes</h1>
          <hr className='mt-2'></hr>
            <div  className="mt-3">
              <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
            </div>
          </aside>
          
        </div>
    )
  }
