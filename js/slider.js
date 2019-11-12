//****************le slideeeeeeer   (TEST DE L'OBJET EN JS)********************


class SlideTest {

	constructor(){
	this.count = 1,														//Le counter pour modifier la valeur de 630
	this.slidesT = document.getElementById("slides");					//On cible le slides (il y a les images dedans)
	this.imgSlider = document.getElementsByClassName("img-slider"),		//On fait un tableau avec nos images dedans
	this.prevBtn = document.querySelector("#prevBtn");		//On cible nos flèches
	this.nextBtn = document.querySelector("#nextBtn");
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
		if(this.imgSlider[this.count].id === "lastClone"){     	//Si l'id de l'image en cours est \"lastClone
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



// le code commence ici   une sorte de main()  où on va appeler nos methodes

const monSlide = new SlideTest();

monSlide.slidesT.style.transform="translateX("+ (-630 * monSlide.count) +"px)";
monSlide.nextBtn.addEventListener("click", function(){monSlide.moveRight()});
monSlide.prevBtn.addEventListener("click", function(){monSlide.moveLeft()});
// faire un slider "illimités"
monSlide.slidesT.addEventListener("transitionend",function(){monSlide.infinite()});

