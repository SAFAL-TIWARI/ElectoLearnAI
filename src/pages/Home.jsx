import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Shield, Zap, Sparkles, 
  MessageSquare, PlayCircle, Award, Globe, 
  Fingerprint, Star, TrendingUp, Users, MapPin 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const StatCard = ({ icon, label, value, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-2"
  >
    <div className={`p-3 rounded-2xl w-fit ${color}`}>{icon}</div>
    <div className="text-3xl font-black text-white">{value}</div>
    <div className="text-sm font-bold text-white/50 uppercase tracking-widest">{label}</div>
  </motion.div>
);

const Home = () => {
  const { language } = useLanguage();
  const [tickerValue, setTickerValue] = useState(968821926);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerValue(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap size={24} />,
      title: language === 'en' ? 'Interactive Timeline' : 'इंटरैक्टिव टाइमलाइन',
      desc: language === 'en' ? 'Navigate the entire 7-step election journey with live visualizations.' : 'लाइव विज़ुअलाइज़ेशन के साथ पूरी 7-चरणीय चुनावी यात्रा को नेविगेट करें।',
      link: '/timeline',
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      icon: <Sparkles size={24} />,
      title: language === 'en' ? 'AI Election Assistant' : 'AI चुनाव सहायक',
      desc: language === 'en' ? 'Instant bilingual support for all your queries regarding voting and eligibility.' : 'मतदान और पात्रता के संबंध में आपके सभी प्रश्नों के लिए त्वरित सहायता।',
      link: '/chat',
      color: 'text-purple-500 bg-purple-500/10'
    },
    {
      icon: <PlayCircle size={24} />,
      title: language === 'en' ? 'Voter Simulator' : 'वोटर सिम्युलेटर',
      desc: language === 'en' ? 'Practice voting in a lifelike virtual environment to build confidence.' : 'आत्मविश्वास बढ़ाने के लिए वास्तविक वर्चुअल वातावरण में मतदान का अभ्यास करें।',
      link: '/simulator',
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      icon: <Award size={24} />,
      title: language === 'en' ? 'Knowledge Quiz' : 'ज्ञान क्विज़',
      desc: language === 'en' ? 'Challenge yourself, rank up, and become a certified civic leader.' : 'स्वयं को चुनौती दें, रैंक बढ़ाएं और प्रमाणित नागरिक नेता बनें।',
      link: '/quiz',
      color: 'text-emerald-500 bg-emerald-500/10'
    }
  ];

  return (
    <div className="space-y-32 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[120px] rounded-full" 
          />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          <div className="text-left space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-3 px-6 py-2.5 bg-white dark:bg-white/5 backdrop-blur-xl border border-blue-100 dark:border-white/10 rounded-full text-xs font-black text-election-blue uppercase tracking-widest shadow-xl"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span>{language === 'en' ? 'Live Democracy Portal' : 'लाइव लोकतंत्र पोर्टल'}</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]"
              >
                {language === 'en' ? 'Decide ' : 'तय करें '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-500 pb-4">
                  {language === 'en' ? 'The Path' : 'रास्ता'}
                </span>
                <br />
                {language === 'en' ? 'Of India.' : 'भारत का।'}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-xl text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
              >
                {language === 'en' 
                  ? 'The future belongs to the informed. Experience the world\'s largest election through interactive technology and AI.' 
                  : 'भविष्य जागरूक लोगों का है। इंटरैक्टिव तकनीक और AI के माध्यम से दुनिया के सबसे बड़े चुनाव का अनुभव करें।'}
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-6 pt-4"
            >
              <NavLink to="/learn" className="group relative px-10 py-5 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all overflow-hidden w-full sm:w-auto text-center">
                 <div className="relative z-10 flex items-center justify-center space-x-3">
                  <span>{language === 'en' ? 'Start Journey' : 'यात्रा शुरू करें'}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </NavLink>
              <NavLink to="/chat" className="px-10 py-5 bg-white dark:bg-white/5 dark:text-white text-slate-900 font-bold rounded-3xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition-all flex items-center space-x-3 w-full sm:w-auto justify-center">
                <MessageSquare size={20} />
                <span>{language === 'en' ? 'Talk to AI' : 'AI से बात करें'}</span>
              </NavLink>
            </motion.div>
          </div>

          {/* Dynamic Statistics Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="hidden lg:block relative"
          >
            <div className="bg-slate-900 rounded-[3rem] p-12 space-y-12 shadow-2xl shadow-blue-500/20 border border-white/5 relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 blur-[100px]" />
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-white/50 font-bold uppercase tracking-widest text-xs">
                    <span>{language === 'en' ? 'Active Electorate 2024' : 'सक्रिय मतदाता 2024'}</span>
                    <TrendingUp size={16} />
                  </div>
                  <h3 className="text-5xl md:text-7xl font-black text-white tabular-nums">
                    {tickerValue.toLocaleString()}
                  </h3>
                  <p className="text-blue-400 font-bold text-sm">
                    {language === 'en' ? '+1.8% Growth since 2019' : '2019 से +1.8% वृद्धि'}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <StatCard 
                   icon={<Users size={20} className="text-blue-500" />}
                   label={language === 'en' ? "New Voters" : "नए मतदाता"}
                   value="18M+"
                   color="bg-blue-500/10 text-blue-500"
                 />
                 <StatCard 
                   icon={<MapPin size={20} className="text-emerald-500" />}
                   label={language === 'en' ? "Polling Booths" : "मतदान केंद्र"}
                   value="1.05M"
                   color="bg-emerald-500/10 text-emerald-500"
                 />
               </div>

               <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 flex items-center space-x-4">
                  <Fingerprint className="text-blue-500" size={32} />
                  <div>
                    <div className="text-white font-bold text-lg">{language === 'en' ? 'Biometric Security' : 'बायोमेट्रिक सुरक्षा'}</div>
                    <div className="text-white/40 text-xs font-medium">100% Aadhaar-linked verification system</div>
                  </div>
               </div>
            </div>
            
            {/* Floaties */}
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute top-10 -right-8 bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-2xl flex items-center space-x-3 z-20 border border-slate-100 dark:border-white/10"
            >
               <Star className="text-amber-500 fill-amber-500" size={20} />
               <span className="font-black text-slate-900 dark:text-white">ECI Certified</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {language === 'en' ? 'Smarter Education.' : 'होशियार शिक्षा।'}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Our suite of tools is designed to clear every doubt and prepare you for the ballot box.' 
              : 'हमारे उपकरणों का सेट हर संदेह को दूर करने और आपको मतपेटी के लिए तैयार करने के लिए डिज़ाइन किया गया है।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <NavLink 
              to={feature.link} 
              key={idx}
              className="glass-card p-10 space-y-8 group hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className={`p-4 rounded-2xl w-fit ${feature.color} group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
              <div className="pt-4 flex items-center text-blue-600 font-bold text-sm tracking-widest uppercase">
                <span>Explore</span>
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Trust & Modern Democracy Section */}
      <section className="max-w-7xl mx-auto px-6 relative">
         <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent flex items-center justify-center">
               <Shield size={600} />
            </div>
            
            <div className="relative z-10 max-w-3xl space-y-8 text-center md:text-left mx-auto md:mx-0">
               <div className="flex items-center space-x-2 text-blue-200 uppercase tracking-[0.3em] font-black text-xs">
                  <Shield size={16} />
                  <span>The Integrity Seal</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-black leading-tight">
                 {language === 'en' ? 'Built on the Trust of Billions.' : 'अरबों के भरोसे पर निर्मित।'}
               </h2>
               <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                 {language === 'en'
                   ? 'Indian elections use proprietary EVM-VVPAT technology that is offline, autonomous, and zero-tamper. Our platform explains why.'
                   : 'भारतीय चुनाव मालिकाना EVM-VVPAT तकनीक का उपयोग करते हैं जो ऑफलाइन, स्वायत्त और शून्य-छेड़छाड़ है। हमारा मंच बताता है कि क्यों।'}
               </p>
               <div className="pt-6">
                 <NavLink to="/dashboard" className="inline-flex items-center space-x-4 bg-white text-blue-900 px-10 py-5 rounded-[2rem] font-bold hover:bg-blue-50 transition-all shadow-xl">
                   <span>{language === 'en' ? 'View Live Data' : 'लाइव डेटा देखें'}</span>
                   <TrendingUp size={20} />
                 </NavLink>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
