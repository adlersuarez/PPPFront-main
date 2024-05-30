import React from 'react';

const NoResultados: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full sm:min-h-[280px] text-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M21 3L3 21" />
            </svg>
            <p className="text-gray-600 text-lg font-semibold mb-2">No se encontraron resultados</p>
            <p className="text-gray-500">Inténtalo de nuevo con diferentes criterios de búsqueda.</p>
        </div>
    )
}
export default NoResultados