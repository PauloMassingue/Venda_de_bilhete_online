var map = L.map('map').setView([0,0],1);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let follow;

let dropdown = document.getElementById("dropdown");
let droppy = document.getElementById("droppy");
droppy.style.display = "none";

let button_0 = document.getElementById("button-0");
let button_1 = document.getElementById("button-1");
let button_2 = document.getElementById("button-2");

let esc = document.getElementById("esc");

let escolha_0 = document.getElementById("escolha-0");
let escolha_1 = document.getElementById("escolha-1");
let escolha_2 = document.getElementById("escolha-2");
let escolha_3 = document.getElementById("escolha-3");
let escolha_4 = document.getElementById("escolha-4");
let escolha_5 = document.getElementById("escolha-5");
let escolha_6 = document.getElementById("escolha-6");
let escolha_7 = document.getElementById("escolha-7");
let escolha_8 = document.getElementById("escolha-8");
let escolha_9 = document.getElementById("escolha-9");

let info_0 = document.getElementById("info-0");
let info_1 = document.getElementById("info-1");
let info_2 = document.getElementById("info-2");

button_0.addEventListener("click", function() {
	alocarVeiculo(0);
});

button_1.addEventListener("click", function() {
	alocarVeiculo(1);
});

button_2.addEventListener("click", function() {
	alocarVeiculo(2);
});

escolha_0.addEventListener("click", function() {
	map.setView([bus[0].x,bus[0].y]);
	follow = 0;
	detalhar(0);
});

escolha_1.addEventListener("click", function() {
	map.setView([bus[1].x,bus[1].y]);
	follow = 1;
	detalhar(1);
});

escolha_2.addEventListener("click", function() {
	map.setView([bus[2].x,bus[2].y]);
	follow = 2;
	detalhar(2);
});

escolha_3.addEventListener("click", function() {
	map.setView([bus[3].x,bus[3].y]);
	follow = 3;
	detalhar(3);
});

escolha_4.addEventListener("click", function() {
	map.setView([bus[4].x,bus[4].y]);
	follow = 4;
	detalhar(4);
});

escolha_5.addEventListener("click", function() {
	map.setView([bus[5].x,bus[5].y]);
	follow = 5;
	detalhar(5);
});

escolha_6.addEventListener("click", function() {
	map.setView([bus[6].x,bus[6].y]);
	follow = 6;
	detalhar(6);
});

escolha_7.addEventListener("click", function() {
	map.setView([bus[7].x,bus[7].y]);
	follow = 7;
	detalhar(7);
});

escolha_8.addEventListener("click", function() {
	map.setView([bus[8].x,bus[8].y]);
	follow = 8;
	detalhar(8);
});

escolha_9.addEventListener("click", function() {
	map.setView([bus[9].x,bus[9].y]);
	follow = 9;
	detalhar(9);
});


function detalhar(i) {
	info_0.value = rotas_nomes[bus[i].rota];
	info_1.value = bus[i].preco;
	info_2.value = bus[i].lotacao+"/"+bus[i].capacidade;
};

function alocarVeiculo(num) {
	follow = bus.length;
	bus.push({x: 0, y: 0, rota: num, cor: "", velocidade: 0, preco: 0, lotacao: 0, capacidade: 0, pos: 0, fator: {x: 0, y: 0}, hops: 0 });
	iniciarTransporte(bus.length-1);
	let temp = "escolha-"+follow;
	document.getElementById(temp).style.display = "block";
	detalhar(num);
}

function mostrarRotas() {
	droppy.style.display = "inline-block";
}

function ocultarRotas() {
	droppy.style.display = "none";
}

navigator.geolocation.watchPosition(success,error);

let marker, usuario, zoomed;
let mover;

const max = 45;

function moverTransportes() {
	for (let i = 0; i < bus.length; i++) {
		bus[i].x += bus[i].fator.x;
		bus[i].y += bus[i].fator.y;
		if (bus[i].pos == rotas[bus[i].rota].length-1) {
			bus[i].pos = 0;
			bus[i].x = rotas[bus[i].rota][0][0];
			bus[i].y = rotas[bus[i].rota][0][1];
		}
		if (bus[i].hops-- == 0) {
			bus[i].pos++;
			determinarDeslocamento(i);
		}
		map.removeLayer(circulos[i]);
		circulos[i] = L.circle([bus[i].x,bus[i].y], 4, {color: "transparent", fillColor: bus[i].cor, fillOpacity: 1}).addTo(map);
	}
	map.setView([bus[follow].x,bus[follow].y]);
}

