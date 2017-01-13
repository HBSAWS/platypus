var express = require('express');

module.exports = function(app){

  var main      = require('../routes/main'),
  	articles    = require('../routes/articles'),
    categories  = require('../routes/categories');

	var articlesRouter    = express.Router(),
  	categoriesRouter  = express.Router();

  app.use('/articles',      articlesRouter);
  app.use('/categories',    categoriesRouter);  	

  articlesRouter.get('/',                 articles.index);
  articlesRouter.get('/new',              articles.new);
  articlesRouter.post('/create',          articles.create);
  articlesRouter.get('/:slug',            articles.show);
  articlesRouter.post('/destroy/:id',     articles.destroy);
  articlesRouter.get('/edit/:id',         articles.edit);
  articlesRouter.post('/update/:id',      articles.update);

  categoriesRouter.get('/',               categories.index);
  categoriesRouter.get('/new',            categories.new);
  categoriesRouter.post('/create',        categories.create);
  categoriesRouter.get('/:slug',          categories.show);
  categoriesRouter.post('/destroy/:id',   categories.destroy);
  categoriesRouter.get('/edit/:id',       categories.edit);
  categoriesRouter.post('/update/:id',    categories.update);

  app.get('/', main.index);

};