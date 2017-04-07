var mongoose = require('mongoose'),
	Category = mongoose.model('Category'),
	Article = mongoose.model('Article'),
	async = require('async'),
    request = require('request'),
    moment = require('moment'),
    _ = require('lodash'),
    helpers = require('../config/handlebar-helpers.js').helpers;
    // helpers = require('handlebars-helpers')();

module.exports = {
    index: function(req, res, next) {

        async.waterfall([
            function(callback) {
                Category.find({
                    $or: [{'slug' : 'ux-components'}, {'slug': 'ui-components'}], 
                    published: true
                }, function(err, categories){
                    if(err) return next(err);
                    if(categories) {
                        callback(null, categories);
                    } else {
                        res.send("Database is empty. Run 'sudo npm run postinstall' to import db dump.");
                    }
                });

            },
            function(categories, callback) {
                
                console.log("Getting Articles");

                var arr_articles = [];

                _.each(categories, function(cat){
                    console.log("Querying "+cat.title);
                    Article.find({
                        _category: cat._id,
                        version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
                    })
                    .populate('_category')
                    .exec(function(err, articles){

                        console.log("Found " + articles.length + ' articles');

                        if(err) return next(err);
                        arr_articles.push(articles);


                        if (arr_articles.length == categories.length) {
                            console.log("Article's array length: "+arr_articles.length);
                            console.log("Categories's array length: "+categories.length);
                            console.log("Calling callback");
                            callback(null, arr_articles);
                        }
                    });

                });
               
            },
            function(articles, callback) {

                var commits = [];

                request({
                    url: 'https://api.github.com/repos/HBSAWS/platypus/commits',
                    method: 'GET',
                    headers: {
                        'User-Agent': 'request'
                    }
                }, function(err, response, body) {
                    if(err) console.log(err);
                    commits = JSON.parse(body);
                    callback(null, commits, articles);
                });
              
            }
        ], function(error, commits, articles) {
            
            res.render('home', { 
                commits: _.filter(commits, item => { return moment().utc().diff(item.commit.committer.date, 'days') < 7 }),
                articles: articles[0],
                patterns: articles[1],
                layout : 'home',
                helpers:  {
                    compare: helpers.compare,
                    grouped_each: helpers.grouped_each,
                    moduloIf: helpers.moduloIf
                }
            });

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


            var query = {
                _category: category._id, 
                version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
            };
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