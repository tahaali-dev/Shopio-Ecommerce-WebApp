import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../../Apis/ProductApis";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/cart";
import Loader from "../../Components/Loader/Loader";
import lozad from "lozad";
import { BsCurrencyRupee } from "react-icons/bs";
//Imports-------------------

const ProductSection = () => {
  const observer = lozad();
  observer.observe();

  const navigate = useNavigate();
  //Getting Products from Backend-------
  const { data, isLoading } = useQuery("allproducts", getAllProducts);
  const baseURL = "https://extinct-bee-khakis.cyclic.app/"; //Url For image
  const categorySet = useSelector((state) => state.app.category);

  //Handle Single Product
  const HandleSinglePage = (slug) => {
    // console.log(slug);
    navigate(`/singleproduct/${slug}`);
  };

  //Filter Data According To Category----
  const [filteredProducts, setFilteredProducts] = useState([]);
  // console.log(filteredProducts, "filter");
  // console.log(categorySet);

  useEffect(() => {
    if (data && data.length > 0) {
      // Filter products based on categorySet
      const lowerCasecategorySet = categorySet.toLowerCase();

      const filtered = data.filter((product) => {
        const productMatchesSearch =
          product.name.toLowerCase().includes(lowerCasecategorySet) ||
          product.description.toLowerCase().includes(lowerCasecategorySet) ||
          product.slug.toLowerCase().includes(lowerCasecategorySet);

        const categoryMatchesSearch =
          product.Category &&
          (product.Category.name.toLowerCase().includes(lowerCasecategorySet) ||
            product.Category.slug.toLowerCase().includes(lowerCasecategorySet));

        return productMatchesSearch || categoryMatchesSearch;
      });
      setFilteredProducts(filtered);
    }
  }, [data, categorySet]);

  //Load More-------------------
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const productsPerPage = 25;

  useEffect(() => {
    if (Array.isArray(filteredProducts) && filteredProducts.length > 0) {
      const newVisibleProducts = filteredProducts.slice(0, productsPerPage);
      setVisibleProducts(newVisibleProducts);
      setLoadMoreVisible(filteredProducts.length > productsPerPage);
    }
  }, [filteredProducts, productsPerPage]);

  const handleLoadMore = () => {
    if (Array.isArray(filteredProducts) && filteredProducts.length > 0) {
      const newVisibleProducts = filteredProducts.slice(
        visibleProducts.length,
        visibleProducts.length + productsPerPage
      );
      setVisibleProducts([...visibleProducts, ...newVisibleProducts]);

      if (
        visibleProducts.length + newVisibleProducts.length >=
        filteredProducts.length
      ) {
        setLoadMoreVisible(false);
      }
    }
  };

  //Add To Cart------Handle
  const dispatch = useDispatch();
  const AddToCartHandle = (item) => {
    dispatch(addToCart(item));
    navigate("/cartpage");
  };

  console.log(visibleProducts);
  //Jsx Return----------------
  return (
    <>
      {isLoading ? (
        <div className="loader-order">
          <Loader />
        </div>
      ) : (
        <>
          {" "}
          <div className="main-cont">
            <h2>Trending Products</h2>
            {/* Card Grid------------------  */}
            <div className="card-grid gridproduct-section">
              {/* Card--------------------- */}
              {visibleProducts?.map((item, i) => {
                return (
                  <div key={i} className="ProductCard">
                    <img
                      className="lozad"
                      src={`${baseURL}${item.image}`}
                      alt="image"
                      loading="lazy"
                      // data-src="./logo.png"
                    />
                    <div className="content">
                      <h3 onClick={() => HandleSinglePage(item.slug)}>
                        {item.name.slice(0, 50)}...
                      </h3>
                      <div className="price-quantity">
                        <p>Left : {item.quantity}pcs</p>
                        <h4>
                          <BsCurrencyRupee />
                          {item.price.slice(0, 10)}
                        </h4>
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

            {loadMoreVisible && (
              <button className="btn-loadmore" onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductSection;
