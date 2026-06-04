import { AccessibilityIssue } from "../types/index.js";

// Each rule describes one thing to look for in the HTML string
// and what to report if found
interface CheckRule {
  id: string;
  test: (html: string) => boolean;
  issue: AccessibilityIssue;
}

const rules: CheckRule[] = [
  {
    id: "div-button",
    test: (html) =>
      /<div[^>]*onclick/i.test(html) ||
      /<span[^>]*onclick/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description: "A div or span is used as a button via onclick. These elements do not receive keyboard focus and are not announced as buttons by screen readers.",
      impact: "critical",
      fix: "Replace the div or span with a real <button> element. Buttons receive Tab focus and Enter/Space activation automatically.",
      learnMoreUrl: "https://wcaginpractice.com/playground#button"
    }
  },
  {
    id: "img-missing-alt",
    test: (html) =>
      /<img(?![^>]*\balt\s*=)[^>]*>/i.test(html),
    issue: {
      wcagRef: "WCAG 1.1.1",
      description: "An img element is missing the alt attribute entirely. Screen readers will announce the file name instead of a description.",
      impact: "critical",
      fix: "Add alt='description of image' for informative images. Add alt='' for decorative images so screen readers skip them.",
      learnMoreUrl: "https://wcaginpractice.com/playground#image"
    }
  },
  {
    id: "input-missing-label",
    test: (html) =>
      /<input[^>]*>/i.test(html) &&
      !/<label/i.test(html) &&
      !(/aria-label\s*=/i.test(html)) &&
      !(/aria-labelledby\s*=/i.test(html)),
    issue: {
      wcagRef: "WCAG 1.3.1",
      description: "An input element has no associated label. Screen reader users will not know what information to enter.",
      impact: "critical",
      fix: "Add a <label> with a matching htmlFor attribute, or add aria-label directly on the input element.",
      learnMoreUrl: "https://wcaginpractice.com/playground#form"
    }
  },
  {
    id: "dropdown-missing-aria-expanded",
    test: (html) =>
      (/<button[^>]*>/i.test(html) || /<div[^>]*>/i.test(html)) &&
      /<ul|<ol|<listbox|role\s*=\s*['"]listbox['"]/i.test(html) &&
      !/aria-expanded/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description: "A dropdown or menu is missing aria-expanded. Screen readers cannot tell users whether the menu is open or closed.",
      impact: "serious",
      fix: "Add aria-expanded='false' to the trigger button. Update it to aria-expanded='true' in JavaScript when the menu opens.",
      learnMoreUrl: "https://wcaginpractice.com/playground#dropdown"
    }
  },
  {
    id: "modal-missing-role-dialog",
    test: (html) =>
      /modal|dialog|overlay/i.test(html) &&
      !/role\s*=\s*['"]dialog['"]/i.test(html) &&
      !/role\s*=\s*['"]alertdialog['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description: "A modal or dialog element is missing role='dialog'. Screen readers will not announce it as a dialog and users will not know they are inside a modal.",
      impact: "serious",
      fix: "Add role='dialog' and aria-modal='true' to the modal container. Add aria-labelledby pointing to the modal heading.",
      learnMoreUrl: "https://wcaginpractice.com/playground#modal"
    }
  },
  {
    id: "form-missing-role-alert",
    test: (html) =>
      /error|invalid|required/i.test(html) &&
      !/role\s*=\s*['"]alert['"]/i.test(html) &&
      !/aria-live/i.test(html),
    issue: {
      wcagRef: "WCAG 1.3.1",
      description: "A form error message has no role='alert' or aria-live region. Screen readers will not announce the error when it appears.",
      impact: "serious",
      fix: "Add role='alert' to the error message container, or wrap it in an aria-live='polite' region so screen readers announce it automatically.",
      learnMoreUrl: "https://wcaginpractice.com/playground#form"
    }
  },
  {
    id: "table-missing-th",
    test: (html) =>
      /<table/i.test(html) &&
      !/<th/i.test(html),
    issue: {
      wcagRef: "WCAG 1.3.1",
      description: "A table has no th (header) elements. Screen readers cannot announce the column or row context for each cell.",
      impact: "serious",
      fix: "Add <th scope='col'> for column headers and <th scope='row'> for row headers. Add a <caption> to give the table an accessible name.",
      learnMoreUrl: "https://wcaginpractice.com/playground#table"
    }
  },
  {
    id: "accordion-missing-aria-expanded",
    test: (html) =>
      /accordion|disclosure|expand|collapse/i.test(html) &&
      !/aria-expanded/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description: "An accordion or disclosure widget is missing aria-expanded. Screen readers cannot announce whether panels are open or closed.",
      impact: "serious",
      fix: "Add aria-expanded='false' to each accordion trigger button. Toggle it to aria-expanded='true' when the panel opens.",
      learnMoreUrl: "https://wcaginpractice.com/playground#accordion"
    }
  },
  {
    id: "tabs-missing-role-tablist",
    test: (html) =>
      /tab/i.test(html) &&
      !/role\s*=\s*['"]tablist['"]/i.test(html) &&
      !/role\s*=\s*['"]tab['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 2.1.1",
      description: "A tabs component is missing role='tablist' and role='tab'. Screen readers will treat the tabs as plain links or buttons with no tab widget context.",
      impact: "serious",
      fix: "Add role='tablist' to the tab container, role='tab' to each trigger, aria-selected='true/false' to track the active tab, and role='tabpanel' to each panel.",
      learnMoreUrl: "https://wcaginpractice.com/playground#tabs"
    }
  },
  {
    id: "nav-missing-element",
    test: (html) =>
      /<div[^>]*(?:class|id)\s*=\s*['"][^'"]*nav[^'"]*['"]/i.test(html) &&
      !/<nav/i.test(html),
    issue: {
      wcagRef: "WCAG 2.4.1",
      description: "Navigation is implemented as a div instead of a nav element. Screen reader users cannot jump to navigation using landmark shortcuts.",
      impact: "moderate",
      fix: "Replace the div with a <nav> element. If there are multiple nav regions, add aria-label='Main navigation' and aria-label='Footer navigation' to distinguish them.",
      learnMoreUrl: "https://wcaginpractice.com/playground#navigation"
    }
  },
  {
    id: "live-region-missing",
    test: (html) =>
      /toast|notification|alert|status/i.test(html) &&
      !/aria-live/i.test(html) &&
      !/role\s*=\s*['"]alert['"]/i.test(html) &&
      !/role\s*=\s*['"]status['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.3",
      description: "A toast or notification element has no aria-live region. Screen reader users will not hear the message when it appears.",
      impact: "serious",
      fix: "Add aria-live='polite' and role='status' to the notification container. For urgent alerts, use aria-live='assertive' and role='alert'.",
      learnMoreUrl: "https://wcaginpractice.com/playground#toast"
    }
  },
  {
    id: "heading-skipped-level",
    test: (html) => {
      // Check for heading levels that skip (e.g. h1 then h3 with no h2)
      const levels = [1, 2, 3, 4, 5, 6].filter(n =>
        new RegExp(`<h${n}[\\s>]`, "i").test(html)
      );
      for (let i = 0; i < levels.length - 1; i++) {
        if (levels[i + 1] - levels[i] > 1) return true;
      }
      return false;
    },
    issue: {
      wcagRef: "WCAG 1.3.1",
      description: "Heading levels are skipped (for example h1 followed by h3 with no h2). Screen reader users navigating by heading will find the structure confusing.",
      impact: "moderate",
      fix: "Use headings in sequential order: h1, then h2, then h3. Never skip a level. Use CSS to control visual size, not heading level.",
      learnMoreUrl: "https://wcaginpractice.com/playground#headings"
    }
  }
];

// Main export: runs all rules against the provided HTML string
// Returns an array of issues found, or an empty array if none
export function checkComponent(html: string): {
  issueCount: number;
  issues: AccessibilityIssue[];
  summary: string;
} {
  if (!html || html.trim().length === 0) {
    return {
      issueCount: 0,
      issues: [],
      summary: "No HTML provided. Pass an HTML snippet to check for accessibility issues."
    };
  }

  const found = rules
    .filter(rule => rule.test(html))
    .map(rule => rule.issue);

  const criticalCount = found.filter(i => i.impact === "critical").length;
  const seriousCount = found.filter(i => i.impact === "serious").length;
  const moderateCount = found.filter(i => i.impact === "moderate").length;

  let summary = "";
  if (found.length === 0) {
    summary = "No common accessibility issues detected in this snippet. For a full audit, also test with axe-core and keyboard navigation.";
  } else {
    const parts = [];
    if (criticalCount > 0) parts.push(`${criticalCount} critical`);
    if (seriousCount > 0) parts.push(`${seriousCount} serious`);
    if (moderateCount > 0) parts.push(`${moderateCount} moderate`);
    summary = `Found ${found.length} accessibility issue${found.length > 1 ? "s" : ""}: ${parts.join(", ")}. Review each issue and apply the suggested fix.`;
  }

  return {
    issueCount: found.length,
    issues: found,
    summary
  };
}
