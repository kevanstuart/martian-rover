import type {
  COMMANDS,
  DIRECTION_COMMAND,
  DIRECTIONS,
  MOVE_COMMAND,
} from "./constants";

export type GridPosition = [number, number];
export type Direction = (typeof DIRECTIONS)[number];
export type MoveCommand = (typeof MOVE_COMMAND)[number];
export type DirectionCommand = (typeof DIRECTION_COMMAND)[number];
export type Command = (typeof COMMANDS)[number];
export type RobotPosition = [number, number, Direction];
