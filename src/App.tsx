import { useEffect, useState } from "react";
import Sidebar from "./components/SideBar/Sidebar";
import Products from "./components/Products/Products";
import { useCart } from "./context/Cart/CartContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSidebar } from "./context/SideBar/SidebarContext";

function App() {
  const { products } = useCart();
  const [localStorageProducts, setLocalStorageProducts] = useState([]);
  const isLargeScreen = useMediaQuery("(min-width: 768px)"); // Set breakpoint as needed
  const { sidebarOpen, toggleSidebar } = useSidebar();

  const fetchFromLocalStorage = () => {
    const productsFromLocalStorage = localStorage.getItem("newProducts");
    return productsFromLocalStorage ? JSON.parse(productsFromLocalStorage) : [];
  };

  useEffect(() => {
    setLocalStorageProducts(fetchFromLocalStorage());
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      toggleSidebar(); // Ensure sidebar is open on larger screens
    }
  }, [isLargeScreen, toggleSidebar]);

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      {(isLargeScreen || sidebarOpen) && <Sidebar />} {/* Conditional rendering */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <Products products={products} />
        <Products products={localStorageProducts} />
      </div>
    </div>
  );
}

export default App;
