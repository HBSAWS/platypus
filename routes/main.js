var mongoose = require('mongoose'),
	Category = mongoose.model('Category'),
	Article = mongoose.model('Article'),
	async = require('async'),
    helpers = require('../config/handlebar-helpers.js').helpers;
    // helpers = require('handlebars-helpers')();

module.exports = {
    index: function(req, res, next) {

      	Category.findOne({slug: 'ui-components', published: true}, function(err, category){
            if(err) return next(err);

            if(category) {

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
                        compare: helpers.compare,
                        grouped_each: helpers.grouped_each
                    }
                    });
                });
            } else {
                res.send("Database is empty. Run 'sudo npm run postinstall' to import db dump.");
            }
        });
    },

    set_version: function(req, res, next) {
        delete req.session.ver_selected;
        req.session.ver_selected = req.params.version;
        req.session.save(function(err){
            if (!err) 
            res.redirect(req.header('Referer') || '/');
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