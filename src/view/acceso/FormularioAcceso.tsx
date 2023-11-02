import React, { useRef, useState } from "react";
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/configureStore.store";
import { images } from "../../helper/index.helper";
import { AcedemicCapSvg, ArrowRightOnCicleSvg } from "../../component/Svg.component";
import { login } from "../../store/authSlice.store";
import Button from "./widget/Button";
import InputPassword from "./widget/InputPassword";
import InputClave from "./widget/InputClave";
import Checked from "./widget/Checked";
import { LoginRest } from "../../network/rest/services.network";
import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import Login from "../../model/interfaces/login.model.interface";
import { AiFillWarning } from "react-icons/ai";
import { Types } from "../../model/enum/types.model";
import Estudiante from '@/model/interfaces/estudiante.model.interface';

const FormularioAcceso = (props: RouteComponentProps<{}>) => {

    const dispatch = useDispatch();
    const autenticado = useSelector((state: RootState) => state.autenticacion.autenticado)

    const [codigo, setCodigo] = useState<string>('');
    const [clave, setClave] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [proceso, setProceso] = useState<boolean>(false);

    const [ver, setVer] = useState<boolean>(false);

    const [codigoMensaje, setCodigoMensaje] = useState<string>('');
    const [claveMensaje, setClaveMensaje] = useState<string>('');

    const refCodigo = useRef<HTMLInputElement>(null);
    const refClave = useRef<HTMLInputElement>(null);

    const onEventAcceso = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (proceso) return;

        setCodigoMensaje("");
        setClaveMensaje("");
        setMensaje("");

        if (codigo == "") {
            refCodigo.current!.focus();
            setCodigoMensaje("!El campo es oblogatorio¡");
            return;
        }

        if (clave == "") {
            refClave.current!.focus();
            setClaveMensaje("!El campo es oblogatorio¡");
            return;
        }

        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }

        setProceso(true);

        const data = {
            "codigo": codigo,
            "contraseña": clave
        }

        const response = await LoginRest<Login>(data);

        //console.log(response)

        if (response instanceof Response) {
            dispatch(login({ codigo: response.data.docNumId, token: response.data.token }));
            return;
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            setMensaje(response.getMessage());
            setProceso(false);
            refCodigo.current?.focus();
        }
    }

    const onEvenVerClave = () => {
        setVer(!ver);
        refClave.current?.focus();
    }

    if (autenticado) {
        return <Redirect to="/inicio" />
    }

    return <>
        <div className="flex flex-wrap w-screen h-screen bg-portada">
            {
                // <div className="bg-portada relative -z-20 bg-cover hidden md:flex md:w-1/2 xl:w-2/3">
                //     <div className="bg-sombra w-full  h-screen absolute -z-10"></div>
                //     <div className="m-auto text-white text-center">
                //         <motion.p
                //             className="text-lg md:text-xl lg:text-3xl font-mont font-thin"
                //             initial={{ x: -1000, opacity: 0 }}
                //             transition={{ duration: 0.8 }}
                //             animate={{ x: 0, opacity: 1 }}
                //             exit={{ opacity: 0 }}>Bienvenidos al Sistema</motion.p>
                //         <motion.h1 className="text-2xl md:text-4xl lg:text-6xl font-mont font-bold"
                //             initial={{ x: -1000, opacity: 0 }}
                //             animate={{ x: 0, opacity: 1 }}
                //             transition={{ duration: 1 }}
                //         >CENTRO DE IDIOMAS</motion.h1>
                //         <motion.p
                //             className="text-lg md:text-xl lg:text-2xl font-mont font-thin flex justify-center items-center"
                //             initial={{ x: -1000, opacity: 0 }}
                //             transition={{ duration: 0.8 }}
                //             animate={{ x: 0, opacity: 1 }}
                //             exit={{ opacity: 0 }}> <span className="px-1">UPLA</span> <AcedemicCapSvg size={"w-8 h-8"} /></motion.p>
                //     </div>
                // </div>
            }
            <div className="px-6 md:px-12 sm:px-10 my-auto mx-auto w-full md:w-1/2 xl:w-1/3">
                <div className="shadow-lg border bg-white">
                    {/* <motion.img
                        className="m-auto w-32 pt-4"
                        animate={{
                            scale: [1, 1.5, 1.5, 1, 1],
                            rotate: [0, 0, 270, 270, 0],
                            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                        }}
                        transition={{ duration: 2 }}
                        src={images.logo}
                        alt=""
                    /> */}
                    <div className="flex flex-col items-center my-5">
                        <p className="font-mont text-center my-1">Por favor ingrese a su DNI</p>
                        <p className="md:hidden text-center font-mont">INTRANET</p>
                        <p className="md:hidden text-center font-mont text-sm flex">
                            <span className="px-1">(INT)</span> <AcedemicCapSvg />
                        </p>
                        {mensaje != "" && <p className="text-red-600 flex items-center"><AiFillWarning className="mr-1" /> <span>{mensaje}</span></p>}

                        <form className="w-full lg:px-12 md:px-8 px-4" onSubmit={onEventAcceso}>

                            <div className="my-3">
                                <label
                                    className="font-mont block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Codigo de Estudiante
                                </label>
                                <input
                                    type="text"
                                    placeholder="Digite su Codigo"
                                    disabled
                                    className="font-mont bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div className="my-3">
                                <label
                                    className="font-mont block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Apellido Paterno
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej. Jurado"
                                    disabled
                                    className="font-mont bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div className="my-3">
                                <label
                                    className="font-mont block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Apellido Materno
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej. Baldeon"
                                    disabled
                                    className="font-mont bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div className="my-3">
                                <label
                                    className="font-mont block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej. Joham Terry"
                                    disabled
                                    className="font-mont bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div className="my-3">
                                <label
                                    className="font-mont block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Direccion
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej. Av. Luz Nº245"
                                    className="font-mont bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>
                            <div className="my-3">
                                <label
                                    className="font-mont block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Sede
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej. Sede Central Huancayo"
                                    className="font-mont bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            </div>

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
                                    {

                                            <ArrowRightOnCicleSvg />
                                    }

                                    <span className="px-2">Registrar</span>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FormularioAcceso;