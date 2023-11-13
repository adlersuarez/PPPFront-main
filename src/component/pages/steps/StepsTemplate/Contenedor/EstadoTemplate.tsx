import EstadoProceso from "./EstadoProceso";
import EstadoTiempo from "./EstadoTiempo";

type DatosEstado = {
    estado: number;
    fecha: {
        presentacion: string;
    };
};

const EstadoTemplate : React.FC<{ datos: DatosEstado }> = ({ datos }) => {

    return (
        <div className="flex justify-between">
            <span className='font font-bold text-gray-500'>ESTADO</span>
            <div className='flex gap-2'>
                <EstadoProceso
                    estado={datos.estado}
                />
                <EstadoTiempo
                    fecha={datos.fecha.presentacion}
                />
            </div>
        </div>
    );
};

export default EstadoTemplate;