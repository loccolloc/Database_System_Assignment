import { useState } from "react";
import Logo from "../../assets/website/Coffee-logo-design-on-transparent-background-PNG-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"
import {
  ArrowLeftRightIcon,
  BarChart3Icon,
  Clock4Icon,
  LayoutDashboard,
  HelpCircleIcon,
} from "lucide-react";
import { motion } from "framer-motion";


import RightArrowIcon from "../../assets/icons/rightArrow.svg";

const variants = {
  expanded: { width: "20%" },
  nonexpanded: { width: "6%" },
};

function NavbarGifts() {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={
        "py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative" +
        (isExpanded ? " px-10" : " px-6")
      }
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-blue-800 flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" />
      </div>

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-blue-800 flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" />
      </div>
      <div className="logo-div flex space-x-4 items-center">
        <img src={Logo} />
        <span className={!isExpanded ? "hidden" : "block"}></span>
      </div>
      <div className="flex flex-col space-y-8 mt-12">
        <div className="nav-links w-full" onClick={() => navigate('/Dashboard')}>
          <div className="flex space-x-3 w-full p-2 rounded  hover-effect ">
            <LayoutDashboard />
            <span className={!isExpanded ? "hidden" : "block"}>Dashboard</span>
          </div>
        </div>

        <div className="nav-links w-full hover-effect "  onClick={() => navigate('/products')}> 
        <div className="flex space-x-3 w-full p-2 rounded  hover-effect ">
            <Clock4Icon />
            <span className={!isExpanded ? "hidden" : "block"}>Products</span>
          </div>
        </div>

        <div className="nav-links w-full">
        <div className="flex space-x-3 w-full p-2 rounded bg-blue-800 text-white ">
            <BarChart3Icon />
            <span className={!isExpanded ? "hidden" : "block"}>Gift</span>
          </div>
        </div>

        <div className="nav-links w-full">
          <div className="flex space-x-3 w-full p-2 rounded">
            <ArrowLeftRightIcon />
            <span className={!isExpanded ? "hidden" : "block"}>
              Transactions
            </span>
          </div>
        </div>

        <div className="nav-links w-full">
          <div className="flex space-x-3 w-full p-2 rounded  ">
            <HelpCircleIcon />
            <span className={!isExpanded ? "hidden" : "block"}>
              Help Center
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default NavbarGifts;
