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

// Create the MCP server
const server = new Server(
  {
    name: "wcag-kit",
    version: "0.1.0",
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
        description: "List all available WCAG accessibility patterns. Returns pattern names, WCAG references, and summaries. Use this first to see what patterns are available.",
        inputSchema: {
          type: "object",
          properties: {},
          required: []
        }
      },
      {
        name: "get_pattern",
        description: "Get full details for a specific accessibility pattern including what breaks, what to fix, code guidance, and who is affected. Use list_patterns first to get valid pattern IDs.",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Pattern ID e.g. dropdown, modal, form, headings, button, image, contrast, navigation, accordion, tabs, toast, table, focus"
            }
          },
          required: ["id"]
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
      const patterns = listPatterns();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(patterns, null, 2)
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
