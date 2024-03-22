import { useState, lazy, Suspense } from 'react';
import ContenedorSteps from './Contenedor/ContenedorSteps';
import ListaElementos from './Contenedor/ListaElementos';
import EstadoRequisito from './Contenedor/EstadoRequisito';
import EstadoTemplate from './Contenedor/EstadoTemplate';
import { generatePDF } from '@/helper/pdf.generator';
import DatosCartaAceptacion from '@/model/interfaces/cartaAceptacion/datosCartaAceptacion';

const TemplateStep1 = () => {

    // Importa los modales de forma dinámica
    const ModalDatosPersonales = lazy(() => import('../../modalForms/ModalDatosPersonales'));
    const ModalDatosEstudiante = lazy(() => import('../../modalForms/ModalDatosEstudiante'));
    const ModalDatosCentroLaboral = lazy(() => import('../../modalForms/ModalDatosCentroLaboral'));
    //

    const [show, setShow] = useState<boolean>(false);
    const [showEstud, setShowEstud] = useState<boolean>(false);
    const [showCentro, setShowCentro] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEstud = () => setShowEstud(false);
    const handleShowEstud = () => setShowEstud(true);

    const handleCloseCentro = () => setShowCentro(false);
    const handleShowCentro = () => setShowCentro(true);

    const Requisitos = [
        {
            descripcion: 'Pago por carta de presentación',
            estado: 1,
        },
        {
            descripcion: 'RUC de la empresa',
            estado: 2,
        },
        {
            descripcion: 'Razón social',
            estado: 3,
        },
        {
            descripcion: 'Datos completos del representante de la empresa',
        },
    ]

    const Procedimientos = [
        {
            descripcion: 'Rellenar ficha'
        },
        {
            descripcion: 'Imprimir carta de presentación'
        }
    ]

    const EstadoActual = {
        estado: 2,
        fecha: {
            presentacion: '2023-11-10T16:10:00.000'
        }
    }

    const data: DatosCartaAceptacion = {
        nombreAnio: '“Año de la unidad, la paz y el desarrollo”',
        ciudadFecha: 'Huancayo, 26 de octubre del 2023',
        nombreReferente: 'FLOR DE MARIA HUAMAN RUTTI',
        empresaReferente: 'DISFRACES POCHITA',
        cargoReferente: 'ADMINISTRADOR',
        curso: 'PRÁCTICAS PRE PROFESIONALESM III – CURRICULARES',
        nombreEstudiante: 'RUTH STEFANY ESLAVA GASPAR',
        nivelEstudiante: 'IX',
        carrera: 'CONTABILIDAD Y FINANZAS',
        facultad: 'Facultad de Ciencias Administrativas y Contables',
        nombreAdministrativo: 'DR. EUTIMIO CATALINO JARA RODRIGUEZ',
        cargoAdministrativo: 'DECANO (e)',
        urlFirma: 'https://w7.pngwing.com/pngs/374/543/png-transparent-electronic-signature-digital-signature-lawyer-digital-signature-angle-white-electronics.png'
    }

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">

            {/* <ModalDatosPersonales show={show} hide={handleClose} />
                <ModalDatosEstudiante show={showEstud} hide={handleCloseEstud} />
                <ModalDatosCentroLaboral show={showCentro} hide={handleCloseCentro} />*/}

            {/* Agrega el Suspense para manejar la carga perezosa de modales */}
            <Suspense fallback={<div>Cargando...</div>}>
                <ModalDatosPersonales show={show} hide={handleClose} />
                <ModalDatosEstudiante show={showEstud} hide={handleCloseEstud} />
                <ModalDatosCentroLaboral show={showCentro} hide={handleCloseCentro} />
            </Suspense>

            <ContenedorSteps
                numero={1}
                titulo='CARTA DE PRESENTACIÓN'
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <ListaElementos
                            titulo='Requisitos'
                            elementos={Requisitos}
                        />
                        <hr className="my-2" />
                        <ListaElementos
                            titulo='Procedimiento'
                            elementos={Procedimientos}
                        />
                    </div>
                </ContenedorSteps.Informacion>

                <ContenedorSteps.Proceso>
                    <div className='flex flex-col'>

                        <EstadoTemplate
                            datos={EstadoActual}
                        />

                        <hr className="my-2" />

                        <div className="overflow-x-auto p-2">
                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Requisito</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-white border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito estado={1} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos personales
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShow}>Iniciar</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShow}>Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-gray-100 border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito estado={2} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos estudiante
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowEstud}>Iniciar</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowEstud}>Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-white border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito estado={2} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos centro laboral
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowCentro}>Iniciar</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowCentro}>Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <hr className="my-2" />

                        <div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Datos completos, puede descargar la carta de presentación</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Datos incompletos, por favor rellene todos los formularios</span>
                            </div>

                        </div>

                        <hr className="my-2" />

                        <div className="flex">
                            <button onClick={() => generatePDF(data)}

                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded m-auto flex">
                                <i className="bi bi-file-earmark-arrow-down w-1/4 m-auto text-3xl" />
                                <span className='w-3/4'>Descargar Carta de Presentación</span>
                            </button>
                        </div>
                    </div>

                </ContenedorSteps.Proceso>

            </ContenedorSteps>
        </div>
    );
};

export default TemplateStep1;