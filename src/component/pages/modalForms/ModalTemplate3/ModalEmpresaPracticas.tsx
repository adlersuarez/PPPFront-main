import Modal from "../../modal/ModalComponente"
import { ChangeEvent, useEffect, useRef, useState } from "react"

import toast from "react-hot-toast"
import useSweerAlert from "../../../../component/hooks/useSweetAlert"
import RestError from "@/model/class/resterror.model.class"
import Response from "@/model/class/response.model.class"
import { ListarCargo, ListarGrado, ListarUbigeo, ObtenerDatosEmpresaElegida, RegistrarJefeInmediato } from "@/network/rest/practicas.network"
import RespValue from "@/model/interfaces/RespValue.model.interface"
import { Types } from "@/model/enum/types.model"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import Grado from "@/model/interfaces/grado/grado"
import Cargo from "@/model/interfaces/cargo/cargo"
import { ConsultarDni } from "@/network/rest/apiconsultas.network"
import DniPersona from "@/model/interfaces/respuesta-api/dni.persona.model.interface"
import Listas from "@/model/interfaces/Listas.model.interface"
import { TipoCargo } from "@/model/interfaces/cargo/tipoCargo"
import { TipoGrado } from "@/model/interfaces/grado/tipoGrado"
import EmpresaElegidaFormulario from "@/model/interfaces/empresa/empresaElegidaFormulario"
import Ubigeo from "@/model/interfaces/ubigeo/ubigeo"
import RegistroAreaTrabajo from "@/model/interfaces/datosEnviados/registroAreaTrabajo"
import { EmpresaAreaTrabajo } from "@/model/interfaces/empresa/empresaAreaTrabajo"

type Props = {
    show: boolean
    hide: () => void
    init: () => void
}

