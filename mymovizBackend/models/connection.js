var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }

mongoose.connect('mongodb+srv://MDP:lacapsule@lacapsule.xqzrl.mongodb.net/mymoviz?retryWrites=true&w=majority',
   options,
   function(err) {
       console.log(err);
   }
);