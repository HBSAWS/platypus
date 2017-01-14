var mongoose = require('mongoose'),
	Category = mongoose.model('Category');
	Article = mongoose.model('Article');
	async = require('async');

module.exports = {
  index: function(req, res, next) {

  	Category.find({published: true}, function(err, categories){
      if(err) return next(err);

			async.map(categories, function(category, done) {
        Article.find({'_category': category._id}, function(err, articles) {
          if (err) done(err);

          var cat = category.toObject();
          cat.articles = articles;

          done(null, cat);         
        });
      }, function(err, result) {
        if(err) return next(err);

        
			// res.status(200).json(result);        
        res.render('home', { 
	    		categories: result,
	      	layout : 'home',
	      	helpers:  {}
	    	});
          
      });

	    
    });
   }

};