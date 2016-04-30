/* MAIN JAVASCRIPT PAGE */

// var red = 'rgb(255,76,56)';
// var dark_red = 'rgb(175,26,6)';
// var green = 'rgb(100,255,100)';
// var dark_green = 'rgb(60,168,40)';
// var pale_blue = 'rgb(80,168,240)';
// var dark_blue = 'rgb(20,128,190)';
// var thistle = 'rgb(216,191,216)';
// var blue = 'rgb(70,220,254)';
// var yellow = 'rgb(255,254,92)';
// var orange = 'rgb(254,85,22)';
// var pink = 'rgb(254,85,222)';
// var grey = 'rgb(47, 79, 79)';
// var white = 'rgb(254,255,222)';
// var new_white = 'rgb(244,245,222)';

var clr = {
	red: 'rgb(255,76,56)',
	dark_red: 'rgb(175,26,6)',
	green: 'rgb(100,255,100)',
	dark_green: 'rgb(60,168,40)',
	dark_blue: 'rgb(20,128,190)',
	thistle: 'rgb(216,191,216)',
	blue: 'rgb(70,220,254)',
	yellow: 'rgb(255,254,92)',
	orange: 'rgb(254,85,22)',
	pink: 'rgb(254,85,222)',
	grey: 'rgb(47, 79, 79)',
	white: 'rgb(254,255,222)',
	new_white: 'rgb(244,245,222)',
};

var colorscheme = [clr.red, clr.grey, clr.yellow, clr.dark_red, clr.blue, clr.thistle, clr.new_white, clr.dark_blue, clr.green, clr.dark_green, clr.orange, clr.pink];

/* TITLE */

var dat_arr = [16,3,198,1,34,121,232,123,271,81,12,431];
var catch_data = 0;

var width = document.getElementById('inner_section_wrap').clientWidth;
var height = document.getElementById('inner_section_wrap').clientHeight;
// height = 600;

var foto_arr = [];
var foto = [];
var rand_xy = [];
var rand_wh = [];

for(var i = 0; i < dat_arr.length; i++) {
	
	var tw = Math.floor((Math.random()*300)+200);
	var hi = 0.5654762;

	rand_wh.push(tw);
	rand_wh.push(Math.floor(tw*hi));
	rand_xy.push(Math.floor(Math.random()*(width-500)));
	rand_xy.push(Math.floor(Math.random()*(height/1-300)));

	foto.push(rand_wh[0]*rand_wh[1])
	foto.push(rand_wh);
	foto.push(rand_xy);
	foto_arr.push(foto);

	var foto = [];
	var rand_xy = [];
	var rand_wh = [];

};

console.log(foto_arr);

var loc = '#show';

var start = 800;
var middle = 1800;
var end = 600;

var bars_itr = 0;

make_bars(foto_arr,loc,width,height,start,middle,end);

console.log(width,height);

function make_bars(this_arr,loc,w,h,start,middle,end) {

	var this_arr = this_arr;
	var this_arr_max = 198;
	var loc = loc;

	var start = start;
	var middle = middle;
	var end = end;

	var rand_x = [];
	var rand_y = [];

	for(var i = 0; i < this_arr.length; i++) {
		rand_x.push(Math.floor(Math.random()*(width-500)));
		rand_y.push(Math.floor(Math.random()*(height/1-300)));
	};

	var rand_w = [];
	var rand_h = [];

	for(var i = 0; i < this_arr.length; i++) {
		var tw = Math.floor((Math.random()*300)+200);
		var hi = 0.5654762;
		rand_w.push(tw);
		rand_h.push(Math.floor(tw*hi));
	};
	var maxim = [];
	var maximimize = function(arr) {
		var arr = arr;
		for(var i = 0; i < arr.length; i++) {
			maxim.push(arr[i][0])
		};
		return d3.max(maxim);
	};

	this_arr_max = maximimize(this_arr);

	console.log(this_arr_max);

	var colourScale = d3.scale.ordinal() //category20a() category10() linear() ordinal()
		.domain([0, this_arr_max])
		.range(colorscheme);

	var board = d3.select(loc)
		.attr('width', width)
		.attr('height', height/1);

	var selection = board.selectAll('rect')
		.data(this_arr)
		.sort(function(a,b) { return a-b });

	var labels = board.selectAll('text')
		.data(this_arr)
		.sort(function(a,b) { return a-b });


// ENTER PHASE
// ///////////

	selection.enter().append('rect')
		.sort(function(a,b) { return a-b })
		.attr('opacity', 0)
		.style('fill', function(d) { console.log(-d[0]); return colourScale(-d[0]) })
		.attr('width', function(d,i) { return this_arr[i][1][0] })
		.attr('height', function(d,i) { return this_arr[i][1][1] })
		.attr('x', function(d,i) { return rand_x[i]/2 })
		.attr('y', function(d,i) { return rand_y[i]/2 })
		.attr('rx', 4)
		.attr('ry', 4);

	labels.enter().append('text')
		.attr('fill', function(d) { return colourScale(d[0]) })
		.attr('width', 0);

// UPDATE PHASE
// ///////////
	selection
		.sort(function(a,b) { return a-b })
		.transition()
		.duration(middle)
			.attr('opacity', 1)
			.attr('x', function(d,i) { return w-20-this_arr[i][1][0] })
			.attr('y', function(d,i) { return i*48+25 }) //this_arr[i][2][1]
		.transition()
		.duration(end)
			.style('fill', function(d) { return colourScale(d[0]) })

	labels
		.transition()
		.duration(middle)
			.delay(middle)
			.attr('fill', function(d) { return colourScale(-d[0]) })
			.attr('width', 100)
			.attr('x', function(d,i) { return w+22-this_arr[i][1][0] })
			.attr('y', function(d,i) { return i*48+25+this_arr[i][1][1]-4 })
			.text(function(d,i) { return i+" - "+d[0] })
			.each(function() {
      			labels
      				.style('text-anchor', 'middle')
    		});


// EXIT PHASE
// ///////////
	selection.exit()
		.transition()
		.duration(middle)
			.remove();

	// labels.exit()
	// 	.style('opacity', 0)
	// 	.remove();

};



































