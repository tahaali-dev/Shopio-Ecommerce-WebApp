import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./dashboard.css";
import UserProfile from "../../Components/UserProfile/UserProfile";
import Adminpanel from "../../Components/AdminPanel/Adminpanel";

const Dashboard = () => {
  //Redux State For User---------
  const user = useSelector((state) => state.app.user);
 
  return (
    <div className="dash-cont">
      {!user ? (
        <>
          <h3>Login First To Access Profile</h3>
        </>
      ) : (
        <>
          {" "}
          {user.role ? (
            <>
              <Adminpanel />
            </>
          ) : (
            <>
              <UserProfile />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

//
