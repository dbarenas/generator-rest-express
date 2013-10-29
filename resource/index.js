'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var angularUtils = require('../angularUtil.js');

var ResourceGenerator = module.exports = function ResourceGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
	
	this.name = this.name.toLowerCase();
	this.nameCapitalized = this.name[0].toUpperCase() + this.name.slice(1)
};

util.inherits(ResourceGenerator, yeoman.generators.NamedBase);

ResourceGenerator.prototype.files = function files() {
	this.copy('_resource.js', 'resources/' + this.name + ".js");
	this.addModelToDb(this.nameCapitalized);
};

ResourceGenerator.prototype.addModelToDb = function (model) {
  try {
	// Capitalize the model name
	var modelName = model[0].toUpperCase() + model.toLowerCase().slice(1);
	
	var fullPath = 'lib/db.js';
    angularUtils.rewriteFile({
      file: fullPath,
      needle: '// end models',
      splicable: [
        'var ' + modelName + 'Model = mongoose.model("' + modelName + '", new mongoose.Schema({}, {strict: false}));'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. model'.yellow + model + 'not added.\n'.yellow);
  }
};

ResourceGenerator.prototype.addResourceToApp = function (resource) {
  try {
	// ensure the resource name is lowercase and plural
	var resourceName = resource.toLowerCase();
	var resourcePlural = resourceName + "s";
	
	var fullPath = 'app.js';
    angularUtils.rewriteFile({
      file: fullPath,
      needle: '// end resources',
      splicable: [
	  	"// -- " + resourceName + " --",
        "var " + resourceName + " = require('./resources/" + resourceName + ".js');\n",
		"app.post('/" + resourcePlural + "', " + resourceName + ".create);\t\t// Create",
		"app.get('/" + resourcePlural + "/:id', " + resourceName + ".get);\t\t// Read",
		"app.put('/" + resourcePlural + "/:id', " + resourceName + ".update);\t\t// Update",
		"app.del('/" + resourcePlural + "/:id', " + resourceName + ".delete);\t\t// Delete",
		"app.get('/" + resourcePlural + "', " + resourceName + ".list);\t\t\t// List\n"
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to resource/'.yellow + resource + '.js ' + 'not added.\n'.yellow);
  }
};