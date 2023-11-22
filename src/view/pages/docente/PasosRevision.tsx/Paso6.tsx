// Paso 6: Formulario con respuestas entregadas
/*interface Paso6Props {
    respuestas: string[];
}*/

const Paso6 = (/*{ respuestas }*/) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-6-square-fill`} />
                <h1 className="font-bold">EVALUACIÓN DE DESEMPEÑO</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 uppercase">
                <p>visitas</p>
                <p>evaluacion jefe inmediato</p>
            </div>
        </div>
    );
};

export default Paso6;