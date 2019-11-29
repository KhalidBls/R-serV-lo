class Personne {

    constructor(){
        this.prenom = document.createElement("input");
        this.nom = document.createElement("input");
        this.finalButton = document.createElement("button");
        this.finalButton.textContent="Valider";
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ecrire = false;

        this.InitializeInputElement();
        this.initCanvas();
    }

    InitializeInputElement(){
        this.prenom.type="text";
        this.prenom.name="nom";
        this.prenom.required="required";
        this.prenom.placeholder="Entrez votre prénom";
        
        this.nom.type="text";
        this.nom.name="nom";
        this.nom.required="required";
        this.nom.placeholder="Entrez votre nom";
    }

    initCanvas(){
        this.canvas.width = 200;
        this.canvas.height = 120;

        this.canvas.addEventListener("mousedown",function(e){this.startPosition(e);}.bind(this));
        this.canvas.addEventListener("mouseup",function(){this.endPosition();}.bind(this));
        this.canvas.addEventListener("mousemove",function(e){this.dessine(e);}.bind(this));
    }

    startPosition(e){
        this.ecrire = true;
        this.dessine(e);                //règle le problème des"point"
    }

    endPosition(){
        this.ecrire = false;
        this.ctx.beginPath();           //détache le dernier point du nouveau
    }

    dessine(e){
        if(!this.ecrire) return;
        var pos = this.getElementPosition(e,this.canvas);
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = "round";
        this.ctx.lineTo(pos.x,pos.y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x,pos.y);
    }

    getElementPosition(event, element) {                //fct qui recupere la pos dans le canvas
        var bounds = element.getBoundingClientRect();         
        return {
           x: event.clientX - bounds.left,
           y: event.clientY - bounds.top
        };
    }

}