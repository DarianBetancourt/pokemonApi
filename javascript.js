let container=document.getElementById("containerPokemons");
let totalPokemons=document.getElementById("totalPokemons");
let body=document.body;


listPokemon();



body.addEventListener("click", eventoMultiple );



function eventoMultiple(){
    let cards=document.querySelectorAll(".card"); 
    cards.forEach(function(card) {
        card.addEventListener("click", mensaje);
    }); 
}



function mensaje(){
  alert("click");  
}

function getPokemon(url) {	
    let datos;
    fetch(url)
		.then(response => response.json())
		.then(data => {
        datos=data;
        container.innerHTML +=`<div class="card text-center m-1" style="width: 12rem;">
        <a href="#">
            <img src="${datos.sprites.front_default}" class="card-img-top" alt="${datos.name}" style="width:100px;">
        </a>
        <div class="card-body">
          <h5 class="card-title">${datos.name}</h5>
         
        </div>
        </div>`;
	})
    .catch(function(err) { 
        console.error(err);
    });
}

function listPokemon(){
    let urlPokemon;
    let list;
    fetch('https://pokeapi.co/api/v2/pokemon')
		.then(response => response.json())
		.then(data => {
            list=data;
            totalPokemons.innerHTML +=`${list.count}`;
            for(i=0;i<20;i++){
                urlPokemon=list.results[i].url;
                getPokemon(urlPokemon);
            }
	    })
    .catch(function(err) { 
        console.error(err);
    });
}

FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
});
