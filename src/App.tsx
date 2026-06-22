import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Project from "./Components/Project";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import "./app.css"
function App() {
  return (
    <div className="mainpath">
      <Navbar />
      <Home />
      <About />
      <Skills/>
      <Project/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
