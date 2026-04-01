const cardinals = ["N", "E", "S", "W"];

function is_out_of_bounds(position, max_x, max_y) {
  const [x, y] = position;
  return x > max_x || y > max_y;
}

function move_robot(position, orientation) {
  const [x, y] = position;

  switch (orientation) {
    case "N":
      return [x, y + 1];
    case "E":
      return [x + 1, y];
    case "S":
      return [x, y - 1];
    case "W":
      return [x - 1, y];
    default:
      return [x, y];
  }
}

function init(bounds, initial, instructions) {
  const [max_x, max_y] = bounds.split(" ").map(Number);
  if (max_x > 50 || max_y > 50) return "ERROR - grid too large";

  const [x, y, orientation] = initial.split(" ");

  const robot = {
    position: [parseInt(x, 10), parseInt(y, 10)],
    orientation: orientation,
  };

  console.log("-----");
  console.log(robot);
  console.log("-----");

  const inputs = instructions.split("");
  let is_lost = false;

  for (const input of inputs) {
    const currentCardinalIndex = cardinals.indexOf(robot.orientation);
    switch (input) {
      case "L":
        robot.orientation =
          cardinals[currentCardinalIndex - 1] ?? cardinals.at(-1);
        break;
      case "R":
        robot.orientation =
          cardinals[currentCardinalIndex + 1] ?? cardinals.at(0);
        break;
      case "F": {
        const new_position = move_robot(robot.position, robot.orientation);
        if (is_out_of_bounds(new_position, max_x, max_y)) {
          is_lost = true;
        } else {
          robot.position = new_position;
        }
        break;
      }
    }

    if (is_lost) break;
  }

  return [...robot.position, robot.orientation, is_lost ? "LOST" : null].join(
    " ",
  );
}

const test_bounds = "5 3";
const test_start = "1 1 E";
const test_instructions = "RFRFRFRF";

console.log(init(test_bounds, test_start, test_instructions));
