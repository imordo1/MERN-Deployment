import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";


const Product = (props) => {
    const [product, setProduct] = useState(null);
    const history = useHistory();
    const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  // The response hasn't come back yet so we want to to return loading... so the user made aware
  if (product === null) {
    return "Loading...";
  }

  const deleteProduct = (e, productId) => {
    axios.delete("http://localhost:8000/api/products/" + productId)
    .then((res) => {
        console.log(res.data);
        history.push(`/all`);
        // setAllProducts(allProducts.filter((product) => product._id !== productId)); 
        // uses setallproducts to access state and filter through our product array and only return where the ID which we just passed to be deleted not in the list
    }
    )
}


    return (
    <div className="d-flex col col-12 flex-column container p-3 my-3 bg-dark text-white rounded shadow justify-text-center">
      <h1>{product.title}</h1>
      <h4 className= "fst-italic">{product.description}</h4>
      <br></br>
      <h2>$ {product.price}</h2>
      <img src="" alt=""></img>
          <div className="d-flex">
          <button onClick= { (e) => deleteProduct(e, product._id)} className="col col-1 btn btn-sm btn-danger m-2 btn-outline">Delete</button>
          <Link to={`/products/${product._id}/edit`} className="col col-1 btn btn-sm btn-warning m-2 btn-outline">Edit</Link>
        </div >

    </div>
  );
};

export default Product;