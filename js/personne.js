class Personne {
    constructor(){
    this.prenom = document.createElement("input");
    this.nom = document.createElement("input");
    this.signature = document.createElement("canvas");
    this.InitializeInputElement();
    this.gererSignature();
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

    gererSignature(){
        var ctx = this.signature.getContext("2d");
        ctx.lineWidth = "1";
        ctx.strokeStyle = "black";
        
    }
}