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

const menus: MenuItem[] = [
    {
        id: "1",
        nombre: "Inicio",
        pathname: "/inicio/inscripcion",
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
        id: "5",
        nombre: "Docente",
        pathname: "/inicio/revision",
        icon: "bi-file-ruled",
        subMenus: []
    },
    {
        id: "6",
        nombre: "Administrador",
        pathname: "/inicio/administrador",
        icon: "bi-bar-chart-line-fill",
        subMenus: []
    },
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