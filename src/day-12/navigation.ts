enum Direction {
  East = 1,
  South = 2,
  West = 3,
  North = 4
}

const directionMap = {
  N: Direction.North,
  S: Direction.South,
  W: Direction.West,
  E: Direction.East
};

const stepSchema = /^(\w)(\d*)$/;

export function findDistance(steps: string[]): number {
  let currentDirection = Direction.East;
  let eastWest = 0;
  let northSouth = 0;
  steps.forEach(step => {
    const matches = step.match(stepSchema);
    const action = matches[1];
    const value = +matches[2];
    switch (action) {
      case 'R': {
        const rightMoves = value / 90;
        for (let i = 0; i < rightMoves; i++) {
          if (currentDirection + 1 <= 4) {
            currentDirection++;
          } else {
            currentDirection = Direction.East;
          }
        }
        break;
      }
      case 'L': {
        const rightMoves = value / 90;
        for (let i = 0; i < rightMoves; i++) {
          if (currentDirection - 1 > 0) {
            currentDirection--;
          } else {
            currentDirection = Direction.North;
          }
        }
        break;
      }
      case 'F': {
        switch (currentDirection) {
          case Direction.North: {
            northSouth += value;
            break;
          }
          case Direction.South: {
            northSouth -= value;
            break;
          }
          case Direction.East: {
            eastWest += value;
            break;
          }
          case Direction.West: {
            eastWest -= value;
            break;
          }
        }
        break;
      }
      case 'E':
      case 'W':
      case 'S':
      case 'N': {
        const moveDirection = directionMap[action];
        switch (moveDirection) {
          case Direction.North: {
            northSouth += value;
            break;
          }
          case Direction.South: {
            northSouth -= value;
            break;
          }
          case Direction.East: {
            eastWest += value;
            break;
          }
          case Direction.West: {
            eastWest -= value;
            break;
          }
        }
        break;
      }
    }
  });
  return Math.abs(northSouth) + Math.abs(eastWest);
}

export function findWaypointDistance(steps: string[]): number {
  let waypointEastWest = 10;
  let waypointNorthSouth = 1;
  let eastWest = 0;
  let northSouth = 0;
  steps.forEach(step => {
    const matches = step.match(stepSchema);
    const action = matches[1];
    const value = +matches[2];
    switch (action) {
      case 'R': {
        const rightMoves = value / 90;
        for (let i = 0; i < rightMoves; i++) {
          const newWaypointEastWest = waypointNorthSouth;
          const newWaypointNorthSouth = -waypointEastWest;
          waypointNorthSouth = newWaypointNorthSouth;
          waypointEastWest = newWaypointEastWest;
        }
        break;
      }
      case 'L': {
        const rightMoves = value / 90;
        for (let i = 0; i < rightMoves; i++) {
          const newWaypointEastWest = -waypointNorthSouth;
          const newWaypointNorthSouth = waypointEastWest;
          waypointNorthSouth = newWaypointNorthSouth;
          waypointEastWest = newWaypointEastWest;
        }
        break;
      }
      case 'F': {
        for (let i = 0; i < value; i++) {
          eastWest += waypointEastWest;
          northSouth += waypointNorthSouth;
        }
        break;
      }
      case 'E':
      case 'W':
      case 'S':
      case 'N': {
        const moveDirection = directionMap[action];
        switch (moveDirection) {
          case Direction.North: {
            waypointNorthSouth += value;
            break;
          }
          case Direction.South: {
            waypointNorthSouth -= value;
            break;
          }
          case Direction.East: {
            waypointEastWest += value;
            break;
          }
          case Direction.West: {
            waypointEastWest -= value;
            break;
          }
        }
        break;
      }
    }
  });
  return Math.abs(northSouth) + Math.abs(eastWest);
}
