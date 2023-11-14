import { FaBuilding, FaUser, FaIdCard, FaGraduationCap, FaUserTie, FaArrowLeft, FaArrowRight, FaCheck, FaCalendarAlt, FaClock, FaEnvelope, FaMobile } from 'react-icons/fa';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//Paso 1
interface DatosEmpresa {
    ruc: string;
    nombre: string;
    direccion: string;
}

interface DatosRepresentante {
    dni: string;
    nombre: string;
    grado: string;
    cargo: string;
}

interface Paso1Props {
    datosEmpresa: DatosEmpresa;
    datosRepresentante: DatosRepresentante;
}

const Paso1: React.FC<Paso1Props> = ({ datosEmpresa, datosRepresentante }) => {

    return (
        <div className="bg-white rounded mt-4 md:flex md:justify-between md:items-start">
            <div className="mb-4 md:w-1/2 md:pr-4">
                <h2 className="text-2xl font-bold mb-2">Empresa</h2>
                <div className="mb-2">
                    <div className="flex items-center">
                        <FaBuilding className="mr-2" />
                        <p className="text-gray-700">RUC: {datosEmpresa.ruc}</p>
                    </div>
                    <div className="flex items-center">
                        <FaBuilding className="mr-2" />
                        <p className="text-gray-700">Nombre: {datosEmpresa.nombre}</p>
                    </div>
                    <div className="flex items-center">
                        <FaBuilding className="mr-2" />
                        <p className="text-gray-700">Dirección: {datosEmpresa.direccion}</p>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 md:pl-4">
                <h2 className="text-2xl font-bold mb-2">Representante</h2>
                <div className="mb-2">
                    <div className="flex items-center">
                        <FaIdCard className="mr-2" />
                        <p className="text-gray-700">DNI: {datosRepresentante.dni}</p>
                    </div>
                    <div className="flex items-center">
                        <FaUser className="mr-2" />
                        <p className="text-gray-700">Nombre: {datosRepresentante.nombre}</p>
                    </div>
                    <div className="flex items-center">
                        <FaGraduationCap className="mr-2" />
                        <p className="text-gray-700">Grado de Instrucción: {datosRepresentante.grado}</p>
                    </div>
                    <div className="flex items-center">
                        <FaUserTie className="mr-2" />
                        <p className="text-gray-700">Cargo: {datosRepresentante.cargo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Paso 2: Vista del PDF con un botón de Validar Carta de aceptacion
interface Paso2Props {
    pdfUrl: string;
    validarPdf: () => void;
}

const Paso2: React.FC<Paso2Props> = ({ pdfUrl, validarPdf }) => {

    if(pdfUrl){
        console.log(pdfUrl)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-2xl font-bold mb-4">Carta de Aceptación</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Requisito 1</li>
                    <li>Requisito 2</li>
                    <li>Requisito 3</li>
                    {/* ... Agrega más requisitos según sea necesario ... */}
                </ul>
                <button
                    onClick={validarPdf}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center"
                >
                    <FaCheck className="mr-2" />
                    <span>Validar</span>
                </button>
            </div>
            <div className="bg-white shadow-md rounded p-4">
                <iframe title="PDF Viewer" src={'/Ejemplos/Carta_aceptacion.pdf'} width="100%" height="500" frameBorder={0} />
            </div>
        </div>
    );
};

// Paso 3: Datos del área de trabajo y jefe inmediato
interface Paso3Props {
    datosArea: {
        areaEspecifica: string;
        direccion: string;
        diasPracticas: string;
        horario: string;
        inicioPracticas: string;
        finPracticas: string;
    };
    datosJefe: {
        dni: string;
        nombre: string;
        grado: string;
        cargo: string;
        correo: string;
        celular: string;
    };
}

const Paso3: React.FC<Paso3Props> = ({ datosArea, datosJefe }) => {
    return (
        <div className="bg-white shadow-md rounded p-4 flex flex-col md:flex-row md:space-x-4 justify-between">
            <div>
                <h2 className="text-2xl font-bold mb-4">Área de Trabajo</h2>
                <div className="mb-2">
                    <div className="flex items-center mb-2">
                        <FaBuilding className="mr-2" />
                        <p>Área específica: {datosArea.areaEspecifica}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaBuilding className="mr-2" />
                        <p>Dirección: {datosArea.direccion}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <p>Días de prácticas: {datosArea.diasPracticas}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaClock className="mr-2" />
                        <p>Horario: {datosArea.horario}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <p>Inicio de prácticas: {datosArea.inicioPracticas}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <p>Finalización de prácticas: {datosArea.finPracticas}</p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Jefe Inmediato</h2>
                <div className="mb-2">
                    <div className="flex items-center mb-2">
                        <FaIdCard className="mr-2" />
                        <p>DNI: {datosJefe.dni}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaUser className="mr-2" />
                        <p>Nombre: {datosJefe.nombre}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaBuilding className="mr-2" />
                        <p>Grado de Instrucción: {datosJefe.grado}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaUser className="mr-2" />
                        <p>Cargo: {datosJefe.cargo}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaEnvelope className="mr-2" />
                        <p>Correo electrónico: {datosJefe.correo}</p>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaMobile className="mr-2" />
                        <p>Celular: {datosJefe.celular}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Paso 4: Vista del PDF del plan de actividades con un botón de Validar
interface Paso4Props {
    pdfUrl: string;
    validarPdf: () => void;
}

const Paso4: React.FC<Paso4Props> = ({ pdfUrl, validarPdf }) => {

    if(pdfUrl){
        console.log(pdfUrl)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-2xl font-bold mb-4">Plan de actividades</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Requisito 1</li>
                    <li>Requisito 2</li>
                    <li>Requisito 3</li>
                    {/* ... Agrega más requisitos según sea necesario ... */}
                </ul>
                <button
                    onClick={validarPdf}
                    className="bg-indigo-500 hover.bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center"
                >
                    <FaCheck className="mr-2" />
                    <span>Validar</span>
                </button>
            </div>
            <div className="bg-white shadow-md rounded p-4">
                <iframe title="PDF Viewer" src={'/Ejemplos/Plan-actividades.pdf'} width="100%" height="500" frameBorder={0} />
            </div>
        </div>
    );
};

// Paso 5: Vistas para PDFs de ficha de control con botones de Validar
interface Paso5Props {
    pdfUrls: string[];
    validarPdf: (index: number) => void;
}

const Paso5: React.FC<Paso5Props> = ({ pdfUrls, validarPdf }) => {
    const [activePdfIndex, setActivePdfIndex] = useState<number | null>(null);

    const handleValidate = (index: number) => {
        setActivePdfIndex(index);
    };

    if (!Array.isArray(pdfUrls) || pdfUrls.length === 0) {
        return <div>No PDFs to display</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {pdfUrls.map((url, index) => (
                <div key={index} className="bg-white shadow-md rounded p-4">
                    <h2 className="text-2xl font-bold mb-4">Ficha de control {index + 1}</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>Requisito 1</li>
                        <li>Requisito 2</li>
                        <li>Requisito 3</li>
                        <li>{url}</li>
                        {/* ... Agrega más requisitos según sea necesario ... */}
                    </ul>
                    <button
                        onClick={() => handleValidate(index)}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center"
                    >
                        Mostrar
                    </button>
                    {activePdfIndex === index && (
                        <div className="mt-4">
                            <button
                                //onClick={() => handleValidate(null)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center"
                            >
                                Ocultar
                            </button>
                            <iframe title={`PDF Viewer ${index + 1}`} src={'/Ejemplos/Ficha-control.pdf'} width="100%" height={500} frameBorder={0} />
                            <button
                                onClick={() => {
                                    if (activePdfIndex !== null) {
                                        validarPdf(activePdfIndex);
                                    }
                                }}
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center mt-4"
                            >
                                Validar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Paso 6: Formulario con respuestas entregadas
/*interface Paso6Props {
    respuestas: string[];
}*/

const Paso6 = (/*{ respuestas }*/) => {
    return (
        <div>
            <p>Respuestas:</p>
            {/*respuestas.map((respuesta, index) => (
                <p key={index}>{respuesta}</p>
            ))*/}
        </div>
    );
};

// Paso 7: Vistas de PDF con títulos de informe final y constancia de prácticas con botones de Validar
interface PdfInfo {
    nombre: string;
    url: string;
}

interface Paso7Props {
    pdfUrls: PdfInfo[];
    validarPdf: (index: number) => void; // Agrega el tipo de la función si es necesario
}

const Paso7: React.FC<Paso7Props> = ({ pdfUrls, }) => {
    const [activePdfIndex, setActivePdfIndex] = useState<number | null>(null);

    const handleValidate = (index: number) => {
        setActivePdfIndex(index);
        
    };

    if (!Array.isArray(pdfUrls) || pdfUrls.length === 0) {
        return <div>No PDFs to display</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {pdfUrls.map((pdf, index) => (
                <div key={index} className="bg-white shadow-md rounded p-4">
                    <h2 className="text-2xl font-bold mb-4"> {pdf.nombre}</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>Requisito 1</li>
                        <li>Requisito 2</li>
                        <li>Requisito 3</li>
                        {/* ... Agrega más requisitos según sea necesario ... */}
                    </ul>
                    <button
                        onClick={() => handleValidate(index)}
                        className="bg-indigo-500 hover.bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center"
                    >
                        Mostrar
                    </button>
                    {activePdfIndex === index && (
                        <div className="mt-4">
                            <button
                                //onClick={() => handleValidate(null)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center"
                            >
                                Ocultar
                            </button>
                            <iframe title={`PDF Viewer ${index + 1}`} src={pdf.url} width="100%" height="500" frameBorder="0" />
                            <button
                                onClick={() => {
                                    // Agrega la lógica de validación aquí
                                }}
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center mt-4"
                            >
                                Validar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Paso 8: Interfaz para asignar notas
interface Notas {
    P1: string;
    P2: string;
    P3: string;
    P4: string;
    TI: string;
    Py: string;
    EP: string;
}

interface Paso8Props {
    notas: Notas;
    onNotaChange: (key: keyof Notas, value: string) => void;
}

const Paso8: React.FC<Paso8Props> = ({ notas, onNotaChange }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Notas</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <i className="bi bi-file-text-fill text-gray-600 text-xl mr-4"></i>
                    <p className="text-xl">P1:</p>
                </div>
                <input
                    type="text"
                    value={notas.P1}
                    onChange={(e) => onNotaChange('P1', e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                />
                <div className="flex items-center">
                    <i className="bi bi-file-text-fill text-gray-600 text-xl mr-4"></i>
                    <p className="text-xl">P2:</p>
                </div>
                <input
                    type="text"
                    value={notas.P2}
                    onChange={(e) => onNotaChange('P2', e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                />
                <div className="flex items-center">
                    <i className="bi bi-file-text-fill text-gray-600 text-xl mr-4"></i>
                    <p className="text-xl">P3:</p>
                </div>
                <input
                    type="text"
                    value={notas.P3}
                    onChange={(e) => onNotaChange('P3', e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                />
                <div className="flex items-center">
                    <i className="bi bi-file-text-fill text-gray-600 text-xl mr-4"></i>
                    <p className="text-xl">P4:</p>
                </div>
                <input
                    type="text"
                    value={notas.P4}
                    onChange={(e) => onNotaChange('P4', e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                />
                <div className="flex items-center">
                    <i className="bi bi-file-text-fill text-gray-600 text-xl mr-4"></i>
                    <p className="text-xl">TI:</p>
                </div>
                <input
                    type="text"
                    value={notas.TI}
                    onChange={(e) => onNotaChange('TI', e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                />
                <div className="flex items-center">
                    <i className="bi bi-file-text-fill text-gray-600 text-xl mr-4"></i>
                    <p className="text-xl">Py:</p>
                </div>
                <input
                    type="text"
                    value={notas.Py}
                    onChange={(e) => onNotaChange('Py', e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                />
                <div className="flex items-center">
                    <i className="bi bi-file-text-fill text-gray-600 text-xl mr-4"></i>
                    <p className="text-xl">EP:</p>
                </div>
                <input
                    type="text"
                    value={notas.EP}
                    onChange={(e) => onNotaChange('EP', e.target.value)}
                    className="border border-gray-300 rounded-lg p-2"
                />
            </div>
        </div>
    );
};

///// interfaces
interface DatosEmpresa {
    ruc: string;
    nombre: string;
    direccion: string;
}

interface DatosRepresentante {
    dni: string;
    nombre: string;
    grado: string;
    cargo: string;
}

interface DatosArea {
    areaEspecifica: string;
    direccion: string;
    diasPracticas: string;
    horario: string;
    inicioPracticas: string;
    finPracticas: string;
}

interface DatosJefe {
    dni: string;
    nombre: string;
    grado: string;
    cargo: string;
    correo: string;
    celular: string;
}

interface Notas {
    P1: string;
    P2: string;
    P3: string;
    P4: string;
    TI: string;
    Py: string;
    EP: string;
}

const Especifico = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    const datos = {
        codigo: location.state.codigo,
        estudiante: location.state.nombres,
        facultad: location.state.facultad,
        escuela: location.state.escuela_profesional,
        curso: location.state.curso,
        plan: location.state.plan,
    };

    const [pasoActual, setPasoActual] = useState<number>(1);
    const [datosEmpresa, ] = useState<DatosEmpresa>({
        ruc: '123456789',
        nombre: 'Empresa ABC',
        direccion: 'Dirección de la empresa',
    });
    const [datosRepresentante, ] = useState<DatosRepresentante>({
        dni: '12345678',
        nombre: 'Representante XYZ',
        grado: 'Grado ABC',
        cargo: 'Cargo XYZ',
    });

    const [datosArea, ] = useState<DatosArea>({
        areaEspecifica: 'Área específica',
        direccion: 'Dirección del área',
        diasPracticas: 'Días de prácticas',
        horario: 'Horario de prácticas',
        inicioPracticas: 'Inicio de prácticas',
        finPracticas: 'Fin de prácticas',
    });

    const [datosJefe, ] = useState<DatosJefe>({
        dni: '12345678',
        nombre: 'Nombre del jefe',
        grado: 'Grado del jefe',
        cargo: 'Cargo del jefe',
        correo: 'Correo del jefe',
        celular: 'Celular del jefe',
    });

    const [pdfUrl, ] = useState('https://www.example.com/sample.pdf');

    const pdfUrls: string[] = [
        'Informe Final',
        'Constancia de prácticas',
        // Agrega más nombres de PDF según sea necesario
    ];

    const pdfUrls2: { nombre: string; url: string }[] = [
        {
            nombre: 'Informe Final',
            url: '/Ejemplos/Informe-final.pdf',
        },
        {
            nombre: 'Constancia de prácticas',
            url: '/Ejemplos/Constancia-practicas.pdf',
        },
        // Agrega más objetos con nombre y URL de PDF según sea necesario
    ];

    const [notas, setNotas] = useState<Notas>({
        P1: '',
        P2: '',
        P3: '',
        P4: '',
        TI: '',
        Py: '',
        EP: '',
    });

    const irAlSiguientePaso = () => {
        setPasoActual(pasoActual + 1);
    };

    const irAlPasoAnterior = () => {
        setPasoActual(pasoActual - 1);
    };

    const onNotaChange = (campo: string, valor: string) => {
        setNotas({ ...notas, [campo]: valor });
    };

    const validarPdf = () => {
        // Lógica de validación para el PDF
        // Implementa la lógica de validación según tus requisitos
        console.log('PDF validado');
    };

    let componenteActual: React.ReactNode;

    switch (pasoActual) {
        case 1:
            componenteActual = <Paso1 datosEmpresa={datosEmpresa} datosRepresentante={datosRepresentante} />;
            break;
        case 2:
            componenteActual = <Paso2 pdfUrl={pdfUrl} validarPdf={validarPdf} />;
            break;
        case 3:
            componenteActual = <Paso3 datosArea={datosArea} datosJefe={datosJefe} />;
            break;
        case 4:
            componenteActual = <Paso4 pdfUrl={pdfUrl} validarPdf={validarPdf} />;
            break;
        case 5:
            componenteActual = <Paso5 pdfUrls={pdfUrls} validarPdf={validarPdf} />;
            break;
        case 6:
            componenteActual = <Paso6 //respuestas={respuestas} 
            />;
            break;
        case 7:
            componenteActual = <Paso7 pdfUrls={pdfUrls2} validarPdf={validarPdf} />;
            break;
        case 8:
            componenteActual = <Paso8 notas={notas} onNotaChange={onNotaChange} />;
            break;
        default:
            componenteActual = <div>Paso no válido</div>;
    }

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                        <div className="p-4 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6">
                                <span onClick={() => navigate(-1)} title="Atrás" role="button">
                                    <i className="bi bi-arrow-left-circle-fill text-blue-500" />
                                </span>
                                Detalle estudiante
                            </h2>

                            <div className="w-full">

                                <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                    <div className="border-b-2 border-gray-200 p-2">
                                        <div className="text-lg font-bold text-blue-500">
                                            {datos.estudiante} - {datos.codigo}
                                        </div>
                                    </div>
                                    <div className="m-4 text-lg">

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                            <p className="font-bold">Facultad: <span className="font-normal text-blue-500">{datos.facultad}</span></p>
                                            <p className="font-bold ">Escuela Profesional: <span className="font-normal text-blue-500">{datos.escuela}</span></p>
                                            <p className="font-bold">Nivel-sección: <span className="font-normal text-blue-500">{datos.curso}</span></p>
                                            <p className="font-bold ">Plan: <span className="font-normal text-blue-500">{datos.plan}</span></p>
                                        </div>

                                    </div>
                                </div>

                                <div className="w-full rounded-lg border-2 border-gray-300 mt-4 border-t-4">
                                    <div className="border-b-2 border-gray-200 p-2">
                                        <div className="container mx-auto p-4">
                                            <div className="flex gap-3 justify-center">
                                                {pasoActual > 1 && (
                                                    <button onClick={irAlPasoAnterior} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center">
                                                        <FaArrowLeft className="mr-1" />
                                                        Paso Anterior
                                                    </button>
                                                )}
                                                {pasoActual < 8 && (
                                                    <button onClick={irAlSiguientePaso} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center">
                                                        Siguiente Paso
                                                        <FaArrowRight className="ml-1" />
                                                    </button>
                                                )}
                                            </div>
                                            {componenteActual}


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Especifico;