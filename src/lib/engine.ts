import { MAX_X_LIMIT, MAX_Y_LIMIT } from "@/config/constants";
import type { GridPosition, RobotPosition } from "@/config/types";
import Robot from "@/lib/robot";
import sleep from "@/utils/sleep";

export default class Engine {
  // I really wanted to call this `dangerWillRobinson`
  private lastKnownPositions: RobotPosition[] = [];
  private gridLimits: GridPosition = [0, 0];
  private instructions: string[];
  private setError: (error: string) => void;
  public hasError = false;
  public output: string[] = [];

  public constructor(
    instructions: string[],
    errorHandler: (error: string) => void,
  ) {
    this.setError = errorHandler;
    this.instructions = instructions;
    this.configureGrid();
  }

  private throwError(error: string) {
    this.setError(error);
    this.hasError = true;
  }

  private configureGrid() {
    // Do not mutate the original instructions
    const instructions = [...this.instructions];

    const bounds = instructions.shift();
    if (!bounds) {
      this.throwError("No grid boundaries exist");
      return;
    }

    const boundaries = bounds.split(" ").map(Number);
    if (boundaries.length !== 2) {
      this.throwError(`Incorrect grid boundary format: ${bounds}`);
      return;
    }

    const [x, y] = boundaries;
    if (x > MAX_X_LIMIT || y > MAX_Y_LIMIT) {
      this.throwError(
        `Grid boundaries exceed maximum size: [${MAX_X_LIMIT} ${MAX_Y_LIMIT}]`,
      );
      return;
    }

    this.gridLimits = [x, y];
  }

  private parseInstructions(instructions: string[]) {
    const instructionSets = [] as [string, string][];
    let setIndex = 0;

    // Making sure that the input for formatted consistently
    for (let i = 0; i < instructions.length; i++) {
      if (i % 3 === 2 && instructions[i].length) {
        this.throwError(`Leave an empty line before each instruction set`);
        break;
      }

      if (!instructions[i].length) continue;

      if (!instructionSets[setIndex]) {
        instructionSets.push([instructions[i], ""]);
      } else {
        instructionSets[setIndex][1] = instructions[i];
        setIndex++;
      }
    }

    return instructionSets;
  }

  public async runEngine(sendOutput: (output: string) => void) {
    const instructions = [...this.instructions];
    instructions.shift();

    try {
      const instructionSets = this.parseInstructions(instructions);
      for (const sets of instructionSets) {
        const [position, commands] = sets;
        if (!position.length || !commands.length) {
          this.throwError(
            `Fatal Error, instruction set not found: [${sets.join(", ")}]`,
          );
        }

        const robot = new Robot(this.gridLimits, [...this.lastKnownPositions]);
        const result = robot
          .setStartingPosition(position)
          .setInstructions(commands)
          .run();

        if (robot.isLost && robot.lastGoodPosition) {
          this.lastKnownPositions.push(robot.lastGoodPosition);
        }

        this.output.push(result);
        sendOutput(result);

        // Simulate larger processing
        await sleep(500);
      }
    } catch (e: unknown) {
      this.throwError(e as string);
    }
  }
}
