# wcag-kit

[![npm version](https://img.shields.io/npm/v/wcag-kit.svg)](https://www.npmjs.com/package/wcag-kit)
[![license](https://img.shields.io/npm/l/wcag-kit.svg)](https://github.com/jainishsoni2026/wcag-kit/blob/main/README.md)

An MCP server that brings WCAG accessibility knowledge into your AI editor.

Ask natural language questions about accessibility. Paste broken components and get diagnosed and fixed. No WCAG expertise required.

Built by [Jainish Soni](https://wcaginpractice.com) — CPACC Certified.

---

## What it does

wcag-kit gives your AI editor accessibility tools:

| Tool | What it does |
|---|---|
| `list_patterns` | Lists all available WCAG patterns |
| `get_pattern` | Returns full details for a specific pattern |
| `check_component` | Scans an HTML snippet for accessibility violations |
| `suggest_fix` | Returns bad and good code examples for any pattern |

You do not call these tools directly. Just ask naturally:

> "Is this component accessible?"
> "I'm building a modal — what do I need to know?"
> "Check this dropdown for WCAG issues"
> "Show me how to write an accessible data table"

Your AI assistant reads the tools and decides when to use them.

---

## Patterns covered

| ID | Component | WCAG Reference |
|---|---|---|
| dropdown | Dropdown Menu | WCAG 2.1.1 |
| modal | Modal / Dialog | WCAG 2.1.2 |
| form | Form Validation | WCAG 1.3.1 |
| headings | Heading Hierarchy | WCAG 1.3.1 |
| button | Button Accessibility | WCAG 4.1.2 |
| image | Image Alt Text | WCAG 1.1.1 |
| contrast | Color Contrast | WCAG 1.4.3 |
| navigation | Navigation Landmark | WCAG 2.4.1 |
| accordion | Accordion / Disclosure | WCAG 4.1.2 |
| tabs | Tabs Component | WCAG 2.1.1 |
| toast | Toast / Live Region | WCAG 4.1.3 |
| table | Data Table | WCAG 1.3.1 |
| focus | Focus Management | WCAG 2.4.3 |
| combobox | Combobox (List Autocomplete) | WCAG 2.1.1 |
| tooltip | Tooltip | WCAG 1.4.13 |
| datepicker | Date Picker | WCAG 2.1.1 |
| carousel | Carousel | WCAG 2.1.1 |
| progress | Progress Indicator | WCAG 4.1.3 |
| pagination | Pagination | WCAG 2.4.1 |
| dragdrop | Drag and Drop | WCAG 2.5.7 |
| radiocheckbox | Radio Group and Checkbox Group | WCAG 1.3.1 |
| search | Search | WCAG 4.1.2 |
| infinitescroll | Infinite Scroll / Load More | WCAG 4.1.3 |
| fileupload | File Upload | WCAG 4.1.2 |
| skeleton | Skeleton / Loading State | WCAG 4.1.3 |
| alertdialog | Alert Dialog | WCAG 2.1.2 |
| breadcrumb | Breadcrumb | WCAG 2.4.8 |

---

## Install

Add to your MCP config file:

```json
{
  "mcpServers": {
    "wcag-kit": {
      "command": "npx",
      "args": ["wcag-kit"]
    }
  }
}
```

Restart your editor. wcag-kit is now available in every AI chat session.

**Config file locations:**
- Cursor: `~/.cursor/mcp.json`
- Claude Desktop: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Other editors: check your editor's MCP documentation

---

## Example

Paste this into any MCP-compatible AI chat:

> I'm building a notification that pops up after a user saves a form. Any accessibility concerns?

wcag-kit will identify the WCAG 4.1.3 live region requirement, explain who is affected, show you the broken pattern and the fix, and link to a working example.

No tool names. No WCAG knowledge required. Just ask.

---

## Requirements

- Node.js 18 or higher
- Any MCP-compatible AI editor

---
## Part of the wcaginpractice.com ecosystem

wcag-kit is one part of a free accessibility toolkit:

- **wcag-kit** (this tool) — MCP server that gives AI assistants deep WCAG knowledge
- **WCAG Lens** — VS Code/Cursor extension with real-time diagnostics as you type:
  https://marketplace.visualstudio.com/items?itemName=jainishsoni.wcag-lens
- **wcaginpractice.com** — interactive playground with 27 broken vs fixed patterns:
  https://wcaginpractice.com

Use all three together: learn on the site, enforce with the extension, 
ask your AI assistant using wcag-kit.

## Learn more

- Full interactive examples: [wcaginpractice.com](https://wcaginpractice.com)
- WCAG Lens extension: [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=jainishsoni.wcag-lens)
- WCAG 2.2 specification: [w3.org/WAI/WCAG22](https://www.w3.org/WAI/WCAG22/)
- Suggest a pattern: [wcaginpractice.com/contribute](https://wcaginpractice.com/contribute)
- Report an issue: [github.com/jainishsoni2026/wcag-kit/issues](https://github.com/jainishsoni2026/wcag-kit/issues)

## License

MIT
