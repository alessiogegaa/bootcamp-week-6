import "./Navbar.css";
import { FaShoppingCart, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import Logo from "../../assets/onlineshoplogo.png";
import { useTheme } from "../../context/Theme/ThemeContext";
import  Button  from "@mui/material/Button";
import Badge  from "@mui/material/Badge";
import IconButton  from "@mui/material/IconButton";
import Sidebar from "../SideBar/Sidebar";
import { useCart } from "../../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const {totalCartQuantity} = useCart();
  const {theme, toggleTheme} = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const toggleMenu = (): void => setMenuOpen(!menuOpen);
  
  const closeSidebar = (): void => setMenuOpen(false);

  const handleMenuClick = (item: string): void => {
    if(item==="Shop") navigate('/');
    else{
    const path = item.toLowerCase().replace(/\s+/g, '');
    navigate(`/${path}`);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={Logo} alt="Shop Logo" />
      </div>

      <div className="nav-hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {menuOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}>
         <div className={`sidebar-container ${menuOpen ? "open" : ""}`} >
            <Sidebar />
          </div>
        </div>
      )}

      <ul className={`nav-menu`}>
        {["Shop", "Add Product", "Invoice"].map((item) => (
          <li
            key={item}
            onClick={() => handleMenuClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      <div className={`nav-login-cart`}>
        <Button onClick={toggleTheme}>
        {theme === "light" ? (
          <FaMoon className="icon" title="Toggle Dark Mode" />
        ) : (
          <FaSun className="icon" title="Toggle Light Mode" />
        )}
        </Button>
        {totalCartQuantity > 0 && (
          <Badge badgeContent={totalCartQuantity} color="secondary">
            <IconButton color="inherit" onClick={()=>navigate('/cart')}>
              <FaShoppingCart/>
            </IconButton>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default Navbar;
