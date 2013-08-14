var loupe_circle_config_map = {
	centerX: 'cx',
	centerY: 'cy',
	radius: 'r',
	stroke: 'stroke-width',
	strokeColor: 'stroke',
	color: 'fill'
};

loupe_cls(loupe, {

	circle: function (props) {

		var self = this,
			config = {
				tag: 'circle',
			};

		for (var prop in props) {
			config[loupe_circle_config_map[prop]] = props[prop];
		}		

		self.shapes.push(config);

		loupe_sync_data(self);
		
		return self;
	}
});