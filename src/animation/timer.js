function loupe_start_task (fn, args, scope, interval) {
	
	return setInterval(function() {
		fn.apply(scope, args);
	}, interval || 10);
}

function loupe_stop_task (taskId, callback, callback_args) {
	clearInterval(taskId);

	if (callback) {
		callback.apply(null, callback_args);
	}
}

loupe_extend(loupe, {

	startTask: loupe_start_task,

	stopTask: loupe_stop_task
})