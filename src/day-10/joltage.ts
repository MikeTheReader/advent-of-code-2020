interface IJumps {
  one: number;
  three: number;
}

interface IJoltTree {
  [joltage: string]: number[];
}

export function findJumps(data: number[]): IJumps {
  const sortedData = sortAndAddBookends(data);

  return sortedData.reduce(
    (jumps: IJumps, jolt: number, index: number) => {
      if (index !== sortedData.length - 1) {
        const nextNumber = sortedData[index + 1];
        if (nextNumber - jolt === 1) {
          jumps.one++;
        } else if (nextNumber - jolt === 3) {
          jumps.three++;
        }
      }
      return jumps;
    },
    { one: 0, three: 0 } as IJumps
  );
}

export function findArrangementCount(data: number[]): number {
  const sortedData = sortAndAddBookends(data);
  const nodes = createNodeTree(sortedData);
  return countPaths(sortedData, nodes);
}

function sortAndAddBookends(data: number[]) {
  const sortedData = [...data].sort((a, b) => a - b);
  sortedData.unshift(0);
  sortedData.push(sortedData[sortedData.length - 1] + 3);
  return sortedData;
}

function createNodeTree(data: number[]): IJoltTree {
  return data.reduce((nodes, value, index) => {
    if (!data[index + 1]) {
      nodes[value] = [];
      return nodes;
    }
    const possibleNextJoltage = [data[index + 1]];
    if (data[index + 2] && data[index + 2] - value <= 3) {
      possibleNextJoltage.push(data[index + 2]);
    }
    if (data[index + 3] && data[index + 3] - value <= 3) {
      possibleNextJoltage.push(data[index + 3]);
    }
    nodes[value] = possibleNextJoltage;
    return nodes;
  }, {} as IJoltTree);
}

function countPaths(sortedData: number[], nodes: IJoltTree) {
  const pathsForNode = {};

  sortedData.reverse().forEach(node => {
    if (nodes[node].length === 0) {
      pathsForNode[node] = 1;
      return;
    }
    let pathCount = 0;
    nodes[node].forEach(child => (pathCount += pathsForNode[child]));
    pathsForNode[node] = pathCount;
  });

  return pathsForNode[0];
}
