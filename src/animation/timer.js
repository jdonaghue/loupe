function loupe_start_task (fn, args, scope, interval) {
	
	return setInterval(function() {
		fn.apply(scope, args);
	}, interval || 10);
}

function loupe_stop_task (taskId, callback) {
	clearInterval(taskId);

	if (callback) {
		callback();
	}
}