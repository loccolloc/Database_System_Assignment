import  {Component} from 'react';
import styles from "./style.module.css";
import React, { useEffect, useState } from 'react';
export default function HeaderComponent() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrder] = useState({});
  const id= window.localStorage.getItem('id');


  useEffect(() => {
    console.log("id:", id);
    fetch(`http://localhost:8080/order/getByUserId/${id}`)
        .then(response => response.json())
        .then((data) => {setOrderDetails(data[0].order_details);
            setOrder(data[0]);
            console.log("dâta: ",order);
        })
        .catch(error => console.error('Error fetching order details:', error));
}, []);
    return(
        <div className="mt-8 ml-10 mr-10">
             <header>

             <h1 className="py-4 px-3 font-bold" style={{ fontSize: '17px' }}> INVOICE </h1>
      
<address className='mt-3'>
  <p className='font-bold' style={{ fontSize: '12px' }}> </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> {order.delivery_address} </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> Acccount id: {order.account_id} </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> Employee id:  {order.employee_id} </p>
</address>

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
                <td><span >101138</span></td>
              </tr>
              <tr>
                <th><span >Date</span></th>
                <td><span >January 1, 2012</span></td>
              </tr>
              <tr>
                <th><span >Amount Due</span></th>
                <td><span id="prefix" ></span><span></span></td>
              </tr>
              </tbody>
            </table>

            <table className={`${styles.table} ${styles.secondTable}`}>
              <thead>
                <tr>
                  <th><span >Item</span></th>
                  <th><span >Description</span></th>
                  <th><span >Rate</span></th>
                  <th><span >Quantity</span></th>
                  <th><span >Price</span></th>
                </tr>
              </thead>
              <tbody>
              {orderDetails.map((item, index) => (<tr key={index}>
                <td><a className={styles.cut}>-</a><span>Front End Consultation</span></td>
                  <td><span >Experience Review</span></td>
                  <td><span data-prefix>$</span><span >150.00</span></td>
                  <td><span >{item.quantity}</span></td>
                  <td><span data-prefix></span><span> {item.cost.toLocaleString('vi-VN')} đồng</span></td>
                </tr>))}
                
              </tbody>
            </table>
            <table className={`${styles.table} ${styles.firstTable}`}>
            <tbody>
              <tr>
                <th><span >Total</span></th>
                <td><span data-prefix></span><span>      {(order.total_cost+order.delivery_charges).toLocaleString('vi-VN')} đồng</span></td>
              </tr>
              <tr>
                <th><span >Amount Paid</span></th>
                <td><span data-prefix>$</span><span >0.00</span></td>
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
