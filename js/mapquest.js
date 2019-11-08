L.mapquest.key = 'WGaKmNrnZnoRuvHEJ3hPCtDEHWAe7EKL';  //MA CLEF DE L'API MAPQUEST

function success(pos) {
    var crd = pos.coords;
  
    //MES TEST DISPONIBLE DANS LA COSOLE
    console.log('Votre position actuelle est :');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude : ${crd.longitude}`);
    console.log(`La précision est de ${crd.accuracy} mètres.`);
    /*********************/
  
// 'map' refers to a <div> element with the ID map
L.mapquest.map('map', {
    center: [crd.latitude.toFixed(4), crd.longitude.toFixed(4)],   //LE toFixed(4) car elle prend 4 chiffre apres la virgule
    layers: L.mapquest.tileLayer('map'),
    zoom: 11
  });
}

function error(err) {
    console.warn(`ERREUR (${err.code}): ${err.message}`);
}



//La méthode Geolocation.getCurrentPosition() donne la position actuelle de l'appareil
navigator.geolocation.getCurrentPosition(success,error);
