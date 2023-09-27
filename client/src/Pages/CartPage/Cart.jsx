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

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/"; //Url For image

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

  return (
    <div className="cart-main">
      <section>
        <div className="cart-display-sec">
          <h2>Your Added Products</h2>
          <div className="card-card-cont">
            {cart.cartItems &&
              cart.cartItems?.map((item, i) => {
                return (
                  <div className="cart-card" key={i}>
                    <img src={`${baseURL}${item.image}`} alt="image" />
                    <div className="price-tit">
                      <h3>{item.name.slice(0, 10)}</h3>
                      <h4>${item.price.slice(0, 10)}</h4>
                    </div>
                    <div className="product-count-cont">
                      <button onClick={() => handleDecreaseCart(item)}>
                        -
                      </button>
                      <p>{item.cartQuantity}</p>
                      <button onClick={() => handleAddToCart(item)}>+</button>
                    </div>
                    <RiDeleteBin6Fill
                      className="dlt-icon dlt-cart"
                      onClick={() => handleRemoveFromCart(item)}
                    />
                  </div>
                );
              })}
          </div>
          ;
        </div>
      </section>
    </div>
  );
};

export default Cart;
