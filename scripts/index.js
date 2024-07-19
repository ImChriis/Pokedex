let offset = 0; // Variable para manejar la paginación de la API

// Función para obtener los Pokémon de la API
function getPokemons() {
  // Realiza una solicitud GET a la API de Pokémon
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
    .then((response) => {
      const pokemonList = response.data.results; // Lista de Pokémon obtenida de la respuesta

      // Mapea la lista de Pokémon para obtener detalles adicionales de cada uno
      const requests = pokemonList.map((pokemon) => {
        const pokemonIndex = pokemon.url.split("/").filter(Boolean).pop(); // Obtiene el ID del Pokémon de la URL
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`)
          .then((detailsResponse) => {
            const types = detailsResponse.data.types
              .map((typeInfo) => typeInfo.type.name) // Obtiene los tipos del Pokémon
              .join(", "); // Junta los tipos en una cadena
            const imageUrl = detailsResponse.data.sprites.front_default; // Obtiene la URL de la imagen del Pokémon

            // Devuelve el HTML generado para cada Pokémon
            return `
              <div class="content">
                <div class="stats">
                  <p class="id">${pokemonIndex}</p> 
                  <p class="type">${types}</p>
                </div>
                <div class="image">
                  <img src="${imageUrl}" alt="Imagen de ${pokemon.name}"></img>
                </div>
                <div class="info">
                  <p class="name">${pokemon.name}</p>
                </div>
                <div class="more">
                  <a class="btn" href="./pokemon.html?code=${pokemonIndex}">Ver Más</a>
                </div>
              </div>
            `;
          })
          .catch((error) => {
            console.error("Error al obtener los detalles del Pokémon:", error); // Manejo de errores
          });
      });

      // Espera hasta que todas las solicitudes se completen
      Promise.all(requests).then((results) => {
        // Añade el contenido generado a #card en orden
        const cardContainer = document.getElementById("card");
        results.forEach((htmlContent) => {
          cardContainer.innerHTML += htmlContent; // Agrega el contenido HTML de cada Pokémon al contenedor
        });
      });

      offset += 20; // Incrementa el offset para la próxima solicitud
    })
    .catch((error) => {
      console.error("Error al obtener la lista de Pokémon:", error); // Manejo de errores
    });
}

// Añade un evento al campo de búsqueda para redirigir al usuario cuando presione Enter
document.getElementById("search").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    var pokemonIndex = document.getElementById("search").value; // Obtiene el valor del campo de búsqueda
    if (!pokemonIndex) { // Verifica si el campo de búsqueda está vacío
      alert("Por favor, ingrese un número de Pokémon."); // Muestra una alerta si el campo está vacío
    } else {
      window.location.href = "/pokemon.html?code=" + pokemonIndex; // Redirige a la página del Pokémon correspondiente
    }
  }
});

// Llama a getPokemons() al cargar la página para obtener los primeros 20 Pokémon
window.onload = getPokemons;
