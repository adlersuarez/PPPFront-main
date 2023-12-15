
import { useEffect, useRef, useState } from "react";
import ModalNotasEstudiante from "./modal/NotasEstudiante.modal";

type DataNotas = {
    idEstudiante: number
    codigo: string;
    estudiante: string;
    notaA: number,
    notaB: number,
    notaC: number,
    notaD: number,
    notaP1: number,
    notaEP: number,
    notaEF: number,
    notaPF: number,
}

const InicioDocente = () => {

    // tabla

    const dataTable = [
        {
            codigo: "Q004SA1",
            nombre: "Juan Bartolome Sancho",
            notaA: 0,
            notaB: 0,
            notaC: 0,
            notaD: 0,
            notaP1: 0,
            notaEP: 0,
            notaEF: 0,
            notaPF: 0,
        },
        {
            codigo: "Q004SA2",
            nombre: "Maria Rosa Torres",
            notaA: 0,
            notaB: 0,
            notaC: 0,
            notaD: 0,
            notaP1: 0,
            notaEP: 0,
            notaEF: 0,
            notaPF: 0,
        },
        {
            codigo: "Q004SA3",
            nombre: "Pedro Mendez Loayza",
            notaA: 0,
            notaB: 0,
            notaC: 0,
            notaD: 0,
            notaP1: 0,
            notaEP: 0,
            notaEF: 0,
            notaPF: 0,
        },
    ]

    const [dataEditableNotas, setDataEditableNotas] = useState<DataNotas[]>(
        [
            {
                idEstudiante: 1,
                codigo: "Q004SA1",
                estudiante: "Juan Bartolome Sancho",
                notaA: 0,
                notaB: 0,
                notaC: 0,
                notaD: 0,
                notaP1: 0,
                notaEP: 0,
                notaEF: 0,
                notaPF: 0,
            },
            {
                idEstudiante: 2,
                codigo: "Q004SA2",
                estudiante: "Maria Rosa Torres",
                notaA: 0,
                notaB: 0,
                notaC: 0,
                notaD: 0,
                notaP1: 0,
                notaEP: 0,
                notaEF: 0,
                notaPF: 0,
            },
            {
                idEstudiante: 3,
                codigo: "Q004SA3",
                estudiante: "Pedro Mendez Loayza",
                notaA: 0,
                notaB: 0,
                notaC: 0,
                notaD: 0,
                notaP1: 0,
                notaEP: 0,
                notaEF: 0,
                notaPF: 0,
            },
        ]
    )

    const [estudianteEncontrado, setEstudianteEncontrado] = useState<DataNotas>()

    // const buscarEstudiante = (id: number) =>{
    //     let aux: DataNotas | undefined = dataEditableNotas.find(item => item.idEstudiante === id)
    //     if(aux != undefined){
    //         setEstudianteEncontrado(aux)
    //     }
    // }

    // console.log(buscarEstudiante(1))

    // const calcularPromedio = (notaA: number, notaB: number, notaC: number, notaD: number) => {
    //     const suma = notaA + notaB + notaC + notaD;
    //     const promedio = suma / 4;
    //     setDataModel((prevData) => ({
    //         ...prevData,
    //         capacidad: 50,
    //         estado: 1,
    //     }));
    // }

    const [show, setShow] = useState<boolean>(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <ModalNotasEstudiante
                show={show}
                hide={handleClose}
            />
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div>
                            <h1 className="py-1 font-semibold text-2xl"><i className="bi bi-1-circle"></i> Ingles - Aula A1</h1>
                        </div>
                        {
                            <table className="w-full border-collapse border">
                                <thead className="bg-upla-100 text-white text-lg font-semibold text-center uppercase tracking-wider">
                                    <tr>
                                        <th
                                            className="px-6 py-3"
                                        >CODIGO</th>
                                        <th
                                            className="px-6 py-3"
                                        >NOMBRE</th>
                                        <th
                                            className="px-6 py-3"
                                        >ACCION</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        dataTable.map((item, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className="px-6 py-4 whitespace-nowrap text-lg text-gray-900 text-center font-medium"
                                                >
                                                    <td
                                                        className="px-6 py-4"
                                                    >{item.codigo}</td>
                                                    <td
                                                        className="px-6 py-4"
                                                    >{item.nombre}</td>
                                                    <td
                                                        className="px-6 py-4"
                                                    >
                                                        <div className="">
                                                            <button
                                                                className="my-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-semibold"
                                                                onClick={() => { handleShow(); }}
                                                            >
                                                                Notas
                                                            </button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default InicioDocente
