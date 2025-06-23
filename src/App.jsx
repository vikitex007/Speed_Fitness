import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Coaches from "./pages/Coaches";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Premium from "./pages/Premium";
import Register from "./pages/Register";

function AppContent() {
  const location = useLocation();
  const showHeaderFooter = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="App">
      {showHeaderFooter && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
