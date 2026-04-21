import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare, Send, CheckCircle, Smartphone, Globe, Share2 } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactInfos = [
    { icon: <Mail className="text-blue-500" />, label: "Email Support", value: "support@electolearn.ai", sub: "Response within 24h" },
    { icon: <MapPin className="text-emerald-500" />, label: "Innovation Hub", value: "Mehrauli-Gurgaon Road", sub: "New Delhi, IND" },
    { icon: <Phone className="text-purple-500" />, label: "Official Helpdesk", value: "1800-ELECTO-AI", sub: "Mon-Fri (9am - 6pm)" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      {/* Header */}
      <section className="text-center space-y-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex space-x-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800"
        >
          <MessageSquare size={14} />
          <span>Get in Touch</span>
        </motion.div>
        <h1 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
           Contact <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
             Our Experts.
           </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium leading-relaxed">
           Have questions about our voter simulator or AI assistant? We're here to help you navigate the democratic process.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left: Contact Info & Socials */}
        <div className="space-y-12">
           <div className="grid gap-6">
              {contactInfos.map((info, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="glass-card p-8 flex items-center space-x-6 hover:translate-x-2 transition-all cursor-default group"
                >
                   <div className="h-14 w-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      {info.icon}
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{info.label}</p>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">{info.value}</h4>
                      <p className="text-xs text-slate-500 font-medium italic">{info.sub}</p>
                   </div>
                </motion.div>
              ))}
           </div>

           <div className="space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest pl-2">Social Pulse</h3>
              <div className="flex gap-4">
                 {[<Mail />, <MessageSquare />, <Share2 />, <Globe />].map((icon, i) => (
                   <motion.button 
                    whileHover={{ scale: 1.1, y: -5 }}
                    key={i} 
                    className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors border border-slate-200 dark:border-white/5"
                   >
                     {icon}
                   </motion.button>
                 ))}
              </div>
           </div>

           <div className="p-10 bg-slate-950 rounded-[3rem] text-white space-y-6 relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <Smartphone className="text-emerald-400 mb-4" />
              <h4 className="text-2xl font-black tracking-tight">Download Our App</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                 Access offline learning modules and simulation patterns directly from your mobile device.
              </p>
              <div className="flex gap-3">
                 <div className="h-10 w-24 bg-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold border border-white/5 uppercase tracking-widest">App Store</div>
                 <div className="h-10 w-24 bg-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold border border-white/5 uppercase tracking-widest">Play Store</div>
              </div>
           </div>
        </div>

        {/* Right: Modern Form */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass-card p-10 md:p-14 relative"
        >
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-8 text-center py-20"
              >
                <div className="h-24 w-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-[2.5rem] flex items-center justify-center text-emerald-500 shadow-xl">
                   <CheckCircle size={56} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">Transmission Received!</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Our team of experts will analyze your request and get back to you shortly.</p>
                </div>
                <button 
                  onClick={() => setFormState('idle')}
                  className="px-10 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold rounded-2xl"
                >
                   Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                exit={{ opacity: 0, scale: 1.1 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Send an AI Query</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Please fill out the form below with the precision of a voter ballot.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Name</label>
                     <input 
                      required
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 font-bold transition-all" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email</label>
                     <input 
                      required
                      type="email" 
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 font-bold transition-all" 
                     />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                   <input 
                    required
                    type="text" 
                    placeholder="General Inquiry / Technical Support"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 font-bold transition-all" 
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Message Detail</label>
                   <textarea 
                    required
                    rows={5}
                    placeholder="Describe your query in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl px-6 py-4 outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 font-bold transition-all resize-none" 
                   />
                </div>

                <button 
                  disabled={formState === 'sending'}
                  type="submit"
                  className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-3xl shadow-2xl shadow-emerald-500/20 transform transition-all active:scale-95 flex items-center justify-center space-x-4 disabled:opacity-50"
                >
                  {formState === 'sending' ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                       <Send size={24} />
                    </motion.div>
                  ) : (
                    <>
                      <span className="text-xl">Dispatch Message</span>
                      <Send size={24} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
