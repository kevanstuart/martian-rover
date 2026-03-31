import type { GridPosition } from "@/config/types";
import Robot from "./robot";

export default class Engine {
  private instructions: string[];
  private gridLimits: GridPosition = [0, 0];
  private robots: Robot[] = [];

  // Constructor with a private parameter property
  public constructor(instructions: string[]) {
    this.instructions = instructions;
    this.configureGrid();
    this.configureRobots();
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

  private configureRobots() {
    const instructions = [...this.instructions];
    instructions.shift();

    try {
      for (let i = 0; i < instructions.length; i += 3) {
        const robot = new Robot(this.gridLimits);
        robot.setStartingPosition(instructions[i]);
        robot.setInstructions(instructions[i + 1]);
        this.robots.push(robot);
      }
    } catch (e: unknown) {
      throw new Error(`Error initialising robot: ${e}`);
    }
  }

  public runEngine() {
    for (const robot of this.robots) {
      robot.run();
    }
  }
}
