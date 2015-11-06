'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poll = new Schema({
    catname: String,
    rank: Number
    },{ _id: false });

var polls = new Schema({
    pollname: String,
    poll: [poll]
    },{ _id: false })

var User = new Schema({
	github: {
		id: String,
		displayName: String,
	    username: String,
        publicRepos: Number
	},
	pollitems:{
	    pollitem: [polls]
	},
   nbrClicks: {
        clicks: Number
   }
});

module.exports = mongoose.model('User', User);