const ModalEmpresaPracticas: React.FC<Props> = ({ show, hide,init }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const abortController = useRef(new AbortController())

    const sweet = useSweerAlert()

    const [dni, setDni] = useState<string>("")
    const [grado, setGrado] = useState<Grado[]>([])
    const [cargo, setCargo] = useState<Cargo[]>([])

    const [cargaDni, setCargaDni] = useState<boolean>(true)
    const [empresaDatos, setEmpresaDatos] = useState<EmpresaAreaTrabajo | null>(null)

    const [datosAreaTrabajo, setDatosAreaTrabajo] = useState<EmpresaElegidaFormulario>({
        areaTrabajoDireccion: "",
        areaTrabajoUbigeo: "",
        jefeNombres: "",
        jefeApellidoPat: "",
        jefeApellidoMat: "",
        jefeDni: "",
        cargoId: 0,
        gradoId: 0,
        jefeEmail: '',
        jefeCelular: ''
    })

    // Consulta de PRUEBA para datos del DNI
    const consultarDNI = async () => {

        if (dni.trim() == '') {
            toast.error("Ingrese un número de DNI")
            return
        }

        if (dni.trim().length !== 8 && dni.trim() !== '') {
            toast.error("El DNI consta de 8 caracteres")
            return
        }
        setCargaDni(false)
        const response = await ConsultarDni<DniPersona>(dni);
        if (response instanceof Response) {
            let respuesta = response.data.data
            if (respuesta) {
                setDatosAreaTrabajo({
                    ...datosAreaTrabajo,
                    jefeNombres: respuesta.nombres,
                    jefeApellidoPat: respuesta.apellido_paterno,
                    jefeApellidoMat: respuesta.apellido_materno,
                    jefeDni: dni,
                })
            }
            if (!response.data.success) {
                setDatosAreaTrabajo({
                    ...datosAreaTrabajo,
                    jefeNombres: "-",
                    jefeApellidoPat: "",
                    jefeApellidoMat: "",
                    jefeDni: "",
                })
            }
        }
        setCargaDni(true)
    }

    //Grado
    const handleChangeGrado = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        //const gradoEncontrado = grado.find(grad => grad.gradoId === Number(selectedValue))
        setDatosAreaTrabajo({
            ...datosAreaTrabajo,
            gradoId: Number(selectedValue)
        })
    }

    //Cargo
    const handleChangeCargo = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        //const cargoEncontrado = cargo.find(car => car.cargoId === Number(selectedValue))
        setDatosAreaTrabajo({
            ...datosAreaTrabajo,
            cargoId: Number(selectedValue)
        })
    }

    const LoadGrado = async () => {
        setGrado([])
        const response = await ListarGrado<Listas>(abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Grado[]
            setGrado(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadCargo = async () => {
        setCargo([])
        const response = await ListarCargo<Listas>(abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Cargo[]
            setCargo(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataDocente = async (buscar: string) => {

        setComboBoxDPD([])

        const response = await ListarUbigeo<Listas>(buscar, abortController.current)
        if (response instanceof Response) {
            setComboBoxDPD(response.data.resultado as Ubigeo[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDatosEmpresa = async () => {
        setGrado([])
        const response = await ObtenerDatosEmpresaElegida<EmpresaAreaTrabajo>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EmpresaAreaTrabajo
            setEmpresaDatos(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadGrado()
        LoadCargo()
        LoadDatosEmpresa()
    }, [])

    const cerrarModal = () => {
        hide()
        setDatosAreaTrabajo({
            areaTrabajoDireccion: "",
            areaTrabajoUbigeo: "",
            jefeNombres: "",
            jefeApellidoPat: "",
            jefeApellidoMat: "",
            jefeDni: "",
            cargoId: 0,
            gradoId: 0,
            jefeEmail: '',
            jefeCelular: ''
        })
        setDni("")
    }

    const agruparPorTipoGrado = (grados: Grado[]): TipoGrado[] => {
        const tiposGradoMap: { [key: string]: TipoGrado } = {}
        // Iterar sobre cada elemento del array grado
        grados.forEach((item) => {
            // Verificar si ya existe una entrada para el tipo de grado
            if (!tiposGradoMap[item.tipoGrado]) {
                // Si no existe, crear una nueva entrada para el tipo de grado
                tiposGradoMap[item.tipoGrado] = {
                    tipoGradoId: item.tipoGradoId,
                    tipoGrado: item.tipoGrado,
                    grados: [],
                }
            }
            // Agregar el grado al arreglo correspondiente al tipo de grado
            tiposGradoMap[item.tipoGrado].grados.push(item)
        })
        // Convertir el mapa de tipos de grado en un array
        const tiposGradoArray = Object.values(tiposGradoMap)
        return tiposGradoArray
    }

    const agruparPorTipoCargo = (cargos: Cargo[]): TipoCargo[] => {
        // Mapa para almacenar los tipos de cargo y sus respectivos cargos
        const tiposCargoMap: { [key: string]: TipoCargo } = {};

        // Iterar sobre cada cargo
        cargos.forEach((cargo) => {
            // Verificar si ya existe una entrada para el tipo de cargo
            if (!tiposCargoMap[cargo.tipoCargo]) {
                // Si no existe, crear una nueva entrada para el tipo de cargo
                tiposCargoMap[cargo.tipoCargo] = {
                    tipoCargoId: cargo.tipoCargoId,
                    tipoCargo: cargo.tipoCargo,
                    cargos: [],
                };
            }
            // Agregar el cargo al arreglo correspondiente al tipo de cargo
            tiposCargoMap[cargo.tipoCargo].cargos.push(cargo);
        });

        // Convertir el mapa de tipos de cargo en un array y devolverlo
        return Object.values(tiposCargoMap);
    }

    //console.log(datosAreaTrabajo)
    //UBIGeo
    const [searchTermDPD, setSearchTermDPD] = useState<string>("")
    const [comboBoxDPD, setComboBoxDPD] = useState<Ubigeo[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [isDisabledInput, setIsDisabledInput] = useState(false)
    const refInputBusqueda = useRef<HTMLInputElement>(null)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermDPD(event.target.value)
        LoadDataDocente(event.target.value)
        setIsSearching(true)
    }
    const handleListClick = (direccion: Ubigeo) => {
        setSearchTermDPD(direccion.l_Depa.trim() + ' - ' + direccion.l_Prov.trim() + ' - ' + direccion.l_Ubig.trim())
        setIsSearching(false); // Oculta la lista al seleccionar un elemento
        setIsDisabledInput(true)
        setDatosAreaTrabajo({
            ...datosAreaTrabajo,
            areaTrabajoUbigeo: direccion.ubigeoSiu
        })
    }

    /*const handleSearchInput = () => {
        if (searchTermDPD.trim() == '') {
            refInputBusqueda.current?.focus()
            return
        }
        LoadDataDocente(searchTermDPD)
        setIsSearching(true);
    }*/

    const handleClearInput = () => {
        setIsDisabledInput(false)
        setSearchTermDPD("")
        setComboBoxDPD([])
        setDatosAreaTrabajo({
            ...datosAreaTrabajo,
            areaTrabajoUbigeo: ""
        })
    }

    const handleChangeDireccionArea = (event: ChangeEvent<HTMLInputElement>) => {
        setDatosAreaTrabajo({
            ...datosAreaTrabajo,
            areaTrabajoDireccion: event.target.value
        })
    }

    const handleChangeEmailJefe = (event: ChangeEvent<HTMLInputElement>) => {
        setDatosAreaTrabajo({
            ...datosAreaTrabajo,
            jefeEmail: event.target.value
        })
    }

    const handleChangeCelularJefe = (event: ChangeEvent<HTMLInputElement>) => {
        setDatosAreaTrabajo({
            ...datosAreaTrabajo,
            jefeCelular: event.target.value
        })
    }

    const handleRegistrarDatosEmpresa = () => {

        if (datosAreaTrabajo.areaTrabajoDireccion.trim() == '') {
            toast.error("En necesario consignar la dirección del centro laboral donde realiza sus prácticas")
            return
        }
        if (datosAreaTrabajo.jefeNombres == "-") {
            toast.error("En necesario consignar un dni válido correspondiente a su jefe inmediato")
            return
        }
        if (datosAreaTrabajo.gradoId == 0) {
            toast.error("En necesario consignar el grado académico de su jefe inmediato")
            return
        }
        if (datosAreaTrabajo.cargoId == 0) {
            toast.error("En necesario consignar el cargo que ostenta su jefe inmediato")
            return
        }
        if (datosAreaTrabajo.jefeEmail == "") {
            toast.error("En necesario consignar el correo electrónico personal de su jefe inmediato")
            return
        }
        if (datosAreaTrabajo.jefeCelular == "") {
            toast.error("En necesario consignar el celular personal de su jefe inmediato")
            return
        }

        const params: RegistroAreaTrabajo = {
            jsonDatosJefe: {
                gradoId: datosAreaTrabajo.gradoId,
                cargoId: datosAreaTrabajo.cargoId,
                jefeDni:datosAreaTrabajo.jefeDni,
                jefeNombres: datosAreaTrabajo.jefeNombres,
                jefeApellidoPat: datosAreaTrabajo.jefeApellidoPat,
                jefeApellidoMat: datosAreaTrabajo.jefeApellidoMat,
                jefeEmail: datosAreaTrabajo.jefeEmail,
                jefeCelular: datosAreaTrabajo.jefeCelular
            },
            jsonAreaPractica: {
                direccionAreaPracticas: datosAreaTrabajo.areaTrabajoDireccion,
                ubigeo: datosAreaTrabajo.areaTrabajoUbigeo
            }
        }

        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                sweet.openInformation("Mensaje", "Procesando información...")
                const response = await RegistrarJefeInmediato<RespValue>(periodo, codigo, params, abortController.current)
    
                if (response instanceof Response) {
                    if (response.data.value == "procesado") {
                        sweet.openSuccess("¡Operación completada con éxito!", "Los datos del Área de trabajo han sido registrados satisfactoriamente.", () => {
                            init() // Actualizar la lista de Cartas
                            cerrarModal() // Cerrar modal
                        })
                    }
                }

                if (response instanceof RestError) {
                    if (response.getType() === Types.CANCELED) return
                    if (response.getStatus() == 401) return
                    if (response.getStatus() == 403) return

                    sweet.openWarning("Error", "Por favor, comuníquese con la Oficina de Informática.", () => { })
                }

            }
        })
    }

    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={cerrarModal}> </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>
                    <div className='bg-gray-100 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex text-upla-100'>
                            <i className="bi bi-1-circle-fill ml-2 text-2xl" />
                            <span className='ml-4 font-bold sm:text-xl my-auto'>DATOS DEL CENTRO LABORAL</span>
                        </div>
                    </div>
                    <div className='bg-gray-100 w-full rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="nombreEmpresa" className='font-bold text-gray-500'>Nombre de la Empresa</label>
                            <input
                                type="text"
                                id="nombreEmpresa"
                                name="nombreEmpresa"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                                value={empresaDatos?.empresaNombre}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="ruc" className='font-bold text-gray-500'>RUC</label>
                            <input
                                type="text"
                                id="ruc"
                                name="ruc"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                                value={empresaDatos?.empresaRuc}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="direccionEmpresa" className='font-bold text-gray-500'>Dirección de la Empresa</label>
                            <input
                                type="text"
                                id="direccionEmpresa"
                                name="direccionEmpresa"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                                value={empresaDatos?.direccion}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="ubicacionDireccion" className='font-bold text-gray-500'>Departamento / Provincia / Distrito</label>
                            <input
                                type="text"
                                id="ubicacionDireccion"
                                name="ubicacionDireccion"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                                value={empresaDatos?.depProvDist}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="estadoEmpresa" className='font-bold text-gray-500'>Dirección del centro laboral <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                            <input
                                type="text"
                                id="nombreEmpresa"
                                name="nombreEmpresa"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                value={datosAreaTrabajo.areaTrabajoDireccion}
                                onChange={handleChangeDireccionArea}
                                placeholder="Ingrese dirección del centro laboral..."
                            />
                        </div>
                        <div className='gap-1'>
                            <label htmlFor="dpdArea" className='font-bold text-gray-500'>Departamento / Provincia / Distrito <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                            <div className="relative flex flex-wrap mt-1">
                                <input
                                    title={datosAreaTrabajo.areaTrabajoUbigeo ?? "Ubigeo - " + datosAreaTrabajo.areaTrabajoUbigeo}
                                    type="text"
                                    id="dpdArea"
                                    name="dpdArea"
                                    className='relative h-9 flex-grow border rounded-l-md border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs'
                                    disabled={isDisabledInput}
                                    ref={refInputBusqueda}
                                    value={searchTermDPD}
                                    onChange={handleSearch}
                                    placeholder="Filtrar por Dep / Prov / Dist  o  Ubigeo"
                                />
                                {
                                    isDisabledInput === false ? (
                                        <button
                                            title="Limpiar búsqueda"
                                            className="flex items-center rounded-r border border-gray-500 bg-gray-500 text-white px-2.5 hover:bg-gray-700 hover:border-gray-700 hover:scale-105"
                                            onClick={handleClearInput}
                                        >
                                            <i className="bi bi-arrow-clockwise" />
                                        </button>
                                    ) : (
                                        <button
                                            title="Borrar"
                                            className="flex items-center rounded-r border border-gray-500 bg-gray-500 text-white px-2.5 hover:border-red-500 hover:bg-red-500 hover:scale-105"
                                            onClick={handleClearInput}
                                        >
                                            <i className="bi bi-x-circle" />
                                        </button>
                                    )
                                }
                            </div>
                            {isSearching && (
                                <ul
                                    className="absolute mt-1 border border-gray-300 rounded-md shadow-md overflow-y-auto z-10 max-h-36"
                                >
                                    {comboBoxDPD.map((dpd) => (
                                        <li
                                            key={dpd.ubigeoSiu} className="flex gap-8 bg-blue-50 hover:bg-blue-200 justify-between border-b border-gray-300 py-1 px-2 text-xs cursor-pointer"
                                            onClick={() => handleListClick(dpd)}
                                        >
                                            <span className="font-medium">{dpd.l_Prov + ' - ' + dpd.l_Ubig}</span> <span className="font-semibold ">{dpd.ubigeoSiu}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}


                        </div>
                    </div>
                    <div className='bg-gray-100 text-upla-100 w-full rounded-lg flex p-2 mt-3'>
                        <i className="bi bi-2-circle-fill ml-2 text-2xl" />
                        <span className='ml-4 font-bold sm:text-xl my-auto'>DATOS DEL JEFE INMEDIATO</span>
                    </div>
                    <div className='bg-gray-100 w-full rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="dniJefe" className='font-bold text-gray-500'>DNI <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                            <div className='grid grid-cols-3 gap-2'>
                                <input
                                    type="text"
                                    id="dniJefe"
                                    name="dniJefe"
                                    placeholder="Ingrese DNI"
                                    value={dni}
                                    maxLength={8}
                                    className='col-span-2 w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                    onChange={(e) => setDni(e.target.value)}

                                />
                                <button className='w-full flex gap-2 bg-gray-400 hover:bg-upla-100 hover:scale-105 text-white py-2 px-4 rounded'
                                    onClick={consultarDNI}
                                >
                                    {cargaDni ?
                                        <div className='animate-none'><i className="bi bi-search" /></div>
                                        :
                                        <div className='animate-spin'><i className="bi bi-hourglass" /></div>
                                    }
                                    Buscar
                                </button>
                            </div>

                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="nombreJefe" className='font-bold text-gray-500'>Nombre</label>
                            <input
                                type="text"
                                id="nombreJefe"
                                name="nombreJefe"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                                value={datosAreaTrabajo.jefeNombres + ' ' + datosAreaTrabajo.jefeApellidoPat + ' ' + datosAreaTrabajo.jefeApellidoMat}
                                readOnly
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="gradoInstruccion" className='font-bold text-gray-500'>Grado de instrucción <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                            <select
                                id="gradoInstruccion"
                                name="gradoInstruccion"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm'
                                //defaultValue={datos.id_grado_instruccion}
                                onChange={handleChangeGrado}
                            >
                                <option value="0">Selecciona una opción</option>
                                {agruparPorTipoGrado(grado).map(tipo => (
                                    <optgroup key={tipo.tipoGradoId} label={'Carrera ' + tipo.tipoGrado}>
                                        {tipo.grados.map(gr => (
                                            <option key={gr.gradoId} value={gr.gradoId}>{gr.gradoNombre}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="cargoJefe" className='font-bold text-gray-500'>Cargo que desempeña <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                            <select
                                id="cargoJefe"
                                name="cargoJefe"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm'
                                // defaultValue={datos.id_grado_instruccion}
                                onChange={handleChangeCargo}
                            >
                                <option value="0">Selecciona una opción</option>
                                {agruparPorTipoCargo(cargo).map(tipo => (
                                    <optgroup key={tipo.tipoCargoId} label={tipo.tipoCargo}>
                                        {tipo.cargos.map(car => (
                                            <option key={car.cargoId} value={car.cargoId}>{car.cargoNombre}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="emailJefe" className='font-bold text-gray-500'>Correo electrónico <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                            <input
                                type="text"
                                id="emailJefe"
                                name="emailJefe"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                value={datosAreaTrabajo.jefeEmail}
                                onChange={handleChangeEmailJefe}
                                placeholder="Ingrese email del jefe inmediato..."
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="celularJefe" className='font-bold text-gray-500'>Celular <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                            <input
                                type="text"
                                id="celularJefe"
                                name="celularJefe"
                                className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                value={datosAreaTrabajo.jefeCelular}
                                onChange={handleChangeCelularJefe}
                                placeholder="Ingrese celular del jefe inmediato..."
                            />
                        </div>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex justify-end">
                    <div className="mb-3 lg:mb-0 hidden">
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className="grid grid-cols-1  gap-3">
                        <button
                            onClick={handleRegistrarDatosEmpresa}
                            className={`text-white bg-gray-400 hover:bg-green-400 hover:border-green-400 focus:outline-none rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10`}
                        >
                            Registrar
                        </button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>

    )
}

export default ModalEmpresaPracticas