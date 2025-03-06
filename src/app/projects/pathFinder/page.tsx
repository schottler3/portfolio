"use client"
import React, { useState, useEffect } from 'react';
import Cell from './components/cell';
import { ReactElement } from 'react';

export default function Page() {
    const [gridSize, setGridSize] = useState(50);
    const [cells, setCells] = useState<ReactElement[]>([]);
    
    function populateGrid(size: number) {
        const newCells: ReactElement[] = [];
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                newCells.push(<Cell cords={[i, j]} state={0} key={`${i}-${j}`} />);
            }
        }
        setCells(newCells);
    }

    useEffect(() => {
        populateGrid(gridSize);
    }, [gridSize]);
    
    return (
        <div className="bg-charcoal h-screen">
            <div className="grid grid-cols-[40%_60%] text-white p-4">
                <div className="col-span-1">
                    <h2 className="text-2xl mb-4">Path Finder | This is under Development!</h2>
                    <div>
                        <input 
                            type="text" 
                            id="gridSize" 
                            className="text-black"
                            defaultValue={gridSize}
                        />
                        <button className="bg-green-500 text-white px-2 py-1" onClick={() => {
                            const input = document.getElementById("gridSize") as HTMLInputElement;
                            if (input) {
                                setGridSize(Number(input.value) || 50);
                            }
                        }}>Set</button>
                    </div>
                </div>
                <div className="aspect-square overflow-auto" id="grid" style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, calc(45vw / ${gridSize}))`,
                    gridTemplateRows: `repeat(${gridSize}, calc(45vw / ${gridSize}))`,
                    gap: '0',
                }}>
                    {cells}
                </div>
            </div>
        </div>
    );
}