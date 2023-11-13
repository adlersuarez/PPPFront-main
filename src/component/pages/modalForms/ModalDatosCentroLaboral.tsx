import React, { useState } from 'react';
import Modal from "../modal/ModalComponente";
import { ConsultarDni, ConsultarRuc } from "../../../network/rest/apiconsultas.network";
import Response from '@/model/class/response.model.class';
import RucEmpresa from '@/model/interfaces/respuesta-api/ruc.empresa.model.interface';
import DniPersona from '@/model/interfaces/respuesta-api/dni.persona.model.interface';

interface DatosState {
    ruc: string;
    nombre_empresa: string;
    direccion_empresa: string;
    ubicacion_direccion: string;
    estado_empresa: string;
    condicion_domicilio: string;
    dni_jefe: string;
    nombre_jefe: string;
    id_grado_instruccion: string;
    cargo_jefe: string;
}

type Props = {
    show: boolean;
    hide: () => void;
};

const ModalDatosCentroLaboral: React.FC<Props> = (props: Props) => {

    const [ruc, setRuc] = useState<string>('');
    const [dni, setDni] = useState<string>('');

    const [datos, setDatos] = useState<DatosState>({
        ruc: '',
        nombre_empresa: '',
        direccion_empresa: '',
        ubicacion_direccion: '',
        estado_empresa: '',
        condicion_domicilio: '',
        dni_jefe: '',
        nombre_jefe: '',
        id_grado_instruccion: '',
        cargo_jefe: '',
    });

    // Consulta de PRUEBA para datos del RUC
    const consultarRUC = async () => {
        const response = await ConsultarRuc<RucEmpresa>(ruc);
        if (response instanceof Response) {
            let respuesta = response.data.data
            if (respuesta) {
                const ajustarZona = (direccionCorta: string, direccionLarga: string): string => {
                    const indice = direccionLarga.indexOf(direccionCorta);
                    if (indice !== -1) {
                        const textoAdicional = direccionLarga.substring(indice + direccionCorta.length).trim();
                        return textoAdicional;
                    } else {
                        return "Error";
                    }
                };
                const zona = ajustarZona(respuesta.direccion, respuesta.direccion_completa);

                setDatos({
                    ...datos,
                    ruc: ruc,
                    nombre_empresa: respuesta.nombre_o_razon_social,
                    direccion_empresa: respuesta.direccion,
                    ubicacion_direccion: zona,
                    estado_empresa: respuesta.estado,
                    condicion_domicilio: respuesta.condicion,
                });
            }
        }
    }

    // Consulta de PRUEBA para datos del DNI
    const consultarDNI = async () => {
        const response = await ConsultarDni<DniPersona>(dni);
        if (response instanceof Response) {
            let respuesta = response.data.data
            if (respuesta) {
                setDatos({
                    ...datos,
                    dni_jefe: dni,
                    nombre_jefe: respuesta.nombre_completo,
                });
            }
        }
    }

    return (

        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>

                <div className='flex flex-col gap-3'>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex'>
                            <i className="bi bi-1-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                            <span className='ml-4 font-bold sm:text-xl my-auto'>DATOS DEL CENTRO LABORAL</span>
                        </div>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="ruc" className='font-bold mb-1'>RUC</label>
                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    id="ruc"
                                    name="ruc"
                                    className='w-2/3'
                                    placeholder="Ingrese N° de RUC"
                                    value={ruc}
                                    onChange={(e) => setRuc(e.target.value)}

                                />
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3' onClick={consultarRUC}>
                                    Buscar
                                </button>
                            </div>

                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="nombreEmpresa" className='font-bold mb-1'>Nombre de la Empresa</label>
                            <input
                                type="text"
                                id="nombreEmpresa"
                                name="nombreEmpresa"
                                className='px-3 rounded bg-gray-300 font-semibold text-sm'
                                value={datos.nombre_empresa}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="estadoEmpresa" className='font-bold mb-1'>Estado</label>
                            <input
                                type="text"
                                id="estadoEmpresa"
                                name="estadoEmpresa"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                value={datos.estado_empresa}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="condicionDomicilio" className='font-bold mb-1'>Condición Domicilio</label>
                            <input
                                type="text"
                                id="condicionDomicilio"
                                name="condicionDomicilio"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                value={datos.condicion_domicilio}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="direccionEmpresa" className='font-bold mb-1'>Dirección</label>
                            <input
                                type="text"
                                id="direccionEmpresa"
                                name="direccionEmpresa"
                                className='px-3 rounded bg-gray-300 font-semibold text-sm'
                                value={datos.direccion_empresa}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="ubicacionDireccion" className='font-bold mb-1'>Departamento / Provincia / Distrito</label>
                            <input
                                type="text"
                                id="ubicacionDireccion"
                                name="ubicacionDireccion"
                                className='px-3 rounded bg-gray-300 font-semibold text-sm'
                                value={datos.ubicacion_direccion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 mt-3'>
                        <i className="bi bi-2-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                        <span className='ml-4 font-bold sm:text-xl my-auto'>DATOS DEL REPRESENTANTE</span>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="dniJefe" className='font-bold mb-1'>DNI</label>
                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    id="dniJefe"
                                    name="dniJefe"
                                    placeholder="Ingrese DNI"
                                    value={dni}
                                    className='w-2/3'
                                    onChange={(e) => setDni(e.target.value)}

                                />
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3' onClick={consultarDNI}>
                                    Buscar
                                </button>
                            </div>

                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="nombreJefe" className='font-bold mb-1'>Nombre</label>
                            <input
                                type="text"
                                id="nombreJefe"
                                name="nombreJefe"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                value={datos.nombre_jefe}
                                readOnly
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="gradoInstruccion" className='font-bold mb-1'>Grado de instrucción</label>
                            <select
                                id="gradoInstruccion"
                                name="gradoInstruccion"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.id_grado_instruccion}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1">Bachiller</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="cargoJefe" className='font-bold mb-1'>Cargo que desempeña</label>
                            <input
                                type="text"
                                id="cargoJefe"
                                name="cargoJefe"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.cargo_jefe}
                            />
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full grid lg:grid-cols-2 lg:gap-3">
                    <div className="lg:col-span-7/12 mb-3 lg:mb-0">
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={props.hide}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={props.hide}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:mt-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>

    )
}

export default ModalDatosCentroLaboral;