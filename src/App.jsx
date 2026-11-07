import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import About from "./pages/About";

export default function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <span className="logo">🍳 Recipe Finder</span>
        <div className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}
