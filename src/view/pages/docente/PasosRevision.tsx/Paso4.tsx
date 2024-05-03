import React from "react";

interface Paso3Props {
    estudianteId: string
}

const Paso4 = (datos: Paso3Props) => {

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-4-square-fill`} />
                <h1 className="font-bold">PLAN DE ACTIVIDADES</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
                paso 4
            </div>
        </div>
    );
};

export default Paso4;