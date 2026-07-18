export type Difficulty = "easy" | "medium" | "hard";
export type GamePhase = "setup" | "running" | "finished";

const PASSAGES: Record<Difficulty, string[]> = {
  easy: [
    "soft clouds drift over the quiet town while warm light fills every little window",
    "a sleepy cat rests beside the keyboard and listens to the gentle click of every key",
    "tiny flowers grow near the garden path as birds sing under the bright morning sky",
  ],
  medium: [
    "Good ideas rarely arrive all at once; they grow slowly, one curious thought at a time.",
    "The old keyboard clicked and clacked, keeping a steady rhythm through the cozy afternoon.",
    "A warm cup of tea, a clear desk, and a small goal can turn an ordinary day into progress.",
  ],
  hard: [
    "Creativity rewards patient momentum: observe carefully, question assumptions, and revise without fear.",
    "At 7:45, the workshop hummed with focused energy—every precise keystroke shaped a sharper idea.",
    "Complex problems become manageable when we separate evidence, uncertainty, and imaginative possibility.",
  ],
};

export function createPassage(level: Difficulty) {
  const source = PASSAGES[level];
  return Array.from({ length: 24 }, (_, index) => source[index % source.length]).join(" ");
}
