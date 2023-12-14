import CustomModal from "../../../../component/Modal.component";
import { useEffect, useRef, useState, ChangeEvent } from "react";

import { useSelector } from "react-redux";
import { RootState } from '../../../../store/configureStore.store';

import Response from "../../../../model/class/response.model.class";
import RestError from "../../../../model/class/resterror.model.class";
import { Types } from "../../../../model/enum/types.model.enum";

import { keyNumberInteger, diaSelect, colorSelect, GenerateRangeTurno, FinalizarHorarioCheckBox } from '../../../../helper/herramienta.helper'

import Listas from "../../../../model/interfaces/Listas.model.interface";
import { ListarAsignatura, ListarDocenteIdiomasBusqueda, InsertarActualizarHorarioDetalle, } from "../../../../network/rest/idiomas.network";

import RespValue from "../../../../model/interfaces/RespValue.model.interface";
import Sweet from '../../../../model/interfaces/Sweet.mode.interface'
import Asignatura from "../../../../model/interfaces/asignatura/asignatura";
import DocenteInfo from "../../../../model/interfaces/docente/docenteInfo";


type Props = {
    isOpenModal: boolean
    idHorario: number
    idIdioma: number
    idTipoEstudio: number

    turnoInicio: string | undefined
    turnoFin: string | undefined

    sweet: Sweet
    abortControl: AbortController
    handleCloseModalHorarioAgregra: () => void
}

