class Marker {

    constructor(stations){
        this.stations=stations;
        this.carte = document.getElementById("map");
        this.mappy = document.getElementById("mappy");
        this.content = document.createElement("div");
        this.content.id = "content";
        this.timer=document.createElement("p");
        this.monStockageL = localStorage;
        this.monStockageS = sessionStorage;

        this.infoBlock = document.createElement("div");
        this.infoBlock.id = "infoBlock"; 
        this.test();
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
        this.content.innerHTML+="<br>Vélos disponibles : "+stations.available_bikes+"<br><br>";
        var personne = new Personne();
        this.content.appendChild(personne.prenom);
        this.content.appendChild(personne.nom);
        this.content.innerHTML+="<br><br>Signature : <br>";
        this.content.appendChild(personne.canvas);
        this.content.appendChild(personne.finalButton);
        personne.finalButton.addEventListener("click",function(){this.infoReservation(stations)}.bind(this));
        if(this.monStockageL) this.preremplir();
    }

    infoReservation(stations){
        clearInterval(this.decompte);
        this.monStockageS.clear();
        var prenom = document.querySelectorAll("input")[0].value;
        var nom = document.querySelectorAll("input")[1].value;

        this.monStockageL.setItem('prenom',prenom);
        this.monStockageL.setItem('nom',nom);

        this.minute=20;
        this.sec=0;
        this.timer.innerText = this.minute + "min " + this.sec + "s";

        if(this.infoBlock) document.body.removeChild(document.body.querySelector("#infoBlock"));
        document.body.insertBefore(this.infoBlock,document.querySelector("footer"));
        this.infoBlock.innerHTML = "<b>Votre Réservation</b><br>"
        this.infoBlock.innerHTML += "Vélo Réservé à la station "+ stations.address;
        this.infoBlock.innerHTML += " au nom de " + "<b>"+prenom + " " + nom +"</b>";
        this.infoBlock.innerHTML +="<br><b>Temps restants: </b><br>";
        this.infoBlock.appendChild(this.timer);
        this.chrono(1200);

        this.monStockageS.setItem('address',stations.address);
    }

    chrono(duree){
        
        this.decompte = setInterval(function(){
            if(duree<=0){this.monStockageS.setItem('statusReservation','false');}
            if(duree>0){this.monStockageS.setItem('statusReservation','true');}
            this.minute=Math.floor(duree/60);
            this.sec=Math.floor(duree%60);
            duree--;
            this.timer.innerText = this.minute + "min " + this.sec + "s";
            this.monStockageS.setItem('duree',duree);
        }.bind(this),1000);
    }

    preremplir(){
        document.querySelectorAll("input")[0].value = this.monStockageL.getItem('prenom');
        document.querySelectorAll("input")[1].value = this.monStockageL.getItem('nom');
    }
    
    test(){
        if(this.monStockageS.getItem('duree')<1200 && this.monStockageS.getItem('statusReservation')==='true' && !document.querySelector("#infoBlock"))
        {
            document.body.insertBefore(this.infoBlock,document.querySelector("footer"));
            this.infoBlock.innerHTML = "<b>Votre Réservation</b><br>"
            this.infoBlock.innerHTML += "Vélo Réservé à la station "+ this.monStockageS.getItem('address');
            this.infoBlock.innerHTML += " au nom de " + "<b>"+this.monStockageL.getItem('prenom')+ " " + this.monStockageL.getItem('nom') +"</b>";
            this.infoBlock.innerHTML +="<br><b>Temps restants: </b><br>";
            this.infoBlock.appendChild(this.timer);
            this.chrono(this.monStockageS.getItem('duree'));
        }
    }

}
