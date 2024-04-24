
import { FaCoffee } from "react-icons/fa";
import Hcmut from "../../assets/website/hcmutlog.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },

 
];
const Navbar = () => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate
  const handleOrderClick = () => {
    navigate('/login'); // Điều hướng sang trang Login
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
              <button
                className="bg-blue-800 hover:scale-105 duration-200 text-white px-4 py-2 rounded-full flex items-center gap-3"
                onClick={handleOrderClick} // Gọi hàm handleOrderClick khi nút được nhấp
              >
                Order
                <FaCoffee className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
