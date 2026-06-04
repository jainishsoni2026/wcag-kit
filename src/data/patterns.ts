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
  },
  {
    id: "combobox",
    name: "Combobox (List Autocomplete)",
    wcagRef: "WCAG 2.1.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
    summary: "Autocomplete inputs need role=combobox, aria-expanded, and keyboard-navigable listbox options.",
    plainSummary: "A combobox is a text input that shows suggestions as you type. Without the right code, keyboard users cannot navigate the suggestions and screen reader users do not know the list exists.",
    whoIsAffected: [
      "Keyboard-only users who cannot use a mouse to select suggestions",
      "Screen reader users who need the list announced when it opens",
      "Voice control users who activate options by speaking their name",
      "Users with cognitive disabilities who rely on predictable input behaviour"
    ],
    designerNote: "A combobox looks like a plain text input but behaves like a complex widget. Design must account for three states: empty, typing with suggestions visible, and a suggestion selected. Each state needs a visually distinct appearance communicated in code, not colour alone.",
    commonMistake: "Input with a visually styled dropdown but no aria-expanded, no aria-autocomplete, and no role=combobox. Suggestions are unreachable by keyboard and invisible to screen readers.",
    accessiblePattern: "Input with role=combobox, aria-expanded, aria-autocomplete=list, and aria-controls pointing to the listbox id. Each option has role=option. Arrow Down opens the list and moves focus through options. Enter selects. Escape closes and returns focus to the input.",
    badPoints: [
      "Input has no role=combobox so screen readers treat it as a plain text field",
      "No aria-expanded so assistive technology cannot tell if the list is open",
      "No aria-controls so the input and listbox are not linked",
      "Arrow keys do not move through suggestions",
      "Violates WCAG 2.1.1 and 4.1.2"
    ],
    goodPoints: [
      "role=combobox and aria-expanded announce the widget type and state",
      "aria-controls links the input to its listbox by id",
      "Arrow Down opens the list and moves focus through options",
      "Enter selects the focused option and closes the list",
      "Meets WCAG 2.1.1 and 4.1.2"
    ],
    impact: "Comboboxes are used in search fields, address forms, and tag inputs. Without keyboard support, users who cannot use a mouse are forced to type the full value manually with no autocomplete benefit.",
    howToTest: "Tab to the input and start typing. Press Arrow Down to move into the suggestion list. Press Arrow Up and Down to navigate options. Press Enter to select and confirm the input value updates. Press Escape to close the list and return focus to the input.",
    learnMoreUrl: "https://wcaginpractice.com/playground#combobox"
  },
  {
    id: "tooltip",
    name: "Tooltip",
    wcagRef: "WCAG 1.4.13",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html",
    summary: "Tooltips must appear on focus and hover, be dismissible, and stay visible long enough to read.",
    plainSummary: "A tooltip shows additional information when a user hovers or focuses an element. Without the right code, keyboard users never see the tooltip and screen reader users get no announcement. The tooltip content must also be dismissible and persistent enough to read.",
    whoIsAffected: [
      "Keyboard-only users who cannot hover with a mouse",
      "Screen reader users who need tooltip content announced",
      "Users with low vision who zoom in and may trigger tooltips accidentally",
      "Users with motor disabilities who need time to read tooltip content"
    ],
    designerNote: "Tooltips triggered only on hover fail keyboard users entirely. Every tooltip trigger must also show on focus. The tooltip must stay visible long enough to read and must be dismissible with Escape without moving focus. Never put essential information only in a tooltip.",
    commonMistake: "Tooltip shown on mouseenter only with no focus event and no role=tooltip. Keyboard users never see it. Screen readers do not announce it.",
    accessiblePattern: "Trigger element has aria-describedby pointing to the tooltip id. Tooltip has role=tooltip. Tooltip appears on both hover and focus. Escape dismisses it. Tooltip stays visible when the user moves the pointer over it.",
    badPoints: [
      "Tooltip only appears on mouseenter, keyboard users never see it",
      "No role=tooltip so screen readers do not announce the content",
      "No aria-describedby linking the trigger to the tooltip",
      "Tooltip disappears immediately when pointer moves away",
      "Violates WCAG 1.4.13"
    ],
    goodPoints: [
      "Tooltip appears on both hover and focus",
      "role=tooltip and aria-describedby link trigger and content",
      "Escape dismisses the tooltip without moving focus",
      "Tooltip stays visible when pointer moves over it",
      "Meets WCAG 1.4.13"
    ],
    impact: "Icon-only buttons and abbreviated labels often rely on tooltips to explain their purpose. If the tooltip only appears on hover, keyboard users and screen reader users never get that explanation and cannot understand the control.",
    howToTest: "Tab to the trigger element and confirm the tooltip appears on focus. Move the pointer away without clicking and confirm the tooltip stays visible. Press Escape and confirm the tooltip closes. Turn on a screen reader and confirm the tooltip text is announced when the trigger receives focus.",
    learnMoreUrl: "https://wcaginpractice.com/playground#tooltip"
  },
  {
    id: "datepicker",
    name: "Date Picker",
    wcagRef: "WCAG 2.1.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
    summary: "Date pickers need keyboard-navigable calendar grids and a plain text input fallback.",
    plainSummary: "A date picker is a calendar widget for selecting dates. Without the right code, keyboard users cannot navigate the calendar grid and screen reader users cannot tell which date is focused or selected. A plain text input alternative must always be available.",
    whoIsAffected: [
      "Keyboard-only users who need to navigate the calendar grid with arrow keys",
      "Screen reader users who need the focused date announced",
      "Users with cognitive disabilities who find complex calendar widgets confusing",
      "Mobile users who benefit from a native date input fallback"
    ],
    designerNote: "Always provide a plain text input as an alternative to the calendar widget. The calendar is an enhancement, not a replacement. If the calendar widget is too complex to make fully accessible, a labelled text input with format hint (e.g. DD/MM/YYYY) is a valid accessible fallback.",
    commonMistake: "Calendar grid built with divs and no keyboard navigation. Clicking a date works but Tab moves through every date individually and Arrow keys do nothing. No announcement of the selected date.",
    accessiblePattern: "Calendar grid uses a table or grid role. Arrow keys navigate between dates. Enter or Space selects. Page Up and Page Down move between months. Home and End jump to first and last date in the week. Selected date has aria-selected=true. Focused date is announced by screen readers.",
    badPoints: [
      "Calendar built with divs, no keyboard navigation beyond Tab",
      "Tab moves through every date individually instead of Arrow keys",
      "No aria-selected so screen readers cannot announce the selected date",
      "No visible focus indicator on the focused date",
      "Violates WCAG 2.1.1"
    ],
    goodPoints: [
      "Arrow keys navigate the calendar grid in all four directions",
      "Enter or Space selects the focused date",
      "aria-selected=true marks the selected date",
      "Screen reader announces the focused date including day and month",
      "Meets WCAG 2.1.1"
    ],
    impact: "Date pickers appear in booking flows, form submissions, and scheduling tools. A keyboard-inaccessible date picker blocks users from completing transactions entirely if no text input fallback exists.",
    howToTest: "Tab to the calendar trigger and press Enter to open it. Use Arrow keys to navigate between dates. Press Enter to select a date and confirm the input value updates. Press Escape to close the calendar. Turn on a screen reader and confirm each focused date is announced with its full date value.",
    learnMoreUrl: "https://wcaginpractice.com/playground#datepicker"
  },
  {
    id: "carousel",
    name: "Carousel",
    wcagRef: "WCAG 2.1.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
    summary: "Carousels need pause controls, keyboard-accessible navigation, and announced slide changes.",
    plainSummary: "A carousel rotates through panels of content automatically or on user request. Without the right code, keyboard users cannot stop the rotation or move between slides, and screen reader users get no announcement when content changes. Auto-play carousels are a common WCAG failure.",
    whoIsAffected: [
      "Keyboard-only users who need to pause rotation and navigate slides",
      "Screen reader users who need slide changes announced",
      "Users with vestibular disorders who are harmed by unexpected motion",
      "Users with cognitive disabilities who need time to read each slide"
    ],
    designerNote: "Auto-playing carousels fail WCAG 2.2.2 Pause Stop Hide if users cannot pause them. Always include a pause button that is visible and keyboard accessible. If the carousel rotates automatically, it must stop when it receives keyboard focus.",
    commonMistake: "Carousel with auto-play and no pause button. Previous and Next buttons are divs with no keyboard access. Slide changes are not announced to screen readers.",
    accessiblePattern: "Pause button stops auto-rotation. Previous and Next are real buttons. Each slide has role=group and aria-label with its position (e.g. Slide 1 of 4). aria-live=polite announces slide changes. Auto-play pauses on focus or hover.",
    badPoints: [
      "Auto-plays with no pause button, violates WCAG 2.2.2",
      "Previous and Next controls are divs unreachable by keyboard",
      "Slide changes are not announced to screen readers",
      "No indication of current slide position",
      "Violates WCAG 2.1.1 and 2.2.2"
    ],
    goodPoints: [
      "Pause button stops auto-rotation and is keyboard accessible",
      "Previous and Next are real buttons with descriptive aria-labels",
      "aria-live=polite announces each new slide to screen readers",
      "Each slide has aria-label indicating its position",
      "Meets WCAG 2.1.1 and 2.2.2"
    ],
    impact: "Carousels are common on marketing homepages and product pages. Auto-rotating content that cannot be paused is disorienting for users with vestibular disorders and prevents users with cognitive disabilities from reading the content before it changes.",
    howToTest: "Tab to the carousel and confirm auto-play pauses on focus. Tab to the Pause button and press Enter. Use Previous and Next buttons with keyboard. Turn on a screen reader and confirm each slide change is announced. Check no motion occurs when prefers-reduced-motion is set.",
    learnMoreUrl: "https://wcaginpractice.com/playground#carousel"
  },
  {
    id: "progress",
    name: "Progress Indicator",
    wcagRef: "WCAG 4.1.3",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
    summary: "Progress indicators must announce status to screen readers via progressbar roles or live regions.",
    plainSummary: "A progress indicator shows how far through a task or loading process the user is. Without the right code, screen reader users receive no feedback that anything is happening. A loading spinner with no announcement is silent to assistive technology.",
    whoIsAffected: [
      "Screen reader users who cannot see the visual progress indicator",
      "Blind users waiting for a file upload or multi-step process to complete",
      "Users with cognitive disabilities who need clear feedback on task progress",
      "Keyboard-only users who need to know when a process has completed"
    ],
    designerNote: "Every progress indicator needs a text alternative. A spinning icon alone communicates nothing to screen readers. For determinate progress (known percentage), use role=progressbar with aria-valuenow, aria-valuemin, and aria-valuemax. For indeterminate progress (unknown duration), use aria-label and aria-live.",
    commonMistake: "Spinner or progress bar shown visually with no ARIA roles and no live region. Screen reader users submit a form and hear nothing while waiting for the result.",
    accessiblePattern: "Determinate progress uses role=progressbar with aria-valuenow updated as progress changes. Indeterminate progress uses aria-live=polite with a status message. Both include a visible text label showing the current state.",
    badPoints: [
      "Progress bar has no role=progressbar",
      "No aria-valuenow so screen readers cannot announce the percentage",
      "Spinner has no aria-label so it is invisible to screen readers",
      "No live region so completion is never announced",
      "Violates WCAG 4.1.3"
    ],
    goodPoints: [
      "role=progressbar with aria-valuenow, aria-valuemin, aria-valuemax",
      "aria-label describes what is progressing",
      "aria-live=polite announces completion when the task finishes",
      "Visible text label shows current percentage or status",
      "Meets WCAG 4.1.3"
    ],
    impact: "Progress indicators appear in file uploads, form submissions, and multi-step wizards. Without ARIA, blind users have no feedback during the wait and no announcement when the task completes. They cannot tell if the page has frozen or is still working.",
    howToTest: "Trigger the progress indicator and turn on a screen reader. Confirm the screen reader announces the start of the process. For determinate progress confirm the percentage is announced as it updates. Confirm completion is announced when the process finishes.",
    learnMoreUrl: "https://wcaginpractice.com/playground#progress"
  },
  {
    id: "pagination",
    name: "Pagination",
    wcagRef: "WCAG 2.4.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html",
    summary: "Pagination needs a nav landmark, aria-current on the active page, and non-link current page.",
    plainSummary: "Pagination lets users move between pages of content. Without the right code, screen reader users cannot tell which page they are on, cannot distinguish the pagination from other navigation, and may not know the current page is not a link.",
    whoIsAffected: [
      "Screen reader users who need the current page announced",
      "Keyboard-only users navigating between pages",
      "Users with cognitive disabilities who need clear indication of current position",
      "Voice control users who activate page links by speaking their number"
    ],
    designerNote: "The pagination container must be a nav element with a descriptive aria-label to distinguish it from other navigation on the page. The current page must be marked with aria-current=page and should not be a link since it goes nowhere.",
    commonMistake: "All page numbers are identical anchor links including the current page. No nav landmark wraps them. No aria-current marks the active page. Screen readers cannot distinguish pagination from other navigation.",
    accessiblePattern: "nav element with aria-label=Pagination wraps the page links. Current page has aria-current=page and is a span not a link. Previous and Next buttons have descriptive aria-labels. Screen reader announces the landmark and current page position.",
    badPoints: [
      "No nav landmark so screen readers cannot identify the pagination region",
      "Current page is a link that goes nowhere or reloads the same page",
      "No aria-current=page so the active page is not distinguishable",
      "Previous and Next have no descriptive labels",
      "Violates WCAG 2.4.1 and 4.1.2"
    ],
    goodPoints: [
      "nav with aria-label=Pagination creates a distinct landmark",
      "aria-current=page marks the active page number",
      "Current page is a span not a link so screen readers do not announce it as clickable",
      "Previous and Next have aria-label describing their action",
      "Meets WCAG 2.4.1 and 4.1.2"
    ],
    impact: "Pagination appears on search results, product listings, and article archives. Without aria-current, screen reader users cannot tell which page they are on. Without a nav landmark they cannot jump to pagination quickly using landmark shortcuts.",
    howToTest: "Turn on a screen reader and navigate to the pagination. Confirm it is announced as a navigation landmark. Tab to each page number and confirm the current page is announced differently. Confirm the current page element is not announced as a link.",
    learnMoreUrl: "https://wcaginpractice.com/playground#pagination"
  },
  {
    id: "dragdrop",
    name: "Drag and Drop",
    wcagRef: "WCAG 2.5.7",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html",
    summary: "Every drag operation must have a keyboard-accessible alternative that achieves the same outcome.",
    plainSummary: "Drag and drop lets users reorder or move items by dragging them. Without the right code, keyboard users cannot perform the same action and must abandon the task. WCAG 2.5.7 requires that every drag operation has a keyboard-accessible alternative.",
    whoIsAffected: [
      "Keyboard-only users who cannot perform drag gestures",
      "Users with motor disabilities who cannot control precise mouse movements",
      "Screen reader users who need drag state announced",
      "Touch-only users on devices where drag is unreliable"
    ],
    designerNote: "Every drag and drop interaction needs a keyboard alternative. This does not mean replicating the drag visually -- it means the same outcome (reordering, moving, grouping) must be achievable without a pointer. Buttons that move items up, down, or to a target are the simplest approach.",
    commonMistake: "Items are reorderable by dragging only. No keyboard alternative exists. Users who cannot drag are completely locked out of the reordering functionality.",
    accessiblePattern: "Each draggable item has a Move button or up and down arrow buttons. Items announce their current position using aria-describedby. When an item moves, the new position is announced via aria-live. Drag-and-drop with pointer still works as an enhancement.",
    badPoints: [
      "Reordering only possible via mouse drag",
      "No keyboard alternative for moving items",
      "Drag state is not announced to screen readers",
      "Users with motor disabilities cannot complete the interaction",
      "Violates WCAG 2.5.7"
    ],
    goodPoints: [
      "Keyboard buttons allow moving items without dragging",
      "aria-live announces the new position after each move",
      "aria-describedby tells users the current position of each item",
      "Pointer drag still works as an enhancement",
      "Meets WCAG 2.5.7"
    ],
    impact: "Drag and drop is used in kanban boards, file managers, and form builders. Without a keyboard alternative, any user who cannot perform precise pointer movements is completely blocked from reordering content -- a critical failure in productivity tools.",
    howToTest: "Attempt to reorder items using only the keyboard. Confirm move buttons exist and work. Turn on a screen reader and confirm the new position is announced after each move. Confirm the pointer drag still works as an alternative, not a replacement.",
    learnMoreUrl: "https://wcaginpractice.com/playground#dragdrop"
  },
  {
    id: "radiocheckbox",
    name: "Radio Group and Checkbox Group",
    wcagRef: "WCAG 1.3.1",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
    summary: "Radio and checkbox groups need fieldset, legend, and linked labels so screen readers announce group context.",
    plainSummary: "Radio groups and checkbox groups are sets of related inputs that must be wrapped in a fieldset with a legend. Without the right code, screen reader users hear each option in isolation with no context about what they are choosing. The group label is lost entirely.",
    whoIsAffected: [
      "Screen reader users who need the group label announced with each option",
      "Keyboard-only users navigating between options with Arrow keys",
      "Users with cognitive disabilities who need clear group context",
      "Voice control users who activate options by speaking their label"
    ],
    designerNote: "Never use generic div containers or bold text as a group label. The group label must be a legend inside a fieldset so screen readers announce it with every option. For radio groups, only one option should be selectable. For checkbox groups, multiple selections are allowed and each must have an independent label.",
    commonMistake: "Radio buttons or checkboxes grouped visually with a bold heading but no fieldset or legend. Screen readers announce each input label alone with no group context. Users cannot tell what question they are answering.",
    accessiblePattern: "fieldset wraps the entire group. legend provides the group label. Each input has an associated label via htmlFor. Radio groups use Arrow keys to move between options. Checkbox groups allow Tab between options and Space to check or uncheck.",
    badPoints: [
      "No fieldset or legend so the group label is not associated with the inputs",
      "Screen readers announce each option without the question context",
      "Radio buttons are not grouped so Arrow keys do not move between them",
      "Bold heading above the group is not programmatically linked to the inputs",
      "Violates WCAG 1.3.1"
    ],
    goodPoints: [
      "fieldset and legend associate the group label with every input",
      "Screen reader announces the legend text with each option",
      "Arrow keys move between radio options within the group",
      "Each input has a linked label via htmlFor",
      "Meets WCAG 1.3.1"
    ],
    impact: "Radio and checkbox groups appear in surveys, preference forms, and checkout flows. Without a fieldset and legend, screen reader users hear options like Yes and No with no context about what they are agreeing or disagreeing to. This is a critical failure in any form that collects consent or preference data.",
    howToTest: "Turn on a screen reader and Tab to the first radio or checkbox option. Confirm the group label is announced before the option label. Use Arrow keys on radio buttons to move between options. Use Space on checkboxes to check and uncheck. Confirm each interaction announces both the group and the option.",
    learnMoreUrl: "https://wcaginpractice.com/playground#radiocheckbox"
  },
  {
    id: "search",
    name: "Search",
    wcagRef: "WCAG 4.1.2",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    summary: "Search inputs need a real label, role=search landmark, and a named submit control.",
    plainSummary: "A search input must have a visible or programmatic label and be wrapped in a landmark so screen reader users can jump to it directly. Without the right code, screen reader users cannot identify the input as a search field and cannot navigate to it using landmark shortcuts.",
    whoIsAffected: [
      "Screen reader users who navigate by landmarks to find search quickly",
      "Keyboard-only users who need a labelled input to understand its purpose",
      "Voice control users who activate the field by saying its label",
      "Users with cognitive disabilities who rely on clear field identification"
    ],
    designerNote: "A search input with only a placeholder is not labelled. Placeholders disappear when the user starts typing and are not reliably announced by all screen readers. Always provide a visible label or at minimum an aria-label. Wrap the search input in a form with role=search or a nav element with aria-label=Search.",
    commonMistake: "Search input with placeholder text only and no label. Wrapped in a generic div with no landmark role. Screen readers announce it as an unlabelled edit field. Users cannot jump to search using landmark navigation.",
    accessiblePattern: "form element with role=search creates a search landmark. Input has a visible label or aria-label=Search. Submit button has a descriptive aria-label. Screen reader users can jump directly to the search landmark with a single keystroke.",
    badPoints: [
      "Input has placeholder only, no label or aria-label",
      "No role=search so no search landmark exists",
      "Screen reader announces it as an unlabelled edit field",
      "Submit button has no accessible name",
      "Violates WCAG 4.1.2 and 1.3.1"
    ],
    goodPoints: [
      "role=search on the form creates a search landmark",
      "aria-label=Search gives the input an accessible name",
      "Submit button has aria-label=Submit search",
      "Screen reader users can jump directly to the search landmark",
      "Meets WCAG 4.1.2 and 2.4.1"
    ],
    impact: "Search is one of the most frequently used features on content-heavy sites. A search field that cannot be reached via landmark navigation forces screen reader users to Tab through every element on the page to find it. An unlabelled input means voice control users cannot activate it by speaking its name.",
    howToTest: "Turn on a screen reader and use the landmark navigation shortcut to jump to the search region. Confirm it is announced as a search landmark. Tab to the input and confirm it is announced as Search or has a descriptive label. Type a query and Tab to the submit button. Confirm the button has a descriptive name.",
    learnMoreUrl: "https://wcaginpractice.com/playground#search"
  },
  {
    id: "infinitescroll",
    name: "Infinite Scroll / Load More",
    wcagRef: "WCAG 4.1.3",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
    summary: "Loading more content must be announced via aria-live; prefer a Load More button over silent infinite scroll.",
    plainSummary: "Infinite scroll loads new content automatically as the user scrolls. Without the right code, screen reader users have no idea new content has loaded and keyboard users may find their focus position disrupted. A Load More button is a more accessible alternative to automatic infinite scroll.",
    whoIsAffected: [
      "Screen reader users who need new content loading announced",
      "Keyboard-only users whose focus position is disrupted by content insertion",
      "Users with cognitive disabilities who lose their place when content shifts",
      "Users with motor disabilities who cannot scroll continuously"
    ],
    designerNote: "Automatic infinite scroll is the harder pattern to make accessible. A Load More button gives users control over when new content loads and is easier to implement accessibly. If infinite scroll is required, new content must be announced via aria-live and focus must not be disrupted when content loads above the current position.",
    commonMistake: "New items injected into the DOM silently with no aria-live region. Keyboard focus jumps unexpectedly when content loads. No indication of how many items have loaded or how many remain.",
    accessiblePattern: "Load More button triggers content load and announces the result via aria-live=polite. Screen reader hears X new items loaded, Y items total. Button remains focused after load. If infinite scroll is used, a fallback Load More button is always available for keyboard users.",
    badPoints: [
      "New content loads silently with no announcement to screen readers",
      "Keyboard focus is disrupted when new items are inserted",
      "No indication of loading state while content is being fetched",
      "No way to reach newly loaded content without scrolling",
      "Violates WCAG 4.1.3"
    ],
    goodPoints: [
      "aria-live=polite announces how many new items loaded",
      "Focus remains on the Load More button after content loads",
      "Loading state is announced while fetch is in progress",
      "Newly loaded items are reachable by continuing to Tab",
      "Meets WCAG 4.1.3"
    ],
    impact: "Infinite scroll is used on social feeds, product listings, and search results. Without announcements, screen reader users do not know new content exists. Without focus management, keyboard users lose their position entirely when content loads unexpectedly.",
    howToTest: "Tab to the Load More button and press Enter. Confirm a loading announcement is made. Confirm new items loaded is announced when content appears. Confirm focus stays on the Load More button. Tab through the newly loaded items and confirm they are reachable in order.",
    learnMoreUrl: "https://wcaginpractice.com/playground#infinitescroll"
  },
  {
    id: "fileupload",
    name: "File Upload",
    wcagRef: "WCAG 4.1.2",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    summary: "File upload controls must stay keyboard accessible when styled; announce selected file names.",
    plainSummary: "A file upload input lets users select files from their device. Without the right code, custom styled upload buttons are invisible to keyboard users and screen readers. The native file input must be accessible or a fully accessible custom replacement must be provided.",
    whoIsAffected: [
      "Screen reader users who need the upload button announced correctly",
      "Keyboard-only users who need to activate the file picker with Enter or Space",
      "Voice control users who activate the button by speaking its label",
      "Users with motor disabilities who need large, clearly labelled targets"
    ],
    designerNote: "The native file input is ugly but accessible. Custom styled upload buttons that hide the native input must preserve all keyboard and screen reader behaviour. The button must have a descriptive label, must receive Tab focus, and must open the file picker on Enter or Space. Selected file names must be announced after selection.",
    commonMistake: "Native file input hidden with display=none and replaced with a styled div. The div has no keyboard access and no accessible name. Screen readers skip it entirely. Users cannot upload files without a mouse.",
    accessiblePattern: "Native input type=file is visually hidden but remains accessible with opacity=0 and position=absolute. A visible label element associated with the input acts as the styled button. Or the native input is styled directly without hiding it. Selected file name is announced via aria-live after selection.",
    badPoints: [
      "Native input hidden with display=none, removing it from keyboard access",
      "Styled replacement div has no accessible name or role",
      "Screen readers cannot find or activate the upload control",
      "Selected file name is not announced after selection",
      "Violates WCAG 4.1.2"
    ],
    goodPoints: [
      "Native input remains accessible even when visually hidden",
      "Label associated with input provides the accessible name",
      "Keyboard users can activate the file picker with Enter or Space",
      "Selected file name is announced via aria-live after selection",
      "Meets WCAG 4.1.2"
    ],
    impact: "File upload appears in document submission, profile photo, and attachment workflows. A keyboard-inaccessible upload button completely blocks users from submitting required files, which can prevent them from completing critical tasks like job applications or government form submissions.",
    howToTest: "Tab to the upload control and confirm it receives focus. Press Enter or Space and confirm the file picker opens. Select a file and confirm the file name is announced by the screen reader. Turn on a screen reader and confirm the button is announced with a descriptive name before interaction.",
    learnMoreUrl: "https://wcaginpractice.com/playground#fileupload"
  },
  {
    id: "skeleton",
    name: "Skeleton / Loading State",
    wcagRef: "WCAG 4.1.3",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
    summary: "Skeleton screens must be hidden from assistive technology and replaced with an aria-live announcement when real content loads.",
    plainSummary: "A skeleton screen shows placeholder shapes while content loads. Without the right code, screen reader users have no idea the page is loading and receive no announcement when content arrives. Skeleton screens are visually informative but completely silent to assistive technology.",
    whoIsAffected: [
      "Screen reader users who cannot see the skeleton animation",
      "Blind users waiting for content to load with no audio feedback",
      "Users with cognitive disabilities who need clear loading state communication",
      "Keyboard-only users whose Tab order may be disrupted when content replaces skeletons"
    ],
    designerNote: "Skeleton screens must be hidden from screen readers with aria-hidden=true while loading. A separate aria-live region must announce that content is loading and then announce when it has finished. Never rely on the visual skeleton animation alone to communicate loading state.",
    commonMistake: "Skeleton divs rendered with no aria-hidden and no live region. Screen readers attempt to read the skeleton placeholders and announce meaningless empty content. No announcement when real content replaces the skeletons.",
    accessiblePattern: "Skeleton containers have aria-hidden=true so screen readers skip them. An aria-live=polite region announces Loading and then Content loaded when the process completes. Real content is announced naturally when it appears in the DOM.",
    badPoints: [
      "Skeleton elements have no aria-hidden so screen readers announce empty placeholders",
      "No aria-live region so loading state is never announced",
      "No announcement when content finishes loading",
      "Tab order may jump unexpectedly when skeletons are replaced",
      "Violates WCAG 4.1.3"
    ],
    goodPoints: [
      "aria-hidden=true on skeleton containers hides them from screen readers",
      "aria-live=polite region announces Loading when skeletons appear",
      "Content loaded is announced when real content replaces skeletons",
      "Tab order is preserved when content loads",
      "Meets WCAG 4.1.3"
    ],
    impact: "Skeleton screens are used in dashboards, social feeds, and data-heavy pages. Without aria-live announcements, blind users sit in silence with no feedback that anything is happening. They cannot tell if the page has loaded, is still loading, or has failed entirely.",
    howToTest: "Turn on a screen reader and trigger a page load or data fetch. Confirm Loading is announced when skeletons appear. Confirm Content loaded is announced when real content arrives. Confirm the screen reader does not announce the skeleton placeholder shapes.",
    learnMoreUrl: "https://wcaginpractice.com/playground#skeleton"
  },
  {
    id: "alertdialog",
    name: "Alert Dialog",
    wcagRef: "WCAG 2.1.2",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html",
    summary: "Alert dialogs must announce urgency, trap focus, start on Cancel, and dismiss with Escape.",
    plainSummary: "An alert dialog is a modal that requires an immediate response from the user, such as confirming a destructive action. Without the right code, screen reader users are not told the dialog requires action, keyboard users may escape without responding, and focus may not move to the dialog at all.",
    whoIsAffected: [
      "Screen reader users who need the urgent nature of the dialog announced",
      "Keyboard-only users who must be able to respond without a mouse",
      "Users with cognitive disabilities who need clear confirmation prompts",
      "All users performing destructive actions like deleting data"
    ],
    designerNote: "An alert dialog is different from a regular modal. It requires an immediate decision and should interrupt the user. Use role=alertdialog instead of role=dialog. Focus must move to the dialog immediately on open. The first focusable element should be the least destructive action, typically Cancel not Confirm.",
    commonMistake: "Regular div styled as a confirmation prompt with no role=alertdialog. Focus does not move to it on open. Screen readers do not announce it as requiring urgent action. Users can Tab past it without responding.",
    accessiblePattern: "role=alertdialog with aria-modal=true and aria-labelledby pointing to the dialog heading. aria-describedby points to the warning message. Focus moves to the Cancel button on open. Escape closes and cancels. Tab cycles only within the dialog.",
    badPoints: [
      "No role=alertdialog so urgent nature is not communicated to screen readers",
      "Focus does not move to the dialog on open",
      "Users can Tab past the dialog without responding",
      "Escape does not close the dialog",
      "Violates WCAG 2.1.2 and 4.1.2"
    ],
    goodPoints: [
      "role=alertdialog communicates the urgent and interactive nature",
      "Focus moves to the Cancel button immediately on open",
      "aria-labelledby and aria-describedby provide full context",
      "Tab cycles only within the dialog until dismissed",
      "Meets WCAG 2.1.2 and 4.1.2"
    ],
    impact: "Alert dialogs appear before destructive actions like deleting an account, discarding unsaved changes, or confirming a purchase. Without role=alertdialog and focus management, screen reader users may not realise a confirmation is required and may trigger the destructive action without understanding what they confirmed.",
    howToTest: "Trigger the alert dialog and confirm focus moves to it immediately. Turn on a screen reader and confirm it announces the dialog as an alert dialog with its title and description. Tab through the buttons and confirm focus stays inside. Press Escape and confirm the dialog closes without the destructive action occurring.",
    learnMoreUrl: "https://wcaginpractice.com/playground#alertdialog"
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    wcagRef: "WCAG 2.4.8",
    wcagUrl: "https://www.w3.org/WAI/WCAG22/Understanding/location.html",
    summary: "Breadcrumbs need a labelled nav landmark, parent links, and aria-current on the current page.",
    plainSummary: "A breadcrumb shows users where they are in a site hierarchy. Without the right code, screen reader users cannot distinguish the breadcrumb from other navigation on the page and cannot tell which item represents their current location.",
    whoIsAffected: [
      "Screen reader users who need the breadcrumb announced as a distinct landmark",
      "Keyboard-only users navigating between breadcrumb links",
      "Users with cognitive disabilities who rely on location cues to orient themselves",
      "All users on deep pages who need to understand the site structure"
    ],
    designerNote: "The breadcrumb must be wrapped in a nav element with aria-label=Breadcrumb to distinguish it from other navigation on the page. The current page item must have aria-current=page and should not be a link since clicking it would just reload the current page.",
    commonMistake: "Breadcrumb links in a div with no nav landmark and no aria-label. Current page item is a link identical to the others. Screen readers cannot distinguish the breadcrumb from primary navigation and cannot identify the current location.",
    accessiblePattern: "nav element with aria-label=Breadcrumb wraps an ordered list of links. Each item except the last is a link to a parent page. The last item has aria-current=page and is plain text not a link. Separators between items are hidden from screen readers with aria-hidden=true.",
    badPoints: [
      "No nav landmark so screen readers cannot identify the breadcrumb region",
      "No aria-label so the breadcrumb is indistinguishable from other navigation",
      "Current page is a link with no aria-current=page",
      "Separators are announced by screen readers as extra noise",
      "Violates WCAG 2.4.8 and 2.4.1"
    ],
    goodPoints: [
      "nav with aria-label=Breadcrumb creates a distinct and labelled landmark",
      "aria-current=page marks the current location clearly",
      "Current page item is plain text not a link",
      "Separators have aria-hidden=true so screen readers skip them",
      "Meets WCAG 2.4.8 and 2.4.1"
    ],
    impact: "Breadcrumbs appear on e-commerce product pages, documentation sites, and multi-level content hierarchies. Without a labelled nav landmark and aria-current, screen reader users cannot orient themselves within the site structure and cannot distinguish the breadcrumb from the main navigation when using landmark shortcuts.",
    howToTest: "Turn on a screen reader and use the landmark navigation shortcut. Confirm the breadcrumb is announced as a navigation landmark labelled Breadcrumb. Tab through each item and confirm parent pages are announced as links. Confirm the current page item is announced with aria-current=page and is not a link. Confirm separators are not announced.",
    learnMoreUrl: "https://wcaginpractice.com/playground#breadcrumb"
  }
];

// Helper: find a pattern by id
export function getPatternById(id: string): Pattern | undefined {
  return patterns.find(p => p.id === id);
}
