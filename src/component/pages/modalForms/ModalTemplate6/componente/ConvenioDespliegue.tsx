import VistaPreviaDocumentosFile from '@/component/VistaPreviaDocumentosFile';
import { handleCrearConvenioPracticas } from '@/helper/documento.helper';
import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import ConvenioPracticas from '@/model/interfaces/convenio/convenioPracticas';
import { ObtenerConvenioPracticas } from '@/network/rest/practicas.network';
import { RootState } from '@/store/configureStore.store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface HerramientaDoc {
    titulo: string
    tipoDoc: 'pdf' | 'docx'
}

const ConvenioDespliegue: React.FC<HerramientaDoc> = ({ titulo, tipoDoc }) => {

    //////////Vista previa Documentos
    const [showDoc, setShowDoc] = useState<boolean>(false)
    const handleShowDoc = () => setShowDoc(true)
    const handleCloseDoc = () => setShowDoc(false)

    ///descargar
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const [carga, setCarga] = useState<boolean>(false)


    const generarConvenio = async () => {
        setCarga(true)
        handleCrearConvenioPracticas(periodo)
        setCarga(false)
    }

    //
    const [tipoConvenio, setTipoConvenio] = useState<number>(0)
    const [urlShow, setUrlShow] = useState<string>("")

    const obtenerTipo = async () => {
        const responseDatos = await ObtenerConvenioPracticas<ConvenioPracticas>(periodo)

        if (responseDatos instanceof Response) {
            const data = responseDatos.data as ConvenioPracticas
            setTipoConvenio(data.tipoConvenio)
        }
        if (responseDatos instanceof RestError) {
            if (responseDatos.getType() === Types.CANCELED) return
            console.log(responseDatos.getMessage())
        }
    }

    useEffect(() => {
        obtenerTipo()
    }, [])

    useEffect(() => {
        if (tipoConvenio == 1) {
            setUrlShow("/formatos/fcac/Formato Convenio PPP no remuneradas.pdf")
        }
        if (tipoConvenio == 2) {
            setUrlShow("/formatos/fcac/Formato Convenio PPP remuneradas.pdf")
        }
    }, [tipoConvenio])


    return (
        <div className="flex flex-col border border-upla-100 bg-white rounded-md overflow-hidden">
            <VistaPreviaDocumentosFile
                show={showDoc}
                close={handleCloseDoc}
                files={[{
                    nombre: titulo,
                    url: urlShow,
                    download: urlShow
                }]}
            />

            <div className="flex justify-between p-2 bg-upla-100">
                <span className="text-sm text-white">{titulo}</span>
                <div className="my-auto text-xs bg-white p-0.5 px-2 rounded">Formato: <span className="font-medium"><i>{tipoDoc}</i> <i className={`bi ${tipoDoc === 'pdf' && 'bi-file-earmark-pdf-fill text-red-600'} ${tipoDoc === 'docx' && 'bi-file-earmark-word-fill text-blue-600'}`} /></span></div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full p-3 px-6">
                <button
                    onClick={handleShowDoc}
                    className="bg-gray-100 py-1 text-sm rounded border border-gray-400 hover:border-upla-100 hover:bg-upla-100 hover:text-white hover:scale-105 w-full">
                    <i className="bi bi-eye mr-2" /> Ver
                </button>
                <button disabled={carga}
                    onClick={() => generarConvenio()}
                    className="bg-gray-100 py-1 text-sm rounded border border-gray-400 hover:border-upla-100 hover:bg-upla-100 hover:text-white hover:scale-105 w-full">
                    <i className="bi bi-download mr-2" /> Descargar
                </button>
            </div>
        </div>
    )
}

export default ConvenioDespliegue