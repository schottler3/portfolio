"use client"
import React, { useState, useEffect } from 'react';
import Cell from './components/cell';
import { ReactElement } from 'react';
import { Graph, Node } from './structures';
import { Maze } from './maze';
import { Search } from './search';
import Algorithm from './components/algorithm';

declare global {
    interface Window {
        stopAnimation: () => void;
    }
}

export default function Page() {
    const [gridSize, setGridSize] = useState(50);
    const [invalid, setInvalid] = useState(false);
    const [cells, setCells] = useState<ReactElement[]>([]);
    const [graph, setGraph] = useState<Graph>(new Graph(gridSize));
    const [mouse, setMouse] = useState(false);
    const [algorithm, setAlgorithm] = useState<string>("");
    const [heuristic, setHeuristic] = useState<string>("");
    const [isGenerated, setIsGenerated] = useState(false);
    const [start, setStart] = useState<Node | null>(null);
    const [goals, setGoals] = useState<Node[]>([]);
    const [walls, setWalls] = useState<Node[]>([]);

    const [isAnimated, setIsAnimated] = useState(false);

    const heuristics = ["Manhattan", "Euclidean"];
    const algorithms = ["BFS", "DFS", "BestFS", "A*", "Dijkstra"];
    
    function populateGrid(size: number) {
        const newCells: ReactElement[] = [];
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                newCells.push(<Cell cords={[i, j]} state={0} startingCell={start} finishingCells={goals} walls={walls} key={`${i}-${j}`} setStart={setStart}
                    setGoals={setGoals}
                    setWalls={setWalls}/>);
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
                        startingCell={start}
                        finishingCells={goals}
                        walls={walls}
                        setStart={setStart}
                        setGoals={setGoals}
                        setWalls={setWalls}
                        key={`clear-${Date.now()}-${i}-${j}`} 
                    />
                );
            }
        }
        setCells(newCells);
    }

    useEffect(() => {
        populateGrid(gridSize);
        setAlgorithm("BFS");
        setHeuristic("Euclidean");
    }, [gridSize]);

    function construct_path(node: Node): Node[] {
        let path: Node[] = [];
        while(node) {
            path.push(node);
            node = node.parent as Node;
            if (!node) break;
        }
        path.reverse();
        return path;
    }

    function generateMaze() {
        const maze = new Maze(graph);
        const newGraph = maze.generate();
        setGraph(newGraph);
    
        // Create a brand new cells array
        const newCells: ReactElement[] = [];
        
        newGraph.nodes.forEach(row => {
            row.forEach(node => {
                let cell: ReactElement;
                if(newGraph.start && node.equals(newGraph.start)) {
                    cell = <Cell cords={[node.x, node.y]} state={3} startingCell={start} finishingCells={goals} walls={walls} key={`${node.x}-${node.y}`} setStart={setStart}
                    setGoals={setGoals}
                    setWalls={setWalls} />;
                }
                else if(newGraph.goals && newGraph.goals.length > 0 && 
                        newGraph.goals.some(goal => node.equals(goal))) {
                    cell = <Cell cords={[node.x, node.y]} state={2} startingCell={start} finishingCells={goals} walls={walls} key={`${node.x}-${node.y}`} setStart={setStart}
                    setGoals={setGoals}
                    setWalls={setWalls}/>;
                }
                else if(node.open === true) {
                    cell = <Cell cords={[node.x, node.y]} state={0} startingCell={start} finishingCells={goals} walls={walls} key={`${node.x}-${node.y}`} setStart={setStart}
                    setGoals={setGoals}
                    setWalls={setWalls}/>;
                }
                else {
                    cell = <Cell cords={[node.x, node.y]} state={1} startingCell={start} finishingCells={goals} walls={walls} key={`${node.x}-${node.y}`} setStart={setStart}
                    setGoals={setGoals}
                    setWalls={setWalls}/>;
                }
                newCells.push(cell);
            });
        });
        
        // Set all cells at once
        setCells(newCells);
    }

    async function solveMaze(){
        if(isAnimated) return;
        console.log("Solving with: ", algorithm);
        switch(algorithm) {
            case "BFS":
                const searchBFS = new Search();
                const stepsTaken: {time: number, node: Node}[] = searchBFS.BFS(graph);
                await printSteps(stepsTaken.map(step => step.node));
                
                let solution: Node[] = construct_path(stepsTaken[stepsTaken.length - 1].node);
                await printSteps(solution);
                break;
            case "DFS":
                // Commented out to avoid unused variable warning
                // const searchDFS = new Search();
                //const stepsDFS: Node[] = searchDFS.DFS(graph);
                //printSteps(stepsDFS);
                break;
            case "BestFS":
                break;
            case "A*":
                break;
            case "Dijkstra":
                break;
            default:
                break;
        }
    }

    async function printSteps(steps: Node[]): Promise<void> {
        setIsAnimated(true);

        let shouldContinue: boolean = true;

        window.stopAnimation = () => {
            shouldContinue = false;
            setIsAnimated(false);
        }

        setCells(cells.map((cell) => {
            const cellProps = (cell as any).props;
            const [x, y] = cellProps.cords;
            
            if (cellProps.state === 4) {
                return <Cell cords={[x, y]} state={0} startingCell={start} finishingCells={goals} walls={walls} key={`${x}-${y}`} setStart={setStart}
                setGoals={setGoals}
                setWalls={setWalls}/>;
            } 
            return cell;
        }));
        
        let i = 0;
        const animationSpeed = 50;

        let timeoutId: NodeJS.Timeout;
        
        const animateStep = async () => {
            if (!shouldContinue) {
                setIsAnimated(false);
                clearTimeout(timeoutId);
                return;
            }
            
            if (i >= steps.length) {
                clearTimeout(timeoutId);
                setIsAnimated(false); // Make sure to set this to false when done
                return;
            }
            
            // Update the grid
            await new Promise<void>(resolve => {
                setCells((currentCells) => {
                    const newCells = currentCells.map((cell) => {
                        const cellProps = (cell as any).props;
                        const [x, y] = cellProps.cords;
                        if(!steps[i]) return cell;
                        if (steps[i].x === x && steps[i].y === y) {
                            return <Cell cords={[x, y]} state={4} startingCell={start} finishingCells={goals} walls={walls} key={`${x}-${y}`} setStart={setStart}
                            setGoals={setGoals}
                            setWalls={setWalls}/>;
                        }
                        return cell;
                    });
                    
                    // After the update is scheduled
                    setTimeout(resolve, 10);
                    return newCells;
                });
            });
            
            i++;
            timeoutId = setTimeout(() => animateStep(), animationSpeed);
        };
        
        timeoutId = setTimeout(animateStep, 100);
    }

    
    return (
        <div className="bg-charcoal h-screen w-screen overflow-auto mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-[40%_60%] text-white p-4">
                <div className="flex justify-center flex-col text-center mt-8">
                    <h2 className="text-3xl md:text-5xl mb-16">Path Finder: Under Development</h2>
                    <p className="m-2 text-xl font-bold">Grid Settings</p>
                    <div className="flex justify-center">
                        <div className="*:text-center">
                            <input 
                                type="text" 
                                id="gridSize" 
                                className="text-black px-4 py-2 w-1/3 outline-none"
                                defaultValue={gridSize}
                            />
                            <button className="bg-gray-200 text-navy font-bold px-2 py-2 w-1/3 border-x-2 border-navy hover:bg-gray-300" onClick={() => {
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
                            <button className="bg-gray-200 text-navy font-bold px-2 py-2 w-1/3 hover:bg-gray-300" onClick={() => {
                                clearGrid();
                                setInvalid(false);
                            }}>Clear Grid</button>
                        </div>
                        {invalid ? <div className="absolute text-red-500 text-xl mt-12">Grid Max is 100</div> : null}
                    </div>
                    <div className="bg-navy rounded-full py-8 flex items-center flex-col justify-center mt-8 gap-8 font-bold">
                        <div className="flex flex-row text-xl gap-6">
                            {heuristics.map((heur, index) => (
                                <div key={index} className="flex items-center">
                                    {heur === heuristic ? (
                                         <Algorithm 
                                         name={heur}
                                         className="bg-charcoal py-2 px-6 text-aqua1 border-aqua1 border-2 rounded-md"
                                         onSelect={() => {
                                             setHeuristic(heur);
                                             console.log("Set Heuristic: ", heur);
                                         }}
                                     />
                                    ) : (
                                        <Algorithm 
                                        name={heur}
                                        className="bg-charcoal py-2 px-6 hover:text-aqua1 hover:border-aqua1 border-2 border-blue1 rounded-md"
                                        onSelect={() => {
                                            setHeuristic(heur);
                                            console.log("Set Heuristic: ", heur);
                                        }}
                                    />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2 *:select-none text-white items-center justify-center font-bold">
                            {algorithms.map((alg, index) => (
                                <div key={index} className="flex flex-row justify-around items-center w-full">
                                    {alg === algorithm ? (
                                        <>
                                            <img src="../images/Selector.svg" className="w-6 h-6" alt="Selected" />
                                            <Algorithm
                                                key={index} 
                                                name={alg}
                                                className="hover:bg-charcoal text-aqua1 bg-opacity-100 bg-charcoal border-2 border-aqua1 w-32"
                                                onSelect={() => {
                                                    setAlgorithm(alg);
                                                    console.log("Set Algorithm: ", alg);
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Algorithm
                                                key={index} 
                                                name={alg}
                                                className="hover:bg-charcoal bg-opacity-50 bg-charcoal border-2 border-blue1 hover:border-aqua1 hover:text-aqua1 w-32"
                                                onSelect={() => {
                                                    setAlgorithm(alg);
                                                    console.log("Set Algorithm: ", alg);
                                                }}
                                            />
                                        </>
                                    )}

                                    {alg === algorithm ? (
                                        <img src="../images/Selector.svg" className="w-6 h-6 rotate-180" alt="Selected" />
                                    ) : (
                                        null
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-row items-center *:w-full *:h-full *:p-2 *:bg-blue1 gap-2 text-center font-bold">
                            <button className="hover:bg-aqua1 hover:text-blue1 rounded-md" 
                                disabled={isAnimated}
                                onClick={() => {
                                    if(isGenerated){
                                        clearGrid();
                                    }
                                    generateMaze();
                                }}>Generate Maze</button>
                            <button className="hover:bg-aqua1 hover:text-blue1 rounded-md"
                            disabled={isAnimated}
                                onClick={() => {
                                    let newGraph = new Graph(gridSize);
                                    if(!start){
                                        console.log("Start node is null");
                                        return;
                                    }
                                    if(!goals){
                                        console.log("Goal node is null");
                                        return;
                                    }
                                    if(!walls)
                                        console.log("Wall node is null");

                                    newGraph.setStart(start.x, start.y);
                                    walls?.forEach((wall) => {
                                        newGraph.setOpen(wall.x, wall.y, false);
                                    });
                                    newGraph.setOpen(start.x, start.y, true);
                                    goals?.forEach((goal) => {
                                        newGraph.addGoal(goal.x, goal.y);
                                    });

                                    setGraph(newGraph);
                                    
                                    solveMaze();
                                }}>Solve</button>
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
                    >
                        {cells}
                    </div>
                </div>
            </div>
        </div>
    );
}