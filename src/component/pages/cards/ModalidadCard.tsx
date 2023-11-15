import { NavLink } from "react-router-dom";

type Props = {
    imagen: string,
    titulo: string,
    to: string,
    info: string,
    resumen: string
}

const ModalidadCard = (props: Props) => {
    return (

        <div className="sm:max-w-sm rounded shadow-lg border p-4 h-full w-full flex flex-col gap-4 justify-between" >
            <div className="flex flex-col">
                <div className="w-full overflow-hidden">
                    <img src={props.imagen} alt="Imagen" className="w-full" />
                </div>

                <div className="mt-2 flex flex-col gap-2">
                    <div className="font-bold text-gray-400">
                        <span className="text-lg">{props.titulo}</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        {props.resumen}
                    </p>
                </div>
            </div>

            <div className="flex flex-col 2xl:flex-row gap-4">
                <div className="flex w-full">
                    <NavLink
                        to={props.info}
                        className="flex p-2 w-full px-auto rounded-md justify-center xl:justify-start border-blue-500 hover:border text-blue-500 hover:text-white hover:bg-blue-500"
                    >
                        <span className="my-auto">Más Información</span>
                        <i className="bi bi-info-circle ml-2 text-lg" />
                    </NavLink>
                </div>

                <div className="w-full">
                    <NavLink
                        to={props.to}
                        className={`flex p-2 px-4 rounded-md items-center justify-between text-lg font-normal transition-all duration-200 bg-gray-400 text-white hover:bg-blue-500 hover:text-white`}
                    >
                        <span className="m-auto">Iniciar proceso</span>
                    </NavLink>
                </div>
            </div>
        </div >
    );

}

export default ModalidadCard;