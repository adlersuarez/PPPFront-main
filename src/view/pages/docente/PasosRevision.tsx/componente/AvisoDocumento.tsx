import React from 'react';

interface DocumentStatusProps {
    seleccionado: boolean
    listaDocumentos: any[] // Ajusta el tipo según la estructura de tus documentos
}

export const EstadoDocumentoVista: React.FC<DocumentStatusProps> = (props) => {
    // Verificar si no hay documentos adjuntados
    if (props.seleccionado && props.listaDocumentos.length === 0) {
        return (
            <div className="bg-blue-50 rounded-lg py-0.5 px-2 border border-dashed border-upla-100 m-auto text-sm text-center">
                <i className="text-upla-100 bi bi-info-circle-fill mr-1" /> Documento aún no adjuntado
            </div>
        )
    }

    // Verificar los estados de los documentos
    const tieneDocumentoPendiente = props.listaDocumentos.some(doc => doc.estadoDoc === 1)
    const tieneDocumentoValidado = props.listaDocumentos.some(doc => doc.estadoDoc === 2)
    const tieneDocumentoEnviadoCorreccion = props.listaDocumentos.some(doc => doc.estadoDoc === 3 && !tieneDocumentoValidado)

    if (tieneDocumentoPendiente) {
        return (
            <div className="bg-gray-50 rounded-lg py-0.5 px-2 border border-dashed border-gray-500 m-auto text-sm text-center">
                <i className="animate-pulse text-gray-500 bi bi-exclamation-circle-fill mr-1" /> Documento pendiente de revisión
            </div>
        )
    }

    if (tieneDocumentoValidado) {
        return (
            <div className="bg-green-50 rounded-lg py-0.5 px-2 border border-dashed border-green-500 m-auto text-sm text-center">
                <i className="text-green-500 bi bi-check-circle-fill mr-1" /> Documento validado
            </div>
        )
    }

    if (tieneDocumentoEnviadoCorreccion) {
        return (
            <div className="bg-red-50 rounded-lg py-0.5 px-2 border border-dashed border-red-500 m-auto text-sm text-center">
                <i className="text-red-500 bi bi-x-circle-fill mr-1" /> Documento observado
            </div>
        )
    }

    // Si no se cumple ninguna de las condiciones anteriores, se puede devolver un componente nulo o un mensaje por defecto
    return null
}