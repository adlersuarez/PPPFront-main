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

type MenuItem = {
    id: string,
    nombre: string,
    pathname?: string,
    icon: string,
    subMenus?: MenuItem[]
}

/*type MenuItem = {
    id: number,
    titulo: string,
    url?: string,
    icono: string,
    moduPadre: number,
    modPosicion: number,
    subMenu: boolean,
    subMenuItems?: MenuItem[]
}*/

const menus: MenuItem[] = [
    {
        id: "1",
        nombre: "Inicio",
        pathname: "/inicio/centro_de_idiomas",
        icon: "bi-info-circle",
        subMenus: []
    },
    {
        id: "2",
        nombre: "Formatos",
        icon: "bi-file-earmark-text",
        pathname: "/inicio/formatos",
        subMenus: []
    },
    {
        id: "3",
        nombre: "Proceso",
        pathname: "/inicio/proceso",
        icon: "bi-bar-chart-steps",
        subMenus: []
    },
    {
        id: "4",
        nombre: "Reglamentos",
        pathname: "/inicio/reglamentos",
        icon: "bi-file-ruled",
        subMenus: []
    },
    {
        id: "5",
        nombre: "Contactos",
        pathname: "/inicio/contactos",
        icon: "bi-envelope-at",
        subMenus: []
    },
    {
        id: "6",
        nombre: "Docente",
        pathname: "/inicio/revision",
        icon: "bi-file-ruled",
        subMenus: []
    },
    {
        id: "7",
        nombre: "Administrador",
        pathname: "/inicio/administrador",
        icon: "bi-bar-chart-line-fill",
        subMenus: []
    },

    /*
    {
        id: "8",
        titulo: "Dashboard",
        url: "/inicio/dashboard",
        icono: "bi-speedometer",
        moduPadre: 0,
        modPosicion: 1,
        subMenu: false,
        subMenuItems: [],
    },
    {
        id: "9",
        titulo: "Marcación",
        url: "",
        icono: "bi-arrow-left-right",
        moduPadre: 0,
        modPosicion: 2,
        subMenu: true,
        subMenuItems: [
            {
                id: 7,
                titulo: "Visitantes",
                url: "/inicio/marcacion-visitante",
                icono: "bi-dash",
                moduPadre: 2,
                modPosicion: 1
            }
            ,
            {
                id: 8,
                titulo: "Estudiantes",
                url: "/inicio/marcacion-estudiante",
                icono: "bi-dash",
                moduPadre: 2,
                modPosicion: 2
            },
            {
                id: 9,
                titulo: "Personal",
                url: "/inicio/marcacion-personal",
                icono: "bi-dash",
                moduPadre: 2,
                modPosicion: 3
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
                            if (menu.subMenus?.length == 0) {
                                return <Menu
                                    key={index}
                                    pathname={props.pathname}
                                    icon={menu.icon}
                                    nombre={menu.nombre}
                                    to={menu.pathname!}
                                />
                            } else {
                                return <ListMenu
                                    key={index}
                                    idList={menu.id}
                                    desplegar={menu.subMenus?.filter(item => item.pathname === props.pathname).length != 0}
                                    icon={menu.icon}
                                    nombre={menu.nombre}
                                >
                                    {
                                        menu.subMenus?.map((submenu, indexm) => {
                                            return <Menu
                                                key={indexm}
                                                pathname={props.pathname}
                                                icon={submenu.icon}
                                                nombre={submenu.nombre}
                                                to={submenu.pathname!}
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