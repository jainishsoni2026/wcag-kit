import { Pattern } from "../types/index.js";

export const patterns: Pattern[] = [
  {
    id: "dropdown",
    name: "Dropdown Menu",
    wcagRef: "WCAG 2.1.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
    summary: "Custom menus must work with keyboard and expose correct ARIA roles.",
    plainSummary: "A dropdown is a button that opens a list of options. Without the right code, keyboard users and screen reader users cannot open it or navigate the choices.",
    whoIsAffected: [
      "Keyboard-only users",
      "Blind and low-vision users",
      "People with motor disabilities who do not use a mouse"
    ],
    designerNote: "If your design shows a styled div or box as the trigger instead of a button, flag it. The trigger must be a real button element.",
    commonMistake: "Div-based trigger with no keyboard support: Tab skips it and screen readers announce only group.",
    accessiblePattern: "Button with aria-haspopup, aria-expanded, and listbox options navigable via Enter, arrows, and Escape.",
    badPoints: [
      "Cannot be opened or navigated with a keyboard",
      "Screen readers announce it as a generic group with no context",
      "No aria-expanded so assistive tech cannot tell if it is open",
      "Arrow keys and Escape do nothing",
      "Violates WCAG 2.1.1 and 4.1.2"
    ],
    goodPoints: [
      "Fully keyboard navigable: Tab, Enter, arrows, and Escape",
      "Screen reader announces: Select country, collapsed, button",
      "aria-expanded updates when the menu opens or closes",
      "aria-selected tracks the highlighted option",
      "Meets WCAG 2.1.1 and 4.1.2"
    ],
    impact: "Custom dropdowns are one of the most common accessibility failures. Keyboard-only users cannot use a menu that relies on mouse clicks alone.",
    howToTest: "Tab to the menu, press Enter to open it, use Arrow Down and Arrow Up to move, Enter to select, and Escape to close.",
    learnMoreUrl: "https://wcaginpractice.com/playground#dropdown"
  },
  {
    id: "modal",
    name: "Modal / Dialog",
    wcagRef: "WCAG 2.1.2",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html",
    summary: "Dialogs must trap focus, announce themselves, and return focus on close.",
    plainSummary: "A modal is a popup window that appears over the page. Without the right code, keyboard users get trapped behind it or cannot interact with it at all.",
    whoIsAffected: [
      "Keyboard-only users",
      "Screen reader users",
      "People with cognitive disabilities who rely on clear focus"
    ],
    designerNote: "Every modal needs a visible close button and must return the user to where they were before the modal opened. Design for the exit, not just the entry.",
    commonMistake: "No focus trap or role=dialog: Tab escapes behind the modal and Escape does nothing.",
    accessiblePattern: "Dialog with aria-modal, focus trap, Escape to close, and focus returned to the trigger.",
    badPoints: [
      "Tab escapes the modal into the page behind it",
      "Screen readers can still reach background content",
      "No role=dialog so it is not announced as a dialog",
      "Escape does nothing",
      "Focus does not return to the trigger on close"
    ],
    goodPoints: [
      "Focus stays inside the modal while it is open",
      "Screen reader announces the dialog title",
      "Escape closes the modal and returns focus to the trigger",
      "Background content is hidden via aria-modal",
      "Meets WCAG 2.1.2 and 4.1.2"
    ],
    impact: "A modal without a focus trap is a dead end for keyboard users. Once focus moves behind the overlay, there is no clear way back.",
    howToTest: "Open the bad modal and press Tab to see focus leave. Open the good modal and confirm Tab cycles inside until you press Escape.",
    learnMoreUrl: "https://wcaginpractice.com/playground#modal"
  },
  {
    id: "form",
    name: "Form Validation",
    wcagRef: "WCAG 1.3.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    summary: "Errors must be linked to fields and announced to assistive technology.",
    plainSummary: "Form validation tells users what went wrong when they submit a form. Without the right code, screen reader users submit a form and hear nothing.",
    whoIsAffected: [
      "Blind and low-vision users",
      "Screen reader users",
      "People with colour blindness if errors use colour only"
    ],
    designerNote: "Never use colour alone to show an error. Always pair it with an icon and text. Every error message must appear next to the field it describes.",
    commonMistake: "Red text only, no role=alert: screen readers stay silent and labels are not linked to inputs.",
    accessiblePattern: "htmlFor, aria-invalid, aria-describedby, and role=alert so errors are announced immediately.",
    badPoints: [
      "Label and input are not linked, screen readers cannot associate them",
      "Error uses red colour only",
      "No role=alert, screen readers stay completely silent",
      "aria-invalid is missing",
      "type=text misses email-specific validation"
    ],
    goodPoints: [
      "htmlFor links label to input",
      "Error uses an icon AND text, not colour alone",
      "role=alert causes the screen reader to announce the error immediately",
      "aria-invalid=true tells screen readers the field contains an error",
      "type=email gives mobile users the correct keyboard"
    ],
    impact: "Form errors are the most common barrier for screen reader users on e-commerce and sign-up flows.",
    howToTest: "Tab into the bad form, submit without an email, and listen. Your screen reader says nothing. Do the same in the good form.",
    learnMoreUrl: "https://wcaginpractice.com/playground#form"
  },
  {
    id: "headings",
    name: "Heading Hierarchy",
    wcagRef: "WCAG 1.3.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    summary: "Headings must use real h1-h6 elements in order so screen reader users can skim the page.",
    plainSummary: "Headings are the invisible table of contents for a page. Screen reader users navigate by jumping between headings. If the structure is broken, they get lost.",
    whoIsAffected: [
      "Blind and low-vision users",
      "Screen reader users",
      "People with cognitive disabilities who rely on clear structure"
    ],
    designerNote: "Do not choose heading levels based on how big you want the text to look. Use CSS for size. Headings should reflect the page structure: one H1, then H2 for sections, H3 for subsections.",
    commonMistake: "Bold paragraphs as fake headings, skipped levels (h1 then h4), or multiple h1s on one page.",
    accessiblePattern: "One h1 per page, then h2 for sections and h3 for subsections. Never skip a level for styling.",
    badPoints: [
      "Bold or large text used instead of heading elements",
      "Skipped levels break the mental model of page structure",
      "Multiple h1 elements suggest several unrelated pages",
      "Screen reader users cannot jump by section"
    ],
    goodPoints: [
      "One h1 describes the main purpose of the page",
      "h2 marks major sections, h3 marks subsections",
      "Visual size comes from CSS not from heading levels",
      "Meets WCAG 1.3.1 and 2.4.6"
    ],
    impact: "Screen reader users navigate by headings. A broken outline means they hear a flat wall of text or jump to the wrong section.",
    howToTest: "Open your screen reader heading list. Compare the bad example chaotic list to the good example h1 to h2 to h3 tree.",
    learnMoreUrl: "https://wcaginpractice.com/playground#headings"
  }
];

// Helper: find a pattern by id
export function getPatternById(id: string): Pattern | undefined {
  return patterns.find(p => p.id === id);
}
