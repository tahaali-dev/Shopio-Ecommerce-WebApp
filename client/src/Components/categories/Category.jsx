import React from "react";
import "./Category.css";
import { FaHeadphonesAlt } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { LuVegan } from "react-icons/lu";
import { PiTShirtFill } from "react-icons/pi";
import { MdOutlineTableRestaurant } from "react-icons/md";

const Category = () => {
  return (
    <div className="cat-cont">
      <div className="cat">
        <FaHeadphonesAlt className="cat-icon" />
        <p>Electronics</p>
      </div>

      <div className="cat">
        <AiFillGift className="cat-icon" />
        <p>Toys,Gifts</p>
      </div>

      <div className="cat">
        <BiHomeAlt className="cat-icon" />
        <p>HomeDecor</p>
      </div>

      <div className="cat">
        <LuVegan className="cat-icon" />
        <p>Grocery</p>
      </div>

      <div className="cat">
        <PiTShirtFill className="cat-icon" />
        <p>Clothing</p>
      </div>

      <div className="cat">
        <MdOutlineTableRestaurant className="cat-icon" />
        <p>Furniture</p>
      </div>
    </div>
  );
};

export default Category;
