export default abstract class Solution {
  constructor(protected file: string) {}

  public async executeFirstHalf(): Promise<unknown> {
    return 'First half - not yet implemented';
  }

  public async executeSecondHalf(): Promise<unknown> {
    return 'Second half - not yet implemented';
  }
}
