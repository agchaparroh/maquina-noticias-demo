// dashboard.js - Lógica para el Dashboard de Revisión

// Estado global de la aplicación
const state = {
    hilosNarrativos: [],
    hechosSinHilo: [],
    articulosProblemas: [],
    paginaActual: 1,
    porPagina: 20,
    totalPaginas: 0,
    selectedHecho: null,
    draggedElement: null,
    paisesTags: [],
    etiquetasTags: []
};

// Función principal de inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos simulados
    state.hilosNarrativos = mockData.hilosNarrativos.slice(); // Copia para manipular
    state.hechosSinHilo = mockData.hechosSinHilo.slice();
    state.articulosProblemas = mockData.articulosProblemas.slice();
    
    // Actualizar contadores
    document.getElementById('problemas-count').textContent = state.articulosProblemas.length;
    
    // Calcular total de páginas
    state.totalPaginas = Math.ceil(state.hechos?.length || 0 / state.porPagina);
    
    // Inicializar componentes
    initFilters();
    initPanelProblemas();
    renderHilosNarrativos();
    renderHechosSinHilo();
    setupDragAndDrop();
    setupModals();
});

// Inicializar filtros
function initFilters() {
    const toggleFilters = document.getElementById('toggle-filters');
    const filtersContent = document.getElementById('filters-content');
    const filtersArrow = document.getElementById('filters-arrow');
    const aplicarFiltros = document.getElementById('aplicar-filtros');
    
    toggleFilters.addEventListener('click', () => {
        filtersContent.classList.toggle('hidden');
        filtersArrow.classList.toggle('rotate-180');
    });
    
    aplicarFiltros.addEventListener('click', () => {
        // En una implementación real, aplicaría los filtros
        showToast('Filtros aplicados');
    });
}

// Inicializar panel de problemas
function initPanelProblemas() {
    const toggleProblemas = document.getElementById('toggle-problemas');
    const problemasContent = document.getElementById('problemas-content');
    const problemasArrow = document.getElementById('problemas-arrow');
    
    toggleProblemas.addEventListener('click', () => {
        problemasContent.classList.toggle('hidden');
        problemasArrow.classList.toggle('rotate-180');
    });
    
    // Ocultar panel por defecto
    problemasContent.classList.add('hidden');
    problemasArrow.classList.add('rotate-180');
}

// Renderizar artículos con problemas
function renderProblemas() {
    const problemasList = document.getElementById('problemas-list');
    problemasList.innerHTML = '';
    
    state.articulosProblemas.forEach(problema => {
        const problemContainer = document.createElement('div');
        problemContainer.className = 'problem-item';
        
        problemContainer.innerHTML = `
            <div>
                <div class="font-medium">${problema.titular}</div>
                <div class="text-sm text-gray-600">${problema.medio} - ${problema.fecha}</div>
                <div class="text-sm text-red-600">${problema.estado}: ${problema.error}</div>
            </div>
            <button onclick="window.open('${problema.url}', '_blank')" 
                class="view-button">
                VER
            </button>
        `;
        
        problemasList.appendChild(problemContainer);
    });
}

// Renderizar hilos narrativos
function renderHilosNarrativos() {
    const container = document.getElementById('hilos-narrativos-container');
    container.innerHTML = '';
    
    // Ordenar hilos por relevancia
    const hilosOrdenados = [...state.hilosNarrativos].sort((a, b) => b.relevancia - a.relevancia);
    
    hilosOrdenados.forEach((hilo, index) => {
        const hiloBlock = createHiloBlock(hilo, index);
        container.appendChild(hiloBlock);
    });
}

