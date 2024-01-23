import CustomModal from "@/component/Modal.component"
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useSweerAlert from "@/component/hooks/useSweetAlert"
import { InsertarCalendarioPeriodo } from "@/network/rest/idiomas.network";
import RespValue from "@/model/interfaces/RespValue.model.interface";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Response from "@/model/class/response.model.class";

type FechasCalendario = {
    f_cal_ini: string
    f_cal_fin: string
    f_mat_ini: string
    f_mat_fin: string
    f_asigHora_ini: string
    f_asigHora_fin: string
    f_clases_ini: string
    f_clases_fin: string
    f_nota_ini: string
}

type Props = {
    show: boolean
    idiomaId: number
    periodoId: number
    tipoEstudioId: number
    valuePeriodo: string
    nombreIdioma: string
    nombreTipoEstudio: string
    fechas: FechasCalendario | null
    hide: () => void
}

const EditarCalendario = (props: Props) => {

   /// console.log(props.idiomaId)

    const sweet = useSweerAlert();
    const codigo = JSON.parse(window.localStorage.getItem("codigo") || "");
    const abortController = useRef(new AbortController());

    const [procesoInicio, setProcesoInicio] = useState<string>('');
    const [procesoFin, setProcesoFin] = useState<string>('');
    const [matriculaInicio, setMatriculaInicio] = useState<string>('');
    const [matriculaFin, setMatriculaFin] = useState<string>('');
    const [asigHoraInicio, setAsigHoraInicio] = useState<string>('');
    const [asigHoraFin, setAsigHoraFin] = useState<string>('');
    const [clasesInicio, setClasesInicio] = useState<string>('');
    const [clasesFin, setClasesFin] = useState<string>('');
    const [notasInicio, setNotasInicio] = useState<string>('');
    //const [notasFin, setNotasFin] = useState<string | null>(null);

    const refProcesoInicio = useRef<HTMLInputElement>(null)
    const refProcesoFin = useRef<HTMLInputElement>(null)
    const refMatriculaInicio = useRef<HTMLInputElement>(null)
    const refMatriculaFin = useRef<HTMLInputElement>(null)
    const refAsigHoraInicio = useRef<HTMLInputElement>(null)
    const refAsigHoraFin = useRef<HTMLInputElement>(null)
    const refClasesInicio = useRef<HTMLInputElement>(null)
    const refClasesFin = useRef<HTMLInputElement>(null)
    const refNotasInicio = useRef<HTMLInputElement>(null)
    //const refNotasFin = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setProcesoInicio(props.fechas?.f_cal_ini.slice(0, -9) || '')
        setProcesoFin(props.fechas?.f_cal_fin.slice(0, -9) || '')
        setMatriculaInicio(props.fechas?.f_mat_ini.slice(0, -9) || '')
        setMatriculaFin(props.fechas?.f_mat_fin.slice(0, -9) || '')
        setAsigHoraInicio(props.fechas?.f_asigHora_ini.slice(0, -9) || '')
        setAsigHoraFin(props.fechas?.f_asigHora_fin.slice(0, -9) || '')
        setClasesInicio(props.fechas?.f_clases_ini.slice(0, -9) || '')
        setClasesFin(props.fechas?.f_clases_fin.slice(0, -9) || '')
        setNotasInicio(props.fechas?.f_nota_ini.slice(0, -9) || '')
    }, [props.fechas?.f_cal_ini]);

    const editarCalendario = async () => {

        if (procesoInicio == null) {
            toast.error("Tiene que llenar todos los campos")
            refProcesoInicio.current?.focus();
            return
        }

        if (procesoFin == null) {
            toast.error("Tiene que llenar todos los campos")
            refProcesoFin.current?.focus();
            return
        }

        if (matriculaInicio == null) {
            toast.error("Tiene que llenar todos los campos")
            refMatriculaInicio.current?.focus();
            return
        }

        if (matriculaFin == null) {
            toast.error("Tiene que llenar todos los campos")
            refMatriculaFin.current?.focus();
            return
        }

        if (asigHoraInicio == null) {
            toast.error("Tiene que llenar todos los campos")
            refAsigHoraInicio.current?.focus();
            return
        }

        if (asigHoraFin == null) {
            toast.error("Tiene que llenar todos los campos")
            refAsigHoraFin.current?.focus();
            return
        }

        if (clasesInicio == null) {
            toast.error("Tiene que llenar todos los campos")
            refClasesInicio.current?.focus();
            return
        }

        if (clasesFin == null) {
            toast.error("Tiene que llenar todos los campos")
            refClasesFin.current?.focus();
            return
        }

        if (notasInicio == null) {
            toast.error("Tiene que llenar todos los campos")
            refNotasInicio.current?.focus();
            return
        }

        /*if (notasFin == null) {
            toast.error("Tiene que llenar todos los campos")
            refNotasFin.current?.focus();
            return
        }*/
        const registro = {
            f_cal_ini: new Date(procesoInicio).toISOString(),
            f_cal_fin: new Date(procesoFin).toISOString(),
            f_mat_ini: new Date(matriculaInicio).toISOString(),
            f_mat_fin: new Date(matriculaFin).toISOString(),
            f_asigHora_ini: new Date(asigHoraInicio).toISOString(),
            f_asigHora_fin: new Date(asigHoraFin).toISOString(),
            f_clases_ini: new Date(clasesInicio).toISOString(),
            f_clases_fin: new Date(clasesFin).toISOString(),
            f_nota_ini: new Date(notasInicio).toISOString(),
            idiomaId: props.idiomaId,
            periodoId: props.periodoId,
            tipEstudioId: props.tipoEstudioId
        }

        //console.log(registro)
        /* sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
             if (value) {
 
                 sweet.openInformation("Mensaje", "Procesando información...")
 
                 const response = await InsertarCalendarioPeriodo<RespValue>(codigo, registro, abortController.current)
 
                 if (response instanceof Response) {
 
                     const mensaje = response.data.value as string
 
                     if (mensaje == 'procesado') {
 
                         sweet.openSuccess("Mensaje", "Registros insertados correctamente", () => {
                             props.hide()
                         });
 
                         //console.log('Se proceso')
                     } else {
                         sweet.openWarning("Mensaje", "Ocurrio un error al procesar la peticion", () => {
                             props.hide()
                         });
 
                         //console.log('No se proceso')
                     }
                 }
                 if (response instanceof RestError) {
                     if (response.getType() === Types.CANCELED) return;
                     //console.log(response.getMessage())
                     sweet.openWarning("Mensaje", response.getMessage(), () => {
                         props.hide()
                     });
                 }
 
             }
         })*/

    }


    return (
        <CustomModal
            isOpen={props.show}
            onOpen={() => {

            }}
            onHidden={() => {

            }}
            onClose={props.hide}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">
                    <h6 className="py-1 pl-4 font-bold text-lg">Registrar Calendario</h6>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}>
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>
                {/* <div className="w-full px-4 pb-2 pt-4">


                </div> */}
                <div className="w-full px-4 pb-2 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">

                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                            <div className="m-2">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                    <div className="text-sm">
                                        <p>Idioma: <span className="text-blue-700 font-bold">{props.nombreIdioma}</span></p>
                                        <p>Tipo de Estudio: <span className="text-blue-700 font-bold ">{props.nombreTipoEstudio}</span></p>
                                    </div>
                                    <div className="text-sm">
                                        <p>Periodo: <span className="text-blue-700 font-bold">{props.valuePeriodo}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <table className="w-full text-gray-700 uppercase bg-upla-100 table-auto mb-6" id="miTabla">
                        <thead>
                            <tr>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">DETALLE</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">INICIO</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">FIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b text-xs">
                                <td className="border border-gray-300 p-2 font-mont font-semibold text-center w-1/3">PROCESO</td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refProcesoInicio}
                                        value={procesoInicio}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setProcesoInicio(e.target.value)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refProcesoFin}
                                        value={procesoFin}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setProcesoFin(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="bg-white border-b text-xs">
                                <td className="border border-gray-300 p-2 font-mont font-semibold text-center w-1/3">MATRÍCULA</td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refMatriculaInicio}
                                        value={matriculaInicio}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setMatriculaInicio(e.target.value)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refMatriculaFin}
                                        value={matriculaFin}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setMatriculaFin(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="bg-white border-b text-xs">
                                <td className="border border-gray-300 p-2 font-mont font-semibold text-center w-1/3">ASIG HORARIO</td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refAsigHoraInicio}
                                        value={asigHoraInicio}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setAsigHoraInicio(e.target.value)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refAsigHoraFin}
                                        value={asigHoraFin}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setAsigHoraFin(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="bg-white border-b text-xs">
                                <td className="border border-gray-300 p-2 font-mont font-semibold text-center w-1/3">CLASES</td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refClasesInicio}
                                        value={clasesInicio}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setClasesInicio(e.target.value)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refClasesFin}
                                        value={clasesFin}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setClasesFin(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="bg-white border-b text-xs">
                                <td className="border border-gray-300 p-2 font-mont font-semibold text-center w-1/3">NOTAS</td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    <input
                                        type="date"
                                        ref={refNotasInicio}
                                        value={notasInicio}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setNotasInicio(e.target.value)}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 font-mont px-4 w-1/3">
                                    {/*<input
                                        type="date"
                                        ref={refNotasFin}
                                        value={notasFin}
                                        className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1 text-center mx-auto"
                                        onChange={(e) => setNotasFin(e.target.value)}
                                    />*/}
                                </td>

                            </tr>

                        </tbody>
                    </table>

                    <div className="relative flex flex-wrap justify-center">
                        <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                            onClick={editarCalendario}
                        >
                            <i className="bi bi-floppy mr-1"></i> Guardar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                            onClick={props.hide}
                        >
                            <i className="bi bi-x-circle mr-1"></i> Cerrar
                        </button>
                    </div>

                    <div className="relative flex flex-wrap justify-center mt-4">
                        <span className="text-xs">
                            Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
                        </span>
                    </div>

                </div>

            </div>

        </CustomModal>
    )
}
export default EditarCalendario