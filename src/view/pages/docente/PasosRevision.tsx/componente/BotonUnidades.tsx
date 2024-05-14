import React from "react";

interface ButtonProps {
    label: string
    isSelected: boolean
    onClick: () => void
}

export const BotonUnidades: React.FC<ButtonProps> = ({ label, isSelected, onClick }) => {
    return (
        <button
            className={`bg-gray-200   py-2 text-lg rounded-md ${isSelected ? "bg-gray-500 text-white font-bold scale-105" : "hover:bg-gray-300 hover:scale-105"}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}