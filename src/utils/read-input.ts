import initial from "@/data/initial.txt";

export default async function readInitialInput() {
  const response = await fetch(initial);
  return response.text();
}
