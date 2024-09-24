// index.js - Rev. 07
// BFS with tree visualization and proper node structure

// Class to represent each node in the BFS tree
class KnightMoveNode {
    constructor(position) {
      this.position = position; // The knight's current position
      this.children = []; // Stores the possible moves (children nodes)
    }
  
    // Method to add a child to this node
    addChild(node) {
      this.children.push(node);
    }
  }
  
  // Starting and ending points are coordinates [row, column] on the board
  const startingPoint = [1, 1]; // Example starting point
  const endPoint = [6, 6]; // Example end point
  
  // List of valid Knight moves (x +/- 1, y +/- 2) and (x +/- 2, y +/- 1)
  const knightMoves = [
    [-2, -1],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];
  
  // Function to check if the move is valid (within the chessboard)
  function isValidMove(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
  
  // Function to find the shortest path using BFS and build the tree
  function findShortestPath(startPosition, endPosition, knightMoveNode) {
    const queue = [];
    const visited = new Set();
    const startNode = {
      position: startPosition,
      path: [startPosition],
      treeNode: knightMoveNode, // Store the reference to the root tree node
    };
  
    queue.push(startNode);
    visited.add(`${startPosition[0]},${startPosition[1]}`);
  
    while (queue.length > 0) {
      const { position, path, treeNode } = queue.shift();
      const [currentX, currentY] = position;
  
      // If we reach the end position, return the path
      if (currentX === endPosition[0] && currentY === endPosition[1]) {
        return path;
      }
  
      // Explore all possible knight moves
      for (const [dx, dy] of knightMoves) {
        const nextX = currentX + dx;
        const nextY = currentY + dy;
  
        if (isValidMove(nextX, nextY) && !visited.has(`${nextX},${nextY}`)) {
          visited.add(`${nextX},${nextY}`);
          
          // Create a new tree node for this move and add it to the current node
          const newNode = new KnightMoveNode([nextX, nextY]);
          treeNode.addChild(newNode); // Add the child node to the current tree node
  
          queue.push({
            position: [nextX, nextY],
            path: [...path, [nextX, nextY]], // Update the path
            treeNode: newNode, // Pass the reference to the new tree node
          });
        }
      }
    }
  
    return null; // If no path is found
  }
  
  // Function to initiate the pathfinding and print the result
  function findKnightPath(startPosition, endPosition) {
    const knightMoveNode = new KnightMoveNode(startPosition); // Root node for the tree
    const shortestPath = findShortestPath(startPosition, endPosition, knightMoveNode);
  
    if (shortestPath) {
      const readablePath = shortestPath.map((position) => `(${position[0]}, ${position[1]})`);
      console.log("Shortest Path:", readablePath);
      console.log("Number of Moves:", readablePath.length - 1);
    } else {
      console.log("No valid path found.");
    }
  
    // Print the tree structure
    console.log("Tree:");
    prettyPrint(knightMoveNode);
  }
  
  // Function to pretty print the tree (handles nodes with multiple children)
  const prettyPrint = (node, prefix = "", isLast = true) => {
    console.log(`${prefix}${isLast ? "└── " : "├── "}${node.position}`);
    const childPrefix = prefix + (isLast ? "    " : "│   ");
    for (let i = 0; i < node.children.length; i++) {
      prettyPrint(node.children[i], childPrefix, i === node.children.length - 1);
    }
  };
  
  // Call the function with the starting and ending points
  findKnightPath(startingPoint, endPoint);
  