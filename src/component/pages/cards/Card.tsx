// import { NavLink } from "react-router-dom";
import React, { MouseEvent } from 'react';

type Props = {
    imagen: React.ReactNode,
    titulo: string,
    to: string,
    info: string,
    color: string
}

const ModalidadCard = (props: Props) => {

    const openLinkNewTab = (e: MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        window.open(props.to, '_blank', 'noopener,noreferrer');
    };

    return (

        <div className={`max-w-md border bg-${props.color}-300 border-gray-300 rounded overflow-hidden flex shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl`}>
            <div className={`p-3 border-l-4 border-${props.color}-500 rounded-r-full rounded-r-lg flex items-center w-20 bg-${props.color}-400`}>
                <span className="text-white text-5xl">
                    <i className="text-5xl">{props.imagen}</i>
                </span>
            </div>
            <div className="flex-1 px-6 py-4">
                <div className="flex items-center mb-4">
                    <span className="text-xl mr-2">{props.titulo}</span>
                </div>
                {/* Contenido adicional de la tarjeta */}
                <a
                    href={props.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gray-800 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full float-right text-sm`}
                    onClick={openLinkNewTab}
                >
                    <span>Más Información</span>
                </a>
            </div>
        </div>


    );

}

export default ModalidadCard;