// Crear bloque de hilo narrativo
function createHiloBlock(hilo, index) {
    const block = document.createElement('div');
    block.className = 'bg-white rounded-lg shadow border border-gray-200 overflow-hidden thread-block';
    block.dataset.hiloId = hilo.id;
    block.dataset.index = index;
    block.setAttribute('draggable', 'true');
    
    // Header con drag handle y relevancia
    const header = document.createElement('div');
    header.className = 'bg-gray-50 p-4 border-b flex justify-between items-center';
    
    const titleAndDrag = document.createElement('div');
    titleAndDrag.className = 'flex items-center';
    
    const dragHandle = document.createElement('div');
    dragHandle.className = 'thread-handle drag-handle';
    dragHandle.innerHTML = '☰';
    dragHandle.addEventListener('dblclick', () => openRelevanceModal(hilo.id, hilo.relevancia));
    
    const title = document.createElement('h3');
    title.className = 'thread-title text-lg';
    title.textContent = `[${hilo.titulo}]`;
    
    titleAndDrag.appendChild(dragHandle);
    titleAndDrag.appendChild(title);
    
    const relevanceIndicator = document.createElement('div');
    relevanceIndicator.className = 'text-sm text-gray-600';
    relevanceIndicator.textContent = `${hilo.relevancia}/10`;
    
    header.appendChild(titleAndDrag);
    header.appendChild(relevanceIndicator);
    
    // Titular principal
    const mainHeadline = document.createElement('div');
    mainHeadline.className = 'p-4 main-headline';
    mainHeadline.textContent = hilo.titular_principal;
    
    // Lista de hechos (máximo 4, cronológicamente ordenados)
    const factsList = document.createElement('div');
    factsList.className = 'px-4 space-y-2 mb-4';
    
    // Ordenar hechos cronológicamente y tomar los primeros 4
    const hechosOrdenados = [...hilo.hechos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha)).slice(0, 4);
    
    hechosOrdenados.forEach(hecho => {
        const factItem = document.createElement('div');
        factItem.className = 'text-sm flex justify-between items-center';
        
        const factContent = document.createElement('div');
        factContent.className = 'flex items-center';
        
        const factText = document.createElement('span');
        factText.className = 'fact-text cursor-pointer';
        factText.textContent = hecho.contenido;
        factText.addEventListener('click', () => openHechoDetalle(hecho));
        
        factContent.appendChild(factText);
        
        const factDate = document.createElement('div');
        factDate.className = 'text-xs text-gray-500';
        factDate.textContent = formatDate(hecho.fecha);
        
        factItem.appendChild(factContent);
        factItem.appendChild(factDate);
        
        factsList.appendChild(factItem);
    });
    
    // Footer con fuentes y países
    const footer = document.createElement('div');
    footer.className = 'p-4 border-t flex justify-between items-center';
    
    const countries = document.createElement('div');
    countries.className = 'flex gap-2';
    hilo.paises.forEach(pais => {
        const tag = document.createElement('span');
        tag.className = 'country-tag';
        tag.textContent = `[${pais}]`;
        countries.appendChild(tag);
    });
    
    const sourcesButton = document.createElement('button');
    sourcesButton.className = 'sources-button';
    sourcesButton.textContent = `Menciones: ${getTotalMentions(hilo.fuentes)} fuentes`;
    sourcesButton.addEventListener('click', () => showSources(hilo.fuentes));
    
    footer.appendChild(countries);
    footer.appendChild(sourcesButton);
    
    // Construir el bloque
    block.appendChild(header);
    block.appendChild(mainHeadline);
    block.appendChild(factsList);
    block.appendChild(footer);
    
    return block;
}

// Renderizar hechos sin hilo
function renderHechosSinHilo() {
    const container = document.getElementById('hechos-sin-hilo-list');
    container.innerHTML = '';
    
    state.hechosSinHilo.forEach(hecho => {
        const factCard = createFactCard(hecho);
        container.appendChild(factCard);
    });
}

