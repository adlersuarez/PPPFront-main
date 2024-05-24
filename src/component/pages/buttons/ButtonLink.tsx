import { obtenerNombreArchivo } from "@/helper/herramienta.helper";
import { NavLink } from "react-router-dom";

type Props = {
    to: string
    nombre: string
    icon?: string
    color?: string
    hover?: string
    download?: string
}

const ButtonLink = (props: Props) => {

    ///descargar
    const handleDownloadFile = () => {

        const fileName = obtenerNombreArchivo(props.download ?? '')
        const filePath = props.download ?? ''

        fetch(filePath)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                link.parentNode?.removeChild(link)
            })
            .catch(error => console.error('Error al descargar el archivo:', error))
    }

    if (props.download) {
        return (
            <button
                onClick={handleDownloadFile}
                className={`
            flex 
            items-center 
            w-full
            h-20 xl:h-24
            text-sm 
            text-white
            font-semibold 
            transition-all 
            duration-200
           ${props.color}
           hover:${props.hover}
            hover:bg-blue-700
            hover:scale-105
            rounded-lg
            uppercase 
            `}
            >
                <div className="mx-auto flex gap-2 w-full h-full py-4">
                    <div className="flex w-24 border-r">
                        <i className={`bi ${props.icon} text-3xl sm:text-4xl m-auto`} />
                    </div>

                    <p className="my-auto px-3 text-xl xl:text-2xl">{props.nombre}</p>
                </div>
            </button>

        )
    }

    return (

        <NavLink
            to={props.to}
            className={`
                flex 
                items-center 
                w-full
                h-20 xl:h-24
                text-sm 
                text-white
                font-semibold 
                transition-all 
                duration-200
               ${props.color}
               hover:${props.hover}
                hover:bg-blue-700
                hover:scale-105
                rounded-lg
                uppercase 
                `}
        >
            <div className="mx-auto flex gap-2 w-full h-full py-4">
                <div className="flex w-24 border-r">
                    <i className={`bi ${props.icon} text-3xl sm:text-4xl m-auto`} />
                </div>

                <p className="my-auto px-3 text-xl xl:text-2xl">{props.nombre}</p>
            </div>
        </NavLink>

    )

}

export default ButtonLink