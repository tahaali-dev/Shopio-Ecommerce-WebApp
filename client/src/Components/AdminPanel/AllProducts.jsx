import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  DeleteProducts,
  UpdateProduct,
  getAllProducts,
} from "../../Apis/ProductApis.js";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import { getAllCats } from "../../Apis/CategoryApis.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCurrencyRupee } from "react-icons/bs";

//Imoports----------------

const AllProductsAdmin = () => {
  //State For Modal--
  const [modal, setModel] = useState("modal-close");
  const [id, setid] = useState("");

  //state for form submit
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [quantity, setquantity] = useState("");
  const [image, setimage] = useState();

  //running Query For get Categories
  const Category = useQuery("getcategory", getAllCats);
  const Token = useSelector((state) => state.app.token);
  const datasend = {
    name,
    description,
    price,
    categoryId,
    quantity,
    image,
    Token,
    id,
  };
  //Handle File Change--------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(e.target.files[0], "file test");
    setimage(selectedFile);
  };
  // console.log(datasend, "update prs");

  const { data } = useQuery("allproducts", getAllProducts);
  // console.log(data, "products");
  const baseURL = "https://uninterested-tan-centipede.cyclic.cloud/";

  //Mutation Run For Handle Delete--
  const queryClient = useQueryClient();
  const DeleteMutation = useMutation(DeleteProducts, {
    onSuccess: () => {
      queryClient.invalidateQueries("allproducts");
    },
  });

  //Handle Delete Product-----------
  const HandleDelte = (id) => {
    let text = "Confrim Delete!\n OK or Cancel.";
    if (confirm(text) == true) {
      DeleteMutation.mutate(id);
    } else {
      toast.error("Delete canceled!");
    }
  };

  //Mutation Run For Update --------------
  const UpdateProductMutation = useMutation(UpdateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("allproducts");
    },
  });

  //UpDate  Handle---
  const HandleUpdate = (e) => {
    e.preventDefault();
    UpdateProductMutation.mutate(datasend);
    // if (UpdateProductMutation.isSuccess) {
    //   setModel("modal-close");
    // }
  };

  //Handle Single Product
  const navigate = useNavigate();
  const HandleSinglePage = (slug) => {
    console.log("clicked");
    // console.log(slug);
    navigate(`/singleproduct/${slug}`);
  };

  // JSx Return--------------------
  return (
    <section className="All-product">
      {data?.map((item, i) => {
        return (
          <div key={i} className="ProductCard">
            <img src={`${baseURL}${item.image}`} alt="image" />
            <div className="content">
              <h3 onClick={() => HandleSinglePage(item.slug)}>
                {item.name.slice(0, 50)}...
            </h3>
              <p>{item.description.slice(0, 25)}...</p>

              <div className="priceCont">
                <h4><BsCurrencyRupee/>{item.price.slice(0, 10)}</h4>
                <div className="icon-cont">
                  <RiDeleteBin6Fill
                    className="dlt-icon"
                    onClick={() => HandleDelte(item.id)}
                  />
                  <AiFillEdit
                    className="edit-icon"
                    onClick={() => {
                      setid(item.id);
                      setname(item.name);
                      setdescription(item.description);
                      setprice(item.price);
                      setquantity(item.quantity);
                      setModel("model-cont");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal Section */}
      <section className={modal}>
        <form
          className="addCategory"
          encType="multipart/form-data"
          method="post"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Product Quantity"
            value={quantity}
            onChange={(e) => setquantity(e.target.value)}
            required
          />

          {/* Select Tag For Category */}
          <div className="selectdiv">
            <select
              className="photoLabel"
              value={categoryId}
              onChange={(e) => setcategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {Category.data?.map((item, i) => {
                return (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <label className="photoLabel clr">
              {image ? image.name.slice(0, 10) : "Upload Photo"}
              <input
                type="file"
                name="uploaded_file"
                accept="image/*"
                // value={image}
                onChange={handleFileChange}
                hidden
                required
              />
            </label>
          </div>

          <div className="btn-container">
            <p
              className="submit-btn width-cont"
              onClick={() => {
                setModel("modal-close");
                setimage("");
              }}
            >
              Close
            </p>
            <button
              type="submit"
              className="submit-btn width-cont"
              onClick={HandleUpdate}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AllProductsAdmin;
