import { useState } from "react"

interface PropsContacto {
    titulo: string
    codigo: string
    nombre: string
    telefono: string
    correo: string
    direccion?: string
    oficina?: string
}

const ComponenteContacto: React.FC<PropsContacto> = ({ titulo, nombre, telefono, correo, direccion, oficina }) => {

    const [show, setShow] = useState<boolean>(true)

    const formatoNumero = telefono?.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');

    return (
        <div className="bg-white rounded-lg border max-w-3xl p-4 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-3/5 sm:mb-0 sm:pr-4">
                <div className="flex flex-col relative text-right justify-between h-full gap-3">

                    <div className="flex flex-col sm:gap-1 text-center sm:text-right">
                        <h2 className="text-2xl sm:text-xl text-gray-400 font-bold uppercase">
                            {titulo}
                        </h2>
                        <hr className="my-1" />
                        <p className="text-2xl sm:text-lg text-gray-500">
                            {nombre}
                        </p>
                        <p className="text-lg sm:text-base text-gray-500 italic">
                            {oficina}
                        </p>
                    </div>

                    <button
                        onClick={() => setShow(!show)}
                        className="bg-gray-400 text-white rounded-lg p-2 sm:w-10/12 mx-auto flex px-5 gap-4">
                        <p className="text-xs text-center uppercase font-semibold">
                            Aquí puedes encontrar sus datos de contacto
                        </p>
                        {
                            show ?
                                <i className="bi bi-arrow-up-square text-2xl sm:hidden m-auto" />
                                :
                                <i className="bi bi-arrow-down-square text-2xl sm:hidden m-auto" />
                        }

                    </button>
                </div>
            </div>
            {
                show &&
                <div className="w-full sm:w-2/5 bg-gray-100 p-4 rounded-lg shadow-inner flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-medium text-gray-400">
                            Detalles
                        </h2>
                        <hr />
                    </div>
                    <div className="flex flex-col gap-2 p-2 text-sm">
                        {
                            telefono &&
                            <div className="flex">
                                <div className="w-8 shrink-0">
                                    <i className="bi bi-telephone-fill text-gray-400" />
                                </div>
                                <p>{formatoNumero}</p>
                            </div>
                        }
                        {
                            correo &&
                            <div className="flex">
                                <div className="w-8 shrink-0">
                                    <i className="bi bi-envelope-fill text-gray-400" />
                                </div>
                                <p>{correo}</p>
                            </div>
                        }
                        {
                            direccion &&
                            <div className="flex">
                                <div className="w-8 shrink-0">
                                    <i className="bi bi-geo-alt-fill text-gray-400" />
                                </div>
                                <p>{direccion}</p>
                            </div>
                        }

                    </div>
                </div>
            }

        </div>
    )
}

export default ComponenteContacto;