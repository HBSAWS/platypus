var mongoose = require('mongoose'),
	Category = mongoose.model('Category'),
	Article = mongoose.model('Article'),
	async = require('async'),
    helpers = require('../config/handlebar-helpers.js').helpers;

module.exports = {
  index: function(req, res, next) {

  	Category.find({slug: 'ui-components', published: true}, function(err, categories){
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
	      	    helpers:  {
                    grouped_each: helpers.grouped_each
                }
	    	});
          
            });
        });
    }

};