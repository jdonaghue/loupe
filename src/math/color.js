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

function loupe_color_compare (a, b) {

	var rgb;

	a = loupe_normalize_color(a);
	b = loupe_normalize_color(b);

	if (a[0] > b[0] || a[1] > b[1] || a[2] > b[2]) {
		return 1;
	}
	else {
		if (a[0] < b[0] || a[1] < b[1] || a[2] < b[2]) {
			return -1;
		}
		else {
			return 0;
		}
	}
}

function loupe_color_math (d, dx, op) {

	var rbg;

	d = loupe_normalize_color(d);
	dx = loupe_normalize_color(dx);

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

function loupe_normalize_color (color) {

	color = loupe_color_to_hex_map[color] || color;

	if (isNaN(color)) {
		if (color.indexOf('rgb') == 0) {
			color = color.substring(4, color.length - 1);
			color = color.split(',');
		}
		else {
			color = loupe_hex_to_rgb_values(color);
		}
	}
	else {
		color = [color, color, color];
	}

	return color;
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