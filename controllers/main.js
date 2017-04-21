var mongoose = require('mongoose'),
	Category = mongoose.model('Category'),
	Article = mongoose.model('Article'),
	async = require('async'),
    request = require('request'),
    moment = require('moment'),
    _ = require('lodash');

module.exports = {
    index: function(req, res, next) {

        async.waterfall([
            function(callback) {
                Article.find({
                    version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
                })
                .populate('_category')
                .exec(function(err, articles){
                    if(err) return next(err);
                    callback(null, articles);
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
            // res.status(200).send(articles);
            res.render('home', { 
                commits: _.filter(commits, item => { return moment().utc().diff(item.commit.committer.date, 'days') < 7 }),
                articles: _.filter(articles, item => { return item._category.title == 'UI Components' }),
                patterns:_.filter(articles, item => { return item._category.title == 'UX Components' }),
                layout : 'home'
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