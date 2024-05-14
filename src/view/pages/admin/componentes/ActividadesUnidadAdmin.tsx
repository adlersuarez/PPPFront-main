type Props = {
    actividad: any
}

export const ActividadesUnidadAdmin: React.FC<Props> = ({ actividad }) => {

    return (
        <div className="flex hover:bg-blue-50 p-1 rounded-md text-sm">
            <div className="w-6 shrink-0">
                <i className="bi bi-dot"/>
            </div>
            <div>{actividad.actividad}</div>
        </div>
    )

}