var mongoose = require('mongoose'),
  Article = mongoose.model('Article');
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
		layout : 'main',
		articles: articles,
		page_title: 'Test',
		helpers: {
		  compare: helpers.compare,
		} 
	      });
	    });
  },

  new: function(req, res, next){  
    // Load associated categories to populate dropdown field.
    Category.find({}, function(err, categories){
      if(err) return next(err);
      res.render('articles/new', { 
        categories: categories, 
        layout : 'main' ,
        page_title : 'New content',
        helpers: {
          compare: helpers.compare,
        }
      })
    })
  },

  show: function(req, res, next){
    Article.findOne({ slug: req.params.slug })
    .populate('_category')
    .exec(function(err, article){

      res.render('articles/show', { 
        article: article, 
        layout : 'main',
        page_title : article._category.title,
        helpers: {
          compare: helpers.compare,
          dateFormat: helpers.dateFormat
        }
      })
    });
  },

  create: function(req, res, next){

    var slug = req.body.title.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');      

    Article.create({ 
      _category       : req.body._category,
      title           : req.body.title,
      slug            : slug,
      type            : req.body.type,
      intro           : req.body.intro,
      body            : req.body.body,
      markup          : req.body.markup,
      js              : req.body.js,
      fiddle          : req.body.fiddle,
      published       : req.body.published ? true : false }, function(err, article){
        if(err) {
          return next(err);
        } else {
      
        Article.find(article)
          .populate('_category')
          .exec(function(err, article) {
            if(err) res.render('error', { flash: { error: 'Error populating category id into article :('}})
            res.redirect('/articles');
          });
        }
    
    });
  },

  destroy: function(req, res, next){
    var id = req.params.id;
    Article.findByIdAndRemove(id, function(err, article){
      if(err) return next(err);
      res.redirect('/');
    });
  },

  edit: function(req, res, next){
    Category.find({}, function(err, categories){
      if(err) return next(err);
      Article.findOne({ _id: req.params.id })
      .populate('_category')
      .exec(function(err, article){
        res.render('articles/edit', { 
          article: article, 
          categories: categories,
          layout : '2col',
          page_title : page_title,
          helpers: {
            compare: helpers.compare
          } 
        })
      });
    });
  },

  update: function(req, res, next){

    var slug = req.body.title.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');   

    var update_attrs = {
        _category       : req.body._category,
        title           : req.body.title,
        slug            : slug,
        type            : req.body.type,
        intro           : req.body.intro,
        body            : req.body.body,
        markup          : req.body.markup,
        js              : req.body.js,      
        fiddle          : req.body.fiddle,
        published       : req.body.published ? true : false 
    };

    // cover attachment present?
    if(req.file) {
      update_attrs.cover = req.file.fieldname + '-' + req.file.originalname
    }

    Article.findOneAndUpdate({ _id: req.params.id }, update_attrs, function(err, article){
        if(err) return next(err);
        res.redirect('/articles/'+article.slug);
    });
  },

  search: function(req, res, next){
    Category.findOne({'slug': req.params.cat_slug}, function(err, category){
      if(err) return next(err);

      console.log(category);
    
      Article.find({'_category': category._id})
      .populate('_category')
      .lean()
      .exec(function(err, articles) {

        console.log(articles);

        if(err) return next(err);
        res.status(200).json(articles);   
      });

    })
  },

  mock: function(req, res, next){
    Article.findOne({ slug: req.params.slug })
    .populate('_category')
    .exec(function(err, article){

      res.render('articles/mock', { 
        article: article, 
        viewport: req.params.viewport,
        layout : 'mock',
        helpers: {
          compare: helpers.compare,
          dateFormat: helpers.dateFormat
        }
      })
    });
  },  

};