// Crear tarjeta de hecho
function createFactCard(hecho) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-4 border border-gray-200 fact-card';
    
    const header = document.createElement('div');
    header.className = 'flex justify-between items-start mb-2';
    
    const content = document.createElement('div');
    content.className = 'flex-1';
    
    const title = document.createElement('h4');
    title.className = 'font-medium mb-1 cursor-pointer hover:text-blue-600';
    title.textContent = hecho.contenido;
    title.addEventListener('click', () => openHechoDetalle(hecho));
    
    const metadata = document.createElement('div');
    metadata.className = 'text-sm text-gray-600';
    metadata.textContent = `${hecho.medio} - ${formatDate(hecho.fecha)}`;
    
    content.appendChild(title);
    content.appendChild(metadata);
    
    const importance = document.createElement('div');
    importance.className = 'text-sm font-medium';
    importance.textContent = `${hecho.importancia}/10`;
    
    header.appendChild(content);
    header.appendChild(importance);
    
    const vinculationSection = document.createElement('div');
    vinculationSection.className = 'mt-4';
    
    const vinculationLabel = document.createElement('div');
    vinculationLabel.className = 'text-sm text-gray-600 mb-2';
    vinculationLabel.textContent = 'Vinculado a:';
    
    const vinculationButton = document.createElement('button');
    vinculationButton.className = 'bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm';
    vinculationButton.textContent = '+ Vincular a Hilo';
    vinculationButton.addEventListener('click', () => openVincularModal(hecho));
    
    vinculationSection.appendChild(vinculationLabel);
    vinculationSection.appendChild(vinculationButton);
    
    card.appendChild(header);
    card.appendChild(vinculationSection);
    
    return card;
}

// Configurar drag and drop
function setupDragAndDrop() {
    const container = document.getElementById('hilos-narrativos-container');
    
    container.addEventListener('dragstart', function(e) {
        const block = e.target.closest('.thread-block');
        if (!block) return;
        
        state.draggedElement = block;
        block.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', block.dataset.index);
    });
    
    container.addEventListener('dragend', function(e) {
        const block = e.target.closest('.thread-block');
        if (!block) return;
        
        block.classList.remove('dragging');
        state.draggedElement = null;
    });
    
    container.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
    
    container.addEventListener('drop', function(e) {
        e.preventDefault();
        reorderHilos();
    });
    
    // Hacer los bloques draggables
    document.addEventListener('dragstart', function(e) {
        if (e.target.closest('.thread-handle')) {
            const block = e.target.closest('.thread-block');
            if (block) {
                block.setAttribute('draggable', 'true');
            }
        }
    });
}

// Obtener elemento después de la posición del ratón
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.thread-block:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Reordenar hilos
function reorderHilos() {
    const blocks = document.querySelectorAll('.thread-block');
    const newOrder = [];
    
    blocks.forEach(block => {
        const hiloId = parseInt(block.dataset.hiloId);
        const hilo = state.hilosNarrativos.find(h => h.id === hiloId);
        if (hilo) {
            newOrder.push(hilo);
        }
    });
    
    state.hilosNarrativos = newOrder;
    
    // Actualizar relevancia basada en posición
    state.hilosNarrativos.forEach((hilo, index) => {
        const newRelevance = 10 - index;
        hilo.relevancia = Math.max(1, Math.min(10, newRelevance));
    });
    
    renderHilosNarrativos();
}

// Configurar modales
function setupModals() {
    // Modal vincular hilo
    const vincularModal = document.getElementById('vincular-hilo-modal');
    const cancelarVinculacion = document.getElementById('cancelar-vinculacion');
    const crearNuevoHilo = document.getElementById('crear-nuevo-hilo');
    
    cancelarVinculacion.addEventListener('click', () => {
        vincularModal.classList.add('hidden');
    });
    
    crearNuevoHilo.addEventListener('click', () => {
        vincularModal.classList.add('hidden');
        openCrearHiloModal();
    });
    
    // Modal crear hilo
    const crearHiloModal = document.getElementById('crear-hilo-modal');
    const cancelarCrearHilo = document.getElementById('cancelar-crear-hilo');
    const guardarNuevoHilo = document.getElementById('guardar-nuevo-hilo');
    const hiloRelevancia = document.getElementById('hilo-relevancia');
    const hiloRelevanciaValor = document.getElementById('hilo-relevancia-valor');
    
    hiloRelevancia.addEventListener('input', () => {
        hiloRelevanciaValor.textContent = `${hiloRelevancia.value}/10`;
    });
    
    cancelarCrearHilo.addEventListener('click', () => {
        crearHiloModal.classList.add('hidden');
    });
    
    guardarNuevoHilo.addEventListener('click', () => {
        createNewHilo();
    });
    
    // Modal detalle de hecho
    const detalleModal = document.getElementById('detalle-hecho-modal');
    const cerrarDetalle = document.getElementById('cerrar-detalle');
    const modificarVinculacion = document.getElementById('modificar-vinculacion');
    const hechoImportancia = document.getElementById('hecho-importancia');
    const hechoImportanciaValor = document.getElementById('hecho-importancia-valor');
    
    cerrarDetalle.addEventListener('click', () => {
        detalleModal.classList.add('hidden');
    });
    
    modificarVinculacion.addEventListener('click', () => {
        detalleModal.classList.add('hidden');
        openVincularModal(state.selectedHecho);
    });
    
    hechoImportancia.addEventListener('input', () => {
        hechoImportanciaValor.textContent = `${hechoImportancia.value}/10`;
        if (state.selectedHecho) {
            state.selectedHecho.importancia = parseInt(hechoImportancia.value);
        }
    });
}

