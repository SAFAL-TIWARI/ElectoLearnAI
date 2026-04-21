import React from 'react';
import { Landmark, Mail, Globe, Code, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Brand & Mission */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 text-white mb-6">
            <Landmark size={24} className="text-blue-500" />
            <span className="font-display font-bold text-xl tracking-tight">ElectoLearn AI</span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed font-medium">
            Empowering the next generation of voters with interactive, AI-powered education on the democratic process. Made for a more informed and engaged citizens.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Explore</h4>
          <ul className="space-y-4 font-medium">
            <li><Link to="/learn" className="hover:text-blue-500 transition-colors">Learning Modules</Link></li>
            <li><Link to="/timeline" className="hover:text-blue-500 transition-colors">Election Timeline</Link></li>
            <li><Link to="/simulator" className="hover:text-blue-500 transition-colors">Voter Simulator</Link></li>
            <li><Link to="/quiz" className="hover:text-blue-500 transition-colors">Knowledge Quiz</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 font-medium">
            <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Resources & Support */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
          <div className="flex space-x-4 mb-6">
            <motion.a whileHover={{ y: -3 }} href="#" className="p-3 bg-slate-800/50 border border-white/5 rounded-xl hover:text-blue-500 transition-colors">
              <Globe size={20} />
            </motion.a>
            <motion.a whileHover={{ y: -3 }} href="#" className="p-3 bg-slate-800/50 border border-white/5 rounded-xl hover:text-blue-500 transition-colors">
              <Code size={20} />
            </motion.a>
            <motion.a whileHover={{ y: -3 }} href="#" className="p-3 bg-slate-800/50 border border-white/5 rounded-xl hover:text-blue-500 transition-colors">
              <Mail size={20} />
            </motion.a>
          </div>
          <div className="flex items-start space-x-2 text-xs text-slate-500 font-medium leading-relaxed">
            <Info size={16} className="mt-0.5 shrink-0" />
            <p>This is an educational platform designed for hackathon demonstration. Data provided is illustrative.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>© {currentYear} ElectoLearn AI. Built with Gemini & React.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Code of Conduct</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
