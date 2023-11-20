import Volver from "@/component/Volver";
import ComponenteContacto from "@/component/pages/contacto/ComponenteContacto";

const Contacto = () => {

    /* FIJO */
    const coordinatorData = {
        titulo: "Coordinador",
        codigo: "",
        nombre: "Juan Perez",
        oficina: "Oficina de Prácticas Preprofesionales",
        telefono: "904182526",
        correo: "coordinador@upla.edu.pe",
        direccion: "123 Calle Principal, Ciudad X",
    };

    /* FIJO */
    const soporteData = {
        titulo: "Soporte",
        codigo: "",
        nombre: "Jose Rodriguez",
        oficina: "Oficina de Informática",
        telefono: "96632100",
        correo: "soporte@upla.edu.pe",
        direccion: "123 Calle Principal, Ciudad X",
    };

    /* DEPENDE DEL ID DE ESTUDIANTE, ID CURSO */
    const docenteData = {
        titulo: "Docente",
        codigo: "",
        nombre: "Edison Ponce",
        oficina: "Facultad de Ingeniería",
        telefono: "984456852",
        correo: "docente@upla.edu.pe",
    };

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border gap-4">

                    <div className="flex flex-col gap-2">
                        <div className='font-bold text-2xl text-gray-400 flex gap-2'>
                            <Volver />
                            CONTACTOS
                        </div>
                        <p className="leading-normal text-sm dark:text-white dark:opacity-60"></p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-2">

                        <ComponenteContacto
                            {...docenteData}
                        />

                        <ComponenteContacto
                            {...coordinatorData}
                        />

                        <ComponenteContacto
                            {...soporteData}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacto;