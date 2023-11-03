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

        <div className="max-w-sm rounded shadow-lg border p-4" >
            <div className="w-full bg-red-200 overflow-hidden">
                <img src={props.imagen} alt="Imagen" className="" />
            </div>

            <div className="mt-2">
                <div className="font-bold text-blue-800">
                    <span className="text-lg">{props.titulo}</span>
                </div>
                <p className="text-gray-500 text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                </p>
            </div>

            <div className="flex flex-col justify-between mt-4 2xl:flex-row gap-4">
                <div className="w-full md:w-auto">
                    <NavLink
                        to={props.to}
                        className={`flex p-2 px-4 rounded-md items-center justify-between text-lg font-normal transition-all duration-200 bg-white text-blue-500 border-blue-500 border hover:bg-blue-500 hover:text-white`}
                    >
                        <span className="m-auto">Iniciar proceso</span>
                    </NavLink>
                </div>

                <div className="flex w-full md:w-auto">
  <div className={`2xl:m-auto md:ml-auto`}>
    <NavLink to={props.info} className="flex text-blue-500 hover:underline m-auto">
      <span className="">Más Información</span>
      <i className={`bi bi-info-circle ml-2 text-lg`} />
    </NavLink>
  </div>
</div>
            </div>
        </div >
    );

}

export default ModalidadCard;