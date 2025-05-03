// dashboard.js - Lógica para el Dashboard de Revisión

// Estado global de la aplicación
const state = {
    hechos: [],
    hilos: [],
    articulosProblemas: [],
    paginaActual: 1,
    porPagina: 3, // Reducido para demo, normalmente sería 20
    totalPaginas: 0,
    hechoSeleccionado: null, // Para modales
    entidadSeleccionada: null, // Para modal de notas
    paisesTags: [],
    etiquetasTags: []
};

// Función principal de inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos simulados
    state.hechos = mockData.hechos || [];
    state.hilos = mockData.hilosActivos || [];
    state.articulosProblemas = mockData.articulosProblemas || [];
    
    // Calcular total de páginas
    state.totalPaginas = Math.ceil(state.hechos.length / state.porPagina);
    
    // Actualizar contadores
    document.getElementById('problemas-count').textContent = state.articulosProblemas.length;
    document.getElementById('total-hechos').textContent = state.hechos.length;
    document.getElementById('total-paginas').textContent = state.totalPaginas;
    
    // Inicializar componentes
    initArticulosProblemas();
    initFiltros();
    initPaginacion();
    initHechosList();
    initModales();
});

// Inicializar panel de artículos con problemas
function initArticulosProblemas() {
    const toggleBtn = document.getElementById('toggle-problemas');
    const content = document.getElementById('problemas-content');
    const arrow = document.getElementById('problemas-arrow');
    const problemasLista = document.getElementById('problemas-list');
    
    // Manejar clic en botón de toggle
    toggleBtn.addEventListener('click', () => {
        content.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
        
        // Si está abierto y la lista está vacía, llenarla
        if (!content.classList.contains('hidden') && problemasLista.innerHTML === '') {
            renderArticulosProblemas();
        }
    });
}

// Renderizar lista de artículos con problemas
function renderArticulosProblemas() {
    const problemasLista = document.getElementById('problemas-list');
    problemasLista.innerHTML = '';
    
    state.articulosProblemas.forEach(articulo => {
        const row = document.createElement('tr');
        row.className = 'border-b';
        
        // Crear celdas de la tabla
        row.innerHTML = `
            <td class="p-2">
                <div class="truncate max-w-xs">${articulo.titular}</div>
            </td>
            <td class="p-2">${articulo.medio}</td>
            <td class="p-2">${formatDate(articulo.fecha_publicacion)}</td>
            <td class="p-2">
                <span class="bg-red-100 text-red-600 p-1 rounded text-sm">
                    ${articulo.estado_procesamiento.replace(/_/g, ' ')}
                </span>
            </td>
            <td class="p-2">
                <div class="flex space-x-2">
                    <a
                        href="${articulo.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-600 hover:text-blue-800"
                        title="Ver Artículo Original"
                    >
                        🔗
                    </a>
                    <button
                        class="text-gray-600 hover:text-gray-800"
                        title="Descartar Notificación"
                        data-articulo-id="${articulo.id}"
                    >
                        🗑️
                    </button>
                    <button
                        class="text-red-600 hover:text-red-800"
                        title="Notificar Urgencia"
                        data-articulo-id="${articulo.id}"
                    >
                        ❗
                    </button>
                </div>
            </td>
        `;
        
        // Añadir manejadores de eventos para los botones
        const btnDescartar = row.querySelector('button[title="Descartar Notificación"]');
        btnDescartar.addEventListener('click', () => descartarNotificacion(articulo.id));
        
        const btnUrgencia = row.querySelector('button[title="Notificar Urgencia"]');
        btnUrgencia.addEventListener('click', () => notificarUrgencia(articulo.id));
        
        problemasLista.appendChild(row);
    });
}

// Función para descartar notificación de problema
function descartarNotificacion(articuloId) {
    // En una app real, esto haría una petición al backend
    console.log(`Descartando notificación del artículo ${articuloId}`);
    
    // Actualizar estado local
    state.articulosProblemas = state.articulosProblemas.filter(a => a.id !== articuloId);
    document.getElementById('problemas-count').textContent = state.articulosProblemas.length;
    
    // Re-renderizar la lista
    renderArticulosProblemas();
    
    // Mostrar mensaje de confirmación
    showToast('Notificación descartada');
}

// Función para notificar urgencia
function notificarUrgencia(articuloId) {
    // En una app real, esto haría una petición al backend
    console.log(`Notificando urgencia para artículo ${articuloId}`);
    
    // Mostrar mensaje de confirmación
    showToast('Urgencia notificada al equipo técnico');
}

