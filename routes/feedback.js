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
                layout : 'main',
                feedback: feedback,
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