// mockData.js - Datos simulados para la Máquina de Noticias

const mockData = {
    hilosNarrativos: [
        {
            id: 1,
            titulo: "Conflicto entre FARC y ELN en Arauca",
            relevancia: 9,
            titular_principal: "Intensos combates entre FARC y ELN dejan decenas de muertos en Arauca",
            hechos: [
                {
                    id: 101,
                    contenido: "FARC y ELN se enfrentan violentamente en zona fronteriza con Venezuela",
                    fecha: "2024-03-15T10:30:00",
                    medio: "El Tiempo",
                    importancia: 8,
                    url: "https://www.eltiempo.com/conflicto-farc-eln-arauca",
                    hilo_id: 1
                },
                {
                    id: 102,
                    contenido: "Desplazamiento masivo de civiles en Arauca por conflicto armado",
                    fecha: "2024-03-16T09:15:00",
                    medio: "El Espectador",
                    importancia: 7,
                    url: "https://www.elespectador.com/desplazamiento-arauca",
                    hilo_id: 1
                },
                {
                    id: 103,
                    contenido: "Alerta humanitaria en Arauca: más de 5,000 personas afectadas",
                    fecha: "2024-03-17T11:45:00",
                    medio: "Caracol Radio",
                    importancia: 9,
                    url: "https://caracol.com.co/alerta-humanitaria-arauca",
                    hilo_id: 1
                }
            ],
            fuentes: [
                { medio: "El Tiempo", cantidad: 5 },
                { medio: "El Espectador", cantidad: 3 },
                { medio: "Caracol Radio", cantidad: 4 },
                { medio: "Semana", cantidad: 2 }
            ],
            paises: ["Colombia", "Venezuela"]
        },
        {
            id: 2,
            titulo: "Crisis institucional en Guatemala",
            relevancia: 7,
            titular_principal: "Escándalo de corrupción sacude el sistema de justicia guatemalteco",
            hechos: [
                {
                    id: 104,
                    contenido: "Fiscal General de Guatemala investiga red de corrupción en la justicia",
                    fecha: "2024-03-14T15:20:00",
                    medio: "Prensa Libre",
                    importancia: 8,
                    url: "https://www.prensalibre.com/corrupcion-justicia",
                    hilo_id: 2
                },
                {
                    id: 105,
                    contenido: "Protestas en Ciudad de Guatemala exigen renuncia de magistrados",
                    fecha: "2024-03-15T17:00:00",
                    medio: "El Periódico",
                    importancia: 7,
                    url: "https://elperiodico.com.gt/protestas-justicia",
                    hilo_id: 2
                }
            ],
            fuentes: [
                { medio: "Prensa Libre", cantidad: 8 },
                { medio: "El Periódico", cantidad: 5 },
                { medio: "Soy502", cantidad: 3 }
            ],
            paises: ["Guatemala"]
        }
    ],
    
    hechosSinHilo: [
        {
            id: 201,
            contenido: "Bitcoin alcanza nuevo máximo histórico superando los $50,000",
            fecha: "2024-03-18T14:20:00",
            medio: "Portafolio",
            importancia: 6,
            url: "https://www.portafolio.co/economia/bitcoin-precio-record"
        },
        {
            id: 202,
            contenido: "Nuevo descubrimiento arqueológico en Ciudad Perdida",
            fecha: "2024-03-18T16:45:00",
            medio: "El Heraldo",
            importancia: 5,
            url: "https://www.elheraldo.co/descubrimiento-ciudad-perdida"
        },
        {
            id: 203,
            contenido: "Reforma pensional avanza en el Congreso con apoyo de la oposición",
            fecha: "2024-03-18T18:30:00",
            medio: "El Colombiano",
            importancia: 8,
            url: "https://www.elcolombiano.com/reforma-pensional-congreso"
        },
        {
            id: 204,
            contenido: "Colombia firma acuerdo comercial con República Checa",
            fecha: "2024-03-18T20:15:00",
            medio: "El Espectador",
            importancia: 6,
            url: "https://www.elespectador.com/acuerdo-comercial-checa"
        },
        {
            id: 205,
            contenido: "Descubren nueva especie de ave en el Chocó",
            fecha: "2024-03-19T09:00:00",
            medio: "National Geographic",
            importancia: 4,
            url: "https://www.nationalgeographicla.com/nueva-ave-choco"
        }
    ],
    
    articulosProblemas: [
        {
            titular: "Crisis en Venezuela: Maduro busca reelección amidst international opposition",
            medio: "El Nuevo Siglo",
            fecha: "17/03/24 14:30",
            estado: "DUPLICADO",
            error: "Artículo duplicado con la misma fuente (ref: #78923)",
            url: "https://www.elnuevosiglo.com/articulos/crisis-venezuela-maduro"
        },
        {
            titular: "Investigación sobre corrupción en la alcaldía de Medellín revela nuevos casos",
            medio: "RCN Noticias",
            fecha: "17/03/24 15:45",
            estado: "POR REVISAR",
            error: "Falta verificación de fuentes secundarias - pendiente confirmación",
            url: "https://www.rcnradio.com/investigacion-corrupcion-medellin"
        },
        {
            titular: "Nuevo proyecto minero en el Chocó genera polémica ambiental y social",
            medio: "Blu Radio",
            fecha: "17/03/24 16:20",
            estado: "VERIFICAR",
            error: "Inconsistencias en las cifras mencionadas (inversión $500M vs $800M)",
            url: "https://www.bluradio.com/proyecto-minero-choco"
        }
    ],
    
    hilosActivos: [
        {
            titulo: "Crisis Política en Guatemala",
            relevancia_editorial: 7
        },
        {
            titulo: "Tensiones Colombia-Venezuela",
            relevancia_editorial: 8
        },
        {
            titulo: "Reforma Pensional en Colombia",
            relevancia_editorial: 8
        },
        {
            titulo: "Situación de DD.HH. en El Salvador",
            relevancia_editorial: 6
        },
        {
            titulo: "Proceso de Paz Total en Colombia",
            relevancia_editorial: 9
        },
        {
            titulo: "Política migratoria México-USA",
            relevancia_editorial: 7
        },
        {
            titulo: "Reforma judicial en Brasil",
            relevancia_editorial: 5
        },
        {
            titulo: "Crisis económica en Argentina",
            relevancia_editorial: 8
        }
    ],
    
    // Datos adicionales para simulación
    hechos: [
        // Todos los hechos (combinando los de hilosNarrativos y hechosSinHilo)
        // Este array se usa para operaciones de búsqueda y filtrado
    ]
};

// Inicializar el array hechos combinando todos
mockData.hechos = [
    ...mockData.hilosNarrativos.flatMap(hilo => hilo.hechos),
    ...mockData.hechosSinHilo
];
