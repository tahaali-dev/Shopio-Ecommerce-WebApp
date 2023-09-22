import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Setclose,
  StoreToken,
  showlogreg,
  storeUser,
} from "../../Redux/LogregSlice";
import { RxCross1 } from "react-icons/rx";
import { useMutation, useQueryClient } from "react-query";
import { UserRegister } from "../../Apis/Apis.js";
import Loader from "../Loader/Loader";
//Imports------------------------

const Register = () => {
  //Utils-----------
  const dispatch = useDispatch();

  //state for form
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const data = { username, email, password, phone, address };

  //Mutation Run
  const RegisterMutation = useMutation("user", async (data) => {
    const response = await UserRegister(data);
    if (response.data.success) {
      dispatch(Setclose(false));
      dispatch(storeUser(response.data.user));
      dispatch(StoreToken(response.data.token));
    }
    return response;
  });

  //Form Submit Handle
  const handlesubmit = (e) => {
    e.preventDefault();
    RegisterMutation.mutate(data);
  };

  //JSx Return---------------------------
  return (
    <form>
      {RegisterMutation.isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <input
            type="address"
            placeholder=" Enter Address "
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
          <button type="submit" onClick={handlesubmit} className="sub-btn">
            Submit
          </button>

          {/* close Button  */}
          <p
            className=" btn-sep"
            onClick={() => {
              dispatch(Setclose(false));
            }}
          >
            <RxCross1 />
          </p>
          <Link
            to="/"
            className="link-form"
            onClick={(e) => {
              e.preventDefault();
              dispatch(showlogreg("Login"));
            }}
          >
            Already Have A Account
          </Link>
        </>
      )}
    </form>
  );
};

export default Register;