function determinarDeslocamento(i) {
	bus[i].fator.x = (rotas[bus[i].rota][bus[i].pos+1][0]-bus[i].x)/bus[i].velocidade;
	bus[i].fator.y = (rotas[bus[i].rota][bus[i].pos+1][1]-bus[i].y)/bus[i].velocidade;
	bus[i].lotacao = Math.trunc(Math.random()*150);
	bus[i].capacidade = bus[i].lotacao+Math.trunc(Math.random()*70)+110;
	bus[i].hops = Math.trunc((rotas[bus[i].rota][bus[i].pos+1][0]-bus[i].x)/bus[i].fator.x);
	bus[i].velocidade = (Math.random()*max)+45;
}

function iniciarTransporte(i) {
	let rota, pos;
	rota = bus[i].rota;
	pos = 0;//Math.trunc(Math.random()*rotas[rota].length);
	bus[i].x = rotas[rota][pos][0];
	bus[i].y = rotas[rota][pos][1];
	bus[i].cor = bus_cores[rota];
	bus[i].preco = Math.trunc(Math.random()*1500);
	//bus[0].cor = "black";
	bus[i].pos = pos;
	bus[i].velocidade = (Math.random()*max)+45;
	circulos[i] = L.circle([bus[i].x,bus[i].y], 4, {color: "transparent", fillColor: bus[i].cor, fillOpacity: 1}).addTo(map);
	determinarDeslocamento(i);
	map.setView([bus[i].x,bus[i].y]);
	mover = setInterval(moverTransportes,200);
}

function success(pos) {
//	let lat = pos.coords.latitude;
//	let lng = pos.coords.longitude;
	let lat = -25.936446;
	let lng = 32.551734;
	let accuracy = pos.coords.accuracy;
	
	if (marker) {
		map.removeLayer(marker);
		map.removeLayer(usuario);
	}
	marker = L.marker([lat,lng]).addTo(map);
	usuario = L.circle([lat,lng], {radius: accuracy}).addTo(map);

	if (!zoomed) {
		zoomed = map.fitBounds(usuario.getBounds());
	}
	map.setView([lat,lng]);
	for (let i = 0; i < rotas.length; i++) {
		for (let j = 0; j < rotas[i].length; j++) {
			//L.circle([rotas[i][j][0],rotas[i][j][1]], 5, {color: rotas_cores[0], fillColor: "transparent"}).addTo(map);
		}
	}
}

map.on('click', function(e) {
    var popLocation = e.latlng;
    let p = 0.00002;
    let lat = popLocation.lat.toFixed(6);
    let lng = popLocation.lng.toFixed(6);
	console.log("["+lat+","+lng+"]");
	for (let i = 0; i < bus.length; i++) {
		console.log(bus[i].x-p+" <= "+lat);
		console.log(lat+" <= "+bus[i].x+p);
		if (bus[i].x-p <= lat && lat <= bus[i].x+p) {
			detalhar(i);
		}
	}
  	//L.circle(e.latlng, 5).addTo(map);

});


/*var popLocation= new L.LatLng(-42.8585,147.2468);
var popup = L.popup()
    .setLatLng(popLocation)
    .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    .openOn(map);
*/

function error() {
	if (err.code === 1) {
		alert("Batata");
	}
	else {
		alert("Tá bonito.");
	}
}

let bus = [];

