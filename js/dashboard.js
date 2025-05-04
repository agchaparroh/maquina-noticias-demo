// dashboard.js - Lógica actualizada del Dashboard

const state = {
    hechos: [],
    hilos: [],
    articulosProblemas: []
};

document.addEventListener('DOMContentLoaded', function() {
    state.hechos = mockData.hechos;
    state.hilos = mockData.hilosActivos;
    state.articulosProblemas = mockData.articulosProblemas;
    
    initProblemas();
    initFiltros();
    renderHilos();
});

// Inicializar problema plegable
function initProblemas() {
    const toggleBtn = document.getElementById('toggle-problemas');
    const content = document.getElementById('problemas-content');
    const arrow = document.getElementById('problemas-arrow');
    
    toggleBtn.addEventListener('click', () => {
        content.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
        
        if (!content.classList.contains('hidden')) {
            renderProblemas();
        }
    });
}

// Renderizar problemas
function renderProblemas() {
    const lista = document.getElementById('problemas-list');
    lista.innerHTML = '';
    
    state.articulosProblemas.forEach(problema => {
        const li = document.createElement('li');
        li.className = 'problema-item';
        li.innerHTML = `
            ${problema.titular}
            <a href="${problema.url}" target="_blank" class="ver-original">Ver original</a>
        `;
        lista.appendChild(li);
    });
}

// Inicializar filtros plegables
function initFiltros() {
    const toggleBtn = document.getElementById('toggle-filtros');
    const content = document.getElementById('filtros-content');
    const arrow = document.getElementById('filtros-arrow');
    
    toggleBtn.addEventListener('click', () => {
        content.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    });
    
    document.getElementById('aplicar-filtros').addEventListener('click', () => {
        // Simular aplicación de filtros
        renderHilos();
    });
}

// Renderizar hilos y hechos
function renderHilos() {
    const hilosList = document.getElementById('hilos-list');
    hilosList.innerHTML = '';
    
    // Agrupar hechos por hilo
    const hechosPorHilo = state.hechos.reduce((acc, hecho) => {
        if (hecho.hilo_vinculado) {
            const hiloId = hecho.hilo_vinculado.id;
            if (!acc[hiloId]) {
                acc[hiloId] = {
                    hilo: state.hilos.find(h => h.id === hiloId),
                    hechos: []
                };
            }
            acc[hiloId].hechos.push(hecho);
        }
        return acc;
    }, {});
    
    // Ordenar hilos por importancia de la noticia más importante
    const hilosOrdenados = Object.values(hechosPorHilo).sort((a, b) => {
        const maxImportanciaA = Math.max(...a.hechos.map(h => h.importancia));
        const maxImportanciaB = Math.max(...b.hechos.map(h => h.importancia));
        return maxImportanciaB - maxImportanciaA;
    });
    
    // Renderizar cada hilo
    hilosOrdenados.forEach(({ hilo, hechos }) => {
        const hiloBlock = document.createElement('div');
        hiloBlock.className = 'hilo-block';
        
        const hiloHeader = document.createElement('div');
        hiloHeader.className = 'hilo-header';
        hiloHeader.textContent = `${hilo.titulo}`;
        hiloBlock.appendChild(hiloHeader);
        
        // Ordenar hechos por fecha dentro del hilo
        const hechosOrdenados = hechos.sort((a, b) => 
            new Date(b.fecha_ocurrencia.inicio) - new Date(a.fecha_ocurrencia.inicio)
        );
        
        hechosOrdenados.forEach(hecho => {
            const hechoCard = createHechoCard(hecho);
            hiloBlock.appendChild(hechoCard);
        });
        
        hilosList.appendChild(hiloBlock);
    });
}

