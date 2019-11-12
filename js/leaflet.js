//Nous allons utiliser la geolocalisation du navigateur
navigator.geolocation.getCurrentPosition(function(position){
	//Generation de la map mais avec fond gris
	var mymap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

	//mettons lui un fond -> un tileLayer 
	L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{
	maxZoom:20,
	}).addTo(mymap);



	// UTILISON L'API JCDECAUX
	//ajaxGet  ----> fonction dans le fichier ajax.js
	ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=cergy-pontoise&apiKey=bde09ea11fef33327232c69bebab6569d6b275fd",function(reponse)
	{
		var stations=JSON.parse(reponse); // oN CONVERTIT LA REPONSE EN OBJET js
		
		for(var i = 0;i<stations.length;i++)  // Pour chaque station de velo on met sa position sur la map
		{
			var positionStation = L.marker([stations[i].position.lat,stations[i].position.lng]).addTo(mymap);
			// SI L'ETAT DE LA STATION EST "open"  
			if(stations[i].status === "OPEN"){
			positionStation.bindPopup("<b>Disponible</b> </br>" + stations[i].address +" </br> Plus d'info sur cette station sous la map");
			}
			else {positionStation.bindPopup("<b>Indisponible</b> </br>" + stations[i].address);}

		}
	});
});