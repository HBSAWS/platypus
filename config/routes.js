var express = require('express'),
    upload = require('jquery-file-upload-middleware');

module.exports  = function(app){

    var main        = require('../controllers/main'),
        articles    = require('../controllers/articles'),
        categories  = require('../controllers/categories'),
        feedback    = require('../controllers/feedback'),
        api         = require('../controllers/api');

    var articlesRouter      = express.Router(),
        categoriesRouter    = express.Router(),
        feedbackRouter      = express.Router(),
        apiRouter           = express.Router();

    upload.configure({
        uploadDir: 'public/uploads',
        uploadUrl: '/uploads',
        acceptFileTypes: /\.(gif|jpe?g|png)$/i,
        imageTypes: /\.(gif|jpe?g|png)$/i,
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });

    // CORS
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', 'accept, authorization, content-type, x-requested-with');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        next();
    });


    app.use('/articles',    articlesRouter);
    app.use('/categories',  categoriesRouter);    
    app.use('/feedback',    feedbackRouter);    
    app.use('/api',         apiRouter);  	
    app.use('/upload',      upload.fileHandler());

    articlesRouter.get('/',                       articles.index);
    articlesRouter.get('/new',                    articles.new);
    articlesRouter.post('/create',                articles.create);
    articlesRouter.get('/version/set/:ver',       articles.version_set);
    articlesRouter.get('/version/del/:ver'  ,     articles.version_del);
    articlesRouter.get('/version/cp/:from/:to',   articles.version_cp);
    articlesRouter.post('/destroy/:id',           articles.destroy);
    articlesRouter.get('/edit/:id',               articles.edit);
    articlesRouter.post('/update/:id',            articles.update);
    articlesRouter.post('/update/:id/:field',     articles.update_field);
    articlesRouter.post('/score/:id',             articles.update_score);
    articlesRouter.get('/search/:cat_slug',       articles.search);
    articlesRouter.get('/mock/:slug/:viewport',   articles.mock);
    articlesRouter.get('/exists/:slug?',           articles.exists);  // sample for ajax validation
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
    app.get('/support',                           main.support);
    app.get('/version/:version',                  main.set_version);
    app.get('/loadmore/:page?',                   main.loadmore);

    app.use(function(err, req, res, next) {
        res.status(req.status || 500)
        res.render('error', { 
            error: process.env.NODE_ENV !== 'production' ? err : {},
            layout: 'errors'
        });
    });

};