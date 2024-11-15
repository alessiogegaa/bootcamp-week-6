import "./Navbar.css";
import { FaShoppingCart, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import Logo from "../../assets/onlineshoplogo.png";
import { useTheme } from "../../context/Theme/ThemeContext";
import  Button  from "@mui/material/Button";
import Badge  from "@mui/material/Badge";
import IconButton  from "@mui/material/IconButton";
import { useCart } from "../../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../context/SideBar/SidebarContext";
const Navbar: React.FC = () => {
  const {totalCartQuantity} = useCart();
  const {theme, toggleTheme} = useTheme();
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useSidebar();

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

      <div className="nav-hamburger" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </div>

      
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
