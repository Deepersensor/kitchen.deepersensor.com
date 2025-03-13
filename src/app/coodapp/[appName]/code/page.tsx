"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CodeViewPage() {
  const [code, setCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { appName } = useParams<{ appName: string }>();
  const router = useRouter();

  useEffect(() => {
    // Retrieve the code from session storage
    const storedCode = sessionStorage.getItem(`coodapp:${appName}:code`);
    
    if (storedCode) {
      setCode(storedCode);
    } else {
      // If no code is found, redirect to the app page
      router.push(`/coodapp/${appName}`);
    }
    
    setIsLoading(false);
  }, [appName, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[var(--accent)] border-t-transparent rounded-full"></div>
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
              onClick={() => router.push(`/coodapp/${appName}`)}
              className="p-2 rounded-full hover:bg-[var(--accent)]/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Code for {appName}</h1>
          </div>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(code || "");
              alert("Code copied to clipboard!");
            }}
            className="kitchen-card px-3 py-1.5 rounded-lg hover:bg-[var(--accent)]/10 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Code
          </button>
        </div>
      </header>

      {/* Code Display */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto kitchen-card p-6 rounded-xl overflow-hidden">
          <pre className="overflow-x-auto text-sm font-mono p-4 bg-black/20 rounded-lg whitespace-pre-wrap">
            {code}
          </pre>
        </div>
      </main>
    </div>
  );
}
