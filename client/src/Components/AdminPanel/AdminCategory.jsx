import React, { useState } from "react";
import "./Admin.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  AddCats,
  DeleteCats,
  UpdateCats,
  getAllCats,
} from "../../Apis/CategoryApis.js";
import { useSelector } from "react-redux";
//Imports-------------------------

const AdminCategory = () => {
  //State For Modal--
  const [modal, setModel] = useState("modal-close");
  const [id, setid] = useState("");

  //State Form Add Category Form & Getting Token from Redux-
  const [name, setname] = useState("");
  const Token = useSelector((state) => state.app.token);
  const dataSend = { name, Token };

  //Mutation Run For Adding Category--------------
  const queryClient = useQueryClient();
  const AddCatMutation = useMutation(AddCats, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("getCategory");
    },
  });

  //Adding Category Handle Function
  const HandleAddCat = (e) => {
    e.preventDefault();
    AddCatMutation.mutate(dataSend);
  };

  //Mutation Run For Deleting Category--------------
  const DeleteMutation = useMutation(DeleteCats, {
    onSuccess: () => {
      queryClient.invalidateQueries("getCategory");
    },
  });

  //Delete Category Handle
  const HandleDeleteCat = (id) => {
    DeleteMutation.mutate({ id, Token });
  };

  //Mutation Run For Adding Category--------------
  const UpdateCatMutation = useMutation(UpdateCats, {
    onSuccess: () => {
      queryClient.invalidateQueries("getCategory");
    },
  });

  //UpDate Category Handle---
  const HandleUpdate = (e) => {
    e.preventDefault();
    UpdateCatMutation.mutate({ name, Token, id });
    if (UpdateCatMutation.isSuccess) {
      setModel("modal-close");
    }
  };

  // Query To Get All Categories
  const { data } = useQuery("getCategory", getAllCats);

  //JSx Return------------------------
  return (
    <div className="Admincat-cont">
      {/* Top Section */}
      <section className="addCategory">
        <input
          className="input-cat"
          type="text"
          placeholder="Enter Category Here"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <button type="submit" className="btn-cat" onClick={HandleAddCat}>
          Add
        </button>
      </section>

      {/* Middle Section */}
      <section className="showcategory">
        {/* Map To Get All Categories */}
        {data?.map((item, i) => {
          return (
            <div key={i} className="categorycard">
              <h4>{item.name}</h4>
              <p>{item.slug}</p>
              <div className="btn-cont">
                <button
                  className="btn-delete"
                  onClick={() => HandleDeleteCat(item.id)}
                >
                  Delete
                </button>
                <button
                  className="btn-edit"
                  onClick={() => {
                    setid(item.id);
                    setname(item.name);
                    setModel("model-cont");
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Modal Section */}
      <section className={modal}>
        <form>
          <input
            className="input-cat"
            type="text"
            placeholder="Enter Category Here"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <div className="btn-cont center">
            <button
              className="btn-cat"
              onClick={(e) => {
                e.preventDefault();
                setModel("modal-close");
              }}
            >
              Close
            </button>
            <button className="btn-cat width-btn" onClick={HandleUpdate}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AdminCategory;
