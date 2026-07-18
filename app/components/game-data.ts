export type Difficulty = "easy" | "medium" | "hard";
export type GamePhase = "setup" | "running" | "finished";

const PASSAGES: Record<Difficulty, string[]> = {
  easy: [
    "The morning train moved slowly past green fields. Maya watched the small towns pass and wrote their names in her notebook.",
    "After lunch, the rain began to tap against the window. A sleepy cat curled beside the warm lamp and listened.",
    "On Saturday, we walked to the market for bread and peaches. The streets were quiet, and the air smelled fresh.",
  ],
  medium: [
    "Good ideas rarely arrive all at once; they grow through patient experiments, useful mistakes, and honest conversations.",
    "At the corner café, Jordan ordered tea, opened a weathered notebook, and planned the week ahead: two meetings, one deadline, and plenty of breathing room.",
    "The old keyboard clicked and clacked through the afternoon. Outside, bicycles crossed the square while the bakery closed for the evening.",
  ],
  hard: [
    "Creativity rewards patient momentum: observe carefully, question comfortable assumptions, and revise without becoming attached to the first solution.",
    "At 7:45 p.m., the workshop hummed with focused energy—every precise measurement shaped a clearer, more resilient prototype.",
    "Complex problems become manageable when we separate evidence from uncertainty. What do we know, what are we inferring, and what should we test next?",
  ],
};

export function createPassage(level: Difficulty) {
  const source = PASSAGES[level];
  return Array.from({ length: 18 }, (_, index) => source[index % source.length]).join("\n\n");
}
