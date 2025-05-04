// chat.js - Lógica para el Chat de Investigación

let currentHilo = null;
let savedQueries = [];

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    let hechoId = urlParams.get('hecho');
    const hiloId = urlParams.get('hilo');
    
    // Si viene de un hilo, cargar ese contexto
    if (hiloId) {
        const hilo = mockData.hilosNarrativos.find(h => h.id === parseInt(hiloId));
        if (hilo) {
            loadHiloContext(hilo);
            // Si no hay hechoId pero hay hilo, generar explicación detallada
            if (!hechoId) {
                const hechoInicial = document.getElementById('hecho-inicial');
                hechoInicial.innerHTML = generateHiloExplicacion(hilo);
            }
        }
    }
    
    // Si hay un hechoId específico, cargar ese hecho
    if (hechoId) {
        const hecho = findHechoById(parseInt(hechoId));
        if (hecho) {
            const hechoInicial = document.getElementById('hecho-inicial');
            hechoInicial.textContent = generateExplicacion(hecho);
        }
    }
    
    // Si no hay ni hilo ni hecho, mostrar mensaje genérico
    if (!hiloId && !hechoId) {
        const hechoInicial = document.getElementById('hecho-inicial');
        hechoInicial.innerHTML = `
            <p>Bienvenido al Chat de Investigación. Puede usar esta herramienta para:</p>
            <ul class="list-disc list-inside mt-2">
                <li>Consultar hilos narrativos específicos</li>
                <li>Buscar hechos por entidades o temas</li>
                <li>Explorar conexiones entre eventos</li>
            </ul>
            <p class="mt-2">Comience escribiendo su consulta...</p>
        `;
    }
    
    // Configurar chat
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        // Añadir mensaje del usuario
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'text-right';
        userMessageDiv.innerHTML = `
            <div class="inline-block bg-blue-50 text-blue-800 rounded p-3 max-w-[80%] text-sm">
                ${message}
            </div>
        `;
        chatMessages.appendChild(userMessageDiv);
        
        messageInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Mostrar indicador de procesamiento
        const processingDiv = document.createElement('div');
        processingDiv.className = 'text-left';
        processingDiv.innerHTML = `
            <div class="inline-block bg-gray-50 text-gray-600 rounded p-3 max-w-[80%] text-sm italic">
                ${getProcessingMessage()}
            </div>
        `;
        chatMessages.appendChild(processingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Procesar la consulta
        processQuery(message, processingDiv);
    }
});

function loadHiloContext(hilo) {
    currentHilo = hilo;
    const chatHeader = document.getElementById('chat-header');
    const chatContext = document.getElementById('chat-context');
    chatHeader.classList.remove('hidden');
    chatContext.textContent = hilo.titulo; // Sin corchetes
}

