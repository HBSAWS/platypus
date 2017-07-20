// Navigation
require('../models/Category');
require('../models/Article');
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    Article = mongoose.model('Article'),
    _ = require('lodash');

module.exports = {
	getVersion: function(req, res, next) {
		console.log("Determining article version to show");
        res.locals.versions = ['0.1', '0.2', '0.3'];
        res.locals.current = "0.3";
        res.locals.ver_selected = (req.session.ver_selected && req.session.ver_selected !== '') ? req.session.ver_selected : res.locals.current;
        res.locals.browsers = [
            "Chrome", "Internet Explorer", "Firefox", "Opera", "Safari",
            "Safari Mobile", "Android Mobile", "Windows Mobile"
        ]
		return next();
	},
	getNav: function(req, res, next) {
        // Category.findRecursive(function(err, tree){
        //     if(err) return next(err);
        
            Category.find({})
            .populate('_parent')
            .sort('order')
            .lean()
            .exec(function(err, categories) {
                if(err) return next(err);
                _.map(categories, function(category, i) {

                    Article.find({
                        _category: category._id,
                        version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
                    })
                    .sort('title')
                    .lean()
                    .exec(function(err, a){
                        if(err) return next(err);           
                        category.articles = a;
                        // var arrResult = _.map(categories, function(obj) {
                        //     return _.assign(obj, _.find(tree, {
                        //         _id: obj._id
                        //     }));
                        // });
                        // // done?
                        if(categories.length === i+1) {
                            res.locals.nav = categories;
                            return next();
                        }
                    });
                 });
            // });

        });
	},
	debug: function(req, res, next) {
	    console.log(req.session);
	    mongoose.set('debug', true);
        return next();
	},
	last: {}
}