import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import { images } from "../../helper/index.helper";

import toast, { Toaster } from 'react-hot-toast';

import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model.enum";

import EstudianteLogin from "../../model/interfaces/login/estudiante.login";
import { logout } from "../../store/authSlice.store";
import { ListarPrograma, ListarModalidad, InsertarDatosEstudiantePrimerLogin } from "../../network/rest/idiomas.network";

import Listas from "../../model/interfaces/Listas.model.interface";
import Modalidad from "../../model/interfaces/modalidad/modalidad";
import Programa from "../../model/interfaces/programa/programa";
import RespValue from "../../model/interfaces/RespValue.model.interface";


type Props = {
    codigo: string,
    informacion: EstudianteLogin | undefined
    validarPrimerLogin : (codigo: string)=> void
}

const PrimerLogin = (props: Props) => {

    const dispatch = useDispatch();

    const [comboBoxPrograma, setComboBoxPrograma] = useState<Programa[]>([])
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);

    const [programa, setPrograma] = useState("0")
    const [modalidad, setModalidad] = useState("0")

    const refPrograma = useRef<HTMLSelectElement>(null)
    const refModalidad = useRef<HTMLSelectElement>(null)

    const abortController = useRef(new AbortController());

    useEffect(() => {
        ListaProgramas()
        ListaModalidad()
    }, [])


    const ListaProgramas = async () => {

        const response = await ListarPrograma<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxPrograma(response.data.resultado as Programa[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const ListaModalidad = async () => {

        const response = await ListarModalidad<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxModalidad(response.data.resultado as Modalidad[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }


    const onEventRegEstDetalle = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const selectProg = refPrograma.current;
        const selectMod = refModalidad.current;

        if(programa == "0"){
            selectProg?.focus();
            return
        }
        if(modalidad == "0"){
            selectMod?.focus();
            return
        }

        const response = await InsertarDatosEstudiantePrimerLogin<RespValue>(props.codigo, parseInt(programa), parseInt(modalidad))
        if (response instanceof Response) {
            if(response.data.value == "procesado"){
                toast.success('Registro procesado')
                props.validarPrimerLogin(props.codigo)
                return
            }else{
                toast.error('Se produjo un error, intente mas tarde')
                return
            }

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            toast.error('Se produjo un error, intente mas tarde')
            return
        }

    }

    return (
        <>  
            <Toaster 
                position="bottom-right"
            />

            <div className="flex flex-wrap w-screen h-screen bg-portada">

                <div className="px-6 md:px-4 sm:px-3 my-auto mx-auto w-full md:w-1/2 xl:w-1/3">
                    <div className="shadow-lg border bg-white rounded-md">
                        <motion.img
                            className="m-auto w-10 pt-2"
                            // animate={{
                            //     scale: [1, 1.5, 1.5, 1, 1],
                            //     rotate: [0, 0, 270, 270, 0],
                            //     borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                            // }}
                            transition={{ duration: 2 }}
                            src={images.logo}
                            alt=""
                        />
                        <div className="flex flex-col items-center my-5">

                            <p className="text-center font-mont"><strong>CENTRO DE IDIOMAS</strong></p>
                            <p className="font-mont text-center mb-2 mt-1 text-sm">COMPLETAR REGISTRO DE ESTUDIANTE</p>

                            <form className="w-full lg:px-8 md:px-4 px-2 overflow-y-auto" onSubmit={onEventRegEstDetalle}>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-2">

                                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                        <div
                                            className="border-b-2 border-gray-200 p-2">
                                            <div className="text-sm font-bold text-blue-700">
                                                {props.informacion?.apellidoPaterno} {props.informacion?.apellidoMaterno} {props.informacion?.nombres} - {props.codigo}
                                            </div>
                                        </div>
                                        <div className="m-2">

                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                                                <div className="font-bold text-xs">
                                                    <p>Facultad: <span className="text-blue-700">{props.informacion?.facultad}</span></p>
                                                    <p>Carrera: <span className="text-blue-700">{props.informacion?.carrera}</span></p>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="text-xs">La información restante del estudiante se tomara del respositorio de la universidad.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2 mt-4">
                                    <div>
                                        <label
                                            className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                        >
                                            Programa <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            ref={refPrograma}
                                            value={programa}
                                            onChange={ (event) => setPrograma(event.currentTarget.value) }
                                        >
                                            <option value="0">- Seleccione -</option>
                                            {
                                                comboBoxPrograma.map((item) => {
                                                    return (
                                                        <option key={item.programaId} value={item.programaId}>
                                                            {item.programa}
                                                        </option>
                                                    );
                                                })
                                            }

                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                        >
                                            Modalidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                        </label>
                                        <select
                                            className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                            ref={refModalidad}
                                            value={modalidad}
                                            onChange={ (event) => setModalidad(event.currentTarget.value) }
                                        >
                                            <option value="0">- Seleccione -</option>
                                            {
                                                comboBoxModalidad.map((item) => {
                                                    return (
                                                        <option key={item.modalidadId} value={item.modalidadId}>
                                                            {item.modalidad}
                                                        </option>
                                                    );
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-3 mt-6">
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="font-mont
                                            block 
                                            m-auto 
                                            md:w-full 
                                            text-white 
                                            bg-upla-100 
                                            hover:bg-upla-200 
                                            hover:transition-all 
                                            focus:ring-4 
                                            focus:outline-none 
                                            focus:ring-blue-300 
                                            font-medium 
                                            rounded-lg 
                                            text-sm w-full 
                                            sm:w-auto px-5 
                                            py-2.5 text-center">
                                            <div className="flex justify-center items-center">
                                                <span className="px-2">Registrar</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                            </form>

                            <span className="text-xs mb-2">
                                Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
                            </span>

                            <span className="text-xs cursor-pointer text-upla-100 font-bold hover:underline"
                                onClick={() => dispatch(logout())}>
                                <i className="bi bi-arrow-left-circle-fill text-xs"></i> Salir
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrimerLogin