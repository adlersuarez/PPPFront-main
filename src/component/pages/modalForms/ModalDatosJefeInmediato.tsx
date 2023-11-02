import { useState } from "react";
import Modal from "../modal/ModalComponente";
import { ConsultarDni } from "@/network/rest/apiconsultas.network";
import DniPersona from "@/model/interfaces/respuesta-api/dni.persona.model.interface";
import Response from "@/model/class/response.model.class";

interface DatosState {
    dni_jefe: string;
    nombre_jefe: string;
    id_grado_instruccion: string;
    cargo_jefe: string;
    correo_jefe: string;
    celular_jefe: string;
}

type Props = {
    show: boolean;
    hide: () => void;
};

const ModalDatosJefeInmediato: React.FC<Props> = (props: Props) => {

    const [dni, setDni] = useState<string>('');

    const [datos, setDatos] = useState<DatosState>({
        dni_jefe: '',
        nombre_jefe: '',
        id_grado_instruccion: '',
        cargo_jefe: '',
        correo_jefe: '',
        celular_jefe: '',
    });

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
                            <span className='ml-4 font-bold text-xl my-auto'>DATOS DEL JEFE INMEDIATO</span>
                        </div>
                    </div>

                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="dniJefe" className='font-bold mb-1'>DNI</label>
                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    id="dniJefe"
                                    name="dniJefe"
                                    placeholder="Ingrese número de DNI"
                                    value={dni}
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

                        <div className='flex flex-col'>
                            <label htmlFor="correoJefeInmediato" className='font-bold mb-1'>Correo (*)</label>
                            <input
                                type="text"
                                id="correoJefeInmediato"
                                name="correoJefeInmediato"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.correo_jefe}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="celularJefeInmediato" className='font-bold mb-1'>Celular</label>
                            <input
                                type="text"
                                id="celularJefeInmediato"
                                name="celularJefeInmediato"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.celular_jefe}
                            />
                        </div>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='w-full flex justify-between'>
                    <div className=' flex w-7/12'>
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className='flex gap-3 w-5/12 justify-end'>
                        <button
                            onClick={props.hide}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={props.hide}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDatosJefeInmediato;