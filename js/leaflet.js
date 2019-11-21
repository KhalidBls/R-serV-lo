class Carte {
	constructor(){
		this.urlAPI="https://api.jcdecaux.com/vls/v1/stations?contract=cergy-pontoise&apiKey=bde09ea11fef33327232c69bebab6569d6b275fd";
		this.marker=[];
		this.button=[];

		navigator.geolocation.getCurrentPosition(this.generateMap.bind(this));
	}


	generateMap(position){

		this.mymap=L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
		L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{maxZoom:20}).addTo(this.mymap);
		this.request();
	}

	request(){
		ajaxGet(this.urlAPI, function(reponse)
		{
			this.stations=JSON.parse(reponse); // oN CONVERTIT LA REPONSE EN OBJET js
			for(let i = 0;i<this.stations.length;i++)  // Pour chaque station de velo on met sa position sur la map
			{
				var monMarker = new Marker(this.stations[i]);
				this.marker[i]=L.marker(monMarker.coordMarker()).addTo(this.mymap);
				this.marker[i].addEventListener("click",function(){monMarker.information(this.stations[i])}.bind(this));
			}	
	}.bind(this));
	}
}