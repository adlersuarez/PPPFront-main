import { ArrowRightOnCicleSvg } from "@/component/Svg.component";
import { NavLink } from "react-router-dom";
import Card from "../../component/pages/cards/CardDash"

import { images } from "../../helper/index.helper";
import { IconoCalendario, MultipleCheck, Documento, Vida, Matricula } from '../../component/Iconos';

const HomeEstudiante = () => {

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div className="grid grid-flow-row grid-cols-3 p-6">
                        <div className="col-span-3 px-4 mb-8">

                            <div className="flex flex-wrap justify-center mt-5">
                                <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                    <Card
                                        imagen={<Matricula />}
                                        titulo={'Matrícula'}
                                        subTitulo={'Realiza tu matrícula.'}
                                        color={'green'}
                                        to={'/inicio/matricula-interna'}
                                        info={''}
                                    />
                                </div>
                                <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                    <Card
                                        imagen={<Vida />}
                                        titulo={'Vida académica'}
                                        subTitulo={'Revisa tu experiencia en Idiomas Upla.'}
                                        color={'yellow'}
                                        to={'/inicio/vida-academica'}
                                        info={''}
                                    />
                                </div>
                                </div>


                            <div className="rounded overflow-hidden shadow-lg mx-auto border border-blue-200">
  
                                {/* <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                    <Card
                                        imagen={<Vida />}
                                        titulo={'Vida académica'}
                                        subTitulo={'Revisa tu experiencia en Idiomas Upla.'}
                                        color={'yellow'}
                                        to={'/inicio/vida-academica'}
                                        info={''}
                                    />
                                </div> */}
                                {/* <div className="w-full lg:w-1/3 sm:w-1/2 px-2 mb-4">
                                    <Card
                                        imagen={<MultipleCheck />}
                                        titulo={'Trámites'}
                                        subTitulo={'Administra tus peticiones.'}
                                        color={'blue'}
                                        to={'/inicio/proceso'}
                                        info={''}
                                    />
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomeEstudiante