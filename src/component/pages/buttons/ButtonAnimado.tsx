import React from 'react';

interface BotonProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export const BotonAnimado: React.FC<BotonProps> = ({ className, onClick, children }) => {

    return (
        <button
            className={className}
            onClick={onClick}
            style={{ transition: 'transform 0.2s' }}
            onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(2px)';
            }}
            onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(2px)';
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {children}
        </button>
    )
}
