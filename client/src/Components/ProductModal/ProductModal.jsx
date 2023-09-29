import React from "react";
import "./ProModal.css";
import { useQuery } from "react-query";
import { getAllProducts } from "../../Apis/ProductApis";

const ProductModal = ({ searchdata }) => {
  //Getting Products from Backend-------
  const { data } = useQuery("allproducts", getAllProducts);
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/"; //Url For image

  //Search filter-------
  const filteredProducts = data.filter((product) => {
    const searchRegex = new RegExp(searchdata, "i"); // Case-insensitive search
    return (
      searchRegex.test(product.name) || searchRegex.test(product.description)
    );
  });

  return (
    <div className="ProModal-cont">
      {/* Card Grid------------------  */}
      <div className="card-grid grid-modal">
        {/* Card--------------------- */}
        {filteredProducts?.map((item, i) => {
          return (
            <div key={i} className="ProductCard">
              <img src={`${baseURL}${item.image}`} alt="image" />
              <div className="content">
                <h3>{item.name.slice(0, 50)}...</h3>
                <div className="price-quantity">
                  <p>Left : {item.quantity}pcs</p>
                  <h4>${item.price.slice(0, 10)}</h4>
                </div>

                <div className="priceCont">
                  <button className="card-btn">Add To Cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductModal;
