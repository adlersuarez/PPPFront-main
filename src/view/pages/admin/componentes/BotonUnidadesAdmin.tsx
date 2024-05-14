import React from "react";

interface ButtonProps {
    label: string
    isSelected: boolean
    onClick: () => void
}

export const BotonUnidadesAdmin: React.FC<ButtonProps> = ({ label, isSelected, onClick }) => {
    return (
        <button
            className={`bg-gray-200 py-2 text-base rounded-md w-full
            ${isSelected ? "bg-upla-100 text-white font-bold scale-105" : "hover:bg-gray-300 text-gray-500 font-medium hover:scale-105"}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}