import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = "$";
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // ================= ADD TO CART =================

  const addToCart = async (itemId, size) => {

    if (!size) {
      alert("Please Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: { token }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ================= UPDATE CART =================

  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          {
            itemId,
            size,
            quantity
          },
          {
            headers: { token }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ================= GET USER CART =================

  const getUserCart = async (token) => {
    try {

      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  // ================= CART COUNT =================

  const getCartCount = () => {

    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        totalCount += cartItems[items][item];
      }
    }

    return totalCount;
  };

  // ================= CART AMOUNT =================

  const getCartAmount = () => {

    let totalAmount = 0;

    for (const items in cartItems) {

      let itemInfo = products.find(
        (product) => product._id === items
      );

      if (!itemInfo) continue;

      for (const item in cartItems[items]) {

        if (cartItems[items][item] > 0) {
          totalAmount +=
            itemInfo.price * cartItems[items][item];
        }

      }

    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,

    search,
    setSearch,

    showSearch,
    setShowSearch,

    cartItems,
    setCartItems,

    addToCart,
    updateQuantity,

    getCartCount,
    getCartAmount,

    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;