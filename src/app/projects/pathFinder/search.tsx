import {Node, Graph, Queue} from './structures';

export class Search {

    construct_path(node: Node): Node[] {
        let path: Node[] = [];
        while(node) {
            path.push(node);
            node = node.parent as Node;
            if (!node) break;
        }
        path.reverse();
        return path;
    }
    BFS(graph: Graph): Node[] {
        let node: Node = graph.start as Node;
        let steps: {time: number, node: Node}[] = [];
        let time: number = 0;

        if(graph.isGoal(node)) {
            steps.push({time: time, node: node});
            return this.construct_path(node);
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
                    return this.construct_path(child);
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
}