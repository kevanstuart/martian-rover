import type { GridPosition } from "./types";

export const MAX_X_LIMIT = 50;
export const MAX_Y_LIMIT = 50;
export const DIRECTIONS = ["N", "E", "S", "W"] as const;
export const MOVE_COMMAND = ["F"] as const;
export const DIRECTION_COMMAND = ["R", "L"] as const;
export const COMMANDS = [...MOVE_COMMAND, ...DIRECTION_COMMAND] as const;

export const POSITION_CHANGE = {
  N: ([x, y]: GridPosition) => [x, y + 1] as GridPosition,
  S: ([x, y]: GridPosition) => [x, y - 1] as GridPosition,
  E: ([x, y]: GridPosition) => [x + 1, y] as GridPosition,
  W: ([x, y]: GridPosition) => [x - 1, y] as GridPosition,
} as const;

export const DIRECTION_CHANGE = {
  L: (index: number) => DIRECTIONS[index - 1] ?? DIRECTIONS.at(-1),
  R: (index: number) => DIRECTIONS[index + 1] ?? DIRECTIONS.at(0),
};

export const GITHUB_LINK = "https://github.com/kevanstuart/martian-rover";
