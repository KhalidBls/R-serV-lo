class Reservation {

    constructor() {
        this.timer = document.createElement("p");
        this.monStockageL = localStorage;
        this.monStockageS = sessionStorage;
        this.infoBlock = document.createElement("div");
        this.infoBlock.id = "infoBlock";
        this.chargementPage();
    }
    preremplir() { 
        document.querySelectorAll("input")[0].value = this.monStockageL.getItem('prenom');
        document.querySelectorAll("input")[1].value = this.monStockageL.getItem('nom');
    }
    chrono(duree) { 
        
        this.decompte = setInterval(function () {
            if (duree < 0) {
                this.monStockageS.setItem('statusReservation', 'false');
            } else {
                this.monStockageS.setItem('statusReservation', 'true')
                this.minute = Math.floor(duree / 60);
                this.sec = Math.floor(duree % 60);
                duree--;
                this.timer.innerText = this.minute + "min " + this.sec + "s";
            }
        }.bind(this), 1000);
    }

    infoReservation(stations) { 
        clearInterval(this.decompte);
        this.monStockageS.clear();
        var prenom = document.querySelectorAll("input")[0].value;
        var nom = document.querySelectorAll("input")[1].value;

        this.monStockageL.setItem('prenom', prenom);
        this.monStockageL.setItem('nom', nom);

        this.minute = 20;
        this.sec = 0;
        this.timer.innerText = this.minute + "min " + this.sec + "s";

        if (document.body.querySelector("#infoBlock")) {document.body.removeChild(document.body.querySelector("#infoBlock"))};
        document.body.insertBefore(this.infoBlock, document.querySelector("footer"));
        this.infoBlock.innerHTML = "<b>Votre Réservation</b><br>"
        this.infoBlock.innerHTML += "Vélo Réservé à la station " + stations.address;
        this.infoBlock.innerHTML += " au nom de " + "<b>" + prenom + " " + nom + "</b>";
        this.infoBlock.innerHTML += "<br><b>Temps restants: </b><br>";
        this.infoBlock.appendChild(this.timer);
        this.dateFin = (Date.now() / 1000) + 1200;
        this.monStockageS.setItem('duree', this.dateFin);
        this.chrono(this.dateFin - (Date.now() / 1000));

        this.monStockageS.setItem('address', stations.address);
    }

    chargementPage() { 
        if (this.monStockageS.getItem('duree') > (Date.now()/1000) && this.monStockageS.getItem('statusReservation') === 'true' && !document.querySelector("#infoBlock")) {
            document.body.insertBefore(this.infoBlock, document.querySelector("footer"));
            this.infoBlock.innerHTML = "<b>Votre Réservation</b><br>"
            this.infoBlock.innerHTML += "Vélo Réservé à la station " + this.monStockageS.getItem('address');
            this.infoBlock.innerHTML += " au nom de " + "<b>" + this.monStockageL.getItem('prenom') + " " + this.monStockageL.getItem('nom') + "</b>";
            this.infoBlock.innerHTML += "<br><b>Temps restants: </b><br>";
            this.infoBlock.appendChild(this.timer);
            this.chrono(this.monStockageS.getItem('duree')-(Date.now()/1000));
        }
    }
}