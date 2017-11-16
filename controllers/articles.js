var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    Category = mongoose.model('Category'),
    page_title = 'Articles',
    _ = require('lodash');

    // mongoose.set('debug', true);

module.exports = {

    index: function(req, res, next) {
        
        Article.find({
                version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
            })
            .sort('title')
            .exec(function(err, articles) {
                res.render('articles/index', {
                    layout: '2col',
                    articles: articles,
                    page_title: 'Articles',
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
            })
        })
    },

    show: function(req, res, next) {

        Article.findOne({
                slug: req.params.slug,
                version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
            })
            .populate('_category')
            .exec(function(err, article) {
                if (err) return next(err);
                if(article){

                    var old = ( article.version !== res.locals.current ) ? true : false;

                    res.render('articles/show', {
                        article: article,
                        layout: 'main',
                        current_category: article._category.title,
                        current_article: article.slug,
                        flash: (old) ? { 
                            warning: {
                                title:"Outdated version",
                                message: `
                                    You are viewing an older version of this component's documentation.<br>
                                    <a href="/version/${res.locals.current}">View current version (${res.locals.current})</a>.
                                `
                            } 
                        } : null,
                        page_title: article._category.title,
                        loadUploaderAssets: (article.title == 'Uploader') ? true : false
                    })
                } else {
                    var notFound = new Error('Article cannot be found.');
                    notFound.status = 404;
                    return next(notFound);

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
            version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current,
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
            
            Article.find({}, function(err, articles){
                if (err) return next(err);
            
                Article.findOne({
                        _id: req.params.id
                    })
                    .populate('_category')
                    .exec(function(err, article) {
                        if (err) return next(err);
                        res.render('articles/edit', {
                            article: article,
                            categories: categories,
                            types: _.compact(_.uniq(_.map(articles, 'type'))),
                            layout: '2col',
                            page_title: page_title,
                        });
                        // res.status(200).json(_.compact(_.uniq(_.map(articles, 'type'))));
                });
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
            tested_on: req.body.tested_on,
            published: req.body.published ? true : false
        };

        Article.findOneAndUpdate({
            _id: req.params.id
        }, update_attrs, function(err, article) {
            if (err) return next(err);
            res.redirect('/articles/' + article.slug);
        });
    },


    update_field: function(req, res, next) {

        var update = {};
        update[req.params.field] = req.body.body;

        Article.findOneAndUpdate({
            _id: req.params.id
        }, {$set:update}, function(err, article) {
            if (err) return next(err);
            res.send(article[req.params.field]);
        });
    },

    update_score: function(req,res,next) {

        console.log(req.body.val);

        Article.findOneAndUpdate({
            _id: req.params.id
        }, {$inc: {score: req.body.val} }, {new : true}, function(err, article) {
            if (err) return next(err);
            console.log(article);
            res.status(200).json(article);
        });
    },

    search: function(req, res, next) {
        Category.findOne({
            'slug': req.params.cat_slug
        }, function(err, category) {
            if (err) return next(err);

            console.log(category);

            Article.find({
                    '_category': category._id,
                    version: (res.locals.ver_selected !== res.locals.current ) ? res.locals.ver_selected : res.locals.current
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

    exists: function(req, res, next) {
        var coin = _.sample([true, false]);
        if(coin) {
            res.status(200).send({}) 
        } else {
            res.status(404).send({});
        }
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
                })
            });
    },

    version_set: function(req, res, next) {

        Article.update({}, { version: req.params.ver }, { multi: true }, function (err, raw) {
            if (err) return next(err);
            console.log(raw);
            res.redirect('/articles');
        });
    },

    version_del: function(req, res, next) {
        Article.remove({version: req.params.ver}, function(err) {
            if (err) return next(err);
            res.redirect('/articles');
        });
    },
    
    version_cp: function(req, res, next) {
        Article.find({"version":req.params.from}).exec(
            function(err, doc) {
                doc.forEach(function(x,i){
                    var y = x.toObject();
                    y._id = mongoose.Types.ObjectId();
                    y.version = req.params.to;
                    Article.create(y, function(err, z){
                        if(err) return next(err);
                        console.log("saving z:" + z.title + " | z.slug:" + z.slug);
                    });

                });
            res.redirect('/articles');
        })
    },

};