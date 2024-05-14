type Props = {
    actividad: any
}

const ActividadesUnidad: React.FC<Props> = ({ actividad }) => {

    return (
        <div className="flex bg-gray-100 p-1 rounded-md text-sm">
            <div className="w-6 shrink-0">
                <i className="bi bi-dot"/>
            </div>
            <div>{actividad.actividad}</div>
        </div>
    )

}

export default ActividadesUnidad