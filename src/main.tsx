// src/index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/Theme/ThemeContext.tsx";
import { CartProvider } from "./context/Cart/CartContext.tsx";
import { SidebarProvider } from "./context/SideBar/SidebarContext.tsx";
import {
  BrowserRouter,
  Routes as ProjectRoutes,
  Route,
} from "react-router-dom";
import Cart from "./pages/Cart/CartPage.tsx";
import AddProduct from "./pages/AddProduct/AddProduct.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import InvoicePage from "./pages/Invoice/Invoice.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <SidebarProvider> 
          <BrowserRouter>
            <Navbar />
            <ProjectRoutes>
              <Route path="/" element={<App />} />
              <Route path="cart" element={<Cart />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/invoice" element={<InvoicePage />} />
            </ProjectRoutes>
          </BrowserRouter>
        </SidebarProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
