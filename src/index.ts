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
// This is what Claude sees when it connects to wcag-kit
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_patterns",
        description:
          "List all available WCAG accessibility patterns. Returns pattern names, WCAG references, and summaries. Use this first to see what patterns are available before calling other tools.",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "get_pattern",
        description:
          "Get full details for a specific accessibility pattern including what breaks, what to fix, who is affected, and how to test. Use list_patterns first to get valid pattern IDs.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description:
                "Pattern ID. Valid values: dropdown, modal, form, headings, button, image, contrast, navigation, accordion, tabs, toast, table, focus"
            }
          },
          required: ["id"]
        }
      },
      {
        name: "check_component",
        description:
          "Scan an HTML snippet for common accessibility issues. Returns a list of violations with WCAG references, impact levels, and plain-English fix suggestions. This is a static pattern check, not a full browser audit. For production use, also run axe-core.",
        inputSchema: {
          type: "object",
          properties: {
            html: {
              type: "string",
              description:
                "The HTML snippet to check. Paste the component markup directly. Example: '<div onclick=\"open()\">Menu</div>'"
            }
          },
          required: ["html"]
        }
      },
      {
        name: "suggest_fix",
        description:
          "Get a side-by-side bad and good code example for a specific accessibility pattern. Returns the broken version, the accessible version, and an explanation of what changed and why. Use list_patterns first to get valid pattern IDs.",
        inputSchema: {
          type: "object",
          properties: {
            patternId: {
              type: "string",
              description:
                "Pattern ID to get fix examples for. Valid values: dropdown, modal, form, headings, button, image, contrast, navigation, accordion, tabs, toast, table, focus"
            }
          },
          required: ["patternId"]
        }
      }
    ]
  };
});

// Handle tool calls
// This runs when Claude calls one of the tools above
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
