import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Setclose, showlogreg, storeUser } from "../../Redux/LogregSlice";
import { RxCross1 } from "react-icons/rx";
import { useMutation } from "react-query";
import { UserLogin } from "../../Apis/Apis";
import Loader from "../Loader/Loader";
//Imports------------------------

const Login = () => {
  //Utils----------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //State for Form-----
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const data = { email, password };

  //Mutation Run--------------
  const LoginMutation = useMutation("userlogin", async (data) => {
    const response = await UserLogin(data);
    if (response.data.success) {
      dispatch(Setclose(false));
      dispatch(storeUser(response.data.user));
    }
    return response;
  });

  //Form Submit Handle
  const handlesubmit = (e) => {
    e.preventDefault();
    LoginMutation.mutate(data);
  };

  //JSx Return---------------------------
  return (
    <form>
      {LoginMutation.isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <h2>Login</h2>
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
            className="link-form"
            onClick={(e) => {
              e.preventDefault();
              dispatch(showlogreg("register"));
            }}
          >
            Create A Account
          </Link>
        </>
      )}
    </form>
  );
};

export default Login;
