function loupe_date_add (d, dx) {
	
}

function loupe_date_sub (d, dx) {
	
}

function loupe_date_mult (d, dx) {
	
}

function loupe_date_divide (d, dx) {
	
}

function loupe_date_compare (a, b) {
	
}

loupe_extend(loupe, {

	math: loupe.math || {}
});

loupe.math.date = {
	
	add: loupe_date_add,

	sub: loupe_date_sub,

	mult: loupe_date_mult,

	divide: loupe_date_divide,

	compare: loupe_date_compare
}