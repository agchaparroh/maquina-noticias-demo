const mockData = {
    articulosProblemas: [
        {
            id: 1,
            titular: "Error en la extracción del contenido del artículo",
            estado_procesamiento: "error_extraccion",
            url: "#",
            medio: "El País"
        },
        {
            id: 2,
            titular: "Error al guardar en la base de datos",
            estado_procesamiento: "error_bd",
            url: "#",
            medio: "La Nación"
        },
        {
            id: 3,
            titular: "Múltiples entidades no pudieron ser normalizadas",
            estado_procesamiento: "intervencion_requerida",
            url: "#",
            medio: "El Universal"
        }
    ],
    
    hilosActivos: [
        {
            id: 1,
            titulo: "Crisis diplomática España – Argentina",
            relevancia_editorial: 9,
            fecha_ultimo_hecho: "2025-05-03"
        },
        {
            id: 2,
            titulo: "Acuerdo comercial Brasil-Chile",
            relevancia_editorial: 7,
            fecha_ultimo_hecho: "2025-05-02"
        },
        {
            id: 3,
            titulo: "Elecciones presidenciales Colombia 2025",
            relevancia_editorial: 8,
            fecha_ultimo_hecho: "2025-05-01"
        },
        // ... más hilos hasta tener suficiente para 30+ noticias
    ],
    
    hechos: [
        // Hilo 1: Crisis diplomática España-Argentina (9/10 relevancia)
        {
            id: 1,
            contenido: "El presidente argentino, Javier Milei, criticó duramente al gobierno español durante su discurso en la cumbre de Madrid, calificando sus políticas económicas como 'fracasadas e ideologizadas'.",
            fecha_ocurrencia: { inicio: "2025-05-03T14:30:00" },
            importancia: 9,
            tipo_hecho: "DECLARACION",
            articulos_relacionados: [
                { medio: "El País", titular: "Milei provoca tensión con España", url: "#1" },
                { medio: "ABC", titular: "Duras críticas de Milei", url: "#2" },
                { medio: "El Mundo", titular: "Crisis diplomática", url: "#3" },
                { medio: "La Vanguardia", titular: "Milei arremete contra España", url: "#4" },
                { medio: "El Periódico", titular: "Tensión España-Argentina", url: "#5" }
            ],
            hilo_vinculado: { id: 1, titulo: "Crisis diplomática España – Argentina" },
            entidades_mencionadas: ["Javier Milei", "España", "Argentina", "Madrid"]
        },
        {
            id: 2,
            contenido: "El Gobierno español ha llamado a consultas al embajador en Argentina tras las declaraciones de Milei, calificándolas de 'inaceptables y faltas de respeto institucional'.",
            fecha_ocurrencia: { inicio: "2025-05-03T19:15:00" },
            importancia: 8,
            tipo_hecho: "ANUNCIO",
            articulos_relacionados: [
                { medio: "El País", titular: "España llama a consultas", url: "#6" },
                { medio: "ABC", titular: "Respuesta española", url: "#7" },
                { medio: "La Vanguardia", titular: "Medidas diplomáticas", url: "#8" }
            ],
            hilo_vinculado: { id: 1, titulo: "Crisis diplomática España – Argentina" },
            entidades_mencionadas: ["España", "Argentina", "Embajador"]
        },
        {
            id: 3,
            contenido: "Reacciones de los empresarios españoles con inversiones en Argentina ante la escalada de tensiones.",
            fecha_ocurrencia: { inicio: "2025-05-03T10:00:00" },
            importancia: 6,
            tipo_hecho: "DECLARACION",
            articulos_relacionados: [
                { medio: "Expansión", titular: "Empresarios españoles preocupados", url: "#9" },
                { medio: "Cinco Días", titular: "Inversiones en riesgo", url: "#10" }
            ],
            hilo_vinculado: { id: 1, titulo: "Crisis diplomática España – Argentina" },
            entidades_mencionadas: ["empresarios", "España", "Argentina"]
        },
        
        // Hilo 2: Acuerdo comercial Brasil-Chile (7/10 relevancia)
        {
            id: 4,
            contenido: "Brasil y Chile firmaron un histórico acuerdo comercial que eliminará aranceles en más de 500 productos durante los próximos 3 años.",
            fecha_ocurrencia: { inicio: "2025-05-02T16:30:00" },
            importancia: 7,
            tipo_hecho: "ANUNCIO",
            articulos_relacionados: [
                { medio: "El Mercurio", titular: "Acuerdo histórico Brasil-Chile", url: "#11" },
                { medio: "O Globo", titular: "Pacto comercial estratégico", url: "#12" },
                { medio: "La Tercera", titular: "Nueva era comercial", url: "#13" }
            ],
            hilo_vinculado: { id: 2, titulo: "Acuerdo comercial Brasil-Chile" },
            entidades_mencionadas: ["Brasil", "Chile", "Fernando Haddad"]
        },
        {
            id: 5,
            contenido: "Los sectores más beneficiados por el acuerdo serán tecnología, agricultura y manufacturas, especialmente en el corredor bioceánico.",
            fecha_ocurrencia: { inicio: "2025-05-02T10:15:00" },
            importancia: 6,
            tipo_hecho: "ANALISIS",
            articulos_relacionados: [
                { medio: "El Mercurio", titular: "Sectores beneficiados", url: "#14" },
                { medio: "La Tercera", titular: "Oportunidades económicas", url: "#15" }
            ],
            hilo_vinculado: { id: 2, titulo: "Acuerdo comercial Brasil-Chile" },
            entidades_mencionadas: ["Brasil", "Chile", "tecnología", "agricultura"]
        },
        
        // ... continuar con más hilos hasta tener 30+ noticias
        // Hilo 3: Elecciones Colombia
        // Más noticias de diferentes relevancia y países
    ]
};

// Función para generar más noticias dinámicamente
function generateMoreHechos() {
    const baseHechos = mockData.hechos;
    const newHechos = [];
    
    for (let i = baseHechos.length; i < 30; i++) {
        const hechoBase = baseHechos[i % baseHechos.length];
        const newHecho = JSON.parse(JSON.stringify(hechoBase));
        newHecho.id = i + 1;
        newHechos.push(newHecho);
    }
    
    return [...baseHechos, ...newHechos];
}

mockData.hechos = generateMoreHechos();
