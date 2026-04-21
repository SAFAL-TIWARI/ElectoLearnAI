import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';

// Lazy loaded pages for performance
const Learn = lazy(() => import('./pages/Learn'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const Simulator = lazy(() => import('./pages/Simulator'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));
const Profile = lazy(() => import('./pages/Profile'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <ThemeProvider>
      <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatbotPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
