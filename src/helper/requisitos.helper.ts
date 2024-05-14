import ProcesoPasos from "@/model/interfaces/pasos/procesoPasos"

export const ProcesoPasosDocente: ProcesoPasos[] = [
    {
        id: 1,
        titulo: "Carta de Presentación",
        requisitos: []
    },
    {
        id: 2,
        titulo: "Carta de Aceptación",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Carta de aceptación escaneada a colores"
            },
            {
                idRequisito: 2,
                requisito: "Debidamente firmada y sellada por la empresa"
            }
        ]
    },
    {
        id: 3,
        titulo: "Datos de Centro Laboral",
        requisitos: []
    },
    {
        id: 4,
        titulo: "Plan de Actividades",
        requisitos: []
    },
    {
        id: 5,
        titulo: "Control de Actividades",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Documentos en formato PDF"
            },
            {
                idRequisito: 2,
                requisito: "Debe contener imágenes, fotos, capturas de documentos y anexos relacionados a las actividades registradas previamente"
            }
        ]
    },
    {
        id: 6,
        titulo: "Presentación de documentos",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Documentos en formato PDF"
            },
            {
                idRequisito: 2,
                requisito: "Debidamente firmados y sellados por la empresa y/o jefe inmediato"
            }
        ]
    },
    {
        id: 7,
        titulo: "Cargar documentos adicionales",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Documentos en formato PDF"
            },
            {
                idRequisito: 2,
                requisito: "Debidamente firmados y sellados"
            }
        ]
    }
]


export const ProcesoPasosEstudiante: ProcesoPasos[] = [
    {
        id: 1,
        titulo: "Carta de Presentación",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Pago por Derecho de Trámite y/o por Carta de Presentación de Prácticas Co Curriculares"
            },
            {
                idRequisito: 2,
                requisito: "Registro Único de Contribuyentes (RUC) de la empresa"
            },
            {
                idRequisito: 3,
                requisito: "Razón social de la empresa"
            },
            {
                idRequisito: 4,
                requisito: "Datos completos del representante legal de la empresa"
            },
            
        ],
        importante: [
            {
                idImportante: 1,
                importante: "El RUC de la empresa debe ser correspondiente a personas jurídicas (iniciar con 20) "
            },
            {
                idImportante: 2,
                importante: "El código de operación seleccionado no puede ser usado para otro trámite y su respectivo recibo debe ser conservado en una carpeta"
            }
        ]
    },
    {
        id: 2,
        titulo: "Carta de Aceptación",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Carta de Aceptación emitida por la empresa"
            },
            {
                idRequisito: 2,
                requisito: "Debidamente firmada y sellada por la empresa"
            },
            {
                idRequisito: 3,
                requisito: "Escaneada a colores"
            }
        ]
    },
    {
        id: 3,
        titulo: "Datos de Centro Laboral",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Fecha de inicio y finalización de prácticas"
            },
            {
                idRequisito: 2,
                requisito: "Detalle del horario de prácticas (días y horas específicas)"
            },
            {
                idRequisito: 3,
                requisito: "Descripción detallada del área de trabajo"
            },
            {
                idRequisito: 4,
                requisito: "Datos completos del jefe inmediato (nombre, cargo, contacto)"
            }
        ]
    },
    {
        id: 4,
        titulo: "Plan de Actividades",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Objetivo general del plan de actividades"
            },
            {
                idRequisito: 2,
                requisito: "Lista de unidades temáticas que representan las metas concretas que el estudiante debe alcanzar durante las prácticas"
            },
            {
                idRequisito: 3,
                requisito: "Actividades académicas para cada unidad temática"
            },
            {
                idRequisito: 4,
                requisito: "Actividades en el centro de prácticas para cada unidad temática"
            }
        ]
    },
    {
        id: 5,
        titulo: "Control de Actividades",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Un archivo en PDF por Unidad Temática"
            },
            {
                idRequisito: 2,
                requisito: "Debe contener imágenes, fotos, capturas de documentos y anexos relacionados a las actividades registradas previamente"
            }
        ]
    },
    {
        id: 6,
        titulo: "Informe Final",
        requisitos: [
            {
                idRequisito: 1,
                requisito: "Informe final de acuerdo a la estructura designada"
            },
            {
                idRequisito: 1,
                requisito: "Convenio de prácticas emitido por la empresa"
            },
            {
                idRequisito: 1,
                requisito: "Constancia de culminación de prácticas pre-profesionales emitido por la empresa"
            },
            {
                idRequisito: 1,
                requisito: "Asistencia visada, debidamente firmada y sellada por la emrpesa y su respectivo jefe inmediato"
            }
        ]
    }
]