import { DIRECTIONS } from "@/config/constants";
import type { Direction, GridPosition } from "@/config/types";

export default class Robot {
  private gridLimits: GridPosition;

  public position: GridPosition = [0, 0];
  public orientation: string = "";
  public instructions: string[] = [];

  // Constructor with a private parameter property
  public constructor(grid: GridPosition) {
    this.gridLimits = grid;
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

    if (parseX > this.gridLimits[0] || parseY > this.gridLimits[1])
      throw new Error("Starting position must exist within the grid");

    if (!DIRECTIONS.includes(orientation))
      throw new Error("Starting orientation must be a cardinal direction");

    this.position = [parseX, parseY];
    this.orientation = orientation;
  }

  public setInstructions(instructions: string) {
    this.instructions = instructions.split("");
  }

  public run() {}
}
