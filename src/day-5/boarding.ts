const ROW_COUNT = 127;
const COLUMN_COUNT = 7;

export function parsePass(pass: string): number[] {
  const row = parseRow(pass.substring(0, 7));
  const column = parseColumn(pass.substring(7));
  return [row, column];
}

function parseRow(rowPass: string): number {
  const range = [0, ROW_COUNT];
  rowPass.split('').forEach(bit => {
    const halfPoint = Math.floor((range[1] - range[0]) / 2) + range[0];
    if (bit === 'F') {
      range[1] = halfPoint;
    } else {
      range[0] = halfPoint + 1;
    }
  });
  return range[0];
}

function parseColumn(columnPass: string): number {
  const range = [0, COLUMN_COUNT];
  columnPass.split('').forEach(bit => {
    const halfPoint = Math.floor((range[1] - range[0]) / 2) + range[0];
    if (bit === 'L') {
      range[1] = halfPoint;
    } else {
      range[0] = halfPoint + 1;
    }
  });
  return range[0];
}
