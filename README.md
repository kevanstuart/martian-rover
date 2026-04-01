# 🤖 Martian Robots - a recap

A browser-based solution to the [Red Badger Martian Robots](https://github.com/kevanstuart/martian-rover) coding challenge, built with React 19, TypeScript, and Vite.

Robots navigate a bounded rectangular grid on Mars. Each robot receives a starting position, an orientation, and a string of instructions (`L`, `R`, `F`). The program reports each robot's final position — or marks it `LOST` if it falls off the edge. Lost robots leave a "scent" that prevents subsequent robots from falling off at the same point.

---

## Demo

> Paste the sample input directly into the UI or click the *Load sample data* button, and hit **Run** to see the expected output.

**Sample input**
```
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
```

**Expected output**
```
1 1 E
3 3 N LOST
2 3 S
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 19](https://react.dev/) | UI rendering with the new React Compiler |
| [TypeScript](https://www.typescriptlang.org/) | Static typing throughout |
| [Vite 8](https://vitejs.dev/) | Dev server and bundler |
| [Bun](https://bun.sh/) | Package manager and script runner |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Biome](https://biomejs.dev/) | Linting and formatting |

---

## Project Structure

```
martian-rover/
├── public/                 # Static assets
├── src/
│   ├── components/         # React UI components
|   └── config/
│   │   ├── constants.ts    # Slow changing data, could be ENV variables mostly 
│   │   ├── types.ts        # Static types for type checking
|   └── data/
│   │   ├── initial.txt     # Sample data provided by Red Badger
│   ├── lib/                # Core simulation logic (pure functions)
│   │   ├── engine.ts       # Parsing raw input, acts as controller and outputs data
│   │   ├── robot.ts        # Robot movement, turning, and lost-scent logic
|   └── styles
│   │   ├── global.css      # Global styles / Tailwind directives
|   └── utils
│   │   ├── parse-input.ts  # Reads the base input and splits by newline
│   │   ├── read-input.ts   # Fetches the sample input for use
│   │   ├── sleep.ts        # Async timeout to simulate processing load
│   ├── app.tsx             # Root component — wires input → simulation → output
│   ├── index.tsx           # React entry point
├── index.html              # Vite HTML entry point
├── biome.json              # Linter / formatter config
├── vite.config.ts          # Vite + Tailwind + React Compiler setup
├── tsconfig.json           # TypeScript project references
└── package.json
```

### Architectural decisions

**Pure simulation core.** All grid and robot logic lives in `src/lib/` as plain TypeScript classes with no React dependencies. This keeps the business logic easy to test in isolation and decoupled from how it's presented.

**Scent set.** Lost positions are tracked in an `Array` of tuples based on `"x,y,direction"`. Before executing any `F` instruction that would move a robot off-grid, the simulation checks the scent set and silently skips the command if a previous robot was lost from the same position facing the same direction.

**Extensible command dispatch.** Rather than a large `switch` statement, movement commands are resolved through a command map (`{ L: turnLeft, R: turnRight, F: moveForward }`), making it straightforward to add new instruction types without modifying existing handlers.

**Stateless components.** The React layer is kept deliberately thin — components receive parsed results as props and render them. All state lives in `app.tsx` as a single `useState` call holding the the computed output, and some function handlers.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) `>= 1.0` — install with `curl -fsSL https://bun.sh/install | bash`

### Install & run

```bash
# Clone the repository
git clone https://github.com/kevanstuart/martian-rover.git
cd martian-rover

# Install dependencies
bun install

# Start the development server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

```bash
bun run build      # Production build → dist/
bun run preview    # Preview the production build locally
```

---

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for both linting and formatting (no ESLint or Prettier required).

```bash
# Check for lint errors and formatting issues
bunx biome check .

# Auto-fix everything possible
bunx biome check --write .
```

---

## Constraints (from the spec)

- Grid coordinates are integers; the lower-left is always `(0, 0)`.
- Maximum coordinate value: `50`.
- Instruction strings are fewer than 100 characters.
- Robots are processed sequentially; each finishes before the next begins.
