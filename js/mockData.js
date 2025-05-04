// mockData.js - Datos simulados para la Máquina de Noticias

const mockData = {
    hilosNarrativos: [
        {
            id: 1,
            titulo: "Conflicto entre FARC y ELN en Arauca",
            relevancia: 10,
            titular_principal: "Intensos combates entre FARC y ELN dejan decenas de muertos en Arauca",
            hechos: [
                {
                    id: 101,
                    contenido: "FARC y ELN se enfrentan violentamente en zona fronteriza con Venezuela",
                    fecha: "2024-03-15T10:30:00",
                    medio: "El Tiempo",
                    importancia: 8,
                    url: "https://www.eltiempo.com/conflicto-farc-eln-arauca",
                    hilo_id: 1,
                    articulo_titulo: "Combates entre FARC y ELN en Arauca"
                },
                {
                    id: 102,
                    contenido: "Desplazamiento masivo de civiles en Arauca por conflicto armado",
                    fecha: "2024-03-16T09:15:00",
                    medio: "El Espectador",
                    importancia: 7,
                    url: "https://www.elespectador.com/desplazamiento-arauca",
                    hilo_id: 1,
                    articulo_titulo: "Crisis humanitaria en Arauca"
                },
                {
                    id: 103,
                    contenido: "Alerta humanitaria en Arauca: más de 5,000 personas afectadas",
                    fecha: "2024-03-17T11:45:00",
                    medio: "Caracol Radio",
                    importancia: 9,
                    url: "https://caracol.com.co/alerta-humanitaria-arauca",
                    hilo_id: 1,
                    articulo_titulo: "Alerta humanitaria en Arauca"
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
            relevancia: 9,
            titular_principal: "Escándalo de corrupción sacude el sistema de justicia guatemalteco",
            hechos: [
                {
                    id: 104,
                    contenido: "Fiscal General de Guatemala investiga red de corrupción en la justicia",
                    fecha: "2024-03-14T15:20:00",
                    medio: "Prensa Libre",
                    importancia: 8,
                    url: "https://www.prensalibre.com/corrupcion-justicia",
                    hilo_id: 2,
                    articulo_titulo: "Investigación sobre corrupción en la justicia"
                },
                {
                    id: 105,
                    contenido: "Protestas en Ciudad de Guatemala exigen renuncia de magistrados",
                    fecha: "2024-03-15T17:00:00",
                    medio: "El Periódico",
                    importancia: 7,
                    url: "https://elperiodico.com.gt/protestas-justicia",
                    hilo_id: 2,
                    articulo_titulo: "Protestas contra la justicia guatemalteca"
                },
                {
                    id: 106,
                    contenido: "Presidente guatemalteco convoca a diálogo nacional sobre reforma judicial",
                    fecha: "2024-03-17T08:45:00",
                    medio: "Soy502",
                    importancia: 8,
                    url: "https://www.soy502.com/dialogo-reforma-judicial",
                    hilo_id: 2,
                    articulo_titulo: "Diálogo nacional sobre reforma judicial"
                }
            ],
            fuentes: [
                { medio: "Prensa Libre", cantidad: 8 },
                { medio: "El Periódico", cantidad: 5 },
                { medio: "Soy502", cantidad: 3 }
            ],
            paises: ["Guatemala"]
        },
        {
            id: 3,
            titulo: "Reforma pensional en Colombia",
            relevancia: 8,
            titular_principal: "Congreso colombiano aprueba en primera instancia reforma pensional",
            hechos: [
                {
                    id: 107,
                    contenido: "Senado colombiano aprueba reforma pensional con 52 votos a favor",
                    fecha: "2024-03-18T16:20:00",
                    medio: "El Colombiano",
                    importancia: 8,
                    url: "https://www.elcolombiano.com/senado-aprueba-reforma",
                    hilo_id: 3,
                    articulo_titulo: "Senado aprueba reforma pensional"
                },
                {
                    id: 108,
                    contenido: "Pensionados protestan en Bogotá contra nueva reforma",
                    fecha: "2024-03-19T09:00:00",
                    medio: "RCN Radio",
                    importancia: 6,
                    url: "https://www.rcnradio.com/protestas-pensionados",
                    hilo_id: 3,
                    articulo_titulo: "Protestas de pensionados"
                },
                {
                    id: 109,
                    contenido: "Analistas evalúan impacto económico de reforma pensional",
                    fecha: "2024-03-19T14:30:00",
                    medio: "Portafolio",
                    importancia: 7,
                    url: "https://www.portafolio.co/analisis-reforma",
                    hilo_id: 3,
                    articulo_titulo: "Análisis económico de reforma pensional"
                }
            ],
            fuentes: [
                { medio: "El Colombiano", cantidad: 7 },
                { medio: "RCN Radio", cantidad: 4 },
                { medio: "Portafolio", cantidad: 5 },
                { medio: "El Espectador", cantidad: 3 }
            ],
            paises: ["Colombia"]
        },
        {
            id: 4,
            titulo: "Elecciones presidenciales en Argentina",
            relevancia: 8,
            titular_principal: "Javier Milei gana primera vuelta presidencial en Argentina",
            hechos: [
                {
                    id: 110,
                    contenido: "Javier Milei sorprende con victoria en primera vuelta electoral",
                    fecha: "2024-03-17T22:30:00",
                    medio: "La Nación",
                    importancia: 9,
                    url: "https://www.lanacion.com.ar/milei-primera-vuelta",
                    hilo_id: 4,
                    articulo_titulo: "Victoria de Milei en primera vuelta"
                },
                {
                    id: 111,
                    contenido: "Mercados financieros argentinos reaccionan a resultados electorales",
                    fecha: "2024-03-18T09:15:00",
                    medio: "Ámbito",
                    importancia: 7,
                    url: "https://www.ambito.com/mercados-elecciones",
                    hilo_id: 4,
                    articulo_titulo: "Reacción de mercados a elecciones"
                },
                {
                    id: 112,
                    contenido: "Analistas internacionales evalúan impacto de nueva presidencia en Argentina",
                    fecha: "2024-03-18T13:45:00",
                    medio: "Clarín",
                    importancia: 8,
                    url: "https://www.clarin.com/analisis-internacional",
                    hilo_id: 4,
                    articulo_titulo: "Análisis internacional de las elecciones"
                }
            ],
            fuentes: [
                { medio: "La Nación", cantidad: 12 },
                { medio: "Clarín", cantidad: 8 },
                { medio: "Ámbito", cantidad: 6 },
                { medio: "Perfil", cantidad: 5 }
            ],
            paises: ["Argentina", "Brasil", "Uruguay"]
        },
        {
            id: 5,
            titulo: "Tensiones fronterizas Ecuador-Colombia",
            relevancia: 7,
            titular_principal: "Ecuador refuerza vigilancia fronteriza tras ataques de grupos ilegales",
            hechos: [
                {
                    id: 113,
                    contenido: "Ecuador moviliza tropas a la frontera con Colombia por incursiones armadas",
                    fecha: "2024-03-16T11:20:00",
                    medio: "El Universo",
                    importancia: 7,
                    url: "https://www.eluniverso.com/tropas-frontera",
                    hilo_id: 5,
                    articulo_titulo: "Movilización militar en frontera"
                },
                {
                    id: 114,
                    contenido: "Colombia y Ecuador coordinan operativo conjunto para neutralizar amenazas",
                    fecha: "2024-03-17T15:30:00",
                    medio: "El Tiempo",
                    importancia: 8,
                    url: "https://www.eltiempo.com/operativo-conjunto",
                    hilo_id: 5,
                    articulo_titulo: "Operativo conjunto binacional"
                }
            ],
            fuentes: [
                { medio: "El Universo", cantidad: 6 },
                { medio: "El Tiempo", cantidad: 5 },
                { medio: "La Hora", cantidad: 4 }
            ],
            paises: ["Ecuador", "Colombia"]
        },
        {
            id: 6,
            titulo: "Crisis política en Perú",
            relevancia: 7,
            titular_principal: "Dina Boluarte enfrenta solicitud de vacancia presidencial",
            hechos: [
                {
                    id: 115,
                    contenido: "Congreso peruano admite moción de vacancia contra presidenta Boluarte",
                    fecha: "2024-03-18T10:00:00",
                    medio: "El Comercio",
                    importancia: 8,
                    url: "https://elcomercio.pe/congreso-vacancia",
                    hilo_id: 6,
                    articulo_titulo: "Moción de vacancia contra Boluarte"
                },
                {
                    id: 116,
                    contenido: "Protestas en Lima exigen renuncia de la presidenta",
                    fecha: "2024-03-18T17:45:00",
                    medio: "RPP Noticias",
                    importancia: 7,
                    url: "https://rpp.pe/protestas-lima",
                    hilo_id: 6,
                    articulo_titulo: "Protestas contra la presidenta"
                }
            ],
            fuentes: [
                { medio: "El Comercio", cantidad: 9 },
                { medio: "RPP Noticias", cantidad: 6 },
                { medio: "La República", cantidad: 7 }
            ],
            paises: ["Perú"]
        },
        {
            id: 7,
            titulo: "Migración en México",
            relevancia: 6,
            titular_principal: "México registra aumento del 40% en solicitudes de asilo",
            hechos: [
                {
                    id: 117,
                    contenido: "AMLO anuncia plan para gestionar aumento de solicitudes de asilo",
                    fecha: "2024-03-18T09:30:00",
                    medio: "Reforma",
                    importancia: 6,
                    url: "https://www.reforma.com/plan-asilo",
                    hilo_id: 7,
                    articulo_titulo: "Plan de asilo de AMLO"
                },
                {
                    id: 118,
                    contenido: "CNDH recomienda mejoras en condiciones de albergues para migrantes",
                    fecha: "2024-03-19T11:15:00",
                    medio: "El Universal",
                    importancia: 5,
                    url: "https://www.eluniversal.com.mx/cndh-albergues",
                    hilo_id: 7,
                    articulo_titulo: "Condiciones de albergues migrantes"
                }
            ],
            fuentes: [
                { medio: "Reforma", cantidad: 5 },
                { medio: "El Universal", cantidad: 6 },
                { medio: "Proceso", cantidad: 4 }
            ],
            paises: ["México", "Estados Unidos", "Nicaragua"]
        }
    ],
    
    hechosSinHilo: [
        {
            id: 205,
            contenido: "Descubren nueva especie de ave en el Chocó",
            fecha: "2024-03-19T09:00:00",
            medio: "National Geographic",
            importancia: 4,
            url: "https://www.nationalgeographicla.com/nueva-ave-choco",
            articulo_titulo: "Nueva especie de ave en Colombia"
        },
        {
            id: 210,
            contenido: "Plataforma digital conecta productores rurales con mercados urbanos",
            fecha: "2024-03-19T16:45:00",
            medio: "La Prensa",
            importancia: 5,
            url: "https://prensa.com/plataforma-rural-urbana",
            articulo_titulo: "Conexión digital rural-urbana"
        },
        {
            id: 207,
            contenido: "Inteligencia artificial revoluciona sector educativo en Brasil",
            fecha: "2024-03-19T11:15:00",
            medio: "O Globo",
            importancia: 6,
            url: "https://oglobo.globo.com/ia-educacao",
            articulo_titulo: "IA en educación brasileña"
        },
        {
            id: 201,
            contenido: "Bitcoin alcanza nuevo máximo histórico superando los $50,000",
            fecha: "2024-03-18T14:20:00",
            medio: "Portafolio",
            importancia: 6,
            url: "https://www.portafolio.co/economia/bitcoin-precio-record",
            articulo_titulo: "Bitcoin rompe récord histórico"
        },
        {
            id: 204,
            contenido: "Colombia firma acuerdo comercial con República Checa",
            fecha: "2024-03-18T20:15:00",
            medio: "El Espectador",
            importancia: 6,
            url: "https://www.elespectador.com/acuerdo-comercial-checa",
            articulo_titulo: "Acuerdo comercial con República Checa"
        },
        {
            id: 206,
            contenido: "América Latina crecerá 2.1% en 2024 según FMI",
            fecha: "2024-03-19T10:30:00",
            medio: "Bloomberg Línea",
            importancia: 7,
            url: "https://www.bloomberglinea.com/fmi-latam-2024",
            articulo_titulo: "Proyecciones económicas FMI"
        },
        {
            id: 209,
            contenido: "Científicos chilenos crean vacuna contra hantavirus",
            fecha: "2024-03-19T15:00:00",
            medio: "El Mercurio",
            importancia: 7,
            url: "https://www.elmercurio.com/vacuna-hantavirus",
            articulo_titulo: "Avance científico en vacunas"
        },
        {
            id: 203,
            contenido: "Reforma pensional avanza en el Congreso con apoyo de la oposición",
            fecha: "2024-03-18T18:30:00",
            medio: "El Colombiano",
            importancia: 8,
            url: "https://www.elcolombiano.com/reforma-pensional-congreso",
            articulo_titulo: "Avances en reforma pensional"
        },
        {
            id: 208,
            contenido: "Descubren yacimiento de litio en Chile valorado en $150 mil millones",
            fecha: "2024-03-19T13:30:00",
            medio: "La Tercera",
            importancia: 8,
            url: "https://www.latercera.com/yacimiento-litio",
            articulo_titulo: "Hallazgo de yacimiento millonario"
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
        },
        {
            titular: "Explosión en refinería de Barrancabermeja deja múltiples heridos",
            medio: "El Heraldo",
            fecha: "18/03/24 08:15",
            estado: "SIN CONFIRMAR",
            error: "Información no verificada - solo un reporte de testigo presencial",
            url: "https://www.elheraldo.co/explosion-refineria"
        },
        {
            titular: "Escándalo en FIFA: Colombia bajo investigación por sobornos",
            medio: "El País",
            fecha: "18/03/24 10:30",
            estado: "ERROR",
            error: "Contenido falso - la noticia no corresponde a hechos reales",
            url: "https://www.elpais.com.co/fifa-colombia-investigacion"
        },
        {
            titular: "Ministro de Educación renuncia tras controversia por reforma curricular",
            medio: "Semana",
            fecha: "18/03/24 11:45",
            estado: "POR CONFIRMAR",
            error: "Solo fuente anónima - requiere confirmación oficial",
            url: "https://www.semana.com/ministro-educacion-renuncia"
        },
        {
            titular: "Crisis energética: Colombia importará electricidad de Venezuela",
            medio: "La República",
            fecha: "18/03/24 14:20",
            estado: "CONTRADICCIONES",
            error: "Datos conflictivos con informe oficial del Ministerio de Energía",
            url: "https://www.larepublica.co/colombia-venezuela-electricidad"
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
