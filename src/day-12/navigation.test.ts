import { findDistance, findWaypointDistance } from './navigation';

describe('navigation', () => {
  const testData = ['F10', 'N3', 'F7', 'R90', 'F11'];
  describe('findDistance', () => {
    it('finds the correct distance with the test data', () => {
      expect(findDistance(testData)).toBe(25);
    });
  });

  describe('findWaypointDistance', () => {
    it('finds the correct waypoint distance with the test data', () => {
      expect(findWaypointDistance(testData)).toBe(286);
    });
  });
});
