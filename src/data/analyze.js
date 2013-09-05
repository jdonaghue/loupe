function loupe_analyze_data (data, reader) {

	data.metrics = {};
	data.metrics.sum = 0;

	reader = typeof reader == 'function' ? reader : function(a) { return { value: a }; };

	loupe_each(data, function(val, key) {
		if (key != 'metrics') {
			data.metrics.sum += reader(val).value;
		}
	});

	data.metrics.avg = data.metrics.total / data.length;

	return data;
}