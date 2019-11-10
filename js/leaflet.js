//Nous allons utiliser la geolocalisation du navigateur
navigator.geolocation.getCurrentPosition(function(position){
	//Generation de la map mais avec fond gris
	var mymap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 11);

	//mettons lui un fond -> un tileLayer 
	L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{
	maxZoom:20,
	}).addTo(mymap);
});

//le slideeeeeeer************************************************


let count = 1;		//Le counter pour modifier la valeur de 630

//On cible le slides (il y a les images dedans)
var slides = document.getElementById("slides");

//On fait un tableau avec nos images dedans
var imgSlider = document.getElementsByClassName("img-slider");

//On cible nos flèches
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

// Test au clique du bouton

slides.style.transform="translateX("+ (-630 * count) +"px)";

nextBtn.addEventListener("click", function(){
	slides.style.transition="transform 0.4s ease-in-out";
	count++;
	slides.style.transform="translateX("+ (-630 * count) +"px)";
	
});

prevBtn.addEventListener("click", function(){
	slides.style.transition="transform 0.4s ease-in-out";
	count--;
	slides.style.transform="translateX("+ (-630 * count) +"px)";
});

