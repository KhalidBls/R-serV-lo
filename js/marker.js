class Marker {

    constructor(stations){
        this.stations=stations;
        this.carte = document.getElementById("map");
        this.mappy = document.getElementById("mappy");
        this.content = document.createElement("div");
        this.content.id = "content";
    }

    coordMarker(){
        this.coordonnees=[this.stations.position.lat,this.stations.position.lng];
        return this.coordonnees;
    }

    information(stations){
        this.carte.style.transition="transform 0.4s ease-in-out";
        this.carte.style.transform="translateX(-30px)";
        this.mappy.style.display="flex";
        if(stations.status === "OPEN")
            this.informationOuvert(stations);
        else 
            this.informationFermee(stations);
    }
    
    informationOuvert(stations){
        this.button = document.createElement("button");
        this.button.textContent = "Réserver un vélo";

        this.content.innerHTML="<b>STATION OUVERTE</b><br>"+"<p>"+stations.address+"</p>";
        this.content.innerHTML+="<p>"+"Places disponibles : "+stations.available_bike_stands;
        this.content.innerHTML+="Vélos disponibles : "+stations.available_bikes+"</p>"
        this.mappy.appendChild(this.content);
        if(stations.available_bikes>0){
            this.content.appendChild(this.button);
            this.button.addEventListener("click",function(){this.clickButton(stations)}.bind(this));
        }
    }

    informationFermee(stations){
        this.content.innerHTML="<b>STATION FERMEE</b><br>"+"<p>"+stations.address+"</p>";
        this.mappy.appendChild(this.content);
    }

    clickButton(stations){
        this.content.innerHTML = "<b>Réservation</b><br>"+stations.address;
        this.content.innerHTML+="<br>Vélos disponibles : "+stations.available_bikes+"<br>";
    }

}