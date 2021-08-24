let container=document.getElementById("containerPokemons");
let totalPokemons=document.getElementById("totalPokemons");
let body=document.body;
let arrayPokemons=[];

listPokemon();



body.addEventListener("click", eventoMultiple );



function eventoMultiple(){
    let cards=document.querySelectorAll(".card"); 
    cards.forEach(function(card) {
        card.addEventListener("click", mensaje);
        card.addEventListener("mouseover",()=>{
            let indice = arrayPokemons.indexOf(card.id);
            girarImg(arrayPokemons[indice]);
        })
    }); 
}

function girarImg(pokemon){
    let id="img-"+pokemon.name;
    let img=document.getElementById(id);
    setTimeout(function(){
        img.src=pokemon.sprites.front_default;    
    },1000);
    setTimeout(function(){
        img.src=pokemon.sprites.back_default;    
    },1000);
    
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
        container.innerHTML +=`<div id="${datos.name}" class="card text-center m-1" style="width: 12rem;">
        <a href="#">
            <img id="img-${datos.name}" src="${datos.sprites.front_default}" class="card-img-top" alt="${datos.name}" style="width:100px;">
        </a>
        <div class="card-body">
          <h5 class="card-title">${datos.name}</h5>
         
        </div>
        </div>`;
        return datos;
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
                arrayPokemons[i]=getPokemon(urlPokemon);
            }
              
	    })
    .catch(function(err) { 
        console.error(err);
    });
}
