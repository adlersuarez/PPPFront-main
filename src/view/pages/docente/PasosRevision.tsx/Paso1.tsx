import React, { useState } from 'react';
import EstadoCarta from './estados/EstadoCarta';

interface DatosEmpresa {
    ruc: string;
    nombre: string;
    estado: string;
    direccion: string;
}

interface DatosRepresentante {
    dni: string;
    nombre: string;
    grado: string;
    cargo: string;
}

interface Paso1Props {
    intento: number;
    fecha: string;
    estado: boolean;
    datosEmpresa: DatosEmpresa;
    datosRepresentante: DatosRepresentante;
}

interface DatosProps {
    elementos: Paso1Props[]
}

const Paso1 = (datos: DatosProps) => {

    const primerIntento = datos.elementos.find((elemento) => elemento.estado === true)
    const [intentSeleccionado, setIntentoSeleccionado] = useState<number | null>(primerIntento?.intento ?? 1);

    const handleClickBoton = (intento: number) => {
        setIntentoSeleccionado(intento);
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-1-square-fill`} />
                <h1 className="font-bold">CARTA DE PRESENTACIÓN</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
                {
                    datos.elementos.length !== 0 &&
                    <div className="flex flex-col gap-4">
                        {
                            datos.elementos.map((dat) => (
                                <div key={dat.intento} className={`flex flex-col bg-white p-4 rounded border gap-4 ${intentSeleccionado === dat.intento && 'border-4 border-blue-500'}`}>
                                    <div className='flex justify-between'>
                                        <div className="font-bold text-gray-400">{dat.fecha}</div>
                                        <EstadoCarta estado={dat.estado} />
                                    </div>
                                    <button
                                        onClick={() => handleClickBoton(dat.intento)}
                                        className={`p-2 w-full text-white ${intentSeleccionado === dat.intento ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-300'} rounded`}
                                    >
                                        Ver Empresa
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                }
                {
                    intentSeleccionado ?
                        datos.elementos.filter((dat) => intentSeleccionado === null || dat.intento === intentSeleccionado)
                            .map((dat) => (
                                <React.Fragment key={dat.intento}>
                                    <div className="flex flex-col gap-4">
                                        <div className="border-l-4 border-blue-600 bg-gray-100 p-2 text-center">
                                            <h2 className="font-bold text-xl sm:text-2xl">DATOS EMPRESA</h2>
                                        </div>
                                        <div className="flex flex-col gap-4 uppercase text-sm sm:text-lg">
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-bold ">Nombre</div>
                                                <div className="w-2/3">{dat.datosEmpresa.nombre}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-bold">RUC</div>
                                                <div className="w-2/3">{dat.datosEmpresa.ruc}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-bold">Estado</div>
                                                <div className="w-2/3">{dat.datosEmpresa.estado}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-bold">Dirección</div>
                                                <div className="w-2/3">{dat.datosEmpresa.direccion}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 ">
                                        <div className="border-l-4 border-blue-600 bg-gray-100 p-2 text-center">
                                            <h2 className="font-bold text-xl sm:text-2xl">REPRESENTANTE</h2>
                                        </div>
                                        <div className="flex flex-col gap-4 uppercase text-sm sm:text-lg">
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-bold ">NOMBRE</div>
                                                <div className="w-2/3">{dat.datosRepresentante.nombre}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-bold">DNI</div>
                                                <div className="w-2/3">{dat.datosRepresentante.dni}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-bold">GRADO</div>
                                                <div className="w-2/3">{dat.datosRepresentante.grado}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-bold">CARGO</div>
                                                <div className="w-2/3">{dat.datosRepresentante.cargo}</div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))
                        :
                        <div className="text-center sm:col-span-3 p-4 sm:p-8 bg-gray-200 rounded shadow-lg">
                            <p className="text-base sm:text-2xl font-bold text-gray-500">El estudiante aún no ha registrado carta de presentación</p>
                        </div>
                }

            </div>
        </div>

    );
};

export default Paso1;