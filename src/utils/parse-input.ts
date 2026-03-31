export default function parseInput(text: string) {
  const input = text.split("\n");
  return input.length > 1 ? input : [];
}
