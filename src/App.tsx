import { useEffect, useState } from "react";
import Sidebar from "./components/SideBar/Sidebar";
import Products from "./components/Products/Products";
import { useCart } from "./context/Cart/CartContext";

function App() {
  const { products } = useCart();
  const [localStorageProducts, setLocalStorageProducts] = useState([]);

  const fetchFromLocalStorage = () => {
    const productsFromLocalStorage = localStorage.getItem("newProducts");
    return productsFromLocalStorage ? JSON.parse(productsFromLocalStorage) : [];
  };

  useEffect(() => {
    setLocalStorageProducts(fetchFromLocalStorage());
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: "30px" }}>
        <Sidebar />
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
    </>
  );
}

export default App;
