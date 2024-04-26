import UnidadTematicaRegistro from "@/model/interfaces/planActividades/unidadRegistro";
import { Tooltip } from 'react-tooltip';

interface ImagenUnidad {
    imagenActividad: UnidadTematicaRegistro
    openGaleria: () => void
    changeUnidad: (newUnidad: number) => void
}

export const ImagenUnidad: React.FC<ImagenUnidad> = ({ imagenActividad: act, openGaleria, changeUnidad }) => {

    const handleMostraImagenes = () => {
        changeUnidad(act.registroUnidadId)
        openGaleria()
    }

    return (
        <div className="flex rounded-md" data-tooltip-id={`icono-toltip-${act.registroUnidadId}`}
            role="button" onClick={handleMostraImagenes}>

            <div className="w-full aspect-square flex" >
                <img
                    src={act.imagenUrl}
                    alt="Actividades de las prácticas"
                    className={`m-auto hover:scale-110 rounded-md border shadow-lg ${act.orientacion === 'V' ? 'max-h-full aspect-[3/4]' : 'max-w-full aspect-[4/3]'}`}
                />
            </div>

            <Tooltip id={`icono-toltip-${act.registroUnidadId}`} opacity={1} variant="light"
                className='flex border-2 border-upla-100 shadow rounded-md bg-gray-100 ' arrowColor='gray'
            >
                <div className='flex flex-col max-w-40 w-80 gap-1 py-1'>
                    <span className='font-bold uppercase text-upla-100 text-sm'>
                        <i className="bi bi-calendar3 mr-2" />
                        {act.fechaUnidadImagen}
                    </span>
                    <span className='text-xs'>{act.descripcionRegistro}</span>
                </div>
            </Tooltip>
        </div>
    )
}