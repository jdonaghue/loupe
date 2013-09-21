function loupe_numeric_add (a, b) {
	return (a * 1) + (b * 1);
}

function loupe_numeric_sub (a, b) {
	return (a * 1) - (b * 1)
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

loupe.math = loupe.math || {};
loupe.math.numeric = {
	
	add: loupe_numeric_add,

	sub: loupe_numeric_sub,

	mult: loupe_numeric_mult,

	divide: loupe_numeric_divide,

	compare: loupe_numeric_compare
}