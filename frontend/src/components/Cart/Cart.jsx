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

export default function QuantityEdit() {
    const navigate = useNavigate(); // Sử dụng hook useNavigate
    const handleInvoiceClick = () => {
        navigate('/invoice'); // Điều hướng sang trang Login
      };
      const handleBackClick = () => {
        navigate('/listproducts'); // Điều hướng sang trang Login
      };
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
                                                    3 items
                                                </MDBTypography>
                                            </div>
        
                                            <hr className="my-4" />
        
                                            {/* Products List - Example product */}
                                            <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                                                <MDBCol md="2" lg="2" xl="2">
                                                    <MDBCardImage
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp"
                                                        fluid className="rounded-3" alt="Cotton T-shirt" />
                                                </MDBCol>
                                                <MDBCol md="3" lg="3" xl="3">
                                                    <MDBTypography tag="h6" className="text-muted font-bold">
                                                        Shirt
                                                    </MDBTypography>
                                                    <MDBTypography tag="h6" className="text-black mb-0 font-bold">
                                                        Cotton T-shirt
                                                    </MDBTypography>
                                                </MDBCol>
                                                <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                                                    {/* <MDBBtn color="link" className="px-2">
                                                        <MDBIcon fas icon="minus" />
                                                    </MDBBtn> */}
    
                                                    <MDBInput type="number" min="0" defaultValue={1} size="sm" />
    
                                                    {/* <MDBBtn color="link" className="px-2">
                                                        <MDBIcon fas icon="plus" />
                                                    </MDBBtn> */}
                                                </MDBCol>
                                                <MDBCol md="3" lg="2" xl="2" className="text-end">
                                                    <MDBTypography tag="h6" className="font-bold mb-0">
                                                        € 44.00
                                                    </MDBTypography>
                                                </MDBCol>
                                                <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                    <a href="#!" className="text-muted">
                                                        <MDBIcon fas icon="times" />
                                                    </a>
                                                </MDBCol>
                                            </MDBRow>
        
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
        
                                            <div className="d-flex justify-content-between mb-4 font-bold">
                                                <MDBTypography tag="h5" className={styles.items}>
                                                    items 3
                                                </MDBTypography>
                                                <MDBTypography tag="h5">€ 132.00</MDBTypography>
                                            </div>
        
                                            {/* Shipping Section */}
                                            <MDBTypography tag="h5" className="text-uppercase mb-3 font-bold">
                                                Shipping
                                            </MDBTypography>
                                            <div className="mb-4 pb-2">
                                                <select className="select p-2 rounded" style={{ width: "100%" }}>
                                                    <option value="1">Standard-Delivery - €5.00</option>
                                                    <option value="2">Express-Delivery - €10.00</option>
                                                </select>
                                            </div>
        
                                            {/* Promo Code Section */}
                                            <MDBTypography tag="h5" className="text-uppercase mb-3 font-bold">
                                                Promo Code
                                            </MDBTypography>
                                            <div className="mb-5 font-bold">
                                                <MDBInput size="lg" label="Enter your code" />
                                            </div>
        
                                            <hr className="my-4" />
        
                                            <div className="d-flex justify-content-between mb-5">
                                                <MDBTypography tag="h5" className="text-uppercase font-bold">
                                                    Total price
                                                </MDBTypography>
                                                <MDBTypography  className="text-uppercase font-bold" tag="h5">€ 137.00</MDBTypography>
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
