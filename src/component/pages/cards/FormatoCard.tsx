type Props = {
    nombre: string,
    archivo: string,
    resumen: string
}

const FormatoCard = (props: Props) => {

    const downloadFile = async (url: string, nombre: string): Promise<void> => {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = nombre;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="sm:max-w-sm bg-gray-100 dark:bg-gray-950 rounded-md p-4 shadow flex flex-col gap-4 h-full justify-between">
            <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-500 uppercase">
                    {props.nombre}
                </h2>
                <p className=" text-gray-600 text-sm">
                    {props.resumen}
                </p>
            </div>

            <button
                onClick={() => downloadFile(`/Formatos/${props.archivo}`, props.archivo)}
                className="bg-gray-500 hover:bg-blue-700 text-white font-bold p-2 pr-4 rounded transition-all duration-300 flex justify-between gap-4"
            >
                <i className="bi bi-file-word-fill text-white text-2xl my-auto" />
                <span className="my-auto text-sm">
                Descargar {props.nombre}
                </span>
                
            </button>
        </div>
    );

}

export default FormatoCard;