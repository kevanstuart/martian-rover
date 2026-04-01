import {
  COMMANDS,
  DIRECTION_CHANGE,
  DIRECTION_COMMAND,
  DIRECTIONS,
  MOVE_COMMAND,
  POSITION_CHANGE,
} from "@/config/constants";
import type {
  Command,
  Direction,
  DirectionCommand,
  GridPosition,
  MoveCommand,
  RobotPosition,
} from "@/config/types";

export default class Robot {
  private gridLimits: GridPosition;
  private lastKnownPositions: RobotPosition[];
  public position: GridPosition = [0, 0];
  public orientation: Direction = "N";
  public instructions: Command[] = [];
  public lastGoodPosition?: RobotPosition;
  public isLost = false;

  // Constructor with a private parameter property
  public constructor(grid: GridPosition, lostPositions: RobotPosition[]) {
    this.gridLimits = grid;
    this.lastKnownPositions = lostPositions;
  }

  public setStartingPosition(position: string) {
    const [x, y, orientation] = position.split(" ") as [
      string,
      string,
      Direction,
    ];

    const parseX = Number(x);
    const parseY = Number(y);

    if (Number.isNaN(parseX) || Number.isNaN(parseY))
      throw new Error("Grid positions must be [number, number]");

    if (this.isOutOfBounds([parseX, parseY]))
      throw new Error("Starting position must exist within the grid");

    if (!DIRECTIONS.includes(orientation))
      throw new Error("Starting orientation must be a cardinal direction");

    this.position = [parseX, parseY];
    this.orientation = orientation;

    return this;
  }

  public setInstructions(instructions: string) {
    const commands = instructions.split("") as Command[];

    if (!commands.every((c) => COMMANDS.includes(c))) {
      throw new Error(
        `Robot instructions contain an invalid command. Please use ${COMMANDS.join(", ")}`,
      );
    }

    this.instructions = commands;
    return this;
  }

  private isOutOfBounds(position: GridPosition) {
    return (
      position[0] > this.gridLimits[0] ||
      position[1] > this.gridLimits[1] ||
      position[0] < 0 ||
      position[1] < 0
    );
  }

  private isLastKnownPosition(robotPosition: RobotPosition) {
    const found = this.lastKnownPositions.findIndex(
      (position) =>
        position[0] === robotPosition[0] &&
        position[1] === robotPosition[1] &&
        position[2] === robotPosition[2],
    );

    return found !== -1;
  }

  private moveRobot() {
    if (!(this.orientation in POSITION_CHANGE)) {
      throw new Error(
        `Orientation not found in move command: ${this.orientation}`,
      );
    }

    if (this.isLastKnownPosition([...this.position, this.orientation])) return;

    const position = POSITION_CHANGE[this.orientation](this.position);
    if (this.isOutOfBounds(position)) {
      this.isLost = true;
    } else {
      this.position = position;
    }

    this.lastGoodPosition = [...this.position, this.orientation];
  }

  private turnRobot(direction: DirectionCommand) {
    if (!(direction in DIRECTION_CHANGE)) {
      throw new Error(
        `Direction not found in turn command: ${this.orientation}`,
      );
    }

    const orientation = DIRECTION_CHANGE[direction](
      DIRECTIONS.indexOf(this.orientation),
    );

    this.orientation = orientation;
  }

  public run() {
    for (const command of this.instructions) {
      if (this.isLost) break;

      if (!COMMANDS.includes(command)) continue;

      if (MOVE_COMMAND.includes(command as MoveCommand)) this.moveRobot();

      if (DIRECTION_COMMAND.includes(command as DirectionCommand))
        this.turnRobot(command as DirectionCommand);
    }

    const baseResult = `${this.position[0]} ${this.position[1]} ${this.orientation}`;
    return this.isLost ? `${baseResult} LOST` : baseResult;
  }
}
