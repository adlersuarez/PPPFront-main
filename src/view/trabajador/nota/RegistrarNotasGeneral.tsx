import React, { useRef, useEffect, useState } from "react";
import RestError from "@/model/class/resterror.model.class";
import Response from "@/model/class/response.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Listas from "@/model/interfaces/Listas.model.interface";
import { ListarPreRegistroNotas } from "@/network/rest/idiomas.network";

import { isNumeric, keyNumberFloat } from "@/helper/herramienta.helper";


type Props = {
    handleCloseModuloDetalle: () => void;
    item: any
    idHorarioAsignatura: number
};



const RegistrarNotasGeneral = (props: Props) => {

    const abortController = useRef(new AbortController());

    //const sweet = useSweerAlert();
    const [matriculadosAsig, setMatriculadoAsig] = useState<any[]>([])

    useEffect(() => {
        EstudiantesMatriculados()
    }, [])

    const EstudiantesMatriculados = async () => {
        setMatriculadoAsig([])

        const response = await ListarPreRegistroNotas<Listas>(props.item.horarioAsigId, abortController.current)
        if (response instanceof Response) {

            const data = response.data.resultado as any[]

            let nuevoLista: any[] = [];

            for (let j = 0; j < data.length; j++) {

                const item = data[j];

                let objeto: any = {

                    detMatriculaId: item.detMatriculaId,
                    estMaterno: item.estMaterno,
                    estNombres: item.estNombres,
                    estPaterno: item.estPaterno,
                    estudianteId: item.estudianteId,
                    detalle: [] as any[]

                };
                let subObjeto = []

                subObjeto.push(
                    ...Array.from({ length: 6 }, (_, i) => ({
                        "detMatriculaId": item.detMatriculaId,
                        "tipCaliId": i + 1,
                        "nota": item[`nota${i + 1}`] || 0,
                        "condNota": item[`condNota${i + 1}`]
                    }))
                );

                objeto.detalle = subObjeto
                nuevoLista.push(objeto);

            }

            setMatriculadoAsig(nuevoLista)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const generarJsonNotas = () => {
        console.log(matriculadosAsig)
    }

    const handleInputDetalle = (event: React.ChangeEvent<HTMLInputElement>, detMatriculaId: string, tipCaliId: string, index: any) => {

        const inputValue = event.target.value;
        const idInput = document.getElementById(`${tipCaliId}-${index}-${detMatriculaId}`)

        if (inputValue.trim() == '') {
            
            // Si está vacío, se establece como inválido
            idInput?.classList.add('bg-red-300'); 
            
        } else {
            if (isNumeric(inputValue)) {
                if (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= 20) {
                    // Si es numérico y está dentro del rango, se establece como válido
                    idInput?.classList.remove('bg-red-300'); 
                } else {
                    idInput?.classList.add('bg-red-300'); 
                    // Si es numérico pero está fuera del rango, se establece como inválido
                }
            }
        }


        // actualizar objeto
        const newMatriculadosAsig = matriculadosAsig.map((item) => {
            return {
                ...item,
                detalle: item.detalle.map((matricula: any) => {
                    if (matricula.detMatriculaId === detMatriculaId && matricula.tipCaliId === tipCaliId) {
                        return { ...matricula, nota: inputValue };
                    } else {
                        return matricula;
                    }
                })
            };
        });
        setMatriculadoAsig(newMatriculadosAsig);
        //


    }

    const generarBody = () => {

        if (matriculadosAsig.length == 0) {
            return (
                <tr className="text-center bg-white border-b">
                    <td colSpan={9} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                </tr>
            );
        }


        return matriculadosAsig.map((item, index) => {

            return (
                <tr key={index} className="text-sm">
                    <td className="border p-2">{++index}</td>
                    <td className="border p-2">{item.estudianteId}</td>
                    <td className="border p-2">{`${item.estPaterno} ${item.estMaterno} ${item.estNombres}`}</td>
                    {
                        item.detalle.map((matricula: any, index: any) => (
                            <td className="border p-2" key={index}>
                                <div className="relative">
                                    <input
                                        id={`${matricula.tipCaliId}-${index}-${matricula.detMatriculaId}`}
                                        className={`font-mont border text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                                        type="text"
                                        maxLength={5}
                                        value={matricula.nota}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputDetalle(event, matricula.detMatriculaId, matricula.tipCaliId, index)}

                                        onPaste={handlePaste}
                                        onKeyDown={keyNumberFloat}
                                    />
                                    <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${matricula.condNota == 'no' ? 'text-gray-400' : 'text-green-400'} `}></i>

                                </div>
                            </td>
                        ))
                    }
                </tr>
            );
        });

        // return matriculadosAsig.map((obj, index) => {

        //     const dataFiltrado1 = obj.detalle.filter(
        //         (filter: any) => filter.tipCaliId === 1
        //     );

        //     const regNota1 = dataFiltrado1.map((item: any) => {

        //         setNota1(item.nota)

        //         return (
        //             <td className="border p-2">
        //                 <div className="relative">
        //                     <input
        //                         type="text"
        //                         maxLength={5}
        //                         className={`font-mont border {}"border-gray-300"  text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
        //                         // ref={refNota1}
        //                         value={nota1}
        //                         onChange={(e) => handleInputDetalle(e, obj.detMatriculaId, item.tipCaliId)}

        //                         onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberFloat(event)}
        //                     // onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleNextInput(event)}
        //                     />
        //                     <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${item.condNota == 'no' ? 'text-gray-400' : 'text-green-400'} `}></i>

        //                 </div>
        //             </td>
        //         );
        //     });

        //     //const cond = regNota1[0].condNota
        //     //setNota1(regNota1[0].nota)
        //     // const nota = regNota1[0].nota1

        //     return (
        //         <tr key={index} className="text-sm">
        //             <td className="border p-2">{++index}</td>
        //             <td className="border p-2">{obj.estudianteId}</td>
        //             <td className="border p-2">{`${obj.estPaterno} ${obj.estMaterno} ${obj.estNombres}`}</td>
        //             {regNota1}
        //         </tr>
        //     )
        // });
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault(); // Evitar la acción de pegado
    };

    return (
        <>
            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Regristro de Notas</h2>

                <div className="w-full">

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2 mt-3">
                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                            <div className="m-2">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                    <div className="text-sm">
                                        <p>Periodo: <span className="text-blue-700 font-bold">{props.item.sede}</span></p>
                                        <p>Periodo: <span className="text-blue-700 font-bold">{props.item.anio} - {props.item.mes}</span></p>
                                        <p>Modalidad: <span className="text-blue-700 font-bold ">{props.item.modalidad}</span></p>
                                        <p>Tipo Estudio: <span className="text-blue-700 font-bold ">{props.item.tipoEstudio}</span></p>
                                        <p>Turno: <span className="text-blue-700 font-bold">{props.item.turno}</span></p>
                                        <p>Capacidad: <span className="text-blue-700 font-bold">{props.item.capacidad}</span></p>
                                    </div>
                                    <div className="text-sm">
                                        <p>Aula: <span className="text-blue-700 font-bold">{props.item.aula}</span></p>
                                        <p>Sección: <span className="text-blue-700 font-bold">{props.item.seccion}</span></p>
                                        <p>Asignatura: <span className="text-blue-700 font-bold">{props.item.asignatura}</span></p>
                                        <p>Instructor: <span className="text-blue-700 font-bold">{props.item.docenteDni ? '' : props.item.docenteDni} / {props.item.docente ? '' : props.item.docente}</span></p>
                                        <p>Cantidad: <span className="text-blue-700 font-bold">{props.item.cantidad}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2 mt-3">
                        <div>
                            <label
                                className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                            >
                                Opciones
                            </label>
                            <div className="relative flex flex-wrap">
                                <button
                                    className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                    onClick={generarJsonNotas}
                                >
                                    <i className="bi bi-search mr-1"></i> BUSCAR
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-auto rounded-md my-3 overflow-y-auto">
                        <table className="w-full text-gray-700 uppercase border table-auto" id="tabla-reporte">
                            <thead className="bg-upla-100 text-white">
                                <tr>
                                    <th className="py-1 px-6">#</th>
                                    <th className="py-1 px-6">Codigo</th>
                                    <th className="py-1 px-6">Estudiante</th>
                                    <th className="py-1 px-6">N. Reading</th>
                                    <th className="py-1 px-6">N. Writing</th>
                                    <th className="py-1 px-6">N. Speaking</th>
                                    <th className="py-1 px-6">N. O-line practice</th>
                                    <th className="py-1 px-6">N. ME</th>
                                    <th className="py-1 px-6">N. FE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generarBody()}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )

}

export default RegistrarNotasGeneral