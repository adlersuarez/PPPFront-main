import React, { useEffect, useState } from 'react'

interface CardDashboard {
    bgGradient: string
    iconClass: string
    title: string
    quantity: number
    description: string
}

export const CardDashboard: React.FC<CardDashboard> = ({ bgGradient, iconClass, title, quantity, description }) => {

    const [cantidad, setCantidad] = useState<number>(0)

    useEffect(() => {
        setCantidad(quantity)
    }, [quantity])

    return (
        <div className="bg-gray-100 rounded-md p-4 shadow hover:scale-105 hover:border-gray-400 hover:border">
            <div className="flex items-center sm:gap-4 gap-8">
                <div className={`bg-gradient-to-tl ${bgGradient} w-16 h-16 shrink-0 rounded-full flex items-center justify-center`}>
                    <i className={`bi ${iconClass} text-white text-3xl`}></i>
                </div>

                <div className="flex w-full">
                    <div className='flex flex-col justify-between text-left w-full'>
                        <p className="text-sm text-lime-500 text-gray-700 font-semibold">{title}</p>
                        <p className="text-xs text-gray-500">{description}</p>
                    </div>
                    <div className='h-16 w-20 shrink-0 flex justify-end mr-2'>
                        <h5 className="my-auto sm:text-3xl text-4xl font-bold text-upla-100">{cantidad} </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}