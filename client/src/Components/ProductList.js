import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';


const ProductList = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    // const [product, setProduct] = useState([]);
    // const [products, setProducts] = useState([]);
    // const history = useHistory();
    useEffect(() => {
        axios.get("http://localhost:8000/api/products/all")
            .then((res) => {
                console.log(res.data);
                setAllProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Delete function in controller takes an ID and returns deleted
    // Pass in the ID and and refresh the page with the deleted item filtered out
    // We need to remove a value from state using filter
    const deleteProduct = (e, productId) => {
        axios.delete("http://localhost:8000/api/products/" + productId)
            .then((res) => {
                console.log(res.data);
                setAllProducts(allProducts.filter((product) => product._id !== productId));
                // uses setallproducts to access state and filter through our product array and only return where the ID which we just passed to be deleted not in the list
            }
            )
    }
    // const routeChange = () =>{ 
    //     let path = `/${product._id}/edit`; 
    //     history.push(path);
    //   }
    const handleLikeClick = (id, likes) => {
        console.log(id, likes,"hello");
        if (likes == undefined) {
            likes = 0;
        }
        const editedProduct = { like: likes + 1 };
        
            axios
            .put("http://localhost:8000/api/products/" + id, editedProduct)
            .then((res) => {
                const updatedProduct = res.data;

                const updatedProducts = allProducts.map((product) => {
                    if (product._id === id) {
                    return updatedProduct;
                } 
                return product;
           })
                setAllProducts(updatedProducts);
                console.log("liked");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <body>
            <div className="d-flex col col-12 flex-column container p-3 my-3 bg-dark text-white rounded shadow shadow-lg table table-striped">
                <table>
                    <thead>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {/* take the products from state and map to each of the products */}
                        {
                            allProducts.map((product, index) => (
                                <tr>
                                    <td><Link to={`/products/${product._id}`}> {product.title} </Link></td>
                                    <td> {product.price}</td>
                                    <td> {product.description}</td>
                                    <td>
                                        <Link to={`/products/${product._id}/edit`} className="btn btn-sm btn-warning m-2 btn-outline">Edit</Link>
                                        <button onClick={(e) => deleteProduct(e, product._id)} className="btn btn-sm btn-danger m-2 btn-outline">Delete</button>
                                        <p onClick = {() => handleLikeClick(product._id, product.like)} style={{ cursor: "pointer" , outline: "none"}}> &#128175;{product.LikeCount}</p>
                                        {/* //&#x270B; */}
                                    </td>
                                    <td> {product.like} </td>
                                </tr>
                            )
                            )

                        }
                    </tbody>
                </table>
            </div>
        </body>
    )
};

export default ProductList;