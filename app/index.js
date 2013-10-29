'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var ExpressRestGenerator = module.exports = function ExpressRestGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ExpressRestGenerator, yeoman.generators.Base);

ExpressRestGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'ip',
    message: 'IP address where MongoDB is running?',
    default: '127.0.0.1'
  },
	{
    name: 'db',
    message: 'Database name?',
    default: 'myApp'
	}];

  this.prompt(prompts, function (props) {
    this.ip = props.ip;
		this.db = props.db;

    cb();
  }.bind(this));
};

ExpressRestGenerator.prototype.app = function app() {
    // From the Express generator
	this.mkdir('public');
	this.mkdir('public/images');
	this.mkdir('public/javascripts');
	this.mkdir('public/stylesheets');
	this.mkdir('routes');
	this.mkdir('views');
	
	this.copy('_package.json', 'package.json');
	this.copy('_app.js', 'app.js');
	this.copy('_style.css', 'public/stylesheets/style.css');
	this.copy('_index.js', 'routes/index.js');
	this.copy('_index.jade', 'views/index.jade')
	this.copy('_layout.jade', 'views/layout.jade');
	
	// Adding these
	this.mkdir('lib')
	this.mkdir('resources');

  	this.copy('_db.js', 'lib/db.js');
	this.copy('_log.js', 'lib/log.js');
};

ExpressRestGenerator.prototype.projectfiles = function projectfiles() {
  
};

