var keystone = require('keystone');
var Types = keystone.Field.Types;

var Site = new keystone.List('Site');

Site.add({
	admin: { type: Types.Relationship, ref: 'User' },
	editors: { type: Types.Relationship, ref: 'User', many: true },
	name: { type: String, required: true, index: true },
	url: { type: String, index: true },
	locations: { type: Types.Relationship, ref: 'Location', many: true },
});

Site.defaultColumns = 'name, client, locations';
Site.register();
