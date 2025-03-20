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
        3: "bg-red-500",
        4: "bg-blue-500"
    };

    return (
        <div 
            className={`aspect-square border border-charcoal ${colors[state as keyof typeof colors]}`}
            data-x={cords[0]}
            data-y={cords[1]}
            onClick={(e) => {
                const target = e.target as HTMLDivElement;
                const x = target.getAttribute("data-x");
                const y = target.getAttribute("data-y");
                if (x && y) {
                    console.log(`Clicked on cell: ${x}, ${y}`);
                    state += 1;
                    if (state > 3) {
                        state = 0;
                    }
                    target.className = `aspect-square border border-charcoal ${colors[state as keyof typeof colors]}`;
                }
            }}
        />
    );

}