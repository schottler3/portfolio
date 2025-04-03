"use client"
import React from 'react';

interface AlgorithmItemProps {
    name: string;
    onSelect?: () => void;
    className?: string;
}

export default function Cell({name, className, onSelect}: AlgorithmItemProps) {

    return (
        <div>
            <button 
                className={className}
                onClick={onSelect}
            >
                {name}
            </button>
        </div>
    );

}