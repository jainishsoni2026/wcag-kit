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
  },
  {
    id: "button",
    name: "Button Accessibility",
    wcagRef: "WCAG 4.1.2",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    summary: "Buttons must use the real button element and have a descriptive accessible name.",
    plainSummary: "A button tells a screen reader user what action will happen when they press it. A div or span styled to look like a button is invisible to assistive technology.",
    whoIsAffected: [
      "Screen reader users",
      "Keyboard-only users",
      "Voice control users who activate buttons by speaking their name"
    ],
    designerNote: "If your design uses a div or span as a clickable element, flag it in review. Only real button or a elements get keyboard focus by default.",
    commonMistake: "Using a div with an onClick handler instead of a button element. It looks identical visually but fails completely for keyboard and screen reader users.",
    accessiblePattern: "Use a real button element. Add aria-label when the visible text is not descriptive enough, such as on icon-only buttons.",
    badPoints: [
      "div element does not receive Tab focus",
      "Screen reader announces it as a generic group, not a button",
      "No keyboard activation with Enter or Space",
      "Voice control users cannot say the button name to activate it",
      "Violates WCAG 4.1.2"
    ],
    goodPoints: [
      "button element receives Tab focus automatically",
      "Screen reader announces it as a button with its name",
      "Enter and Space both activate it",
      "Icon-only button uses aria-label to provide a name",
      "Meets WCAG 4.1.2"
    ],
    impact: "Div-based buttons are one of the most frequent WCAG failures in production apps. They break keyboard navigation entirely.",
    howToTest: "Press Tab to reach the button. Press Enter and Space to activate it. Use a screen reader and confirm it is announced as a button with a name.",
    learnMoreUrl: "https://wcaginpractice.com/playground#button"
  },
  {
    id: "image",
    name: "Image Alt Text",
    wcagRef: "WCAG 1.1.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
    summary: "Every informative image needs alt text. Decorative images need an empty alt attribute.",
    plainSummary: "Alt text is what a screen reader reads aloud when it reaches an image. Without it, blind users hear the file name or nothing at all.",
    whoIsAffected: [
      "Blind and low-vision users",
      "Users on slow connections where images do not load",
      "Search engines that index image content"
    ],
    designerNote: "Decide for each image: is it informative or decorative? Informative images need a description. Decorative images should be hidden from screen readers with alt=''.",
    commonMistake: "Missing alt attribute entirely, or using the file name as alt text (e.g., alt='IMG_4392.jpg').",
    accessiblePattern: "Informative images get descriptive alt text that conveys their meaning. Decorative images get alt='' so screen readers skip them.",
    badPoints: [
      "Missing alt attribute causes screen readers to announce the file name",
      "No description means blind users get no information from the image",
      "Decorative images without alt='' clutter the screen reader experience",
      "Violates WCAG 1.1.1"
    ],
    goodPoints: [
      "Descriptive alt text conveys the same information as the image",
      "Decorative images use alt='' so screen readers skip them",
      "Complex images like charts include a full text description nearby",
      "Meets WCAG 1.1.1"
    ],
    impact: "Missing alt text is the most common WCAG failure on the web. It completely blocks image content for blind users.",
    howToTest: "Disable images in your browser. Read what remains. Turn on a screen reader and navigate to each image and listen to what is announced.",
    learnMoreUrl: "https://wcaginpractice.com/playground#image"
  },
  {
    id: "contrast",
    name: "Color Contrast",
    wcagRef: "WCAG 1.4.3",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    summary: "Text must have a contrast ratio of at least 4.5:1 against its background.",
    plainSummary: "Contrast is how easy it is to read text against its background. Low contrast is the most common barrier for users with low vision and a frequent issue in dark mode and light grey designs.",
    whoIsAffected: [
      "Users with low vision",
      "Colour blind users",
      "All users in bright sunlight or on low-quality screens"
    ],
    designerNote: "Light grey text on white is a common design trend that fails WCAG. Run every text colour through a contrast checker before finalizing the design.",
    commonMistake: "Light grey body text on white background, or white text on a medium-blue button that looks fine on a calibrated monitor but fails on cheaper screens.",
    accessiblePattern: "Body text needs 4.5:1 contrast. Large text (18pt or 14pt bold) needs 3:1. Use a contrast checker during design, not after.",
    badPoints: [
      "Light grey text on white fails the 4.5:1 minimum",
      "Low contrast placeholder text is unreadable for low-vision users",
      "Looks fine on a designer's monitor but fails in real conditions",
      "Violates WCAG 1.4.3"
    ],
    goodPoints: [
      "Dark text on white background exceeds 4.5:1",
      "Large text meets the relaxed 3:1 threshold",
      "Contrast checked during design not after build",
      "Meets WCAG 1.4.3"
    ],
    impact: "Low contrast is the single most common WCAG failure found in automated audits. It affects 8% of men and 0.5% of women with colour blindness.",
    howToTest: "Use the browser's accessibility inspector or WebAIM Contrast Checker. Paste your foreground and background hex values and check the ratio.",
    learnMoreUrl: "https://wcaginpractice.com/playground#contrast"
  },
  {
    id: "navigation",
    name: "Navigation Landmark",
    wcagRef: "WCAG 2.4.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html",
    summary: "Use the nav element and label multiple navs so screen reader users can jump to the right one.",
    plainSummary: "Screen reader users navigate by landmarks. A nav element acts as a signpost. Without it, they cannot jump directly to the navigation and must listen to the whole page.",
    whoIsAffected: [
      "Screen reader users",
      "Keyboard-only users",
      "Users of browser extensions that expose landmark navigation"
    ],
    designerNote: "Every distinct navigation block needs a nav element. If there are two navs on the page, each needs an aria-label so users can tell them apart.",
    commonMistake: "Using a div instead of nav, or having two nav elements with no aria-label so they both announce as navigation.",
    accessiblePattern: "Use nav element for all navigation blocks. Add aria-label='Main navigation' and aria-label='Footer navigation' when more than one nav exists.",
    badPoints: [
      "div element is not a navigation landmark",
      "Screen reader users cannot jump to navigation",
      "Multiple unlabelled nav elements are indistinguishable",
      "Violates WCAG 2.4.1"
    ],
    goodPoints: [
      "nav element creates a navigation landmark",
      "aria-label distinguishes multiple nav regions",
      "Screen reader announces: Main navigation, navigation",
      "Users can jump directly to navigation with a single keystroke",
      "Meets WCAG 2.4.1"
    ],
    impact: "Without landmarks, screen reader users must listen to the entire page to find the navigation. Landmarks make sites dramatically faster to use.",
    howToTest: "Open NVDA or VoiceOver and use the landmark navigation shortcut. Confirm you can jump directly to the nav. Check that two navs have distinct labels.",
    learnMoreUrl: "https://wcaginpractice.com/playground#navigation"
  },
  {
    id: "accordion",
    name: "Accordion / Disclosure",
    wcagRef: "WCAG 4.1.2",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    summary: "Accordion triggers must be buttons with aria-expanded and panels must be linked by aria-controls.",
    plainSummary: "An accordion hides and shows sections of content. Without the right code, screen reader users cannot tell which panels are open or closed, and keyboard users may not be able to open them at all.",
    whoIsAffected: [
      "Screen reader users who need to know if a section is expanded",
      "Keyboard-only users",
      "Users with cognitive disabilities who rely on clear state"
    ],
    designerNote: "The trigger for each panel must be a button, not a div or a styled span. The open or closed state must be visible both visually and in code.",
    commonMistake: "Div trigger with no aria-expanded: clicking opens the panel visually but screen readers announce no state change.",
    accessiblePattern: "button with aria-expanded='true/false' and aria-controls pointing to the panel id. Panel has matching id.",
    badPoints: [
      "div trigger cannot be reached by Tab",
      "No aria-expanded so screen readers cannot announce open or closed",
      "No aria-controls so the trigger and panel are not linked",
      "Keyboard users cannot operate the accordion",
      "Violates WCAG 4.1.2"
    ],
    goodPoints: [
      "button trigger receives Tab focus",
      "aria-expanded updates to true when panel opens, false when it closes",
      "aria-controls links the button to its panel by id",
      "Enter and Space both toggle the panel",
      "Meets WCAG 4.1.2"
    ],
    impact: "Accordions are widely used for FAQs and settings panels. A missing aria-expanded means blind users never know which sections contain content.",
    howToTest: "Tab to each trigger and press Enter. Listen for the screen reader to announce expanded or collapsed. Tab into the open panel and confirm the content is reachable.",
    learnMoreUrl: "https://wcaginpractice.com/playground#accordion"
  },
  {
    id: "tabs",
    name: "Tabs Component",
    wcagRef: "WCAG 2.1.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
    summary: "Tab lists need role=tablist, each tab needs role=tab with aria-selected, and Arrow keys move between tabs.",
    plainSummary: "A tabs component switches between panels of content. The keyboard pattern is specific: Tab moves into the tab list, then Arrow keys move between tabs. Without this, keyboard users either cannot reach all tabs or must Tab through every single one.",
    whoIsAffected: [
      "Keyboard-only users",
      "Screen reader users",
      "Users who navigate by keyboard for speed"
    ],
    designerNote: "Tabs look similar to navigation but use a different keyboard pattern. Tab key enters and exits the tab list. Arrow keys move within it. Make sure your design accounts for a visible selected state.",
    commonMistake: "Making each tab a link or button that only responds to Tab key, forcing users to press Tab many times to reach content. No role=tablist or aria-selected.",
    accessiblePattern: "role=tablist on the container, role=tab on each trigger, aria-selected on the active tab, Arrow Left and Arrow Right to move between tabs, role=tabpanel on each panel.",
    badPoints: [
      "No role=tablist so screen readers do not understand the widget",
      "Tab key moves through every tab instead of Arrow keys",
      "No aria-selected so users cannot tell which tab is active",
      "Panels have no role=tabpanel",
      "Violates WCAG 2.1.1"
    ],
    goodPoints: [
      "role=tablist groups the tabs as a widget",
      "Arrow Left and Arrow Right move between tabs",
      "aria-selected=true marks the active tab",
      "Tab moves focus into the active panel",
      "Meets WCAG 2.1.1 and 4.1.2"
    ],
    impact: "Tabs without the correct ARIA pattern confuse screen reader users and force keyboard users to Tab through every tab on the page to reach the content they want.",
    howToTest: "Tab into the tab list. Press Arrow Right to move to the next tab. Press Tab to move into the panel. Confirm a screen reader announces each tab name and its selected state.",
    learnMoreUrl: "https://wcaginpractice.com/playground#tabs"
  },
  {
    id: "toast",
    name: "Toast / Live Region",
    wcagRef: "WCAG 4.1.3",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
    summary: "Status messages that appear without a focus change must use aria-live so screen readers announce them.",
    plainSummary: "A toast is a small message that appears on screen after an action, like Saved successfully. Sighted users see it appear. Screen reader users hear nothing unless you use an aria-live region.",
    whoIsAffected: [
      "Screen reader users who cannot see the toast appear",
      "Blind users completing form submissions or actions"
    ],
    designerNote: "Every status message that appears without moving focus needs an aria-live region. polite waits for the user to finish speaking before announcing. assertive interrupts immediately. Use polite for most toasts.",
    commonMistake: "Injecting a toast into the DOM with no aria-live attribute. The message appears visually but the screen reader never announces it.",
    accessiblePattern: "A persistent aria-live='polite' region in the DOM. When a toast fires, inject the message text into this region. Screen readers announce it automatically.",
    badPoints: [
      "Toast appears in the DOM but has no aria-live",
      "Screen readers do not announce the message",
      "Blind users complete an action and receive no confirmation",
      "Violates WCAG 4.1.3"
    ],
    goodPoints: [
      "aria-live='polite' region is always present in the DOM",
      "Message is injected into the region when the action completes",
      "Screen reader announces the message at the next pause",
      "role=status provides additional semantic context",
      "Meets WCAG 4.1.3"
    ],
    impact: "Without live regions, blind users submit forms, trigger saves, or complete purchases and receive no feedback at all. This is a critical gap in transactional interfaces.",
    howToTest: "Turn on a screen reader, trigger the action, and listen. In the bad example you hear nothing. In the good example the confirmation message is announced.",
    learnMoreUrl: "https://wcaginpractice.com/playground#toast"
  },
  {
    id: "table",
    name: "Data Table",
    wcagRef: "WCAG 1.3.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    summary: "Tables need th elements with scope, a caption, and proper header associations so screen readers can announce the column and row context for each cell.",
    plainSummary: "A data table organises information in rows and columns. Without proper markup, screen readers read each cell in isolation with no context about what column or row it belongs to.",
    whoIsAffected: [
      "Screen reader users reading data",
      "Blind users comparing values across rows and columns"
    ],
    designerNote: "Use real table elements for tabular data. Never use CSS grid or divs to create a visual table layout, because those cannot be navigated by screen readers as a table.",
    commonMistake: "Using td for all cells including headers, omitting scope attributes, and omitting a caption. Screen readers read cells as a flat list with no column context.",
    accessiblePattern: "th scope='col' for column headers, th scope='row' for row headers, caption element for the table title, and summary in the caption for complex tables.",
    badPoints: [
      "td used for all cells including headers",
      "No scope attribute so rows and columns are not linked",
      "No caption so the table has no accessible name",
      "Screen readers announce cells with no column or row context",
      "Violates WCAG 1.3.1"
    ],
    goodPoints: [
      "th scope='col' marks each column header",
      "caption gives the table an accessible name",
      "Screen reader announces: Name, column header when navigating",
      "Cell values are announced with their column context",
      "Meets WCAG 1.3.1"
    ],
    impact: "Data tables without proper headers are unnavigable for screen reader users. They cannot tell which column a value belongs to without reading the entire row.",
    howToTest: "Navigate the table with a screen reader using the table navigation keys. In the bad example cells are read with no context. In the good example each cell is announced with its header.",
    learnMoreUrl: "https://wcaginpractice.com/playground#table"
  },
  {
    id: "focus",
    name: "Focus Management",
    wcagRef: "WCAG 2.4.3",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
    summary: "When new content loads or a view changes in a single-page app, focus must be moved to the new content so keyboard and screen reader users know something changed.",
    plainSummary: "In a single-page app, clicking a link updates the page without a full reload. Sighted users see the new content. Keyboard and screen reader users stay stuck on the link they just clicked and have no idea the page changed.",
    whoIsAffected: [
      "Screen reader users who need announcement of page changes",
      "Keyboard-only users whose focus stays on the old element",
      "Users with cognitive disabilities who rely on clear transitions"
    ],
    designerNote: "Every route change in a single-page app needs a focus management strategy. The most common approach is moving focus to the main heading of the new view.",
    commonMistake: "Navigating between views with no focus management. Focus stays on the nav link after the route change. Screen readers do not announce the new page content.",
    accessiblePattern: "After route change, move focus to the h1 of the new view using a ref and .focus(). Add tabIndex={-1} to the h1 so it can receive focus programmatically.",
    badPoints: [
      "Focus stays on the navigation link after route change",
      "Screen reader users hear no announcement of new content",
      "Keyboard users must Tab from the top of the page to reach new content",
      "Page title does not update so browser history is confusing",
      "Violates WCAG 2.4.3"
    ],
    goodPoints: [
      "Focus moves to the h1 of the new view after route change",
      "tabIndex={-1} allows the h1 to receive programmatic focus",
      "Screen reader announces the new page heading immediately",
      "Page title updates via document.title for browser history",
      "Meets WCAG 2.4.3"
    ],
    impact: "Focus management failures are the most disorienting issue in modern single-page apps for screen reader users. Without it, they cannot tell when or where navigation happened.",
    howToTest: "Turn on a screen reader and click a nav link. Without focus management you hear nothing and focus stays on the link. With it, the new page heading is announced immediately.",
    learnMoreUrl: "https://wcaginpractice.com/playground#focus"
  }
];

// Helper: find a pattern by id
export function getPatternById(id: string): Pattern | undefined {
  return patterns.find(p => p.id === id);
}
