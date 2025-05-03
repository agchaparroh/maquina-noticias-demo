// Datos simulados para la Máquina de Noticias
const mockData = {
    // Artículos con problemas
    articulosProblemas: [
        {
            id: 1,
            titular: "Crisis diplomática entre España y Argentina tras declaraciones de Milei",
            medio: "El País",
            fecha_publicacion: "2025-04-28",
            url: "#",
            estado_procesamiento: "error_extraccion",
            error_detalle: "No se pudo extraer el contenido del artículo"
        },
        {
            id: 2,
            titular: "Nuevo pacto comercial entre Chile y Brasil entra en vigor",
            medio: "La Nación",
            fecha_publicacion: "2025-05-01",
            url: "#",
            estado_procesamiento: "error_bd",
            error_detalle: "Error al guardar en la base de datos"
        },
        {
            id: 3,
            titular: "El Banco Central de México aumenta las tasas de interés por tercera vez consecutiva",
            medio: "El Universal",
            fecha_publicacion: "2025-05-02",
            url: "#",
            estado_procesamiento: "intervencion_requerida",
            error_detalle: "Múltiples entidades no pudieron ser normalizadas"
        }
    ],
    
    // Hilos narrativos activos
    hilosActivos: [
        {
            id: 1,
            titulo: "Crisis diplomática España-Argentina",
            relevancia_editorial: 8,
            fecha_ultimo_hecho: "2025-05-02"
        },
        {
            id: 2,
            titulo: "Negociaciones comerciales Mercosur-UE",
            relevancia_editorial: 6,
            fecha_ultimo_hecho: "2025-04-29"
        },
        {
            id: 3,
            titulo: "Elecciones presidenciales Colombia 2025",
            relevancia_editorial: 9,
            fecha_ultimo_hecho: "2025-05-01"
        },
        {
            id: 4,
            titulo: "Crisis migratoria en la frontera México-EEUU",
            relevancia_editorial: 7,
            fecha_ultimo_hecho: "2025-05-02"
        },
        {
            id: 5,
            titulo: "Protestas por reforma judicial en Chile",
            relevancia_editorial: 5,
            fecha_ultimo_hecho: "2025-04-25"
        }
    ],
    
    // Hechos para revisión
    hechos: [
        {
            id: 1,
            contenido: "El presidente argentino, Javier Milei, criticó duramente al gobierno español durante su discurso en la cumbre de Madrid, calificando sus políticas económicas como 'fracasadas e ideologizadas'.",
            fecha_ocurrencia: {
                inicio: "2025-05-02T14:30:00",
                fin: "2025-05-02T15:45:00"
            },
            precision_temporal: "exacta",
            tipo_hecho: "DECLARACION",
            importancia: 9,
            confiabilidad: 5,
            pais: ["España", "Argentina"],
            etiquetas: ["diplomacia", "relaciones bilaterales", "tensión diplomática"],
            validado: false,
            entidades_relacionadas: [
                {
                    id: 101,
                    nombre: "Javier Milei",
                    tipo: "PERSONA",
                    notas_usuario: "Presidente argentino desde diciembre 2023. Tendencia a declaraciones polémicas."
                },
                {
                    id: 102,
                    nombre: "Gobierno de España",
                    tipo: "INSTITUCION"
                },
                {
                    id: 103,
                    nombre: "Cumbre de Madrid",
                    tipo: "EVENTO"
                }
            ],
            articulo_origen: {
                id: 1001,
                titular: "Milei provoca una crisis diplomática con España tras duras críticas en Madrid",
                medio: "El País",
                pais_publicacion: "España",
                fecha_publicacion: "2025-05-02T17:20:00",
                url: "#"
            },
            hilo_vinculado: {
                id: 1,
                titulo: "Crisis diplomática España-Argentina",
                relevancia_editorial: 8
            }
        },
        {
            id: 2,
            contenido: "El Gobierno español ha llamado a consultas al embajador en Argentina tras las declaraciones de Milei, calificándolas de 'inaceptables y faltas de respeto institucional'.",
            fecha_ocurrencia: {
                inicio: "2025-05-02T19:15:00",
                fin: "2025-05-02T19:15:00"
            },
            precision_temporal: "exacta",
            tipo_hecho: "ANUNCIO",
            importancia: 8,
            confiabilidad: 5,
            pais: ["España", "Argentina"],
            etiquetas: ["diplomacia", "crisis diplomática", "embajador"],
            validado: false,
            entidades_relacionadas: [
                {
                    id: 102,
                    nombre: "Gobierno de España",
                    tipo: "INSTITUCION"
                },
                {
                    id: 104,
                    nombre: "Embajada de España en Argentina",
                    tipo: "INSTITUCION"
                },
                {
                    id: 101,
                    nombre: "Javier Milei",
                    tipo: "PERSONA",
                    notas_usuario: "Presidente argentino desde diciembre 2023. Tendencia a declaraciones polémicas."
                }
            ],
            articulo_origen: {
                id: 1002,
                titular: "España llama a consultas a su embajador en Argentina tras las críticas de Milei",
                medio: "El Mundo",
                pais_publicacion: "España",
                fecha_publicacion: "2025-05-02T20:45:00",
                url: "#"
            },
            hilo_sugerido: {
                id: 1,
                titulo: "Crisis diplomática España-Argentina",
                relevancia_editorial: 8
            }
        },
        {
            id: 3,
            contenido: "El ministro de Economía de Brasil, Fernando Haddad, anunció la firma de un acuerdo comercial con Chile que eliminará aranceles en más de 500 productos durante los próximos 3 años.",
            fecha_ocurrencia: {
                inicio: "2025-05-01",
                fin: "2025-05-01"
            },
            precision_temporal: "dia",
            tipo_hecho: "ANUNCIO",
            importancia: 6,
            confiabilidad: 4,
            pais: ["Brasil", "Chile"],
            etiquetas: ["comercio internacional", "acuerdo comercial", "aranceles"],
            validado: false,
            entidades_relacionadas: [
                {
                    id: 105,
                    nombre: "Fernando Haddad",
                    tipo: "PERSONA"
                },
                {
                    id: 106,
                    nombre: "Ministerio de Economía de Brasil",
                    tipo: "INSTITUCION"
                },
                {
                    id: 107,
                    nombre: "Acuerdo Comercial Chile-Brasil 2025",
                    tipo: "NORMATIVA"
                }
            ],
            articulo_origen: {
                id: 1003,
                titular: "Chile y Brasil firman histórico acuerdo comercial",
                medio: "El Mercurio",
                pais_publicacion: "Chile",
                fecha_publicacion: "2025-05-01T16:30:00",
                url: "#"
            }
        },
        {
            id: 4,
            contenido: "La candidata presidencial colombiana María Fernanda Cabal lidera las encuestas con un 32% de intención de voto, según el último sondeo de DataAnalítica.",
            fecha_ocurrencia: {
                inicio: "2025-05-01",
                fin: "2025-05-01"
            },
            precision_temporal: "dia",
            tipo_hecho: "ANUNCIO",
            importancia: 7,
            confiabilidad: 3,
            pais: ["Colombia"],
            etiquetas: ["elecciones", "encuestas", "presidenciales"],
            validado: true,
            entidades_relacionadas: [
                {
                    id: 108,
                    nombre: "María Fernanda Cabal",
                    tipo: "PERSONA"
                },
                {
                    id: 109,
                    nombre: "DataAnalítica",
                    tipo: "ORGANIZACION"
                },
                {
                    id: 110,
                    nombre: "Elecciones Presidenciales Colombia 2025",
                    tipo: "EVENTO"
                }
            ],
            articulo_origen: {
                id: 1004,
                titular: "Cabal lidera encuestas a seis meses de las presidenciales colombianas",
                medio: "El Tiempo",
                pais_publicacion: "Colombia",
                fecha_publicacion: "2025-05-01T18:45:00",
                url: "#"
            },
            hilo_vinculado: {
                id: 3,
                titulo: "Elecciones presidenciales Colombia 2025",
                relevancia_editorial: 9
            }
        },
        {
            id: 5,
            contenido: "El Congreso mexicano aprobó la controvertida reforma al sistema de pensiones que incrementa gradualmente las aportaciones de los empleadores del 5.15% actual hasta el 13% en 2030.",
            fecha_ocurrencia: {
                inicio: "2025-05-02",
                fin: "2025-05-02"
            },
            precision_temporal: "dia",
            tipo_hecho: "NORMATIVA",
            importancia: 8,
            confiabilidad: 5,
            pais: ["México"],
            etiquetas: ["reforma", "pensiones", "congreso"],
            validado: false,
            entidades_relacionadas: [
                {
                    id: 111,
                    nombre: "Congreso de México",
                    tipo: "INSTITUCION"
                },
                {
                    id: 112,
                    nombre: "Reforma al Sistema de Pensiones 2025",
                    tipo: "NORMATIVA"
                }
            ],
            articulo_origen: {
                id: 1005,
                titular: "México aprueba histórica reforma al sistema de pensiones",
                medio: "El Universal",
                pais_publicacion: "México",
                fecha_publicacion: "2025-05-02T22:10:00",
                url: "#"
            }
        },
        {
            id: 6,
            contenido: "El número de migrantes detenidos en la frontera entre México y Estados Unidos aumentó un 27% en abril respecto al mes anterior, alcanzando los 173,000 cruces irregulares.",
            fecha_ocurrencia: {
                inicio: "2025-05-02",
                fin: "2025-05-02"
            },
            precision_temporal: "dia",
            tipo_hecho: "ANUNCIO",
            importancia: 7,
            confiabilidad: 4,
            pais: ["México", "Estados Unidos"],
            etiquetas: ["migración", "frontera", "crisis migratoria"],
            validado: false,
            entidades_relacionadas: [
                {
                    id: 113,
                    nombre: "Frontera México-Estados Unidos",
                    tipo: "LUGAR"
                },
                {
                    id: 114,
                    nombre: "Departamento de Seguridad Nacional de EEUU",
                    tipo: "INSTITUCION",
                    notas_usuario: "Sus cifras suelen ser precisas pero hay críticas a su metodología de conteo."
                }
            ],
            articulo_origen: {
                id: 1006,
                titular: "Se dispara 27% el cruce irregular de migrantes en frontera norte",
                medio: "El Universal",
                pais_publicacion: "México",
                fecha_publicacion: "2025-05-02T15:30:00",
                url: "#"
            },
            hilo_sugerido: {
                id: 4,
                titulo: "Crisis migratoria en la frontera México-EEUU",
                relevancia_editorial: 7
            }
        }
    ]
};

// Exportar datos para su uso en otros archivos
if (typeof module !== 'undefined') {
    module.exports = mockData;
}