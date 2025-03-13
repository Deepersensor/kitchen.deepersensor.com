import { AzureKeyCredential } from "@azure/core-auth";
import ModelClient from "@azure-rest/ai-inference";
import OpenAI from "openai";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
const ENDPOINT = "https://models.inference.ai.azure.com";

// Available models
export const AVAILABLE_MODELS = {
  "gpt-4o": {
    name: "GPT-4o",
    provider: "Azure OpenAI",
    description: "Most powerful model with reasoning and creativity capabilities",
    maxTokens: 4096,
    type: "openai"
  },
  "gpt-4o-mini": {
    name: "GPT-4o Mini",
    provider: "Azure OpenAI",
    description: "Balanced performance for everyday tasks",
    maxTokens: 8192,
    type: "openai"
  },
  "Mistral-large": {
    name: "Mistral Large",
    provider: "Mistral AI",
    description: "High-performance model for complex reasoning",
    maxTokens: 4096,
    type: "mistral"
  },
  "Mistral-small": {
    name: "Mistral Small",
    provider: "Mistral AI",
    description: "Fast and efficient for simpler tasks",
    maxTokens: 4096,
    type: "mistral"
  },
  "Meta-Llama-3-70B-Instruct": {
    name: "Llama 3 70B",
    provider: "Meta",
    description: "Open source model with strong capabilities",
    maxTokens: 4096,
    type: "azure"
  }
};

export type ModelId = keyof typeof AVAILABLE_MODELS;

// Create OpenAI client
export function createOpenAIClient() {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set");
  }
  
  return new OpenAI({ 
    baseURL: ENDPOINT, 
    apiKey: GITHUB_TOKEN 
  });
}

// Create Azure AI Inference client
export function createAzureClient() {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is not set");
  }
  
  return new ModelClient(
    ENDPOINT, 
    new AzureKeyCredential(GITHUB_TOKEN)
  );
}

// Generate code from prompt using OpenAI
export async function generateCodeFromPrompt(prompt: string, modelId: ModelId = "gpt-4o-mini") {
  try {
    const client = createOpenAIClient();
    
    const codeGenerationPrompt = `
You are an expert web developer. Create a complete, functional, visually appealing web application based on this description:

"${prompt}"

Return ONLY the complete HTML, CSS, and JavaScript code needed to run this app directly in a browser.
Your entire response must be a single code block containing the complete HTML file with embedded CSS and JavaScript.
Make sure all functionality works, the design is attractive, and the application is responsive.
Do not include explanations, just the code.
`;

    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a code generation assistant that specializes in creating web applications. Output only the code without explanations." },
        { role: "user", content: codeGenerationPrompt }
      ],
      model: modelId,
      temperature: 0.7,
      max_tokens: AVAILABLE_MODELS[modelId].maxTokens
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating code:", error);
    throw new Error("Failed to generate code. Please try again.");
  }
}

// Extract code from markdown
export function extractCodeFromMarkdown(markdown: string): string {
  // Extract code blocks with various delimiters
  const codeBlockRegex = /```(?:html|javascript|js|)\s*([\s\S]*?)```/g;
  const matches = [...markdown.matchAll(codeBlockRegex)];
  
  if (matches.length > 0) {
    // Use the first code block
    return matches[0][1].trim();
  }
  
  // If no code block found, return the entire content
  // Remove markdown formatting if any
  return markdown
    .replace(/^#+ /gm, '') // Remove headings
    .replace(/\*\*/g, '')   // Remove bold
    .replace(/\*/g, '')     // Remove italic
    .replace(/`/g, '')      // Remove inline code
    .trim();
}

// Get chat completion
export async function getChatCompletion(
  messages: {role: string, content: string}[], 
  modelId: ModelId = "gpt-4o-mini"
) {
  try {
    // For OpenAI models
    if (AVAILABLE_MODELS[modelId].type === "openai") {
      const client = createOpenAIClient();
      
      const response = await client.chat.completions.create({
        messages,
        model: modelId,
        temperature: 0.7,
        max_tokens: AVAILABLE_MODELS[modelId].maxTokens
      });
      
      return response.choices[0].message.content;
    } 
    // For other models via Azure client
    else {
      const client = createAzureClient();
      
      const response = await client.path("/chat/completions").post({
        body: {
          messages,
          model: modelId,
          temperature: 0.7,
          max_tokens: AVAILABLE_MODELS[modelId].maxTokens
        }
      });
      
      if (response.status !== "200") {
        throw new Error("Failed to get chat completion");
      }
      
      return response.body.choices[0].message.content;
    }
  } catch (error) {
    console.error("Error getting chat completion:", error);
    throw new Error("Failed to get chat completion. Please try again.");
  }
}
