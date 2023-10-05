import React from "react";
import "./ProModal.css";
import { useQuery } from "react-query";
import { getAllProducts } from "../../Apis/ProductApis";
import Loader from "../../Components/Loader/Loader";
import { addToCart } from "../../Redux/cart";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCurrencyRupee } from "react-icons/bs";
//Imports---------

const ProductModal = ({ searchdata, setsearh }) => {
  //Getting Products from Backend-------
  const { data, isLoading } = useQuery("allproducts", getAllProducts);
  const baseURL = "https://uninterested-tan-centipede.cyclic.cloud/"; //Url For image

  //Search filter-------
  const filteredProducts = data.filter((product) => {
    const searchRegex = new RegExp(searchdata, "i"); // Case-insensitive search
    return (
      searchRegex.test(product.name) || searchRegex.test(product.description)
    );
  });

  //Handle Single Product
  const navigate = useNavigate();
  const HandleSinglePage = (slug) => {
    navigate(`/singleproduct/${slug}`);
    setsearh("");
  };

  //Add To Cart------Handle
  const dispatch = useDispatch();
  const AddToCartHandle = (item) => {
    dispatch(addToCart(item));
    navigate("/cartpage");
    setsearh("");
  };
  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="ProModal-cont">
          {/* Card Grid------------------  */}
          <div className="card-grid grid-modal">
            {/* Card--------------------- */}
            {filteredProducts?.map((item, i) => {
              return (
                <div key={i} className="ProductCard">
                  <img src={`${baseURL}${item.image}`} alt="image" />
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
      )}
    </>
  );
};

export default ProductModal;
