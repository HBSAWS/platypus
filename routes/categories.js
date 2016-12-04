var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    Article = mongoose.model('Article'),
    page_title = 'Categories',
    helpers = require('../config/handlebar-helpers.js').helpers;

module.exports = {

  new: function(req, res, next){
    res.render('categories/new', { 
      layout : 'main',
      helpers: {
        compare: helpers.compare,
      } 
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
      title         : req.body.title,
      slug          : slug,
      icon          : req.body.icon,
      published     : req.body.published ? true : false }, function(err, category){
      if(err) return next(err);
      res.redirect('/');
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
    Category.find({ _id: req.params.id }, function(err, category){
      if(err) return next(err);
      res.render('categories/edit', { 
        category: category[0], 
        layout : 'main',
        page_title : page_title,
        helpers: {
          compare : helpers.compare,
        }
      })
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
      title         : req.body.title,
      slug          : slug,
      icon          : req.body.icon,
      published     : req.body.published ? true : false 
    };


    Category.findOneAndUpdate({ _id: req.params.id }, update_attrs, function(err, category){
        if(err) return next(err);
        res.redirect('/');
    });
  }
};