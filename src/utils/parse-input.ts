export default function parseInput(text: string) {
  const input = text.split("\n");
  return input.length ? input : [];
}
