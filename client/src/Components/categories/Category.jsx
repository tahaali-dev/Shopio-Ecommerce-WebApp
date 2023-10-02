import React, { useState } from "react";
import "./Category.css";
import { FaHeadphonesAlt } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { LuVegan } from "react-icons/lu";
import { PiTShirtFill } from "react-icons/pi";
import { DiGhostSmall } from "react-icons/di";
import { GiSonicShoes } from "react-icons/gi";
import { MdOutlineTableRestaurant,MdFaceRetouchingNatural } from "react-icons/md";
import { useDispatch } from "react-redux";
import { categoryset } from "../../Redux/LogregSlice.js";
//Import-------------------

const Category = () => {
  const dispatch = useDispatch();

  return (
    <div className="cat-cont">
      <div className="cat" onClick={() => dispatch(categoryset(""))}>
        <DiGhostSmall className="cat-icon" />
        <p>All</p>
      </div>
      <div className="cat" onClick={() => dispatch(categoryset("electronics"))}>
        <FaHeadphonesAlt className="cat-icon" />
        <p>Electronics</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("homedecor"))}>
        <BiHomeAlt className="cat-icon" />
        <p>HomeDecor</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("grocery"))}>
        <LuVegan className="cat-icon" />
        <p>Grocery</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("clothing"))}>
        <PiTShirtFill className="cat-icon" />
        <p>Clothing</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("furniture"))}>
        <MdOutlineTableRestaurant className="cat-icon" />
        <p>Furniture</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("toysGifts"))}>
        <AiFillGift className="cat-icon" />
        <p>Toys,Gifts</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("shoes"))}>
        <GiSonicShoes className="cat-icon" />
        <p>Shoes</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("selfcare"))}>
        <MdFaceRetouchingNatural className="cat-icon" />
        <p>SelfCare</p>
      </div>

     
    </div>
  );
};

export default Category;
