var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    Category = mongoose.model('Category'),
    page_title = 'Articles',
    _ = require('lodash'),
    helpers = require('../config/handlebar-helpers.js').helpers;

module.exports = {

    index: function(req, res, next) {
        Article.find({})
            .sort('title')
            .exec(function(err, articles) {
                res.render('articles/index', {
                    layout: '2col',
                    articles: articles,
                    page_title: 'Manage Articles',
                    helpers: {
                        compare: helpers.compare,
                    }
                });
            });
    },

    new: function(req, res, next) {
        // Load all categories to populate dropdown field.
        Category.find({}, function(err, categories) {
            if (err) return next(err);
            res.render('articles/new', {
                categories: categories,
                layout: '2col',
                page_title: 'New content',
                helpers: {
                    compare: helpers.compare,
                }
            })
        })
    },

    show: function(req, res, next) {

        Article.findOne({
                slug: req.params.slug,
                version: (req.params.version && req.params.version != '') ? req.params.version : res.locals.current
            })
            .populate('_category')
            .exec(function(err, article) {

                if(article){
                    res.render('articles/show', {
                        article: article,
                        layout: 'main',
                        page_title: article._category.title,
                        helpers: {
                            compare: helpers.compare,
                            dateFormat: helpers.dateFormat
                        }
                    })
                } else {
                    res.send("Version or article not found.");
                }
                
            });
    },

    create: function(req, res, next) {

        console.log(req.body._category);

        var slug = req.body.title.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '');

        Article.create({
            _category: req.body._category,
            status: req.body.status,
            title: req.body.title,
            slug: slug,
            type: req.body.type,
            intro: req.body.intro,
            body: req.body.body,
            markup: req.body.markup,
            best_practices: req.body.best_practices,
            avoid: req.body.avoid,
            resources: req.body.resources,
            js: req.body.js,
            fiddle: req.body.fiddle,
            published: req.body.published ? true : false
        }, function(err, article) {
            if(err) return next(err);
            res.redirect('/articles/'+article.slug);
        });
    },

    destroy: function(req, res, next) {
        var id = req.params.id;
        Article.findByIdAndRemove(id, function(err, article) {
            if (err) return next(err);
            res.redirect('/');
        });
    },

    edit: function(req, res, next) {
        Category.find({}, function(err, categories) {
            if (err) return next(err);
            Article.findOne({
                    _id: req.params.id
                })
                .populate('_category')
                .exec(function(err, article) {
                    res.render('articles/edit', {
                        article: article,
                        categories: categories,
                        layout: '2col',
                        page_title: page_title,
                        helpers: {
                            compare: helpers.compare
                        }
                    })
                });
        });
    },

    update: function(req, res, next) {

        var slug = req.body.title.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '');

        var update_attrs = {
            _category: req.body._category,
            status: req.body.status,
            title: req.body.title,
            slug: slug,
            type: req.body.type,
            intro: req.body.intro,
            body: req.body.body,
            markup: req.body.markup,
            best_practices: req.body.best_practices,
            avoid: req.body.avoid,
            resources: req.body.resources,            
            js: req.body.js,
            fiddle: req.body.fiddle,
            published: req.body.published ? true : false
        };

        // cover attachment present?
        if (req.file) {
            update_attrs.cover = req.file.fieldname + '-' + req.file.originalname
        }

        Article.findOneAndUpdate({
            _id: req.params.id
        }, update_attrs, function(err, article) {
            if (err) return next(err);
            res.redirect('/articles/' + article.slug);
        });
    },

    search: function(req, res, next) {
        Category.findOne({
            'slug': req.params.cat_slug
        }, function(err, category) {
            if (err) return next(err);

            console.log(category);

            Article.find({
                    '_category': category._id
                })
                .populate('_category')
                .lean()
                .exec(function(err, articles) {

                    console.log(articles);

                    if (err) return next(err);
                    res.status(200).json(articles);
                });

        })
    },

    mock: function(req, res, next) {
        Article.findOne({
                slug: req.params.slug
            })
            .populate('_category')
            .exec(function(err, article) {

                res.render('articles/mock', {
                    article: article,
                    viewport: req.params.viewport,
                    layout: 'mock',
                    helpers: {
                        compare: helpers.compare,
                        dateFormat: helpers.dateFormat
                    }
                })
            });
    },

    version: function(req, res, next) {

        // set initial version
        // Article.update({}, { version: '0.1' }, { multi: true }, function (err, raw) {
        //     if (err) return next(err);
        //     console.log(raw);
        //     res.redirect('/articles');
        // });
        
        Article.find({'version': req.params.from})
        .exec(function(err, doc){
            // console.log(doc);
            doc.forEach(function(y){
                Article.create(y, function(err, article){
                    console.log("creating copy");
                });
            });
            res.redirect('/articles');
        });
    },

};