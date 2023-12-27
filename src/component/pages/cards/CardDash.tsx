import { NavLink } from "react-router-dom";

type Props = {
    imagen: React.ReactNode,
    titulo: string,
    subTitulo: string,
    to: string,
    info: string,
    color: string
}

const ModalidadCard = (props: Props) => {
    return (
<div className={` border border-gray-300 overflow-hidden flex shadow-lg transition duration-300 ease-in-out transform hover:shadow-2xl`}>
    <div className="flex-1 px-6 py-4">
        <div className="flex items-center mb-2">
            <h2 className="text-2xl font-bold">{props.titulo}</h2>
        </div>
        <div className="flex items-center mb-4">
            <span className="text-sm text-gray-600">{props.subTitulo}</span>
        </div>
        <NavLink
            to={props.to}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Más Información
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </NavLink>

    </div>
    <div className={`p-3 border-l-4 border-${props.color}-500 rounded-l-full flex items-center w-20 bg-${props.color}-400 transition duration-300 ease-in-out transform hover:scale-110`}>
        <span className="text-white text-5xl">
            <i className={`text-6xl transform-gpu scale-100 hover:scale-110`}>{props.imagen}</i>
        </span>
    </div>
</div> 





    );

}

export default ModalidadCard;