import CustomModal from "../../../../component/Modal.component";
import { useEffect, useRef, useState, ChangeEvent } from "react";

import { useSelector } from "react-redux";
import { RootState } from '../../../../store/configureStore.store';

import Response from "../../../../model/class/response.model.class";
import RestError from "../../../../model/class/resterror.model.class";
import { Types } from "../../../../model/enum/types.model.enum";

import { keyNumberInteger, diaSelect, horaSelect, colorSelect } from '../../../../helper/herramienta.helper'

import Listas from "../../../../model/interfaces/Listas.model.interface";
import { InsertarActualizarHorario, ListarAsignatura } from "../../../../network/rest/idiomas.network";

import RespValue from "../../../../model/interfaces/RespValue.model.interface";
import Sweet from '../../../../model/interfaces/Sweet.mode.interface'
import Asignatura from "../../../../model/interfaces/asignatura/asignatura";


type Props = {
    isOpenModal: boolean,
    idIdioma: number
    sweet: Sweet,
    abortControl: AbortController,
    handleCloseModalHorarioDetProceso: () => void
}

const HorarioDetProceso = (props: Props) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)

    const [comboBoxAsignatura, setComboBoxAsignatura] = useState<Asignatura[]>([])

    const [dia, setDia] = useState<number>(0)
    const [horaInicio, setHoraInicio] = useState<string>("")
    const [horaFin, setHoraFin] = useState<string>("")
    const [asiId, setAsiId] = useState<string>("")
    const [color, setColor] = useState<string>("")
    const [capacidad, setCapacidad] = useState<number>(0)
    const [nivel, setNivel] = useState<string>("")
    const [horaAcademica, setHoraAcademica] = useState<number>(0)
    const [observacion, setObservacion] = useState<string>("")
    const [estado, setEstado] = useState<boolean>(true)

    const refDia = useRef<HTMLSelectElement>(null)
    const refHoraInicio = useRef<HTMLSelectElement>(null)
    const refHoraFin = useRef<HTMLSelectElement>(null)
    const refAsignatura = useRef<HTMLSelectElement>(null)
    const refColor = useRef<HTMLSelectElement>(null)
    const refCapacidad = useRef<HTMLInputElement>(null)
    const refHoraAcademica = useRef<HTMLInputElement>(null)
    const refObservacion = useRef<HTMLInputElement>(null)
    const refEstado = useRef<HTMLInputElement>(null)

    const [idTurno, setIdTurno] = useState<number>(0)
    const [idPrograma, setIdPrograma] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<number>(0)
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)

    const refTurno = useRef<HTMLSelectElement>(null)
    const refPrograma = useRef<HTMLSelectElement>(null)
    const refPeriodo = useRef<HTMLSelectElement>(null)
    const refTipoEstudio = useRef<HTMLSelectElement>(null)


    interface Person {
        id: number;
        name: string;
        age: number;
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [people, setPeople] = useState<Person[]>([
        { id: 1, name: 'John', age: 30 },
        { id: 2, name: 'Alice', age: 25 },
        { id: 3, name: 'Bob', age: 35 },
        { id: 4, name: 'Sarah', age: 28 },
        { id: 5, name: 'Michael', age: 32 },
        { id: 6, name: 'Emily', age: 27 },
        { id: 7, name: 'William', age: 40 },
        { id: 8, name: 'Olivia', age: 22 },
        { id: 9, name: 'James', age: 33 },
        { id: 10, name: 'Emma', age: 29 },
        { id: 11, name: 'Daniel', age: 31 },
        { id: 12, name: 'Sophia', age: 26 },
        { id: 13, name: 'Liam', age: 34 },
        { id: 14, name: 'Ava', age: 24 },
        { id: 15, name: 'Benjamin', age: 36 },
        { id: 16, name: 'Mia', age: 30 },
        { id: 17, name: 'Ethan', age: 37 },
        { id: 18, name: 'Charlotte', age: 23 },
        { id: 19, name: 'Alexander', age: 38 },
        { id: 20, name: 'Amelia', age: 31 },
        { id: 21, name: 'Jacob', age: 39 },
        { id: 22, name: 'Harper', age: 26 },
        { id: 23, name: 'Matthew', age: 29 },
        { id: 24, name: 'Abigail', age: 33 },
        { id: 25, name: 'David', age: 35 },
        { id: 26, name: 'Sofia', age: 27 },
        { id: 27, name: 'Logan', age: 30 },
        { id: 28, name: 'Ella', age: 32 },
        { id: 29, name: 'Joseph', age: 28 },
        { id: 30, name: 'Avery', age: 34 },
    ]);

    const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [isDisabledInput, setIsDisabledInput] = useState(false)

    const refInputBusqueda = useRef<HTMLInputElement>(null)


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const handleSearchInput = () => {
        if (searchTerm.trim() == '') {
            refInputBusqueda.current?.focus()
            return
        }
        const filtered = people.filter((person) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPeople(filtered);
        setIsSearching(true);
    };

    const handleListClick = (person: Person) => {
        setSelectedPerson(person);
        setSearchTerm(person.name + ' - ' + person.age);
        setIsSearching(false); // Oculta la lista al seleccionar un elemento
        setIsDisabledInput(true)
    };

    const handleClearInput = () => {
        setIsDisabledInput(false)
        setSearchTerm('')
    }



    useEffect(() => {
        DataAsignatura()

    }, [])



    const DataAsignatura = async () => {

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



    const handleEstadoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEstado(event.target.checked);
    };


    const onRegistrarHorario = () => {

        //event.preventDefault()

        if (idTurno == 0) {
            refTurno.current?.focus()
            return
        }
        if (idPrograma == 0) {
            refPrograma.current?.focus()
            return
        }
        if (idPeriodo == 0) {
            refPeriodo.current?.focus()
            return
        }
        if (idTipoEstudio == 0) {
            refTipoEstudio.current?.focus()
            return
        }

        const params = {
            "horarioId": 0,
            "turnoId": idTurno,
            // "idiomaId": props.idIdioma,
            "programaId": idPrograma,
            // "sedeId": props.idSede,
            // "modalidadId": props.idModalidad,
            "periodoId": idPeriodo,
            "tipEstudioId": idTipoEstudio,
            "seccion": "",
            "estado": estado ? 1 : 0,
            "usuarioRegistra": codigo,
            "fechaRegistra": new Date().toISOString(),
            "usuarioModifica": "",
            "fechaModifica": new Date().toISOString(),
        }

        props.sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                props.sweet.openInformation("Mensaje", "Procesando información...")

                const response = await InsertarActualizarHorario<RespValue>("CREAR", params, props.abortControl);

                if (response instanceof Response) {

                    if (response.data.value == "procesado") {
                        props.sweet.openSuccess("Mensaje", response.data.value as string, () => { props.handleCloseModalHorarioDetProceso() });
                    }

                }


                if (response instanceof RestError) {

                    if (response.getType() === Types.CANCELED) return;

                    if (response.getStatus() == 401) {
                        // dispatch(logout());
                        return;
                    }

                    if (response.getStatus() == 403) {
                        return;
                    }

                    props.sweet.openWarning("Mensaje", response.getMessage(), () => { props.handleCloseModalHorarioDetProceso() });
                }
            }
        })

    }

    return (
        <>
            <CustomModal
                isOpen={props.isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {
                    setIdTurno(0)
                    setIdPrograma(0)
                    setIdPeriodo(0)
                    setIdTipoEstudio(0)
                    setEstado(true)
                }}
                onClose={props.handleCloseModalHorarioDetProceso}
            >
                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Nueva Asignatura</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={props.handleCloseModalHorarioDetProceso}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4 pb-2 pt-4">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                            <div>
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
                                        horaSelect.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
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
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    ref={refHoraFin}
                                    value={horaFin}
                                    onChange={(event) => {
                                        setHoraFin(event.currentTarget.value);
                                    }}
                                >
                                    <option value={"0"}>- Seleccione -</option>
                                    {
                                        horaSelect.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.hora}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">

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
                                    <option value={0}>- Seleccione -</option>
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

                            <div className="col-span-2">
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Instructor <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <div className="relative flex flex-wrap">
                                    <input
                                        type="text"
                                        className={`relative flex-auto rounded-l border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 p-1 ${isDisabledInput && 'bg-gray-100'}`}
                                        // className="relative flex-auto rounded-l border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 p-1"
                                        disabled={isDisabledInput}
                                        ref={refInputBusqueda}
                                        value={searchTerm}
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
                                        // className="absolute mt-1 bg-blue-100 border border-gray-00 rounded-md shadow-md overflow-y-auto z-10"
                                        className="absolute mt-1 bg-blue-50 border border-gray-00 rounded-md shadow-md overflow-y-auto z-10 max-h-36"
                                    >
                                        {filteredPeople.map((person) => (
                                            <li
                                                key={person.id} className="border-b border-gray-300 py-0 px-6"
                                                onClick={() => handleListClick(person)}
                                            >
                                                <span className="font-semibold">{person.name}</span> - Age: {person.age}
                                            </li>
                                        ))}
                                    </ul>
                                )}


                            </div>

                        </div>

                        {/* Observacion */}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">

                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    H. Academicas <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    // ref={refColor}
                                    // value={color}
                                    // onChange={(event) => {
                                    //     setColor(event.currentTarget.value);
                                    // }}
                                >
                                    <option value={0}>- Seleccione -</option>
                                    <option value={1}>Mixto</option>
                                    <option value={2}>Prácticas</option>
                                    <option value={3}>Teoricas</option>
                                    
                                    
                                </select>

                            </div>

                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Observación
                                </label>
                                <textarea
                                    rows={1}
                                    className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1">
                                </textarea>
                            </div>

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
                            onClick={onRegistrarHorario}
                        >
                            <i className="bi bi-floppy-fill mr-1"></i> Guardar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                            onClick={props.handleCloseModalHorarioDetProceso}
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

export default HorarioDetProceso