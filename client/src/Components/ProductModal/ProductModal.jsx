import React from "react";
import "./ProModal.css";
import { useQuery } from "react-query";
import { getAllProducts } from "../../Apis/ProductApis";

const ProductModal = () => {
  //Getting Products from Backend-------
  const { data } = useQuery("allproducts", getAllProducts);
  console.log(data);
  const baseURL = "http://localhost:3000/"; //Url For image

  return (
    <div className="ProModal-cont">
      {/* Card Grid------------------  */}
      <div className="card-grid grid-modal">
        {/* Card--------------------- */}
        {data?.map((item, i) => {
          return (
            <div key={i} className="ProductCard">
              <img src={`${baseURL}${item.image}`} alt="image" />
              <div className="content">
                <h3>{item.name.slice(0, 50)}...</h3>
                <p>{item.description.slice(0, 50)}...</p>

                <div className="priceCont">
                  <h4>${item.price.slice(0, 10)}</h4>
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
