loupe_cls(loupe, {

	data: function (datapoints, opts) {
		
		var self = this;

		if (opts && opts.replace) {
			self.data_points = datapoints;	
		}
		else {
			self.data_points = self.data_points.concat(datapoints);
		}

		return self;
	}
});