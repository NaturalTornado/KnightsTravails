    class KnightMoveNode {
        constructor(position) {
            this.position = position;
            this.children = [];
        }

        addChild(node) {
            this.children.push(node);
        }

    }


    const startingPoint = [1,0];
    const endPoint = [4,7];


    const knightMoves = [
    [-2, -1],
    [-1,  2],
    [ 1, -2],
    [ 1,  2],
    [ 2, -1],
    [ 2,  1],

    ];

    function isValidMove (x,y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;

    }

    function findShortestPath(startPosition, endPosition, knightMoveNode) {
        const queue = [];
        const visited = new Set();
        const startNode = {
            position: startPosition,
            path: [startPosition],
            treeNode: knightMoveNode,
        };

        queue.push(startNode);
        visited.add(`${startPosition[0]}, ${startPosition[1]}`);

        while (queue.length > 0) {
            const { position, path, treeNode } = queue.shift();
            const [ currentX, currentY ] = position;

            if (currentX === endPosition[0] && currentY === endPosition[1]) {
                return path;

            }

            for ( const [dx, dy] of knightMoves) {
                const nextX = currentX + dx;
                const nextY = currentY + dy;


                if (isValidMove(nextX, nextY) && !visited.has(`${nextX}, ${nextY}`)) {
                    visited.add(`${nextX}, ${nextY}`);
                    
                    const newNode = new KnightMoveNode([nextX,nextY]);
                    treeNode.addChild(newNode);

                    queue.push({
                        position: [ nextX, nextY ],
                        path: [...path, [nextX, nextY]],
                        treeNode: newNode,
                    });
                    
                    //console.log ('Next Move(x,y): (',nextX, ',',nextY,')');
                
                    //knightMoveNode.addChild(position);
                    //console.log("Path: (x)", position[0], ", (y): ", position[1]);

                } 
                }
            }

    return null;
    }

    function findKnightPath(startPosition, endPosition) {
        const knightMoveNode = new KnightMoveNode(startPosition);
        const shortestPath = findShortestPath(startPosition, endPosition, knightMoveNode);

        if (shortestPath) {
            const readablePath = shortestPath.map((position) => `(${position[0]}, ${position[1]})`);
            console.log("Shortest Path: ", readablePath);
            console.log("Number of Moves: ", readablePath.length - 1);
        } else {
            console.log("No valid path found.");
        }


        
    console.log("Tree: ");
    prettyPrint(knightMoveNode);

    }

    const prettyPrint = (node, prefix = "", isLast = true) => {
        console.log(`${prefix}${isLast ? "└── " : "├── "}${node.position}`);
        const childPrefix = prefix + (isLast ? "    " : "│   ");
        for (let i = 0; i < node.children.length; i++) {
        prettyPrint(node.children[i], childPrefix, i === node.children.length - 1);
        }
    };
    

    
    
    findKnightPath(startingPoint, endPoint);


    //knightMoveNode = new KnightMoveNode(startingPoint);



    //const moveTree = new Movetree(path);


    //prettyPrint(moveTree.root);
