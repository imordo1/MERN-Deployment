import React, { useEffect, useState } from "react"; // Usestate the app knows when to render the data
import axios from "axios";
import { Redirect, useHistory, useParams } from "react-router-dom";

const EditProduct = (props) => {
    const [product, setProduct] = useState("");
    const [errors, setErrors] = useState(null);
    const history = useHistory(); //using history to keep track of the routes/pages you are going to so you can go back and forth
    const { id } = useParams();
    

  /* 
  Empty arr as second argument means this will only happen on the first render
  of this component.
  */
    // Get the data using UseEffect when the page first loads
    // using axios to get the data so it is prefilled for the item/id that is selected
    useEffect(() => {
    axios
        .get(`http://localhost:8000/api/products/` + id)
        .then((res) => {
            setProduct(res.data);
    })
        .catch((err) => {
            console.log(err);
        });
    }, [id]);

    const handleOnChange = (e) => {
        const keyBeingUpdated = e.target.name;
        const newValue = e.target.value;
    
        setProduct({ ...product, [keyBeingUpdated]: newValue });
        
        // Neil showed two ways one with setting each state, and one with
        // combining into a handler since we will be passing an onject
        /* The setDest above can be written like this: */
        // const updatedDest = {...dest}
        // updatedDest[keyBeingUpdated] = newValue;
        // setDest(updatedDest)
    };
    
    const handleEditSubmit = (e) => {
        e.preventDefault(); 
        axios
            .put("http://localhost:8000/api/products/" + product._id + "/edit", product)
            .then((res) => {
                console.log(res.data);
            // Route user to the new destination's page.
                history.push(`/products/${product._id}`);
            })
            .catch((err) => {
            // THIS CATCH only triggers because our controller uses
            // res.status(400).json(err);
            setErrors(err.response.data.errors);
            console.log(err.response);
            });
        };
        if (product === null) {
            return "Loading...";
        }
        // using this for the Cancel button
        const routeChange = () =>{ 
            let path = `/products/all`; 
            history.push(path); 
          }
        return (
        <div className="d-flex col col-8 flex-column container p-3 my-3 bg-dark text-white rounded shadow justify-text-center shadow">
            <h3 className="text-center">Edit Your Product</h3>
            <form
            onSubmit={(e) => {
            handleEditSubmit(e);
            }}
        >
            <div className="form-group">
                <label className="h6">Title</label>
                {errors?.title && (
                <span className="text-danger"> {errors?.title?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="text"
                className="form-control"
                value={product.title} // "value" triggering the change from state. putting in the value into the field
                name="title"
                />
            </div>

            <div className="form-group">
                <label className="h6">Description</label>
                {errors?.description && (
                <span className="text-danger"> {errors?.description?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="text"
                className="form-control"
                value={product.description}
                name="description"
                />
            </div>

            <div className="form-group">
                <label className="h6">Price</label>
                {errors?.src && (
                <span className="text-danger"> {errors?.price?.message}</span>
                )}
                <input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                type="number"
                className="form-control"
                value={product.price}
                name="price"
                />
            </div>
            <button className="btn btn-sm btn-success m-2 btn-outline">Update</button>
            <button onClick ={routeChange} className="btn btn-sm btn-danger m-2 btn-outline">Cancel</button>
            </form>
        </div>
        );
};

export default EditProduct;