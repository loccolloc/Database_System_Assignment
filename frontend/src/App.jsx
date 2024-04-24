import React from "react";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services.jsx";
import Banner from "./components/Banner/Banner.jsx";
import AppStore from "./components/AppStore/AppStore.jsx";
import Testimonials from "./components/Testimonials/Testimonials.jsx";
import Footer from "./components/Footer/Footer.jsx";
import AOS from "aos";
import Login from './components/Login/Login.jsx';
import Signup from "./components/Signup/Signup.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashProducts from "../src/components/DashProducts/DashProducts.jsx"
import "aos/dist/aos.css";

import MainDashboard from "../src/components/Dashboard/MainDashboard.jsx"

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>

    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
      <Navbar />
      <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<DashProducts />} />
      <Route path="/dashboard" element={<MainDashboard />} />
      <Route path="/signup" element={<Signup />} />
      
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <Banner />
              <AppStore />
              <Testimonials />
              <Footer />
              
            </>
          } />
      </Routes>
    </div>
    </Router>

  );
};

export default App;
