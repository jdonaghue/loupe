function loupe_transform_add (d, dx) {

	return loupe_transform_math(d, dx, 'add');
}

function loupe_transform_sub (d, dx) {

	return loupe_transform_math(d, dx, 'sub');	
}

function loupe_transform_mult (d, dx) {
	
	return loupe_transform_math(d, dx, 'mult');
}

function loupe_transform_divide (d, dx) {

	return loupe_transform_math(d, dx, 'divide');
}

function loupe_transform_compare (a, b) {
	
}

function loupe_transform_math(d, dx, op) {

	var type = d.substring(0, d.indexOf('(')),
		body = d.substring(d.indexOf('(') + 1, d.length - 1);

	body = body.split(',');

	if (!isNaN(dx)) {
		for(var i=0, ilen=body.length; i<ilen; i++) {
			if (op == 'add') {
				body[i] = (body[i] * 1) + dx;
			}
			else if (op == 'sub') {
				body[i] = (body[i] * 1) - dx;
			}
			else if (op == 'mult') {
				body[i] = body[i]  * dx;
			}
			else if (op == 'divide') {
				body[i] = body[i] / dx;
			}
		}
	}
	else {
		var dxType = dx.substring(0, dx.indexOf('(')),
			dxBody = dx.substring(dx.indexOf('(') + 1, dx.length - 1);

		dxBody = dxBody.split(',');

		for(var i=0, ilen=body.length; i<ilen; i++) {
			if (op == 'add') {	
				body[i] = (body[i] * 1) + (dxBody[i] * 1);
			}
			else if (op == 'sub') {
				body[i] = (body[i] * 1) - (dxBody[i] * 1);
			}
			else if (op == 'mult') {
				body[i] = body[i]  * dxBody[i];
			}
			else if (op == 'divide') {
				body[i] = body[i] / dxBody[i];
			}
		}
	}

	return type + '(' + body.join(',') + ')';
}

loupe_extend(loupe, {

	math: loupe.math || {}
});

loupe.math.transform = {
	
	add: loupe_transform_add,

	sub: loupe_transform_sub,

	mult: loupe_transform_mult,

	divide: loupe_transform_divide,

	compare: loupe_transform_compare
}