var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    movieName: String,
    movieDes: String,
    movieImg: String,
    globalRating: Number,
    globalCountRating: Number   
})

var movieModel = mongoose.model('moviz', movieSchema)

module.exports = {movieModel}