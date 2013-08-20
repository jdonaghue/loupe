function loupe_get_add (type) {
	
	switch (type) {
		case 'd': {
			return loupe_d_add;
		}
		case 'fill': {
			return loupe_color_add;	
		} 
		case 'transform': {
			return loupe_transform_add
		}	
		default: {
			return loupe_numeric_add;
		}
	}
}

function loupe_get_sub (type) {
	
	switch (type) {
		case 'd': {
			return loupe_d_sub;
		}
		case 'fill': {
			return loupe_color_sub;	
		}
		case 'transform': {
			return loupe_transform_sub;
		}	
		default: {
			return loupe_numeric_sub;
		}
	}
}

function loupe_get_mult (type) {
		
	switch (type) {
		case 'd': {
			return loupe_d_mult;
		}
		case 'fill': {
			return loupe_color_mult;	
		}
		case 'transform': {
			return loupe_transform_mult;
		}	
		default: {
			return loupe_numeric_mult;
		}
	}
}

function loupe_get_divide (type) {

	switch (type) {
		case 'd': {
			return loupe_d_divide;
		}
		case 'fill': {
			return loupe_color_divide;	
		}
		case 'transform': {
			return loupe_transform_divide;
		}	
		default: {
			return loupe_numeric_divide;
		}
	}
}