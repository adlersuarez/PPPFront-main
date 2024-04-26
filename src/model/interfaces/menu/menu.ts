export default interface MenuItem {
    id: string
    titulo: string
    url?: string
    icono: string
    moduPadre: boolean
    modPosicion: number
    subMenu: boolean
    subMenuItems?: MenuItem[]
}