var express = require('express');

module.exports  = function(app){

    var main        = require('../routes/main'),
        articles    = require('../routes/articles'),
        categories  = require('../routes/categories'),
        feedback    = require('../routes/feedback'),
        api         = require('../routes/api');

    var articlesRouter      = express.Router(),
        categoriesRouter    = express.Router(),
        feedbackRouter      = express.Router(),
        apiRouter           = express.Router();

    app.use('/articles',    articlesRouter);
    app.use('/categories',  categoriesRouter);    
    app.use('/feedback',    feedbackRouter);    
    app.use('/api',         apiRouter);  	

    articlesRouter.get('/',                       articles.index);
    articlesRouter.get('/new',                    articles.new);
    articlesRouter.post('/create',                articles.create);
    articlesRouter.get('/version/set/:ver',       articles.version_set);
    articlesRouter.get('/version/del/:ver'  ,     articles.version_del);
    articlesRouter.get('/version/cp/:from/:to',   articles.version_cp);
    articlesRouter.post('/destroy/:id',           articles.destroy);
    articlesRouter.get('/edit/:id',               articles.edit);
    articlesRouter.post('/update/:id',            articles.update);
    articlesRouter.get('/search/:cat_slug',       articles.search);
    articlesRouter.get('/mock/:slug/:viewport',   articles.mock);
    articlesRouter.get('/:slug',                  articles.show);
    
    categoriesRouter.get('/',                     categories.index);
    categoriesRouter.get('/new',                  categories.new);
    categoriesRouter.post('/create',              categories.create);
    categoriesRouter.get('/:slug',                categories.show);
    categoriesRouter.post('/destroy/:id',         categories.destroy);
    categoriesRouter.get('/edit/:id',             categories.edit);
    categoriesRouter.post('/update/:id',          categories.update);

    feedbackRouter.get('/',                       feedback.index);
    feedbackRouter.get('/new',                    feedback.new);    
    feedbackRouter.post('/create',                feedback.create);    

    apiRouter.get('/:resource/:num?',             api.resource);

    app.get('/',                                  main.index);
    app.get('/version/:version',                  main.set_version);
    app.get('/loadmore/:page?',                   main.loadmore);

};