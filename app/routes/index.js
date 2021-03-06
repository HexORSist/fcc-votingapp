'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');
var UserPollHandler = require(path + '/app/controllers/userpollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();
	var userpollHandler = new UserPollHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

/*	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);*/
		
	app.route('/api/:id/poll')
		//.get(isLoggedIn, clickHandler.getpoll)
		.post(isLoggedIn, clickHandler.addPoll)
		//.delete(isLoggedIn, clickHandler.resetClicks);
		
	app.route('/api/:id/sharepoll')
		//.get(isLoggedIn, clickHandler.getpoll)
		.post(isLoggedIn, clickHandler.getpoll);
	
		
		
	app.route('/api/:id/onpollchange')
		//.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.onPollChange)
		//.delete(isLoggedIn, clickHandler.resetClicks);
	
	app.route('/api/:id/onpollrem')
		.post(isLoggedIn, pollHandler.remPoll)
		
	app.route('/api/:id/onpollsave')
		.post(isLoggedIn, pollHandler.savePoll)

		
	app.route('/modpoll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/modpolls.html');
		});
		
	app.route('/userpoll*')
		.get(function (req, res) {
			res.sendFile(path + '/public/userpoll.html');
		});
		
	app.route('/userpollinc')
		.post( userpollHandler.userPollinc);
		
	app.route('/userpollinfo')
		.post( userpollHandler.userPollinfo);


		
	/*app.route('/pollurl')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/pollurl.html');
		});*/

		
	app.route('/api/:id/pollmod')
		.get(isLoggedIn, pollHandler.getPolls)
		//.post(isLoggedIn, clickHandler.addPoll)
		//.delete(isLoggedIn, clickHandler.resetClicks);



};
