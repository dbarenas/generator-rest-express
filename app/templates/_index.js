
/*
 * GET home page.
 */

var index = function(req, res){
  res.render('index', { title: 'Express' });
};

module.exports = exports = function(app) {

	// Homepage
	app.get('/', index);

	// begin resources

	// end resources
}