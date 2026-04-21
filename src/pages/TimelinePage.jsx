import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  HelpCircle, 
  Calendar, 
  Users, 
  TrendingUp, 
  Award 
} from 'lucide-react';
import { electionData } from '../services/electionData';
import { useLanguage } from '../hooks/useLanguage';
import { useProgress } from '../hooks/useProgress';

const TimelinePage = () => {
  const { language } = useLanguage();
  const { progress, completeStep } = useProgress();
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = electionData[language].process;

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      completeStep(steps[activeStep].id);
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          {language === 'en' ? 'Election Journey' : 'चुनाव यात्रा'}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Explore every stage of the democratic process from the initial announcement to the final counting.' 
            : 'प्रारंभिक घोषणा से अंतिम गिनती तक लोकतांत्रिक प्रक्रिया के हर चरण का अन्वेषण करें।'}
        </p>
      </div>

      {/* Timeline Progress Bar */}
      <div className="relative flex justify-between items-center px-4 mb-20">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 -z-10" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-election-blue -translate-y-1/2 -z-10 transition-all duration-500 ease-out" 
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step, idx) => (
          <button 
            key={step.id}
            onClick={() => setActiveStep(idx)}
            className="group relative flex flex-col items-center"
          >
            <motion.div 
              animate={{ 
                scale: activeStep === idx ? 1.2 : 1,
                borderColor: activeStep === idx ? '#2563EB' : 'transparent' 
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-4 z-10 transition-colors ${
                idx <= activeStep 
                  ? 'bg-election-blue text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              {idx < activeStep || progress.completedSteps.includes(step.id) ? (
                <CheckCircle2 size={20} />
              ) : (
                <span className="text-sm font-bold">{idx + 1}</span>
              )}
            </motion.div>
            <span className={`absolute top-12 text-xs font-bold whitespace-nowrap transition-colors ${
              activeStep === idx ? 'text-election-blue' : 'text-slate-500'
            }`}>
              {step.title}
            </span>
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-election-blue font-bold tracking-widest uppercase text-sm">
                Step {activeStep + 1} of {steps.length}
              </span>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">{steps[activeStep].title}</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30 flex items-start space-x-4">
              <Info className="text-election-blue shrink-0 mt-1" size={24} />
              <div className="space-y-2">
                <h4 className="font-bold text-blue-900 dark:text-blue-300">
                  {language === 'en' ? 'Did you know?' : 'क्या आप जानते हैं?'}
                </h4>
                <p className="text-blue-800/80 dark:text-blue-200/60 leading-relaxed text-sm">
                  {steps[activeStep].details}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button 
                onClick={handlePrev}
                disabled={activeStep === 0}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
              >
                <ChevronLeft size={20} />
                <span>{language === 'en' ? 'Previous' : 'पिछला'}</span>
              </button>
              <button 
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
                className="btn-primary flex items-center space-x-2 flex-1 justify-center"
              >
                <span>{language === 'en' ? 'Next Step' : 'अगला कदम'}</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Visual Illustration Section */}
        <motion.div 
          key={`img-${activeStep}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative lg:h-[500px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 rounded-[3rem] overflow-hidden shadow-2xl border border-white dark:border-slate-800"
        >
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          </div>

          <div className="relative z-10 p-12 text-center space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl mx-auto flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-500"
            >
              {activeStep === 0 && <Calendar size={64} className="text-blue-500" />}
              {activeStep === 1 && <Info size={64} className="text-emerald-500" />}
              {activeStep === 2 && <Users size={64} className="text-amber-500" />}
              {activeStep === 3 && <TrendingUp size={64} className="text-purple-500" />}
              {activeStep === 4 && <CheckCircle2 size={64} className="text-election-blue" />}
              {activeStep === 5 && <Award size={64} className="text-rose-500" />}
              {activeStep > 5 && <HelpCircle size={64} className="text-slate-500" />}
            </motion.div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                {steps[activeStep].title}
              </h3>
              <p className="text-slate-500 font-medium">
                {language === 'en' ? 'Phase Illustration' : 'चरण चित्रण'}
              </p>
            </div>

            <div className="flex justify-center space-x-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeStep ? 'w-8 bg-election-blue' : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* Glass Overlay Tag */}
          <div className="absolute top-8 right-8 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-full border border-white/20 text-xs font-black uppercase tracking-tighter shadow-sm">
            ECI Process Module {activeStep + 1}.0
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelinePage;
