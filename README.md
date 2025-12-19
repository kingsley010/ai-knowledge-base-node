# AI Knowledge Base

A Node.js application for ingesting documents and answering questions using RAG (Retrieval-Augmented Generation) with Google's Gemini API.

## Setup

1. Install dependencies: `npm install`

2. Set up environment variables: Create a `.env` file with your Gemini API key:

   ```
   GEMINI_API_KEY=your_gemini_key_here
   ```

3. Run the server: `npm run dev` (for development with auto-restart on changes) or `npm start` (for production)

## Debugging

To debug the application:
- Run `npm run debug` to start the server with the Node.js inspector enabled.
- Open Chrome and navigate to `chrome://inspect` to attach the debugger.
- Alternatively, use VS Code's built-in debugger by creating a launch configuration for Node.js.

## API Endpoints

- **POST /api/knowledge/upload**: Upload a document (send text in the request body)
- **POST /api/knowledge/ask**: Ask a question (send JSON with a "question" field, e.g., `{"question": "What is AI?"}`)

## Usage Example

After starting the server, you can use tools like curl or Postman to interact with the API.

Example curl commands:

```bash
# Upload a document
curl -X POST http://localhost:3000/api/knowledge/upload \
  -H "Content-Type: text/plain" \
  -d "Your document text here."

# Ask a question
curl -X POST http://localhost:3000/api/knowledge/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the main topic?"}'
```

## Troubleshooting

- Ensure you have a valid Gemini API key.
- The vector store is in-memory, so data will be lost on restart.
- For production, consider using a persistent vector database.