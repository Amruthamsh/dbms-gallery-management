import { BrowserRouter, Route, Routes } from "react-router-dom";
import Artworks from "./pages/Artworks";
import Exhibitions from "./pages/Exhibitions";
import Buy from "./pages/Buy";
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Artworks />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/buyart" element={<Buy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
