type Props = {
    actividad: any
}

const ActividadesUnidadTematica: React.FC<Props> = ({ actividad }) => {

    return (
        <div className="flex bg-gray-50 p-1 rounded-md text-xs">
            <div className="w-5 shrink-0">
                <i className="bi bi-dot"/>
            </div>
            <div>{actividad.actividad}</div>
        </div>
    )

}

export default ActividadesUnidadTematica