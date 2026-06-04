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
    id: "breadcrumb-missing-landmark",
    test: (html) =>
      (/breadcrumb|breadcrumbs/i.test(html) ||
        (/>\s*\/\s*</.test(html) && /home|products|category/i.test(html))) &&
      !/aria-label\s*=\s*['"]breadcrumb['"]/i.test(html) &&
      (!/<nav/i.test(html) || !/breadcrumb/i.test(html)),
    issue: {
      wcagRef: "WCAG 2.4.8",
      description: "A breadcrumb trail is not wrapped in a nav landmark labelled Breadcrumb. Screen reader users cannot distinguish it from other navigation or identify the current page.",
      impact: "serious",
      fix: 'Wrap the trail in <nav aria-label="Breadcrumb"><ol>…</ol></nav>. Use links for parent pages only. Mark the current page with aria-current="page" as plain text. Hide "/" separators with aria-hidden="true".',
      learnMoreUrl: "https://wcaginpractice.com/playground#breadcrumb"
    }
  },
  {
    id: "alertdialog-missing-role",
    test: (html) =>
      (/confirm|delete account|destructive|are you sure|discard changes/i.test(html) ||
        /alert.?dialog|confirmation/i.test(html)) &&
      !/role\s*=\s*['"]alertdialog['"]/i.test(html) &&
      (/role\s*=\s*['"]dialog['"]/i.test(html) ||
        /<div[^>]*(?:confirm|delete|modal)/i.test(html)),
    issue: {
      wcagRef: "WCAG 2.1.2",
      description: "A destructive confirmation uses a plain div or role=dialog instead of role=alertdialog. Screen readers may not convey that an immediate response is required.",
      impact: "critical",
      fix: "Use role=\"alertdialog\" with aria-modal=\"true\", aria-labelledby, and aria-describedby. Move focus to the Cancel button on open, trap Tab inside, and close on Escape without performing the destructive action.",
      learnMoreUrl: "https://wcaginpractice.com/playground#alertdialog"
    }
  },
  {
    id: "fileupload-hidden-input",
    test: (html) =>
      (/type\s*=\s*['"]file['"]/i.test(html) || /file.?upload|upload/i.test(html)) &&
      (/display\s*:\s*none|display\s*:\s*['"]none['"]/i.test(html) ||
        /visibility\s*:\s*hidden/i.test(html)) &&
      /<div[^>]*upload/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description: "A file input is hidden with display:none or similar and replaced by a non-focusable styled element. Keyboard and screen reader users cannot activate the file picker.",
      impact: "critical",
      fix: "Keep the native input in the tab order (visually hidden with opacity/clip, not display:none). Use a <label for=\"...\"> as the styled button. Announce the chosen file name with aria-live after selection.",
      learnMoreUrl: "https://wcaginpractice.com/playground#fileupload"
    }
  },
  {
    id: "infinitescroll-missing-live",
    test: (html) =>
      (/load more|infinite.?scroll|lazy.?load/i.test(html) ||
        (/scroll/i.test(html) && /fetch|append|inject/i.test(html))) &&
      !/aria-live/i.test(html) &&
      !/role\s*=\s*['"]status['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.3",
      description: "Content loads dynamically (infinite scroll or load more) with no aria-live region. Screen reader users are not told when new items appear or when loading finishes.",
      impact: "serious",
      fix: "Use a Load More button with aria-live=polite to announce loading and results (e.g. 10 new items loaded, 30 total). Keep focus on the button after load. Provide a keyboard-accessible alternative to scroll-only loading.",
      learnMoreUrl: "https://wcaginpractice.com/playground#infinitescroll"
    }
  },
  {
    id: "search-missing-label",
    test: (html) =>
      (/type\s*=\s*['"]search['"]/i.test(html) ||
        (/search/i.test(html) && /<input/i.test(html))) &&
      !/<label/i.test(html) &&
      !(/aria-label\s*=/i.test(html)) &&
      (/placeholder\s*=/i.test(html) || !/role\s*=\s*['"]search['"]/i.test(html)),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description: "A search input has no visible label or aria-label, or is not wrapped in a search landmark. Screen reader users may hear an unlabelled edit field and cannot jump to search via landmarks.",
      impact: "serious",
      fix: "Wrap in <form role=\"search\"> or use aria-label on the form. Add a visible <label> or aria-label=\"Search\" on the input. Give the submit button aria-label=\"Submit search\".",
      learnMoreUrl: "https://wcaginpractice.com/playground#search"
    }
  },
  {
    id: "radiocheckbox-missing-fieldset",
    test: (html) => {
      const hasRadioOrCheckbox =
        /type\s*=\s*['"]radio['"]/i.test(html) ||
        /type\s*=\s*['"]checkbox['"]/i.test(html);
      if (!hasRadioOrCheckbox) return false;
      const count = (html.match(/type\s*=\s*['"]radio['"]/gi) || []).length +
        (html.match(/type\s*=\s*['"]checkbox['"]/gi) || []).length;
      if (count < 2) return false;
      return !/<fieldset/i.test(html);
    },
    issue: {
      wcagRef: "WCAG 1.3.1",
      description: "Multiple radio buttons or checkboxes are not wrapped in a fieldset with a legend. Screen reader users hear each option without the group question or context.",
      impact: "serious",
      fix: "Wrap the group in <fieldset> with a <legend> describing the question. Link each input to its label with htmlFor/id. Use the same name attribute for radio options in one group.",
      learnMoreUrl: "https://wcaginpractice.com/playground#radiocheckbox"
    }
  },
  {
    id: "dragdrop-no-keyboard-alternative",
    test: (html) =>
      (/draggable|drag-and-drop|dragdrop|sortable|kanban/i.test(html) ||
        /ondrag|dragstart/i.test(html)) &&
      !/move up|move down|aria-keyshortcuts|keyboard/i.test(html) &&
      !/<button[^>]*(?:up|down|move)/i.test(html),
    issue: {
      wcagRef: "WCAG 2.5.7",
      description: "A drag-and-drop or reorder interface appears to have no keyboard alternative. Users who cannot drag with a pointer cannot complete the same action.",
      impact: "critical",
      fix: "Provide buttons to move items up, down, or to a target. Announce new position with aria-live and aria-describedby. Keep pointer drag as an optional enhancement.",
      learnMoreUrl: "https://wcaginpractice.com/playground#dragdrop"
    }
  },
  {
    id: "pagination-missing-nav",
    test: (html) =>
      (/pagination|page-\d|pager/i.test(html) || /next|previous/i.test(html) && /page/i.test(html)) &&
      !/<nav/i.test(html) &&
      (/pagination|pager/i.test(html) || /<a[^>]*>\s*\d+\s*<\/a>/i.test(html)),
    issue: {
      wcagRef: "WCAG 2.4.1",
      description: "Pagination controls are not wrapped in a nav landmark with aria-label. Screen reader users cannot identify or jump to the pagination region quickly.",
      impact: "moderate",
      fix: "Wrap pagination in <nav aria-label=\"Pagination\">. Mark the current page with aria-current=\"page\" as a span (not a link). Add aria-label to Previous and Next controls.",
      learnMoreUrl: "https://wcaginpractice.com/playground#pagination"
    }
  },
  {
    id: "pagination-missing-current",
    test: (html) =>
      /<nav/i.test(html) &&
      /pagination|pager/i.test(html) &&
      !/aria-current\s*=\s*['"]page['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description: "Pagination is present but the current page is not marked with aria-current=page. Screen reader users cannot tell which page they are on.",
      impact: "moderate",
      fix: "Use <span aria-current=\"page\"> for the current page number instead of a link. Keep other pages as links.",
      learnMoreUrl: "https://wcaginpractice.com/playground#pagination"
    }
  },
  {
    id: "progress-missing-aria",
    test: (html) =>
      (/progress|loading|spinner|uploading/i.test(html)) &&
      !/role\s*=\s*['"]progressbar['"]/i.test(html) &&
      !/aria-live/i.test(html) &&
      !/role\s*=\s*['"]status['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.3",
      description: "A progress or loading indicator has no role=progressbar, aria-valuenow, aria-label, or live region. Screen reader users receive no feedback while waiting or when the task completes.",
      impact: "serious",
      fix: "For known progress: role=progressbar with aria-valuenow, aria-valuemin, aria-valuemax, and aria-label. For indeterminate loading: aria-live=polite and role=status with a text label. Announce completion when done.",
      learnMoreUrl: "https://wcaginpractice.com/playground#progress"
    }
  },
  {
    id: "carousel-missing-controls",
    test: (html) => {
      if (!/carousel|slideshow|slider/i.test(html)) return false;
      const hasAutoPlay = /autoplay|auto-play|setInterval/i.test(html);
      const missingPause = hasAutoPlay && !/pause/i.test(html);
      const divNav = /<div[^>]*(?:prev|next|previous)/i.test(html) &&
        !/<button[^>]*(?:prev|next|previous)/i.test(html);
      const slidesNoLive = /slide/i.test(html) && !/aria-live/i.test(html);
      return missingPause || divNav || slidesNoLive;
    },
    issue: {
      wcagRef: "WCAG 2.1.1",
      description: "A carousel or slideshow appears to lack accessible controls: no pause for auto-play, non-button prev/next, or no live region for slide changes.",
      impact: "serious",
      fix: "Add a keyboard-accessible Pause button, use real buttons for Previous/Next with aria-labels, label each slide (e.g. Slide 2 of 4), and use aria-live=polite for announcements. Pause auto-play on focus and hover.",
      learnMoreUrl: "https://wcaginpractice.com/playground#carousel"
    }
  },
  {
    id: "datepicker-missing-keyboard",
    test: (html) =>
      (/datepicker|calendar|date-picker/i.test(html) ||
        (/role\s*=\s*['"]grid['"]/i.test(html) && /date/i.test(html))) &&
      !/aria-selected/i.test(html) &&
      !/<table/i.test(html),
    issue: {
      wcagRef: "WCAG 2.1.1",
      description: "A date picker or calendar grid appears to lack keyboard grid navigation and aria-selected for the chosen date. Users may have to Tab through every date cell individually.",
      impact: "serious",
      fix: "Use a table or grid with Arrow key navigation, aria-selected on the chosen date, Enter/Space to select, and a labelled text input fallback (e.g. type=date or format hint).",
      learnMoreUrl: "https://wcaginpractice.com/playground#datepicker"
    }
  },
  {
    id: "tooltip-missing-aria",
    test: (html) =>
      /tooltip|popover|hint/i.test(html) &&
      !/role\s*=\s*['"]tooltip['"]/i.test(html) &&
      !/aria-describedby/i.test(html),
    issue: {
      wcagRef: "WCAG 1.4.13",
      description: "Tooltip content is present but missing role=tooltip and aria-describedby on the trigger. Keyboard users may not see hover-only tooltips and screen readers may not announce the extra information.",
      impact: "serious",
      fix: "Add role=tooltip to the tooltip element and aria-describedby on the trigger pointing to the tooltip id. Show the tooltip on focus and hover. Allow Escape to dismiss it without moving focus.",
      learnMoreUrl: "https://wcaginpractice.com/playground#tooltip"
    }
  },
  {
    id: "combobox-missing-aria",
    test: (html) =>
      /<input[^>]*>/i.test(html) &&
      (/<ul|<ol|suggestion|autocomplete|listbox/i.test(html)) &&
      !/role\s*=\s*['"]combobox['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 2.1.1",
      description: "An autocomplete or combobox input is missing role=combobox and related ARIA. Screen readers treat it as a plain text field and keyboard users cannot navigate suggestions.",
      impact: "serious",
      fix: "Add role=combobox, aria-expanded, aria-autocomplete=list, and aria-controls pointing to the listbox id. Use role=listbox on the list and role=option on each suggestion. Support Arrow keys, Enter, and Escape.",
      learnMoreUrl: "https://wcaginpractice.com/playground#combobox"
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
  },
  {
    id: "radiocheckbox",
    test: (html) =>
      (/type\s*=\s*['"]radio['"]/i.test(html) ||
        /type\s*=\s*['"]checkbox['"]/i.test(html)) &&
      !/<fieldset/i.test(html),
    issue: {
      wcagRef: "WCAG 1.3.1",
      description:
        "Radio buttons or checkboxes are present with no fieldset and legend. Screen reader users will hear each option label in isolation with no context about what they are choosing.",
      impact: "serious",
      fix:
        "Wrap the group in a fieldset element and add a legend that describes the group question. This links the group label to every input inside it.",
      learnMoreUrl: "https://wcaginpractice.com/playground#radiocheckbox"
    }
  },
  {
    id: "search-missing-role",
    test: (html) =>
      /type\s*=\s*['"]search['"]/i.test(html) &&
      !/role\s*=\s*['"]search['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description:
        "A search input is present but no role=search landmark exists. Screen reader users cannot jump directly to search using landmark navigation shortcuts.",
      impact: "moderate",
      fix:
        "Add role=search to the form element wrapping the search input. This creates a search landmark that screen reader users can navigate to directly.",
      learnMoreUrl: "https://wcaginpractice.com/playground#search"
    }
  },
  {
    id: "file-input-hidden",
    test: (html) =>
      /type\s*=\s*['"]file['"]/i.test(html) &&
      (/display\s*:\s*none|display\s*:\s*['"]none['"]|visibility\s*:\s*hidden/i.test(
        html
      )),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description:
        "A file input is hidden with display:none or visibility:hidden. This removes it from keyboard access entirely. Screen reader users and keyboard users cannot activate the file picker.",
      impact: "critical",
      fix:
        "Use opacity:0 and position:absolute to visually hide the input while keeping it accessible. Never use display:none or visibility:hidden on a file input.",
      learnMoreUrl: "https://wcaginpractice.com/playground#fileupload"
    }
  },
  {
    id: "alertdialog-missing-role",
    test: (html) =>
      (/confirm|delete|warning|destructive|are you sure/i.test(html)) &&
      /role\s*=\s*['"]dialog['"]/i.test(html) &&
      !/role\s*=\s*['"]alertdialog['"]/i.test(html),
    issue: {
      wcagRef: "WCAG 4.1.2",
      description:
        "A confirmation or warning dialog uses role=dialog instead of role=alertdialog. Screen reader users will not be informed of the urgent and interactive nature of the prompt.",
      impact: "serious",
      fix:
        "Replace role=dialog with role=alertdialog for any dialog that requires an immediate response from the user. Add aria-describedby pointing to the warning message.",
      learnMoreUrl: "https://wcaginpractice.com/playground#alertdialog"
    }
  },
  {
    id: "breadcrumb-missing-label",
    test: (html) => {
      if (!/<nav/i.test(html)) return false;
      const hasBreadcrumbRef =
        /class\s*=\s*['"][^'"]*breadcrumb[^'"]*['"]/i.test(html) ||
        /id\s*=\s*['"][^'"]*breadcrumb[^'"]*['"]/i.test(html) ||
        /aria-label\s*=\s*['"][^'"]*breadcrumb[^'"]*['"]/i.test(html);
      if (!hasBreadcrumbRef) return false;
      return !/<nav[^>]*\baria-label\s*=/i.test(html);
    },
    issue: {
      wcagRef: "WCAG 2.4.8",
      description:
        "A breadcrumb navigation exists but the nav element has no aria-label. Screen reader users cannot distinguish it from other navigation landmarks on the page.",
      impact: "moderate",
      fix:
        "Add aria-label='Breadcrumb' to the nav element wrapping the breadcrumb links. This makes it a distinct and identifiable landmark.",
      learnMoreUrl: "https://wcaginpractice.com/playground#breadcrumb"
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
