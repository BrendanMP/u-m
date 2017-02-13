const keystone = require('keystone');
const User = keystone.list('User');
const Site = keystone.list('Site');

exports = module.exports = (req, res) => {

  let view = new keystone.View(req, res);
  let { locals } = res;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home';

  if (!locals.user) {
    return view.render('index');
  }

  User.model.findById(req.user._id)
    .populate({
      path: 'sites',
      populate: {
        path: 'locations'
      }
    })
    .exec()
    .then((user) => {
      locals.current = user;
      return view.render('index');
    });

};
