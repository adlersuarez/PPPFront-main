import MenuItem from "@/model/interfaces/menu/menu";

export const menusEstudiante: MenuItem[] = [
    {
        id: "1",
        titulo: "Inicio",
        url: "/inicio",
        icono: "bi-info-circle",
        moduPadre: false,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "2",
        titulo: "Proceso",
        url: "/proceso",
        icono: "bi-bar-chart-steps",
        moduPadre: false,
        modPosicion: 2,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "3",
        titulo: "Formatos",
        url: "/formatos",
        icono: "bi-file-earmark-text",
        moduPadre: false,
        modPosicion: 3,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "4",
        titulo: "Reglamentos",
        url: "/reglamentos",
        icono: "bi-file-ruled",
        moduPadre: false,
        modPosicion: 4,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "5",
        titulo: "Contactos",
        url: "/contactos",
        icono: "bi-envelope-at",
        moduPadre: false,
        modPosicion: 5,
        subMenu: false,
        subMenuItems: []
    },
    /*
    {
        id: '8',
        titulo: "Medicina",
        url: "",
        icono: "bi bi-hospital-fill",
        moduPadre: true,
        modPosicion: 8,
        subMenu: true,
        subMenuItems: [
            {
                id: '1',
                titulo: "Internado Médico",
                url: "/inicio/medicina/internado-medico",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
            },
            {
                id: '2',
                titulo: "Estudiantes",
                url: "/inicio/medicina/registro",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 2,
                subMenu: false,

            },
            {
                id: '3',
                titulo: "Estudiante Archivos",
                url: "/inicio/medicina/estudiantes",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 3,
                subMenu: false,

            },
            {
                id: '4',
                titulo: "Admin",
                url: "/inicio/medicina/administrador",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 4,
                subMenu: false,
            },
            {
                id: '5',
                titulo: "Docente",
                url: "/medicina/docente",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 5,
                subMenu: false,
            }

        ],
    },*/
]


export const menusDocente: MenuItem[] = [
    {
        id: "1",
        titulo: "Inicio",
        url: "/inicio",
        icono: "bi-info-circle",
        moduPadre: false,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "6",
        titulo: "Secciones",
        url: "/revision",
        icono: "bi-backpack4",
        moduPadre: false,
        modPosicion: 6,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "4",
        titulo: "Reglamentos",
        url: "/reglamentos",
        icono: "bi-file-ruled",
        moduPadre: false,
        modPosicion: 4,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "5",
        titulo: "Contactos",
        url: "/contactos",
        icono: "bi-envelope-at",
        moduPadre: false,
        modPosicion: 5,
        subMenu: false,
        subMenuItems: []
    },
]

export const menusCoordinador: MenuItem[] = [
    {
        id: "7",
        titulo: "Revisión",
        url: "/admin",
        icono: "bi-backpack4",
        moduPadre: false,
        modPosicion: 7,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "8",
        titulo: "Reportes",
        url:"/reportes",
        icono: "bi-bar-chart-line-fill",
        moduPadre: true,
        modPosicion: 8,
        subMenu: true,
        subMenuItems: [
            {
                id: '1',
                titulo: "Dashboard",
                url: "/reportes/dashboard",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
            },
            {
                id: '2',
                titulo: "General",
                url: "/reportes/general",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
            },
            {
                id: '3',
                titulo: "Específico",
                url: "/reportes/especifico",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
            },
        ]
    }
]