function getProcessingMessage() {
    const messages = [
        "Interpretando consulta...",
        "Analizando contexto...",
        "Consultando base de datos..."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function processQuery(query, processingDiv) {
    setTimeout(() => {
        processingDiv.remove();
        
        let response = '';
        
        // Responder basado en la consulta y el contexto
        if (query.toLowerCase().includes('cronología') && currentHilo?.id === 1) {
            response = generateCronologiaResponse();
        } else if (query.toLowerCase().includes('declaración oficial') && currentHilo?.id === 1) {
            response = generateDeclaracionResponse();
        } else if (query.toLowerCase().includes('guarda') && query.toLowerCase().includes('búsqueda')) {
            // Extraer el nombre a guardar
            const matches = query.match(/'(.+)'/);
            if (matches) {
                const savedName = matches[1];
                savedQueries.push({name: savedName, query: query.split("'")[0]});
                response = `Consulta guardada como '${savedName}'`;
            }
        } else {
            response = generateGenericResponse(query);
        }
        
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'text-left';
        botMessageDiv.innerHTML = `
            <div class="inline-block bg-gray-50 text-gray-800 rounded p-3 max-w-[80%] text-sm">
                ${response}
            </div>
        `;
        chatMessages.appendChild(botMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
}

function generateCronologiaResponse() {
    return `
        <div class="space-y-4">
            <p class="font-medium mb-2">Aquí tienes la cronología de eventos relevantes de la última semana para el hilo "[Conflicto entre las disidencias de las FARC y el ELN]":</p>
            
            <div class="pl-4 border-l-4 border-red-500">
                <p><strong>Hoy (29-Jul):</strong> Reportan enfrentamiento entre ELN y Disidencias FARC en zona rural de Tibú, cerca de Arauca. Se mencionan combates por control territorial.</p>
                <p class="text-sm text-gray-600">(Tipo: SUCESO, Importancia: 7/10) (Fuente: El Tiempo)</p>
            </div>
            
            <div class="pl-4 border-l-4 border-yellow-500">
                <p><strong>27-Jul:</strong> Comunicado atribuido a alias 'John Mechas' amenaza con "respuesta contundente" a incursiones del ELN en sus zonas de influencia.</p>
                <p class="text-sm text-gray-600">(Tipo: DECLARACION, Importancia: 6/10) (Fuente: Análisis Insight Crime)</p>
            </div>
            
            <div class="pl-4 border-l-4 border-blue-500">
                <p><strong>24-Jul:</strong> Autoridades reportan desplazamiento de familias en vereda de Sardinata debido a presencia de ambos grupos armados.</p>
                <p class="text-sm text-gray-600">(Tipo: SUCESO, Importancia: 5/10) (Fuente: Defensoría del Pueblo)</p>
            </div>
            
            <p class="mt-4 text-sm text-gray-600">La información se basa en los hechos vinculados a este hilo narrativo.</p>
        </div>
    `;
}

function generateDeclaracionResponse() {
    return `
        <div class="space-y-4">
            <p>No he encontrado declaraciones oficiales específicas del Gobierno Colombia o del Ministerio de Defensa sobre el enfrentamiento reportado hoy en Tibú vinculadas directamente a este hilo.</p>
            
            <p>Sin embargo, en un hecho relacionado del 26-Jul, el Ministro de Defensa mencionó la "preocupante situación de orden público en el Catatumbo" y anunció refuerzo militar en la zona.</p>
            <p class="text-sm text-gray-600">(Tipo: DECLARACION, Importancia: 6/10) (Fuente: Rueda de Prensa MinDefensa)</p>
        </div>
    `;
}

function generateGenericResponse(query) {
    return `Esta es una simulación. En la implementación real, aquí aparecería una respuesta contextual basada en la consulta "${query}" ${currentHilo ? `dentro del hilo "${currentHilo.titulo}"` : ''}.`;
}

function findHechoById(id) {
    let hecho = mockData.hechosSinHilo.find(h => h.id === id);
    if (hecho) return hecho;
    
    for (const hilo of mockData.hilosNarrativos) {
        hecho = hilo.hechos.find(h => h.id === id);
        if (hecho) return hecho;
    }
    
    return null;
}

function generateHiloExplicacion(hilo) {
    const totalHechos = hilo.hechos.length;
    const primerHecho = hilo.hechos.reduce((prev, current) => 
        new Date(prev.fecha) < new Date(current.fecha) ? prev : current
    );
    const ultimoHecho = hilo.hechos.reduce((prev, current) => 
        new Date(prev.fecha) > new Date(current.fecha) ? prev : current
    );
    
    const paisesText = hilo.paises.join(', ');
    const fuentesTotal = getTotalMentionsForHilo(hilo.fuentes);
    
    return `
        <div class="prose prose-sm">
            <h3 class="text-lg font-bold mb-3">${hilo.titular_principal}</h3>
            
            <p class="mb-4">
                Este hilo narrativo aborda <strong>${hilo.titulo}</strong>, 
                un desarrollo de alta relevancia (<strong>${hilo.relevancia}/10</strong>) en el panorama informativo actual.
            </p>
            
            <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p><strong>Seguimiento:</strong> ${totalHechos} eventos documentados</p>
                <p><strong>Período:</strong> ${formatDate(primerHecho.fecha)} - ${formatDate(ultimoHecho.fecha)}</p>
                <p><strong>Cobertura:</strong> ${hilo.paises.length > 0 ? paisesText : 'Regional'}</p>
            </div>
            
            <h4 class="font-bold mb-2">Desarrollo actual</h4>
            <p class="mb-4">
                Los acontecimientos recientes indican ${ultimoHecho.contenido.toLowerCase()}, 
                lo que representa el último avance significativo en esta línea de investigación.
            </p>
            
            <div class="mb-4">
                <h4 class="font-bold mb-2">Fuentes principales</h4>
                <ul class="list-disc list-inside">
                    ${hilo.fuentes.map(fuente => `
                        <li>${fuente.medio}: ${fuente.cantidad} ${fuente.cantidad === 1 ? 'reporte' : 'reportes'}</li>
                    `).join('')}
                </ul>
            </div>
            
            <p class="text-sm text-gray-600 italic">
                Puede consultar sobre cualquier aspecto específico de este hilo narrativo para obtener información más detallada.
            </p>
        </div>
    `;
}

function getTotalMentionsForHilo(fuentes) {
    return fuentes.reduce((total, f) => total + f.cantidad, 0);
}

function generateExplicacion(hecho) {
    const entidadesTexto = hecho.entidades_mencionadas?.join(', ') || '';
    return `
Este hecho noticioso ocurrió el ${new Date(hecho.fecha_ocurrencia?.inicio || hecho.fecha).toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
})} y tiene una importancia de ${hecho.importancia} en una escala del 1 al 10. Ha sido clasificado como ${hecho.tipo_hecho || 'SUCESO'} por nuestro sistema de categorización.

Este evento específico forma parte de una cadena de acontecimientos que están siendo monitoreados en tiempo real. La información ha sido procesada automáticamente desde múltiples fuentes de información confiables.

${hecho.entidades_mencionadas ? `Entre las entidades principales mencionadas en este evento destacan: ${entidadesTexto}.` : ''}

${hecho.hilo_id ? `Este hecho forma parte del hilo narrativo "${currentHilo?.titulo || `hilo #${hecho.hilo_id}`}", el cual agrupa eventos relacionados que permiten entender el contexto más amplio de esta situación. Los eventos dentro de un mismo hilo comparten elementos temáticos, geográficos o institucionales que facilitan el seguimiento de desarrollos complejos.` : 'Este hecho aún no está vinculado a ningún hilo narrativo específico, lo cual indica que puede ser un evento aislado o está en proceso de clasificación.'}

${hecho.medio ? `Ha sido reportado por ${hecho.medio}, una de las fuentes que formaparte de nuestra red de monitoreo. La información se corrobora mediante múltiples fuentes antes de ser integrada en el sistema de análisis.` : ''}

El sistema de IA analiza continuamente el flujo de información para identificar patrones, relaciones entre eventos y tendencias emergentes. Esta aproximación permite a los periodistas tener una visión más completa y contextualizada de los acontecimientos.

Puede consultar sobre cualquier aspecto específico de este hecho, como su relación con otros eventos, el contexto histórico, o detalles específicos de los actores involucrados.
    `.trim();
}
