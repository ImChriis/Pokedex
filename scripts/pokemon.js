// Función asíncrona para mostrar los detalles de un Pokémon
async function showPokemon() {
  // Obtiene los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code"); // Obtiene el valor del parámetro "code"
  console.log(code); // Imprime el código del Pokémon en la consola

  // Realiza una solicitud GET a la API de Pokémon usando el código obtenido
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${code}`);
  const data = response.data; // Almacena los datos de la respuesta
  console.log(data); // Imprime los datos del Pokémon en la consola

  const pokemon = response.data; // Almacena los datos del Pokémon

  // Actualiza el contenido del elemento con ID "name" con el nombre del Pokémon
  document.getElementById("name").innerHTML = pokemon.name;

  // Obtiene los elementos de imagen del DOM
  let imageFront = document.getElementById("front");
  let imageBack = document.getElementById("back");

  // Actualiza las fuentes de las imágenes del Pokémon
  imageFront.src = data.sprites.front_default;
  imageBack.src = data.sprites.back_default;

  // Obtiene los elementos de imagen para las versiones shiny del Pokémon
  let imageFrontShiny = document.getElementById("frontShiny");
  let imageBackShiny = document.getElementById("backShiny");

  // Actualiza las fuentes de las imágenes shiny del Pokémon
  imageFrontShiny.src = data.sprites.front_shiny;
  imageBackShiny.src = data.sprites.back_shiny;

  // Actualiza la altura y el peso del Pokémon
  document.getElementById("height").innerHTML = pokemon.height + "m";
  document.getElementById("weight").innerHTML = pokemon.weight + "kg";

  // Obtiene la cantidad de movimientos del Pokémon
  let lengthmoves = data.moves.length;

  // Recorre todos los movimientos y los muestra en el elemento con ID "movements"
  for (var i = 0; i < lengthmoves; i++) {
    var output = data.moves[i].move.name; // Obtiene el nombre del movimiento
    document.getElementById("movements").innerHTML +=
      (i + 1) + ". " + output + "<br>"; // Añade el nombre del movimiento al contenido
  }

  // Obtiene la cantidad de habilidades del Pokémon
  let lengthabilities = data.abilities.length;

  // Recorre todas las habilidades y las muestra en el elemento con ID "abilities"
  for (var i = 0; i < lengthabilities; i++) {
    var output2 = data.abilities[i].ability.name; // Obtiene el nombre de la habilidad
    document.getElementById("abilities").innerHTML +=
      (i + 1) + ". " + output2 + "<br>"; // Añade el nombre de la habilidad al contenido
  }
}
