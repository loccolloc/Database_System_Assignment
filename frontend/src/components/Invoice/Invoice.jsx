import  {Component} from 'react';
import styles from "./style.module.css";

export default class HeaderComponent extends Component{
  render(){
    return(
        <div className="mt-8 ml-10 mr-10">
             <header>

             <h1 className="py-4 px-3 font-bold" style={{ fontSize: '17px' }}> INVOICE </h1>
      
<address className='mt-3'>
  <p className='font-bold' style={{ fontSize: '12px' }}> MAHESH NANDENNAGARI </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> #429, First Floor </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> Bettadasanapura </p>
  <p className='font-bold' style={{ fontSize: '12px' }}> +918660876889 </p>
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
                <td><span id="prefix" >$</span><span>600.00</span></td>
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
                <tr>
                <td><a className={styles.cut}>-</a><span>Front End Consultation</span></td>
                  <td><span >Experience Review</span></td>
                  <td><span data-prefix>$</span><span >150.00</span></td>
                  <td><span >4</span></td>
                  <td><span data-prefix>$</span><span>600.00</span></td>
                </tr>
              </tbody>
            </table>
            <table className={`${styles.table} ${styles.firstTable}`}>
            <tbody>
              <tr>
                <th><span >Total</span></th>
                <td><span data-prefix>$</span><span>600.00</span></td>
              </tr>
              <tr>
                <th><span >Amount Paid</span></th>
                <td><span data-prefix>$</span><span >0.00</span></td>
              </tr>
              <tr>
                <th><span >Balance Due</span></th>
                <td><span data-prefix>$</span><span>600.00</span></td>
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
}