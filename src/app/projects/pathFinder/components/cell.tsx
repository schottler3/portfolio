"use client"
import React, { use, useEffect, useState } from 'react';
import { Node } from '../structures';

interface CellItemProps {
    startingCell: Node | null;
    finishingCells: Node[];
    walls: Node[];
    cords: [number, number];
    state: number;
    setStart: (start: Node | null) => void;
    setGoals: (goals: Node[]) => void;
    setWalls: (walls: Node[]) => void;
}

export default function Cell({cords, state, startingCell, finishingCells, walls, setStart, setGoals, setWalls}: CellItemProps) {

    const [node, setNode] = useState<Node | null>(null);

    const colors = {
        0: "bg-white",
        1: "bg-black",
        2: "bg-green-500",
        3: "bg-red-500",
        4: "bg-blue-500"
    };

    useEffect(() => {
        setNode(new Node(cords[0], cords[1], true));
    }, []);
        

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
                    if (node === null) {
                        return;
                    }
                    if(state === 2){
                        if(finishingCells.some(goal => goal.x === node.x && goal.y === node.y)){
                            setGoals(finishingCells.filter(goal => goal.x !== node.x || goal.y !== node.y));
                        }
                        setStart(node);
                    }
                    else if (state === 3){
                        if(walls.some(wall => wall.x === node.x && wall.y === node.y)){
                            setWalls(walls.filter(wall => wall.x !== node.x || wall.y !== node.y));
                        }
                        setGoals([...finishingCells, node]);
                    }
                    else if (state === 0){
                        if(startingCell && startingCell.x === node.x && startingCell.y === node.y){
                            setStart(null);
                        }
                        setWalls([...walls, node]);
                    }
                    if (state > 3) {
                        state = 0;
                    }
                    target.className = `aspect-square border border-charcoal ${colors[state as keyof typeof colors]}`;
                }
            }}
        />
    );

}