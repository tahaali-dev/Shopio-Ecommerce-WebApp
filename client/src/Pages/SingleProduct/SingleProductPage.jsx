import React, { useEffect, useState } from "react";
import "./Single.css";
import { useMutation, useQuery } from "react-query";
import { getAllProducts, getSingleProducts } from "../../Apis/ProductApis";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSimilar } from "../../Redux/LogregSlice";
import { addToCart } from "../../Redux/cart";
import Loader from "../../Components/Loader/Loader";
import lozad from "lozad";
//Imports----------------------------------------------

const SingleProductPage = () => {
  const observer = lozad();
  observer.observe();

  //utilts--------
  const dispatch = useDispatch();
  const { slug } = useParams();
  const Allproducts = useQuery("allproducts", getAllProducts);
  const baseURL = "https://uninterested-tan-centipede.cyclic.cloud/";

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
        localStorage.setItem("similar", JSON.stringify(filterSimilar));
      }
    }
  }, [data]);

  const similar = useSelector((state) => state.app.similar);

  //Add To Cart------Handle
  const navigate = useNavigate();
  const AddToCartHandle = (item) => {
    dispatch(addToCart(item));
    navigate("/cartpage");
  };

  //Handle Similar page
  const HandleSimilarPage = (slug) => {
    navigate(`/similarproduct/${slug}`);
  };

  useEffect(() => {
    scrollToSection("top", 100);
  }, []);

  //Logs For testing
  // console.log(Allproducts.data, "Allproducts on single page");

  //Jsx Return------------------------
  return (
    <>
      {isLoading ? (
        <div className="loader-order">
          <Loader />
        </div>
      ) : (
        <>
          <div className="single-main-cont" id="top">
            {/* Top Section */}
            <section className="top-single">
              {/* left */}
              <div className="top-left">
                <img
                  src={`${baseURL}${data?.image}`}
                  alt="image"
                  className="lozad"
                  loading="lazy"
                />
              </div>

              {/* Right */}
              <div className="top-right">
                <h2>{data?.name}</h2>
                <h3>${data?.price}</h3>
                <p className="description">{data?.description}</p>
                <p className="other-p">Stock Available : {data?.quantity}pcs</p>
                <p className="other-p">Category Name : {data?.Category.name}</p>
                <div className="btn-cont-single">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => AddToCartHandle(data)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </section>

            {/* Similar Products Section*/}
            <section className="similar-sec">
              <h2>Similar Products</h2>
              {/* Card Grid------------------  */}
              <div className="card-grid similargrid">
                {/* Card--------------------- */}
                {similar?.map((item, i) => {
                  return (
                    <div key={i} className="ProductCard">
                      <img
                        src={`${baseURL}${item.image}`}
                        alt="image"
                        className="lozad"
                        loading="lazy"
                      />
                      <div className="content">
                        <h3
                          onClick={() => {
                            HandleSimilarPage(item.slug);
                            scrollToSection("top", 10);
                          }}
                        >
                          {item.name.slice(0, 50)}...
                        </h3>
                        <div className="price-quantity">
                          <p>Left : {item.quantity}pcs</p>
                          <h4>${item.price.slice(0, 80)}</h4>
                        </div>

                        <div className="priceCont">
                          <button
                            className="card-btn"
                            onClick={() => AddToCartHandle(item)}
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default SingleProductPage;

const scrollToSection = (id, offset = 0) => {
  const element = document.getElementById(id);
  if (element) {
    const topPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: topPosition - offset, behavior: "smooth" });
  }
};
