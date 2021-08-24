let container=document.getElementById("containerPokemons");
let totalPokemons=document.getElementById("totalPokemons");
let body=document.body;
let arrayPokemons=[];
let btnSearch=document.getElementById("btnSearch");

listPokemon();
body.addEventListener("click", eventoMultiple );
window.addEventListener("scroll", parallax, false);
btnSearch.addEventListener("click",(event)=>{
    event.preventDefault();
    let search=document.getElementById("inputSearch");
    searchPokemon(search.value);
})

function eventoMultiple(){
    let cards=document.querySelectorAll(".card"); 
    cards.forEach(function(card) {
        card.addEventListener("click", mensaje);
        card.addEventListener("mouseover",()=>{
            let indice = arrayPokemons.findIndex(pokemon => pokemon.name === card.id);
           
        })
    }); 
}

function girarImg(pokemon){
    let id="img-"+pokemon.name;
    let img=document.getElementById(id);
    setTimeout(function(){
        img.src=pokemon.sprites.back_default;    
    },500);
    setTimeout(function(){
        img.src=pokemon.sprites.front_default;    
    },500);
    
}


function mensaje(){
  alert("click");  
}


function searchPokemon(name){
    fetch("https://pokeapi.co/api/v2/pokemon/"+name)
		.then(response => response.json())
		.then(data => {
            datos=data;
            container.innerHTML=`<div><button class="btn btn-info w-200 back-gradient f-pokemon" onclick=listPokemon()>listar todos</button><div><div id="${datos.name}" class="flip card text-center m-1" style="width: 12rem;height: 12rem;">
                <div class="flip-1 text-center" style="text-align: center;">
                    <h5 class="card-title text-center">${datos.name}</h5>
                    <img id="img-${datos.name}" src="${datos.sprites.front_default}" class="card-img-top " alt="${datos.name}" style="width:100px;">
                </div>
                <img id="img-${datos.name}" src="${datos.sprites.back_default}" class="card-img-top flip-2" alt="${datos.name}" style="width:100px;">
                
            
            <div class="card-body">
            
            
            </div>
            </div>`;
            arrayPokemons[arrayPokemons.length]=datos;
            document.querySelectorAll(".w-50").forEach(element=>element.style.display="none");
        })
        .catch(function(err) { 
            console.error(err);
        });

}

function getPokemon(url) {	
    let datos;
    fetch(url)
		.then(response => response.json())
		.then(data => {
            datos=data;
            container.innerHTML +=`<div id="${datos.name}" class="flip card text-center m-1" style="width: 12rem;height: 12rem;">
                <div class="flip-1 text-center" style="text-align: center;">
                    <h5 class="card-title text-center">${datos.name}</h5>
                    <img id="img-${datos.name}" src="${datos.sprites.front_default}" class="card-img-top " alt="${datos.name}" style="width:100px;">
                </div>
                <img id="img-${datos.name}" src="${datos.sprites.back_default}" class="card-img-top flip-2" alt="${datos.name}" style="width:100px;">
                
            
            <div class="card-body">
            
            
            </div>
            </div>`;
            arrayPokemons[arrayPokemons.length]=datos;
        })
        .catch(function(err) { 
            console.error(err);
        });
}

function listPokemon(){
    let urlPokemon;
    let list;
    document.querySelectorAll(".w-50").forEach(element=>element.style.display="");
    container.innerHTML="";
    fetch('https://pokeapi.co/api/v2/pokemon')
		.then(response => response.json())
		.then(data => {
            list=data;
            totalPokemons.innerHTML=`${list.count}`;
            for(i=0;i<20;i++){
                urlPokemon=list.results[i].url;
                getPokemon(urlPokemon);
            }
              
	    })
    .catch(function(err) { 
        console.error(err);
    });
}


function parallax(){
			// Declarando as var.
			var layer_2 = document.getElementById('layer_2');
			// Aplicando a posição
			layer_2.style.top = 100-(window.pageYOffset/3)+'px';
		}
		