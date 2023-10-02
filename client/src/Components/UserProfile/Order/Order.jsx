import React from "react";
import "./Order.css";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getAllOrders } from "../../../Apis/ProductApis.js";
import Loader from "../../../Components/Loader/Loader";

const Order = () => {
  const { id } = useSelector((state) => state.app.user);
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/"; //Url For image
  const { data, isLoading } = useQuery("allorders", () => getAllOrders(id));

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
              return (
                <div className="main-order-card" key={i}>
                  <div className="order-details">
                    <p>{order.status}</p>
                    <p>Paid ${order.payment}</p>
                    <p>20-09-2023</p>
                    <p>{order.products.length}</p>
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
                                  <p>OrderId-{item.orderId.slice(0, 10)}</p>
                                </div>
                              </div>
                              <h3>{item.cartQuantity}</h3>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <button className="remove-btn remove-order-btn">
                    Cancel
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Order;

{
  /* <div className="myOrder-sec">
{/* myorderCard */
}
// {data &&
//   data?.map((order, i) => {
//     return (
//       <div className="cart-card myorder-card" key={i}>
//         <div className="card-top">
//           {/* <img src={`${baseURL}${item.image}`} alt="image" /> */}
//           <img alt="image" />
//           <div className="price-tit">
//             <div>
//               {/* <h3>{item.name.slice(0, 10)}</h3> */}
//               <h3>Titele</h3>
//             </div>
//           </div>
//           {/* <h4>${item.price.slice(0, 10)}</h4> */}
//           <h4>$1500</h4>
//           <button className="remove-btn remove-order-btn">Cancel</button>
//         </div>

// {/* Bottom Card */}
//         <div className="bottom-card">
//           <p>{order.status}</p>
//           <p>Paid</p>
//           <p>20-09-2023</p>
//           <p>{order.products.length}</p>
//         </div>
//       </div>
//     );
//   })}
// </div> */}
