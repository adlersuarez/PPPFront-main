import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import Horario from "@/component/pages/horario/Horario"
import ModalMatricula from '../estudiante/matricula/modal/Matricula.modal';
import ModalCrearHorario from './modal/CrearHorarioModal';
import ModalModificarHorario from "./modal/ModificarHorarioModal";

const AgregarHorario = (props: RouteComponentProps<{}>) => {

    const [data, SetData] = useState<object[]>([]);
    const [color, SetColor] = useState<object[]>([]);

    // const [show, setShow] = useState<boolean>(false);
    const [showCrearAsignatura, setShowCrearAsignatura] = useState<boolean>(false);
    const [showModficarAsignatura, setShowModficarAsignatura] = useState<boolean>(false);

    // const handleClose = () => setShow(false);
    const handleCloseCrearAsignatura = () => setShowCrearAsignatura(false);
    const handleCloseModficarAsignatura = () => setShowModficarAsignatura(false);
    // const handleShow = () => setShow(true);
    const handleShowCrearAsignatura = () => setShowCrearAsignatura(true);
    const handleShowModficarAsignatura = () => setShowModficarAsignatura(true);

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
            <Horario data={data} color={color} handleShow={handleShowModficarAsignatura} />
            {/* <ModalMatricula show={show} hide={handleClose} /> */}
            <ModalCrearHorario show={showCrearAsignatura} hide={handleCloseCrearAsignatura} />
            <ModalModificarHorario show={showModficarAsignatura} hide={handleCloseModficarAsignatura}/>
        </>
    )
}
export default AgregarHorario