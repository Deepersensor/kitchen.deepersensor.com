"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { generateCodeFromPrompt, extractCodeFromMarkdown, ModelId } from "@/lib/github-models";

export default function AppPreviewPage() {
  const [isGenerating, setIsGenerating] = useState(true);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [showOverlay, setShowOverlay] = useState(true);
  const [modelId, setModelId] = useState<ModelId>("gpt-4o-mini");
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { appName } = useParams<{ appName: string }>();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Retrieve the prompt from session storage
    const storedPrompt = sessionStorage.getItem(`coodapp:${appName}:prompt`);
    const storedModel = sessionStorage.getItem(`coodapp:${appName}:model`) as ModelId;
    
    if (storedPrompt) {
      setPrompt(storedPrompt);
      setEditedPrompt(storedPrompt);
      
      if (storedModel) {
        setModelId(storedModel);
      }
      
      // Generate the code
      generateApp(storedPrompt, storedModel || modelId);
    } else {
      setError("No prompt found. Please go back and create a new app.");
      setIsGenerating(false);
    }
  }, [appName]);

  async function generateApp(appPrompt: string, model: ModelId) {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Generate code from the prompt
      const generatedCode = await generateCodeFromPrompt(appPrompt, model);
      
      // Extract the code from the markdown
      const extractedCode = extractCodeFromMarkdown(generatedCode || "");
      
      // Set the code
      setCode(extractedCode);
      
      // Store the code in session storage
      sessionStorage.setItem(`coodapp:${appName}:code`, extractedCode);
    } catch (error) {
      console.error("Error generating app:", error);
      setError("Failed to generate app. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleRegenerateApp() {
    setIsRegenerating(true);
    generateApp(editedPrompt, modelId).finally(() => setIsRegenerating(false));
    setIsEditingPrompt(false);
  }

  function updateIframeContent() {
    if (iframeRef.current && code) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }

  useEffect(() => {
    updateIframeContent();
  }, [code]);

  if (isGenerating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="kitchen-card p-8 rounded-xl max-w-lg w-full flex flex-col items-center">
          <div className="animate-spin h-12 w-12 border-4 border-[var(--accent)] border-t-transparent rounded-full mb-6"></div>
          <h2 className="text-2xl font-bold mb-2">Generating Your App</h2>
          <p className="text-center opacity-80">
            We're using AI to create your web app based on your description. This might take a minute...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="kitchen-card p-8 rounded-xl max-w-lg w-full">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => router.push('/coodapp')}
            className="magic-btn px-6 py-3 rounded-full text-white font-medium"
          >
            Back to Coodapp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="kitchen-card p-4 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/coodapp')}
              className="p-2 rounded-full hover:bg-[var(--accent)]/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold capitalize">{appName?.replace(/-/g, ' ')}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="p-2 rounded-full hover:bg-[var(--accent)]/10"
            >
              {showOverlay ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={() => setIsEditingPrompt(true)}
              className="p-2 rounded-full hover:bg-[var(--accent)]/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to regenerate this app?')) {
                  handleRegenerateApp();
                }
              }}
              className="p-2 rounded-full hover:bg-[var(--accent)]/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* App Preview */}
      <main className="flex-1 relative">
        <iframe
          ref={iframeRef}
          title="App Preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
        />
        
        {/* Overlay */}
        {showOverlay && (
          <div className="absolute top-4 right-4 max-w-md kitchen-card p-4 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">App Details</h3>
              <button
                onClick={() => setShowOverlay(false)}
                className="p-1 rounded-full hover:bg-black/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm opacity-80 mb-2">
              <strong>Prompt:</strong> {prompt}
            </p>
            <p className="text-sm opacity-80">
              <strong>Model:</strong> {modelId}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code || "");
                  alert("Code copied to clipboard!");
                }}
                className="text-sm kitchen-card px-3 py-1.5 rounded-lg hover:bg-[var(--accent)]/10 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Code
              </button>
              <button
                onClick={() => window.open(`/coodapp/${appName}/code`, '_blank')}
                className="text-sm kitchen-card px-3 py-1.5 rounded-lg hover:bg-[var(--accent)]/10 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                View Code
              </button>
            </div>
          </div>
        )}
        
        {/* Edit Prompt Modal */}
        {isEditingPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="kitchen-card p-6 rounded-xl max-w-2xl w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Edit Prompt</h3>
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="kitchen-card w-full p-4 min-h-[200px] text-[var(--foreground)] bg-black/10 resize-none rounded-xl mb-4"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingPrompt(false)}
                  className="kitchen-card px-4 py-2 rounded-lg hover:bg-[var(--accent)]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegenerateApp}
                  disabled={isRegenerating}
                  className="magic-btn px-4 py-2 rounded-lg text-white flex items-center gap-2"
                >
                  {isRegenerating ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                      <span>Regenerating...</span>
                    </>
                  ) : (
                    <span>Apply & Regenerate</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
