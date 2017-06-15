// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// new Schema   
var LooksSchema = new Schema({
    title: String,
    link: String
});

// use the abvoe schema to make the ScrapedData model
var Looks = mongoose.model('Looks', LooksSchema);

// export the model so the server can use it
module.exports = Looks;