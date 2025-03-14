"use client"
import React, { useState, useEffect } from 'react';
import Cell from './components/cell';
import { ReactElement } from 'react';
import { clear } from 'console';

export default function Page() {
    const [gridSize, setGridSize] = useState(50);
    const [cells, setCells] = useState<ReactElement[]>([]);
    const [mouse, setMouse] = useState(false);
    
    function populateGrid(size: number) {
        const newCells: ReactElement[] = [];
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                newCells.push(<Cell cords={[i, j]} state={0} key={`${i}-${j}`} />);
            }
        }
        setCells(newCells);
    }

    function clearGrid() {
        const newCells: ReactElement[] = [];
        for(let i = 0; i < gridSize; i++) {
            for(let j = 0; j < gridSize; j++) {
                newCells.push(
                    <Cell 
                        cords={[i, j]} 
                        state={0} 
                        key={`clear-${Date.now()}-${i}-${j}`} 
                    />
                );
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
                        <button className="bg-red-500 text-white px-2 py-1" onClick={() => {
                            clearGrid();
                        }}>Clear</button>

                    </div>
                </div>
                <div 
                className="aspect-square overflow-auto" 
                id="grid" 
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, calc(45vw / ${gridSize}))`,
                    gridTemplateRows: `repeat(${gridSize}, calc(45vw / ${gridSize}))`,
                    gap: '0',
                }}
                onMouseDown={(e) => {
                    const target = e.target as HTMLDivElement;
                    if (target.className.includes("aspect-square")) {
                        setMouse(true);
                    }
                }}
                onMouseUp={() => {
                    setMouse(false);
                }}
                onMouseOver={(e) => {
                    if (mouse) {
                        if(e.currentTarget.classList.contains("cell")){
                            const x = e.currentTarget.getAttribute("data-x");
                            const y = e.currentTarget.getAttribute("data-y");
                        }
                    }
                }}
                >
                    {cells}
                </div>
            </div>
        </div>
    );
}