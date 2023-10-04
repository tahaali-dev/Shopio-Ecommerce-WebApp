import React, { useState } from "react";
import "./Category.css";
import { FaHeadphonesAlt } from "react-icons/fa";
import { AiFillGift, AiOutlineFieldTime } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { LuVegan } from "react-icons/lu";
import { PiTShirtFill } from "react-icons/pi";
import { DiGhostSmall } from "react-icons/di";
import { GiSonicShoes } from "react-icons/gi";
import { LiaBookSolid } from "react-icons/lia";
import {
  MdOutlineTableRestaurant,
  MdFaceRetouchingNatural,
} from "react-icons/md";
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
      <div className="cat" onClick={() => dispatch(categoryset("clothing"))}>
        <PiTShirtFill className="cat-icon" />
        <p>Clothing</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("books"))}>
        <LiaBookSolid className="cat-icon" />
        <p>Books</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("selfcare"))}>
        <MdFaceRetouchingNatural className="cat-icon" />
        <p>SelfCare</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("furniture"))}>
        <MdOutlineTableRestaurant className="cat-icon" />
        <p>Furniture</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("homedecor"))}>
        <BiHomeAlt className="cat-icon" />
        <p>HomeDecor</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("grocery"))}>
        <LuVegan className="cat-icon" />
        <p>Grocery</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("toys"))}>
        <AiFillGift className="cat-icon" />
        <p>Toys</p>
      </div>

      <div className="cat" onClick={() => dispatch(categoryset("Watches"))}>
        <AiOutlineFieldTime className="cat-icon" />
        <p>Watches</p>
      </div>
    </div>
  );
};

export default Category;
