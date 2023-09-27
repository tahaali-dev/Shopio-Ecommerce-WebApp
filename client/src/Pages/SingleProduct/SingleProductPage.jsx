import React, { useEffect, useState } from "react";
import "./Single.css";
import { useMutation, useQuery } from "react-query";
import { getAllProducts, getSingleProducts } from "../../Apis/ProductApis";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSimilar } from "../../Redux/LogregSlice";
//Imports----------------------------------------------

const SingleProductPage = () => {
  //utilts--------
  const dispatch = useDispatch();
  const { slug } = useParams();
  const Allproducts = useQuery("allproducts", getAllProducts);
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/";

  // Handle SingleProductFetch
  const { data, isLoading } = useQuery("SingleProduct", async () =>
    getSingleProducts(slug)
  );

  //filter Similar Products-----------
  useEffect(() => {
    if (Allproducts.isSuccess) {
      const filterSimilar = Allproducts?.data.filter((product) => {
        if (product?.Category.name === data?.Category.name) {
          return product;
        }
      });
      if (filterSimilar) {
        dispatch(setSimilar(filterSimilar));
      }
    }
  }, [data]);

  const similar = useSelector((state) => state.app.similar);
  // console.log(similar);`

  //Logs For testing
  // console.log(Allproducts.data, "Allproducts on single page");

  //Jsx Return------------------------
  return (
    <div className="single-main-cont">
      {isLoading ? (
        "loading"
      ) : (
        <>
          {" "}
          {/* Top Section */}
          <section className="top-single">
            {/* left */}
            <div className="top-left">
              <img src={`${baseURL}${data?.image}`} alt="image" />
            </div>

            {/* Right */}
            <div className="top-right">
              <h2>{data?.name}</h2>
              <h3>${data?.price}</h3>
              <p className="description">{data?.description}</p>
              <p className="other-p">Stock Available : {data?.quantity}pcs</p>
              <p className="other-p">Category Name : {data?.Category.name}</p>
              <div className="btn-cont-single">
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Similar Products Section*/}
      <section className="similar-sec">
      <h2>Similar Products</h2>
        {/* Card Grid------------------  */}
        <div className="card-grid similargrid">
          {/* Card--------------------- */}
          {Allproducts.isLoading ? (
            "loading"
          ) : (
            <>
              {" "}
              {similar?.map((item, i) => {
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
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SingleProductPage;
