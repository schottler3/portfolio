"use client"
import React from 'react';

interface AlgorithmItemProps {
    name: string;
    onSelect?: () => void;
}

export default function Cell({name, onSelect}: AlgorithmItemProps) {

    return (
        <div>
            <button 
                className="hover:bg-charcoal w-full bg-opacity-50 bg-aqua1 hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" 
                onClick={onSelect}
            >
                {name}
            </button>
        </div>
    );

}