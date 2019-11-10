//le slideeeeeeer************************************************


class SlideTest {

	constructor(){
	this.count = 1,														//Le counter pour modifier la valeur de 630
	this.slidesT = document.getElementById("slides");					//On cible le slides (il y a les images dedans)
	//imgSlider : document.getElementsByClassName("img-slider"),		//On fait un tableau avec nos images dedans
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
}

// le code commence ici 

const monSlide = new SlideTest();

monSlide.slidesT.style.transform="translateX("+ (-630 * monSlide.count) +"px)";

monSlide.nextBtn.addEventListener("click", function(){monSlide.moveRight()});
monSlide.prevBtn.addEventListener("click", function(){monSlide.moveLeft()});