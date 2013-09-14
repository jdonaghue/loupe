var loupe_path_svg_map = loupe_extend({
	centerX: 'cx',
	centerY: 'cy',
	radius: 'r',
	d: 'd',
	moveTo: 'M',
	arcTo: 'A',
	lineTo: 'L',
	curveTo: 'C'
}, loupe_shape_svg_map);

loupe_extend(loupe, {

	pathSvgMap: loupe_path_svg_map
});

loupe_cls(loupe, {

	path: function (props) {

		var self = this,
			config = {
				tag: 'path',
				other: {}
			};

		config = self.shape(config, props, loupe_path_svg_map, null, [
			function(config) {
				if (!config.d) {
					config.d = '';
					if (config.M) {
						config.d = 'M' + config.M;
					}
					if (config.A) {
						config.d += 'A' + config.A;
					}
					if (config.L) {
						config.d += 'L' + config.L;
					}
					if (config.C) {
						config.d += 'C' + config.C;
					}
					config.d += 'Z';
				}	
			}]);
		
		return self;
	}
});