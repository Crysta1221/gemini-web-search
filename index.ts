#!/usr/bin/env node
import { GoogleGenAI } from "@google/genai";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as log4js from "log4js";
import { z } from "zod";

// dependencies
const server = new McpServer({ name: "gemini-web-search", version: "0.1.0" });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models?hl=ja
const model = "gemini-2.0-flash";

// Create Server Tool
server.tool(
  "search",
  "Uses Gemini AI's grounding feature to perform Google searches. By default, `gemini-2.0-flash` is used.",
  {
    query: z.string().describe("Search query"),
    source: z.boolean().describe("View search source"),
  },
  async ({ query, source }) => {
    // https://ai.google.dev/gemini-api/docs/grounding?hl=ja&lang=javascript
    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    if (!response)
      return {
        content: [
          {
            type: "text",
            text: "An error occured while calling gemini API.",
          },
        ],
      };
    const result = response.text;
    const result_metadata =
      response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (source) {
      let links = [];
      if (Array.isArray(result_metadata)) {
        for (const c of result_metadata.slice(0, 5)) {
          const web = c.web;
          if (web) {
            links.push(`- ${web.title || "none"} : ${web.uri}`);
          }
        }
      }
      return {
        content: [
          {
            type: "text",
            text: `${result}\n\nSources:\n ${
              links.length ? links.join("\n") : "none"
            }`,
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `${result}`,
        },
      ],
    };
  }
);

// MCP Logger
async function main() {
  const transport = new StdioServerTransport();
  const logger = log4js.getLogger("MCP");
  await server.connect(transport);
  logger.level = "info";
  logger.info("MCP Server is running on stdio.");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
