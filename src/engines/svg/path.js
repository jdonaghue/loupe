var loupe_path_svg_map = loupe_extend({
	d: 'd'
}, loupe_shape);

loupe_cls(loupe, {

	path: function (props) {

		var self = this,
			config = {
				tag: 'path',
				other: {}
			};

		for (var prop in props) {
			var mapped_prop = loupe_path_svg_map[prop];
			if (mapped_prop) {
				config[mapped_prop] = props[prop];
			}
			else {
				config.other[prop] = props[prop];
			}
		}		

		self.shapes.push(config);

		loupe_sync_data(self);
		
		return self;
	}
});