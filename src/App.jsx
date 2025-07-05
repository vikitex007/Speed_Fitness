import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Coaches from "./pages/Coaches";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Premium from "./pages/Premium";
import PremiumLoggedIn from "./pages/Premium_LoggedIn";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";
import EditProfile from "./pages/UserEditProfile";
import TrainerEditProfile from './pages/TrainerEditProfile';
import TrainerMessage from './pages/TrainerMessage';
import apiService from "./services/api";

function AppContent() {
  const location = useLocation();
  const showHeaderFooter = !['/login', '/register', '/dashboard', '/edit-profile', '/premium', '/trainer-messages'].includes(location.pathname);

  // Determine which dashboard to show
  const user = apiService.getCurrentUser();
  const isTrainer = user && user.userType === 'trainer';

  return (
    <div className="App">
      {showHeaderFooter && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route
            path="/premium"
            element={
              user
                ? (["silver", "gold", "platinum"].includes((user.membershipStatus || "").toLowerCase())
                    ? <PremiumLoggedIn />
                    : <Premium />)
                : <Premium />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={isTrainer ? <TrainerDashboard /> : <UserDashboard />} />
          <Route path="/edit-profile" element={isTrainer ? <TrainerEditProfile /> : <EditProfile />} />
          <Route path="/trainer-messages" element={<TrainerMessage />} />
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
