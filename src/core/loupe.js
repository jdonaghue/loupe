var loupe_svg_ns = 'http://www.w3.org/2000/svg',
	loupe_svg_version = '1.1'

_win.loupe = function (selectorOrDOM, props) {
	if (this instanceof loupe){
		return;
	}
	var L = new loupe();

	if (loupe_is_array(selectorOrDOM)) {
		L.dom = selectorOrDOM;
	}
	else if (selectorOrDOM.nodeName) {
		L.dom = [selectorOrDOM];	
	}
	else {
		L.dom = L.query(selectorOrDOM);	
	}
	
	L.shapes = [];
	L.queue = [];
	L.data_points = [];
	L.analyzed_data = [];

	if (props) {
		L.width = props.width;
		L.height = props.height;
	}
	
	return L;	
}