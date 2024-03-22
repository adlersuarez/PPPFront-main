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

        <div className="sm:max-w-sm rounded-xl shadow-lg border h-full w-full flex flex-col justify-between overflow-hidden" >
            <div className="flex flex-col flex-grow">
                <div className="w-full overflow-hidden">
                    <img src={props.imagen} alt="Imagen" className="w-full" />
                </div>

                <div className="flex flex-col gap-2 p-4">
                    <div className="font-bold text-gray-400">
                        <span className="text-lg">{props.titulo}</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        {props.resumen}
                    </p>
                </div>
            </div>
            <hr />
            <div className="grid grid-cols-5 sm:grid-cols-2 gap-4 p-3">
                <div className="flex col-span-1 sm:pl-2">
                    <NavLink
                        to={props.info}
                        className="flex  w-full px-auto rounded-md justify-center xl:justify-start sm:text-blue-500 hover:no-underline bg-blue-500 text-white sm:bg-white sm:hover:underline"
                    >
                        <span className="hidden sm:flex my-auto">Más Información</span>
                        <i className="m-auto bi bi-info-circle flex sm:hidden text-xl" />
                    </NavLink>
                </div>

                <div className="flex w-full col-span-4 sm:col-span-1">
                    <NavLink
                        to={props.to}
                        className={`flex w-full p-2 px-4 text-center rounded-md items-center justify-between text-lg font-normal transition-all duration-200 bg-gray-400 text-white hover:bg-upla-100 hover:scale-105 hover:text-white`}
                    >
                        <span className="m-auto">Iniciar proceso</span>
                    </NavLink>
                </div>
            </div>
        </div >
    );

}

export default ModalidadCard;