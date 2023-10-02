import React from "react";
import "./Order.css";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteOrder, getAllOrders } from "../../../Apis/ProductApis.js";
import Loader from "../../../Components/Loader/Loader";
import moment from "moment";
//Imports-------------------------

const Order = () => {
  const { id } = useSelector((state) => state.app.user);
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/"; //Url For image
  const { data, isLoading } = useQuery("allorders", () => getAllOrders(id));
  console.log(data);

  //Mutation Run For Handle Delete--
  const queryClient = useQueryClient();
  const DeleteMutation = useMutation(DeleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries("allorders");
    },
  });

  //Handle Delete Order-----------
  const HandleDelte = (id) => {
    let text = "Confrim Delete!\n OK or Cancel.";
    if (confirm(text) == true) {
      DeleteMutation.mutate(id);
    } else {
      toast.error("Delete canceled!");
    }
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
                    <h4>{order.status}</h4>
                    <h4>Paid ${order.payment}</h4>

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
                  {order.status === "SHIPPED" ? (
                    <>
                      {" "}
                      <h4 className="cant-cancel">Cannot Cancel</h4>
                    </>
                  ) : (
                    <>
                      <button
                        className="remove-btn remove-order-btn"
                        onClick={() => HandleDelte(order.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Order;
