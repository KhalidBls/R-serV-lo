//Nous allons utiliser la geolocalisation du navigateur
navigator.geolocation.getCurrentPosition(function(position){
	//Generation de la map mais avec fond gris
	var mymap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 11);

	//mettons lui un fond -> un tileLayer 
	L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{
	maxZoom:20,
	}).addTo(mymap);
});

