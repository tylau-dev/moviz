var express = require('express');
var router = express.Router();
var request = require('sync-request')
var movies = require('../models/movies')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function(req, res, next) {
  var newMovies = request('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=8c86efdf29b57f83aa95985533390f1b&language=fr-FR&region=FR&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=2020-01-01')
  var newMoviesJSON = JSON.parse(newMovies.body)
  console.log(newMoviesJSON.results)
  res.json({movies: newMoviesJSON.results})
})

router.post('/wishlist-movie/:moviename/', async function(req, res, next) {
  var queryMovies = request('GET', `https://api.themoviedb.org/3/search/movie?api_key=8c86efdf29b57f83aa95985533390f1b&language=fr-FR&query=${req.params.moviename}`)
  var queryMoviesJSON = JSON.parse(queryMovies.getBody())

  var newMovie = movies.movieModel({
    movieName: queryMoviesJSON.results[0].original_title,
    movieDes: queryMoviesJSON.results[0].overview,
    movieImg: queryMoviesJSON.results[0].poster_path,
    globalRating: queryMoviesJSON.results[0].vote_average,
    globalCountRating: queryMoviesJSON.results[0].vote_count   
  })
  var saveMovie = await newMovie.save()

  res.json({result:true})
})

router.delete('/delete-movie/:name/', async function(req, res, next) {
  var formatName = req.params.name.slice(0,1).toUpperCase()+req.params.name.slice(1)

  var deleteMovie = await movies.movieModel.deleteOne({movieName: formatName})
  var result = false

  console.log(deleteMovie.deletedCount)
  if (deleteMovie.deletedCount === 1) {
    result = true
  }

  res.json({result})
})

router.get('/wishlist-movie', async function(req, res, next) {
  var wishlistMovie = await movies.movieModel.find()
  res.json({wishlistMovie})
})


module.exports = router;
