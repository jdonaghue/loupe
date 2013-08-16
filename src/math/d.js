function loupe_d_add (d, dx) {
	
	return loupe_d_math(d, dx, 'add');
}

function loupe_d_sub (d, dx) {
	
	return loupe_d_math(d, dx, 'sub');
}

function loupe_d_mult (d, dx) {
	
	return loupe_d_math(d, dx, 'mult');
}

function loupe_d_divide (d, dx) {
	
	return loupe_d_math(d, dx, 'divide');
}

function loupe_d_math (d, dx, op) {

	if (d) {
		var args = d.split(/[a-zA-Z]+/g),
			operations = d.split(/[0-9,.\-]+/g);

		args.shift();
		args.pop();

		if (!isNaN(dx)) {

			for(var i=0, len=args.length; i<len; i++) {
				var tmp = args[i].split(',');
				for(var j=0; j<tmp.length; j++) {
					if (op == 'add') {
						tmp[j] = (tmp[j] *1) + (dx * 1);
					}
					else if (op == 'sub') {
						tmp[j] = (tmp[j] * 1) - (dx * 1);
					}
					else if (op == 'mult') {
						tmp[j] = tmp[j] * dx;
					}
					else if (op == 'divide') {
						tmp[j] = tmp[j] / dx;
					}
				}
				args[i] = tmp.join(',');
			}
		}
		else {
			var argsDx = dx.split(/[a-zA-Z]+/g),
				operationsDx = dx.split(/[0-9,.\-]+/g);

			argsDx.shift();
			argsDx.pop();

			if (argsDx.length != args.length || operationsDx.length != operations.length) {
				return d;
			}

			for(var i=0, len=args.length; i<len; i++) {
				var tmp = args[i].split(','),
					tmpDx = argsDx[i].split(',');

				if (tmp.length != tmpDx.length) {
					return d;
				}

				for(var j=0; j<tmp.length; j++) {
					if (op == 'add') {
						tmp[j] = (tmp[j] *1) + (tmpDx[j] *1);
					}
					else if (op == 'sub') {
						tmp[j] = (tmp[j] *1) - (tmpDx[j] *1);
					}
					else if (op == 'mult') {
						tmp[j] = tmp[j] * tmpDx[j];
					}
					else if (op == 'divide') {
						tmp[j] = tmp[j] / tmpDx[j];
					}
				}
				args[i] = tmp.join(',');
			}
		}


		d = '';
		for(var z=0,zlen=operations.length; z<zlen; z++) {
			d += operations[z] + (args.length > 0 ? args.shift() : '');
		}
	}

	return d;
}