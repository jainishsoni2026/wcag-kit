import { getPatternById } from "../data/patterns.js";
import { FixSuggestion } from "../types/index.js";

// Code examples for each pattern
// badCode: the broken version developers commonly write
// fixedCode: the accessible version they should use instead
const codeExamples: Record<string, { badCode: string; fixedCode: string }> = {
  dropdown: {
    badCode: `<!-- BAD: div trigger, no keyboard support, no ARIA -->
<div onclick="toggleMenu()">
  Select country
  <span>▼</span>
</div>
<ul id="menu" style="display:none">
  <li onclick="select('ca')">Canada</li>
  <li onclick="select('us')">United States</li>
</ul>`,
    fixedCode: `<!-- GOOD: button trigger, aria-expanded, aria-haspopup, keyboard support -->
<button
  aria-haspopup="listbox"
  aria-expanded="false"
  onclick="toggleMenu(this)"
>
  Select country
  <span aria-hidden="true">▼</span>
</button>
<ul
  role="listbox"
  id="menu"
  hidden
>
  <li role="option" aria-selected="false" tabindex="-1">Canada</li>
  <li role="option" aria-selected="false" tabindex="-1">United States</li>
</ul>

<!-- JS: toggle aria-expanded and hidden when button is pressed -->
<!-- Keyboard: Arrow Down/Up to navigate, Enter to select, Escape to close -->`
  },

  modal: {
    badCode: `<!-- BAD: no role, no focus trap, no Escape handler -->
<div class="modal" id="myModal">
  <div class="modal-content">
    <span onclick="closeModal()">×</span>
    <h2>Confirm Action</h2>
    <p>Are you sure you want to delete this item?</p>
    <button onclick="confirmDelete()">Delete</button>
  </div>
</div>`,
    fixedCode: `<!-- GOOD: role=dialog, aria-modal, aria-labelledby, focus trap -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  id="myModal"
  tabindex="-1"
>
  <div class="modal-content">
    <button
      class="close-btn"
      aria-label="Close dialog"
      onclick="closeModal()"
    >
      ×
    </button>
    <h2 id="modal-title">Confirm Action</h2>
    <p>Are you sure you want to delete this item?</p>
    <button onclick="confirmDelete()">Delete</button>
  </div>
</div>

<!-- JS requirements:
  1. On open: move focus to the dialog element
  2. Trap Tab/Shift+Tab inside the dialog while open
  3. On Escape: close and return focus to the trigger button -->`
  },

  form: {
    badCode: `<!-- BAD: no label link, color-only error, no role=alert -->
<div>
  <label>Email</label>
  <input type="text" id="email" />
  <span style="color: red;">Invalid email address</span>
</div>`,
    fixedCode: `<!-- GOOD: linked label, aria-invalid, aria-describedby, role=alert -->
<div>
  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <span
    id="email-error"
    role="alert"
  >
    ⚠ Invalid email address
  </span>
</div>

<!-- Notes:
  - for/id links the label to the input
  - aria-invalid tells screen readers the field has an error
  - aria-describedby connects the input to its error message
  - role=alert causes the error to be announced immediately
  - Icon + text means colour is not the only indicator -->`
  },

  headings: {
    badCode: `<!-- BAD: bold text as fake headings, skipped levels -->
<p><strong>Our Services</strong></p>
<p>We offer three main services.</p>

<h1>Web Design</h1>
<h4>Responsive Layouts</h4>
<p>We build mobile-first layouts.</p>

<h1>Development</h1>`,
    fixedCode: `<!-- GOOD: one h1, sequential levels, CSS controls size -->
<h1>Our Services</h1>
<p>We offer three main services.</p>

<h2>Web Design</h2>
<h3>Responsive Layouts</h3>
<p>We build mobile-first layouts.</p>

<h2>Development</h2>

<!-- Rules:
  - One h1 per page, describes the page purpose
  - h2 for major sections, h3 for subsections
  - Never skip levels (no h1 then h3)
  - Use CSS font-size to control visual appearance -->`
  },

  button: {
    badCode: `<!-- BAD: div as button, no keyboard access -->
<div onclick="submitForm()" class="btn">
  Submit
</div>

<!-- BAD: icon-only button with no accessible name -->
<button onclick="deleteItem()">
  <svg>...</svg>
</button>`,
    fixedCode: `<!-- GOOD: real button element, keyboard accessible -->
<button type="submit" onclick="submitForm()">
  Submit
</button>

<!-- GOOD: icon-only button with aria-label -->
<button
  type="button"
  aria-label="Delete item"
  onclick="deleteItem()"
>
  <svg aria-hidden="true" focusable="false">...</svg>
</button>

<!-- Notes:
  - Real button elements get Tab focus automatically
  - Enter and Space both activate them
  - aria-label provides the accessible name when there is no visible text
  - aria-hidden on the SVG prevents double-announcement
  - focusable=false prevents IE/Edge from focusing the SVG separately -->`
  },

  image: {
    badCode: `<!-- BAD: missing alt attribute -->
<img src="team-photo.jpg" />

<!-- BAD: file name as alt text -->
<img src="chart-q4.png" alt="chart-q4.png" />

<!-- BAD: decorative image without empty alt -->
<img src="divider-wave.svg" alt="decorative wave" />`,
    fixedCode: `<!-- GOOD: descriptive alt text for informative image -->
<img
  src="team-photo.jpg"
  alt="The wcaginpractice team of five people at a conference table"
/>

<!-- GOOD: alt describes the meaning, not the appearance -->
<img
  src="chart-q4.png"
  alt="Q4 revenue increased 23% compared to Q3"
/>

<!-- GOOD: decorative image hidden from screen readers -->
<img
  src="divider-wave.svg"
  alt=""
  role="presentation"
/>

<!-- Rules:
  - Informative images: describe the content and purpose
  - Decorative images: use alt='' so screen readers skip them
  - Charts/graphs: describe the key insight, not just the visual -->`
  },

  contrast: {
    badCode: `<!-- BAD: low contrast text colours -->
<style>
  /* Fails 4.5:1 -- ratio is approximately 2.3:1 */
  .body-text { color: #999999; background: #ffffff; }

  /* Fails 4.5:1 -- ratio is approximately 3.1:1 */
  .small-label { color: #767676; background: #ffffff; }

  /* Fails 3:1 for large text -- ratio is approximately 2.5:1 */
  .hero-heading { color: #aaaaaa; background: #ffffff; font-size: 32px; }
</style>`,
    fixedCode: `<!-- GOOD: text colours that meet WCAG 1.4.3 -->
<style>
  /* Passes 4.5:1 -- ratio is approximately 12.6:1 */
  .body-text { color: #1a1a1a; background: #ffffff; }

  /* Passes 4.5:1 -- ratio is approximately 7:1 */
  .small-label { color: #595959; background: #ffffff; }

  /* Passes 3:1 for large text -- ratio is approximately 4.6:1 */
  .hero-heading { color: #767676; background: #ffffff; font-size: 32px; }
</style>

<!-- How to check:
  Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
  Or Chrome DevTools: Inspect element, click the colour swatch, read the ratio
  Minimum ratios:
    Normal text (under 18pt): 4.5:1
    Large text (18pt or 14pt bold): 3:1
    UI components and icons: 3:1 -->`
  },

  navigation: {
    badCode: `<!-- BAD: div instead of nav, no landmark -->
<div class="nav-wrapper">
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </div>
</div>`,
    fixedCode: `<!-- GOOD: nav element, aria-label when multiple navs exist -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- If a second nav exists on the same page, label both -->
<nav aria-label="Footer navigation">
  <ul>
    <li><a href="/privacy">Privacy</a></li>
    <li><a href="/terms">Terms</a></li>
  </ul>
</nav>

<!-- Notes:
  - nav element creates a landmark region
  - Screen reader users can jump directly to it with a keystroke
  - aria-label distinguishes multiple nav regions
  - Use a list for navigation links (ul/li) -->`
  },

  accordion: {
    badCode: `<!-- BAD: div trigger, no aria-expanded, no aria-controls -->
<div class="accordion">
  <div onclick="toggle(0)" class="trigger">
    What is WCAG?
    <span>+</span>
  </div>
  <div id="panel-0" style="display:none">
    WCAG stands for Web Content Accessibility Guidelines.
  </div>
</div>`,
    fixedCode: `<!-- GOOD: button trigger, aria-expanded, aria-controls -->
<div class="accordion">
  <h3>
    <button
      aria-expanded="false"
      aria-controls="panel-0"
      onclick="toggle(this, 'panel-0')"
    >
      What is WCAG?
      <span aria-hidden="true">+</span>
    </button>
  </h3>
  <div
    id="panel-0"
    role="region"
    aria-labelledby="trigger-0"
    hidden
  >
    WCAG stands for Web Content Accessibility Guidelines.
  </div>
</div>

<!-- JS: toggle aria-expanded and hidden when button is pressed
  button.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
  panel.hidden = !isOpen -->`
  },

  tabs: {
    badCode: `<!-- BAD: no ARIA roles, Tab key moves through all tabs -->
<div class="tabs">
  <div class="tab-list">
    <button onclick="showTab(0)">Overview</button>
    <button onclick="showTab(1)">Details</button>
    <button onclick="showTab(2)">Reviews</button>
  </div>
  <div id="tab-0">Overview content</div>
  <div id="tab-1" hidden>Details content</div>
  <div id="tab-2" hidden>Reviews content</div>
</div>`,
    fixedCode: `<!-- GOOD: role=tablist, role=tab, aria-selected, Arrow key navigation -->
<div class="tabs">
  <div role="tablist" aria-label="Product information">
    <button
      role="tab"
      aria-selected="true"
      aria-controls="panel-0"
      id="tab-0"
      tabindex="0"
    >
      Overview
    </button>
    <button
      role="tab"
      aria-selected="false"
      aria-controls="panel-1"
      id="tab-1"
      tabindex="-1"
    >
      Details
    </button>
    <button
      role="tab"
      aria-selected="false"
      aria-controls="panel-2"
      id="tab-2"
      tabindex="-1"
    >
      Reviews
    </button>
  </div>

  <div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
    Overview content
  </div>
  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" hidden>
    Details content
  </div>
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    Reviews content
  </div>
</div>

<!-- JS keyboard pattern:
  Arrow Right/Left: move between tabs, update aria-selected and tabindex
  Tab: move focus into the active panel
  Home/End: jump to first/last tab -->`
  },

  toast: {
    badCode: `<!-- BAD: toast injected with no aria-live region -->
<div id="toast-container"></div>

<script>
  function showToast(message) {
    const container = document.getElementById('toast-container');
    container.innerHTML = '<div class="toast">' + message + '</div>';
    setTimeout(() => container.innerHTML = '', 3000);
  }
</script>`,
    fixedCode: `<!-- GOOD: persistent aria-live region, message injected into it -->

<!-- Place this in your HTML once, near the top of the body -->
<div
  id="live-region"
  aria-live="polite"
  aria-atomic="true"
  role="status"
  class="sr-only"
>
</div>

<!-- Your toast can still appear visually anywhere on screen -->
<div id="toast-container" aria-hidden="true"></div>

<script>
  function showToast(message) {
    // Update the live region -- screen readers announce this
    const liveRegion = document.getElementById('live-region');
    liveRegion.textContent = '';
    // Small delay ensures the DOM change triggers announcement
    setTimeout(() => { liveRegion.textContent = message; }, 100);

    // Also show visual toast as before
    const container = document.getElementById('toast-container');
    container.innerHTML = '<div class="toast">' + message + '</div>';
    setTimeout(() => container.innerHTML = '', 3000);
  }
</script>

<!-- sr-only CSS (hides from view but not from screen readers):
  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); border: 0;
  } -->`
  },

  table: {
    badCode: `<!-- BAD: td for all cells, no scope, no caption -->
<table>
  <tr>
    <td>Name</td>
    <td>Role</td>
    <td>Department</td>
  </tr>
  <tr>
    <td>Alice</td>
    <td>Engineer</td>
    <td>Product</td>
  </tr>
</table>`,
    fixedCode: `<!-- GOOD: th with scope, caption element -->
<table>
  <caption>Team directory</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Department</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Alice</th>
      <td>Engineer</td>
      <td>Product</td>
    </tr>
  </tbody>
</table>

<!-- Notes:
  - caption gives the table an accessible name
  - th scope='col' marks column headers
  - th scope='row' marks row headers
  - thead/tbody improve structure for screen readers
  - Screen reader announces: "Name, column header" then "Alice, row header" -->`
  },

  focus: {
    badCode: `// BAD: React route change with no focus management
function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

// After navigation, focus stays on the clicked link.
// Screen reader users hear nothing. The page appears unchanged to them.`,
    fixedCode: `// GOOD: move focus to the page heading after route change
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function About() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Move focus to the heading whenever this page loads
    if (headingRef.current) {
      headingRef.current.focus();
    }
    // Also update the document title for browser history
    document.title = 'About - wcaginpractice.com';
  }, [location]);

  return (
    <main>
      {/* tabIndex={-1} allows programmatic focus without adding to Tab order */}
      <h1 ref={headingRef} tabIndex={-1}>
        About
      </h1>
      <p>Page content here.</p>
    </main>
  );
}

// What the screen reader announces after navigation:
// "About, heading level 1"
// User immediately knows they are on the About page.`
  }
};

// Main export: returns the bad and good code examples for a pattern
// plus explanation text pulled from the pattern data
export function suggestFix(patternId: string): {
  error: boolean;
  message?: string;
  suggestion?: FixSuggestion;
} {
  const pattern = getPatternById(patternId);

  if (!pattern) {
    return {
      error: true,
      message: `Pattern "${patternId}" not found. Use list_patterns to see available pattern IDs.`
    };
  }

  const examples = codeExamples[patternId];

  if (!examples) {
    return {
      error: true,
      message: `No code examples available yet for pattern "${patternId}".`
    };
  }

  return {
    error: false,
    suggestion: {
      originalCode: examples.badCode,
      fixedCode: examples.fixedCode,
      explanation: `${pattern.plainSummary} ${pattern.accessiblePattern}`,
      wcagRef: pattern.wcagRef,
      learnMoreUrl: pattern.learnMoreUrl
    }
  };
}
