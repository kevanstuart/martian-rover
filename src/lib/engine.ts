import type { GridPosition, RobotPosition } from "@/config/types";
import Robot from "./robot";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class Engine {
  private instructions: string[];
  private gridLimits: GridPosition = [0, 0];
  public output: string[] = [];

  // I really wanted to call this `dangerWillRobinson`
  private lastKnownPositions: RobotPosition[] = [];

  public constructor(instructions: string[]) {
    this.instructions = instructions;
    this.configureGrid();
  }

  private configureGrid() {
    const instructions = [...this.instructions];

    const bounds = instructions.shift();
    if (!bounds) throw new Error("No grid boundaries exist");

    if (bounds.length < 1 && bounds.length !== 3) {
      throw new Error(`Incorrect grid boundary format: ${bounds}`);
    }

    const [x, y] = bounds.split(" ").map(Number);
    if (x > 50 || y > 50) {
      throw new Error(`Grid boundaries exceed maximum size: ${x} ${y}`);
    }

    this.gridLimits = [x, y];
  }

  public async runEngine(sendOutput: (output: string) => void) {
    const instructions = [...this.instructions];
    instructions.shift();

    try {
      for (let i = 0; i < instructions.length; i += 3) {
        const robot = new Robot(this.gridLimits, [...this.lastKnownPositions]);
        const result = robot
          .setStartingPosition(instructions[i])
          .setInstructions(instructions[i + 1])
          .run();

        if (robot.isLost && robot.lastGoodPosition)
          this.lastKnownPositions.push(robot.lastGoodPosition);

        this.output.push(result);
        sendOutput(result);

        await sleep(500);
      }
    } catch (e: unknown) {
      throw new Error(`Error initialising robot: ${e}`);
    }
  }
}
