"use client"
import React from 'react';

interface CellItemProps {
    cords: [string, string];
    state: number;
}

export default function Cell({cords, state}: CellItemProps) {

    switch (state) {
        case 0:
            return <div className="w-4 h-4 bg-black border border-charcoal"></div>;
        case 1:
            return <div className="w-4 h-4 bg-green border border-charcoal"></div>;
        case 2:
            return <div className="w-4 h-4 bg-white border border-charcoal"></div>;
        case 3:
            return <div className="w-4 h-4 bg-red border border-charcoal"></div>;
    }
    
}