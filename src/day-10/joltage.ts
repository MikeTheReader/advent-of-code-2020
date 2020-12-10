interface IJumps {
  one: number;
  three: number;
}

export function findJumps(data: number[]): IJumps {
  const sortedData = data.sort((a, b) => a - b);
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
