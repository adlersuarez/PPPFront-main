import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model.enum";
import RespValue from "@/model/interfaces/RespValue.model.interface";
import { ValidarAsistenciaEstudianteFecha } from "@/network/rest/idiomas.network";
import { useEffect, useRef, useState } from "react";

type Props = {
    codigo: string
    fecha: string
};

const AsistenciaCelda = (props: Props) => {

    const abortController = useRef(new AbortController());
    const [validacionAsistencia, setValidacionAsistencia] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const validarAsistenciaAlumno = async () => {
        try {
            const response = await ValidarAsistenciaEstudianteFecha<RespValue>(props.codigo, props.fecha, abortController.current);

            if (response instanceof Response) {
                const mensaje = response.data.value;
                setValidacionAsistencia(mensaje);
            }

            if (response instanceof RestError) {
                if (response.getType() === Types.CANCELED) return;
                console.log(response.getMessage());
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validarAsistenciaAlumno()
        // Limpiar el controlador de aborto al desmontar el componente
        return () => abortController.current.abort();
    }, []);

    return (
        <td className="border p-2 text-center">
            {isLoading ? (
                <div className="bg-gray-300 w-5 h-5 rounded-sm text-white font-semibold m-auto">
                    -
                </div>
            ) : validacionAsistencia !== null ? (
                validacionAsistencia === '1' ? (
                    <div className="bg-green-400 w-5 h-5 rounded-sm text-white font-semibold m-auto">
                        P
                    </div>
                ) : (
                    <div className="bg-red-400 w-5 h-5 rounded-sm text-white font-semibold m-auto">
                        F
                    </div>
                )
            ) : (
                <div className="bg-yellow-300 w-5 h-5 rounded-sm text-white font-semibold m-auto">
                    -
                </div>
            )}
        </td>
    );
};

export default AsistenciaCelda;