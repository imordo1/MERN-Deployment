import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import axios from "axios";

const NewProduct = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");;
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]); 
    // Error fields
    const [titleErrors, setTitleErrors] = useState("");
    const [priceErrors, setPriceErrors] = useState("");
    const [descriptionErrors, setDescriptionErrors] = useState("");
  // Used for routing the user to a new url.
    const history = useHistory();

  const handleNewProductSubmit = (e) => {
    e.preventDefault(); // Stop the page refresh.// The default form behavior is submitting the information to the route in the "action" which causes a page load. We want to handle this information ourselves.
        const { name: key , value} = e.target;
    
        if (key === 'title') {
            setTitle(value);
            if(value.length < 2) {
                setTitleErrors("Title must be at least 2 characters");
            } else {
                setTitleErrors("");
            }
        } else if (key === 'price') {
            setPrice(value);
            if(value.length < 2) {
                setPriceErrors("Price must be at least 2 characters");
            } else {
                setPriceErrors("");
            }
        } else if (key === 'description') {
            setDescription(value);
            if(value.length < 5) {
                setDescriptionErrors("Description name must be at least 5 characters");
            } else {
                setDescriptionErrors("");
            }
        }
    const newProduct = {
      title,
      price,
      description,
    };

    axios
      .post("http://localhost:8000/api/products/", newProduct)
      .then((res) => {
        console.log(res.data);
        // Route user to the new destination's page.
        history.push(`/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
      });
  };

  return (
    <div className=" d-flex col col-8 flex-column container p-3 my-3 bg-dark text-white rounded shadow">
      <h3 className="text-center">Add a New Product</h3>

      <form
        onSubmit={(e) => {
          handleNewProductSubmit(e);
        }}
      >
        {/* // adding validation messages */}
        {errors.map((err, index) => 
          <p style={{color: "red"}} key={index}>{err}</p>)}

        <div className="form-group">
          <label className="h6">Title</label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="form-control"
          />
          
          { titleErrors ? <p >{titleErrors}</p> : ""} 
        </div>

        <div className="form-group">
          <label className="h6">Price</label>
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="h6">Description</label>
          <input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-sm btn-success m-2 btn-outline">Create</button>
      </form>
      {/* <div className="d-flex col flex-column container p-3 my-3 bg-dark text-white">
                <p>Title: {title}</p>
                <p>Price: {price}</p>
                <p>Description: {description}</p>
            </div> */}
    </div>
    
  );
};

export default NewProduct;