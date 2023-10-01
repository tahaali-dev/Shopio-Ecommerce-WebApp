import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.app.user);

  return (
    <div className="profile-cont">
      <h2>{user.name.slice(0, 1)}</h2>
      <div className="details-cont">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p className="address">{user.address}</p>
      </div>
    </div>
  );
};

export default Profile;
