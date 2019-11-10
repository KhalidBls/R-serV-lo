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

var SlideTest = {
	count : 1,														//Le counter pour modifier la valeur de 630
	slidesT : document.getElementById("slides"),					//On cible le slides (il y a les images dedans)
	//imgSlider : document.getElementsByClassName("img-slider"),		//On fait un tableau avec nos images dedans
	prevBtn : document.querySelector("#prevBtn"),		//On cible nos flèches
	nextBtn : document.querySelector("#nextBtn"),

	moveRight : function(){
		this.slidesT.style.transition="transform 0.4s ease-in-out";
		this.count++;
		this.slidesT.style.transform="translateX("+ (-630 * this.count) +"px)";
	},
	moveLeft : function(){
		this.slidesT.style.transition="transform 0.4s ease-in-out";
		this.count--;
		this.slidesT.style.transform="translateX("+ (-630 * this.count) +"px)";
	}
}


// Test au clique du bouton

SlideTest.slidesT.style.transform="translateX("+ (-630 * SlideTest.count) +"px)";

nextBtn.addEventListener("click", SlideTest.moveRight());
prevBtn.addEventListener("click", SlideTest.moveLeft());

