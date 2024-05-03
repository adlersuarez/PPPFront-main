import { obtenerNombreArchivo, obtenerTipoArchivo } from "@/helper/herramienta.helper"

type Props = {
    tipo: string
    nombre: string
    resumen: string
    urlDownload: string
}

const FormatoCard: React.FC<Props> = ({ urlDownload, tipo, nombre, resumen }) => {

    const tipoDoc = obtenerTipoArchivo(urlDownload)

    const handleDownloadFile = () => {

        const fileName = obtenerNombreArchivo(urlDownload)
        const filePath = urlDownload
        console.log(filePath)

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

    return (
        <div className="sm:max-w-sm bg-gray-100 dark:bg-gray-950 rounded-md p-3 shadow flex flex-col gap-4 h-full justify-between">
            <div className="flex flex-col gap-2">
                <div className="text-xl border-b-2 border-upla-100 flex justify-between pb-1">
                    <div className="text-xl text-upla-100 font-bold uppercase">{tipo}</div>
                    <div className="my-auto text-xs bg-white p-0.5 px-2 rounded">Formato: <span className="font-medium"><i className="font-bold">{tipoDoc}</i> <i className={`bi ${tipoDoc === 'pdf' && 'bi-file-earmark-pdf-fill text-red-600'} ${tipoDoc === 'doc' && 'bi-file-earmark-word-fill text-blue-600'}`} /></span></div>
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-bold text-gray-500">
                        {nombre}
                    </h2>
                    <p className=" text-gray-600 text-sm">
                        {resumen}
                    </p>
                </div>

            </div>

            <button
                onClick={handleDownloadFile}
                className="bg-gray-500 hover:bg-upla-100 hover:scale-105 text-white font-bold p-2 pr-4 rounded transition-all duration-300 flex gap-4 justify-center"
            >
                <i className="bi bi-download" /> Descargar
            </button>
        </div>
    );

}

export default FormatoCard;