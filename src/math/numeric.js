function loupe_numeric_add (a, b) {
	return a + b;
}

function loupe_numeric_sub (a, b) {
	return a - b;
}

function loupe_numeric_mult (a, b) {
	return a * b;
}

function loupe_numeric_divide (a, b) {
	return a / b;
}

function loupe_numeric_compare (a, b) {

	if (a > b) {
		return 1;
	}
	else if (a < b) {
		return -1;
	}
	return 0;
}