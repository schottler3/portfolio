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
        <div className="bg-charcoal h-screen w-screen overflow-auto mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-[40%_60%] text-white p-4">
                <div className="flex justify-center flex-col text-center mt-8">
                    <h2 className="text-3xl md:text-5xl mb-16">Path Finder: Under Development</h2>
                    <div className="flex justify-center">
                        <div className="*:text-center">
                            <input 
                                type="text" 
                                id="gridSize" 
                                className="text-black px-4 py-2 w-1/2"
                                defaultValue={gridSize}
                            />
                            <button className="bg-green-900 text-white px-4 py-2 w-1/4" onClick={() => {
                                const input = document.getElementById("gridSize") as HTMLInputElement;
                                if (input) {
                                    const inputValue = Number(input.value);
                                    
                                    if (inputValue > 100) {
                                        setInvalid(true);
                                        input.value = "";
                                    } else {
                                        setInvalid(false);
                                        setGridSize(inputValue || 50);
                                    }
                                }
                            }}>Set</button>
                            <button className="bg-red-900 text-white px-4 py-2 w-1/4" onClick={() => {
                                clearGrid();
                                setInvalid(false);
                            }}>Clear</button>
                        </div>
                        {invalid ? <div className="absolute text-red-500 text-xl mt-12">Grid Max is 100</div> : null}
                    </div>
                    <div className="bg-navy rounded-full py-8 flex items-center flex-col justify-center mt-8">
                        <div className="flex justify-center font-bold gap-4 my-8 *:bg-charcoal *:w-24 md:*:w-48 *:py-2 *:rounded-md *:transition-shadow *:ease-in-out *:duration-300">
                            <button className="hover:bg-gray1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setHeuristic("Euclidean")}}>Euclidean</button>
                            <button className="hover:bg-gray1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setHeuristic("Manhattan")}}>Manhattan</button>
                        </div>
                        <div className="flex flex-col gap-2 *:bg-blue1 text-white text-center items-center w-full *:w-1/3 md:*:w-1/2 font-bold *:rounded-md *:transition-shadow *:ease-in-out *:duration-300">
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("BFS")}}>BFS</button>
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("DFS")}}>DFS</button>
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("BestFS")}}>BestFS</button>
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("A")}}>A*</button>
                            <button className="hover:bg-charcoal hover:text-aqua1 hover:shadow-[inset_0_0_0_2px_#9eefe5]" onClick={(e) => {setAlgorithm("Dijkstra")}}>Dijkstra</button>
                        </div>
                    </div>
                    <div className="flex md:hidden justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 142 142" fill="none" 
                             onClick={() => {
                                const gridElement = document.getElementById('grid');
                                if (gridElement) {
                                    gridElement.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'center'
                                    });
                                } else {
                                    console.log("Grid element not found!");
                                }
                            }}
                        >
                            <path d="M0.289307 71L71 110L141.711 71L71 141.711L0.289307 71Z" fill="#9EEFE5"/>
                            <path d="M63 91H78L71.5 141L63 91Z" fill="#9EEFE5"/>
                        </svg>
                    </div>
                </div>
                <div className="flex justify-center py-8 h-full w-full px-2 mx-auto">
                    <div 
                        className="aspect-square w-full max-w-3xl"
                        id="grid" 
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
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