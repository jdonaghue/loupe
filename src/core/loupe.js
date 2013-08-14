var loupe_svg_ns = 'http://www.w3.org/2000/svg',
	loupe_svg_version = '1.1'

_win.loupe = function (selector) {
	if (this instanceof loupe){
		return;
	}
	var L = new loupe();
	L.query(selector);
	L.shapes = [];
	L.queue = [];
	L.data_points = [];
	L.analyzed_data = [];
	return L;	
}