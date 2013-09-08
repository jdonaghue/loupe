function loupe_sync_data(self) {
	
	var dom_queue = [];

	if (!self.analyzed_data.type || self.analyzed_data.type == 'linear') {
		self.queue = loupe_linear_sync(self);
	}
}