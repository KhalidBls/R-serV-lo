class Carte {
	constructor(){
		

		navigator.geolocation.getCurrentPosition(this.generateMap);
	}
	
	generateMap(position){
		
		var mymap=L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
		L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{maxZoom:20}).addTo(mymap);

		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=cergy-pontoise&apiKey=bde09ea11fef33327232c69bebab6569d6b275fd",function(reponse)
		{
			var mappy = document.getElementById("mappy");
			var carte = document.getElementById("map");
			var content = document.createElement("div");
			
			var stations=JSON.parse(reponse); // oN CONVERTIT LA REPONSE EN OBJET js

			for(var i = 0;i<stations.length;i++)  // Pour chaque station de velo on met sa position sur la map
			{
				
				 var positionStation= L.marker([stations[i].position.lat,stations[i].position.lng]).addTo(mymap);



						positionStation.addEventListener("click",function(){
							
							carte.style.transition="transform 0.4s ease-in-out";
							carte.style.transform="translateX(-30px)";

							mappy.style.display="flex";
							mappy.appendChild(content);
							content.style.width="320px";
							content.style.backgroundColor="black";
							content.style.borderRadius="2%";
						});
			}
			
	});
	}
	
}