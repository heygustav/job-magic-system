
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from './components/AuthProvider';
import Dashboard from './pages/Dashboard';
import Home from './pages/Index'; 
import CoverLetter from './pages/CoverLetterGenerator';
import Profile from './pages/Profile';
import JobForm from './pages/JobForm';
import Contact from './pages/Contact';
import About from './pages/AboutUs';
import Terms from './pages/TermsAndConditions';
import Privacy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import JobEdit from './pages/JobEdit';

function AppRoutes() {
  const { user, isLoading } = useAuth();
  const isAuthenticated = !!user; // Derive authentication status from user

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) {
      return <div>Loading...</div>; // Or a loading spinner
    }
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cover-letter",
      element: (
        <ProtectedRoute>
          <CoverLetter />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/job/new",
      element: (
        <ProtectedRoute>
          <JobForm />
        </ProtectedRoute>
      ),
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/terms",
      element: <Terms />,
    },
    {
      path: "/privacy",
      element: <Privacy />,
    },
    {
      path: "/job/edit/:jobId",
      element: (
        <ProtectedRoute>
          <JobEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
