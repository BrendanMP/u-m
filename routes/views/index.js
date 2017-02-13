const keystone = require('keystone');
const Promise = require('bluebird');
const User = keystone.list('User');
const Site = keystone.list('Site');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	if (locals.user) {
		Promise.all([
			User.model.find({ _id: req.user._id })
				.populate({
					path: 'sites',
					populate: {
						path: 'locations'
					}
				}),
		])
		.then(function([user, sites]) {
			locals.current = user;
			locals.current.sites = sites;
			view.render('index');
		})
		.catch(function(err) {
			res.send('database error', err)
		});
	} else {
		view.render('index');
	}
};
