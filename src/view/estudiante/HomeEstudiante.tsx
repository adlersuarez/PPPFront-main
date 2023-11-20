import { ArrowRightOnCicleSvg } from "@/component/Svg.component";
import { NavLink, RouteComponentProps } from "react-router-dom";

import { images } from "../../helper/index.helper";

const HomeEstudiante = (props: RouteComponentProps<{}>) => {
    if(props){}
    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div className="grid grid-flow-row grid-cols-3 p-6">
                        <div className="col-span-3 px-4 mb-8">

                            <div className="rounded overflow-hidden shadow-lg mx-auto border border-blue-200">
                                <div className="flex">
                                    <div className="w-1/2 px-6 py-4">
                                        <h2 className="text-xl font-mont uppercase font-bold pb-3 ">
                                            !Aprende un nuevo idioma y amplía tus horizontes¡
                                        </h2>
                                        <p className="font-mont text-justify">
                                            En un mundo cada vez más interconectado, el dominio de varios idiomas se ha convertido en una habilidad esencial y ofrecemos una amplia gama de programas de aprendizaje de idiomas, desde cursos intensivos hasta clases regulares, adaptados a las necesidades específicas de la actulidad.
                                        </p>
                                        <p className="font-mont text-justify">
                                            Nuestros expertos te guiarán en tu aprendizaje de idiomas, comprometidos con tus metas y listos para cambiar tu mundo. Descubre el poder de los idiomas.
                                        </p>
                                        <button type="button" className="font-mont  text-white bg-upla-100 hover:bg-upla-200 hover:transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/3 px-5 py-2.5 text-center mt-3">
                                            <NavLink to={'/inicio/matricula_interna'}>
                                                <div className="flex justify-center items-center">
                                                    <ArrowRightOnCicleSvg />
                                                    <span>
                                                        Matriculate
                                                    </span>
                                                </div>
                                            </NavLink>
                                        </button>
                                    </div>
                                    <div className="w-1/2">
                                        <img
                                            className="w-full h-auto max-h-[300px] object-cover"
                                            src={images.portada}
                                            alt="Card Image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            /*
                            <div className="">
                                <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                                    <div className="w-full">
                                        <img
                                            className="w-full"
                                            src={images.portada}
                                            alt="Card Image"
                                        />
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">Notas del estudiante</div>
                                        <p className="text-gray-700 text-base">
                                            This is the content of the card. You can put any text or elements here.
                                        </p>
                                        <button type="button" className="font-mont  text-white bg-upla-100 hover:bg-upla-200 hover:transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/3 px-5 py-2.5 text-center mt-3">
                                            <NavLink to={'/inicio/matricula_interna'}>
                                                <div className="flex justify-center items-center">
                                                    <ArrowRightOnCicleSvg />
                                                    <span>
                                                        Ver Registro de Notas
                                                    </span>
                                                </div>
                                            </NavLink>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                                    <div className="w-full">
                                        <img
                                            className="w-full"
                                            src={images.portada}
                                            alt="Card Image"
                                        />
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="font-bold font-mont text-xl mb-2">Noticias</div>
                                        <p className="text-gray-700 text-base">
                                            This is the content of the card. You can put any text or elements here.
                                        </p>
                                        <button type="button" className="font-mont  text-white bg-upla-100 hover:bg-upla-200 hover:transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/3 px-5 py-2.5 text-center mt-3">
                                            <NavLink to={'/inicio/matricula_interna'}>
                                                <div className="flex justify-center items-center">
                                                    <ArrowRightOnCicleSvg />
                                                    <span>
                                                        Ver Noticias
                                                    </span>
                                                </div>
                                            </NavLink>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto">
                                    <div className="w-full">
                                        <img
                                            className="w-full"
                                            src={images.portada}
                                            alt="Card Image"
                                        />
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">Información</div>
                                        <p className="text-gray-700 text-base">
                                            This is the content of the card. You can put any text or elements here.
                                        </p>
                                        <button type="button" className="font-mont  text-white bg-upla-100 hover:bg-upla-200 hover:transition-all focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/3 px-5 py-2.5 text-center mt-3">
                                            <NavLink to={'/inicio/matricula_interna'}>
                                                <div className="flex justify-center items-center">
                                                    <ArrowRightOnCicleSvg />
                                                    <span>
                                                        Más Información
                                                    </span>
                                                </div>
                                            </NavLink>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            */
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomeEstudiante