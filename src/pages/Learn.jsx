import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, CheckCircle, ArrowRight, Play, ExternalLink, 
  Lightbulb, Shield, HelpCircle, Search, Filter,
  BookOpen, Sparkles, Zap, GraduationCap
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { electionData } from '../services/electionData';

const Learn = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('basics');
  const [searchQuery, setSearchQuery] = useState('');

  const learnData = electionData[language].learn || electionData['en'].learn;

  const filteredItems = useMemo(() => {
    const items = learnData[activeCategory].items;
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.desc.toLowerCase().includes(query)
    );
  }, [activeCategory, searchQuery, learnData]);

  const getIcon = (cat) => {
    switch (cat) {
      case 'basics': return <BookOpen size={24} />;
      case 'tech': return <Shield size={24} />;
      case 'rights': return <Sparkles size={24} />;
      case 'eci': return <GraduationCap size={24} />;
      default: return <Book size={24} />;
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'basics': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'tech': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'rights': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'eci': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 bg-slate-50/30 dark:bg-slate-950/30">
      {/* Dynamic Header & Search */}
      <div className="space-y-12">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-white/5">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
              <Zap size={14} />
              <span>{language === 'en' ? "Bite-Sized Knowledge" : "छोटा ज्ञान भाग"}</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]"
            >
              {language === 'en' ? 'Civic ' : 'नागरिक '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {language === 'en' ? 'Intelligence' : 'बुद्धिमत्ता'}
              </span>
            </motion.h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              {language === 'en' 
                ? 'Master the concepts of Indian democracy with curated, high-impact modules.' 
                : 'चुनिंदा और उच्च प्रभाव वाले मॉड्यूल के साथ भारतीय लोकतंत्र की अवधारणाओं में महारत हासिल करें।'}
            </p>
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder={language === 'en' ? "Search topics..." : "विषय खोजें..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 py-5 pl-14 pr-6 rounded-3xl text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex bg-white dark:bg-slate-900/50 p-2 rounded-[2rem] shadow-sm border border-slate-100 dark:border-white/5 overflow-x-auto no-scrollbar">
          {Object.keys(learnData).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSearchQuery('');
              }}
              className={`flex items-center space-x-3 px-8 py-4 rounded-2xl text-sm font-black transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl scale-[1.02]' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <div className={activeCategory === cat ? 'text-blue-400' : 'text-slate-400'}>
                {getIcon(cat)}
              </div>
              <span>{learnData[cat].title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <motion.div
                key={`${activeCategory}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-card p-10 flex flex-col justify-between group hover:border-blue-500/30 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500"
              >
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className={`p-5 rounded-[2rem] border transition-all duration-500 group-hover:rotate-6 ${getCategoryColor(activeCategory)}`}>
                      {getIcon(activeCategory)}
                    </div>
                    <div className="flex -space-x-2">
                       {[1,2].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.title}${i}`} alt="user" />
                         </div>
                       ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-bold leading-relaxed italic relative z-10">
                      "{item.details}"
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500">
                      <CheckCircle size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {language === 'en' ? 'Verified Entry' : 'सत्यापित प्रविष्टि'}
                    </span>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-widest group/btn">
                    <span>{language === 'en' ? 'Expand' : 'विस्तार'}</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 space-y-6 text-slate-400"
            >
              <Search size={64} className="opacity-20" />
              <p className="text-xl font-bold">No topics found matching "{searchQuery}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global Fact Experience */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-950 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl border border-white/5"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] -z-0 rounded-full translate-x-1/3 -translate-y-1/3" />
        
        <div className="grid lg:grid-cols-2 gap-20 relative z-10 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-3 px-5 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-black uppercase tracking-[0.2em]">
              <Sparkles size={16} />
              <span>{language === 'en' ? 'Global Perspective' : 'वैश्विक परिप्रेक्ष्य'}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
              {language === 'en' ? 'The Ink of ' : 'लोकतंत्र '}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-400">
                {language === 'en' ? 'Democracy' : 'की स्याही'}
              </span>
            </h2>
            <p className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed">
              {language === 'en' 
                ? "Did you know? The indelible purple ink used in Indian elections is manufactured by a single company in the world. It’s a mark of pride for 969 million people."
                : "क्या आप जानते हैं? भारतीय चुनावों में इस्तेमाल होने वाली अमिट बैंगनी स्याही दुनिया की एक ही कंपनी द्वारा बनाई जाती है। यह 969 मिलियन लोगों के लिए गर्व का प्रतीक है।"}
            </p>
            <div className="flex flex-wrap gap-6">
               <a 
                href="https://eci.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-bold hover:scale-105 transition-all shadow-xl flex items-center space-x-3"
              >
                <span>{language === 'en' ? 'Official Documentation' : 'आधिकारिक दस्तावेज'}</span>
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
          
          <div className="relative group">
             <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />
             <div className="relative bg-slate-900 border border-white/10 rounded-[3rem] p-10 overflow-hidden">
                <div className="flex flex-col space-y-8">
                   <div className="flex items-center space-x-6">
                      <div className="h-16 w-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                        <Shield size={32} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black">{language === 'en' ? 'Sovereign Security' : 'संप्रभु सुरक्षा'}</h4>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Security Framework V4.0</p>
                      </div>
                   </div>
                   <p className="text-slate-400 font-medium leading-relaxed italic">
                     "India's electoral integrity is maintained through a combination of autonomous constitutional powers and tamper-proof offline technology."
                   </p>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Learn;
