
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

import Accordion from './compoment/Accordion';
import StepButton from "./compoment/StepButton";
import Card from "../../../component/pages/cards/Card"

import { PagadoMatriculaLista, PagadoPensionLista, PagoMatriculaUsados } from "../../../network/rest/idiomas.network";

import Response from '../../../model/class/response.model.class';
import RestError from "../../../model/class/resterror.model.class";

import { Types } from "../../../model/enum/types.model.enum";

import MatriculaPago from "@/model/interfaces/pago/matriculaPago";
import PensionPago from "@/model/interfaces/pago/pensionPago";

import { IconoCalendario, MultipleCheck, Documento, Lista } from '../../../component/Iconos';

import Listas from "@/model/interfaces/Listas.model.interface";

import MatriculaUsados from "@/model/interfaces/matricula/matriculaUsados";
import PensionUsados from "@/model/interfaces/matricula/pensionUsados";

import MatriculaModalidad from "./MatriculaModalidad"



const MatriculaInterna = () => {

    const codigo = JSON.parse(window.localStorage.getItem("codigo") || "");

    const navigate = useNavigate()

    const [pasoActual, setPasoActual] = useState<number>(1);

    const [pagoAnio, setPagoAnio] = useState(false)
    const [pagoMes, setPagoMes] = useState(false)

    const fechaActual: Date = new Date();

    const aniActual: number = fechaActual.getFullYear()
    const mesActual: number = fechaActual.getMonth() + 1;


    const [loadMes, setLoadMes] = useState(true)
    const [loadAnio, setLoadAnio] = useState(true)




    useEffect(() => {

        /*
        LoadValidarMatriculExistente()

        LoadPagosMatriculaLista()
        LoadPagosPensionLista()

        //Usados
        PagMatriculaUsados()
        PagPensionUsados()

        //handleLoadPago()
        compararMatricula()
        */
        loadInitData()

    }, [])

    /*const handleLoadPago = () => {
        setLoadPago(false)
    };*/

    const cambiarPaso = (paso: number) => {
        setPasoActual(paso);
    };

    // Ruber

    const [moduloMatriculaModalidad, setModuloMatriculaModalidad] = useState(false);

    const [pagoMatriculaLista, setPagoMatriculaLista] = useState<MatriculaPago[]>([]);
    const [pagoPensionLista, setPagoPensionLista] = useState<PensionPago[]>([]);

    const [pagoMatriculaUsados, setPagoMatriculaUsados] = useState<MatriculaUsados[]>([])
    const [pagoPensionUsados, setPagoPensionUsados] = useState<PensionUsados[]>([])

    const [estadoMatricula, setEstadoMatricula] = useState(false)
    const [estadoPension, setEstadoPension] = useState(false)

    const [opeMatricula, SetOpeMatricula] = useState("")
    const [opePension, SetOpePension] = useState("")

    const [load, setLoad] = useState(true)
    const [idRangoMat, setIdRangoMat] = useState(0)


    const [nuevaMatricula, setNuevaMatricula] = useState(false)
    const [nuevoPeriodo, setNuevoPeriodo] = useState(false)


    const abortController = useRef(new AbortController());

    const handleMatriculaModalidad = () => {
        setModuloMatriculaModalidad(!moduloMatriculaModalidad)
    }

    const loadInitData = async () => {


        await Promise.all([

            await LoadPagosMatriculaLista(),
            await LoadPagosPensionLista(),
            await PagMatriculaUsados(),
            await PagPensionUsados(),
            await compararMatricula(),
            await compararPension()
        ])

        //compararMatricula()
        setLoad(false)

        console.log(pagoMatriculaLista)
        console.log(pagoMatriculaUsados)

    }


    const LoadPagosMatriculaLista = async () => {

        //setPagoMatriculaLista([])

        const response = await PagadoMatriculaLista<Listas>(codigo, abortController.current)
        if (response instanceof Response) {

            const matriculas = response.data.resultado as MatriculaPago[]
            if (matriculas[0].total == '0') {
                setPagoMatriculaLista([])
            } else {
                setPagoMatriculaLista(matriculas)
            }

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    const LoadPagosPensionLista = async () => {

        //setPagoPensionLista([])

        const response = await PagadoPensionLista<Listas>(codigo, abortController.current)
        if (response instanceof Response) {

            const pensiones = response.data.resultado as PensionPago[]

            if (pensiones[0].total == '0') {
                setPagoPensionLista([])
            } else {
                setPagoPensionLista(pensiones)
            }

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    // Usados
    const PagMatriculaUsados = async () => {

        //setPagoMatriculaUsados([])

        const response = await PagoMatriculaUsados<Listas>(codigo, abortController.current)
        if (response instanceof Response) {

            const matriUsados = response.data.resultado as MatriculaUsados[]
            if (matriUsados.length == 0) {
                setPagoMatriculaUsados([])
            } else {
                setPagoMatriculaUsados(matriUsados)
            }

        }
        if (response instanceof RestError) {
            console.log(response.getMessage())
        }
    }

    const PagPensionUsados = async () => {

        // setPagoPensionUsados([])

        const response = await PagadoPensionLista<Listas>(codigo, abortController.current)
        if (response instanceof Response) {

            const penUsados = response.data.resultado as PensionUsados[]

            if (penUsados.length == 0) {
                setPagoPensionUsados([])
            } else {
                setPagoPensionUsados(penUsados)
            }

        }
        if (response instanceof RestError) {
            console.log(response.getMessage())
        }
    }

    // Compara Matricula
    const compararMatricula = async () => {

        

        if (pagoMatriculaLista.length == 0) {
            // no pago ninguna matricula
            setEstadoMatricula(false)
        }
        else {

            setEstadoMatricula(true)

            if (pagoMatriculaUsados.length == 0) {
                // no usó ningun pago
                SetOpeMatricula(pagoMatriculaLista[0].operacion)
                setIdRangoMat(1)

                setNuevaMatricula(true)

            }
            else {
                

                const diferentes: MatriculaPago[] = []

                pagoMatriculaLista.forEach(obj1 => {

                    pagoMatriculaUsados.forEach((obj2) => {
                        if (obj1.operacion != obj2.opeMat) {
                            diferentes.push(obj1);
                        }
                    });

                });

                SetOpeMatricula(diferentes[0].operacion)
                setNuevaMatricula(false)

            }

        }

    }

    const compararPension = async () => {

        if (pagoPensionLista.length == 0) {
            // no pago ninguna pension
            setEstadoPension(false)
        }
        else {

            setEstadoPension(true)

            if (pagoPensionUsados.length == 0) {
                // no usó ningun pago
                SetOpePension(pagoPensionLista[0].operacion)

            }
            else {

                const diferentes: PensionPago[] = []

                pagoPensionLista.forEach(obj1 => {

                    pagoPensionUsados.forEach((obj2) => {
                        if (obj1.operacion != obj2.opePen) {
                            diferentes.push(obj1);
                        }
                    });

                });

                SetOpePension(diferentes[0].operacion)

            }

        }

    }


    return (
        <>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        {
                            moduloMatriculaModalidad == true ?
                                (
                                    <MatriculaModalidad
                                        handleMatriculaModalidad={handleMatriculaModalidad}

                                    />
                                ) :
                                (
                                    <div className="p-1 bg-Solid">
                                        <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Matricula</h2>

                                        <div className="w-full">


                                            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                                <div
                                                    className="border-b-2 border-gray-200 p-2 flex justify-between">
                                                    <div className="text-sm font-bold">
                                                        TENER EN CUENTA
                                                    </div>
                                                </div>
                                                <div className="m-2">

                                                    <div className="px-4">

                                                        <ol className="w-full text-gray-500 list-decimal dark:text-gray-400 text-sm">
                                                            <li className="pl-4">
                                                                <span className="font-semibold text-gray-900 dark:text-white">Fechas límite y plazos: </span> Asegúrate de conocer las fechas límite para realizar los pagos de matrícula y pensiones. Cumplir con estos plazos es fundamental.
                                                            </li>
                                                            <li className="pl-4">
                                                                <span className="font-semibold text-gray-900 dark:text-white">Formas de pago:</span> Verifica qué métodos de pago acepta la institución. Asegúrate de tener la información necesaria para cada método de pago.
                                                            </li>
                                                            <li className="pl-4">

                                                                <span className="font-semibold text-gray-900 dark:text-white">Requisitos de matrícula:</span>  Conoce los requisitos específicos para matricularse en los cursos, ya sean restricciones de cupo, requisitos de nivel académico, prerrequisitos, entre otros.

                                                            </li>
                                                        </ol>

                                                    </div>

                                                </div>
                                            </div>

                                            <br />

                                            <div className="flex justify-center mb-4">
                                                <StepButton paso={1} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={Documento} load={load} />
                                                <StepButton paso={2} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={Lista} load={load} />
                                            </div>

                                            <Accordion pasoActual={pasoActual} opeMatricula={opeMatricula} opePension={opePension}  handleMatriculaModalidad={handleMatriculaModalidad} load={load}
                                            />



                                            <h2 className="text-lg font-semibold mt-4">
                                                <span className="text-xl ">Información para tu matrícula:</span>
                                            </h2>

                                            <div className="flex flex-wrap justify-center mt-5">
                                                <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                                    <Card
                                                        imagen={<IconoCalendario />}
                                                        titulo={'Calendario Académico'}
                                                        color={'green'}
                                                        to={'/inicio/proceso'}
                                                        info={''}
                                                    />
                                                </div>
                                                <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                                    <Card
                                                        imagen={<MultipleCheck />}
                                                        titulo={'Cronograma de trámites '}
                                                        color={'yellow'}
                                                        to={'/inicio/proceso'}
                                                        info={''}
                                                    />
                                                </div>
                                                <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                                    <Card
                                                        imagen={<MultipleCheck />}
                                                        titulo={'Cronograma de matrícula'}
                                                        color={'blue'}
                                                        to={'/inicio/proceso'}
                                                        info={''}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                        }

                        {/* <div className="flex justify-end">
                            <NavLink
                                to={'/inicio/seleccion-idioma'}
                            >
                                <button
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-semibold"
                                    onClick={() => { }}
                                >
                                    Seleccionar
                                </button>
                            </NavLink>
                        </div> */}

                    </div>
                </div>
            </div>

        </>
    )
}
export default MatriculaInterna