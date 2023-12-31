import React, { useEffect, useState } from "react";
import "./CardSection.css";
import { useMutation, useQuery } from "react-query";
import { FilterProducts, getAllProducts } from "../../Apis/ProductApis.js";
import { getAllCats } from "../../Apis/CategoryApis";
import { Prices } from "../../Utils/Price.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/cart";
import Loader from "../Loader/Loader";
import lozad from "lozad";
import { BsCurrencyRupee } from "react-icons/bs";
//Imports-------------------

const CardSection = () => {
  const observer = lozad();
  observer.observe();

  //Getting Products from Backend-------
  const { data, isLoading } = useQuery("allproducts", getAllProducts);
  const baseURL = "https://extinct-bee-khakis.cyclic.app/"; //Url For image

  // Query To Get All Categories
  const Category = useQuery("getCategory", getAllCats);

  //Filtering Data Logic----------------------
  const [categoryIds, setCategory] = useState([]);
  const [priceRange, setRadio] = useState("0,9999");
  const [filterData, setFilterData] = useState(data);

  //Handle filter By Category To Push Category
  const handleFilter = (value, id) => {
    let all = [...categoryIds];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCategory(all);
  };

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  //Mutation Run To get filter data-----
  const filterMutation = useMutation(
    "userlogin",
    async ({ categoryIds, priceRange }) => {
      const response = await FilterProducts({ categoryIds, priceRange });
      setFilterData(response);
      return response;
    }
  );

  useEffect(() => {
    filterMutation.mutate({ categoryIds, priceRange });
  }, [categoryIds, priceRange]);

  //---------------------**-----------------**----------

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const productsPerPage = 12;

  useEffect(() => {
    if (Array.isArray(filterData) && filterData.length > 0) {
      const newVisibleProducts = filterData.slice(0, productsPerPage);
      setVisibleProducts(newVisibleProducts);
      setLoadMoreVisible(filterData.length > productsPerPage);
    }
  }, [filterData, productsPerPage]);

  const handleLoadMore = () => {
    if (Array.isArray(filterData) && filterData.length > 0) {
      const newVisibleProducts = filterData.slice(
        visibleProducts.length,
        visibleProducts.length + productsPerPage
      );
      setVisibleProducts([...visibleProducts, ...newVisibleProducts]);

      if (
        visibleProducts.length + newVisibleProducts.length >=
        filterData.length
      ) {
        setLoadMoreVisible(false);
      }
    }
  };

  //Handle Single Product
  const navigate = useNavigate();
  const HandleSinglePage = (slug) => {
    // console.log("clicked");
    // console.log(slug);
    navigate(`/singleproduct/${slug}`);
  };

  //Add To Cart------Handle
  const dispatch = useDispatch();
  const AddToCartHandle = (item) => {
    dispatch(addToCart(item));
    navigate("/cartpage");
  };

  return (
    <>
      {isLoading ? (
        <div className="loader-order">
          <Loader />
        </div>
      ) : (
        <div className="card-cont">
          <h2>Products</h2>
          <div className="layout-filter">
            <div className="filter-cont">
              <div className="filter-category">
                <h4>Filter By Category</h4>
                <div className="for-mobile">
                  {Category.data?.map((item, i) => {
                    return (
                      <label key={i}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          key={item.id}
                          onChange={(e) =>
                            handleFilter(e.target.checked, item.id)
                          }
                        />
                        <p>{item.name.slice(0, 20)}</p>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter  */}
              <div className="filter-category filter-price">
                <h4>Price Range</h4>
                <div className="for-mobile">
                  {Prices?.map((item, i) => {
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          className="checkbox"
                          key={item.id}
                          value={item.array}
                          id={item.id}
                          onChange={(e) => setRadio(e.target.value)}
                          name="price"
                        />
                        {item.name.slice(0, 20)}
                      </label>
                    );
                  })}
                </div>
              </div>
              <button
                className="btn-loadmore filter-btn"
                onClick={() => {
                  setFilterData(data);
                }}
              >
                Show All
              </button>
            </div>

            {/* Card Grid------------------  */}
            <div className="card-grid">
              {/* Card--------------------- */}
              {visibleProducts?.map((item, i) => {
                return (
                  <div key={i} className="ProductCard">
                    <img
                      src={`${baseURL}${item.image}`}
                      alt="image"
                      className="lozad"
                      loading="lazy"
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
          </div>

          {loadMoreVisible && (
            <button className="btn-loadmore " onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default CardSection;
