loupe_cls(loupe, {

	data: function (datapoints, opts) {
		
		var self = this;

		opts = opts || {};
		if (opts.replace) {
			self.data_points = datapoints;	
		}
		else {
			self.data_points = self.data_points.concat(datapoints);
		}

		self.analyzed_data = loupe_analyze_data(self.data_points, opts.reader);

		return self;
	}
});