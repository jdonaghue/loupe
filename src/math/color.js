var loupe_color_to_hex_map = {
	white: '#FFFFFF',
	red: '#FF0000',
	black: '#000000',
	green: '#008000',
	yellow: '#ffff00'
}

function loupe_color_add (d, dx) {

	return loupe_color_math(d, dx, 'add');	
}

function loupe_color_sub (d, dx) {

	return loupe_color_math(d, dx, 'sub');	
}

function loupe_color_mult (d, dx) {
	
	return loupe_color_math(d, dx, 'mult');
}

function loupe_color_divide (d, dx) {
	
	return loupe_color_math(d, dx, 'divide');
}

function loupe_color_math (d, dx, op) {

	var rbg;

	d = loupe_color_to_hex_map[d] || d;
	dx = loupe_color_to_hex_map[dx] || dx;

	if (d.indexOf('rgb') == 0) {
		d = d.substring(4, d.length - 1);
		d = d.split(',');
	}
	else {
		d = loupe_hex_to_rgb_values(d);
	}

	if (isNaN(dx)) {
		if (dx.indexOf('rgb') == 0) {
			dx = dx.substring(4, dx.length - 1);
			dx = dx.split(',');
		}
		else {
			dx = loupe_hex_to_rgb_values(dx);
		}
	}
	else {
		dx = [dx, dx, dx];
	}

	if (op == 'add') {
		d[0] = (d[0] * 1) + (dx[0] * 1);
		d[1] = (d[1] * 1) + (dx[1] * 1);
		d[2] = (d[2] * 1) + (dx[2] * 1);
	}
	else if (op == 'sub') {
		d[0] = (d[0] * 1) - (dx[0] * 1);
		d[1] = (d[1] * 1) - (dx[1] * 1);
		d[2] = (d[2] * 1) - (dx[2] * 1);
	}
	else if (op == 'mult') {
		d[0] = d[0] * dx[0];
		d[1] = d[1] * dx[1];
		d[2] = d[2] * dx[2];
	}
	else if (op == 'divide') {
		d[0] = d[0] / dx[0];
		d[1] = d[1] / dx[1];
		d[2] = d[2] / dx[2];
	}

	d[0] = Math.round(d[0]);
	d[1] = Math.round(d[1]);
	d[2] = Math.round(d[2]);

	rgb = 'rgb(' + d.join(',') + ')';

	return rgb;
}

function loupe_hex_to_rgb_values (hex) {

	var rgb = hex.match(/([a-zA-Z0-9]{1})/g);

	if (rgb.length == 3) {
		rgb.splice(1, 0, rgb[0]); // FF0b
		rgb.splice(2, 0, rgb[2]); // FF00b
		rgb.splice(4, 0, rgb[4]); // FF00bb
	}

	var r = (parseInt(rgb[0], 16) + 1) * (parseInt(rgb[1], 16) + 1),
		g = (parseInt(rgb[2], 16) + 1) * (parseInt(rgb[3], 16) + 1),
		b = (parseInt(rgb[4], 16) + 1) * (parseInt(rgb[5], 16) + 1);

	return [r,g,b];
}