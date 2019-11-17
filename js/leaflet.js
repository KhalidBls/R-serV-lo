class Carte {
	constructor(){
		this.urlAPI="https://api.jcdecaux.com/vls/v1/stations?contract=cergy-pontoise&apiKey=bde09ea11fef33327232c69bebab6569d6b275fd";
		this.mappy = document.getElementById("mappy");
		this.carte = document.getElementById("map");
		this.content = document.createElement("div");
		this.button = document.createElement("button");
		this.button.textContent="Réservez votre vélo";
		this.button.style.padding="5px 5px";

		navigator.geolocation.getCurrentPosition(this.generateMap.bind(this));
	}


	generateMap(position){

		this.mymap=L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
		L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{maxZoom:20}).addTo(this.mymap);
		this.request();
	}

	request(){
		ajaxGet(this.urlAPI,function(reponse)
		{
			this.stations=JSON.parse(reponse); // oN CONVERTIT LA REPONSE EN OBJET js

			for(let i = 0;i<this.stations.length;i++)  // Pour chaque station de velo on met sa position sur la map
			{


				this.button[i] = document.createElement("button");
				this.button[i].textContent="Réservez votre vélo";
				this.button[i].style.padding="5px 5px";

				if(this.stations[i].status === "OPEN"){
					this.textPopup = "<b>STATION OUVERTE</b> </br>" +this.stations[i].address  +"<br/>Places disponibles : "+this.stations[i].available_bike_stands;
					this.textPopup+="</br> Vélos disponibles : "+this.stations[i].available_bikes;
				}
				this.markers = [];
				this.coordonnees = [];
				
				this.coordonnees[i]=[this.stations[i].position.lat,this.stations[i].position.lng];

				this.coordonnees.forEach(function(coords){
					this.marker=L.marker(coords).addTo(this.mymap);
					this.markers[i]=this.marker;
				}.bind(this));

				this.markers[i].bindPopup(this.textPopup);

				this.markers[i].addEventListener("click",function(e){

					

					this.content.innerHTML=e.target._popup._content+"<br/><br/>";
					this.content.appendChild(this.button[i]);

					this.button[i].addEventListener("click",function(){alert("ok");});

					this.content.style.paddingTop="40px";
					this.content.style.lineHeight="30px";

					this.carte.style.transition="transform 0.4s ease-in-out";
					this.carte.style.transform="translateX(-30px)";
	
					this.mappy.style.display="flex";
					this.mappy.appendChild(this.content);
					this.content.style.width="320px";
					this.content.style.backgroundColor="black";
					this.content.style.borderRadius="2%";
				}.bind(this));	
			}	
	}.bind(this));
	}
	
}