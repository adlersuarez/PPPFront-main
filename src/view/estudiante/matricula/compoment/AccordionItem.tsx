import React from 'react';
import { IconType } from 'react-icons';

interface AccordionItemProps {
    icono: IconType;
    titulo: string;
    descripcion: string;
    enlace: string;
}

const IcoAprobado = () =>{
    return(
        <i className="bi bi-check-square-fill text-xl text-green-500"></i> 
    )
}

// const IcoDesbloqueado = () =>{
//     return(
//         <i className="bi bi-unlock-fill text-xl text-blue-500"></i> 
//     )
// }

// const IcoBloqueado = () =>{
//     return(
//         <i className="bi bi-lock-fill text-lg text-red-500"></i> 
//     )
// }

const AccordionItem: React.FC<AccordionItemProps> = ({ titulo, enlace }) => {
    return (
        <div className="border border-gray-300 rounded-lg shadow-md p-3 m-4 flex justify-between  hover:scale-105 transition-transform duration-300 mb-2">
            {/* <div className="text-purple-600 mr-4">
                <Icono size={40} fill="currentColor" />
            </div> */}
            <div>
               
                <h3 className="text-lg font-semibold "><IcoAprobado/> {titulo}</h3>
                {/* <p className="text-gray-600 mb-2">{descripcion}</p> */}

                {/* <a href={enlace} className="block mt-0 text-blue-600 hover:underline">
                    Horario
                </a> */}
            </div>
            <div className="text-green-600">
                {/* <h3 className="text-lg font-bold">Aprobado</h3> */}
                <a href={enlace} className="block mt-0 text-blue-600 hover:underline">
                    Horario
                </a>
            </div>
            <div className="text-purple-600">
                {/* <Icono size={20} fill="currentColor" /> */}
                <a href={enlace} className="block mt-0 text-blue-600 hover:underline">
                    Matricularme
                </a>
            </div>
        </div>
    );
};

export default AccordionItem;
