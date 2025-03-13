"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateCodeFromPrompt, AVAILABLE_MODELS, ModelId } from "@/lib/github-models";

export default function CoodappPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelId>("gpt-4o-mini");
  const router = useRouter();
  const [examples, setExamples] = useState<string[]>([
    "Create a task management app with drag and drop functionality",
    "Make a weather forecast app with animated icons",
    "Build a minimalist pomodoro timer with sound notifications",
    "Design a recipe finder app with filtering options"
  ]);

  const generateRandomAppName = () => {
    // Generate a random name from adjectives and nouns
    const adjectives = ["cosmic", "stellar", "vibrant", "swift", "lunar", "quantum", "radiant", "azure", "neon"];
    const nouns = ["wave", "pulse", "byte", "pixel", "vista", "nova", "flow", "spark", "core"];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${adjective}-${noun}`;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError("Please enter a description of the app you want to create.");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // Generate a random app name
      const appName = generateRandomAppName();
      
      // Store the prompt and app name in session storage so we can retrieve them later
      sessionStorage.setItem(`coodapp:${appName}:prompt`, prompt);
      sessionStorage.setItem(`coodapp:${appName}:model`, selectedModel);
      
      // Redirect to the generation page
      router.push(`/coodapp/${appName}`);
    } catch (error) {
      console.error("Failed to handle prompt:", error);
      setError("Something went wrong. Please try again.");
      setIsGenerating(false);
    }
  }

  function handleSelectExample(example: string) {
    setPrompt(example);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="kitchen-card p-4 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/')}
              className="p-2 rounded-full hover:bg-[var(--accent)]/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Coodapp</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full kitchen-card p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--tertiary)] inline-block text-transparent bg-clip-text">
            Create Web Apps with AI
          </h1>
          <p className="text-lg opacity-80 mb-6">
            Describe the app you want to build, and our AI will generate it for you.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the app you want to build in detail..."
                className="kitchen-card w-full p-4 min-h-[150px] text-[var(--foreground)] bg-black/10 resize-none rounded-xl"
                disabled={isGenerating}
              />
              {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as ModelId)}
                className="kitchen-card w-full p-3 bg-black/10 rounded-xl appearance-none"
                disabled={isGenerating}
              >
                {Object.entries(AVAILABLE_MODELS).map(([id, model]) => (
                  <option key={id} value={id}>
                    {model.name} - {model.provider}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isGenerating}
                className="magic-btn px-6 py-3 rounded-full text-white font-medium flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Generate App</span>
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8">
            <h2 className="text-xl font-medium mb-4">Or try one of these examples:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectExample(example)}
                  className="kitchen-card p-4 text-left hover:bg-[var(--accent)]/10 transition rounded-xl"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