// Crear tarjeta de hecho
function createHechoCard(hecho) {
    const card = document.createElement('div');
    card.className = 'hecho-card mb-3 p-4 rounded';
    card.dataset.hechoId = hecho.id;
    
    // Contenido principal
    const contenido = document.createElement('div');
    contenido.className = 'flex justify-between items-start';
    
    const textoContainer = document.createElement('div');
    textoContainer.className = 'flex-1';
    
    // Texto del hecho con entidades como enlaces
    const textoElement = document.createElement('p');
    let textoConEnlaces = hecho.contenido;
    hecho.entidades_mencionadas?.forEach(entidad => {
        const regex = new RegExp(`(${entidad})`, 'gi');
        textoConEnlaces = textoConEnlaces.replace(regex, 
            `<a href="chat.html?hecho=${hecho.id}&entidad=$1" class="entity-link">$1</a>`
        );
    });
    textoElement.innerHTML = textoConEnlaces;
    textoContainer.appendChild(textoElement);
    
    // Fecha
    const fecha = document.createElement('div');
    fecha.className = 'text-xs text-gray-400 mt-1';
    fecha.textContent = formatDate(hecho.fecha_ocurrencia.inicio);
    textoContainer.appendChild(fecha);
    
    // Menciones
    const menciones = document.createElement('div');
    menciones.className = 'text-xs text-gray-400 mt-1';
    menciones.innerHTML = `
        <span class="menciones-link" data-hecho-id="${hecho.id}">
            menciones: ${hecho.articulos_relacionados?.length || 0}
        </span>
    `;
    
    // Event listener para mostrar popup
    menciones.querySelector('.menciones-link').addEventListener('click', e => {
        e.preventDefault();
        showMencionesPopup(hecho, e.target);
    });
    
    textoContainer.appendChild(menciones);
    
    // Indicador de importancia
    const importancia = document.createElement('div');
    importancia.className = 'ml-4 flex-shrink-0';
    const circulo = document.createElement('div');
    circulo.className = `w-3 h-3 rounded-full ${getImportanciaColor(hecho.importancia)}`;
    importancia.appendChild(circulo);
    
    contenido.appendChild(textoContainer);
    contenido.appendChild(importancia);
    
    card.appendChild(contenido);
    
    // Click en tarjeta para ir al chat
    card.addEventListener('click', () => {
        window.location.href = `chat.html?hecho=${hecho.id}`;
    });
    
    card.style.cursor = 'pointer';
    
    return card;
}

// Mostrar popup de menciones
function showMencionesPopup(hecho, target) {
    const modal = document.getElementById('menciones-modal');
    const lista = document.getElementById('menciones-list');
    lista.innerHTML = '';
    
    hecho.articulos_relacionados?.forEach(articulo => {
        const li = document.createElement('li');
        li.className = 'text-sm';
        li.innerHTML = `
            <span class="text-gray-600">${articulo.medio}:</span>
            <a href="${articulo.url}" target="_blank" class="entity-link ml-1">
                ${articulo.titular}
            </a>
        `;
        lista.appendChild(li);
    });
    
    // Posicionar popup
    const rect = target.getBoundingClientRect();
    const popup = modal.querySelector('.menciones-popup');
    popup.style.position = 'fixed';
    popup.style.top = `${rect.bottom + 5}px`;
    popup.style.left = `${rect.left}px`;
    
    modal.classList.remove('hidden');
    
    // Cerrar al hacer click fuera
    const closeHandler = e => {
        if (!popup.contains(e.target)) {
            modal.classList.add('hidden');
            document.removeEventListener('click', closeHandler);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', closeHandler);
    }, 0);
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'hoy';
    if (diffDays === 1) return 'ayer';
    if (diffDays < 5) return `hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Obtener color de importancia
function getImportanciaColor(importancia) {
    if (importancia <= 2) return 'importancia-1-2';
    if (importancia <= 4) return 'importancia-3-4';
    if (importancia <= 6) return 'importancia-5-6';
    if (importancia <= 8) return 'importancia-7-8';
    return 'importancia-9-10';
}
