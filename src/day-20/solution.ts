import Solution from '../solution-base';
import { processFile } from '../utils/file-reader';
import Grid from '../utils/grid';
import { ITile, firstHalfAnswer } from './puzzle';

export default class DayTwentySolution extends Solution {
  private data: ITile[] = [];

  private async populateData(): Promise<void> {
    if (this.data.length) return;
    let currentTile;
    let currentLines;
    await processFile(this.file, line => {
      if (!currentTile) {
        currentTile = {
          id: line
            .replace('Tile', '')
            .replace(':', '')
            .trim(),
          grid: null
        };
        currentLines = [];
      } else if (line !== '') {
        currentLines.push(line.split(''));
      } else {
        currentTile.grid = new Grid<string>();
        currentTile.grid.setGridArrays(currentLines);
        this.data.push(currentTile);
        currentTile = null;
      }
    });
  }

  public async executeFirstHalf(): Promise<number> {
    await this.populateData();
    return firstHalfAnswer(this.data);
  }
}
