class Marker {

    constructor(stations){
        this.stations=stations;
        this.carte = document.getElementById("map");
        this.mappy = document.getElementById("mappy");
        this.content = document.createElement("div");
		this.content.id = "content"
    }

    coordMarker(){
        this.coordonnees=[this.stations.position.lat,this.stations.position.lng];
        return this.coordonnees;
    }

    information(stations){
        this.content.innerHTML=stations.address;
        this.carte.style.transition="transform 0.4s ease-in-out";
        this.carte.style.transform="translateX(-30px)";
        this.mappy.style.display="flex";
		this.mappy.appendChild(this.content);
    }

}