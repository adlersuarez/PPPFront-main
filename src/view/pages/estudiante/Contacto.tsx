import ContainerVIstas from "@/component/Container";
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
    }

    /* FIJO */
    const soporteData = {
        titulo: "Soporte",
        codigo: "",
        nombre: "John Suárez",
        oficina: "Oficina de Informática",
        telefono: "904198090",
        correo: "",
        direccion: "Av. Giráldez N° 230, Huancayo (5to piso)",
    }

    /* DEPENDE DEL ID DE ESTUDIANTE, ID CURSO */
    const docenteData = {
        titulo: "Docente",
        codigo: "",
        nombre: "Edison Ponce",
        oficina: "Facultad de Ingeniería",
        telefono: "984456852",
        correo: "docente@upla.edu.pe",
    }

    return (
        <ContainerVIstas titulo='CONTACTOS' retornar>
            <div className="grid grid-cols-1 gap-4 sm:gap-8 2xl:grid-cols-2">
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
        </ContainerVIstas>
    )
}

export default Contacto;