// Inicializar filtros
function initFiltros() {
    const periodoSelect = document.getElementById('periodo-filter');
    const fechaPersonalizada = document.getElementById('fecha-personalizada');
    const fechaInicio = document.getElementById('fecha-inicio');
    const fechaFin = document.getElementById('fecha-fin');
    const btnAplicarFiltros = document.getElementById('aplicar-filtros');
    
    // Establecer fechas por defecto
    const hoy = new Date();
    fechaFin.valueAsDate = hoy;
    
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    fechaInicio.valueAsDate = ayer;
    
    // Mostrar/ocultar fechas personalizadas
    periodoSelect.addEventListener('change', () => {
        if (periodoSelect.value === 'personalizado') {
            fechaPersonalizada.classList.remove('hidden');
        } else {
            fechaPersonalizada.classList.add('hidden');
        }
    });
    
    // Manejar clic en botón de aplicar filtros
    btnAplicarFiltros.addEventListener('click', aplicarFiltros);
}

// Aplicar filtros
function aplicarFiltros() {
    // En una app real, esto haría una petición al backend con los filtros
    console.log('Aplicando filtros...');
    
    // Simular tiempo de carga
    showLoader();
    
    // Reiniciar a la primera página
    state.paginaActual = 1;
    
    // Simular actualización de datos después de 500ms
    setTimeout(() => {
        updatePaginacion();
        renderHechos();
        hideLoader();
        showToast('Filtros aplicados');
    }, 500);
}

// Inicializar paginación
function initPaginacion() {
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    const prevPageBottom = document.getElementById('prev-page-bottom');
    const nextPageBottom = document.getElementById('next-page-bottom');
    const firstPage = document.getElementById('first-page');
    const lastPage = document.getElementById('last-page');
    
    // Manejar clic en botones de paginación
    prevPage.addEventListener('click', () => cambiarPagina(state.paginaActual - 1));
    nextPage.addEventListener('click', () => cambiarPagina(state.paginaActual + 1));
    prevPageBottom.addEventListener('click', () => cambiarPagina(state.paginaActual - 1));
    nextPageBottom.addEventListener('click', () => cambiarPagina(state.paginaActual + 1));
    firstPage.addEventListener('click', () => cambiarPagina(1));
    lastPage.addEventListener('click', () => cambiarPagina(state.totalPaginas));
    
    // Renderizar números de página
    renderNumerosPagina();
    
    // Actualizar estado de botones
    updatePaginacion();
}

// Renderizar números de página
function renderNumerosPagina() {
    const pageNumbers = document.getElementById('page-numbers');
    pageNumbers.innerHTML = '';
    
    // Determinar qué páginas mostrar
    let pagesToShow = [];
    
    if (state.totalPaginas <= 5) {
        // Si hay 5 o menos páginas, mostrar todas
        pagesToShow = Array.from({ length: state.totalPaginas }, (_, i) => i + 1);
    } else if (state.paginaActual <= 3) {
        // Cerca del inicio
        pagesToShow = [1, 2, 3, 4, 5];
    } else if (state.paginaActual >= state.totalPaginas - 2) {
        // Cerca del final
        pagesToShow = [
            state.totalPaginas - 4,
            state.totalPaginas - 3,
            state.totalPaginas - 2,
            state.totalPaginas - 1,
            state.totalPaginas
        ];
    } else {
        // En medio
        pagesToShow = [
            state.paginaActual - 2,
            state.paginaActual - 1,
            state.paginaActual,
            state.paginaActual + 1,
            state.paginaActual + 2
        ];
    }
    
    // Crear botones de página
    pagesToShow.forEach(pageNum => {
        const button = document.createElement('button');
        button.className = `
            py-1 px-3 rounded font-bold
            ${pageNum === state.paginaActual 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
        `;
        button.textContent = pageNum;
        button.addEventListener('click', () => cambiarPagina(pageNum));
        pageNumbers.appendChild(button);
    });
}

// Cambiar página
function cambiarPagina(nuevaPagina) {
    if (nuevaPagina < 1 || nuevaPagina > state.totalPaginas) return;
    
    state.paginaActual = nuevaPagina;
    updatePaginacion();
    renderHechos();
    
    // Hacer scroll al inicio de la lista
    document.getElementById('hechos-list').scrollIntoView({ behavior: 'smooth' });
}

