import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import LoadingFallback from './components/LoadingFallback';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load components
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Investments = lazy(() => import('./pages/Investments'));
const Savings = lazy(() => import('./pages/Savings'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route
                path="/login"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Login />
                  </Suspense>
                }
              />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/transactions"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Transactions />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/investments"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Investments />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/savings"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Savings />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <Profile />
                      </Suspense>
                    }
                  />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
