const mongoose = require('mongoose');
// For a module to access another module's exports or module.exports, it must use require().

const ProductSchema = new mongoose.Schema({
    // Adding validations to our back-end MondoDB in our mongoose model
    title: {
        type : String,
        required: [true, "Title is required"],
        minlength: [10, "Title must be at least 10 characters long"]
    },
    price: {
        type : Number,
        required: [true, "Price is required"],
        minlength: [3, "Price must be at least 3 characters long"]
    },
    description: {
        type : String,
        required: [true, "Description is required"],
        minlength: [3, "Description must be at least 3 characters long"]   
    },

    like : {
        type: Number
    }
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
// expose the Product schema to other parts of the app