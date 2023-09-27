import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../../Apis/ProductApis";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeCart } from "../../Redux/LogregSlice";
import { addToCart } from "../../Redux/cart";
//Imports-------------------

const ProductSection = () => {
  const navigate = useNavigate();
  //Getting Products from Backend-------
  const { data } = useQuery("allproducts", getAllProducts);
  const baseURL = "https://e-commerce-server-f8m6.onrender.com/"; //Url For image
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
  const productsPerPage = 10;

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


  //Jsx Return----------------
  return (
    <div className="main-cont">
      <h2>Trending Products</h2>
      {/* Card Grid------------------  */}
      <div className="card-grid gridproduct-section">
        {/* Card--------------------- */}
        {visibleProducts?.map((item, i) => {
          return (
            <div key={i} className="ProductCard">
              <img src={`${baseURL}${item.image}`} alt="image" />
              <div className="content">
                <h3 onClick={() => HandleSinglePage(item.slug)}>
                  {item.name.slice(0, 50)}...
                </h3>
                <p>{item.description.slice(0, 50)}...</p>

                <div className="priceCont">
                  <h4>${item.price.slice(0, 10)}</h4>
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
  );
};

export default ProductSection;
