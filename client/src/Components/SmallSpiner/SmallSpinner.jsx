import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "./Small.css";

const SmallSpinner = () => {
  return (
    <div className="Small-cont">
    <img src="/loading.gif" alt="loading.gif" />
    </div>
  );
};

export default SmallSpinner;
