var keystone = require('keystone');
var Types = keystone.Field.Types;

var Location = new keystone.List('Location');

Location.add({
	site: { type: Types.Relationship, ref: 'Location'},
	name: { type: String, required: true, index: true },
	address: { type: Types.Location, index: true },
});

Location.defaultColumns = 'name, site';
Location.register();
