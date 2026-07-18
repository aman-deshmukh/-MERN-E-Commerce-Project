import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {

      const response = await axios.post(
        backendUrl + "/api/order/list"
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>

      <h2 className="text-xl font-semibold mb-5">
        All Orders
      </h2>

      <div className="flex flex-col gap-4">

        {orders.map((order, index) => (

          <div
            key={index}
            className="border p-4 rounded-md shadow-sm"
          >

            <p className="font-semibold">
              Order ID: {order._id}
            </p>

            <p className="mt-2">
              <b>Payment:</b> {order.paymentMethod}
            </p>

            <p>
              <b>Amount:</b> ${order.amount}
            </p>

            <p>
              <b>Status:</b> {order.status}
            </p>

            <p className="mt-2">
              <b>Products:</b>
            </p>

            <ul className="list-disc ml-5">

              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} ({item.size}) × {item.quantity}
                </li>
              ))}

            </ul>

            <p className="mt-2">
              <b>Customer:</b>{" "}
              {order.address.firstName} {order.address.lastName}
            </p>

            <p>
              {order.address.street}
            </p>

            <p>
              {order.address.city}, {order.address.state}
            </p>

            <p>
              {order.address.country} - {order.address.zipcode}
            </p>

            <p>
              Phone: {order.address.phone}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Orders;