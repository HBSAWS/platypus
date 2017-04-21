var mongoose = require('mongoose'),
Feedback = mongoose.model('Feedback'),
page_title = 'Feedback',
async = require('async'),
helpers = require('../config/handlebar-helpers.js').helpers;

module.exports = {

    index: function(req, res, next) {
        Feedback.find({})
        .exec(function(err, feedback) {
            if(err) return next(err);
            res.render('feedback/index', { 
                layout : '2col',
                feedback: feedback,
                page_title: page_title,
                helpers: {
                  compare: helpers.compare,
                } 
            });
        });
    },

    new: function(req, res, next){

        Feedback.find({}, function(err, feedback){
              if(err) return next(err);

              res.render('feedback/new', { 
                parents : feedback,
                layout : '',
                helpers: {
                  compare: helpers.compare,
              } 
          });
      });
    },

    create: function(req, res, next){
        Feedback.create({ 
            appTitle      : req.header('Referer') || 'Unknown',
            scope         : req.body.scope,
            subject       : req.body.subject,
            email         : req.body.email,
            comment       : req.body.comment,
            satisfaction  : req.body.satisfaction 
        }, function(err, feedback){
            if(err) return next(err);
            res.redirect(req.header('Referer') || '/');
        });
    },


};