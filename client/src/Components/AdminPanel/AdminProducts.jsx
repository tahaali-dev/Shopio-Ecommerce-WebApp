import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllCats } from "../../Apis/CategoryApis";
import { useSelector } from "react-redux";
import { CreateProduct } from "../../Apis/ProductApis.js";
import AllProductsAdmin from "./AllProducts";
import SmallSpinner from "../SmallSpiner/SmallSpinner";
//Imports --------------

const AdminProducts = () => {
  //state for form submit
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [quantity, setquantity] = useState("");
  const [image, setimage] = useState();

  //running Query For get Categories
  const { data } = useQuery("getcategory", getAllCats);
  const Token = useSelector((state) => state.app.token);
  const datasend = {
    name,
    description,
    price,
    categoryId,
    quantity,
    image,
    Token,
  };
  // console.log(datasend);

  //Handle File Change--------
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(e.target.files[0], "file test");
    setimage(selectedFile);
  };

  // Mutations
  const queryClient = useQueryClient();
  const Createmutation = useMutation(CreateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("allproducts");
    },
  });

  //Handle Submit For New Product Create
  const HandleCreate = (e) => {
    e.preventDefault();
    Createmutation.mutate(datasend);
  };

  //Jsx Return------------
  return (
    <div className="admin-pro-cont">
      <section className="create-product">
        <h2>Create Product</h2>

        <form
          onSubmit={HandleCreate}
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
              {data?.map((item, i) => {
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
          {Createmutation.isLoading ? (
            <button className="submit-btn"><SmallSpinner/></button>
          ) : (
            <button type="submit" className="submit-btn">
              Submit
            </button>
          )}
            
        </form>
      </section>

      <AllProductsAdmin />
    </div>
  );
};

export default AdminProducts;
