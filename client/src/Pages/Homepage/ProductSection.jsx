import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../../Apis/ProductApis";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
//Imports-------------------

const ProductSection = () => {
  const navigate = useNavigate();
  //Getting Products from Backend-------
  const { data } = useQuery("allproducts", getAllProducts);
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/"; //Url For image

  //Handle Single Product
  const HandleSinglePage = (slug) => {
    console.log(slug);
    navigate(`/singleproduct/${slug}`);
  };

  //Load More-------------------
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const productsPerPage = 10;

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const newVisibleProducts = data.slice(0, productsPerPage);
      setVisibleProducts(newVisibleProducts);
      setLoadMoreVisible(data.length > productsPerPage);
    }
  }, [data, productsPerPage]);

  const handleLoadMore = () => {
    if (Array.isArray(data) && data.length > 0) {
      const newVisibleProducts = data.slice(
        visibleProducts.length,
        visibleProducts.length + productsPerPage
      );
      setVisibleProducts([...visibleProducts, ...newVisibleProducts]);

      if (visibleProducts.length + newVisibleProducts.length >= data.length) {
        setLoadMoreVisible(false);
      }
    }
  };

  //Jsx Return----------------
  return (
    <div className="main-cont">
      <h2>Trending Products</h2>
      {/* Card Grid------------------  */}
      <div className="card-grid gridproduct-section">
        {/* Card--------------------- */}
        {visibleProducts?.map((item, i) => {
          return (
            <div
              key={i}
              className="ProductCard"
              onClick={() => HandleSinglePage(item.slug)}
            >
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
      {loadMoreVisible && (
        <button className="btn-loadmore" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductSection;
