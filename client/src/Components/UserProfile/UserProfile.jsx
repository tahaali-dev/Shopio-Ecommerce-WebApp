import React, { useState } from "react";
import "./UserProfile.css";
import Profile from "./Profile/Profile";
import Order from "./Order/Order";

const UserProfile = () => {
  const [switchpanel, setswitch] = useState("Profile");

  return (
    <div className="userprofile-cont">
      <dipv className="toggle-user">
        <button className="toggle-btn" onClick={() => setswitch("Profile")}>
          Profile
        </button>
        <button className="toggle-btn" onClick={() => setswitch("Order")}>
          My Order
        </button>
      </dipv>
      <div className="switch-cont">
        {switchpanel === "Order" ? (
          <>
            <Order />
          </>
        ) : (
          <>
            <Profile />
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
