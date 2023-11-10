import EstadoPracticas from "../../../component/pages/status/EstadoPracticas";
import { RouteComponentProps, useHistory } from 'react-router-dom';

const Revision = (props: RouteComponentProps) => {
    const history = useHistory();

    const datos: Record<string, string> = {
        docente: 'JARA RODRIGUEZ, EUTIMIO CATALINO',
        curso: '113286 - PRÁCTICA PRE PROFESIONAL I',
        facultad: 'CIENCIAS ADMINISTRATIVAS Y CONTABLES',
        escuela: 'ADMINISTRACIÓN Y SISTEMAS',
        nivel_seccion: '08 - A1',
        plan: '2015',
    };

    var loading = false;

    const listaEstudiantes = [
        {
            id: 1,
            codigo: "P00212D",
            nombres: "ALVARO QUIROZ, FLOR DIANA",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },
        {
            id: 2,
            codigo: "P00271E",
            nombres: "AQUINO HIDALGO, NANCY PAMELA",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 2
        },
        {
            id: 3,
            codigo: "N02860F",
            nombres: "ARCA SALAZAR, SAMUEL LUIS",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 3
        },
        {
            id: 4,
            codigo: "H07367E",
            nombres: "ASTO MUCHA, FRANS BECKER",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 4
        },
        {
            id: 5,
            codigo: "N00680C",
            nombres: "BUSTAMANTE SOLANO, DIANA",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },
        {
            id: 6,
            codigo: "K07177G",
            nombres: "CALDERON ARELLANO, ASHLY GABRIELA",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },
        {
            id: 7,
            codigo: "F00386G",
            nombres: "CAMPOS HIJAR, JESUS ROLANDO",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 2
        },
        {
            id: 8,
            codigo: "P00282F",
            nombres: "CANO BASTIDAS, HAROLD WILLIAM",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },
        {
            id: 9,
            codigo: "P00242E",
            nombres: "CHARI PARADO, SIOMARA JHADIRA",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 3
        },
        {
            id: 10,
            codigo: "N03838E",
            nombres: "CONDOR JAVIER, NAYELI YELITZA",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 4
        },
        {
            id: 11,
            codigo: "Q00623B",
            nombres: "CORNELIO MARTINEZ, ROSY",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },
        {
            id: 12,
            codigo: "P00261D",
            nombres: "ESPIRITU CASTRO, YURIAN MARIO",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 2
        },
        {
            id: 13,
            codigo: "N00812K",
            nombres: "GAMARRA AVILA, LETICIA KATERIN",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 3
        },
        {
            id: 14,
            codigo: "Q00636F",
            nombres: "GASPAR MONAGO, YANDER YANZU",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 4
        },
        {
            id: 15,
            codigo: "M00898A",
            nombres: "JAVIER MENDOZA, JANETH",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },
        {
            id: 16,
            codigo: "M00899B",
            nombres: "JIMENEZ CUICAPUSA, CORAIMA PATRICIA",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 2
        },
        {
            id: 17,
            codigo: "N00020K",
            nombres: "LOPEZ GARCIA, ALDER FABRICIO",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 3
        },
        {
            id: 18,
            codigo: "M05079G",
            nombres: "MEDINA AQUINO, JOSIAS ENRIQUE",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 4
        },
        {
            id: 19,
            codigo: "P00227J",
            nombres: "QUISPE ALVAREZ, HUGO YAN CARLOS",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 2
        },
        {
            id: 20,
            codigo: "N00771G",
            nombres: "SULCA MACHUCA, MARIA NICOLE",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },
        {
            id: 21,
            codigo: "N00772H",
            nombres: "SULLCARAY ZEVALLOS, YESETH ANAVEL",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },
        {
            id: 22,
            codigo: "N00410H",
            nombres: "TORRES CASO, FRANKLIN YEFERSON",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 2
        },
        {
            id: 23,
            codigo: "J03533C",
            nombres: "TRISTAN BARZOLA, ANA MELBA",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 4
        },
        {
            id: 24,
            codigo: "N01927C",
            nombres: "VALENZUELA QUISPE, MIRLA ESTEFANY",
            facultad: "Facultad de Ciencias",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 3
        },
        {
            id: 25,
            codigo: "G05130J",
            nombres: "VILLON URDAY, MARTIN JESUS",
            facultad: "Ciencias Administrativas y Contables",
            escuela_profesional: "Administración y Sistemas",
            usuario_condicion: 1
        },

    ];

    const onEventDetalle = (
        codigo: string,
        nombres: string,
        facultad: string,
        escuela_profesional: string,
        usuario_condicion: number,
        nivel_seccion: string,
        plan: string
    ) => {
        history.push(`${props.match.path}/estudiante-detalle`, {
            codigo: codigo,
            nombres: nombres,
            facultad: facultad,
            escuela_profesional: escuela_profesional,
            usuario_condicion: usuario_condicion,
            curso: nivel_seccion,
            plan: plan,
        });
    };

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full p-4 bg-white border rounded-md">
                        {datos && Object.keys(datos).map((key, index) => (
                            <div key={index} className="mb-2">
                                <label className="block text-gray-700 text-lg font-bold mb-2">
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:
                                </label>
                                <p className="text-gray-700 text-xl">{datos[key]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mt-4">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border overflow-x-auto">
                        <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                            <thead className="align-bottom">
                                <tr>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Código</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Estudiante</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Facultad</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Escuela Profesional</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Notas</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Condición</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    loading ? (
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={8} className="text-sm p-2 border-b border-solid">
                                                <div className="flex items-center justify-center">
                                                    {/*
                                                        <LoaderSvg /> <span>Cargando datos...</span>
                                    */}
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        listaEstudiantes.length == 0 ?
                                            (
                                                <tr className="text-center bg-white border-b">
                                                    <td colSpan={6} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                                </tr>
                                            )
                                            :
                                            (
                                                listaEstudiantes.map((item, index) => {

                                                    return (
                                                        <tr key={index} className="bg-white border-b">
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                {item.id}
                                                            </td>
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                {item.codigo}
                                                            </td>
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                {item.nombres}
                                                            </td>

                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                {item.facultad}
                                                            </td>
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                {item.escuela_profesional}
                                                            </td>
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                <button
                                                                    title="Ver historial"
                                                                    className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2"
                                                                    onClick={() =>
                                                                        onEventDetalle(item.codigo, item.nombres, item.facultad, item.escuela_profesional, item.usuario_condicion, datos.nivel_seccion, datos.plan)
                                                                    }
                                                                >
                                                                    <i className="bi bi-list-ul text-sm"></i>

                                                                </button>

                                                            </td>
                                                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                <EstadoPracticas estado={item.usuario_condicion} />
                                                            </td>

                                                        </tr>
                                                    );
                                                })
                                            )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Revision;