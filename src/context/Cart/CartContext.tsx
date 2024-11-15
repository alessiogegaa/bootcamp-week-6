import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useFetch } from "../../hooks/useFetch";
export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}

interface CartContextType {
  productCategories: string[];
  quantities: Record<number, number>;
  increaseQuantity: (productID: number) => void;
  decreaseQuantity: (productID: number) => void;
  addToCart: (productID: number) => void;
  totalCartQuantity: number;
  products: Product[];
  removeFromCart: (productID: number) => void;
  getTotalPrice: () => number;
  getAllProductsInCart: () => Array<Product & { quantity: number }>;
  increaseQuantityInsideCart: (productID: number) => void;
  decreaseQuantityInsideCart: (productID: number) => void;
  getProductFromApi: (category?: string) => void;
  generateInvoice: ()=>void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cartQuantity, setCartQuantity] = useState<Record<number, number>>({});
  const [fetchUrl, setFetchUrl] = useState("https://fakestoreapi.com/products");
  const [fetchParams, setFetchParams] = useState<string | undefined>(undefined);
  const [totalCartQuantity, setTotalCartQuantity] = useState<number>(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return cart.reduce(
      (total: number, item: { quantity: number }) => total + item.quantity,
      0
    );
  });
  const productCategories = ["Men's Clothing", "Women's Clothing", "Jewelery", "Electronics"];
  const { data, error, loading } = useFetch(fetchUrl, fetchParams);
  const newProducts = JSON.parse(localStorage.getItem("newProducts") || "[]");
  const products: Product[] =
    data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.image,
      price: `${item.price}$`,
    })) || [];

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);

  const increaseQuantity = (productID: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productID]: (prevQuantities[productID] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productID: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productID]:
        prevQuantities[productID] > 1 ? prevQuantities[productID] - 1 : 1,
    }));
  };

  const addToCart = (productID: number) => {
    const cart: { id: number; quantity: number }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const existingProduct = cart.find((item) => item.id === productID);
    const quantityToAdd = quantities[productID] || 1;

    if (existingProduct) {
      existingProduct.quantity += quantityToAdd;
    } else {
      cart.push({ id: productID, quantity: quantityToAdd });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setCartQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productID]: (prevQuantities[productID] || 0) + quantityToAdd,
    }));
    
    setTotalCartQuantity((prevQuantity) => prevQuantity + quantityToAdd);
  };

  const removeFromCart = (productID: number) => {
    const cart: { id: number; quantity: number }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const newCart = cart.filter((item) => productID !== item.id);
    localStorage.setItem("cart", JSON.stringify(newCart));

    setCartQuantity((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[productID];
      return newQuantities;
    });

    const removedItem = cart.find((item) => item.id === productID);
    if (removedItem) {
      setTotalCartQuantity((prevTotal) => prevTotal - removedItem.quantity);
    }
  };

  const getTotalPrice = () => {
    const cart: { id: number; quantity: number }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    
    return cart.reduce((total, item) => {
      const product = products.find((prod) => prod.id === item.id);
      if (product) {
        const productPrice = parseFloat(product.price.replace("$", ""));
        total += productPrice * item.quantity;
      }
      return total;
    }, 0);
  };

  const getAllProductsInCart = () => {
    const cart: { id: number; quantity: number }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const newProducts = JSON.parse(localStorage.getItem("newProducts") || "[]");

    const allProducts = [...products, ...newProducts];

    const detailedProducts = cart
      .map((cartItem) => {
        const product = allProducts.find((prod) => prod.id === cartItem.id);
        if (product) {
          return {
            ...product,
            quantity: cartItem.quantity,
          };
        }
        return null;
      })
      .filter((product) => product !== null);

    return detailedProducts as Array<Product & { quantity: number }>;
  };

  const increaseQuantityInsideCart = (productID: number) => {
    const detailedProducts = getAllProductsInCart();
    const productIndex = detailedProducts.findIndex(
      (product) => product.id === productID
    );

    if (productIndex !== -1) {
      detailedProducts[productIndex].quantity += 1;

      const updatedCart = detailedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      setCartQuantity(
        updatedCart.reduce(
          (acc, item) => ({ ...acc, [item.id]: item.quantity }),
          {}
        )
      );
      setTotalCartQuantity(
        updatedCart.reduce((total, item) => total + item.quantity, 0)
      );
    }
  };

  const decreaseQuantityInsideCart = (productID: number) => {
    const detailedProducts = getAllProductsInCart();
    const productIndex = detailedProducts.findIndex(
      (product) => product.id === productID
    );

    if (productIndex !== -1 && detailedProducts[productIndex].quantity > 1) {
      detailedProducts[productIndex].quantity -= 1;

      const updatedCart = detailedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      setCartQuantity(
        updatedCart.reduce(
          (acc, item) => ({ ...acc, [item.id]: item.quantity }),
          {}
        )
      );
      setTotalCartQuantity(
        updatedCart.reduce((total, item) => total + item.quantity, 0)
      );
    }
  };

  const getProductFromApi = (category?: string) => {
    if (category) {
      setFetchUrl(`https://fakestoreapi.com/products/category/${category}`);
    } else {
      setFetchUrl('https://fakestoreapi.com/products/');
    }
    setFetchParams(undefined); 
  };

  const generateInvoice = () => {
    const detailedProducts = getAllProductsInCart(); 
    const totalPrice = getTotalPrice(); 
    
    const currentDate = new Date().toLocaleDateString();
    const invoiceNumber = Math.floor(Math.random() * 1000000); 
    const customerName = "Alessio Gega"; 
    const customerAddress = "TeamSystem"; 
  
    const newInvoice = {
      id: invoiceNumber.toString(),
      invoiceNumber: invoiceNumber,
      date: currentDate,
      customerName: customerName,
      address: customerAddress,
      products: detailedProducts.map((product) => ({
        title: product.title,
        quantity: product.quantity,
        total: `$${(parseFloat(product.price.replace("$", "")) * product.quantity).toFixed(2)}`,
      })),
      totalPrice: `$${totalPrice.toFixed(2)}`,
    };
  
    const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
    savedInvoices.push(newInvoice);
    localStorage.setItem("invoices", JSON.stringify(savedInvoices));
  
    localStorage.setItem("cart", JSON.stringify([])); 
    setTotalCartQuantity(0);
  };
  
  return (
    <CartContext.Provider
      value={{
        productCategories,
        quantities,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        totalCartQuantity,
        products,
        removeFromCart,
        getTotalPrice,
        getAllProductsInCart,
        increaseQuantityInsideCart,
        decreaseQuantityInsideCart,
        getProductFromApi,
        generateInvoice
      }}
    >
      {/* {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading products.</div>
      ) : ( */
        children
      }
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
