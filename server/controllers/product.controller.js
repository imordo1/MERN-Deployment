const Product = require("../models/product.model")
// For a module to access another module's exports or module.exports, it must use require().
// Export an object that is full of methods.
module.exports = {
  // long-form syntax - key: value
  create: function (req, res) {
    console.log("create method executed");

    // req.body is the form data or data sent in from postman / js requests.
    Product.create(req.body)
      .then((product) => { 
        // newly created dest from DB with auto generated id and createdAt.
        res.json(product);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

// --------------- Get ALL Products ---------------------
  // Shorthand method in object syntax.
  getAll(req, res) {
    console.log("getAll method executed");
    Product.find().sort( { title: 1 }) // find( ).sort( { name: -1 } 
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // --------------- Get ONE Product ---------------------
  getOne(req, res) {
    console.log("getOne method executed", "url params:", req.params);

    Product.findById(req.params.id)
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // --------------- DELETE ONE Product ---------------------
  delete(req, res) {
    console.log("delete method executed", "url params:", req.params);

    Product.findByIdAndDelete(req.params.id)
        .then((products) => {res.json(products);})
        .then(result => res.json("Deleted!"))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
  },

    // --------------- UPDATE A single Product ---------------------
  update(req, res) {
    console.log("update method executed", "url params:", req.params);

    Product.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true, // Run model validations again.
      new: true, // return newly updated document.
    })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // NOT ON EXAM.
  createMany(req, res) {
    const promises = req.body.map((dest) => {
      return Product.create(dest);
    });

    Promise.allSettled(promises).then((results) => {
      res.json(results);
    });
  },
};