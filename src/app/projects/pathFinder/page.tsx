"use client"
import React, { useState } from 'react';
import Cell from './components/cell';
import { ReactElement } from 'react';

const gridSize = 20;
let start: ReactElement|null = null;
let algorithm:string = 'BFS';
let goals: ReactElement[] = [];
let cells: ReactElement[] = [];
let blocks: ReactElement[] = [];
let mousedown:boolean = false;
let editing:boolean = true;

let populateGrid = function() {

    for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
            let cell = <Cell cords={[i, j]} state={0} key={`${i}-${j}`} />;
            cells.push(cell);
        }
    }

}

export default function Page() {
    const [initialized, setInitialized] = useState(false);
    
    if (!initialized) {
        cells = [];
        populateGrid();
        setInitialized(true);
    }

    return (
        <div className="bg-charcoal h-screen">
            <div className="grid grid-cols-2 text-white p-4">
                <div className="col-span-1">
                    <h2 className="text-2xl mb-4">Path Finder | This is under Development! Please view the original project that is fully functional at the github repo link!</h2>
                    <p className="mb-2">Click cells to toggle:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>White: Empty</li>
                        <li>Black: Wall</li>
                        <li>Green: Goal</li>
                        <li>Red: Start</li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <div id="grid">
                        {cells && cells.map((cell) => cell)}
                    </div>
                </div>
            </div>
        </div>
    );
}