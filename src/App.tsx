
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar"; 
import Dashboard from "./pages/Dashboard";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Contact from "./pages/Contact";
import JobForm from "./pages/JobForm";
import { Toaster } from "./components/ui/toaster";
import "./App.css";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import Auth from "./pages/Auth";
import { LoadingSpinner } from "./components/LoadingSpinner";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/login" element={<Navigate to="/auth" replace />} />
    <Route path="/signup" element={<Navigate to="/auth?signup=true" replace />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/privacy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<TermsAndConditions />} />
    <Route path="/contact" element={<Contact />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/generator"
      element={
        <ProtectedRoute>
          <CoverLetterGenerator />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/job/new"
      element={
        <ProtectedRoute>
          <JobForm />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          {/* Skip to content link for keyboard users */}
          <a href="#main-content" className="skip-to-content">
            Skip til indhold
          </a>
          
          <Navbar />
          
          <main id="main-content" className="flex-grow pt-16 w-full max-w-[100vw] overflow-x-hidden" tabIndex={-1}>
            <AppRoutes />
          </main>
          
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
