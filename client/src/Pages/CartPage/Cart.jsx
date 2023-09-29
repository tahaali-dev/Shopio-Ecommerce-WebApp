import React, { useEffect, useState } from "react";
import "./Cart.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../Redux/cart";
import { Link } from "react-router-dom";
import { Setclose } from "../../Redux/LogregSlice";
//Imports --------------------

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/"; //Url For image
  const user = useSelector((state) => state.app.user);

  //-------------------------------------

  //Get Totals
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  //Remove Prs In Cart
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  //Increase And Decrease in Cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  //Handle Login Register From
  //Redux State For Login Form
  const OpClController = useSelector((state) => state.app.closelogin);

  const handleLogReg = () => {
    if (OpClController === false) {
      dispatch(Setclose(true));
      // setLogcont(false);
    }
  };

  return (
    <div className="cart-main">
      <section>
        <div className="cart-display-sec">
          <h2>Your Added Products</h2>
          {/* cart display section */}
          <div className="card-card-cont">
            {cart.cartItems &&
              cart.cartItems?.map((item, i) => {
                return (
                  <div className="cart-card" key={i}>
                    <img src={`${baseURL}${item.image}`} alt="image" />
                    <div className="price-tit">
                      <div>
                        <h3>{item.name.slice(0, 10)}</h3>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <h4>${item.price.slice(0, 10)}</h4>
                    <div className="product-count-cont">
                      <button onClick={() => handleDecreaseCart(item)}>
                        -
                      </button>
                      <p>{item.cartQuantity}</p>
                      <button onClick={() => handleAddToCart(item)}>+</button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* cart total and checkout section */}
        <div className="checkout-sec">
          {user && user ? (
            <div className="inner-sec">
              <h2>Checkout Now </h2>
              <img src="/del.gif" alt="" />
              <div>
                <p>Total items</p>
                <h4>{cart.cartTotalQuantity}pcs</h4>
              </div>

              <div>
                <p>Total Amount</p>
                <h4>${cart.cartTotalAmount}</h4>
              </div>

              <div>
                <p>Total Discount</p>
                <span>
                  <h4>10%</h4>
                  <h4>${cart.cartdiscount}</h4>
                </span>
              </div>

              <button className="cart-btn">
                Pay ${cart.amountAfterDiscount}
              </button>
            </div>
          ) : (
            <div className="not-user">
              <p>login first to Checkout</p>

              <Link className="link-d btn1" onClick={handleLogReg}>
                Login
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
