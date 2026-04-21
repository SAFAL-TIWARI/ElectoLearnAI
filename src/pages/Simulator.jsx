import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, CheckCircle, AlertCircle, Award, 
  ArrowRight, Home, RefreshCcw, Shield, 
  MapPin, Fingerprint, History, Star,
  TrendingUp, Activity
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { electionData } from '../services/electionData';

const Simulator = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhaseId, setCurrentPhaseId] = useState('id_check');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [history, setHistory] = useState([]);

  const simulatorData = electionData[language].simulator || electionData['en'].simulator;
  const phases = simulatorData.voter.phases;
  const currentPhase = phases.find(p => p.id === currentPhaseId);

  const handleOptionClick = (option) => {
    setFeedback(option.feedback);
    setScore(prev => prev + (option.next === 'fail' ? -5 : 10));
    setHistory(prev => [...prev, currentPhaseId]);
    
    setTimeout(() => {
      setCurrentPhaseId(option.next);
      setFeedback('');
    }, 1500);
  };

  const resetSimulator = () => {
    setIsPlaying(false);
    setCurrentPhaseId('id_check');
    setScore(0);
    setFeedback('');
    setHistory([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-[85vh] flex flex-col justify-center bg-slate-50/50 dark:bg-slate-950/20">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 px-5 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 rounded-full text-xs font-black uppercase tracking-widest">
                  <Activity size={16} className="animate-pulse" />
                  <span>{language === 'en' ? 'Interactive Scenario Engine' : 'इंटरैक्टिव परिदृश्य इंजन'}</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                  {language === 'en' ? 'Voter ' : 'मतदाता '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 pb-2">
                    {language === 'en' ? 'Simulation.' : 'सिमुलेशन।'}
                  </span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-xl md:text-2xl font-medium leading-relaxed max-w-xl">
                  {simulatorData.voter.intro}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                 <button 
                  onClick={() => setIsPlaying(true)}
                  className="px-12 py-6 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-4"
                >
                  <span className="text-xl">{language === 'en' ? 'Enter Booth' : 'बूथ में प्रवेश करें'}</span>
                  <ArrowRight size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                 <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-emerald-500 border border-slate-100 dark:border-white/5">
                      <Shield size={20} />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Zero Risk Learning</p>
                 </div>
                 <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-blue-500 border border-slate-100 dark:border-white/5">
                      <Star size={20} />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Multiple Scenarios</p>
                 </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
               <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[100px] rounded-full" />
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="relative bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/10 space-y-8"
               >
                  <div className="flex items-center space-x-4">
                     <div className="h-16 w-16 rounded-[1.5rem] bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                        <User size={32} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">New Elector</h3>
                        <p className="text-[10px] font-black text-slate-400 dark:text-white/50 uppercase tracking-[0.2em]">Profile Verified • 2024</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-blue-500 rounded-full" />
                     </div>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Preparation Status: 33% Ready</p>
                  </div>
                  <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                     <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic text-center">
                        "Your journey begins at the Identification Desk. Have your documents ready!"
                     </p>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        ) : currentPhaseId === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto space-y-12 text-center"
          >
            <div className="bg-emerald-500 dark:bg-emerald-600 p-12 rounded-[4rem] text-white space-y-8 shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 blur-3xl -translate-x-1/2 translate-y-1/2" />
              <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl group">
                <CheckCircle size={56} className="text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-4">
                 <h2 className="text-5xl font-black tracking-tighter">
                   {language === 'en' ? 'Journey Complete!' : 'यात्रा पूरी हुई!'}
                 </h2>
                 <p className="text-emerald-100 text-xl font-medium leading-relaxed">
                   {currentPhase.text}
                 </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Final Civic Score</p>
                  <h3 className="text-5xl font-black text-slate-900 dark:text-white tabular-nums">{score}</h3>
               </div>
               <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Actions History</p>
                  <h3 className="text-5xl font-black text-slate-900 dark:text-white tabular-nums">{history.length}</h3>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={resetSimulator} 
                className="px-10 py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold rounded-2xl flex items-center justify-center space-x-3 hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <RefreshCcw size={20} />
                <span>{language === 'en' ? 'Start Over' : 'पुनः प्रयास करें'}</span>
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold rounded-2xl flex items-center justify-center space-x-3 hover:bg-slate-50 transition-all shadow-lg"
              >
                 <Home size={20} />
                 <span>{language === 'en' ? 'Finish' : 'समाप्त'}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key={currentPhaseId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-12 items-start"
          >
            {/* Main Interactive Area */}
            <div className="lg:col-span-3 space-y-12">
               {/* Step Indicator */}
               <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar pb-2">
                  {phases.filter(p => !['success', 'fail'].includes(p.id)).map((p, i) => (
                    <div 
                      key={p.id}
                      className={`h-2 min-w-[3rem] rounded-full transition-all duration-500 ${
                        currentPhaseId === p.id 
                          ? 'bg-blue-600 w-16' 
                          : history.includes(p.id) 
                            ? 'bg-emerald-500/40' 
                            : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    />
                  ))}
               </div>

               <div className="space-y-10">
                  <div className="space-y-4">
                     <span className="text-blue-600 font-black uppercase text-[10px] tracking-[0.3em]">
                        {currentPhase.title}
                     </span>
                     <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1]">
                       {currentPhase.text}
                     </h2>
                  </div>

                  <div className="grid gap-4">
                    {currentPhase.options.map((option, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        disabled={!!feedback}
                        className={`group relative p-8 text-left bg-white dark:bg-slate-900 rounded-[2rem] border-2 transition-all duration-300 flex justify-between items-center ${
                          !!feedback 
                            ? 'opacity-40 border-slate-100 dark:border-white/5 cursor-not-allowed' 
                            : 'border-slate-100 dark:border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10'
                        }`}
                      >
                        <span className="text-xl font-bold">{option.text}</span>
                        <ArrowRight size={24} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
                      </button>
                    ))}
                  </div>
               </div>
            </div>

            {/* Live Data & Feedback Sidebar */}
            <div className="lg:col-span-2 space-y-8">
               {/* Feedback Card */}
               <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 opacity-20 blur-3xl" />
                      <div className="space-y-6 relative z-10">
                         <div className="p-3 bg-white/10 rounded-2xl w-fit">
                            <AlertCircle size={24} className="text-blue-400" />
                         </div>
                         <div className="space-y-2">
                            <h4 className="text-xl font-black">{language === 'en' ? 'Booth Protocol' : 'बूथ प्रोटोकॉल'}</h4>
                            <p className="text-slate-400 text-lg leading-relaxed font-medium">
                              {feedback}
                            </p>
                         </div>
                         <div className="flex items-center space-x-2 text-blue-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
                            <History size={14} />
                            <span>Updating State...</span>
                         </div>
                      </div>
                    </motion.div>
                  )}
               </AnimatePresence>

               {/* Live Stats Portal */}
               <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 space-y-10 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">Active Stat</h4>
                    <TrendingUp size={20} className="text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Civic Integrity Score</p>
                    <div className="text-6xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                      {score}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                        <MapPin size={16} className="text-blue-500 mb-2" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booth</p>
                        <p className="text-sm font-bold truncate">Pol-102</p>
                     </div>
                     <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                        <Fingerprint size={16} className="text-emerald-500 mb-2" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biometric</p>
                        <p className="text-sm font-bold">Secure</p>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Simulator;
