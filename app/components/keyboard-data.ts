export type KeyDefinition = {
  label: string;
  code: string;
  width?: number;
  color?: string;
};

export const KEY_ROWS: KeyDefinition[][] = [
  ["Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⌫"].map(
    (label, index) => ({
      label,
      code:
        index === 0
          ? "Escape"
          : index === 13
            ? "Backspace"
            : `Digit${label}`
                .replace("Digit-", "Minus")
                .replace("Digit=", "Equal"),
      width: index === 13 ? 1.55 : 1,
      color: index === 0 ? "#8fc9bc" : undefined,
    }),
  ),
  [
    { label: "Tab", code: "Tab", width: 1.35 },
    ..."QWERTYUIOP".split("").map((label) => ({ label, code: `Key${label}` })),
    { label: "[", code: "BracketLeft" },
    { label: "]", code: "BracketRight" },
    { label: "\\", code: "Backslash", width: 1.35 },
  ],
  [
    { label: "Caps", code: "CapsLock", width: 1.65 },
    ..."ASDFGHJKL".split("").map((label) => ({ label, code: `Key${label}` })),
    { label: ";", code: "Semicolon" },
    { label: "'", code: "Quote" },
    { label: "Enter", code: "Enter", width: 1.75, color: "#ef936e" },
  ],
  [
    { label: "Shift", code: "ShiftLeft", width: 2.05 },
    ..."ZXCVBNM".split("").map((label) => ({ label, code: `Key${label}` })),
    { label: ",", code: "Comma" },
    { label: ".", code: "Period" },
    { label: "/", code: "Slash" },
    { label: "Shift", code: "ShiftRight", width: 2.2 },
  ],
  [
    { label: "Ctrl", code: "ControlLeft", width: 1.25 },
    { label: "⌘", code: "MetaLeft", width: 1.2 },
    { label: "Alt", code: "AltLeft", width: 1.2 },
    { label: "space", code: "Space", width: 6.15, color: "#f2a276" },
    { label: "Alt", code: "AltRight", width: 1.2 },
    { label: "←", code: "ArrowLeft" },
    { label: "↑", code: "ArrowUp" },
    { label: "↓", code: "ArrowDown" },
    { label: "→", code: "ArrowRight" },
  ],
];