// Abrir modal de relevancia
function openRelevanceModal(hiloId, currentRelevance) {
    // En una implementación real, esto abriría un modal para editar la relevancia
    // Por ahora, solo mostramos un prompt
    const newRelevance = prompt(`Relevancia actual: ${currentRelevance}/10\nIngresar nueva relevancia (1-10):`, currentRelevance);
    
    if (newRelevance && !isNaN(newRelevance)) {
        const value = Math.max(1, Math.min(10, parseInt(newRelevance)));
        const hilo = state.hilosNarrativos.find(h => h.id === hiloId);
        if (hilo) {
            hilo.relevancia = value;
            renderHilosNarrativos();
        }
    }
}

// Abrir modal de vinculación
function openVincularModal(hecho) {
    const modal = document.getElementById('vincular-hilo-modal');
    const hilosList = document.getElementById('hilos-lista');
    const buscarHilo = document.getElementById('buscar-hilo');
    
    state.selectedHecho = hecho;
    modal.classList.remove('hidden');
    
    // Renderizar lista de hilos
    renderHilosList(buscarHilo.value);
    
    // Configurar búsqueda
    buscarHilo.value = '';
    buscarHilo.oninput = () => renderHilosList(buscarHilo.value);
}

// Renderizar lista de hilos para vincular
function renderHilosList(searchTerm = '') {
    const hilosList = document.getElementById('hilos-lista');
    hilosList.innerHTML = '';
    
    const filteredHilos = mockData.hilosActivos.filter(hilo => 
        hilo.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredHilos.length === 0) {
        hilosList.innerHTML = '<div class="text-center text-gray-500 p-4">No se encontraron hilos</div>';
        return;
    }
    
    filteredHilos.forEach(hilo => {
        const hiloItem = document.createElement('div');
        hiloItem.className = 'dropdown-item flex justify-between items-center';
        
        const hiloInfo = document.createElement('div');
        hiloInfo.className = 'font-medium';
        hiloInfo.textContent = hilo.titulo;
        
        const relevanceBadge = document.createElement('span');
        relevanceBadge.className = 'bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs';
        relevanceBadge.textContent = `${hilo.relevancia_editorial}/10`;
        
        hiloItem.appendChild(hiloInfo);
        hiloItem.appendChild(relevanceBadge);
        
        hiloItem.addEventListener('click', () => {
            vincularHechoAHilo(state.selectedHecho, hilo);
        });
        
        hilosList.appendChild(hiloItem);
    });
}

// Abrir modal de crear hilo
function openCrearHiloModal() {
    const modal = document.getElementById('crear-hilo-modal');
    const titulo = document.getElementById('hilo-titulo');
    const etiquetas = document.getElementById('hilo-etiquetas');
    const relevancia = document.getElementById('hilo-relevancia');
    
    modal.classList.remove('hidden');
    titulo.value = '';
    etiquetas.value = '';
    relevancia.value = 5;
    document.getElementById('hilo-relevancia-valor').textContent = '5/10';
}

