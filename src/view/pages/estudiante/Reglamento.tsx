import ContainerVIstas from "@/component/Container";
import ComponenteReglamento from "@/component/pages/reglamento/ComponeteReglamento";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import Listas from "@/model/interfaces/Listas.model.interface";
import { BuscarCoincidenciasReglamento } from "@/network/rest/reglamento.network";
import { useEffect, useRef, useState } from "react";

interface Articulo {
    id: number
    text: string
    tipo_lista?: string //dot, numerico, alfabetico
    lista?: ListaElement[]
}

interface ListaElement {
    elemento: string
}

interface ContentData {
    title?: string
    articulos: Articulo[]
}

interface PropsReglamento {
    encabezado: string
    urlImg: string
    urlDoc: string
    titulo: string
    texto: string
    contenido: Contenido[]
}

interface Contenido {
    nombre: string
    tipo: string //numerico , // (PRIMERO, SEGUNDO, etc)
    content: ContentData[]
}

const Reglamento = () => {

    const reglamentos: PropsReglamento[] = [
        {
            encabezado: 'HUANCAYO-PERÚ 2019',
            urlImg: '/reglamentos/ImagenReglamento.png',
            urlDoc: '/reglamentos/Reglamento-General-de-PPP.pdf',
            titulo: 'REGLAMENTO GENERAL DE PRÁCTICAS PREPROFESIONALES',
            texto: 'APROBADO MEDIANTE RESOLUCIÓN Nº 1786-2019-CU-VRAC',
            contenido: [
                {
                    nombre: 'DE LOS FINES, OBJETIVOS',
                    tipo: 'numerico',
                    content: [
                        {

                            articulos: [
                                {
                                    id: 1,
                                    text: 'El presente Reglamento General tiene por objetivo normar el desarrollo de las actividades de Practicas Pre Profesionales de los estudiantes de la Universidad Peruana Los Andes'
                                },
                                {
                                    id: 2,
                                    text: 'Las prácticas pre profesionales tienen por objetivo consolidar en el estudiante las competencias profesionales, es decir el dominio para el desempeño de la profesión.'
                                }
                            ]
                        },
                    ]
                },
                {
                    nombre: 'DE LA ORGANIZACIÓN ACADÉMICA',
                    tipo: 'numerico',
                    content: [
                        {
                            title: 'DE LA ORGANIZACIÓN',
                            articulos: [
                                {
                                    id: 3,
                                    text: 'Las Prácticas Pre Profesionales son actividades curriculares obligatorias e individuales que el estudiante realiza en una organización privada o pública, en áreas afines al ejercicio profesional del Programa de Estudios a la que pertenece.'
                                },
                                {
                                    id: 4,
                                    text: 'Las Prácticas Pre Profesionales son un proceso que permite a los estudiantes reafirmar e integrar la teoría a la practica en el proceso de formación profesional.'
                                },
                            ]
                        },
                        {
                            title: 'BASES LEGALES',
                            articulos: [
                                {
                                    id: 5,
                                    text: 'El Reglamento de General de Prácticas Pre Profesionales se rige por:',
                                    tipo_lista: 'dot',
                                    lista: [
                                        {
                                            elemento: 'Constitución Política del Perú',
                                        },
                                        {
                                            elemento: 'Ley General de Educación N° 28044',
                                        },
                                        {
                                            elemento: 'Ley Universitaria N° 30220',
                                        },
                                        {
                                            elemento: 'Ley sobre Modalidades Formativas Laborales N° 28512 y su Reglamento y Anexo',
                                        },
                                        {
                                            elemento: 'Normatividad concordante de Practicas de los diferentes Programas de Estudios',
                                        },
                                        {
                                            elemento: 'Estatuto de la Universidad Peruana Los Andes',
                                        },
                                        {
                                            elemento: 'Reglamento Académico de la Universidad Peruana Los Andes',
                                        },
                                        {
                                            elemento: 'Reglamento de Organización y Funciones de la Universidad Peruana Los Andes',
                                        },

                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    nombre: 'DE LA NATURALEZA Y PROCEDIMIENTOS',
                    tipo: 'numerico',
                    content: [
                        {
                            title: 'DISPOSICIONES GENERALES',
                            articulos: [
                                {
                                    id: 6,
                                    text: 'Las Prácticas Pre Profesionales por su naturaleza son de carácter práctico y de obligatoriedad para todos los estudiantes de los diferentes Programas de Estudio de cada Facultad, sin exoneración alguna y fundamentado en el Plan de Estudios 2015.'
                                },
                                {
                                    id: 7,
                                    text: 'La evaluación de las Prácticas Pre Profesionales se rige por las Normas Específicas de cada Facultad.'
                                },
                                {
                                    id: 8,
                                    text: 'Las Facultades tienen la obligación de brindar las facilidades necesarias que posibiliten el logro de los objetivos trazados para que los estudiantes efectúen las Prácticas Pre Profesionales.'
                                },
                                {
                                    id: 9,
                                    text: 'Los estudiantes de los diferentes Programas de Estudio realizarán el pago respectivo por dicho concepto según tasas establecidas.'
                                },
                                {
                                    id: 10,
                                    text: 'Las Prácticas Pre Profesionales pueden realizarse en diversas instituciones públicas o privadas.'
                                }
                            ]
                        },
                    ]
                },
                {
                    nombre: 'DE LOS PROCEDIMIENTOS DE LAS PRÁCTICAS PRE',
                    tipo: 'numerico',
                    content: [
                        {
                            title: "DE LOS PROCEDIMIENTOS",
                            articulos: [
                                {
                                    id: 11,
                                    text: 'Las Prácticas Pre Profesionales se sujetan a los procedimientos considerados en el Reglamento Específico de cada Facultad según la naturaleza de cada uno de ellas.'
                                },
                                {
                                    id: 12,
                                    text: 'El desarrollo de las Prácticas Pre Profesionales, son secuenciales y no paralelas; para matricularse en la práctica siguiente, previamente deben aprobar la que antecede, a excepción de los Programas de Estudios que realizan una sola práctica.'
                                },
                                {
                                    id: 13,
                                    text: 'El Centro de Prácticas, el Tutor asignado o Docente Monitor tienen la obligación de informar sobre las prácticas realizadas por el estudiante a través de las fichas de evaluación, cuyo formato es proporcionado por la Coordinación de Prácticas Pre Profesionales de cada Facultad',
                                },
                                {
                                    id: 14,
                                    text: 'El estudiante que realiza las Prácticas Pre Profesionales, al finalizar, esta obligado a presentar un informe escrito a la Coordinación de Prácticas Pre Profesionales de su Facultad, dentro del término máximo de quince días hábiles bajo responsabilidad para la revisión y aprobación del mismo; de ser observado el informe, la Coordinación hará de conocimiento a los practicantes, para que en un plazo de 8 días puedan subsanar las observaciones, pasado este término el informe se considerara por no presentado. La no presentación de los informes se considera causal de abandono de las Prácticas Pre Profesionales.',
                                },
                                {
                                    id: 15,
                                    text: 'El sistema de calificación de las Prácticas Pre Profesionales será vigesimal de 0 a 20.',
                                },
                                {
                                    id: 16,
                                    text: 'El practicante no podrá abandonar ni renunciar a sus prácticas una vez iniciadas, salvo causa justificada puesta en conocimiento de la Coordinación de Prácticas Pre Profesionales oportunamente y por escrito.',
                                }
                            ]
                        },
                        {
                            title: 'DE LA ORGANIZACIÓN Y ADMINISTRACIÓN',
                            articulos: [
                                {
                                    id: 17,
                                    text: 'La Coordinación de Prácticas Pre Profesionales es un organismo de Asesoría y Ejecución, encargada de planificar, organizar, coordinar, dirigir, supervisar, asesorar, controlar y evaluar las actividades.'
                                },
                                {
                                    id: 18,
                                    text: 'El Coordinador de Prácticas Pre Profesionales, será propuesto por el Decano de la Facultad ante el Consejo de Facultad, que aprueba y posteriormente es ratificado por Consejo Universitario.'
                                },
                                {
                                    id: 19,
                                    text: 'Son Funciones del Coordinador de Prácticas Pre Profesionales:',
                                    tipo_lista: 'alfabetico',
                                    lista: [
                                        {
                                            elemento: 'Dirigir, organizar y gestionar las Prácticas Pre Profesionales de los estudiantes de los diferentes Programas de Estudios de la Facultad.',
                                        },
                                        {
                                            elemento: 'Formular el Plan de Trabajo Semestral o Anual de Prácticas Pre Profesionales.',
                                        },
                                        {
                                            elemento: 'Solicitar a la Coordinación de Asuntos Académicos el cuadro de orden de mérito para la asignación de las plazas correspondientes.',
                                        },
                                        {
                                            elemento: 'Elaborar la Carta de Presentación de los Estudiantes, para la realización de sus Prácticas Pre Profesionales.',
                                        },
                                        {
                                            elemento: 'Verificar los informes emitidos por los Coordinadores, tutores y estudiantes.',
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    nombre: 'DEL RÉGIMEN ACADÉMICO',
                    tipo: 'numerico',
                    content: [
                        {
                            title: 'PRÁCTICAS PRE PROFESIONALES',
                            articulos: [
                                {
                                    id: 20,
                                    text: 'Para efectos de la realización de las Prácticas Pre Profesionales, el estudiante debe estar en la condición de INVICTO.'
                                },
                                {
                                    id: 21,
                                    text: 'La pertinencia y duración de las Prácticas Pre Profesionales estarán establecidos en los planes de estudios de cada Programa de acuerdo a sus especialidades.'
                                },
                                {
                                    id: 22,
                                    text: 'No existen matriculas extemporáneas ni en vías de regularización, estas serán normadas según el Calendario Académico.'
                                },
                                {
                                    id: 23,
                                    text: 'Para el proceso de elaboración de las Actas de Prácticas Pre profesionales, se deberá de contar con el informe de conformidad emitido por el Coordinador de Prácticas Pre Profesionales de la Facultad a la Coordinación de Asuntos Académicos, en un plazo máximo de 15 días hábiles de haber concluido con sus Prácticas Pre Profesionales; caso contrario se invalidar la matrícula y el proceso académico administrativo.'
                                }
                            ]
                        },
                        {
                            title: 'DE LA EVALUACIÓN',
                            articulos: [
                                {
                                    id: 24,
                                    text: 'La pertinencia y duración de las Prácticas Pre Profesionales estarán establecidos en los planes de estudios de cada Programa de acuerdo a sus especialidades.'
                                },
                                {
                                    id: 25,
                                    text: 'No existen matriculas extemporáneas ni en vías de regularización, estas serán normadas según el Calendario Académico.'
                                },
                                {
                                    id: 26,
                                    text: 'El docente tutor o el que hace las veces de esta, rellenar la ficha de evaluación diseñada y aprobada por el Consejo de Facultad. En caso que la instituci6n donde realiza las Prácticas Pre-profesionales tenga una modalidad de evaluación establecida por la misma, la Facultad validara con los criterios normados.'
                                },
                                {
                                    id: 27,
                                    text: 'Las fichas de evaluación serán firmadas por el jefe del área donde realizo sus prácticas y por el docente tutor.'
                                }
                            ]
                        },
                        {
                            title: 'DEL ÓRDEN DE MÉRITO',
                            articulos: [
                                {
                                    id: 28,
                                    text: 'Es el resultado de un proceso académico, por el cual permite establecer en forma regular la adjudicación de plazas para los estudiantes de los diferentes Programas de Estudio de todas las Facultades.'
                                },
                                {
                                    id: 29,
                                    text: 'El orden de mérito se determina por el promedio ponderado acumulado de acuerdo al Reglamento Académico.'
                                },
                                {
                                    id: 30,
                                    text: 'El Coordinador de Prácticas Pre Profesionales identificará las Empresas o Instituciones Públicas o Privadas que facilitan las Practicas Pre Profesionales de acuerdo a la pertinencia de cada Programa de estudios para la adjudicación de plazas.'
                                }
                            ]
                        },
                    ]
                },
                {
                    nombre: 'DE LAS DISPOSICIONES COMPLEMENTARIAS',
                    tipo: 'literal',
                    content: [
                        {
                            articulos: [
                                {
                                    id: 31,
                                    text: 'Las Prácticas Pre Profesionales, en sus diferentes etapas se desarrolla de acuerdo al cronograma establecido por cada Facultad según la estructura curricular correspondiente.'
                                },
                                {
                                    id: 32,
                                    text: 'Cada Facultad deberá elaborar su Reglamento Específico de acuerdo a la naturaleza del Programa de Estudios en un plazo de 30 días hábiles a partir de la publicación del Reglamento General de Practicas Pre Profesionales.'
                                },
                            ]
                        },
                    ]
                },
                {
                    nombre: 'DE LAS DISPOSICIONES FINALES',
                    tipo: 'literal',
                    content: [
                        {
                            articulos: [
                                {
                                    id: 33,
                                    text: 'Los casos no contemplados en el presente Reglamento se resolverán en los Consejos de Facultad previo informe de la Coordinación de Practicas Pre Profesionales en coordinación con Los responsables de cada Programa de Estudios.'
                                },
                                {
                                    id: 34,
                                    text: 'La vigencia del presente Reglamento será a partir de su aprobación por Consejo de Universitario mediante resolución.'
                                },
                            ]
                        },
                    ]
                },
            ]
        },

    ]


    /////
    const [busquedaEncontrada, setBusquedaEncontrada] = useState<any[]>([])
    //const [filtro, setFiltro] = useState<string>("")

    const abortController = useRef(new AbortController())

    const BuscarFiltrado = async () => {
        const params = {
            busqueda: "fines"
        }
        setBusquedaEncontrada([])
        const response = await BuscarCoincidenciasReglamento<Listas>(params, abortController.current)
        // console.log(response)
        if (response instanceof Response) {
            const data = response.data.resultado as any[]
            setBusquedaEncontrada(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        BuscarFiltrado()
    }, [])

    console.log(busquedaEncontrada)

    return (

        <ContainerVIstas titulo='MARCO LEGAL' retornar>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    {/*<p className="leading-normal text-sm sm:text-lg dark:text-white dark:opacity-60 text-justify">Las prácticas preprofesionales se encuentran respaldadas por un <mark className="bg-green-200">marco leg</mark><span>al</span> que busca regular y promover la formación práctica de los estudiantes en el ámbito laboral. La normativa peruana reconoce la importancia de estas prácticas como un componente esencial en la  preparación de futuros profesionales.</p>*/}
                    <p className="leading-normal text-sm sm:text-base dark:text-white dark:opacity-60 text-justify">Las prácticas preprofesionales se encuentran respaldadas por un marco legal que busca regular y promover la formación práctica de los estudiantes en el ámbito laboral. La normativa peruana reconoce la importancia de estas prácticas como un componente esencial en la  preparación de futuros profesionales.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                    {
                        reglamentos.map((reglamento, index) => (
                            <div key={index}
                                className={`pb-6 ${index !== reglamentos.length - 1 ? 'border-b-4' : ''}`}>
                                <ComponenteReglamento {...reglamento} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </ContainerVIstas>

    )
}

export default Reglamento;