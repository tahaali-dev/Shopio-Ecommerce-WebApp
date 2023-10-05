import React from "react";
// import "./Order.css";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  DeleteOrder,
  UpdateStatus,
  getAllAdminOrders,
  getAllOrders,
} from "../../Apis/ProductApis.js";
import Loader from "../../Components/Loader/Loader";
import moment from "moment";
import { BsCurrencyRupee } from "react-icons/bs";

//Imports-------------------------

const Order = () => {
  const { id } = useSelector((state) => state.app.user);
  const baseURL = "https://uninterested-tan-centipede.cyclic.cloud/"; //Url For image
  const { data, isLoading } = useQuery("alladminorders", () =>
    getAllAdminOrders()
  );

  //Status array
  const StatusArr = [
    "NOT_PROCESS",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELED",
  ];

  //Mutation Run For Update --------------
  const queryClient = useQueryClient();
  const UpdateStatusMutation = useMutation(UpdateStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("alladminorders");
    },
  });

  //Handle Select Change
  const handleChange = (status, id) => {
    UpdateStatusMutation.mutate({ status, id });
  };

  //Jsx Return------------
  return (
    <>
      {isLoading ? (
        <div className="loader-order">
          <Loader />
        </div>
      ) : (
        <div className="myOrder-sec">
          {data &&
            data?.map((order, i) => {
              const date = moment(order.updatedAt);
              const formattedDate = date.format("DD/MM/YYYY");
              return (
                <div className="main-order-card" key={i}>
                  <div className="order-details">
                    <select
                      onChange={(e) => {
                        handleChange(e.target.value, order.id);
                      }}
                    >
                      <option value="">Order Status</option>
                      {StatusArr.map((name, i) => {
                        return (
                          <option key={i} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </select>

                    <h4>
                      Paid <BsCurrencyRupee />
                      {order.payment}
                    </h4>

                    <h4>{formattedDate}</h4>
                    <h4>{order.products.length}</h4>
                  </div>

                  <div className="cart-cont">
                    {order &&
                      order.products.map((item, i) => {
                        return (
                          <div className="cart-card myorder-card" key={i}>
                            <div className="card-top">
                              <img
                                src={`${baseURL}${item.image}`}
                                alt="image"
                              />

                              <div className="price-tit">
                                <div>
                                  <h3>{item.name.slice(0, 10)}</h3>
                                </div>
                              </div>
                              <h3>{item.cartQuantity}</h3>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <h4>Current Status : {order.status}</h4>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Order;