// Crear nuevo hilo
function createNewHilo() {
    const titulo = document.getElementById('hilo-titulo').value;
    const etiquetas = document.getElementById('hilo-etiquetas').value;
    const relevancia = parseInt(document.getElementById('hilo-relevancia').value);
    
    if (!titulo) {
        alert('El título es obligatorio');
        return;
    }
    
    const newHilo = {
        id: state.hilosNarrativos.length + 1,
        titulo: titulo,
        relevancia: relevancia,
        titular_principal: state.selectedHecho.contenido,
        hechos: [state.selectedHecho],
        fuentes: [{ medio: state.selectedHecho.medio, cantidad: 1 }],
        paises: []
    };
    
    // Añadir el nuevo hilo y vincularlo
    state.hilosNarrativos.push(newHilo);
    vincularHechoAHilo(state.selectedHecho, newHilo);
    
    document.getElementById('crear-hilo-modal').classList.add('hidden');
}

// Vincular hecho a hilo
function vincularHechoAHilo(hecho, hilo) {
    // Eliminar de hechos sin hilo
    const hechoIndex = state.hechosSinHilo.findIndex(h => h.id === hecho.id);
    if (hechoIndex >= 0) {
        state.hechosSinHilo.splice(hechoIndex, 1);
    }
    
    // Asegurarse de que el hilo existe en state.hilosNarrativos
    const hiloIndex = state.hilosNarrativos.findIndex(h => h.id === hilo.id);
    if (hiloIndex === -1) {
        state.hilosNarrativos.push(hilo);
    }
    
    // Actualizar el hecho para que tenga hilo_id
    hecho.hilo_id = hilo.id;
    
    // Añadir el hecho al hilo si no está ya
    if (!hilo.hechos.some(h => h.id === hecho.id)) {
        hilo.hechos.push(hecho);
    }
    
    // Actualizar fuentes
    const sourceIndex = hilo.fuentes.findIndex(f => f.medio === hecho.medio);
    if (sourceIndex >= 0) {
        hilo.fuentes[sourceIndex].cantidad++;
    } else {
        hilo.fuentes.push({ medio: hecho.medio, cantidad: 1 });
    }
    
    // Cerrar modal y renderizar
    document.getElementById('vincular-hilo-modal').classList.add('hidden');
    renderHilosNarrativos();
    renderHechosSinHilo();
    showToast(`Hecho vinculado a "${hilo.titulo}"`);
}

// Abrir detalle de hecho
function openHechoDetalle(hecho) {
    const modal = document.getElementById('detalle-hecho-modal');
    const titulo = document.getElementById('detalle-titulo');
    const contenido = document.getElementById('detalle-contenido');
    const fuente = document.getElementById('detalle-fuente');
    const url = document.getElementById('detalle-url');
    const importancia = document.getElementById('hecho-importancia');
    const importanciaValor = document.getElementById('hecho-importancia-valor');
    const hilosVinculados = document.getElementById('hilos-vinculados');
    
    state.selectedHecho = hecho;
    titulo.textContent = hecho.contenido.substring(0, 50) + (hecho.contenido.length > 50 ? '...' : '');
    contenido.textContent = hecho.contenido;
    fuente.textContent = `${hecho.medio} - ${hecho.articulo_titulo || 'Artículo'}`;
    url.href = hecho.url || '#';
    importancia.value = hecho.importancia;
    importanciaValor.textContent = `${hecho.importancia}/10`;
    
    // Mostrar hilos vinculados
    hilosVinculados.innerHTML = '';
    if (hecho.hilo_id) {
        const hilo = state.hilosNarrativos.find(h => h.id === hecho.hilo_id);
        if (hilo) {
            const tag = document.createElement('span');
            tag.className = 'bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm';
            tag.textContent = hilo.titulo;
            hilosVinculados.appendChild(tag);
        }
    }
    
    modal.classList.remove('hidden');
}

// Mostrar fuentes
function showSources(fuentes) {
    let sourceText = 'Fuentes:\n\n';
    fuentes.forEach(f => {
        sourceText += `${f.medio}: ${f.cantidad} artículo${f.cantidad > 1 ? 's' : ''}\n`;
    });
    alert(sourceText);
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
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

// Obtener total de menciones
function getTotalMentions(fuentes) {
    return fuentes.reduce((total, f) => total + f.cantidad, 0);
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
