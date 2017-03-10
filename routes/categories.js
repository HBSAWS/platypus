var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    page_title = 'Categories',
    async = require('async'),
    helpers = require('../config/handlebar-helpers.js').helpers;

module.exports = {

  index: function(req, res, next) {
    Category.find({}, function(err, categories) {
      if(err) return next(err);
      res.render('categories/index', { 
        layout : 'main',
        categories: categories,
        helpers: {
          compare: helpers.compare,
        } 
      });
    });
  },

    new: function(req, res, next){

        // Find all categories to populate _parent
        Category.find({}, function(err, categories){
            if(err) return next(err);

            res.render('categories/new', { 
                parents : categories,
                layout : 'main',
                helpers: {
                    compare: helpers.compare,
                } 
            });
        });
    },

  create: function(req, res, next){
  
    var slug = req.body.title.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');  

    Category.create({ 
      _parent       : (req.body._parent == '') ? null : req.body._parent,
      title         : req.body.title,
      slug          : slug,
      icon          : req.body.icon,
      published     : req.body.published ? true : false }, function(err, category){
      if(err) return next(err);
      res.redirect(req.header('Referer') || '/');
    });
  },

  show: function(req, res, next){

      Category.find({ slug: req.params.slug })
            .lean()
            .exec(function(err, category) {
              if(err) return next(err);

                async.map(category, function(cat, done) {
                    Article.find({_category: cat._id})
                    .lean()
                    .exec(function(err, a){
                        if(err) return next(err);
                        cat.articles = a;
                        done(null, category);  
              });
            }, function(err, result) {
                if(err) return next(err);
                //res.status(200).json(result);  

                res.render('categories/show', { 
                    category: result[0], 
                    section_title : 'Categories',
                    layout : '2col',
                    page_title : category.title,
                    helpers: {
                        compare: helpers.compare,
                        dateFormat: helpers.dateFormat
                }
            })

        });

    });
  },

  destroy: function(req, res, next){
    var id = req.params.id;
    Category.findByIdAndRemove(id, function(err, category){
      if(err) return next(err);
      res.redirect('/');
    });
  },

  edit: function(req, res, next){
    
    // Find all categories to populate _parent
    Category.find({}, function(e, categories){
        if(e) return next(e);
    
        Category.find({ _id: req.params.id }, function(err, category){
            if(err) return next(err);
                res.render('categories/edit', { 
                parents: categories, 
                category: category[0], 
                layout : 'main',
                page_title : page_title,
                helpers: {
                    compare : helpers.compare,
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
      _parent       : (req.body._parent == '') ? null : req.body._parent,
      title         : req.body.title,
      slug          : slug,
      icon          : req.body.icon,
      published     : req.body.published ? true : false 
    };


    Category.findOneAndUpdate({ _id: req.params.id }, update_attrs, function(err, category){
        if(err) return next(err);
        res.redirect('/categories');
    });
  }
};