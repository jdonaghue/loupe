var loupe_shape_svg_map = {
	stroke: 'stroke-width',
	strokeColor: 'stroke',
	color: 'fill',
	transform: 'transform',
	class: 'class',
	style: 'style'
}	

var loupe_property_default = {
	fill: '#FFF'
}

loupe_extend(loupe, {

	shapeSvgMap: loupe_shape_svg_map,

	svgPropertyDefault: loupe_property_default
})