// get JSON
var json = '{"parking": {"length": 5, "width": 7, "parkingPlaces":  [	{			}		]	},		"road": {		"coordinate": [{"x": 0,"y": 0},{"x": 0,"y": 1},{"x": 0,	"y": 2},{"x": 1,	"y": 2},{"x": 2,	"y": 2},{"x": 3,	"y": 2},{"x": 4,	"y": 2},{"x": 4,	"y": 3},{"x": 4,	"y": 4}		]	},		"enterCar": {		"length": 1,		"width": 1,		"route": [{"x": 0, "y": 1}, {"x": 0,"y": 2}, {"x": 1, "y": 2}, {"x": 1, "y": 1}		]	},		"defaultCar": {		"length": 1,		"width": 1	},		"parkedCars": [		{			"x": 2,			"y": 2		},		{			"x": 3,			"y": 2		}	]}';
var data = JSON.parse(json);

var boxSize = 50;

function createRoad(x, y, top, left) {
	var img = document.createElement("img");
	img.class = "parking-img";
	img.src = "../images/asphalt_15.jpg";
	// img.style.position = "relative"; 
	img.style.position = "absolute"; 
	img.style.left = (x * boxSize) + left + "px";
	img.style.top = (y * boxSize) + top + "px";
	img.width = boxSize;
	img.height = boxSize;
	var src = document.getElementById("parking");
	src.appendChild(img);
};

function createCar(x, y, top, left) {
	var img = document.createElement("img");
	img.id = "car-img";
	img.src = "../images/exo-4.png";
	// img.style.position = "relative"; 
	img.style.position = "absolute"; 
	img.style.left = (x * boxSize) + left + "px";
	img.style.top = (y * boxSize) + top + "px";
	img.width = boxSize;
	img.height = boxSize;
	var src = document.getElementById("parking");
	src.appendChild(img);
	
};

function replaceCar(x, y, top, left) {

	var car = document.getElementById("car-img");

	var left = car.offsetLeft; // начальное значение
	var top = car.offsetTop;

	// var left = car.style.left; // начальное значение
	// var top = car.style.top;	

	x = x + left;
	y = y + top;

	console.log(x + " " + y + " " + left + " " + top);

  	function frame() { // функция для отрисовки

  		if(x !== left) {

  			if (x > left) {
  				left++;
  				car.style.left = left + "px"; 
  			} else {
  				left--;
  				car.style.left = left + "px"; 
  			};
  			if(left === x) {
  				clearInterval(timer);
  			}
  		};

  		if(y !== top) {

  			if (y > top) {
  				top++;
  				car.style.top = top + "px";
  			} else {
  				top--;
  				car.style.top = top + "px"; 
  			};
  			if(top === y) {
  				clearInterval(timer);
  			};
 		};

  	};

  	var timer = setInterval(frame, 10) // рисовать каждые 10мс

};

var index = 0;

function carMoving() {
	var parking = document.getElementById('parking');
	var top = parking.offsetTop;
	var left = parking.offsetLeft;

	var car = document.getElementById("car-img");

	var route = data.enterCar.route;

	// var index = 0;

	// replaceCar(route[index].x * boxSize, 
	// 		route[index].y * boxSize, top, left,
	// 		index);

	for (var i = 0; i < route.length; i++) {
		console.log(route[index].x + " " + route[index].y);
		replaceCar(route[i].x * boxSize, 
			route[index].y * boxSize, top, left);
	};

};

function start() {
	var parking = document.getElementById('parking');
	var workingPlace = document.getElementById('working-place');

	var top = workingPlace.offsetTop;
	var left = parking.offsetLeft;

	parking.style.width = data.parking.width * boxSize + "px";
	parking.style.height = data.parking.length * boxSize + "px";
	parking.style.background = "url(/images/metall.png) 0 0";


	var road = data.road.coordinate;
	for (var i = 0; i < road.length; i++) {
		console.log(road[i].x + " " + road[i].y);
		createRoad(road[i].x, road[i].y, top, left);
	};
	
	createCar(road[0].x, road[0].y, top, left);

};

function setStartBtn() {
	var start = document.getElementById("start-btn");
	start.onclick = function() {
		carMoving();
	};
};