import Menu from "./widget/Menu";
import ListMenu from "./widget/ListMenu";
import Title from "./widget/Title";
import SubTitle from "./widget/SubTitle";
import Overlay from "./widget/Overlay";
import Body from "./widget/Body";
import Estudiante from "../../../../model/interfaces/estudiante.model.interface";
import Trabajador from "../../../../model/interfaces/trabajador.model.interface";

type Props = {
    informacion: Estudiante | Trabajador | undefined,
    pathname: string,
    refAside: React.RefObject<HTMLInputElement>,
    refOverlay: React.RefObject<HTMLInputElement>,
    onEventOverlay: React.MouseEventHandler,
}

/*type MenuItem = {
    id: string,
    nombre: string,
    pathname?: string,
    icon: string,
    subMenus?: MenuItem[]
}*/

type MenuItem = {
    id: string,
    titulo: string,
    url?: string,
    icono: string,
    moduPadre: boolean,
    modPosicion: number,
    subMenu: boolean,
    subMenuItems?: MenuItem[]
}

const menus: MenuItem[] = [
    {
        id: "1",
        titulo: "Inicio",
        url: "/inicio/inscripcion",
        icono: "bi-info-circle",
        moduPadre: false,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "2",
        titulo: "Formatos",
        url: "/inicio/formatos",
        icono: "bi-file-earmark-text",
        moduPadre: false,
        modPosicion: 2,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "3",
        titulo: "Proceso",
        url: "/inicio/proceso",
        icono: "bi-bar-chart-steps",
        moduPadre: false,
        modPosicion: 3,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "4",
        titulo: "Reglamentos",
        url: "/inicio/reglamentos",
        icono: "bi-file-ruled",
        moduPadre: false,
        modPosicion: 4,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "5",
        titulo: "Contactos",
        url: "/inicio/contactos",
        icono: "bi-envelope-at",
        moduPadre: false,
        modPosicion: 5,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "6",
        titulo: "Docente",
        url: "/inicio/revision",
        icono: "bi-file-ruled",
        moduPadre: false,
        modPosicion: 6,
        subMenu: false,
        subMenuItems: []
    },
    {
        id: "7",
        titulo: "Administrador",
        url: "/inicio/administrador",
        icono: "bi-bar-chart-line-fill",
        moduPadre: false,
        modPosicion: 7,
        subMenu: false,
        subMenuItems: []
    },
    //
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
            }
            ,
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
                titulo: "Personal",
                url: "/medicina/administrador",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 3,
                subMenu: false,
            }

        ],
    },
    /*{
        id: '8',
        titulo: "Dashboard",
        url: "/inicio/dashboard",
        icono: "bi-speedometer",
        moduPadre: false,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: [],
    },
    {
        id: '9',
        titulo: "Marcación",
        url: "",
        icono: "bi-arrow-left-right",
        moduPadre: true,
        modPosicion: 2,
        subMenu: true,
        subMenuItems: [
            {
                id: '7',
                titulo: "Visitantes",
                url: "/inicio/marcacion-visitante",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 1,
                subMenu: false,
            }
            ,
            {
                id: '8',
                titulo: "Estudiantes",
                url: "/inicio/marcacion-estudiante",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 2,
                subMenu: false,

            },
            {
                id: '9',
                titulo: "Personal",
                url: "/inicio/marcacion-personal",
                icono: "bi-dash",
                moduPadre: false,
                modPosicion: 3,
                subMenu: false,
            }

        ],
    },*/

];


const Aside = (props: Props) => {

    return (
        <Body refAside={props.refAside}>
            <div className="relative z-30 h-full overflow-y-auto py-4">
                <Title />

                <SubTitle informacion={props.informacion} />

                <ul id="menus">
                    {
                        menus.map((menu, index) => {
                            if (menu.subMenuItems?.length == 0) {
                                return <Menu
                                    key={index}
                                    pathname={props.pathname}
                                    icon={menu.icono}
                                    nombre={menu.titulo}
                                    to={menu.url!}
                                />
                            } else {
                                return <ListMenu
                                    key={index}
                                    idList={menu.id}
                                    desplegar={menu.subMenuItems?.filter(item => item.url === props.pathname).length != 0}
                                    icon={menu.icono}
                                    nombre={menu.titulo}
                                >
                                    {
                                        menu.subMenuItems?.map((submenu, indexm) => {
                                            return <Menu
                                                key={indexm}
                                                pathname={props.pathname}
                                                icon={submenu.icono}
                                                nombre={submenu.titulo}
                                                to={submenu.url!}
                                            />
                                        })
                                    }
                                </ListMenu>
                            }
                        })
                    }
                </ul>
            </div>
            <Overlay refOverlay={props.refOverlay} onEventOverlay={props.onEventOverlay} />
        </Body>
    );
}

export default Aside;