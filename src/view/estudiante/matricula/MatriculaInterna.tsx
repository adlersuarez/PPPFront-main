
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import Accordion from './compoment/Accordion';
import StepButton from "./compoment/StepButton";
import Card from "../../../component/pages/cards/Card"

import { PagoMatriculaLista, ValidarMatriculaExistente, ValidarPagoMatriculaEstudiante, ValidarPagoPensionMesEstudiante, } from "../../../network/rest/idiomas.network";

import Response from '../../../model/class/response.model.class';
import RestError from "../../../model/class/resterror.model.class";
import RespValue from "../../../model/interfaces/RespValue.model.interface";

import { Types } from "../../../model/enum/types.model.enum";

import MatriculaPago from "@/model/interfaces/matricula/matriculaPago";
import MatriculaPension from "@/model/interfaces/matricula/matriculaPension";

import { IconoCalendario, MultipleCheck, Documento, Lista } from '../../../component/Iconos';

import MatriculaModalidad from "./MatriculaModalidad"
import Listas from "@/model/interfaces/Listas.model.interface";

import { Toaster } from 'react-hot-toast';

const MatriculaInterna = () => {

    const codigo = JSON.parse(window.localStorage.getItem("codigo") || "");

    const navigate = useNavigate()

    const [pasoActual, setPasoActual] = useState<number>(1);

    const [pagoAnio, setPagoAnio] = useState(false)
    const [pagoMes, setPagoMes] = useState(false)

    const fechaActual: Date = new Date();

    const aniActual: number = fechaActual.getFullYear()
    const mesActual: number = fechaActual.getMonth() + 1;

    //const [loadPago, setLoadPago] = useState(true)
    const [loadMes, setLoadMes] = useState(true)
    const [loadAnio, setLoadAnio] = useState(true)
    // 0 -> no pago
    // 1 -> pago normal
    // 2 -> pago intensivo
    const [tipPago, setTipPago] = useState(0)


    useEffect(() => {
        LoadValidarMatriculExistente()

        LoadPagosMatriculaLista()


        // validarPagMatriEst(codigo, aniActual)
        // validarPagPesionMesEst(codigo, aniActual, mesActual)

        //handleLoadPago()

    }, [])

    /*const handleLoadPago = () => {
        setLoadPago(false)
    };*/

    const cambiarPaso = (paso: number) => {
        setPasoActual(paso);
    };

    const validarPagMatriEst = async (codigo: string, anio: number) => {

        const validar = await ValidarPagoMatriculaEstudiante<RespValue>(codigo, anio)

        if (validar instanceof Response) {

            if (validar.data.value == "1") {
                setPagoAnio(true)
            } else {
                setPagoAnio(false)
            }

            setLoadAnio(false)
        }
        if (validar instanceof RestError) {
            console.log(validar.getMessage())
        }
    }


    const validarPagPesionMesEst = async (codigo: string, anio: number, mes: number) => {

        const validar = await ValidarPagoPensionMesEstudiante<RespValue>(codigo, anio, mes)

        if (validar instanceof Response) {
            if (validar.data.value == "1") {
                setPagoMes(true)
                setTipPago(1)

            }
            else if (validar.data.value == "2") {
                setPagoMes(true)
                setTipPago(2)

            }
            else {
                setPagoMes(false)
                setTipPago(0)
            }

            setLoadMes(false)
        }
        if (validar instanceof RestError) {
            console.log(validar.getMessage())
        }
    }

    // const datosModalidad = [
    //     { titulo: 'Revisa tus pendientes', info: 'Información 1', infoExtra: 'dimelo' },
    //     { titulo: '¡Importante!', info: 'Información 2' },

    // ];


    // Ruber

    const [primeraMatricula, setPrimeraMatricula] = useState(false)

    const [moduloMatriculaModalidad, setModuloMatriculaModalidad] = useState(false);

    const [pagoMatriculaLista, setPagoMatriculaLista] = useState<MatriculaPago[]>([]);
    const [pagoPensionLista, setPagoPensionLista] = useState<MatriculaPension[]>([]);



    const abortControl = new AbortController()

    const handleMatriculaModalidad = () => {
        setModuloMatriculaModalidad(!moduloMatriculaModalidad)
    }

    const LoadValidarMatriculExistente = async () => {

        setPrimeraMatricula(false)

        const response = await ValidarMatriculaExistente<RespValue>(codigo)
        if (response instanceof Response) {

            if (response.data.value == "0"){
                setPrimeraMatricula(true)
            } 
            if (response.data.value == "1"){
                setPrimeraMatricula(false)
            } 
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    const LoadPagosMatriculaLista = async () => {

        setPagoMatriculaLista([])

        const response = await PagoMatriculaLista<Listas>(codigo, abortControl)
        if (response instanceof Response) {

            const matriculas = response.data.resultado as MatriculaPago[]

            if(matriculas[0].total == '0'){
                
            } else{
                setPagoMatriculaLista(matriculas)
            }

            console.log(matriculas)


            console.log(response.data.resultado)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
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
                                                    <div className="text-sm font-bold">
                                                        {!primeraMatricula ? 'Ya se matriculo por lo menos una vez' : 'Usted no cuenta con ninguna matricula'}
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
                                                <StepButton paso={1} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={Documento} tipoPago={tipPago} />
                                                <StepButton paso={2} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={Lista} tipoPago={tipPago} />
                                            </div>

                                            <Accordion pasoActual={pasoActual} tipoPago={tipPago} pagoAnio={pagoAnio} pagoMes={pagoMes} anioActual={aniActual} handleMatriculaModalidad={handleMatriculaModalidad}
                                                loadPagos={loadAnio || loadMes}
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

            <Toaster />

        </>
    )
}
export default MatriculaInterna