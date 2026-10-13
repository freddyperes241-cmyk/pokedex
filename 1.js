const URL_BASE = "https://pokeapi.co/api/v2/pokemon/";

const inputBuscar = document.getElementById('buscar');
const btnBuscar = document.getElementById('btn-buscar');
const cartaPokemon = document.getElementById('carta-pokemon');
const mensajeError = document.getElementById('mensaje-error');

const numeroPokemon = document.getElementById('numero-pokemon');
const nombrePokemon = document.getElementById('nombre-pokemon');
const imagenPokemon = document.getElementById('imagen-pokemon');
const tiposPokemon = document.getElementById('tipos-pokemon');
const altura = document.getElementById('altura');
const peso = document.getElementById('peso');
const experiencia = document.getElementById('experiencia');

// Función para buscar Pokémon
async function buscarPokemon(nombre) {
    try {
        const respuesta = await fetch(URL_BASE + nombre.toLowerCase());
        if (!respuesta.ok) throw new Error("No encontrado");
        
        const datos = await respuesta.json();
        mostrarPokemon(datos);
    } catch (error) {
        mostrarError();
    }
}

// Mostrar los datos del Pokémon
function mostrarPokemon(datos) {
    cartaPokemon.classList.remove('oculto');
    mensajeError.classList.add('oculto');

    // Número con formato #001
    numeroPokemon.textContent = `#${String(datos.id).padStart(3, '0')}`;
    
    nombrePokemon.textContent = datos.name;
    
    // Imagen oficial
    imagenPokemon.src = datos.sprites.other['official-artwork'].front_default;
    
    // Altura y peso convertidos a unidades correctas
    altura.textContent = (datos.height / 10).toFixed(1);
    peso.textContent = (datos.weight / 10).toFixed(1);
    
    experiencia.textContent = datos.base_experience;

    // Tipos con colores
    tiposPokemon.innerHTML = '';
    datos.types.forEach(item => {
        const nombreTipo = item.type.name;
        const elementoTipo = document.createElement('span');
        elementoTipo.className = `tipo tipo-${nombreTipo}`;
        elementoTipo.textContent = nombreTipo;
        tiposPokemon.appendChild(elementoTipo);
    });
}

function mostrarError() {
    cartaPokemon.classList.add('oculto');
    mensajeError.classList.remove('oculto');
}

// Eventos
btnBuscar.addEventListener('click', () => {
    const valor = inputBuscar.value.trim();
    if (valor) buscarPokemon(valor);
});

inputBuscar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const valor = inputBuscar.value.trim();
        if (valor) buscarPokemon(valor);
    }
});

// Cargar un Pokémon al iniciar
buscarPokemon('pikachu');