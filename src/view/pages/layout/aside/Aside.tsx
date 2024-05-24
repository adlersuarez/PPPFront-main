import Menu from "./widget/Menu";
import ListMenu from "./widget/ListMenu";
import Title from "./widget/Title";
import SubTitle from "./widget/SubTitle";
import Overlay from "./widget/Overlay";
import Body from "./widget/Body";
import Estudiante from "../../../../model/interfaces/estudiante.model.interface";
import Trabajador from "../../../../model/interfaces/trabajador.model.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import MenuItem from "@/model/interfaces/menu/menu";
import { useEffect, useState } from "react";
import { ArmarMenu } from "@/helper/herramienta.helper";
import useRolLogin from "@/component/hooks/useRolLogin";

type Props = {
    informacion: Estudiante | Trabajador | undefined,
    pathname: string,
    refAside: React.RefObject<HTMLInputElement>,
    refOverlay: React.RefObject<HTMLInputElement>,
    onEventOverlay: React.MouseEventHandler,
}

const Aside = (props: Props) => {

    const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)
    const [menuGeneral, setMenuGeneral] = useState<MenuItem[]>([])

    const roles = useRolLogin()

    const loadInitMenu = async () => {
        const [generalMenu] = await Promise.all([
            await ArmarMenu(tipoUsuario, roles)
        ])
        setMenuGeneral(generalMenu)
    }

    useEffect(() => {
        loadInitMenu()
    }, [roles])

    return (
        <Body refAside={props.refAside}>
            <div className="relative z-30 h-full overflow-y-auto py-4">
                <Title />

                <SubTitle informacion={props.informacion} />

                <ul id="menus">
                    {
                        menuGeneral.map((menu, index) => {
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
                                    //desplegar={true}
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