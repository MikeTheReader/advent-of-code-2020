export default abstract class Solution {
  constructor(protected file: string) {}

  public async executeFirstHalf(): Promise<any> {
    return 'First half - not yet implemented';
  }

  public async executeSecondHalf(): Promise<any> {
    return 'Second half - not yet implemented';
  }
}
