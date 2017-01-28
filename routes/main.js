var mongoose = require('mongoose'),
	Category = mongoose.model('Category'),
	Article = mongoose.model('Article'),
	async = require('async'),
    helpers = require('../config/handlebar-helpers.js').helpers;

module.exports = {
  index: function(req, res, next) {

    console.log(req.params.page);

  	Category.findOne({slug: 'ui-components', published: true}, function(err, category){
      if(err) return next(err);

            var page = req.params.page ? req.params.page : 1; 
            var query = {_category: category._id};
            var options = {
              sort: { title: 'asc' },
              populate: '_category',
              lean: false,
              page: page,
              limit: 10
            };
            Article.paginate(query, options).then(function(articles) {
                //res.status(200).json(articles.docs);
                res.render('home', { 
                        articles: articles,
                	    layout : 'home',
                	    helpers:  {
                        grouped_each: helpers.grouped_each
                    }
                });
            });
        });
    }

};