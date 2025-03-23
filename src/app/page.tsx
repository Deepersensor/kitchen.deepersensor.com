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
    description: "Next generation autonomous vehicle interface",for the web3 era, powered by AI to enhance your workflow and reimagine your creative process.",
    image: "/project-vexeroo.svg",
  },url: "https://youiux1.vercel.app",
  { features: ["AI-assisted design", "Web3 integration", "Collaborative editing", "Design system automation"]
    id: "web3lancer",
    name: "Web3lancer",
    description: "Decentralized freelancing platform powered by blockchain",
    image: "/project-web3lancer.svg",
  },description: "Next generation autonomous vehicle interface",
  { image: "/project-vexeroo.svg",
    id: "bainaryglobe",
    name: "BainaryGlobe AI",
    description: "Cutting-edge AI solutions for complex global challenges",
    image: "/project-bainaryglobe.svg",
  },description: "Decentralized freelancing platform powered by blockchain",
];  image: "/project-web3lancer.svg",
  },
export default function Home() {
  const [activeProject, setActiveProject] = useState("coodapp");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [promptValue, setPromptValue] = useState("");ex global challenges",
  const router = useRouter();lobe.svg",
  },
  const activeProjectData = projects.find(p => p.id === activeProject) || projects[0];
  
  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setActiveProject] = useState("coodapp");
    nst [isDropdownOpen, setIsDropdownOpen] = useState(false);
    if (activeProject === "coodapp" && promptValue.trim()) {
      // Store the prompt in session storage
      const appName = generateRandomAppName();
      sessionStorage.setItem(`coodapp:${appName}:prompt`, promptValue);|| projects[0];
      sessionStorage.setItem(`coodapp:${appName}:model`, "gpt-4o-mini"); // Default model
      t handlePromptSubmit = (e: React.FormEvent) => {
      // Navigate to the Coodapp page
      router.push(`/coodapp/${appName}`);
    }f (activeProject === "coodapp" && promptValue.trim()) {
  };  // Store the prompt in session storage
      const appName = generateRandomAppName();
  // Generate a random app name for CoodappName}:prompt`, promptValue);
  const generateRandomAppName = () => {{appName}:model`, "gpt-4o-mini"); // Default model
    const adjectives = ["cosmic", "stellar", "vibrant", "swift", "lunar", "quantum", "radiant", "azure", "neon"];
    const nouns = ["wave", "pulse", "byte", "pixel", "vista", "nova", "flow", "spark", "core"];
      router.push(`/coodapp/${appName}`);
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${adjective}-${noun}`;r Coodapp
  };nst generateRandomAppName = () => {
    const adjectives = ["cosmic", "stellar", "vibrant", "swift", "lunar", "quantum", "radiant", "azure", "neon"];
  const handleNavigateToApp = (projectId: string) => {vista", "nova", "flow", "spark", "core"];
    if (projectId === "coodapp") {p => p.id === projectId);
      router.push('/coodapp');) * adjectives.length)];
    } else if (projectId === "chat") {ns.length)];
      router.push('/chat');in a new tab
    } window.open(project.url, '_blank');eturn `${adjective}-${noun}`;
  };} else if (projectId === "coodapp") {
      router.push('/coodapp');  
  return ( if (projectId === "chat") {ndleNavigateToApp = (projectId: string) => {
    <div className="min-h-screen flex flex-col p-8 sm:p-12 gap-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
            <span className="text-white text-2xl font-bold">DS</span>
          </div> */}
          <h1 className="text-2xl font-bold">DeeperSensor Kitchen</h1>
        </div>lassName="flex items-center gap-3">Name="min-h-screen flex flex-col p-8 sm:p-12 gap-8">
        <nav className="hidden sm:flex gap-6">ll bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
          <a href="#" className="hover:text-[var(--accent)] transition-colors">About</a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Projects</a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Team</a>ary)] flex items-center justify-center">
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Contact</a>
        </nav>lassName="hidden sm:flex gap-6">v>
      </header>ef="#" className="hover:text-[var(--accent)] transition-colors">About</a>lassName="text-2xl font-bold">DeeperSensor Kitchen</h1>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Projects</a>        </div>
      {/* Hero */}"#" className="hover:text-[var(--accent)] transition-colors">Team</a>Name="hidden sm:flex gap-6">
      <main className="flex-1 flex flex-col gap-12 py-8 max-w-7xl mx-auto w-full">tact</a>ut</a>
        <div className="text-center">transition-colors">Projects</a>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--tertiary)] inline-block text-transparent bg-clip-text">
            Welcome to Our Experimental Kitchen
          </h1>*/}
          <p className="text-xl max-w-2xl mx-auto opacity-80">7xl mx-auto w-full">
            A surreal and magical showcase of our most innovative projects. Explore, experiment, and experience the future.
          </p>className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--tertiary)] inline-block text-transparent bg-clip-text"> */}
        </div>lcome to Our Experimental KitchenassName="flex-1 flex flex-col gap-12 py-8 max-w-7xl mx-auto w-full">
          </h1>        <div className="text-center">
        {/* Project Spotlight */}ax-w-2xl mx-auto opacity-80"> sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--accent)] via-[var(--secondary)] to-[var(--tertiary)] inline-block text-transparent bg-clip-text">
        <div className="kitchen-card p-8 flex flex-col gap-8">ive projects. Explore, experiment, and experience the future.
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">Project Spotlight</h2>
            d magical showcase of our most innovative projects. Explore, experiment, and experience the future.
            {/* Dropdown for selecting projects */}
            <div className="relative w-full sm:w-64">l gap-8">
              <buttoname="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}h2>
                className="kitchen-card w-full px-4 py-2 flex items-center justify-between"
              > Dropdown for selecting projects */}className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span>{activeProjectData.name}</span>t Spotlight</h2>
                <svg 
                  className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" chen-card w-full px-4 py-2 flex items-center justify-between"lative w-full sm:w-64">
                  stroke="currentColor" 
                  viewBox="0 0 24 24"ata.name}</span>ropdownOpen(!isDropdownOpen)}
                >svg lassName="kitchen-card w-full px-4 py-2 flex items-center justify-between"
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>="none" {activeProjectData.name}</span>
              </button>e="currentColor" 
                  viewBox="0 0 24 24"    className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
              {isDropdownOpen && (
                <div className="dropdown-content absolute w-full mt-2 kitchen-card z-10">19 9l-7 7-7-7" />
                  {projects.map(project => (
                    <div
                      key={project.id}round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      className={`px-4 py-2 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] ${
                        project.id === activeProject ? 'text-[var(--accent)]' : '' z-10">
                      }`}ts.map(project => (
                      onClick={() => {
                        setActiveProject(project.id);2 kitchen-card z-10">
                        setIsDropdownOpen(false);r-pointer hover:bg-[rgba(255,255,255,0.1)] ${
                      }}project.id === activeProject ? 'text-[var(--accent)]' : ''
                    > }`} key={project.id}
                      {project.name} {-4 py-2 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] ${
                    </div>tActiveProject(project.id);oject.id === activeProject ? 'text-[var(--accent)]' : ''
                  ))}   setIsDropdownOpen(false); }`}
                </div>}}onClick={() => {
              )}    >        setActiveProject(project.id);
            </div>    {project.name}      setIsDropdownOpen(false);
          </div>    </div>      }}
                  ))}                    >
          {/* Project content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center gap-6">
              <h3 className="text-3xl font-bold">{activeProjectData.name}</h3>
              <p className="opacity-80 text-lg">{activeProjectData.description}</p>
              Project content */}div>
              {activeProject === "coodapp" && (rid-cols-2 gap-8">
                <div className="mt-4">col justify-center gap-6">
                  <form onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
                    <label className="flex flex-col gap-2">ectData.description}</p>ap-8">
                      <span className="font-medium">Try it now:</span>
                      <textarea  "coodapp" && (t-3xl font-bold">{activeProjectData.name}</h3>
                        className="kitchen-card p-3 min-h-[100px] resize-none bg-black/10 text-[var(--foreground)]" 
                        placeholder="Describe the app you want to build... (e.g., 'Create a to-do app with dark mode and drag-and-drop functionality')"
                        value={promptValue}flex-col gap-2">&& (
                        onChange={(e) => setPromptValue(e.target.value)}
                      />extarea onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
                    </label>sName="kitchen-card p-3 min-h-[100px] resize-none bg-black/10 text-[var(--foreground)]" lassName="flex flex-col gap-2">
                    <button eholder="Describe the app you want to build... (e.g., 'Create a to-do app with dark mode and drag-and-drop functionality')"className="font-medium">Try it now:</span>
                      type="submit" tValue}
                      className="magic-btn px-6 py-3 rounded-full text-white font-medium self-start"
                      disabled={!promptValue.trim()}, 'Create a to-do app with dark mode and drag-and-drop functionality')"
                    >/label>   value={promptValue}
                      Generate App setPromptValue(e.target.value)}
                    </button>ubmit" 
                  </form>ssName="magic-btn px-6 py-3 rounded-full text-white font-medium self-start"el>
                </div>disabled={!promptValue.trim()}utton 
              )}    >      type="submit" 
                      Generate App        className="magic-btn px-6 py-3 rounded-full text-white font-medium self-start"
              {activeProject !== "coodapp" && (
                <div className="flex gap-4 mt-4">
                  <button  App
                    className="magic-btn px-6 py-3 rounded-full text-white font-medium"
                    onClick={() => handleNavigateToApp(activeProject)}
                  >veProject !== "coodapp" && (iv>
                    Try {activeProjectData.name}>
                  </button>
                  <button className="kitchen-card px-6 py-3 rounded-full font-medium">"
                    Learn More) => handleNavigateToApp(activeProject)}="flex gap-4 mt-4">
                  </button>
                </div>y {activeProjectData.name}assName="magic-btn px-6 py-3 rounded-full text-white font-medium"
              )}  </button>    onClick={() => handleNavigateToApp(activeProject)}
            </div><button className="kitchen-card px-6 py-3 rounded-full font-medium">>
                    Learn More                    Try {activeProjectData.name}
            <div className="spotlight rounded-xl overflow-hidden aspect-video bg-black/20 flex items-center justify-center order-first md:order-last">
              {activeProject === "coodapp" ? (ll font-medium">
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <div className="w-full max-w-md kitchen-card p-6 mb-4">
                    <div className="flex gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>g-black/20 flex items-center justify-center order-first md:order-last">
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>y-center p-4">
                    </div>ssName="w-full max-w-md kitchen-card p-6 mb-4">="spotlight rounded-xl overflow-hidden aspect-video bg-black/20 flex items-center justify-center order-first md:order-last">
                    <div className="w-full h-4 bg-white/10 rounded mb-2"></div>
                    <div className="w-4/5 h-4 bg-white/10 rounded mb-2"></div>>fy-center p-4">
                    <div className="w-3/5 h-4 bg-white/10 rounded mb-4"></div>>
                    <div className="w-full h-24 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] opacity-40 rounded"></div>
                  </div>v>iv className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <p className="text-center opacity-70">Prompt-to-code visualization</p>
                </div>iv className="w-4/5 h-4 bg-white/10 rounded mb-2"></div><div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              ) : activeProject === "chat" ? (bg-white/10 rounded mb-4"></div>
                <div className="w-full h-full flex flex-col items-center justify-center p-4">(--secondary)] opacity-40 rounded"></div>
                  <div className="w-full max-w-md kitchen-card p-6 mb-4">
                    <div className="flex flex-col gap-3">rompt-to-code visualization</p> rounded mb-4"></div>
                      <div className="ml-auto max-w-[80%] bg-[var(--accent)]/20 p-3 rounded-lg">
                        <div className="h-3 w-24 bg-white/30 rounded mb-2"></div>
                        <div className="h-3 w-32 bg-white/30 rounded"></div>tify-center p-4">lization</p>
                      </div>Name="w-full max-w-md kitchen-card p-6 mb-4">
                      <div className="mr-auto max-w-[80%] bg-[var(--secondary)]/20 p-3 rounded-lg">
                        <div className="h-3 w-40 bg-white/30 rounded mb-2"></div>-3 rounded-lg">center p-4">
                        <div className="h-3 w-28 bg-white/30 rounded mb-2"></div>
                        <div className="h-3 w-36 bg-white/30 rounded"></div>
                      </div>lassName="ml-auto max-w-[80%] bg-[var(--accent)]/20 p-3 rounded-lg">
                    </div> className="mr-auto max-w-[80%] bg-[var(--secondary)]/20 p-3 rounded-lg">iv className="h-3 w-24 bg-white/30 rounded mb-2"></div>
                  </div><div className="h-3 w-40 bg-white/30 rounded mb-2"></div><div className="h-3 w-32 bg-white/30 rounded"></div>
                  <p className="text-center opacity-70">AI-powered chat interface</p>
                </div>  <div className="h-3 w-36 bg-white/30 rounded"></div><div className="mr-auto max-w-[80%] bg-[var(--secondary)]/20 p-3 rounded-lg">
              ) : (   </div>     <div className="h-3 w-40 bg-white/30 rounded mb-2"></div>
                <div className="text-center p-6">2"></div>
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{activeProjectData.name.charAt(0)}</span>
                  </div>
                  <p className="text-xl font-semibold">Preview Image</p>
                  <p className="text-sm opacity-70">Project visualization coming soon</p>
                </div> className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-full flex items-center justify-center">
              )}    <span className="text-white text-4xl font-bold">{activeProjectData.name.charAt(0)}</span>: (
            </div></div>iv className="text-center p-6">
          </div>  <p className="text-xl font-semibold">Preview Image</p>  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] rounded-full flex items-center justify-center">
                  <p className="text-sm opacity-70">Project visualization coming soon</p>          <span className="text-white text-4xl font-bold">{activeProjectData.name.charAt(0)}</span>
          {activeProject === "coodapp" && activeProjectData.features && (
            <div className="mt-4">d">Preview Image</p>
              <h4 className="text-xl font-medium mb-3">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProjectData.features.map((feature, index) => (
                  <div key={index} className="kitchen-card p-4 flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>me="grid grid-cols-1 sm:grid-cols-2 gap-4">== "coodapp" && activeProjectData.features && (
                    <p>{feature}</p>eatures.map((feature, index) => (
                  </div>ey={index} className="kitchen-card p-4 flex gap-3 items-start">ame="text-xl font-medium mb-3">Key Features</h4>
                ))} <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center flex-shrink-0">className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              </div>  <span className="text-white font-bold">{index + 1}</span>iveProjectData.features.map((feature, index) => (
            </div>  </div><div key={index} className="kitchen-card p-4 flex gap-3 items-start">
          )}        <p>{feature}</p>        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center flex-shrink-0">
                  </div>            <span className="text-white font-bold">{index + 1}</span>
          {activeProject === "chat" && activeProjectData.features && (
            <div className="mt-4">
              <h4 className="text-xl font-medium mb-3">Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProjectData.features.map((feature, index) => (
                  <div key={index} className="kitchen-card p-4 flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>me="grid grid-cols-1 sm:grid-cols-2 gap-4">== "chat" && activeProjectData.features && (
                    <p>{feature}</p>eatures.map((feature, index) => (
                  </div>ey={index} className="kitchen-card p-4 flex gap-3 items-start">ame="text-xl font-medium mb-3">Key Features</h4>
                ))} <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center flex-shrink-0">className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              </div>  <span className="text-white font-bold">{index + 1}</span>iveProjectData.features.map((feature, index) => (
            </div>  </div><div key={index} className="kitchen-card p-4 flex gap-3 items-start">
          )}        <p>{feature}</p>        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center flex-shrink-0">
        </div>    </div>        <span className="text-white font-bold">{index + 1}</span>
                ))}                    </div>
        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map(project => (
            <div key={project.id} className="kitchen-card p-6 spotlight">
              <div className="w-full aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{project.name.charAt(0)}</span>
                </div>p(project => (
              </div>={project.id} className="kitchen-card p-6 spotlight"> Projects Grid */}
              <h3 className="text-xl font-bold mb-2">{project.name}</h3> mb-4 flex items-center justify-center">ap-6">
              <p className="opacity-70 mb-4">{project.description}</p>br from-[var(--accent)] to-[var(--secondary)] flex items-center justify-center">
              <button n className="text-white text-xl font-bold">{project.name.charAt(0)}</span>project.id} className="kitchen-card p-6 spotlight">
                className="text-[var(--accent)] font-medium hover:underline"
                onClick={project.id === "chat" || project.id === "coodapp" || project.url ? justify-center">
                  () => handleNavigateToApp(project.id) : oject.name}</h3>nt-bold">{project.name.charAt(0)}</span>
                  () => setActiveProject(project.id)}.description}</p>
              >button /div>
                {project.url ? `Visit ${project.name} →` : 
                 (project.id === "chat" || project.id === "coodapp") ? `Open ${project.name} →` : ={project.id === "chat" || project.id === "coodapp" ? ame="opacity-70 mb-4">{project.description}</p>
                 "View Details →"}() => router.push(`/${project.id}`) : ton 
              </button>     () => setActiveProject(project.id)}   className="text-[var(--accent)] font-medium hover:underline"
            </div>>  onClick={project.id === "chat" || project.id === "coodapp" ? 
          ))}   {(project.id === "chat" || project.id === "coodapp") ? `Open ${project.name} →` : "View Details →"}     () => router.push(`/${project.id}`) : 
        </div>              </button>                  () => setActiveProject(project.id)}
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-8 border-t border-white/10 text-center">>
        <p className="opacity-70">© {new Date().getFullYear()} DeeperSensor Kitchen. All experimental rights reserved.</p>
      </footer>  {/* Footer */}    </div>
    </div>     <footer className="mt-auto pt-8 border-t border-white/10 text-center">     </main>
  );        <p className="opacity-70">© {new Date().getFullYear()} DeeperSensor Kitchen. All experimental rights reserved.</p>


}




}  );    </div>      </footer>      {/* Footer */}
      <footer className="mt-auto pt-8 border-t border-white/10 text-center">
        <p className="opacity-70">© {new Date().getFullYear()} DeeperSensor Kitchen. All experimental rights reserved.</p>
      </footer>
    </div>
  );
}
