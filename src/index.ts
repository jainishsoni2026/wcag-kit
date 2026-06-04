#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { listPatterns } from "./tools/listPatterns.js";
import { getPattern } from "./tools/getPattern.js";
import { checkComponent } from "./tools/checkComponent.js";
import { suggestFix } from "./tools/suggestFix.js";

// Create the MCP server
const server = new Server(
  {
    name: "wcag-kit",
    version: "0.2.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register available tools
// The description field is what Claude reads to decide when to call each tool.
// Write descriptions as triggers, not just feature lists.
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_patterns",
        description:
          "Use this when a developer asks what accessibility patterns are available, " +
          "what wcag-kit covers, or what WCAG issues you can help with. " +
          "Also use this before calling get_pattern or suggest_fix to confirm a valid pattern ID exists. " +
          "Returns all 13 pattern names, WCAG references, and one-line summaries.",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "get_pattern",
        description:
          "Use this when a developer asks how to make a specific UI component accessible, " +
          "what WCAG rule applies to a component, who is affected by an inaccessible component, " +
          "or how to test a component for accessibility. " +
          "Trigger phrases include: 'how do I make X accessible', 'what is wrong with my X', " +
          "'explain the accessibility requirements for X', 'who does this affect'. " +
          "Valid pattern IDs: dropdown, modal, form, headings, button, image, contrast, " +
          "navigation, accordion, tabs, toast, table, focus.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description:
                "Pattern ID matching the component type. " +
                "Map common developer terms to IDs: " +
                "menu/select/combobox -> dropdown, " +
                "popup/overlay/lightbox -> modal, " +
                "input validation/error message -> form, " +
                "h1/h2/page structure -> headings, " +
                "click handler/div button/icon button -> button, " +
                "img/photo/icon -> image, " +
                "colour/color/contrast ratio -> contrast, " +
                "nav/menu bar/links -> navigation, " +
                "expand/collapse/FAQ -> accordion, " +
                "tab panel/tabbed interface -> tabs, " +
                "notification/snackbar/banner -> toast, " +
                "data grid/rows and columns -> table, " +
                "SPA/route change/page transition -> focus."
            }
          },
          required: ["id"]
        }
      },
      {
        name: "check_component",
        description:
          "Use this proactively whenever a developer shares HTML markup, " +
          "asks if their code is accessible, asks you to review a component, " +
          "or pastes code that contains interactive elements like buttons, forms, " +
          "images, inputs, modals, navs, tables, or custom widgets. " +
          "Do not wait to be asked explicitly. If HTML is present and accessibility " +
          "has not been confirmed, run this tool. " +
          "Trigger phrases include: 'is this accessible', 'check this', 'review my code', " +
          "'what is wrong with this', 'does this pass WCAG', 'audit this component'. " +
          "Returns a list of violations with WCAG references, impact levels, and fix suggestions. " +
          "Always follow up with suggest_fix for any critical or serious issues found.",
        inputSchema: {
          type: "object",
          properties: {
            html: {
              type: "string",
              description:
                "The HTML snippet to check. Extract just the relevant markup from " +
                "whatever the developer shared. Works with partial snippets, " +
                "full components, or copied browser inspector output."
            }
          },
          required: ["html"]
        }
      },
      {
        name: "suggest_fix",
        description:
          "Use this after check_component finds issues, or whenever a developer asks " +
          "how to fix an accessibility problem, asks for the correct pattern, " +
          "asks to see a working example, or asks what accessible code looks like. " +
          "Also use this when a developer asks about a specific pattern by name or describes " +
          "a component they are building. " +
          "Trigger phrases include: 'how do I fix this', 'show me the correct code', " +
          "'what does accessible X look like', 'give me an example', 'how should I write this'. " +
          "Returns the broken version, the accessible version, and a plain-English explanation " +
          "of every change made and why it matters. " +
          "Valid pattern IDs: dropdown, modal, form, headings, button, image, contrast, " +
          "navigation, accordion, tabs, toast, table, focus.",
        inputSchema: {
          type: "object",
          properties: {
            patternId: {
              type: "string",
              description:
                "Pattern ID matching the component the developer is asking about. " +
                "Use the same mapping as get_pattern: " +
                "menu/select/combobox -> dropdown, " +
                "popup/overlay/lightbox -> modal, " +
                "input validation/error message -> form, " +
                "h1/h2/page structure -> headings, " +
                "click handler/div button/icon button -> button, " +
                "img/photo/icon -> image, " +
                "colour/color/contrast ratio -> contrast, " +
                "nav/menu bar/links -> navigation, " +
                "expand/collapse/FAQ -> accordion, " +
                "tab panel/tabbed interface -> tabs, " +
                "notification/snackbar/banner -> toast, " +
                "data grid/rows and columns -> table, " +
                "SPA/route change/page transition -> focus."
            }
          },
          required: ["patternId"]
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "list_patterns": {
      const result = listPatterns();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }

    case "get_pattern": {
      const schema = z.object({ id: z.string() });
      const { id } = schema.parse(args);
      const result = getPattern(id);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }

    case "check_component": {
      const schema = z.object({ html: z.string() });
      const { html } = schema.parse(args);
      const result = checkComponent(html);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }

    case "suggest_fix": {
      const schema = z.object({ patternId: z.string() });
      const { patternId } = schema.parse(args);
      const result = suggestFix(patternId);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("wcag-kit MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
