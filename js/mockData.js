// Datos simulados para la Máquina de Noticias
const mockData = {
    // Hilos narrativos para la estructura de bloques
    hilosNarrativos: [
        {
            id: 1,
            titulo: "Crisis Política Perú",
            relevancia: 9,
            titular_principal: "Castillo declara inconstitucional propuesta de juicio político",
            hechos: [
                {
                    id: 101,
                    fecha: "2024-05-03T15:30:00",
                    contenido: "Presidente Castillo califica como 'golpe blanco' la iniciativa opositora",
                    importancia: 8,
                    hilo_id: 1
                },
                {
                    id: 102,
                    fecha: "2024-05-03T18:45:00",
                    contenido: "Parlamento peruano vota a favor de admitir juicio político con 67 votos",
                    importancia: 9,
                    hilo_id: 1
                },
                {
                    id: 103,
                    fecha: "2024-05-04T08:20:00",
                    contenido: "Castillo declara inconstitucional propuesta de juicio político",
                    importancia: 9,
                    hilo_id: 1
                },
                {
                    id: 104,
                    fecha: "2024-05-04T10:00:00",
                    contenido: "Analistas prevén profundización de la crisis institucional en Perú",
                    importancia: 7,
                    hilo_id: 1
                }
            ],
            fuentes: [
                { medio: "El Comercio", cantidad: 2 },
                { medio: "RPP", cantidad: 1 }
            ],
            paises: ["Perú"]
        },
        {
            id: 2,
            titulo: "El Mercado del Litio",
            relevancia: 8,
            titular_principal: "Gobierno de Chile anuncia nuevo plan de inversión en litio",
            hechos: [
                {
                    id: 201,
                    fecha: "2024-05-03T16:00:00",
                    contenido: "Gobierno argentino explora nuevas oportunidades en el triángulo del litio",
                    importancia: 7,
                    hilo_id: 2
                },
                {
                    id: 202,
                    fecha: "2024-05-04T09:15:00",
                    contenido: "Gobierno de Chile anuncia nuevo plan de inversión en litio",
                    importancia: 8,
                    hilo_id: 2
                },
                {
                    id: 203,
                    fecha: "2024-05-04T11:30:00",
                    contenido: "Empresas chinas aumentan interés en litio argentino",
                    importancia: 6,
                    hilo_id: 2
                },
                {
                    id: 204,
                    fecha: "2024-05-04T14:00:00",
                    contenido: "Bolivia busca acelerar proyectos de litio tras retraso de dos años",
                    importancia: 7,
                    hilo_id: 2
                }
            ],
            fuentes: [
                { medio: "La Tercera", cantidad: 2 },
                { medio: "Reuters", cantidad: 1 }
            ],
            paises: ["Chile", "Argentina", "Bolivia"]
        },
        {
            id: 3,
            titulo: "Proceso de Paz",
            relevancia: 7,
            titular_principal: "Iván Duque rechaza la invitación de diálogo de Petro al EPL",
            hechos: [
                {
                    id: 301,
                    fecha: "2024-05-03T14:00:00",
                    contenido: "FARC disidentes anuncian tregua en área del Pacífico",
                    importancia: 6,
                    hilo_id: 3
                },
                {
                    id: 302,
                    fecha: "2024-05-04T07:00:00",
                    contenido: "Reportan enfrentamiento entre ELN y disidencias FARC en Arauca",
                    importancia: 7,
                    hilo_id: 3
                },
                {
                    id: 303,
                    fecha: "2024-05-04T09:30:00",
                    contenido: "Iván Duque rechaza la invitación de diálogo de Petro al EPL",
                    importancia: 8,
                    hilo_id: 3
                },
                {
                    id: 304,
                    fecha: "2024-05-04T12:00:00",
                    contenido: "Comunidades afros reclaman mayor protección tras enfrentamientos",
                    importancia: 6,
                    hilo_id: 3
                }
            ],
            fuentes: [
                { medio: "El Tiempo", cantidad: 2 },
                { medio: "Noticias Caracol", cantidad: 1 }
            ],
            paises: ["Colombia"]
        }
    ],
    
    // Hechos sin hilo
    hechosSinHilo: [
        {
            id: 401,
            contenido: "Reportan enfrentamiento entre ELN y disidencias FARC en Arauca",
            fecha: "2024-05-04T07:00:00",
            importancia: 7,
            medio: "El Tiempo",
            articulo_titulo: "El ELN arremete contra el bastión cocalero de las disidencias del Frente 33",
            url: "#"
        }
    ],
    
    // Artículos con problemas
    articulosProblemas: [
        {
            id: 1,
            titular: "Alerta máxima en sistema de pensiones tras fusión bancaria",
            medio: "El Universal",
            fecha: "2024-05-04",
            estado: "Scraping Fallido",
            error: "Intento de conexión rechazado",
            url: "https://www.eluniversal.com.mx/ejemplo"
        },
        {
            id: 2,
            titular: "Crisis en el sector energético mexicano se profundiza",
            medio: "La Jornada",
            fecha: "2024-05-03",
            estado: "Error de Procesamiento",
            error: "Timeout en servidor",
            url: "https://www.jornada.com.mx/ejemplo"
        },
        {
            id: 3,
            titular: "Reforma agraria brasileña encuentra resistencia",
            medio: "O Globo",
            fecha: "2024-05-02",
            estado: "Extracción Parcial",
            error: "Contenido incompleto",
            url: "https://oglobo.globo.com/exemplo"
        }
    ],

    // Hilos activos para vinculación
    hilosActivos: [
        {
            id: 1,
            titulo: "Crisis diplomática España-Argentina",
            relevancia_editorial: 8,
            fecha_ultimo_hecho: "2024-05-02"
        },
        {
            id: 2,
            titulo: "Negociaciones comerciales Mercosur-UE",
            relevancia_editorial: 6,
            fecha_ultimo_hecho: "2024-04-29"
        },
        {
            id: 3,
            titulo: "Elecciones presidenciales Colombia 2025",
            relevancia_editorial: 9,
            fecha_ultimo_hecho: "2024-05-01"
        },
        {
            id: 4,
            titulo: "Crisis migratoria en la frontera México-EEUU",
            relevancia_editorial: 7,
            fecha_ultimo_hecho: "2024-05-02"
        },
        {
            id: 5,
            titulo: "Protestas por reforma judicial en Chile",
            relevancia_editorial: 5,
            fecha_ultimo_hecho: "2024-04-25"
        },
        {
            id: 6,
            titulo: "Conflicto entre las disidencias de las FARC y el ELN",
            relevancia_editorial: 8,
            fecha_ultimo_hecho: "2024-05-04"
        }
    ]
};

// Exportar datos para su uso en otros archivos
if (typeof module !== 'undefined') {
    module.exports = mockData;
}