const HorarioDetAgregar = (props: Props) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [comboBoxAsignatura, setComboBoxAsignatura] = useState<Asignatura[]>([])
    const [comboBoxDocente, setComboBoxDocente] = useState<DocenteInfo[]>([])

    const [comboBoxRangeTurno, setcomboBoxRangeTurno] = useState<any>([])

    const [dia, setDia] = useState<number>(0)
    const [horaInicio, setHoraInicio] = useState<string>("")
    const [horaFin, setHoraFin] = useState<string>("")
    const [asiId, setAsiId] = useState<string>("0")
    const [color, setColor] = useState<string>("0")
    const [capacidad, setCapacidad] = useState<number>(0)
    const [nivel, setNivel] = useState<string>("")

    const [docenteId, setDocenteId] = useState<string>("")


    const [observacion, setObservacion] = useState<string>("")
    const [estado, setEstado] = useState<boolean>(true)

    //const refDia = useRef<HTMLSelectElement>(null)
    const refHoraInicio = useRef<HTMLSelectElement>(null)
    const refHoraFin = useRef<HTMLSelectElement>(null)
    const refAsignatura = useRef<HTMLSelectElement>(null)
    const refColor = useRef<HTMLSelectElement>(null)
    const refCapacidad = useRef<HTMLInputElement>(null)



    const [searchTermDocente, setSearchTermDocente] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isDisabledInput, setIsDisabledInput] = useState(false)
    const refInputBusqueda = useRef<HTMLInputElement>(null)

    useEffect(() => {
        LoadDataAsignatura()
        LoadDataRangeTurno()

        if (horaInicio !== '' && selectedDays.length>0 && props.idTipoEstudio) {
            setHoraFin(FinalizarHorarioCheckBox(selectedDays, props.idTipoEstudio, horaInicio));
        }

    }, [horaInicio, dia, props.idTipoEstudio])


    const LoadDataAsignatura = async () => {

        setComboBoxAsignatura([])

        const response = await ListarAsignatura<Listas>(props.abortControl)
        if (response instanceof Response) {
            setComboBoxAsignatura(response.data.resultado as Asignatura[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataRangeTurno = async () => {

        setcomboBoxRangeTurno([])

        if (props.turnoInicio === undefined || props.turnoFin === undefined) {
            console.log('El rango de horas para el turno no se pudo crear');
            // Aquí podrías hacer cualquier otra lógica o manejo de error que desees
        } else {
            const rangoTurno = GenerateRangeTurno(props.turnoInicio, props.turnoFin)
            setcomboBoxRangeTurno(rangoTurno)

        }
    }

    const LoadDataDocente = async (buscar: string) => {

        setComboBoxDocente([])

        const response = await ListarDocenteIdiomasBusqueda<Listas>(buscar, props.abortControl)
        if (response instanceof Response) {
            setComboBoxDocente(response.data.resultado as DocenteInfo[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }



    const handleEstadoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.checked);
    };


    /*const onRegistrarHorarioDetalle = () => {

        //event.preventDefault()

        if (dia == 0) {
            refDia.current?.focus()
            return
        }
        if (horaInicio == "") {
            refHoraInicio.current?.focus()
            return
        }
        if (horaFin == "") {
            refHoraFin.current?.focus()
            return
        }
        if (asiId == "0") {
            refAsignatura.current?.focus()
            return
        }
        if (color == "0") {
            refColor.current?.focus()
            return
        }
        if (capacidad == 0) {
            refCapacidad.current?.focus()
            return
        }
        if (docenteId == "") {
            refInputBusqueda.current?.focus()
            return
        }

        const params = {
            "detHorarioId": 0,
            "horarioId": props.idHorario,
            "asiId": asiId,
            "nivel": nivel,
            "capacidad": capacidad,
            "dia": dia,
            "horaIni": horaInicio,
            "horaFin": horaFin,
            "horaAcademica": 1,
            "color": color,
            "observacion": observacion,
            "docenteId": docenteId,
            "estado": estado ? 1 : 0,
            "usuarioRegistra": codigo,
            "fechaRegistra": new Date().toISOString(),
            "usuarioModifica": "",
            "fechaModifica": new Date().toISOString(),
        }

        props.sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                props.sweet.openInformation("Mensaje", "Procesando información...")

                const response = await InsertarActualizarHorarioDetalle<RespValue>("CREAR", params, props.abortControl);

                if (response instanceof Response) {

                    if (response.data.value == "procesado") {
                        props.sweet.openSuccess("Mensaje", response.data.value as string, () => { props.handleCloseModalHorarioAgregra() });
                    }

                }


                if (response instanceof RestError) {

                    if (response.getType() === Types.CANCELED) return;

                    
                    //if (response.getStatus() == 401) {
                        // dispatch(logout());
                       // return;
                    //}

                    //if (response.getStatus() == 403) {
                     //   return;
                   // }
                    

                    props.sweet.openWarning("Mensaje", response.getMessage(), () => { props.handleCloseModalHorarioAgregra() });
                }
            }
        })

    }*/

    const onRegistrarHorarioDetalle = () => {

        //event.preventDefault()

        if (horaInicio == "") {
            refHoraInicio.current?.focus()
            return
        }
        if (horaFin == "") {
            refHoraFin.current?.focus()
            return
        }
        if (asiId == "0") {
            refAsignatura.current?.focus()
            return
        }
        if (color == "0") {
            refColor.current?.focus()
            return
        }
        if (capacidad == 0) {
            refCapacidad.current?.focus()
            return
        }
        if (docenteId == "") {
            refInputBusqueda.current?.focus()
            return
        }

        props.sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {

            if (value) {
                props.sweet.openInformation("Mensaje", "Procesando información...")

                await Promise.all(selectedDays.map(async (day) => {
                    const params = {
                        "detHorarioId": 0,
                        "horarioId": props.idHorario,
                        "asiId": asiId,
                        "nivel": nivel,
                        "capacidad": capacidad,
                        "dia": day,
                        "horaIni": horaInicio,
                        "horaFin": horaFin,
                        "horaAcademica": 1,
                        "color": color,
                        "observacion": observacion,
                        "docenteId": docenteId,
                        "estado": estado ? 1 : 0,
                        "usuarioRegistra": codigo,
                        "fechaRegistra": new Date().toISOString(),
                        "usuarioModifica": "",
                        "fechaModifica": new Date().toISOString(),
                    }

                    try {
                        const response = await InsertarActualizarHorarioDetalle<RespValue>("CREAR", params, props.abortControl);

                        if (response instanceof Response) {

                            if (response.data.value == "procesado") {
                                props.sweet.openSuccess("Mensaje", response.data.value as string, () => { props.handleCloseModalHorarioAgregra() });
                            }
                        }

                        if (response instanceof RestError) {

                            if (response.getType() === Types.CANCELED) return;

                            /*
                            if (response.getStatus() == 401) {
                                // dispatch(logout());
                                return;
                            }
        
                            if (response.getStatus() == 403) {
                                return;
                            }
                            */

                            props.sweet.openWarning("Mensaje", response.getMessage(), () => { props.handleCloseModalHorarioAgregra() });
                        }
                    } catch (error) {
                        console.error(error);
                    }

                }));
            }
        })

    }

    //Input Docentes
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermDocente(event.target.value);
    };


    const handleSearchInput = () => {
        if (searchTermDocente.trim() == '') {
            refInputBusqueda.current?.focus()
            return
        }

        LoadDataDocente(searchTermDocente)

        setIsSearching(true);
    };

    const handleListClick = (docente: DocenteInfo) => {

        setDocenteId(docente.numdocuttraba)
        setSearchTermDocente(docente.numdocuttraba + ' - ' + `${docente.apepatttraba} ${docente.apemattraba} ${docente.nomttraba}`);

        setIsSearching(false); // Oculta la lista al seleccionar un elemento
        setIsDisabledInput(true)
    };

    const handleClearInput = () => {
        setIsDisabledInput(false)
        setSearchTermDocente("")
        setDocenteId("")
        setSelectedDays([])
    }

    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    const handleDayCheckboxChange = (id: number) => {
        const updatedDays = selectedDays.includes(id)
            ? selectedDays.filter((selectedDay) => selectedDay !== id)
            : [...selectedDays, id].sort((a, b) => a - b);
    
        setSelectedDays(updatedDays);
    };
    
    const renderDayCheckboxes = () => {
        return diaSelect.map((day) => (
            <div key={day.id} className="flex gap-2">
                <input
                    type="checkbox"
                    id={`day${day.id}`}
                    className='my-auto text-gray-500'
                    checked={selectedDays.includes(day.id)}
                    onChange={() => handleDayCheckboxChange(day.id)}
                />
                <label
                    className='my-auto'
                    htmlFor={`day${day.id}`}>
                    {day.dia}
                </label>
            </div>
        ));
    };

    return (
        <>
            <CustomModal
                isOpen={props.isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {
                    setDia(0)
                    setHoraInicio("")
                    setHoraFin("")
                    setAsiId("0")
                    setColor("0")
                    setCapacidad(0)

                    setIsDisabledInput(false)
                    setSearchTermDocente("")
                    setDocenteId("")
                    setSelectedDays([])

                }}
                onClose={props.handleCloseModalHorarioAgregra}
            >
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Nueva Asignatura</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={props.handleCloseModalHorarioAgregra}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4 pb-2 pt-4">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                            <div className="col-span-3">
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Dias de clases <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <div className="grid grid-cols-4">
                                    {renderDayCheckboxes()}
                                </div>
                            </div>
                            {/*<div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Dia <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refDia}
                                    value={dia}
                                    onChange={(event) => {
                                        setDia(parseInt(event.currentTarget.value));
                                    }}
                                >
                                    <option value={0}>- Seleccione -</option>
                                    {
                                        diaSelect.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.dia}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>*/}
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Asignatura <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refAsignatura}
                                    value={asiId}
                                    onChange={(event) => {
                                        setAsiId(event.currentTarget.value);

                                        const filterNivel = comboBoxAsignatura.filter((item) => event.currentTarget.value == item.asiId)

                                        setNivel(filterNivel[0].asiNivel)

                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        comboBoxAsignatura.map((item, index) => {

                                            if (item.idiomaId === props.idIdioma) {
                                                return (
                                                    <option key={index} value={item.asiId}>
                                                        {item.asignatura} - {item.asiNivel}
                                                    </option>
                                                );
                                            }
                                            return null;

                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Horario Inicio <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refHoraInicio}
                                    value={horaInicio}
                                    onChange={(event) => {
                                        setHoraInicio(event.currentTarget.value);
                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        comboBoxRangeTurno.map((item: any, index: any) => {
                                            return (
                                                <option key={index} value={item.hora}>
                                                    {item.hora}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Horario Fin <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <input
                                    type="time"
                                    //ref={refHoraFin}
                                    value={horaFin}
                                    /*onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setHoraFin(e.target.value)
                                    }}*/
                                    disabled
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center bg-gray-100"
                                />

                                {/*<select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refHoraFin}
                                    value={horaFin}
                                    onChange={(event) => {
                                        setHoraFin(event.currentTarget.value);
                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        comboBoxRangeTurno.map((item: any, index: any) => {
                                            return (
                                                <option key={index} value={item.hora}>
                                                    {item.hora}
                                                </option>
                                            );
                                        })
                                    }
                                </select>*/}
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">

                            {/*<div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Asignatura <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refAsignatura}
                                    value={asiId}
                                    onChange={(event) => {
                                        setAsiId(event.currentTarget.value);

                                        const filterNivel = comboBoxAsignatura.filter((item) => event.currentTarget.value == item.asiId)

                                        setNivel(filterNivel[0].asiNivel)

                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        comboBoxAsignatura.map((item, index) => {

                                            if (item.idiomaId === props.idIdioma) {
                                                return (
                                                    <option key={index} value={item.asiId}>
                                                        {item.asignatura} - {item.asiNivel}
                                                    </option>
                                                );
                                            }
                                            return null;

                                        })
                                    }
                                </select>
                            </div>*/}
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Nivel
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center bg-gray-100"
                                    value={nivel} />

                            </div>

                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Color <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refColor}
                                    value={color}
                                    onChange={(event) => {
                                        setColor(event.currentTarget.value);
                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        colorSelect.map((item, index) => {
                                            return (
                                                <option key={index} value={item.codColor} style={{ backgroundColor: item.codColor }}>
                                                    {item.nombreColor}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Capacidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <input
                                    type="text"
                                    maxLength={3}
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center"
                                    ref={refCapacidad}
                                    value={capacidad}
                                    onChange={(event) => {
                                        if (event.target.value.trim().length > 0) {
                                            setCapacidad(parseInt(event.currentTarget.value));
                                        } else {
                                            setCapacidad(0);
                                        }
                                    }}
                                    onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberInteger(event)}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">

                            {/*<div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Nivel
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center bg-gray-100"
                                    value={nivel} />
                            </div>*/}
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Observación
                                </label>
                                <textarea
                                    rows={1}
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                >
                                </textarea>
                            </div>

                            <div className="col-span-2">
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Instructor <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <div className="relative flex flex-wrap">
                                    <input
                                        type="text"
                                        className={`relative flex-auto rounded-l border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 p-1 ${isDisabledInput && 'bg-gray-100'}`}
                                        placeholder="Ingrese el dni o apellidos para buscar"
                                        style={{ fontSize: '12px' }}
                                        disabled={isDisabledInput}
                                        ref={refInputBusqueda}
                                        value={searchTermDocente}
                                        onChange={handleSearch}
                                    />
                                    {
                                        isDisabledInput === false ? (
                                            <button
                                                title="Buscar"
                                                className="flex items-center rounded-r border-md border-gray-500 bg-gray-500 text-white px-2 hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                                onClick={handleSearchInput}
                                            >
                                                <i className="bi bi-search"></i>
                                            </button>
                                        ) : (
                                            <button
                                                title="Limpiar"
                                                className="flex items-center rounded-r border-md border-red-500 bg-red-500 text-white px-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                                                onClick={handleClearInput}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </button>
                                        )
                                    }

                                </div>
                                {isSearching && (
                                    <ul
                                        className="absolute mt-1 bg-blue-50 border border-gray-00 rounded-md shadow-md overflow-y-auto z-10 max-h-36"
                                    >
                                        {comboBoxDocente.map((docente) => (
                                            <li
                                                key={docente.numdocuttraba} className="border-b border-gray-300 py-0 px-6 text-xs cursor-pointer"
                                                onClick={() => handleListClick(docente)}
                                            >
                                                <span className="font-semibold">{docente.numdocuttraba}</span> {docente.apepatttraba} {docente.apemattraba} {docente.nomttraba}
                                            </li>
                                        ))}
                                    </ul>
                                )}


                            </div>

                        </div>

                        {/* Observacion */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">

                            {/*<div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Observación
                                </label>
                                <textarea
                                    rows={1}
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                >
                                </textarea>
                            </div>*/}

                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Estado
                                </label>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={estado}
                                        onChange={handleEstadoChange} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{`${estado == true ? 'activo' : 'inactivo'}`}</span>
                                </label>
                            </div>

                        </div>

                    </div>

                    <div className="relative flex flex-wrap justify-center">
                        <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                            onClick={onRegistrarHorarioDetalle}
                        >
                            <i className="bi bi-floppy-fill mr-1"></i> Guardar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                            onClick={props.handleCloseModalHorarioAgregra}
                        >
                            <i className="bi bi-x-circle mr-1"></i> Cerrar
                        </button>
                    </div>

                    <div className="relative flex flex-wrap justify-center mt-4">
                        <span className="text-xs mb-2">
                            Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
                        </span>
                    </div>
                </div>

            </CustomModal>
        </>
    )
}

export default HorarioDetAgregar