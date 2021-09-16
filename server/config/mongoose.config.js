const mongoose = require("mongoose");
 
// Export a function to be called in server.js
module.exports = (db_name) => {
    mongoose.connect(`mongodb://localhost/${db_name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Successfully connected to Database: ${db_name}`);
    })
    .catch((err) => {
        console.log(`mongoose connection to Database: ${db_name}, failed:`, err);
    });
};
