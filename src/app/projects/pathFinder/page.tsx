"use client"
import React, { useState, useEffect } from 'react';
import Cell from './components/cell';
import { ReactElement } from 'react';

export default function Page() {
    const [gridSize, setGridSize] = useState(50);
    const [invalid, setInvalid] = useState(false);
    const [cells, setCells] = useState<ReactElement[]>([]);
    const [mouse, setMouse] = useState(false);
    const [algorithm, setAlgorithm] = useState<string>("");
    const [heuristic, setHeuristic] = useState<string>("");
    
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
            <div className="sm:grid sm:grid-cols-[40%_60%] text-white p-4">
                <div className="col-span-1 flex justify-center flex-col text-center mt-8">
                    <h2 className="text-5xl mb-16">Path Finder: Under Development</h2>
                    <div className="flex justify-center">
                        <div>
                            <input 
                                type="text" 
                                id="gridSize" 
                                className="text-black px-4 py-2"
                                defaultValue={gridSize}
                            />
                            <button className="bg-green-900 text-white px-4 py-2 w-1/6" onClick={() => {
                                const input = document.getElementById("gridSize") as HTMLInputElement;
                                if (input) {
                                    const inputValue = Number(input.value);
                                    
                                    if (inputValue > 100) {
                                        input.value = "100";
                                        setInvalid(true);
                                        setGridSize(100);
                                    } else {
                                        setInvalid(false);
                                        setGridSize(inputValue || 50);
                                    }
                                }
                            }}>Set</button>
                            <button className="bg-red-900 text-white px-4 py-2 w-1/6" onClick={() => {
                                clearGrid();
                            }}>Clear</button>
                        </div>
                        {invalid ? <p className="absolute text-red-500 text-xl mt-12">Grid Max is 100</p> : null}
                    </div>
                    <div className="bg-navy rounded-full py-8 flex items-center flex-col justify-center mt-16">
                        <div className="flex justify-center font-bold gap-4 my-8 *:bg-charcoal *:w-48 *:py-2 *:rounded-md *:transition-shadow *:ease-in-out *:duration-300">
                            <button className="hover:bg-gray1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setHeuristic("Euclidean")}}>Euclidean</button>
                            <button className="hover:bg-gray1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setHeuristic("Manhattan")}}>Manhattan</button>
                        </div>
                        <div className="flex flex-col gap-2 *:bg-blue1 text-white text-center items-center w-full *:w-1/2 font-bold *:rounded-md *:transition-shadow *:ease-in-out *:duration-300">
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("BFS")}}>BFS</button>
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("DFS")}}>DFS</button>
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("BestFS")}}>BestFS</button>
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("A")}}>A*</button>
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("Dijkstra")}}>Dijkstra</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center h-screen items-center">
                    <div 
                    className="aspect-square overflow-auto" 
                    id="grid" 
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridSize}, calc(45vw / ${gridSize}))`,
                        gridTemplateRows: `repeat(${gridSize}, calc(45vw / ${gridSize}))`,
                        gap: '0'
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
        </div>
    );
}