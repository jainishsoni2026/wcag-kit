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
  },

  combobox: {
    badCode: `<!-- BAD: plain input with styled list, no ARIA, no keyboard navigation -->
<label for="city">City</label>
<input type="text" id="city" autocomplete="off" />
<ul class="suggestions" id="city-suggestions" style="display:none">
  <li onclick="selectCity('Toronto')">Toronto</li>
  <li onclick="selectCity('Ottawa')">Ottawa</li>
  <li onclick="selectCity('Vancouver')">Vancouver</li>
</ul>

<!-- JS shows list on input but Arrow keys do nothing -->
<!-- Screen reader announces only: City, edit text -->`,
    fixedCode: `<!-- GOOD: role=combobox, aria-expanded, aria-controls, listbox + options -->
<label for="city">City</label>
<input
  type="text"
  id="city"
  role="combobox"
  aria-expanded="false"
  aria-autocomplete="list"
  aria-controls="city-listbox"
  aria-activedescendant=""
  autocomplete="off"
/>
<ul
  role="listbox"
  id="city-listbox"
  hidden
>
  <li role="option" id="city-opt-1" tabindex="-1">Toronto</li>
  <li role="option" id="city-opt-2" tabindex="-1">Ottawa</li>
  <li role="option" id="city-opt-3" tabindex="-1">Vancouver</li>
</ul>

<!-- JS keyboard pattern:
  Arrow Down: open list (aria-expanded=true), move active option, set aria-activedescendant
  Arrow Up/Down: navigate options
  Enter: select option value into input, close list (aria-expanded=false)
  Escape: close list, return focus to input -->`
  },

  tooltip: {
    badCode: `<!-- BAD: hover only, no focus, no ARIA -->
<button id="info-btn" class="icon-btn">
  <span aria-hidden="true">?</span>
</button>
<div class="tooltip" id="info-tip" style="display:none">
  More information about this setting
</div>

<script>
  const btn = document.getElementById('info-btn');
  const tip = document.getElementById('info-tip');
  btn.addEventListener('mouseenter', () => { tip.style.display = 'block'; });
  btn.addEventListener('mouseleave', () => { tip.style.display = 'none'; });
</script>

<!-- Keyboard users never see the tooltip -->
<!-- Screen reader announces only: button -->`,
    fixedCode: `<!-- GOOD: focus + hover, role=tooltip, aria-describedby, Escape to dismiss -->
<button
  id="info-btn"
  class="icon-btn"
  aria-describedby="info-tip"
  aria-label="More information"
>
  <span aria-hidden="true">?</span>
</button>
<div
  role="tooltip"
  id="info-tip"
  hidden
>
  More information about this setting
</div>

<script>
  const btn = document.getElementById('info-btn');
  const tip = document.getElementById('info-tip');
  let open = false;

  function show() { tip.hidden = false; open = true; }
  function hide() { tip.hidden = true; open = false; }

  btn.addEventListener('mouseenter', show);
  btn.addEventListener('focus', show);
  btn.addEventListener('mouseleave', (e) => {
    if (!tip.contains(e.relatedTarget)) hide();
  });
  btn.addEventListener('blur', hide);
  tip.addEventListener('mouseenter', show);
  tip.addEventListener('mouseleave', hide);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) { hide(); e.stopPropagation(); }
  });
</script>

<!-- Notes:
  - aria-describedby links trigger to tooltip for screen readers
  - role=tooltip exposes the element as tooltip content
  - Show on focus and hover for keyboard and mouse users
  - Escape dismisses without moving focus
  - Keep visible when pointer moves onto the tooltip -->`
  },

  datepicker: {
    badCode: `<!-- BAD: div grid, Tab through every date, click only -->
<label>Appointment date</label>
<input type="text" id="appt-date" placeholder="Select date" readonly />
<div class="calendar" id="cal" hidden>
  <div class="cal-row">
    <div tabindex="0" onclick="pick('2026-06-01')">1</div>
    <div tabindex="0" onclick="pick('2026-06-02')">2</div>
    <!-- ... every date is tabindex=0, Tab visits each one -->
  </div>
</div>

<!-- Arrow keys do nothing. No aria-selected. No text fallback. -->`,
    fixedCode: `<!-- GOOD: labelled input fallback + grid calendar with ARIA -->
<label for="appt-date">Appointment date</label>
<input
  type="date"
  id="appt-date"
  aria-describedby="appt-date-hint"
/>
<span id="appt-date-hint">Format: YYYY-MM-DD. Or use the calendar button.</span>

<button
  type="button"
  aria-haspopup="dialog"
  aria-expanded="false"
  aria-controls="cal-dialog"
  id="cal-trigger"
>
  Open calendar
</button>

<div
  role="dialog"
  id="cal-dialog"
  aria-label="Choose appointment date"
  hidden
>
  <table role="grid" aria-label="June 2026">
    <thead>
      <tr>
        <th scope="col">Sun</th>
        <th scope="col">Mon</th>
        <!-- ... -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td role="gridcell" tabindex="-1" aria-selected="false">1</td>
        <td role="gridcell" tabindex="0" aria-selected="true">2</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- JS: Arrow keys move gridcell focus; Enter/Space selects;
  Page Up/Down change month; Escape closes dialog;
  Always keep type=date or text input as the accessible fallback -->`
  },

  carousel: {
    badCode: `<!-- BAD: auto-play, no pause, div prev/next, silent slide changes -->
<div class="carousel" data-autoplay="true">
  <div class="slide active">Welcome to our product</div>
  <div class="slide">New features this month</div>
  <div class="slide">Sign up today</div>
  <div class="prev" onclick="prevSlide()">‹</div>
  <div class="next" onclick="nextSlide()">›</div>
</div>

<script>
  setInterval(nextSlide, 4000); // no pause button
</script>

<!-- Keyboard cannot reach prev/next. Screen reader hears nothing on change. -->`,
    fixedCode: `<!-- GOOD: pause, button controls, labelled slides, aria-live -->
<section aria-roledescription="carousel" aria-label="Featured announcements">
  <div aria-live="polite" aria-atomic="true" class="sr-only" id="carousel-status"></div>

  <div
    role="group"
    aria-roledescription="slide"
    aria-label="Slide 1 of 3: Welcome to our product"
    id="slide-1"
  >
    Welcome to our product
  </div>

  <button type="button" id="carousel-pause" aria-label="Pause rotation">
    Pause
  </button>
  <button type="button" aria-label="Previous slide" onclick="prevSlide()">
    Previous
  </button>
  <button type="button" aria-label="Next slide" onclick="nextSlide()">
    Next
  </button>
</section>

<!-- JS: pause stops setInterval; update aria-label on active slide;
  write slide title to #carousel-status for aria-live announcement;
  pause auto-play on focusin and mouseenter; respect prefers-reduced-motion -->`
  },

  progress: {
    badCode: `<!-- BAD: visual spinner only, no ARIA, silent to screen readers -->
<form onsubmit="uploadFile(event)">
  <button type="submit">Upload file</button>
</form>
<div class="spinner" id="loader" style="display:none"></div>
<div class="progress-bar" style="width:45%"></div>

<!-- Screen reader hears nothing during upload or on complete -->`,
    fixedCode: `<!-- GOOD: determinate progressbar + live region for completion -->
<p id="upload-label">Uploading document.pdf</p>
<div
  role="progressbar"
  aria-labelledby="upload-label"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="45"
>
  <div class="progress-fill" style="width:45%"></div>
</div>
<p aria-hidden="true">45% complete</p>

<!-- Indeterminate loading alternative -->
<div
  role="status"
  aria-live="polite"
  aria-busy="true"
  id="upload-status"
>
  Uploading, please wait…
</div>

<!-- JS: update aria-valuenow and visible text as upload progresses;
  on complete: aria-busy=false, status text = "Upload complete";
  aria-live region announces the change -->`
  },

  pagination: {
    badCode: `<!-- BAD: div wrapper, current page is a link, no aria-current -->
<div class="pagination">
  <a href="?page=1">Previous</a>
  <a href="?page=1">1</a>
  <a href="?page=2">2</a>
  <a href="?page=3" aria-disabled="true">3</a>
  <a href="?page=4">4</a>
  <a href="?page=4">Next</a>
</div>

<!-- Not a landmark. Current page announced as link. No position context. -->`,
    fixedCode: `<!-- GOOD: nav landmark, aria-current, current page is not a link -->
<nav aria-label="Pagination">
  <ul>
    <li>
      <a href="?page=2" aria-label="Previous page, page 2">
        Previous
      </a>
    </li>
    <li><a href="?page=1">1</a></li>
    <li><a href="?page=2">2</a></li>
    <li>
      <span aria-current="page">3</span>
    </li>
    <li><a href="?page=4">4</a></li>
    <li>
      <a href="?page=4" aria-label="Next page, page 4">
        Next
      </a>
    </li>
  </ul>
</nav>

<!-- Notes:
  - nav + aria-label distinguishes pagination from main nav
  - aria-current=page on span, not <a>
  - Descriptive aria-label on Previous/Next when text alone is ambiguous
  - Use a list (ul/li) for a clear structure -->`
  },

  dragdrop: {
    badCode: `<!-- BAD: drag only, no keyboard way to reorder -->
<ul id="task-list">
  <li draggable="true" ondragstart="drag(event)">Write accessibility report</li>
  <li draggable="true" ondragstart="drag(event)">Review pull requests</li>
  <li draggable="true" ondragstart="drag(event)">Update documentation</li>
</ul>

<!-- Keyboard users cannot reorder. Screen reader hears list items only. -->`,
    fixedCode: `<!-- GOOD: move buttons + position info + live announcement; drag optional -->
<div aria-live="polite" class="sr-only" id="reorder-status"></div>
<ul id="task-list">
  <li id="task-1">
    <span id="task-1-pos" class="sr-only">Position 1 of 3</span>
    <span aria-describedby="task-1-pos">Write accessibility report</span>
    <button type="button" aria-label="Move Write accessibility report down" onclick="moveDown(1)">
      Move down
    </button>
  </li>
  <li id="task-2" draggable="true">
    <span id="task-2-pos" class="sr-only">Position 2 of 3</span>
    <span aria-describedby="task-2-pos">Review pull requests</span>
    <button type="button" aria-label="Move Review pull requests up" onclick="moveUp(2)">Move up</button>
    <button type="button" aria-label="Move Review pull requests down" onclick="moveDown(2)">Move down</button>
  </li>
  <!-- ... -->
</ul>

<!-- JS: buttons reorder DOM; update sr-only position text;
  set #reorder-status to "Moved to position 2 of 3";
  pointer drag remains optional enhancement -->`
  },

  radiocheckbox: {
    badCode: `<!-- BAD: bold heading only, no fieldset/legend -->
<p><strong>Preferred contact method</strong></p>
<div>
  <input type="radio" id="email" name="contact" />
  <label for="email">Email</label>
  <input type="radio" id="phone" name="contact" />
  <label for="phone">Phone</label>
</div>

<p><strong>Newsletter topics</strong></p>
<div>
  <input type="checkbox" id="news" />
  <label for="news">Product news</label>
  <input type="checkbox" id="events" />
  <label for="events">Events</label>
</div>

<!-- Screen reader: "Email, radio button" with no group question -->`,
    fixedCode: `<!-- GOOD: fieldset + legend for each group -->
<fieldset>
  <legend>Preferred contact method</legend>
  <div>
    <input type="radio" id="contact-email" name="contact" value="email" />
    <label for="contact-email">Email</label>
  </div>
  <div>
    <input type="radio" id="contact-phone" name="contact" value="phone" />
    <label for="contact-phone">Phone</label>
  </div>
</fieldset>

<fieldset>
  <legend>Newsletter topics (select all that apply)</legend>
  <div>
    <input type="checkbox" id="news" name="topics" value="news" />
    <label for="news">Product news</label>
  </div>
  <div>
    <input type="checkbox" id="events" name="topics" value="events" />
    <label for="events">Events</label>
  </div>
</fieldset>

<!-- Notes:
  - legend is announced with each option in the group
  - Radio: same name attribute; Arrow keys move within group
  - Checkbox: Space toggles; Tab moves between checkboxes
  - Never replace fieldset/legend with a styled div or heading alone -->`
  },

  search: {
    badCode: `<!-- BAD: placeholder only, div wrapper, icon button with no name -->
<div class="search-box">
  <input type="search" placeholder="Search..." />
  <button type="submit">
    <svg aria-hidden="true">...</svg>
  </button>
</div>

<!-- No search landmark. No label. Submit button unnamed. -->`,
    fixedCode: `<!-- GOOD: role=search landmark, labelled input, named submit -->
<form role="search">
  <label for="site-search" class="sr-only">Search</label>
  <input
    type="search"
    id="site-search"
    name="q"
    aria-label="Search"
  />
  <button type="submit" aria-label="Submit search">
    <svg aria-hidden="true" focusable="false">...</svg>
  </button>
</form>

<!-- Notes:
  - role=search creates a landmark (jump with screen reader shortcuts)
  - Visible label preferred; sr-only label + aria-label both work
  - Placeholder alone is not a substitute for a label
  - Icon-only submit needs aria-label -->`
  },

  infinitescroll: {
    badCode: `<!-- BAD: infinite scroll injects items silently, focus jumps -->
<ul id="feed">
  <li>Post 1</li>
  <li>Post 2</li>
</ul>

<script>
  window.addEventListener('scroll', () => {
    if (nearBottom()) {
      fetch('/api/feed?page=2').then(data => {
        data.items.forEach(item => feed.appendChild(renderItem(item)));
        // No announcement. Focus may jump if list reflows.
      });
    }
  });
</script>

<!-- Screen reader users never know more posts loaded -->`,
    fixedCode: `<!-- GOOD: Load More button, aria-live status, focus stays on button -->
<ul id="feed" aria-label="Posts">
  <li>Post 1</li>
  <li>Post 2</li>
</ul>

<div aria-live="polite" aria-atomic="true" id="feed-status"></div>

<button type="button" id="load-more" aria-controls="feed">
  Load more posts
</button>

<script>
  const btn = document.getElementById('load-more');
  const status = document.getElementById('feed-status');

  btn.addEventListener('click', async () => {
    status.textContent = 'Loading more posts…';
    btn.disabled = true;
    const data = await fetch('/api/feed?page=2').then(r => r.json());
    const added = appendItems(data.items);
    status.textContent = added + ' new posts loaded. ' + totalCount() + ' posts total.';
    btn.disabled = false;
    btn.focus(); // focus stays on Load More
  });
</script>

<!-- Optional: keep infinite scroll for pointer users but never remove Load More -->`
  },

  breadcrumb: {
    badCode: `<!-- BAD: div trail, all links, separators announced -->
<div class="breadcrumb">
  <a href="/">Home</a> /
  <a href="/products">Products</a> /
  <a href="/laptops">Laptops</a> /
  <a href="/macbook-pro">MacBook Pro</a>
</div>`,
    fixedCode: `<!-- GOOD: labelled nav, ol, aria-current, hidden separators -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li>
      <span aria-hidden="true">/</span>
      <a href="/products">Products</a>
    </li>
    <li>
      <span aria-hidden="true">/</span>
      <a href="/laptops">Laptops</a>
    </li>
    <li>
      <span aria-hidden="true">/</span>
      <span aria-current="page">MacBook Pro</span>
    </li>
  </ol>
</nav>

<!-- Notes:
  - Current page is text, not a link (no reload of same URL)
  - aria-current="page" exposes location to assistive tech
  - Ordered list communicates hierarchy and item count -->`
  },

  alertdialog: {
    badCode: `<!-- BAD: div confirmation, no alertdialog, focus not managed -->
<button type="button" onclick="openConfirm()">Delete account</button>
<div id="confirm" class="overlay" style="display:none">
  <h2>Delete your account?</h2>
  <p>This cannot be undone.</p>
  <button onclick="closeConfirm()">Cancel</button>
  <button onclick="deleteAccount()">Delete account</button>
</div>

<!-- Focus stays on trigger. Tab reaches page behind. Escape does nothing. -->`,
    fixedCode: `<!-- GOOD: alertdialog + focus on Cancel + trap + Escape -->
<button type="button" id="delete-trigger">Delete account</button>
<div
  id="confirm-dialog"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="confirm-title"
  aria-describedby="confirm-desc"
  hidden
>
  <h2 id="confirm-title">Delete your account?</h2>
  <p id="confirm-desc">This cannot be undone. All data will be removed.</p>
  <button type="button" id="confirm-cancel">Cancel</button>
  <button type="button" id="confirm-delete">Delete account</button>
</div>

<script>
  const trigger = document.getElementById('delete-trigger');
  const dialog = document.getElementById('confirm-dialog');
  const cancelBtn = document.getElementById('confirm-cancel');

  function openConfirm() {
    dialog.hidden = false;
    cancelBtn.focus(); // least destructive action first
    document.addEventListener('keydown', trapTab);
  }

  function closeConfirm() {
    dialog.hidden = true;
    document.removeEventListener('keydown', trapTab);
    trigger.focus();
  }

  function trapTab(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeConfirm(); return; }
    if (e.key !== 'Tab') return;
    const focusable = dialog.querySelectorAll('button:not([disabled])');
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
</script>`
  },

  fileupload: {
    badCode: `<!-- BAD: input display:none, div replacement, no announcement -->
<div class="upload-area" onclick="document.getElementById('file').click()">
  <span>Choose a file</span>
</div>
<input type="file" id="file" style="display:none" />

<!-- Div is not focusable. Screen reader skips upload. Keyboard blocked. -->`,
    fixedCode: `<!-- GOOD: visually hidden input + label button + live region for filename -->
<div class="file-upload">
  <input
    type="file"
    id="resume"
    class="sr-only-input"
    accept=".pdf,.doc,.docx"
    aria-describedby="file-help"
  />
  <label for="resume" class="upload-button">
    Choose file to upload
  </label>
  <p id="file-help">PDF or Word document, maximum 5 MB</p>
  <div aria-live="polite" id="file-selected"></div>
</div>

<style>
  /* Visually hide but keep focusable — do NOT use display:none */
  .sr-only-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
  }
  .upload-button { /* style as needed */ }
</style>

<script>
  document.getElementById('resume').addEventListener('change', (e) => {
    const name = e.target.files[0]?.name || 'No file selected';
    document.getElementById('file-selected').textContent =
      'Selected file: ' + name;
  });
</script>

<!-- Notes:
  - label for=id opens picker on click and is announced as the control name
  - Input stays keyboard accessible (Tab, Enter, Space)
  - Never use display:none on the native input -->`
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
