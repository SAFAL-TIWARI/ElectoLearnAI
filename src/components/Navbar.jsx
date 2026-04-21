import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X, Landmark, User, LogOut, LayoutDashboard, FileText, Settings, ChevronDown, Info, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../context/ThemeContext';

const ProfileMenu = ({ isMobile = false, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { language } = useLanguage();
  
  // Mock user data - in a real app this would come from a context/auth provider
  const [userData] = useState(() => {
    const saved = localStorage.getItem('electo_user');
    return saved ? JSON.parse(saved) : { name: 'John Doe', rank: 'Pro Learner' };
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: <User size={18} />, label: language === 'en' ? 'My Profile' : 'मेरी प्रोफाइल', path: '/profile' },
    { icon: <LayoutDashboard size={18} />, label: language === 'en' ? 'Dashboard' : 'डैशबोर्ड', path: '/dashboard' },
    { icon: <Info size={18} />, label: language === 'en' ? 'About Us' : 'हमारे बारे में', path: '/about' },
    { icon: <MessageSquare size={18} />, label: language === 'en' ? 'Contact Us' : 'संपर्क करें', path: '/contact' },
  ];

  if (isMobile) {
    return (
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3 px-2">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold">
            {userData.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{userData.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{userData.rank}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onClick={closeMenu}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="text-slate-500">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
          <button className="flex items-center space-x-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left w-full">
            <LogOut size={18} />
            <span className="font-medium">{language === 'en' ? 'Logout' : 'लॉगआउट'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          {userData.name.charAt(0)}
        </div>
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 hidden lg:block">{userData.name}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-50 dark:border-slate-800 mb-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{userData.name}</p>
              <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                {userData.rank}
              </div>
            </div>
            
            <div className="space-y-1">
              {menuItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-slate-400 group-hover:text-blue-500 transition-colors">{item.icon}</span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-50 dark:border-slate-800">
              <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group">
                <LogOut size={18} className="text-slate-400 group-hover:text-red-500 transition-colors" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-red-600 transition-colors">
                  {language === 'en' ? 'Logout' : 'लॉगआउट'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { language } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: language === 'en' ? 'Home' : 'होम', path: '/' },
    { name: language === 'en' ? 'Learn' : 'सीखें', path: '/learn' },
    { name: language === 'en' ? 'Timeline' : 'समयरेखा', path: '/timeline' },
    { name: language === 'en' ? 'Simulator' : 'सिम्युलेटर', path: '/simulator' },
    { name: language === 'en' ? 'Quiz' : 'क्विज़', path: '/quiz' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card mx-0 my-4 border-none shadow-premium backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-election-blue p-2 rounded-xl text-white shadow-lg shadow-blue-500/20"
            >
              <Landmark size={24} />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-election-blue to-emerald-500">
              ElectoLearn AI
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <div className="flex space-x-6 items-center pr-6 border-r border-slate-200 dark:border-slate-800">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={({ isActive }) => 
                    `nav-link font-medium ${isActive ? 'text-election-blue' : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                title="Toggle Theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <ProfileMenu />

              <NavLink to="/chat" className="btn-primary flex items-center space-x-2 py-2 px-5">
                <span className="text-sm">{language === 'en' ? 'Ask AI Assistant' : 'AI से पूछें'}</span>
              </NavLink>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-1">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <ProfileMenu isMobile={false} />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl"
          >
            <div className="px-4 py-8 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {navItems.map((item) => (
                  <NavLink 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-2xl font-black text-slate-900 dark:text-white hover:text-election-blue transition-colors tracking-tighter"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              
              <NavLink 
                to="/chat" 
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary w-full py-4 px-6 flex justify-center items-center text-lg font-bold"
              >
                {language === 'en' ? 'Ask AI Assistant' : 'AI से पूछें'}
              </NavLink>

              <ProfileMenu isMobile={true} closeMenu={() => setIsMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
