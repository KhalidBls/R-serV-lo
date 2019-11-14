//****************le slideeeeeeer   (TEST DE L'OBJET EN JS)********************


class SlideTest {

	constructor(){
		this.count = 1;													//Le counter pour modifier la valeur de 630
		this.slidesT = document.getElementById("slides");					//On cible le slides (il y a les images dedans)
		this.imgSlider = document.getElementsByClassName("img-slider");		//On fait un tableau avec nos images dedans
		this.prevBtn = document.getElementById("prevBtn");	//On cible nos flèches
		this.nextBtn = document.getElementById("nextBtn");

		this.slidesT.style.transform="translateX("+ (-630 * this.count) +"px)";
		this.nextBtn.addEventListener("click", function(){this.moveRight()}.bind(this));
		this.prevBtn.addEventListener("click", function(){this.moveLeft()}.bind(this));
		this.slidesT.addEventListener("transitionend",function(){this.infinite()}.bind(this)); // faire un slider "illimités"
	}



	moveRight(){
		this.slidesT.style.transition="transform 0.4s ease-in-out";
		this.count++;
		this.slidesT.style.transform="translateX("+ (-630 * this.count) +"px)";
	}
	moveLeft(){
		this.slidesT.style.transition="transform 0.4s ease-in-out";
		this.count--;
		this.slidesT.style.transform="translateX("+ (-630 * this.count) +"px)";
	}
	infinite(){
		if(this.imgSlider[this.count].id === "lastClone"){     	//Si l'id de l'image en cours est \"lastClone\"
			this.slidesT.style.transition = "none";				//	On enlève la transition si non effet très NUL
			this.count = this.imgSlider.length - 2;				//Pour revenir à la première image (A REVOIR SA)
			this.slidesT.style.transform="translateX("+ (-630 * this.count) +"px)"; //Pour le translate dans le bon sens
		}
	 	if(this.imgSlider[this.count].id === "firstClone"){    
			this.slidesT.style.transition = "none";					
			this.count = this.imgSlider.length - this.count;				//Pour revenir à la première image (A REVOIR SA)
			this.slidesT.style.transform="translateX("+ (-630 * this.count) +"px)"; //Pour le translate dans le bon sens
		}
	}
}