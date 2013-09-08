function loupe_analyze_linear_data (data) {

	data.metrics = {};
	data.metrics.sum = 0;

	loupe_each(data, function(val, key) {
		if (key != 'metrics') {
			var readVal = val;
			data.metrics.sum += readVal;
			data.metrics.max = data.metrics.max > readVal ? data.metrics.max : readVal;
			data.metrics.min = data.metrics.min < readVal ? data.metrics.min : readVal;
		}
	});

	data.metrics.avg = data.metrics.sum / data.length;

	return data;
}