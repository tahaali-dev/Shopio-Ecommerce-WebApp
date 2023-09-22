import React from "react";
import "./Single.css";
import { useMutation, useQuery } from "react-query";
import { getSingleProducts } from "../../Apis/ProductApis";
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { slug } = useParams();
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/"; //Url For image

  // Handle SingleProductFetch
  const { data } = useQuery("getSingleProduct", () => getSingleProducts(slug));

  console.log(data);

  return (
    <div className="single-main-cont">
      {/* Top Section */}
      <section className="top-single">
        {/* left */}
        <div className="top-left">
          <img src={`${baseURL}${data.image}`} alt="image" />
        </div>

        {/* Right */}
        <div className="top-right">
          <h2>{data.name}</h2>
          <h3>${data.price}</h3>
          <p className="description">{data.description}</p>
          <p className="other-p">Stock Available : {data.quantity}pcs</p>
          <p className="other-p">Category Name : {data.Category.name}</p>
          <div className="btn-cont-single">
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Similar Products Section*/}
      <section className="similar-sec">Similar section</section>
    </div>
  );
};

export default SingleProductPage;
