import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PredictPage from "./pages/PredictPage";
import TeamsPage from "./pages/TeamsPage";
import MatchesPage from "./pages/MatchesPage";
import { FavoritesPage, LoginPage, RegisterPage } from "./pages/OtherPages";
import "./App.css";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar onToggleDark={() => setDark(d => !d)} dark={dark} />
        <main className="main-content">
          <Routes>
            <Route path="/"          element={<PredictPage />} />
            <Route path="/teams"     element={<TeamsPage />} />
            <Route path="/matches"   element={<MatchesPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/register"  element={<RegisterPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}