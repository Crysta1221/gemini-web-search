# MCP Server for Gemini Google Search
This is an MCP server that provides Google search results using the Google search grounding feature of the Gemini API.

# Usage
For Cline, just set it as follows in `cline_mcp_settings.json`.
```json
{
"mcpServers": {
"gemini-web-search": {
"command": "cmd",
"args": ["/c", "npx","-y", "@crystaworld/gemini-web-search@latest"],
"env": {
"GEMINI_API_KEY": ""
},
"disabled": false,
}
}
}
```
For Linux/MacOS, just run `npx -y @crystaworld/gemini-web-search@latest` directly.

# Arguments
Normally, you don't need to think about these arguments, but you can check the arguments provided by this MCP here.
- `query *` - `string`: The text to search for
- `source *` - `boolean`: You can choose whether to display the quoted link after searching and summarizing. If you want to use fewer tokens, you can reduce the amount of tokens by setting this to `false`.

# Local environment
You can verify this MCP server in your local environment.
1. Clone this repository.
2. Install the package using `bun install`.
3. Build using `bun run build`. The artifact is output as `dist/index.js`.
4. For Cline, set the following in any `cline_mcp_settings.json`.
```json
  {
    "mcpServers": {
      "gemini-web-search": {
        "command": "node",
        "args": [
        "...\\dist\\index.js"
        ],
        "env": {
        "GEMINI_API_KEY": ""
        },
        "disabled": false,
      }
    }
  }
  ```
  Set your Gemini API key to `GEMINI_API_KEY`. API keys can be issued from https://aistudio.google.com/apikey.

  Also, the file path must be set to the absolute path to dist\index.js.  
5. Enjoy!

# Development environment
This MCP was created in the following environment.
- Node.js v22
- Bun v1.2.5
- Typescript v5
- @modelcontextprotocol/sdk v1.11.4
- @google/genai v0.14.1
- log4js v6.9.1
- zod v3.24.4

# License
This project is licensed under the MIT License.