import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Shield, Users, Globe, Target, Sparkles, Heart } from 'lucide-react';

const About = () => {
  const mission = [
    { 
      icon: <Target className="text-blue-500" />, 
      title: "Our Mission", 
      text: "To bridge the gap between complex electoral procedures and citizen understanding through immersive AI-driven education." 
    },
    { 
      icon: <Shield className="text-emerald-500" />, 
      title: "Our Vision", 
      text: "A future where every voter is confident, informed, and actively participating in the democratic process." 
    },
    { 
      icon: <Heart className="text-pink-500" />, 
      title: "Our Values", 
      text: "Neutrality, transparency, and accessibility are at the heart of every module we build." 
    }
  ];

  const storySteps = [
    { year: "2024", event: "Project Foundation", desc: "Started as a hackathon initiative to solve electoral illiteracy." },
    { year: "2024", event: "AI Integration", desc: "Integrated Gemini Pro to provide real-time civic assistance." },
    { year: "Today", event: "Global Impact", desc: "Empowering thousands of first-time voters daily." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative overflow-hidden py-12">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl rounded-full" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} />
            <span>The Future of Civic Education</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
            Empowering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">
              Informed Democracy.
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto font-medium">
            ElectoLearn AI is more than just a platform; it's a digital movement to ensure every citizen understands the power of their vote.
          </p>
        </motion.div>
      </section>

      {/* Mission Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        {mission.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-10 space-y-6 group hover:border-blue-500/30 transition-all"
          >
            <div className="h-16 w-16 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px]" />
        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
              Why We Exist?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Electoral processes can be overwhelming. From understanding voter eligibility to navigating polling stations, the path to voting shouldn't be a barrier. 
              We use cutting-edge AI and interactive simulations to make this journey transparent and engaging.
            </p>
            <div className="flex gap-8">
               <div>
                  <div className="text-4xl font-black text-blue-400">95%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/40">Knowledge Gain</div>
               </div>
               <div>
                  <div className="text-4xl font-black text-emerald-400">10k+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/40">Users Polled</div>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {storySteps.map((step, idx) => (
              <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-2">
                <div className="flex justify-between items-center text-blue-400 font-black tracking-widest text-xs uppercase">
                   <span>{step.event}</span>
                   <span>{step.year}</span>
                </div>
                <p className="text-slate-300 font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Collaboration Message */}
      <section className="text-center py-20 space-y-10">
        <div className="h-20 w-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto text-blue-600">
           <Users size={40} />
        </div>
        <div className="space-y-4">
           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Small Team. Big Vision.</h2>
           <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium">
             Built by visionary developers and civic experts dedicated to preserving the integrity of the world's largest democracy.
           </p>
        </div>
        <div className="flex justify-center gap-4">
           <button className="btn-primary py-4 px-10">Join the Movement</button>
        </div>
      </section>
    </div>
  );
};

export default About;
