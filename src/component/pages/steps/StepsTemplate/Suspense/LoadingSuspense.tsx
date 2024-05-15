import React from 'react'

const LoadingSuspense: React.FC = () => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-200"></div>
        </div>
    )
}

export default LoadingSuspense
