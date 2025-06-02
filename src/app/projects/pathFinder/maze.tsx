import { Graph, Node } from "./structures";

export class Maze {
    graph: Graph;

    constructor(graph: Graph) {
        this.graph = graph;
    }

    generate(): Graph {
        // Mark all nodes as walls (closed)
        this.graph.nodes.forEach(row => {
            row.forEach(node => {
                node.open = false;
            });
        });
        
        // Create a 2D array to represent the maze during generation
        // 1 = wall, 0 = path
        const size = this.graph.size;
        const maze: number[][] = [];
        
        // Fill maze with 1's (walls)
        for (let i = 0; i < size; i++) {
            maze.push([]);
            for (let j = 0; j < size; j++) {
                maze[i].push(1);
            }
        }
        
        // Opening at top - start of maze (optional)
        // maze[0][1] = 0;
        
        // Choose a random starting point (odd coordinates)
        let startX = 0;
        let startY = 0;
        
        do {
            startX = Math.floor(Math.random() * size);
        } while (startX % 2 === 0);
        
        do {
            startY = Math.floor(Math.random() * size);
        } while (startY % 2 === 0);
        
        maze[startX][startY] = 0;
        
        // First open cell
        const openCells: number[][] = [[startX, startY]];
        
        while (openCells.length > 0) {
            let cell: number[] | null = null;
            let n: number[][] = [];
            
            // Add placeholder element
            openCells.push([-1, -1]);
            
            // Find a cell with unvisited neighbors
            do {
                openCells.pop();
                if (openCells.length === 0) {
                    break;
                }
                cell = openCells[openCells.length - 1];
                n = this.getNeighbors(maze, cell[0], cell[1]);
            } while (n.length === 0 && openCells.length > 0);
            
            // If no more cells with neighbors, maze generation is complete
            if (openCells.length === 0) {
                break;
            }
            
            // At this point, cell must not be null since we've confirmed openCells has elements
            // TypeScript needs this assertion
            if (cell === null) {
                break;
            }
            
            // Choose random neighbor and add it to openCells
            const choice = n[Math.floor(Math.random() * n.length)];
            openCells.push(choice);
            
            // Set neighbor to 0 (path, not wall)
            // Set connecting node between cell and choice to 0
            maze[choice[0]][choice[1]] = 0;
            maze[(choice[0] + cell[0]) / 2][(choice[1] + cell[1]) / 2] = 0;
        }
        
        // Create some random openings in the maze (additional paths)
        const closed_positions: [number, number][] = [];
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                if (maze[x][y] === 1) {
                    closed_positions.push([x, y]);
                }
            }
        }
        
        const num_to_open = Math.min(10, closed_positions.length);
        const positions_to_open = this.getRandomSample(closed_positions, num_to_open);
        
        positions_to_open.forEach(([x, y]) => {
            maze[x][y] = 0;
        });
        
        // Now transfer the maze to the Graph structure
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                this.graph.nodes[x][y].open = (maze[x][y] === 0);
            }
        }
        
        // Set random start and goal positions (make sure they're open)
        this.setRandomStartGoal();
        
        return this.graph;
    }
    
    private getNeighbors(maze: number[][], ic: number, jc: number): number[][] {
        const final: number[][] = [];
        
        for (let i = 0; i < 4; i++) {
            const n = [ic, jc];
            
            // Calculate positions for the four neighbors:
            // [x][y-2], [x][y+2], [x-2][y], [x+2][y]
            n[i % 2] += ((Math.floor(i / 2) * 2) || -2);
            
            if (n[0] < maze.length && 
                n[1] < maze[0].length && 
                n[0] > 0 && 
                n[1] > 0) {
                
                if (maze[n[0]][n[1]] === 1) {
                    final.push([...n]); // Clone array to avoid reference issues
                }
            }
        }
        
        return final;
    }
    
    private setRandomStartGoal(): void {
        // Set a random start node
        let startNode = this.getRandomNode();
        while (!startNode.open) {
            startNode = this.getRandomNode();
        }
        
        // Set a random goal node
        let goalNode = this.getRandomNode();
        while (!goalNode.open || goalNode.equals(startNode)) {
            goalNode = this.getRandomNode();
        }
        
        this.graph.start = startNode;
        this.graph.goals = [goalNode];
    }
    
    private getRandomNode(): Node {
        const x = Math.floor(Math.random() * this.graph.size);
        const y = Math.floor(Math.random() * this.graph.size);
        return this.graph.nodes[x][y];
    }
    
    private getRandomSample<T>(array: T[], count: number): T[] {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result.slice(0, count);
    }
}