import React from "react";
import "./Form.css";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { useSelector } from "react-redux";
//Imports------------------------

const LogReg = () => {
  
  //Select State From Redux To Show Login Or Register
  const LogregHandle = useSelector((state) => state.app.showlogreg);

  //JSx Return---------------------------
  return (
    <div className="logreg-cont">
      {LogregHandle == "register" ? <Register /> : <Login />}
    </div>
  );
};

export default LogReg;
