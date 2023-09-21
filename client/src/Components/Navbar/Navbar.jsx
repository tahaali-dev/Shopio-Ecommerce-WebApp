import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { BsMinecartLoaded, BsSearch } from "react-icons/bs";
import { RiAccountPinCircleFill, RiMenu4Line } from "react-icons/ri";
import LogReg from "../Log-Reg/LogReg";
import { useDispatch, useSelector } from "react-redux";
import { Setclose, storeUser } from "../../Redux/LogregSlice";
import toast from "react-hot-toast";
import ProductModal from "../ProductModal/ProductModal";
//Imports-----------------

const Navbar = () => {
  //utils-------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Menu Open Close Handle
  const [menu, setmenu] = useState("menu-mobile");
  const HandleMenu = () => {
    if (menu == "menu-mobile") {
      setmenu("menu-mobile-show");
    } else {
      setmenu("menu-mobile");
    }
  };

  //Redux State For Login Form
  const OpClController = useSelector((state) => state.app.closelogin);

  //Redux State For User---------
  const user = useSelector((state) => state.app.user);

  //Handle Login Register From
  const handleLogReg = () => {
    if (OpClController === false) {
      dispatch(Setclose(true));
      // setLogcont(false);
    }
  };

  //Handle Logout----------
  const HandleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(storeUser());
    toast.success("Logged Out");
    navigate("/");
  };

  const [searchdata, setSearchdata] = useState("");

  return (
    <div className="w-full nav-cont nav-cont-mobile">
      {OpClController ? <LogReg /> : null}
      <div className="nav-top">
        <div onClick={HandleMenu} className="mobile-menu-icon">
          <RiMenu4Line />
        </div>

        {/* Div-1 */}
        <Link to="/" className="div-1">
          <h2>Shopio</h2>
        </Link>
        {/* Div-2 */}
        <div className="div-2">
          <input
            type="text"
            placeholder="Search Products"
            value={searchdata}
            onChange={(e) => setSearchdata(e.target.value)}
          />
        </div>
        {/* Div-3 */}
        <div className="div-3">
          <Link className="link-d">Products</Link>
          <Link className="link-d">Categories</Link>
          <Link className="link-d">Support</Link>
        </div>
        {/* Div-4 */}
        <div className="div-4">
          {user ? (
            <>
              <Link className="link-d btn1" onClick={HandleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="link-d btn1" onClick={handleLogReg}>
                Login
              </Link>
            </>
          )}

          <Link className="link-cart">
            <BsMinecartLoaded />
          </Link>
          <Link to="/dashboard" className="link-cart">
            <RiAccountPinCircleFill />
          </Link>
        </div>

        {/* Menu Mobile */}
        <div className={menu}>
          <div className="mobile-menu-link-cont">
            <Link className="link-d">Products</Link>
            <Link className="link-d">Categories</Link>
          </div>
        </div>
      </div>
      <div className="input-for-mobile">
        <input
          type="text"
          placeholder="Search Products"
          value={searchdata}
          onChange={(e) => setSearchdata(e.target.value)}
        />
      </div>
      {searchdata ? (
        <>
          <ProductModal searchdata={searchdata} />
        </>
      ) : null}
    </div>
  );
};

export default Navbar;
