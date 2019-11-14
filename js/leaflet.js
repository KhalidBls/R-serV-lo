class Carte {
	constructor(){
		



		navigator.geolocation.getCurrentPosition(this.generateMap);
	}
	
	generateMap(position){
		var mymap=L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
		L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{maxZoom:20,}).addTo(mymap);
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=cergy-pontoise&apiKey=bde09ea11fef33327232c69bebab6569d6b275fd",function(reponse)
	{
		var stations=JSON.parse(reponse); // oN CONVERTIT LA REPONSE EN OBJET js
		
		for(var i = 0;i<stations.length;i++)  // Pour chaque station de velo on met sa position sur la map
		{
			//********************** Le texte du cadre
			var text = "<b>Disponible</b> </br>" + stations[i].address;
			text+= "</br>Places : " + stations[i].bike_stands;
			text+="</br> Vélos disponibles : " + stations[i].available_bikes;
			//*******************************  

			var positionStation = L.marker([stations[i].position.lat,stations[i].position.lng]).addTo(mymap);

			// SI L'ETAT DE LA STATION EST "open"  
			if(stations[i].status === "OPEN"){
			var button=document.createElement("button");
			button.textContent="Réserver un vélo";
			positionStation.bindPopup(text + "</br></br>" +button.outerHTML);

			button.addEventListener("click",function(){alert("ok");});
			}
			else {positionStation.bindPopup("<b>Indisponible</b> </br>" + stations[i].address);}
		}
			
	});
	}

}




/********************************************************************************************************* 



	// UTILISON L'API JCDECAUX
	//ajaxGet  ----> fonction dans le fichier ajax.js
	ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=cergy-pontoise&apiKey=bde09ea11fef33327232c69bebab6569d6b275fd",function(reponse)
	{
		var stations=JSON.parse(reponse); // oN CONVERTIT LA REPONSE EN OBJET js
		
		for(var i = 0;i<stations.length;i++)  // Pour chaque station de velo on met sa position sur la map
		{
			//********************** Le texte du cadre
			var text = "<b>Disponible</b> </br>" + stations[i].address;
			text+= "</br>Places : " + stations[i].bike_stands;
			text+="</br> Vélos disponibles : " + stations[i].available_bikes;
			//*******************************  

			var positionStation = L.marker([stations[i].position.lat,stations[i].position.lng]).addTo(mymap);

			// SI L'ETAT DE LA STATION EST "open"  
			if(stations[i].status === "OPEN"){
			var button=document.createElement("button");
			button.textContent="Réserver un vélo";
			positionStation.bindPopup(text + "</br></br>" +button.outerHTML);

			button.addEventListener("click",function(){alert("ok");});
			}
			else {positionStation.bindPopup("<b>Indisponible</b> </br>" + stations[i].address);}
		}
			
	});
}

*/