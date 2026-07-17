import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const {
    backendUrl,
    token,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
    setCartItems,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("COD");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[items][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      if (method === "COD") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          {
            headers: { token },
          }
        );

        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          alert(response.data.message);
        }
      } else {
        alert(`${method} integration will be added later.`);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
          />

          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
          />
        </div>

        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
        />

        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
        />

        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
          />

          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
          />

          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
          />
        </div>

        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">

        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">

          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex flex-col lg:flex-row gap-3 mt-4">

            <div
              onClick={() => setMethod("Stripe")}
              className="flex items-center gap-3 border p-3 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border ${
                  method === "Stripe" ? "bg-green-500" : ""
                }`}
              ></div>

              <p>Stripe</p>
            </div>

            <div
              onClick={() => setMethod("Razorpay")}
              className="flex items-center gap-3 border p-3 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border ${
                  method === "Razorpay" ? "bg-green-500" : ""
                }`}
              ></div>

              <p>Razorpay</p>
            </div>

            <div
              onClick={() => setMethod("COD")}
              className="flex items-center gap-3 border p-3 cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full border ${
                  method === "COD" ? "bg-green-500" : ""
                }`}
              ></div>

              <p>Cash On Delivery</p>
            </div>

          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>

        </div>

      </div>
    </form>
  );
};

export default PlaceOrder;