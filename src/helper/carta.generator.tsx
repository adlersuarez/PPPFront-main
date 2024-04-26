import CustomModal from '@/component/Modal.component';
import DatosCartaAceptacion from '@/model/interfaces/cartaPresentacion/datosCartaAceptacion';
import { jsPDF } from 'jspdf';

type CartaPresentacion = {
    show: boolean
    hide: () => void
    datos: DatosCartaAceptacion
}

export const PDFCartaPresentacion: React.FC<CartaPresentacion> = ({ show, hide, datos }) => {

    const handleDescargar = () => {
        const docWidthInPx = 8.27 * 96; // Convertir pulgadas a píxeles (1 pulgada = 96 píxeles en la web)
        const doc = new jsPDF("p", "px");
        const element = document.getElementById('pdf-content');

        // Verificar si el elemento existe antes de continuar
        if (element !== null) {
            // Establecer el ancho del contenedor al ancho del documento PDF
            element.style.width = `${docWidthInPx}px`;

            doc.html(element, {
                callback: function (pdf) {
                    // Guarda el PDF
                    pdf.save('carta_aceptacion.pdf');
                }
            });
        } else {
            console.error("Elemento 'pdf-content' no encontrado.");
        }
    }

    return (

        <CustomModal
            isOpen={show}
            onOpen={() => { }}
            onHidden={() => { }}
            onClose={hide}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl w-full sm:w-2/3 xl:w-1/2 mx-auto">
                <div className="flex justify-between p-2 pt-3 pl-4 p border-b-2 border-gray-100">
                    <div className="font-bold text-xl text-gray-400">EDITAR PALABRA CLAVE</div>
                    <div className="flex">
                        <button
                            className="flex my-auto w-8 h-8 bg-gray-100 hover:bg-red-400 hover:text-white rounded-full "
                            onClick={hide}>
                            <i className="bi bi-x-lg text m-auto" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-6 p-5 max-h-[90%] overflow-y-auto ">
                    <div id="pdf-content" className="flex flex-col bg-green-100 px-4">
                        <h1 className="text-center">Carta de Presentación</h1>
                        <div className="flex flex-col bg-red-50">
                            <p className='mx-auto text-xs'> {datos.nombreAnio}</p>
                            <p className='font-bold'>Ciudad y fecha: {datos.ciudadFecha}</p>
                            <p>Nombre del referente: {datos.nombreReferente}</p>
                            <p>Empresa del referente: {datos.empresaReferente}</p>
                            <p>Cargo del referente: {datos.cargoReferente}</p>
                            <p>Curso: {datos.curso}</p>
                            <p> {datos.nombreEstudiante}</p>
                            <p> {datos.nivelEstudiante}</p>
                            <p>Carrera: {datos.carrera}</p>
                            <p>Facultad: {datos.facultad}</p>
                            <p> {datos.nombreAdministrativo}</p>
                            <p>{datos.cargoAdministrativo}</p>
                            <img src={datos.urlFirma} alt="Firma del administrativo" />
                        </div>
                    </div>

                </div>

                <div className="flex flex-col sm:flex-row w-full justify-between gap-4 p-5 sm:border-t-2 sm:border-gray-100">
                    <div className="flex text-sm w-full sm:w-auto">
                        <span className="animate-pulse w-full flex gap-2 bg-red-200 text-red-800 my-auto p-1 px-2 rounded">
                            <i className="mt-0.5 bi bi-info-circle" /> Campos con asterisco (*) son obligatorios.
                        </span>
                    </div>
                    <div className="flex w-full sm:w-auto">
                        <button
                            onClick={handleDescargar}
                            className="flex w-full rounded-md bg-green-400 text-white text-base sm:text-sm hover:bg-green-600">
                            <span className="m-auto p-2 px-4"> Guardar</span>
                        </button>
                    </div>
                </div>
            </div>

        </CustomModal>
    );
};