import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
// import { RouteComponentProps } from "react-router-dom";
import Horario from "@/component/pages/horario/Horario"
import ModalCrearHorario from './modal/CrearHorarioModal';
import ModalModificarHorario from "./modal/ModificarHorarioModal";
import ModalBuscarDocente from "./modal/BuscarDocenteModal";
// import { RouteComponentProps } from "react-router-dom";
type Idioma = {
    id: number;
    lenguaje: string;
}
type Dia = {
    id: number;
    dia: string;
}
type Modalidad = {
    id: number;
    mod: string;
}
type HorarioInicio = {
    id: number;
    hora: string;
}
type HorarioFin = {
    id: number;
    hora: string;
}

type Instructor = {
    id: number;
    instructor: string;
}

type Data = {
    idioma: Idioma[];
    dia: Dia[];
    estado: boolean;
    modalidad: Modalidad[];
    instructores: Instructor[];
    horarioInicio: HorarioInicio[];
    horarioFin: HorarioFin[];
    observacion: string;
}

// type Props = {

// }

const AgregarHorario = () => {

    // if(props){}
    // const [dataHorario, SetDataHorario] = useState<object[]>([]);
    // const [color, SetColor] = useState<object[]>([]);
    
    var dataHorario: object[] = []
    var color: object[] = []

    const [showCrearAsignatura, setShowCrearAsignatura] = useState<boolean>(false);
    const [showModficarAsignatura, setShowModficarAsignatura] = useState<boolean>(false);
    const [showBuscarDocente, setShowBuscarDocente] = useState<boolean>(false);


    const handleCloseCrearAsignatura = () => setShowCrearAsignatura(false);
    const handleCloseModficarAsignatura = () => setShowModficarAsignatura(false);
    const handleCloseBuscarDocente = () => setShowBuscarDocente(false);

    const handleShowCrearAsignatura = () => setShowCrearAsignatura(true);
    const handleShowModficarAsignatura = () => setShowModficarAsignatura(true);
    const handleShowBuscarDocente = () => setShowBuscarDocente(true);

    const [dataForm, SetDataForm] = useState<Data>({
        idioma: [],
        dia: [],
        estado: false,
        modalidad: [],
        instructores: [],
        horarioInicio: [],
        horarioFin: [],
        observacion: '',
    })

    const fechaActual: Date = new Date();

    function diaActual() {
        switch (fechaActual.getDay()) {
            case 1:
                return [0, 1, 2, 3, 4, 5, 6]
            case 2:
                return [-1, 0, 1, 2, 3, 4, 5]
            case 3:
                return [-2, -1, 0, 1, 2, 3, 4]
            case 4:
                return [-3, -2, -1, 0, 1, 2, 3]
            case 5:
                return [-4, -3, -2, -1, 0, 1, 2]
            case 6:
                return [-5, -4, -3, -2, -1, 0, 1]
            case 0:
                return [-6, -5, -4, -3, -2, -1, 0]
            default:
                return []
        }
    }

    const diaSemana = diaActual()

    const Dats = [
        {
            text: 'HORARIO REGULAR 1',
            roomId: 3,
            startDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[0], 8, 0),
            endDate: new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + diaSemana[0], 9, 30),
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
    ]

    const CrearData = () => {
        let hora = {
            text: ''+localStorage.getItem('idioma')+localStorage.getItem('dia')+localStorage.getItem('modalidad')
        }
    }

    var idiomasSelect = [
        {
            id: 1,
            lenguaje: 'Ingles',
        },
        {
            id: 2,
            lenguaje: 'Italiano',
        },
        {
            id: 3,
            lenguaje: 'Portugues',
        },
        {
            id: 4,
            lenguaje: 'Japones',
        },
        {
            id: 5,
            lenguaje: 'Quechua',
        },
    ]

    var instructoresSelect = [
        {
            id: 1,
            instructor: 'Instructor 1',
        },
        {
            id: 2,
            instructor: 'Instructor 2',
        },
        {
            id: 3,
            instructor: 'Instructor 3',
        },
        {
            id: 4,
            instructor: 'Instructor 4',
        },
        {
            id: 5,
            instructor: 'Instructor 5',
        },
    ]

    var modalidadClaseSelect = [
        {
            id: 1,
            mod: 'presencial',
        },
        {
            id: 2,
            mod: 'virtual',
        },
    ]

    var diaSelect = [
        {
            id: 1,
            dia: 'Lunes',
        },
        {
            id: 2,
            dia: 'Martes',
        },
        {
            id: 3,
            dia: 'Miercoles',
        },
        {
            id: 4,
            dia: 'Jueves',
        },
        {
            id: 5,
            dia: 'Viernes',
        },
        {
            id: 6,
            dia: 'Sabado',
        },
        {
            id: 7,
            dia: 'Domingo',
        },
    ]

    var horarioInicioSelect = [
        {
            id: 1,
            hora: '8:00'
        },
        {
            id: 2,
            hora: '9:30'
        },
        {
            id: 3,
            hora: '11:00'
        },
        {
            id: 4,
            hora: '12:30'
        },
        {
            id: 5,
            hora: '14:00'
        },
    ]

    var horarioFinSelect = [
        {
            id: 1,
            hora: '8:00'
        },
        {
            id: 2,
            hora: '9:30'
        },
        {
            id: 3,
            hora: '11:00'
        },
        {
            id: 4,
            hora: '12:30'
        },
        {
            id: 5,
            hora: '14:00'
        },
    ]

    useEffect(() => {
        SetDataForm({
            idioma: idiomasSelect,
            dia: diaSelect,
            estado: false,
            modalidad: modalidadClaseSelect,
            instructores: instructoresSelect,
            horarioInicio: horarioInicioSelect,
            horarioFin: horarioFinSelect,
            observacion: '',
        });
    }, [])

    const handleGuardarNuevaHora = () => {

    }
    return (
        <>
            <div className='flex justify-between p-4'>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ring ring-green-300 focus:ring focus:ring-green-300 focus:outline-none"
                    onClick={handleShowCrearAsignatura}
                >
                    Añadir Asignatura
                </button>
                
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ring ring-red-300 focus:ring focus:ring-red-300 focus:outline-none">
                    <NavLink
                        to={'/inicio/horario-idiomas'}
                    >
                        Regresar
                    </NavLink>
                </button>
            </div>
            <Horario data={dataHorario} color={color} handleShow={handleShowModficarAsignatura} />
            <ModalCrearHorario show={showCrearAsignatura} hide={handleCloseCrearAsignatura} showModal={handleShowBuscarDocente} data={dataForm} handleGuardar={handleGuardarNuevaHora}/>
            <ModalModificarHorario show={showModficarAsignatura} hide={handleCloseModficarAsignatura} />
            <ModalBuscarDocente show={showBuscarDocente} hide={handleCloseBuscarDocente} showModal={handleShowCrearAsignatura} data={dataForm.instructores} />
        </>
    )
}
export default AgregarHorario