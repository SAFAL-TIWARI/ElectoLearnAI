import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, Award, RotateCcw, ArrowRight, 
  BookOpen, Trophy, Target, Star, HelpCircle,
  Zap, Shield, Globe, Medal
} from 'lucide-react';
import { electionData } from '../services/electionData';
import { useLanguage } from '../hooks/useLanguage';
import { useProgress } from '../hooks/useProgress';

const Quiz = () => {
  const { language } = useLanguage();
  const { saveQuizScore } = useProgress();
  const questions = electionData[language].quiz || electionData['en'].quiz;
  
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);

  const progressPercentage = ((currentQ + (isAnswered ? 1 : 0)) / questions.length) * 100;

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    
    if (idx === questions[currentQ].answer) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      saveQuizScore(score);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setStreak(0);
  };

  const getRank = (s, total) => {
    const p = (s / total) * 100;
    if (p === 100) return { en: 'Constitutional Scholar', hi: 'संवैधानिक विद्वान', icon: <Medal /> };
    if (p >= 70) return { en: 'Civic Leader', hi: 'नागरिक नेता', icon: <Trophy /> };
    return { en: 'Informed Citizen', hi: 'जागरूक नागरिक', icon: <Star /> };
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-[80vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div 
            key={currentQ}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-12"
          >
            {/* Elegant Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                   <div className="px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                     Part {currentQ + 1}
                   </div>
                   <div className={`flex items-center space-x-2 transition-opacity ${streak > 1 ? 'opacity-100' : 'opacity-0'}`}>
                      <Zap size={16} className="text-amber-500 fill-amber-500" />
                      <span className="text-amber-500 font-black text-sm">{streak} Streak</span>
                   </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                  Knowledge <span className="text-blue-600">Quest.</span>
                </h1>
              </div>

              <div className="flex items-center space-x-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-white/10 shadow-sm">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Score</p>
                    <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                       {score}<span className="text-slate-300 dark:text-slate-700 mx-1">/</span>{questions.length}
                    </div>
                 </div>
                 <div className="h-10 w-[1px] bg-slate-100 dark:bg-white/10" />
                 <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                    <HelpCircle size={24} />
                 </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-inner">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progressPercentage}%` }}
                 className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
               />
            </div>

            {/* Question Card */}
            <div className="grid lg:grid-cols-5 gap-12 items-start">
               <div className="lg:col-span-3 space-y-10">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                    {questions[currentQ].question}
                  </h2>

                  <div className="grid gap-4">
                    {questions[currentQ].options.map((opt, idx) => {
                      const isCorrect = idx === questions[currentQ].answer;
                      const isSelected = idx === selectedOpt;
                      
                      return (
                        <motion.button 
                          key={idx}
                          whileHover={!isAnswered ? { x: 10, backgroundColor: 'rgba(37, 99, 235, 0.05)' } : {}}
                          onClick={() => handleSelect(idx)}
                          disabled={isAnswered}
                          className={`group relative p-6 text-left rounded-[2rem] border-2 transition-all duration-300 flex items-center space-x-4 ${
                            isAnswered 
                              ? isCorrect 
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100' 
                                : isSelected 
                                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-100' 
                                  : 'border-slate-100 dark:border-slate-800 opacity-40 grayscale-[0.5]'
                              : 'border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-200 dark:hover:border-blue-900/50'
                          }`}
                        >
                          <div className={`h-10 w-10 flex-shrink-0 rounded-2xl flex items-center justify-center font-black text-sm transition-colors ${
                            isAnswered && isCorrect ? 'bg-emerald-500 text-white' : 
                            isAnswered && isSelected ? 'bg-rose-500 text-white' : 
                            'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-lg font-bold flex-grow">{opt}</span>
                          {isAnswered && isCorrect && <Check size={24} className="text-emerald-500" />}
                          {isAnswered && isSelected && !isCorrect && <X size={24} className="text-rose-500" />}
                        </motion.button>
                      );
                    })}
                  </div>
               </div>

               {/* Side Feedback Panel */}
               <div className="lg:col-span-2">
                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-20 blur-3xl" />
                         <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 text-blue-400 font-black text-[10px] uppercase tracking-widest">
                               <Shield size={14} />
                               <span>Official Insight</span>
                            </div>
                            <h4 className="text-3xl font-black">{selectedOpt === questions[currentQ].answer ? (language === 'en' ? 'Absolute Unity!' : 'पूर्ण एकता!') : (language === 'en' ? 'Learning Moment' : 'सीखने का क्षण')}</h4>
                            <p className="text-slate-400 text-lg leading-relaxed font-medium">
                              {questions[currentQ].explanation}
                            </p>
                         </div>
                         
                         <button 
                            onClick={handleNext} 
                            className="w-full py-5 px-8 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-900/40 flex items-center justify-center space-x-3 transition-all active:scale-95 group"
                          >
                            <span>{currentQ < questions.length - 1 ? (language === 'en' ? 'Next Discovery' : 'अगली खोज') : (language === 'en' ? 'Analyze Results' : 'परिणामों का विश्लेषण')}</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center space-y-16 shadow-2xl shadow-blue-500/10 border border-slate-100 dark:border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />
            
            <div className="space-y-6">
              <div className="relative inline-block">
                <motion.div 
                  initial={{ rotate: -20, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  className="w-40 h-40 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-blue-500/40 relative z-10"
                >
                   {getRank(score, questions.length).icon}
                   <Award size={80} className="absolute inset-0 m-auto opacity-20" />
                </motion.div>
                <div className="absolute inset-0 bg-blue-400 blur-[80px] opacity-20 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {getRank(score, questions.length)[language]}
                </h2>
                <p className="text-xl text-slate-500 font-medium">You’ve mastered {score} key pillars of Indian Democracy.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { label: 'Accuracy', val: `${Math.round((score/questions.length)*100)}%` },
                 { label: 'Score', val: `${score}/${questions.length}` },
                 { label: 'Time', val: '2:45m' },
                 { label: 'Status', val: 'Elite' }
               ].map((stat, i) => (
                 <div key={i} className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</p>
                 </div>
               ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={resetQuiz}
                className="px-10 py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-3"
              >
                <RotateCcw size={20} />
                <span>{language === 'en' ? 'Start Over' : 'फिर से शुरू करें'}</span>
              </button>
              <button 
                onClick={() => window.location.href = '/learn'}
                className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-black rounded-2xl shadow-lg hover:bg-slate-50 transition-all flex items-center space-x-3"
              >
                <Globe size={20} />
                <span>{language === 'en' ? 'Explore More' : 'और जानें'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
