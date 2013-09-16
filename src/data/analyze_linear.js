function loupe_analyze_linear_data (self, data) {

	data.metrics = {};
	data.metrics.sum = 0;

	loupe_each(data, function(val, key) {
		if (!isNaN(key)) {
			if (!isNaN(val)) {
				data.metrics.sum += val;
			}
			data.metrics.max = data.metrics.max > val ? data.metrics.max : val;
			data.metrics.min = data.metrics.min < val ? data.metrics.min : val;
		}
	});

	if (data.metrics.sum) {
		data.metrics.avg = data.metrics.sum / data.length;
	}

	return data;
}