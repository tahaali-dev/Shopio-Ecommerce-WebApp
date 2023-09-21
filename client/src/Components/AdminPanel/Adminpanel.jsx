import React, { useState } from "react";
import Profile from "../UserProfile/Profile/Profile";
import AdminCategory from "./AdminCategory";
import AdminProducts from "./AdminProducts";

const Adminpanel = () => {
  const [switchpanel, setSwitch] = useState("Admin");

  return (
    <div className="userprofile-cont">
      <div className="toggle-user">
        <button className="toggle-btn" onClick={() => setSwitch("Admin")}>
          Admin
        </button>
        <button className="toggle-btn" onClick={() => setSwitch("Category")}>
          Category
        </button>
        <button className="toggle-btn" onClick={() => setSwitch("Products")}>
          Products
        </button>
        <button className="toggle-btn" onClick={() => setSwitch("Users")}>
          Users
        </button>
      </div>
      <div className="switch-cont">
        {switchpanel == "Admin" ? (
          <>
            <Profile />
          </>
        ) : (
          <>
            {switchpanel == "Category" ? (
              <>
                <AdminCategory />
              </>
            ) : (
              <>
                {switchpanel == "Products" ? (
                  <>
                    <AdminProducts />
                  </>
                ) : (
                  <>Users</>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Adminpanel;
