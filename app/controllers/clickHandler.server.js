'use strict';

var Users = require('../models/users.js');
var qs = require('qs')

function ClickHandler () {
	
	this.addPoll = function (req, res) {
		var body = '';
		
		req.on('data', function(data){
			body+=data;
		});
		
		req.on('end', function () {
			body = qs.parse(body);
			var query = { 'github.id': req.user.github.id };
			/*var update = {$push: {'pollitems': {$each: [{'pollname': body.pollname}]}},
						   $push: {'pollitems.pollitem[0].pollname.poll.catagory': body.catname[0]}};*/
			
			Users.findOne(query,function(err,data){
				if (err) {throw err;}
				//else
				data.pollitems.pollitem.push({'pollname':body.pollname});
				console.log(data.count());
				data.save(function(err,data){
					if (err) {throw err;}
				});
				
			});
			
            console.log(body);
        });
		
	};

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = ClickHandler;
