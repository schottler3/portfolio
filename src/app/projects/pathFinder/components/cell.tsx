"use client"
import React from 'react';

interface CellItemProps {
    cords: [number, number];
    state: number;
}

export default function Cell({cords, state}: CellItemProps) {

    const colors = {
        0: "bg-white",
        1: "bg-black",
        2: "bg-green-500",
        3: "bg-red-500"
    };

    return (
        <div 
            className={`w-full h-full border border-charcoal ${colors[state as keyof typeof colors]}`}
            data-x={cords[0]}
            data-y={cords[1]}
        />
    );

}