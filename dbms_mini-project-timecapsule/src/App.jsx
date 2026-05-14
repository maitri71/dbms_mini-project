import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/ui/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateCapsule from './pages/CreateCapsule';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-vault-bg text-white font-sans selection:bg-vault-accent selection:text-white">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/create" element={
              <ProtectedRoute>
                <CreateCapsule />
              </ProtectedRoute>
            } />
          </Routes>
          
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#14141e',
                color: '#fff',
                border: '1px solid rgba(100, 100, 255, 0.2)',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
