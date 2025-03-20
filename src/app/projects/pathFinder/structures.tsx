import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";

export class Node {
    x: number;
    y: number;
    g: number;
    h: number;
    open: boolean;
    visited: boolean;
    parent: Node | null;

    constructor(x: number, y: number, open: boolean) {
        this.x = x;
        this.y = y;
        this.g = Number.POSITIVE_INFINITY;
        this.h = 0;
        this.open = open;
        this.visited = false;
        this.parent = null;
    }

    equals(other: Node): boolean {
        return this.x === other.x && this.y === other.y;
    }

    hash(): string {
        return `${this.x}-${this.y}`;
    }

    lessThan(other: Node): boolean {
        return this.x < other.x || (this.x === other.x && this.y < other.y);
    }

    toDict(): { id: string; open: boolean } {
        return {
            id: `${this.x}-${this.y}`,
            open: this.open,
        };
    }
}

export class Graph {
    size: number;
    nodes: Node[][];
    goals: Node[];
    start: Node | null;

    constructor(size: number) {
        this.size = size;
        this.nodes = [];
        this.goals = [];
        for (let i = 0; i < size; i++) {
            const row: Node[] = [];
            for (let j = 0; j < size; j++) {
                row.push(new Node(i, j, true));
            }
            this.nodes.push(row);
        }
        this.start = null;
    }

    setOpen(x: number, y: number, open: boolean): void {
        this.nodes[x][y].open = open;
    }

    addGoal(x: number, y: number): void {
        this.goals.push(this.nodes[x][y]);
    }

    setStart(x: number, y: number): void {
        this.start = this.nodes[x][y];
    }

    expand(node: Node): Node[] {
        const actions: Node[] = [];
        const x = node.x;
        const y = node.y;
        const nodes = this.nodes;

        const options = [
            [x, y + 1],
            [x + 1, y],
            [x, y - 1],
            [x - 1, y],
        ];
        options.sort(() => Math.random() - 0.5);

        while (options.length > 0) {
            const [x, y] = options.pop()!;
            if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
                continue;
            }
            if (nodes[x][y].open) {
                actions.push(nodes[x][y]);
            }
        }
        return actions;
    }

    mazeExpand(node: Node): Node[] | null {
        const actions: Node[] = [];
        const x = node.x;
        const y = node.y;
        const nodes = this.nodes;

        if(y + 2 < this.size && !nodes[x][y + 2].open){
            actions.push(nodes[x][y + 2]);
        }
        if(x + 2 < this.size && !nodes[x + 2][y].open){
            actions.push(nodes[x + 2][y]);
        }
        if(y - 2 >= 0 && !nodes[x][y - 2].open){
            actions.push(nodes[x][y - 2]);
        }
        if(x - 2 >= 0 && !nodes[x - 2][y].open){
            actions.push(nodes[x - 2][y]);
        }
        
        if(actions.length === 0){
            return null;
        }
        else{
            return actions;
        }
    }

    isGoal(node: Node): boolean {
        return this.goals.some((goal) => node.equals(goal));
    }

    manhattan(node: Node): number {
        return Math.min(
            ...this.goals.map((goal) => Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y))
        );
    }

    euclidean(node: Node): number {
        return Math.min(
            ...this.goals.map(
                (goal) => ((node.x - goal.x) ** 2 + (node.y - goal.y) ** 2) ** 0.5
            )
        );
    }

    cost(node1: Node, node2: Node): number {
        return 1;
    }

    toDict(): { size: number; nodes: { id: string; open: boolean }[][]; goals: { id: string }[]; start: { id: string } } {
        return {
            size: this.size,
            nodes: this.nodes.map((row) => row.map((node) => node.toDict())),
            goals: this.goals.map((goal) => ({ id: goal.hash() })),
            start: this.start ? { id: this.start.hash() } : { id: "" },
        };
    }
}