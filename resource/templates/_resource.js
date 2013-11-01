var mongoose = require('mongoose');
var <%= nameCapitalized %> = mongoose.model('<%= nameCapitalized %>');
var logger = require('../lib/log');

// Create a document
exports.create = function(req, res) {
	var obj = new <%= nameCapitalized %>(req.body)
	obj.save(function(err, obj) {
		if (err) {
			res.send(err);
		} else {
			res.send(obj);
		}
	});	
};

// Get a Document by the _id
exports.get = function(req, res){
	var id = req.params.id;
	<%= nameCapitalized %>.findOne({_id: id}, function(err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send("<%= nameCapitalized %> not found with id: " + id)
			}
		}
	});
};


// Update a document
exports.update = function(req, res) {
	var id = req.params.id;
	<%= nameCapitalized %>.findByIdAndUpdate(id, req.body, function(err) {
		if (!err) {
			logger.info("update success");
			res.send(200);
		} else {
			logger.error(err);
			res.send(err);
		}
	});
};


// Delete a document
exports.delete = function(req, res) {
	var id = req.params.id;
	<%= nameCapitalized %>.findOne({_id: id}, function(err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			if (data) {
				data.remove(function(err, data) {
					if (err) {
						logger.error(err);
						res.send(err);
					} else {
						res.send(data);
					}
				});
			} else {
				res.status(404).send("<%= nameCapitalized %> not found with id: " + id)
			}
		}
	});	
};


// Get all documents in a collection
exports.list = function (req, res) {
	<%= nameCapitalized %>.find({}, function(err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			res.send(data);
		}
	});
};