// Actualizar estado de paginación
function updatePaginacion() {
    // Actualizar números mostrados
    document.getElementById('pagina-actual').textContent = state.paginaActual;
    document.getElementById('rango-inicio').textContent = ((state.paginaActual - 1) * state.porPagina) + 1;
    const rangoFin = Math.min(state.paginaActual * state.porPagina, state.hechos.length);
    document.getElementById('rango-fin').textContent = rangoFin;
    
    // Deshabilitar/habilitar botones
    const prevButtons = [document.getElementById('prev-page'), document.getElementById('prev-page-bottom')];
    const nextButtons = [document.getElementById('next-page'), document.getElementById('next-page-bottom')];
    
    prevButtons.forEach(btn => {
        btn.disabled = state.paginaActual === 1;
        btn.classList.toggle('opacity-50', state.paginaActual === 1);
        btn.classList.toggle('cursor-not-allowed', state.paginaActual === 1);
    });
    
    nextButtons.forEach(btn => {
        btn.disabled = state.paginaActual === state.totalPaginas;
        btn.classList.toggle('opacity-50', state.paginaActual === state.totalPaginas);
        btn.classList.toggle('cursor-not-allowed', state.paginaActual === state.totalPaginas);
    });
    
    document.getElementById('first-page').disabled = state.paginaActual === 1;
    document.getElementById('last-page').disabled = state.paginaActual === state.totalPaginas;
    
    // Actualizar números de página
    renderNumerosPagina();
}

// Inicializar lista de hechos
function initHechosList() {
    renderHechos();
}

