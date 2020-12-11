interface IJumps {
  one: number;
  three: number;
}

export function findJumps(data: number[]): IJumps {
  const sortedData = [...data].sort((a, b) => a - b);
  sortedData.unshift(0);
  sortedData.push(sortedData[sortedData.length - 1] + 3);

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
  const sortedData = [...data].sort((a, b) => a - b);
  sortedData.unshift(0);
  sortedData.push(sortedData[sortedData.length - 1] + 3);

  const nodes = sortedData.reduce((nodes, value, index) => {
    if (!sortedData[index + 1]) {
      nodes[value] = [];
      return nodes;
    }
    const pathsToFollow = [sortedData[index + 1]];
    if (sortedData[index + 2] && sortedData[index + 2] - value <= 3) {
      pathsToFollow.push(sortedData[index + 2]);
    }
    if (sortedData[index + 3] && sortedData[index + 3] - value <= 3) {
      pathsToFollow.push(sortedData[index + 3]);
    }
    nodes[value] = pathsToFollow;
    return nodes;
  }, {});

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
