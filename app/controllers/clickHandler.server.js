'use strict';

var Users = require('../models/users.js');
var qs = require('qs');

function ClickHandler () {
	
	this.onPollChange = function (req, res) {
		var body = '';
		var resdata=[];
		
		req.on('data', function(data){
			body+=data;
		});
		
		req.on('end', function () {

			Users.findOne({ 'github.id': req.user.github.id}, function(err,data){
				if (err) {throw err;}
				
				data.pollitems.pollitem.forEach(function(elm,idx){
					//console.log(elm.pollname);
					if(body==elm.pollname){
						elm.poll.forEach(function(elm,idx){
							resdata.push(elm.catname);
							
						})
					}
				})
				
				resdata = '{ "catname": '+JSON.stringify(resdata)+'}';
				//var resobj = JSON.parse(resdata);
				
				//console.log(resobj.constructor.name);
				res.json(JSON.parse(resdata));
			
			});
			
		});
	};
	
	this.addPoll = function (req, res) {
		var body = '';
		
		req.on('data', function(data){
			body+=data;
		});
		
		req.on('end', function () {
			body = qs.parse(body);
			console.log(body);
			
			Users.findOne({ 'github.id': req.user.github.id },function(err,data){
				
				if (err) {throw err;}

				data.pollitems.pollitem.push({'pollname':body.pollname});
				
				body.catname.forEach(function(elm){
					data.pollitems.pollitem[data.pollitems.pollitem.length-1].poll.push({'catname': elm});
				});
				
				data.save(function(err,data){
					if (err) {throw err;}
				});
				
			});
			
            //console.log(body);
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
