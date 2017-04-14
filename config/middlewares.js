// Navigation
require('./models/Category');
require('./models/Article');
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    Article = mongoose.model('Article'),
    _ = require('lodash');

module.exports = {
	setGlobals: function(req, res, next) {
		console.log("Settings Globals");
        res.locals.versions = ['0.1', '0.2'];
        res.locals.current = "0.1";
        res.locals.ver_selected = (req.session.ver_selected && req.session.ver_selected !== '') ? req.session.ver_selected : res.locals.current;
		return next();
	},
	getNav: function(req, res, next) {
        Category.findRecursive(function(err, tree){
            if(err) return next(err);
            res.locals.tree = tree;
        });

        Category.find({})
        .populate('_parent')
        .sort('order')
        .lean()
        .exec(function(err, categories) {
            if(err) return next(err);
            _.map(categories, function(category) {
                Article.find({
                    _category: category._id,
                    version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
                })
    			.sort('title')
                .lean()
    			.exec(function(err, a){
    				if(err) return next(err);   		
                    category.articles = a;
                    var arrResult = _.map(categories, function(obj) {
                        return _.assign(obj, _.find(res.locals.tree, {
                            _id: obj._id
                        }));
                    });
    				res.locals.nav = arrResult;
                	});
    			});
            return next();
        });
	},
	debug: function(req, res, next) {
	    console.log(req.session);
	    mongoose.set('debug', true);
        return next();
	},
	last: {}
}