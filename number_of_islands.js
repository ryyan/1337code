// https://leetcode.com/problems/number-of-islands

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  // Pad grid with 0s, so we do not need to check for edges
  // For example:
  //           00000
  // 101       01010
  // 010  ---> 00100
  // 101       01010
  //           00000
  for (let row = 0; row < grid.length; row++) {
    grid[row].unshift("0");
    grid[row].push("0");
  }
  grid.unshift("0".repeat(grid[0].length).split(""));
  grid.push("0".repeat(grid[0].length).split(""));

  /** @type {Map<number, Set<String>>} */
  let islands = new Map();

  /** @type {Map<String, number>} */
  let tileIslandIDs = new Map();

  // Determine number of islands by "building" islands while iterating across and down the grid
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "0") {
        continue;
      }

      // Prefix coordinates with "R" and "C" to prevent duplicates
      const currentCoordinate = `R${row}C${col}`;
      const upCoordinate = `R${row - 1}C${col}`;
      const leftCoordinate = `R${row}C${col - 1}`;
      // Island IDs will be undefined if up/left tiles are "0"
      const upIslandID = tileIslandIDs.get(upCoordinate);
      const leftIslandID = tileIslandIDs.get(leftCoordinate);

      // If both up and left tiles are islands, then they are already recorded
      if (grid[row - 1][col] === "1" && grid[row][col - 1] === "1") {
        if (upIslandID === leftIslandID) {
          // Add current tile into up+left island
          islands.get(upIslandID).add(currentCoordinate);
          tileIslandIDs.set(currentCoordinate, upIslandID);
        } else {
          // Merge all tiles into a single island (merge into the up island)
          islands
            .get(leftIslandID)
            .forEach((coordinate) => tileIslandIDs.set(coordinate, upIslandID));

          islands.set(
            upIslandID,
            new Set([
              currentCoordinate,
              ...islands.get(upIslandID),
              ...islands.get(leftIslandID),
            ])
          );

          islands.delete(leftIslandID);
          tileIslandIDs.set(currentCoordinate, upIslandID);
        }
      } else if (grid[row - 1][col] === "1") {
        // Add current tile into up island
        islands.get(upIslandID).add(currentCoordinate);
        tileIslandIDs.set(currentCoordinate, upIslandID);
      } else if (grid[row][col - 1] === "1") {
        // Add current tile into left island
        islands.get(leftIslandID).add(currentCoordinate);
        tileIslandIDs.set(currentCoordinate, leftIslandID);
      } else {
        // Create new island
        const newIslandID =
          islands.size === 0 ? 0 : Math.max(...islands.keys()) + 1;
        islands.set(newIslandID, new Set([currentCoordinate]));
        tileIslandIDs.set(currentCoordinate, newIslandID);
      }
    }
  }

  return islands.size;
};

/* Everything below is for local testing only */

/**
 * @param {number} actual
 * @param {number} expected
 */
function assertEquals(actual, expected) {
  if (actual !== expected) {
    throw Error(`Expected: ${expected}, Actual: ${actual}`);
  }
}

assertEquals(
  numIslands([
    ["1", "0", "1", "1", "1"],
    ["1", "0", "1", "0", "1"],
    ["1", "1", "1", "0", "1"],
  ]),
  1
);

assertEquals(
  numIslands([
    ["1", "1", "1"],
    ["0", "1", "0"],
    ["1", "1", "1"],
  ]),
  1
);

assertEquals(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ]),
  3
);

assertEquals(
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ]),
  1
);

assertEquals(
  numIslands([
    ["1", "0", "1"],
    ["0", "1", "0"],
    ["1", "0", "1"],
  ]),
  5
);

assertEquals(
  numIslands([
    ["1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
    ["1", "0", "1", "0", "1", "1", "1", "1", "1", "1"],
    ["0", "1", "1", "1", "0", "1", "1", "1", "1", "1"],
    ["1", "1", "0", "1", "1", "0", "0", "0", "0", "1"],
    ["1", "0", "1", "0", "1", "0", "0", "1", "0", "1"],
    ["1", "0", "0", "1", "1", "1", "0", "1", "0", "0"],
    ["0", "0", "1", "0", "0", "1", "1", "1", "1", "0"],
    ["1", "0", "1", "1", "1", "0", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "0", "1", "1", "1", "1", "1", "1", "1", "0"],
  ]),
  2
);

assertEquals(
  numIslands([
    ["1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
    ["1", "0", "1", "0", "1", "1", "1", "1", "1", "1"],
    ["0", "1", "1", "1", "0", "1", "1", "1", "1", "1"],
    ["1", "1", "0", "1", "1", "0", "0", "0", "0", "1"],
    ["1", "0", "1", "0", "1", "0", "0", "1", "0", "1"],
    ["1", "0", "0", "1", "1", "1", "0", "1", "0", "0"],
    ["0", "0", "1", "0", "0", "1", "1", "1", "1", "0"],
    ["1", "0", "1", "1", "1", "0", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1", "1", "1", "1", "0", "1"],
    ["1", "0", "1", "1", "1", "1", "1", "1", "1", "0"],
  ]),
  2
);
