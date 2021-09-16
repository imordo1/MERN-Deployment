const ProductController = require('../controllers/product.controller'); 
// For a module to access another module's exports or module.exports, it must use require().
 
module.exports = (app) => {
    //----Routes for a products CRUD operations --------    
    app.post("/api/products/", ProductController.create);
    app.get("/api/products/all", ProductController.getAll);
    app.get("/api/products/:id", ProductController.getOne);
    app.delete("/api/products/:id", ProductController.delete);
    app.get("/api/products/:id", ProductController.getOne);
    app.put("/api/products/:id/edit", ProductController.update);
    app.put("/api/products/:id", ProductController.update);
    // app.put('/all', ProductController.create);
};
