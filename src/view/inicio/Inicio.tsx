import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../../store/configureStore.store';
import Aside from '../pages/layout/aside/Aside';
import Nav from '../pages/layout/nav/Nav';
//import Dashboard from './dashboard/Dashboard';
import { css, images } from '../../helper/index.helper';
//import Bienvenido from './bienvenido/Bienvenido';
import { useEffectOnce } from 'react-use';
import { EstudianteRest, TrabajadorRest } from '../../network/rest/services.network';
import Response from '../../model/class/response.model.class';
import { logout } from '../../store/authSlice.store';
import RestError from '../../model/class/resterror.model.class';
import Estudiante from '../../model/interfaces/estudiante.model.interface';
import Trabajador from '../../model/interfaces/trabajador.model.interface';
import { Toaster } from 'react-hot-toast';
import { ConsultaInfoEstId, ConsultaInfoPerId } from '@/network/rest/practicas.network';
import { InfoEstudiante } from '@/model/interfaces/estudiante/infoEstudiante';
import { loginDataEstudiante } from '@/store/estudianteSlice.store';
import { InfoPeriodo } from '@/model/interfaces/periodo/infoPeriodo';
import { loginDataPersonal } from '@/store/personalSlice.store';

const Inicio = () => {

    const dispatch = useDispatch()
    const location = useLocation()

    const autenticado = useSelector((state: RootState) => state.autenticacion.autenticado)

    //const roles = useRolLogin()
    //console.log(codigoLoginToken, roles)
    if (!autenticado) {
        return <Navigate to="/login" />
    }

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const refAside = useRef<HTMLInputElement>(null)

    const refBlock = useRef<HTMLInputElement>(null)

    const refMain = useRef<HTMLInputElement>(null)

    const refOverlay = useRef<HTMLInputElement>(null)

    const [cargando, setCargando] = useState<boolean>(true)

    const [informacion, setInformacion] = useState<Estudiante | Trabajador>()

    useEffectOnce(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const menus = document.querySelectorAll<HTMLElement>("#menus li button") as NodeListOf<HTMLButtonElement>
        for (const button of menus) {
            button.addEventListener("click", () => {
                const element = button.parentNode?.querySelector("ul") as HTMLElement

                if (element.getAttribute("aria-expanded") !== "true") {
                    element.setAttribute("aria-expanded", "true")
                    element.style.maxHeight = element.scrollHeight + "px"

                    button.classList.remove("text-gray-400")
                    button.classList.add("text-white")
                    button.classList.add("bg-gray-700")

                    button.children[2].classList.remove("rotate-[-90deg]")

                    const list = button.parentElement?.parentElement?.querySelectorAll<HTMLElement>("button") as NodeListOf<HTMLButtonElement>
                    for (const bu of list) {
                        if (button.getAttribute("id-list") !== bu.getAttribute("id-list")) {
                            const elementUl = bu.parentNode?.querySelector("ul") as HTMLElement
                            if (elementUl.getAttribute("aria-expanded") == "true") {
                                elementUl.setAttribute("aria-expanded", "false")
                                elementUl!.style.maxHeight = elementUl.style.maxHeight = "0px"

                                bu!.classList.remove("text-white")
                                bu!.classList.add("text-gray-400")
                                bu!.classList.remove("bg-gray-700")
                                bu.children[2].classList.add("rotate-[-90deg]")
                            }
                        }
                    }


                } else {
                    element.setAttribute("aria-expanded", "false")
                    element.style.maxHeight = element.style.maxHeight = "0px"

                    button.classList.remove("text-white")
                    button.classList.add("text-gray-400")
                    button.classList.remove("bg-gray-700")

                    button.children[2].classList.add("rotate-[-90deg]")
                }
            })
        }
    })

    useEffect(() => {
        const load = async () => {
            if (codigo.length === 8) {
                const response = await TrabajadorRest<Trabajador>(codigo)

                //console.log(response)

                if (response instanceof Response) {
                    setInformacion(response.data as Trabajador)
                    setCargando(false)

                    const respuestaAlumno = await ConsultaInfoPerId<InfoPeriodo>()
                    if (respuestaAlumno instanceof Response) {
                        dispatch(loginDataPersonal(respuestaAlumno.data))
                        //guardamos los datos del alumno
                    }
                }

                if (response instanceof RestError) {
                    dispatch(logout())
                    //setCargando(false)
                }
            } else {
                const response = await EstudianteRest<Estudiante>(codigo)

                if (response instanceof Response) {
                    setInformacion(response.data as Estudiante)
                    setCargando(false)

                    const respuestaAlumno = await ConsultaInfoEstId<InfoEstudiante>()
                    if (respuestaAlumno instanceof Response) {
                        dispatch(loginDataEstudiante(respuestaAlumno.data))
                        //guardamos los datos del alumno
                    }
                }

                if (response instanceof RestError) {
                    dispatch(logout())
                }
            }
        }

        load()

    }, [])

    useEffect(() => {
        const onEventResize = (event: Event) => {
            const target = event.target as Window;
            if (target.innerWidth > 768) {
                refAside.current?.classList.add("ml-[-256px]");

                refOverlay.current?.classList.add("hidden");
            }
        }

        window.addEventListener('resize', onEventResize);

        return () => window.removeEventListener('resize', onEventResize)
    }, [])

    useEffect(() => {
        const onEventFocused = () => {
            // console.log("lasd")
        }

        window.addEventListener('focus', onEventFocused);

        return () => window.removeEventListener('focus', onEventFocused);
    }, [])

    const onEventOverlay = () => {
        refAside.current?.classList.toggle("ml-[-256px]");
        refOverlay.current?.classList.toggle("hidden");
    }

    const onEventMenu = () => {
        let windowWidth = window.innerWidth;
        if (windowWidth <= 768) {
            refAside.current?.classList.toggle("ml-[-256px]");
            refOverlay.current?.classList.toggle("hidden");
        } else {
            refAside.current?.classList.toggle("md:ml-[0px]");
            refMain.current?.classList.toggle("md:ml-[256px]");
            refBlock.current?.classList.toggle("md:w-64");
        }
    }

    return (
        <div className="flex w-full h-screen overscroll-none">

            {
                cargando &&
                <div className="fixed z-[500] w-screen h-screen">
                    <div className=" w-screen h-screen bg-gray-900">
                    </div>
                    <div className=" w-full h-full absolute left-0 top-0 text-white flex justify-center items-center flex-col">
                        <img src={images.logo} className="w-[10.5rem] mr-0 my-3" alt="Flowbite Logo" />
                        <div style={{ "borderTopColor": "transparent" }}
                            className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin">
                        </div>
                        <h1 className='m-3 text-center'>
                            Cargando información, espere por favor...
                        </h1>
                    </div>
                </div>
            }

            {/* Navbar */}
            <Nav refBlock={refBlock} onEventMenu={onEventMenu} />
            {/*  */}

            {/* Aside */}
            <Aside informacion={informacion} pathname={location.pathname} refAside={refAside} refOverlay={refOverlay} onEventOverlay={onEventOverlay} />
            {/*  */}

            <div
                ref={refMain}
                className={css.DivMain}>
                <div className="w-full font-mont overflow-y-auto">
                    {/*INICIO NAVEGACION */}
                    <div className="content-wrapper flex-wrap">
                        <Outlet />
                    </div>
                    {/* FIN NAVEGACION  */}
                </div>
                {/*  */}
            </div>
            {/*  */}
            <Toaster />
        </div>
    );
}

export default Inicio;
