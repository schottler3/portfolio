import {Node, Graph, Queue} from './structures';

export class Search {

    

    BFS(graph: Graph): {time: number, node: Node}[] {
        let node: Node = graph.start as Node;
        let steps: {time: number, node: Node}[] = [];
        let time: number = 0;

        if(graph.isGoal(node)) {
            steps.push({time: time, node: node});
            return steps;
        }

        let frontier: Queue = new Queue();
        let reached: Set<Node> = new Set();
        reached.add(node);
        steps.push({time: time, node: node});
        frontier.enQueue(node);
        time += 1;

        while(!frontier.isEmpty()) {
            node = frontier.deQueue() as Node;
            let children = graph.expand(node);
            for(let child of children) {
                if(graph.isGoal(child)) {
                    child.parent = node;
                    return steps;
                }
                if(!reached.has(child)) {
                    reached.add(child);
                    child.parent = node;
                    frontier.enQueue(child);
                    steps.push({time: time, node: child});
                    time += 1;
                }
            }
        }

        return [];
    }

    DFS(graph: Graph): {time: number, node: Node}[] {
        let node: Node = graph.start as Node;
        let steps: {time: number, node: Node}[] = [];
        let time: number = 0;

        if(graph.isGoal(node)) {
            steps.push({time: time, node: node});
            return steps;
        }
        
        let frontier: Queue = new Queue();
        let reached: Set<Node> = new Set();

        reached.add(node);
        steps.push({time: time, node: node});
        frontier.enQueue(node);
        time += 1;

        while (!frontier.isEmpty()) {
            node = frontier.deQueue() as Node;
            let children = graph.expand(node);
            for (let child of children) {
                if (graph.isGoal(child)){
                    child.parent = node;
                    return steps;
                }
                if (!reached.has(child)) {
                    reached.add(child);
                    child.parent = node;
                    frontier.enQueue(child);
                    steps.push({time: time, node: child});
                    time += 1;
                }
            }
        }

        return [];
    }
}