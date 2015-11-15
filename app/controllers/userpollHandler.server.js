'use strict';

var Users = require('../models/users.js');
var qs = require('qs')

function UserPollHandler () {
	
	this.userPollinfo = function (req, res) {
		var body = '';
		var resdata = [];
		
		req.on('data', function(data){
			body+=data;
		});
		
		req.on('end', function () {
			body = JSON.parse(body);
			//console.log(body);
			
			Users.findOne({ 'github.username': body.username}, function(err,data){
				if (err) {throw err;}
				
				data.pollitems.pollitem.forEach(function(elm,idx){
					if(body.pollname.toString()==elm.pollname.toString()){
						//console.log(elm.pollname.toString());
						elm.poll.forEach(function(elm,idx){
							resdata.push(elm);
							//console.log(elm.catname.toString())
							
						});
					//console.log(resdata);
					res.send(resdata);
					}
				});
			});
		});
		
	};

	
	/*this.savePoll = function (req, res) {
		var body = '';
		
		req.on('data', function(data){
			body+=data;
		});
		
		Users.findOne({ 'github.id': req.user.github.id}, function(err,data){
			if (err) {throw err;}
			body = qs.parse(body);
			
			data.pollitems.pollitem.forEach(function(elm,idx){
				if(body.pollname.toString()==elm.pollname.toString()){
					elm.poll.forEach(function(elm,idx){
						//console.log(body.catname[idx].toString());
						elm.catname=body.catname[idx].toString();
					});
				};
			});
			data.save();
			res.send('success');
		});
	};

	
	this.remPoll = function (req, res) {
		var body = '';
		
		req.on('data', function(data){
			body+=data;
		});
		
		req.on('end', function () {
			Users.findOne({ 'github.id': req.user.github.id},function(err,User){
				if (err) {throw err;}
				User.pollitems.pollitem.forEach(function(elm,idx){
					if(elm.pollname.toString()==body.toString()){
						User.pollitems.pollitem[idx].remove();
						//console.log(body.toString());
					}
					User.save();
				});
			});
			
		});
	};
	
	
	this.getPolls = function (req, res) {
		var catname = [];
		var query = { 'github.id': req.user.github.id };
		
		Users.findOne(query,function(err,data){
			if (err) {throw err;}
			
			data.pollitems.pollitem.forEach(function(elm){
				catname.push(elm.pollname);
				//console.log(qs.parse(elm));
				//console.log(elm);
			});
			res.json(catname);
			//console.log(catname);
		});
	};*/
}

module.exports = UserPollHandler;
