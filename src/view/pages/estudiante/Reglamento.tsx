import ComponenteReglamento from "@/component/pages/reglamento/ComponeteReglamento";

interface Articulo {
    id: number;
    text: string;
    tipo_lista?: string; //dot, numerico, alfabetico
    lista?: ListaElement[];
}

interface ListaElement {
    elemento: string;
}

interface ContentData {
    title?: string;
    articulos: Articulo[];
}

interface PropsReglamento {
    encabezado: string;
    urlImg: string;
    urlDoc: string;
    titulo: string;
    texto: string;
    contenido: Contenido[];
}

interface Contenido {
    nombre: string;
    tipo: string; //numerico , // (PRIMERO, SEGUNDO, etc)
    content: ContentData[];
}

const Reglamento = () => {

    const reglamentos: PropsReglamento[] = [
        {
            encabezado: 'HUANCAYO-PERÚ 2019',
            urlImg: '/Reglamentos/ImagenReglamento.png',
            urlDoc: '/Reglamentos/Reglamento-General-de-PPP.pdf',
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
                                    text: 'Las practicas pre profesionales tienen por objetivo consolidar en el estudiante las competencias profesionales, es decir el dominio para el desempeño de la profesión.'
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
                                    text: 'Las Practicas Pre Profesionales son actividades curriculares obligatorias e individuales que el estudiante realiza en una organización privada o pública, en áreas afines al ejercicio profesional del Programa de Estudios a la que pertenece.'
                                },
                                {
                                    id: 4,
                                    text: 'Las Practicas Pre Profesionales son un proceso que permite a los estudiantes reafirmar e integrar la teoría a la practica en el proceso de formación profesional.'
                                },
                            ]
                        },
                        {
                            title: 'BASES LEGALES',
                            articulos: [
                                {
                                    id: 5,
                                    text: 'El Reglamento de General de Practicas Pre Profesionales se rige por:',
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
                                    text: 'Las Practicas Pre Profesionales por su naturaleza son de carácter práctico y de obligatoriedad para todos los estudiantes de los diferentes Programas de Estudio de cada Facultad, sin exoneración alguna y fundamentado en el Plan de Estudios 2015.'
                                },
                                {
                                    id: 7,
                                    text: 'La evaluación de las Prácticas Pre Profesionales se rige por las Normas Específicas de cada Facultad.'
                                },
                                {
                                    id: 8,
                                    text: 'Las Facultades tienen la obligación de brindar las facilidades necesarias que posibiliten el logro de los objetivos trazados para que los estudiantes efectúen las Practicas Pre Profesionales.'
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
                                    id: 17,
                                    text: 'La Coordinación de Practicas Pre Profesionales es un organismo de Asesoría y Ejecución, encargada de planificar, organizar, coordinar, dirigir, supervisar, asesorar, controlar y evaluar las actividades.'
                                },
                                {
                                    id: 18,
                                    text: 'El Coordinador de Practicas Pre Profesionales, será propuesto por el Decano de la Facultad ante el Consejo de Facultad, que aprueba y posteriormente es ratificado por Consejo Universitario.'
                                },
                                {
                                    id: 19,
                                    text: 'Son Funciones del Coordinador de Practicas Pre Profesionales:',
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
                        {
                            title: 'DE LA ORGANIZACIÓN Y ADMINISTRACIÓN',
                            articulos: [
                                {
                                    id: 17,
                                    text: 'La Coordinación de Practicas Pre Profesionales es un organismo de Asesoría y Ejecución, encargada de planificar, organizar, coordinar, dirigir, supervisar, asesorar, controlar y evaluar las actividades.'
                                },
                                {
                                    id: 18,
                                    text: 'El Coordinador de Practicas Pre Profesionales, será propuesto por el Decano de la Facultad ante el Consejo de Facultad, que aprueba y posteriormente es ratificado por Consejo Universitario.'
                                },
                                {
                                    id: 19,
                                    text: 'Son Funciones del Coordinador de Practicas Pre Profesionales:',
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
                                    text: 'Para efectos de la realización de las Practicas Pre Profesionales, el estudiante debe estar en la condición de INVICTO.'
                                },
                                {
                                    id: 21,
                                    text: 'La pertinencia y duración de las Practicas Pre Profesionales estarán establecidos en los planes de estudios de cada Programa de acuerdo a sus especialidades.'
                                },
                                {
                                    id: 22,
                                    text: 'No existen matriculas extemporáneas ni en vías de regularización, estas serán normadas según el Calendario Académico.'
                                },
                                {
                                    id: 23,
                                    text: 'Para el proceso de elaboración de las Actas de Practicas Pre profesionales, se deberá de contar con el informe de conformidad emitido por el Coordinador de Practicas Pre Profesionales de la Facultad a la Coordinación de Asuntos Académicos, en un plazo máximo de 15 días hábiles de haber concluido con sus Prácticas Pre Profesionales; caso contrario se invalidar la matrícula y el proceso académico administrativo.'
                                }
                            ]
                        },
                        {
                            title: 'DE LA EVALUACIÓN',
                            articulos: [
                                {
                                    id: 24,
                                    text: 'La pertinencia y duración de las Practicas Pre Profesionales estarán establecidos en los planes de estudios de cada Programa de acuerdo a sus especialidades.'
                                },
                                {
                                    id: 25,
                                    text: 'No existen matriculas extemporáneas ni en vías de regularización, estas serán normadas según el Calendario Académico.'
                                },
                                {
                                    id: 26,
                                    text: 'El docente tutor o el que hace las veces de esta, rellenar la ficha de evaluación diseñada y aprobada por el Consejo de Facultad. En caso que la instituci6n donde realiza las Practicas Pre-profesionales tenga una modalidad de evaluación establecida por la misma, la Facultad validara con los criterios normados.'
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
                                    id: 27,
                                    text: 'Las fichas de evaluación serán firmadas por el jefe del área donde realizo sus prácticas y por el docente tutor.'
                                },
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
                                    text: 'El Coordinador de Practicas Pre Profesionales identificar las Ernpresas o Instituciones Públicas o Privadas que facilitan las Practicas Pre Profesionales de acuerdo a la pertinencia de cada Programa de estudios para la adjudicación de plazas.'
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

    return (

        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0 ">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 sm:p-10 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div className="flex-auto mb-3">
                        <h1 className='font-bold text-2xl text-gray-400'>MARCO LEGAL</h1>
                        <p className="leading-normal text-sm sm:text-lg dark:text-white dark:opacity-60">Las prácticas preprofesionales se encuentran respaldadas por un marco legal que busca regular y promover la formación práctica de los estudiantes en el ámbito laboral. La normativa peruana reconoce la importancia de estas prácticas como un componente esencial en la preparación de futuros profesionales.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-1">

                        {
                            //reglamentos.map()
                            reglamentos.map((reglamento, index) => (
                                <div key={index} className={`pb-6 ${index !== reglamentos.length - 1 ? 'border-b-4' : ''}`}>
                                    <ComponenteReglamento {...reglamento} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reglamento;