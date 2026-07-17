import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {

      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">

      <div className="text-2xl">
        <h2 className="font-medium">My Orders</h2>
      </div>

      <div>

        {orderData.map((order, index) => (

          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col gap-4"
          >

            {order.items.map((item, itemIndex) => (

              <div
                key={itemIndex}
                className="flex items-start gap-6 text-sm"
              >

                <img
                  className="w-16 sm:w-20"
                  src={item.image[0]}
                  alt=""
                />

                <div className="flex-1">

                  <p className="font-medium">
                    {item.name}
                  </p>

                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">

                    <p>
                      {currency}
                      {item.price}
                    </p>

                    <p>Quantity : {item.quantity}</p>

                    <p>Size : {item.size}</p>

                  </div>

                  <p className="mt-2">
                    Date :
                    <span className="text-gray-400">
                      {" "}
                      {new Date(order.date).toDateString()}
                    </span>
                  </p>

                  <p className="mt-2">
                    Payment :
                    <span className="text-gray-400">
                      {" "}
                      {order.paymentMethod}
                    </span>
                  </p>

                </div>

              </div>

            ))}

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-2">

                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>

                <p className="text-sm md:text-base">
                  {order.status}
                </p>

              </div>

              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Order
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Orders;