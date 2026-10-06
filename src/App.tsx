import { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Project from "./Components/Project";
import Services from "./Components/Services";
import Skills from "./Components/Skills";
import Journey from "./Components/Journey";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import CustomCursor from "./Components/CustomCursor";
import Preloader from "./Components/Preloader";

function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#f4f4f0] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Cinematic Intro Preloader */}
      {!preloaderFinished && (
        <Preloader onComplete={() => setPreloaderFinished(true)} />
      )}

      {/* Physics-based Custom Magnetic Cursor Follower */}
      <CustomCursor />

      {/* Tactile Noise / Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none noise-overlay fixed inset-0 z-[90] opacity-40"
      />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="relative z-10 flex flex-col">
        <Home />
        <About />
        <Project />
        <Services />
        <Skills />
        <Journey />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
