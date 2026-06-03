// What a single WCAG pattern looks like
export interface Pattern {
  id: string;           // e.g. "dropdown"
  name: string;         // e.g. "Dropdown Menu"
  wcagRef: string;      // e.g. "WCAG 2.1.1"
  wcagUrl: string;      // link to W3C spec
  summary: string;      // one sentence description
  plainSummary: string; // plain language for non-devs
  whoIsAffected: string[];
  designerNote: string;
  commonMistake: string;
  accessiblePattern: string;
  badPoints: string[];
  goodPoints: string[];
  impact: string;
  howToTest: string;
  learnMoreUrl: string; // link to wcaginpractice.com
}

// What the check_component tool returns
export interface AccessibilityIssue {
  wcagRef: string;
  description: string;
  impact: "critical" | "serious" | "moderate" | "minor";
  fix: string;
  learnMoreUrl: string;
}

// What the suggest_fix tool returns
export interface FixSuggestion {
  originalCode: string;
  fixedCode: string;
  explanation: string;
  wcagRef: string;
  learnMoreUrl: string;
}
