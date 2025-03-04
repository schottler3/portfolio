"use client"
import { useEffect, useRef } from 'react';

interface Tile {
    x: number,
    y: number,
    state: number,
    isVisited: boolean,
    style: { backgroundColor: string },
    id: string,
}

export default function PathFinder() {
    const gridSize = 20;
    const tilesRef = useRef<Tile[]>([]);
    const blocksRef = useRef<string[]>([]);
    const goalsRef = useRef<Tile[]>([]);
    const startRef = useRef<Tile | null>(null);
    const mousedownRef = useRef<boolean>(false);

    useEffect(() => {
        populateGrid();
        return () => {
            const grid = document.getElementById('grid');
            if (grid) {
                grid.innerHTML = '';
            }
        };
    }, []);

    function populateGrid() {
        const grid = document.getElementById('grid');
        if (!grid) {
            return;
        }
        
        grid.innerHTML = '';
        tilesRef.current = [];
        
        for (let i = 0; i < gridSize; i++) {
            let row = document.createElement('div');
            row.className = 'row';
            grid.appendChild(row);
            
            for (let j = 0; j < gridSize; j++) {
                let tile = document.createElement('div');
                tile.className = 'cell';
                tile.id = i + '-' + j;
                
                const tileObj: Tile = {
                    x: i,
                    y: j,
                    state: 0,
                    isVisited: false,
                    style: { backgroundColor: 'white' },
                    id: i + '-' + j
                };
                
                (tile as any).tileData = tileObj;
                tilesRef.current.push(tileObj);
                
                tile.addEventListener('click', function(event) {
                    const tileData = (tile as any).tileData;
                    
                    switch(tileData.state) {
                        case 0:
                            tile.style.backgroundColor = 'black';
                            tileData.state = 1;
                            blocksRef.current.push(tileData.id);
                            break;
                        case 1:
                            tile.style.backgroundColor = 'green';
                            tileData.state = 2;
                            blocksRef.current.splice(blocksRef.current.indexOf(tileData.id), 1);
                            goalsRef.current.push(tileData);
                            break;
                        case 2:
                            if (startRef.current) {
                                const startTile = document.getElementById(startRef.current.id);
                                if (startTile) startTile.style.backgroundColor = 'white';
                                startRef.current.state = 0;
                            }
                            const goalIndex = goalsRef.current.indexOf(tileData);
                            if (goalIndex !== -1) {
                                goalsRef.current.splice(goalIndex, 1);
                            }
                            tile.style.backgroundColor = 'red';
                            tileData.state = 3;
                            startRef.current = tileData;
                            break;
                        case 3:
                            tile.style.backgroundColor = 'white';
                            if (startRef.current === tileData) {
                                startRef.current = null;
                            }
                            tileData.state = 0;
                            break;
                    }
                });
                
                tile.addEventListener('mousedown', function() {
                    mousedownRef.current = true;
                });
                
                tile.addEventListener('mouseup', function() {
                    mousedownRef.current = false;
                });
                
                tile.addEventListener('mouseenter', function() {
                    const tileData = (tile as any).tileData;
                    
                    if (mousedownRef.current) {
                        tile.style.backgroundColor = 'black';
                        if (tileData.state === 2) {
                            const goalIndex = goalsRef.current.indexOf(tileData);
                            if (goalIndex !== -1) {
                                goalsRef.current.splice(goalIndex, 1);
                            }
                        } else if (tileData.state === 3) {
                            startRef.current = null;
                        }
                        blocksRef.current.push(tileData.id);
                        tileData.state = 1;
                    }
                });
                
                row.appendChild(tile);
            }
        }
    }

    return (
        <div className="bg-charcoal min-h-screen">
            <style>{`
                .cell {
                    width: 50px;
                    height: 50px;
                    border: 1px solid white;
                }
                .row {
                    display: flex;
                }
            `}</style>
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
                    <div id="grid"></div>
                </div>
            </div>
        </div>
    );
}