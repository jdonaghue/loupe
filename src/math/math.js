function loupe_get_add (type) {
	
	switch (type) {
		case 'd': {
			return loupe_d_add;
		}
		case 'stroke':
		case 'fill': {
			return loupe_color_add;	
		} 
		case 'transform': {
			return loupe_transform_add
		}	
	}
	return loupe_numeric_add;
}

function loupe_get_sub (type) {
	
	switch (type) {
		case 'd': {
			return loupe_d_sub;
		}
		case 'stroke':
		case 'fill': {
			return loupe_color_sub;	
		}
		case 'transform': {
			return loupe_transform_sub;
		}	
	}
	return loupe_numeric_sub;
}

function loupe_get_mult (type) {
		
	switch (type) {
		case 'd': {
			return loupe_d_mult;
		}
		case 'stroke':
		case 'fill': {
			return loupe_color_mult;	
		}
		case 'transform': {
			return loupe_transform_mult;
		}	
	}
	return loupe_numeric_mult;
}

function loupe_get_divide (type) {

	switch (type) {
		case 'd': {
			return loupe_d_divide;
		}
		case 'stroke':
		case 'fill': {
			return loupe_color_divide;	
		}
		case 'transform': {
			return loupe_transform_divide;
		}	
	}
	return loupe_numeric_divide;
}

function loupe_get_compare (type) {

	switch (type) {
		case 'd': {
			return loupe_d_compare;
		}
		case 'stroke':
		case 'fill': {
			return loupe_color_compare;	
		}
		case 'transform': {
			return loupe_transform_compare;
		}
	}
	return loupe_numeric_compare;
}