let circulos = ["","","",""];
let rotas = [
	[
		[-25.936451,32.551734],
		[-25.936330,32.552034],
		[-25.936202,32.552201],
		[-25.935543,32.551863],
		[-25.935469,32.551573],
		[-25.935140,32.551208],
		[-25.934773,32.550715],
		[-25.934812,32.550500],
		[-25.934734,32.550307],
		[-25.934527,32.550205],
		[-25.934353,32.550226],
		[-25.934227,32.550366],
		[-25.934179,32.550538],
		[-25.934121,32.550656],
		[-25.934005,32.550833],
		[-25.930593,32.553982],
		[-25.930429,32.554067],
		[-25.929287,32.555135],
		[-25.921518,32.562404],
		[-25.918827,32.564882],
		[-25.917641,32.565236],
		[-25.909251,32.565440],
		[-25.905037,32.565536],
		[-25.904285,32.565440],
		[-25.899029,32.563745],
		[-25.893300,32.563670],
		[-25.892354,32.563852],
		[-25.884580,32.566502],
		[-25.883394,32.567049],
		[-25.881474,32.568026],
		[-25.880558,32.568047],
		[-25.880268,32.567983],
		[-25.875378,32.565708],
	],

	[
[-23.869070,35.383929],
[-23.869673,35.383991],
[-23.869839,35.382838],
[-23.870008,35.381810],
[-23.870094,35.381092],
[-23.871521,35.381712],
[-23.874515,35.382800],
[-23.875977,35.382918],
[-23.879970,35.382618],
[-23.880441,35.382661],
[-23.880764,35.382789],
[-23.881157,35.383004],
[-23.883744,35.385571],
[-23.885598,35.387867],
[-23.886128,35.388468],
[-23.886827,35.389109],
[-23.908353,35.402584],
[-23.910040,35.403185],
[-23.911868,35.403292],
[-23.915261,35.402799],
[-23.941752,35.398509],
[-23.945192,35.397971],
[-23.946477,35.397456],
[-23.954229,35.392486],
[-23.963716,35.386298],
[-24.014789,35.343199],
[-24.015841,35.342470],
[-24.016595,35.342191],
[-24.017419,35.342084],
[-24.025861,35.342538],
[-24.029305,35.342739],
[-24.030021,35.342642],
[-24.030677,35.342417],
[-24.031951,35.341408],
[-24.037429,35.335696],
[-24.039702,35.333265],
[-24.040691,35.332493],
[-24.046805,35.329242],
[-24.064566,35.320122],
[-24.069985,35.316035],
[-24.070847,35.315477],
[-24.071709,35.315112],
[-24.072610,35.314929],
[-24.088661,35.313415],
[-24.089874,35.313274],
[-24.090731,35.313360],
[-24.092509,35.313703],
[-24.094032,35.313905],
[-24.098618,35.313678],
[-24.103506,35.313403],
[-24.104290,35.313189],
[-24.104975,35.312846],
[-24.106013,35.311901],
[-24.107629,35.310238],
[-24.108471,35.308790],
[-24.108608,35.308178],
[-24.108697,35.307449],
[-24.108667,35.307031],
[-24.108530,35.306333],
[-24.102630,35.292635],
[-24.094990,35.275083],
[-24.094187,35.273752],
[-24.093658,35.273345],
[-24.088193,35.270727],
[-24.085665,35.269954],
[-24.084079,35.269825],
[-24.070777,35.272036],
[-24.033838,35.278130],
[-24.023176,35.280190],
[-24.011652,35.283537],
[-24.004556,35.286627],
[-24.001224,35.288000],
[-23.987736,35.289330],
[-23.979738,35.287871],
[-23.978600,35.288000],
[-23.963032,35.293708],
[-23.955542,35.293579],
[-23.954169,35.293536],
[-23.919142,35.301862],
[-23.906823,35.308514],
[-23.906195,35.309157],
[-23.903488,35.314479],
[-23.903214,35.315251],
[-23.902625,35.316153],
[-23.901880,35.316925],
[-23.889559,35.323620],
[-23.881083,35.328512],
[-23.877709,35.331559],
[-23.873078,35.336623],
[-23.872882,35.337782],
[-23.872568,35.339112],
[-23.872568,35.340443],
[-23.872411,35.341859],
[-23.871665,35.343533],
[-23.868447,35.346751],
[-23.867702,35.347867],
[-23.865464,35.349841],
[-23.853219,35.348082],
[-23.852238,35.347352],
[-23.831699,35.328941],
[-23.830560,35.326194],
[-23.829343,35.319929],
[-23.827969,35.317697],
	],

	[
		[-17.870816,36.888183],
		[-17.870685,36.887981],
		[-17.869790,36.888663],
		[-17.867534,36.890412],
		[-17.861386,36.895937],
		[-17.854360,36.902181],
		[-17.846536,36.909877],
		[-17.843372,36.913048],
		[-17.842560,36.914094],
		[-17.840965,36.916573],
		[-17.840373,36.917281],
		[-17.839413,36.918322],
		[-17.837723,36.920103],
		[-17.832184,36.925993],
		[-17.831551,36.926497],
		[-17.830672,36.926798],
		[-17.830284,36.926830],
		[-17.829712,36.926776],
		[-17.829150,36.926594],
		[-17.828691,36.926347],
		[-17.827414,36.925210],
		[-17.819723,36.918311],
		[-17.803206,36.903538],
		[-17.802379,36.903108],
		[-17.800887,36.902915],
		[-17.794533,36.904331],
		[-17.785053,36.906445],
		[-17.781600,36.907260],
		[-17.780803,36.907711],
		[-17.773069,36.913987],
		[-17.758176,36.925950],
		[-17.757202,36.926218],
		[-17.754760,36.926014],
		[-17.753666,36.925617],
		[-17.739640,36.915693],
		[-17.738904,36.914856],
		[-17.738496,36.913762],
		[-17.737520,36.910211],
		[-17.736891,36.909041],
		[-17.735915,36.908140],
		[-17.727711,36.902336],
		[-17.716459,36.894557],
		[-17.699333,36.884966],
		[-17.667032,36.866899],
		[-17.660980,36.861577],
		[-17.659382,36.859024],
		[-17.658124,36.857243],
		[-17.650937,36.851857],
		[-17.638954,36.843048],
		[-17.631818,36.837748],
		[-17.619046,36.828307],
		[-17.608064,36.820325],
		[-17.604658,36.819456],
		[-17.601151,36.818619],
		[-17.597213,36.816398],
		[-17.580240,36.806645],
		[-17.562198,36.796714],
		[-17.561339,36.796435],
		[-17.558225,36.796059],
		[-17.557120,36.796273],
		[-17.556261,36.796702],
		[-17.555279,36.797646],
		[-17.546400,36.807581],
		[-17.531876,36.824090],
		[-17.508895,36.850535],
		[-17.508220,36.851737],
		[-17.507974,36.852724],
		[-17.508015,36.853711],
		[-17.510716,36.868560],
		[-17.511863,36.874938],
		[-17.511843,36.876054],
		[-17.507321,36.890839],
		[-17.499034,36.918483],
		[-17.497616,36.932666],
		[-17.491298,36.951279],
		[-17.491196,36.952781],
		[-17.491462,36.955249],
		[-17.491830,36.956193],
		[-17.500466,36.972405],
		[-17.500650,36.973521],
		[-17.500405,36.974915],
		[-17.494756,36.988326],
		[-17.492372,36.994464],
		[-17.492270,36.996160],
		[-17.491779,36.998391],
		[-17.489507,37.001760],
		[-17.489302,37.002833],
		[-17.489364,37.003884],
		[-17.494661,37.018696],
		[-17.494600,37.021271],
		[-17.493904,37.022945],
		[-17.492963,37.024275],
		[-17.489177,37.029168],
		[-17.486560,37.030277],
		[-17.478394,37.030427],
		[-17.463578,37.035386],
		[-17.441634,37.062680],
		[-17.435902,37.062336],
		[-17.348784,37.049442],
		[-17.345015,37.049957],
		[-17.332398,37.055107],
		[-17.315519,37.051502],
		[-17.282739,37.048755],
		[-17.275062,37.042122],
		[-17.272603,37.041779],
		[-17.263096,37.044010],
		[-17.248014,37.033195],
		[-17.241387,37.031822],
		[-17.237124,37.028303],
		[-17.234993,37.026501],
		[-17.220400,37.018862],
		[-17.199399,36.989798],
	]
];

let rotas_cores = ["blue"];
let rotas_nomes = ["Maputo - Xai-Xai","Maputo - Inhambane","Quelimane - Nampula"];

let bus_cores = ["green","blue","purple"];
