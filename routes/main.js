var mongoose = require('mongoose'),
	Category = mongoose.model('Category'),
	Article = mongoose.model('Article'),
	async = require('async'),
    helpers = require('../config/handlebar-helpers.js').helpers;

module.exports = {
    index: function(req, res, next) {

      	Category.findOne({slug: 'ui-components', published: true}, function(err, category){
            if(err) return next(err);

            // Article.find({_category: category._id})
            // .sort('title')
            // .limit(8)
            // .exec(function(err, articles) {
            //     if(err) return next(err);
            //     res.render('home', { 
            //             articles: articles,
            //     	    layout : 'home',
            //     	    helpers:  {
            //             grouped_each: helpers.grouped_each
            //         }
            //     });
            // });

            var query = {_category: category._id};
                var options = {
                  sort: { title: 'asc' },
                  populate: '_category',
                  lean: false,
                  page: 1,
                  limit: 8
                };
                Article.paginate(query, options).then(function(articles) {
                    res.render('home', { 
                    articles: articles,
                    layout : 'home',
                    helpers:  {
                        grouped_each: helpers.grouped_each
                    }
                });
            });

        });
    },

    loadmore: function(req, res, next) {

        Category.findOne({slug: 'ui-components', published: true}, function(err, category){
          if(err) return next(err);

                console.log(req.params.page)

                var query = {_category: category._id};
                var options = {
                  sort: { title: 'asc' },
                  populate: '_category',
                  lean: false,
                  page: req.params.page,
                  limit: 8
                };
                Article.paginate(query, options).then(function(articles) {
                    res.status(200).json(articles);
                });
            });
    }


};