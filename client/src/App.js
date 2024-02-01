import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artworks from "./pages/Artworks";
import Exhibitions from "./pages/Exhibitions";
import Buy from "./pages/Buy";
import "./style.css";
import Gallery from "./pages/Gallery";
import HeaderSection from "./components/HeaderSection";
import Curator from "./pages/Curator";
import Navbar from "./components/Navbar";
import Galleries from "./pages/Galleries";

function App() {
  return (
    <div className="App">
      <HeaderSection />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Exhibitions />} />
          <Route path="/gallery/:id" element={<Gallery />} />
          <Route path="/curator/:id" element={<Curator />} />

          <Route path="/galleries" element={<Galleries />} />
          <Route path="/buyart/:id" element={<Buy />} />
          <Route path="/artworks" element={<Artworks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