// Renderizar hechos
function renderHechos() {
    const hechosList = document.getElementById('hechos-list');
    hechosList.innerHTML = '';
    
    // Calcular hechos para la página actual
    const inicio = (state.paginaActual - 1) * state.porPagina;
    const fin = Math.min(inicio + state.porPagina, state.hechos.length);
    const hechosVisibles = state.hechos.slice(inicio, fin);
    
    // Renderizar cada hecho
    hechosVisibles.forEach(hecho => {
        const hechoCard = document.createElement('div');
        hechoCard.className = 'bg-white rounded-lg shadow mb-4 border-l-4 border-gray-300 hecho-card';
        hechoCard.setAttribute('data-hecho-id', hecho.id);
        
        // Construir HTML para el hecho
        hechoCard.innerHTML = `
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                        <p class="text-base">${hecho.contenido}</p>
                    </div>
                    
                    <div class="ml-4 flex flex-col items-end">
                        <!-- Indicador de Importancia -->
                        <div class="flex items-center mb-1">
                            <div class="w-4 h-4 rounded-full ${getImportanciaColor(hecho.importancia)} mr-2"></div>
                            <span class="text-lg font-bold">${hecho.importancia}/10</span>
                        </div>
                        
                        <!-- Control de Importancia -->
                        <div class="flex items-center">
                            <button 
                                class="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                                data-action="decrease-importancia"
                                ${hecho.importancia <= 1 ? 'disabled' : ''}
                            >
                                -
                            </button>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value="${hecho.importancia}"
                                class="w-24 mx-2 importancia-slider"
                                data-hecho-id="${hecho.id}"
                            >
                            <button 
                                class="bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                                data-action="increase-importancia"
                                ${hecho.importancia >= 10 ? 'disabled' : ''}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Metadatos -->
                <div class="flex flex-wrap text-sm text-gray-500 mb-2">
                    <div class="mr-4">
                        <span class="font-medium">Medio:</span> ${hecho.articulo_origen.medio}
                    </div>
                    <div class="mr-4">
                        <span class="font-medium">País:</span> ${hecho.articulo_origen.pais_publicacion}
                    </div>
                    <div class="mr-4">
                        <span class="font-medium">Fecha:</span> ${formatDate(hecho.articulo_origen.fecha_publicacion)}
                    </div>
                    <div>
                        <span class="font-medium">Tipo:</span> ${hecho.tipo_hecho}
                    </div>
                </div>
                
                <!-- Gestión de Hilos -->
                <div class="flex flex-wrap items-center mb-2 text-sm">
                    ${
                        hecho.hilo_vinculado 
                            ? `<div class="bg-blue-100 rounded p-1 flex items-center mr-2 mb-1 hilo-vinculado">
                                <span class="mr-1">Hilo: ${hecho.hilo_vinculado.titulo}</span>
                                <button
                                    class="text-blue-600 hover:text-blue-800 underline text-xs"
                                    data-action="desvincular-hilo"
                                    data-hilo-id="${hecho.hilo_vinculado.id}"
                                >
                                    Revertir
                                </button>
                                <span class="mx-1">|</span>
                                <button
                                    class="text-blue-600 hover:text-blue-800 underline text-xs"
                                    data-action="cambiar-hilo"
                                >
                                    Cambiar
                                </button>
                            </div>`
                            : hecho.hilo_sugerido
                                ? `<div class="bg-yellow-100 rounded p-1 flex items-center mr-2 mb-1 hilo-sugerido">
                                    <span class="mr-1">Sugerencia: ${hecho.hilo_sugerido.titulo}</span>
                                    <button
                                        class="text-green-600 hover:text-green-800 underline text-xs"
                                        data-action="vincular-hilo"
                                        data-hilo-id="${hecho.hilo_sugerido.id}"
                                    >
                                        Vincular
                                    </button>
                                    <span class="mx-1">|</span>
                                    <button
                                        class="text-red-600 hover:text-red-800 underline text-xs"
                                        data-action="ignorar-sugerencia"
                                    >
                                        Ignorar
                                    </button>
                                </div>`
                                : ''
                    }
                    
                    <button
                        class="bg-green-100 hover:bg-green-200 text-green-800 rounded p-1 flex items-center mb-1"
                        data-action="crear-hilo"
                    >
                        <span class="text-green-800 mr-1">+</span> Crear Hilo
                    </button>
                </div>
                
                <!-- Entidades y Notas -->
                <div class="mb-2">
                    <div class="text-sm font-medium mb-1">Entidades mencionadas:</div>
                    <div class="flex flex-wrap">
                        ${hecho.entidades_relacionadas.map(entidad => `
                            <button
                                class="${entidad.notas_usuario ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'} 
                                        mr-1 mb-1 p-1 rounded text-xs"
                                data-action="mostrar-notas"
                                data-entidad-id="${entidad.id}"
                            >
                                ${entidad.nombre} (${entidad.tipo})
                                ${entidad.notas_usuario ? '<span class="ml-1">📝</span>' : ''}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Estado de Revisión -->
                <div class="flex items-center mt-4">
                    <label class="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            ${hecho.validado ? 'checked' : ''}
                            class="h-5 w-5 text-blue-600"
                            data-action="marcar-validado"
                        >
                        <span class="ml-2 text-sm text-gray-500">Marcar como revisado</span>
                    </label>
                </div>
            </div>
        `;
        
        // Añadir a la lista
        hechosList.appendChild(hechoCard);
        
        // Añadir event listeners
        addHechoEventListeners(hechoCard, hecho);
    });
}

// Añadir event listeners a elementos de un hecho
function addHechoEventListeners(hechoCard, hecho) {
    // Slider de importancia
    const importanciaSlider = hechoCard.querySelector('.importancia-slider');
    importanciaSlider.addEventListener('input', event => {
        const newValue = parseInt(event.target.value);
        updateImportancia(hecho.id, newValue);
        
        // Actualizar visual del slider directamente
        const hechoElement = document.querySelector(`[data-hecho-id="${hecho.id}"]`);
        const importanciaCircle = hechoElement.querySelector('.rounded-full');
        importanciaCircle.className = `w-4 h-4 rounded-full ${getImportanciaColor(newValue)} mr-2`;
        hechoElement.querySelector('.font-bold').textContent = `${newValue}/10`;
        
        // Habilitar/deshabilitar botones +/-
        const decreaseBtn = hechoElement.querySelector('[data-action="decrease-importancia"]');
        const increaseBtn = hechoElement.querySelector('[data-action="increase-importancia"]');
        decreaseBtn.disabled = newValue <= 1;
        increaseBtn.disabled = newValue >= 10;
    });
    
    // Botones de importancia +/-
    const decreaseBtn = hechoCard.querySelector('[data-action="decrease-importancia"]');
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (hecho.importancia > 1) {
                const newValue = hecho.importancia - 1;
                updateImportancia(hecho.id, newValue);
                importanciaSlider.value = newValue;
                // Simular evento input para actualizar visual
                importanciaSlider.dispatchEvent(new Event('input'));
            }
        });
    }
    
    const increaseBtn = hechoCard.querySelector('[data-action="increase-importancia"]');
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            if (hecho.importancia < 10) {
                const newValue = hecho.importancia + 1;
                updateImportancia(hecho.id, newValue);
                importanciaSlider.value = newValue;
                // Simular evento input para actualizar visual
                importanciaSlider.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // Checkbox de validado
    const validadoCheckbox = hechoCard.querySelector('[data-action="marcar-validado"]');
    if (validadoCheckbox) {
        validadoCheckbox.addEventListener('change', event => {
            updateValidado(hecho.id, event.target.checked);
        });
    }
    
    // Botones de hilos
    const crearHiloBtn = hechoCard.querySelector('[data-action="crear-hilo"]');
    if (crearHiloBtn) {
        crearHiloBtn.addEventListener('click', () => {
            state.hechoSeleccionado = hecho.id;
            openCrearHiloModal();
        });
    }
    
    const vincularHiloBtn = hechoCard.querySelector('[data-action="vincular-hilo"]');
    if (vincularHiloBtn) {
        vincularHiloBtn.addEventListener('click', () => {
            const hiloId = parseInt(vincularHiloBtn.getAttribute('data-hilo-id'));
            vincularHilo(hecho.id, hiloId);
        });
    }
    
    const desvincularHiloBtn = hechoCard.querySelector('[data-action="desvincular-hilo"]');
    if (desvincularHiloBtn) {
        desvincularHiloBtn.addEventListener('click', () => {
            const hiloId = parseInt(desvincularHiloBtn.getAttribute('data-hilo-id'));
            desvincularHilo(hecho.id, hiloId);
        });
    }
    
    const cambiarHiloBtn = hechoCard.querySelector('[data-action="cambiar-hilo"]');
    if (cambiarHiloBtn) {
        cambiarHiloBtn.addEventListener('click', () => {
            state.hechoSeleccionado = hecho.id;
            openVincularHiloModal();
        });
    }
    
    const ignorarSugerenciaBtn = hechoCard.querySelector('[data-action="ignorar-sugerencia"]');
    if (ignorarSugerenciaBtn) {
        ignorarSugerenciaBtn.addEventListener('click', () => {
            ignorarSugerenciaHilo(hecho.id);
        });
    }
    
    // Botones de entidades
    const entidadesBtns = hechoCard.querySelectorAll('[data-action="mostrar-notas"]');
    entidadesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const entidadId = parseInt(btn.getAttribute('data-entidad-id'));
            const entidad = hecho.entidades_relacionadas.find(e => e.id === entidadId);
            openNotasModal(entidad);
        });
    });
}

// Actualizar importancia de un hecho
function updateImportancia(hechoId, nuevoValor) {
    // En una app real, esto haría una petición al backend
    console.log(`Actualizando importancia de hecho ${hechoId} a ${nuevoValor}`);
    
    // Actualizar estado local
    const hecho = state.hechos.find(h => h.id === hechoId);
    if (hecho) {
        hecho.importancia = nuevoValor;
    }
}

// Actualizar estado de validación de un hecho
function updateValidado(hechoId, validado) {
    // En una app real, esto haría una petición al backend
    console.log(`Marcando hecho ${hechoId} como ${validado ? 'validado' : 'no validado'}`);
    
    // Actualizar estado local
    const hecho = state.hechos.find(h => h.id === hechoId);
    if (hecho) {
        hecho.validado = validado;
    }
    
    // Mostrar mensaje de confirmación
    showToast(validado ? 'Hecho marcado como revisado' : 'Hecho desmarcado');
}

// Vincular un hecho a un hilo
function vincularHilo(hechoId, hiloId) {
    // En una app real, esto haría una petición al backend
    console.log(`Vinculando hecho ${hechoId} al hilo ${hiloId}`);
    
    // Actualizar estado local
    const hecho = state.hechos.find(h => h.id === hechoId);
    const hilo = state.hilos.find(h => h.id === hiloId);
    
    if (hecho && hilo) {
        hecho.hilo_vinculado = {
            id: hilo.id,
            titulo: hilo.titulo,
            relevancia_editorial: hilo.relevancia_editorial
        };
        
        // Si era una sugerencia, eliminarla
        if (hecho.hilo_sugerido && hecho.hilo_sugerido.id === hiloId) {
            hecho.hilo_sugerido = undefined;
        }
        
        // Re-renderizar el hecho
        renderHechos();
        
        // Mostrar mensaje de confirmación
        showToast(`Hecho vinculado al hilo "${hilo.titulo}"`);
    }
}

// Desvincular un hecho de un hilo
function desvincularHilo(hechoId, hiloId) {
    // En una app real, esto haría una petición al backend
    console.log(`Desvinculando hecho ${hechoId} del hilo ${hiloId}`);
    
    // Actualizar estado local
    const hecho = state.hechos.find(h => h.id === hechoId);
    
    if (hecho && hecho.hilo_vinculado && hecho.hilo_vinculado.id === hiloId) {
        const hiloTitulo = hecho.hilo_vinculado.titulo;
        hecho.hilo_vinculado = undefined;
        
        // Re-renderizar el hecho
        renderHechos();
        
        // Mostrar mensaje de confirmación
        showToast(`Hecho desvinculado del hilo "${hiloTitulo}"`);
    }
}

// Ignorar sugerencia de hilo
function ignorarSugerenciaHilo(hechoId) {
    // En una app real, esto haría una petición al backend
    console.log(`Ignorando sugerencia de hilo para hecho ${hechoId}`);
    
    // Actualizar estado local
    const hecho = state.hechos.find(h => h.id === hechoId);
    
    if (hecho && hecho.hilo_sugerido) {
        const hiloTitulo = hecho.hilo_sugerido.titulo;
        hecho.hilo_sugerido = undefined;
        
        // Re-renderizar el hecho
        renderHechos();
        
        // Mostrar mensaje de confirmación
        showToast(`Sugerencia de hilo "${hiloTitulo}" ignorada`);
    }
}

// Inicializar modales
function initModales() {
    // Modal Crear Hilo
    const crearHiloModal = document.getElementById('crear-hilo-modal');
    const cancelarHiloBtn = document.getElementById('cancelar-hilo');
    const crearHiloBtn = document.getElementById('crear-hilo');
    const relevanciaSlider = document.getElementById('relevancia-slider');
    const relevanciaValor = document.getElementById('relevancia-valor');
    const nuevoPaisInput = document.getElementById('nuevo-pais');
    const agregarPaisBtn = document.getElementById('agregar-pais');
    const nuevaEtiquetaInput = document.getElementById('nueva-etiqueta');
    const agregarEtiquetaBtn = document.getElementById('agregar-etiqueta');
    
    // Actualizar valor de relevancia
    relevanciaSlider.addEventListener('input', () => {
        relevanciaValor.textContent = relevanciaSlider.value;
    });
    
    // Agregar país
    agregarPaisBtn.addEventListener('click', agregarPais);
    nuevoPaisInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            agregarPais();
        }
    });
    
    // Agregar etiqueta
    agregarEtiquetaBtn.addEventListener('click', agregarEtiqueta);
    nuevaEtiquetaInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            agregarEtiqueta();
        }
    });
    
    // Botones de acción
    cancelarHiloBtn.addEventListener('click', () => {
        crearHiloModal.classList.add('hidden');
        resetCrearHiloModal();
    });
    
    crearHiloBtn.addEventListener('click', crearHilo);
    
    // Modal Vincular Hilo
    const vincularHiloModal = document.getElementById('vincular-hilo-modal');
    const buscarHiloInput = document.getElementById('buscar-hilo');
    
    // Filtrar hilos al escribir
    buscarHiloInput.addEventListener('input', () => {
        renderHilosLista(buscarHiloInput.value);
    });
    
    // Cerrar modal al hacer clic fuera
    document.addEventListener('click', e => {
        if (vincularHiloModal.contains(e.target)) return;
        if (!vincularHiloModal.classList.contains('hidden') &&
            !e.target.closest('[data-action="cambiar-hilo"]')) {
            vincularHiloModal.classList.add('hidden');
        }
    });
    
    // Modal Notas de Entidad
    const notasModal = document.getElementById('notas-modal');
    const cancelarNotasBtn = document.getElementById('cancelar-notas');
    const guardarNotasBtn = document.getElementById('guardar-notas');
    
    cancelarNotasBtn.addEventListener('click', () => {
        notasModal.classList.add('hidden');
    });
    
    guardarNotasBtn.addEventListener('click', guardarNotas);
}

// Abrir modal de crear hilo
function openCrearHiloModal() {
    const modal = document.getElementById('crear-hilo-modal');
    modal.classList.remove('hidden');
    
    // Resetear valores
    resetCrearHiloModal();
    
    // Enfocar el campo de título
    document.getElementById('hilo-titulo').focus();
}

// Resetear modal de crear hilo
function resetCrearHiloModal() {
    document.getElementById('hilo-titulo').value = '';
    document.getElementById('hilo-descripcion').value = '';
    document.getElementById('nuevo-pais').value = '';
    document.getElementById('nueva-etiqueta').value = '';
    document.getElementById('relevancia-slider').value = 5;
    document.getElementById('relevancia-valor').textContent = 5;
    document.getElementById('modal-error').classList.add('hidden');
    
    // Vaciar listas de tags
    state.paisesTags = [];
    state.etiquetasTags = [];
    renderTags();
}

// Agregar país
function agregarPais() {
    const nuevoPaisInput = document.getElementById('nuevo-pais');
    const pais = nuevoPaisInput.value.trim();
    
    if (pais && !state.paisesTags.includes(pais)) {
        state.paisesTags.push(pais);
        nuevoPaisInput.value = '';
        renderTags();
    }
}

// Agregar etiqueta
function agregarEtiqueta() {
    const nuevaEtiquetaInput = document.getElementById('nueva-etiqueta');
    const etiqueta = nuevaEtiquetaInput.value.trim();
    
    if (etiqueta && !state.etiquetasTags.includes(etiqueta)) {
        state.etiquetasTags.push(etiqueta);
        nuevaEtiquetaInput.value = '';
        renderTags();
    }
}

// Renderizar tags
function renderTags() {
    // Renderizar países
    const paisesTags = document.getElementById('paises-tags');
    paisesTags.innerHTML = '';
    
    state.paisesTags.forEach((pais, index) => {
        const tag = document.createElement('div');
        tag.className = 'tag tag-blue flex items-center';
        tag.innerHTML = `
            ${pais}
            <button
                type="button"
                class="ml-1 text-blue-800 hover:text-blue-900"
                data-action="remove-pais"
                data-index="${index}"
            >
                ×
            </button>
        `;
        
        tag.querySelector('button').addEventListener('click', () => {
            state.paisesTags.splice(index, 1);
            renderTags();
        });
        
        paisesTags.appendChild(tag);
    });
    
    // Renderizar etiquetas
    const etiquetasTags = document.getElementById('etiquetas-tags');
    etiquetasTags.innerHTML = '';
    
    state.etiquetasTags.forEach((etiqueta, index) => {
        const tag = document.createElement('div');
        tag.className = 'tag tag-green flex items-center';
        tag.innerHTML = `
            ${etiqueta}
            <button
                type="button"
                class="ml-1 text-green-800 hover:text-green-900"
                data-action="remove-etiqueta"
                data-index="${index}"
            >
                ×
            </button>
        `;
        
        tag.querySelector('button').addEventListener('click', () => {
            state.etiquetasTags.splice(index, 1);
            renderTags();
        });
        
        etiquetasTags.appendChild(tag);
    });
}

// Crear hilo
function crearHilo() {
    const titulo = document.getElementById('hilo-titulo').value.trim();
    const descripcion = document.getElementById('hilo-descripcion').value.trim();
    const relevancia = parseInt(document.getElementById('relevancia-slider').value);
    
    // Validar título
    if (!titulo) {
        document.getElementById('modal-error').classList.remove('hidden');
        return;
    }
    
    // En una app real, esto haría una petición al backend
    console.log(`Creando hilo "${titulo}" con relevancia ${relevancia}`);
    
    // Simular creación del hilo
    const hiloId = Date.now(); // ID único simulado
    
    // Añadir a lista de hilos
    const nuevoHilo = {
        id: hiloId,
        titulo: titulo,
        relevancia_editorial: relevancia,
        fecha_ultimo_hecho: new Date().toISOString()
    };
    
    state.hilos.push(nuevoHilo);
    
    // Si hay un hecho seleccionado, vincularlo al nuevo hilo
    if (state.hechoSeleccionado) {
        vincularHilo(state.hechoSeleccionado, hiloId);
    }
    
    // Cerrar modal
    document.getElementById('crear-hilo-modal').classList.add('hidden');
    
    // Resetear estado
    resetCrearHiloModal();
    
    // Mostrar mensaje de confirmación
    showToast(`Hilo "${titulo}" creado correctamente`);
}

// Abrir modal de vincular hilo
function openVincularHiloModal() {
    const modal = document.getElementById('vincular-hilo-modal');
    const buscarHiloInput = document.getElementById('buscar-hilo');
    
    // Posicionar el modal cerca del botón que lo activó
    const btnCambiarHilo = document.querySelector(`[data-hecho-id="${state.hechoSeleccionado}"] [data-action="cambiar-hilo"]`);
    if (btnCambiarHilo) {
        const rect = btnCambiarHilo.getBoundingClientRect();
        modal.style.position = 'absolute';
        modal.style.top = `${rect.bottom + window.scrollY + 5}px`;
        modal.style.left = `${rect.left + window.scrollX}px`;
    }
    
    // Mostrar el modal
    modal.classList.remove('hidden');
    
    // Resetear búsqueda y renderizar lista
    buscarHiloInput.value = '';
    buscarHiloInput.focus();
    renderHilosLista();
}

// Renderizar lista de hilos para vincular
function renderHilosLista(searchTerm = '') {
    const hilosLista = document.getElementById('hilos-lista');
    hilosLista.innerHTML = '';
    
    // Filtrar hilos por término de búsqueda
    const filteredHilos = state.hilos.filter(hilo => 
        !searchTerm || hilo.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredHilos.length === 0) {
        hilosLista.innerHTML = `
            <div class="p-4 text-center text-gray-500 text-sm">
                No se encontraron hilos
            </div>
        `;
        return;
    }
    
    // Crear lista
    const ul = document.createElement('ul');
    
    filteredHilos.forEach(hilo => {
        const li = document.createElement('li');
        li.className = 'border-b last:border-b-0';
        
        // Obtener color de relevancia
        let relevanciaColor;
        if (hilo.relevancia_editorial <= 3) relevanciaColor = 'bg-gray-200';
        else if (hilo.relevancia_editorial <= 6) relevanciaColor = 'bg-blue-200';
        else relevanciaColor = 'bg-orange-200';
        
        li.innerHTML = `
            <button
                class="w-full p-2 text-left hover:bg-gray-100 flex items-center"
                data-hilo-id="${hilo.id}"
            >
                <div class="w-2 h-full ${relevanciaColor} mr-1"></div>
                <div>
                    <div class="font-medium text-sm">${hilo.titulo}</div>
                    <div class="text-xs text-gray-500">
                        Relevancia: ${hilo.relevancia_editorial}/10
                        ${hilo.fecha_ultimo_hecho ? 
                            `<span class="ml-2">Actualizado: ${formatDate(hilo.fecha_ultimo_hecho)}</span>` : 
                            ''}
                    </div>
                </div>
            </button>
        `;
        
        li.querySelector('button').addEventListener('click', () => {
            vincularHilo(state.hechoSeleccionado, hilo.id);
            document.getElementById('vincular-hilo-modal').classList.add('hidden');
        });
        
        ul.appendChild(li);
    });
    
    hilosLista.appendChild(ul);
}

// Abrir modal de notas
function openNotasModal(entidad) {
    const modal = document.getElementById('notas-modal');
    const entidadNombre = document.getElementById('entidad-nombre');
    const entidadTipo = document.getElementById('entidad-tipo');
    const entidadNotas = document.getElementById('entidad-notas');
    
    // Establecer datos
    entidadNombre.textContent = entidad.nombre;
    entidadTipo.textContent = entidad.tipo;
    entidadNotas.value = entidad.notas_usuario || '';
    
    // Guardar referencia a la entidad
    state.entidadSeleccionada = entidad.id;
    
    // Mostrar modal
    modal.classList.remove('hidden');
    
    // Enfocar área de texto
    entidadNotas.focus();
}

// Guardar notas
function guardarNotas() {
    const notasText = document.getElementById('entidad-notas').value.trim();
    
    // En una app real, esto haría una petición al backend
    console.log(`Guardando notas para entidad ${state.entidadSeleccionada}: "${notasText}"`);
    
    // Actualizar estado local
    state.hechos.forEach(hecho => {
        hecho.entidades_relacionadas.forEach(entidad => {
            if (entidad.id === state.entidadSeleccionada) {
                entidad.notas_usuario = notasText;
            }
        });
    });
    
    // Cerrar modal
    document.getElementById('notas-modal').classList.add('hidden');
    
    // Renderizar hechos para mostrar cambios
    renderHechos();
    
    // Mostrar mensaje de confirmación
    showToast('Notas guardadas correctamente');
}

// Funciones auxiliares

// Obtener color de importancia
function getImportanciaColor(importancia) {
    if (importancia <= 2) return 'importancia-1-2';
    if (importancia <= 4) return 'importancia-3-4';
    if (importancia <= 6) return 'importancia-5-6';
    if (importancia <= 8) return 'importancia-7-8';
    return 'importancia-9-10';
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Mostrar loader
function showLoader() {
    // Implementación simple para demo
    // En una app real se añadiría un elemento visual de carga
    console.log('Cargando...');
}

// Ocultar loader
function hideLoader() {
    console.log('Carga completada');
}

// Mostrar mensaje toast
function showToast(message) {
    // Crear elemento toast si no existe
    let toast = document.getElementById('toast-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-message';
        toast.className = 'fixed bottom-4 right-4 bg-blue-600 text-white py-2 px-4 rounded shadow-lg transform transition-all duration-300 translate-y-20 opacity-0';
        document.body.appendChild(toast);
    }
    
    // Establecer mensaje
    toast.textContent = message;
    
    // Mostrar toast
    setTimeout(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}