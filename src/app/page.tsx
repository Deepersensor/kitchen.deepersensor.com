"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

// Project data
const projects = [
  {
    id: "coodapp",
    name: "Coodapp",
    description: "Create fully functional web applications directly from natural language prompts. Turn your ideas into code instantly.",
    image: "/project-coodapp.svg",
    isDefault: true,
    features: ["AI-powered code generation", "Real-time preview", "One-click deployment", "Customizable templates"]
  },
  {
    id: "chat",
    name: "Kitchen Chat",
    description: "Experience our experimental chat interface powered by multiple AI models",
    image: "/project-chat.svg",
    features: ["Multiple AI models", "Customizable themes", "Seamless conversation", "Model comparison"]
  },
  {
    id: "vexeroo",
    name: "Vexeroo Cars",
    description: "Next generation autonomous vehicle interface",
    image: "/project-vexeroo.svg",
  },
  {
    id: "web3lancer",
    name: "Web3lancer",
    description: "Decentralized freelancing platform powered by blockchain",
    image: "/project-web3lancer.svg",
  },
  {
    id: "bainaryglobe",
    name: "BainaryGlobe AI",
    description: "Cutting-edge AI solutions for complex global challenges",
    image: "/project-bainaryglobe.svg",
  },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState("coodapp");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const router = useRouter();

  const activeProjectData = projects.find(p => p.id === activeProject) || projects[0];
  
  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeProject === "coodapp" && promptValue.trim()) {
      // Store the prompt in session storage
      const appName = generateRandomAppName();
      sessionStorage.setItem(`coodapp:${appName}:prompt`, promptValue);
      sessionStorage.setItem(`coodapp:${appName}:model`, "gpt-4o-mini"); // Default model
      
      // Navigate to the Coodapp page
      router.push(`/coodapp/${appName}`);
    }
  };

  // Generate a random app name for Coodapp
  const generateRandomAppName = () => {
    const adjectives = ["cosmic", "stellar", "vibrant", "swift", "lunar", "quantum", "radiant", "azure", "neon"];
    const nouns = ["wave", "pulse", "byte", "pixel", "vista", "nova", "flow", "spark", "core"];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${adjective}-${noun}`;
  };
  
  const handleNavigateToApp = (projectId: string) => {
    if (projectId === "coodapp") {
      router.push('/coodapp');
    } else if (projectId === "chat") {
      router.push('/chat');
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-8 sm:p-12 gap-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
            <span className="text-white text-2xl font-bold">DS</span>
          </div>
          <h1 className="text-2xl font-bold">DeeperSensor Kitchen</h1>
        </div>
        <nav className="hidden sm:flex gap-6">
          <a href="#" className="hover:text-[var(--accent)] transition-colors">About</a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Projects</a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Team</a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col gap-12 py-8 max-w-7xl mx-auto w-full">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--tertiary)] inline-block text-transparent bg-clip-text">
            Welcome to Our Experimental Kitchen
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-80">
            A surreal and magical showcase of our most innovative projects. Explore, experiment, and experience the future.
          </p>
        </div>

        {/* Project Spotlight */}
        <div className="kitchen-card p-8 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">Project Spotlight</h2>
            
            {/* Dropdown for selecting projects */}
            <div className="relative w-full sm:w-64">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="kitchen-card w-full px-4 py-2 flex items-center justify-between"
              >
                <span>{activeProjectData.name}</span>
                <svg 
                  className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="dropdown-content absolute w-full mt-2 kitchen-card z-10">
                  {projects.map(project => (
                    <div
                      key={project.id}
                      className={`px-4 py-2 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] ${
                        project.id === activeProject ? 'text-[var(--accent)]' : ''
                      }`}
                      onClick={() => {
                        setActiveProject(project.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {project.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Project content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center gap-6">
              <h3 className="text-3xl font-bold">{activeProjectData.name}</h3>
              <p className="opacity-80 text-lg">{activeProjectData.description}</p>
              
              {activeProject === "coodapp" && (
                <div className="mt-4">
                  <form onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-2">
                      <span className="font-medium">Try it now:</span>
                      <textarea 
                        className="kitchen-card p-3 min-h-[100px] resize-none bg-black/10 text-[var(--foreground)]" 
                        placeholder="Describe the app you want to build... (e.g., 'Create a to-do app with dark mode and drag-and-drop functionality')"
                        value={promptValue}
                        onChange={(e) => setPromptValue(e.target.value)}
                      />
                    </label>
                    <button 
                      type="submit" 
                      className="magic-btn px-6 py-3 rounded-full text-white font-medium self-start"
                      disabled={!promptValue.trim()}
                    >
                      Generate App
                    </button>
                  </form>
                </div>
              )}
              
              {activeProject !== "coodapp" && (
                <div className="flex gap-4 mt-4">
                  <button 
                    className="magic-btn px-6 py-3 rounded-full text-white font-medium"
                    onClick={() => handleNavigateToApp(activeProject)}
                  >
                    Try {activeProjectData.name}
                  </button>
                  <button className="kitchen-card px-6 py-3 rounded-full font-medium">
                    Learn More
                  </button>
                </div>
              )}
            </div>

            <div className="spotlight rounded-xl overflow-hidden aspect-video bg-black/20 flex items-center justify-center order-first md:order-last">
              {activeProject === "coodapp" ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="w-full max-w-md kitchen-card p-6 mb-4">
                    <div className="flex gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    </div>
                    <div className="w-full h-4 bg-white/10 rounded mb-2"></div>
                    <div className="w-4/5 h-4 bg-white/10 rounded mb-2"></div>
                    <div className="w-3/5 h-4 bg-white/10 rounded mb-4"></div>
                    <div className="w-full h-24 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] opacity-40 rounded"></div>
                  </div>
                  <p className="text-center opacity-70">Prompt-to-code visualization</p>
                </div>
              ) : activeProject === "chat" ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="w-full max-w-md kitchen-card p-6 mb-4">
                    <div className="flex flex-col gap-3">
                      <div className="ml-auto max-w-[80%] bg-[var(--accent)]/20 p-3 rounded-lg">
                        <div className="h-3 w-24 bg-white/30 rounded mb-2"></div>
                        <div className="h-3 w-32 bg-white/30 rounded"></div>
                      </div>
                      <div className="mr-auto max-w-[80%] bg-[var(--secondary)]/20 p-3 rounded-lg">
                        <div className="h-3 w-40 bg-white/30 rounded mb-2"></div>
                        <div className="h-3 w-28 bg-white/30 rounded mb-2"></div>
                        <div className="h-3 w-36 bg-white/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center opacity-70">AI-powered chat interface</p>
                </div>
              ) : (
                <div className="text-center p-6">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{activeProjectData.name.charAt(0)}</span>
                  </div>
                  <p className="text-xl font-semibold">Preview Image</p>
                  <p className="text-sm opacity-70">Project visualization coming soon</p>
                </div>
              )}
            </div>
          </div>
          
          {activeProject === "coodapp" && activeProjectData.features && (
            <div className="mt-4">
              <h4 className="text-xl font-medium mb-3">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProjectData.features.map((feature, index) => (
                  <div key={index} className="kitchen-card p-4 flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeProject === "chat" && activeProjectData.features && (
            <div className="mt-4">
              <h4 className="text-xl font-medium mb-3">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProjectData.features.map((feature, index) => (
                  <div key={index} className="kitchen-card p-4 flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map(project => (
            <div key={project.id} className="kitchen-card p-6 spotlight"></div>
              <div className="w-full aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{project.name.charAt(0)}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="opacity-70 mb-4">{project.description}</p>
              <button 
                className="text-[var(--accent)] font-medium hover:underline"
                onClick={project.id === "chat" || project.id === "coodapp" ? 
                  () => router.push(`/${project.id}`) : 
                  () => setActiveProject(project.id)}
              ></button>
                {(project.id === "chat" || project.id === "coodapp") ? `Open ${project.name} →` : "View Details →"}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-8 border-t border-white/10 text-center">
        <p className="opacity-70">© {new Date().getFullYear()} DeeperSensor Kitchen. All experimental rights reserved.</p>
      </footer>
    </div>
  );
}
