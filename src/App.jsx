import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import LatestWalls from "./components/LatestWalls";
import TopWalls from "./components/TopWalls";
import WallpaperPage from "./components/WallpaperPage";
import Random from "./components/Random";
import SearchData from "./components/SearchData";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top" element={<TopWalls />} />
        <Route path="/latest" element={<LatestWalls />} />
        <Route path="/wall/:id" element={<WallpaperPage />} />
        <Route path="/random" element={<Random />} />
        <Route path="/search" element={<SearchData />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
