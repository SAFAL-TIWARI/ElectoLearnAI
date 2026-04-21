import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, MapPin, Calendar, Award, 
  BookOpen, CheckCircle, Clock, Shield, 
  FileText, Download, Edit3, Save, X,
  TrendingUp, Star, Activity, Camera
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Profile = () => {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('electo_user');
    return saved ? JSON.parse(saved) : {
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'Enthusiastic learner exploring the intricacies of Indian democracy. Passionate about civic engagement and electoral literacy.',
      location: 'New Delhi, India',
      joined: 'April 2024',
      rank: 'Pro Learner',
      points: 1250,
      level: 12,
      lessonsCompleted: 24,
      quizzesTaken: 15,
      simulatorRank: 'Expert'
    };
  });

  const [editForm, setEditForm] = useState({ ...userData });

  useEffect(() => {
    localStorage.setItem('electo_user', JSON.stringify(userData));
  }, [userData]);

  const handleSave = () => {
    setUserData(editForm);
    setIsEditing(false);
    // Trigger a window event so Navbar can update if needed
    window.dispatchEvent(new Event('storage'));
  };

  const stats = [
    { label: language === 'en' ? 'Points' : 'अंक', value: userData.points, icon: <Star className="text-amber-500" /> },
    { label: language === 'en' ? 'Lessons' : 'पाठ', value: userData.lessonsCompleted, icon: <BookOpen className="text-blue-500" /> },
    { label: language === 'en' ? 'Quizzes' : 'क्विज़', value: userData.quizzesTaken, icon: <CheckCircle className="text-emerald-500" /> },
    { label: language === 'en' ? 'Level' : 'स्तर', value: userData.level, icon: <TrendingUp className="text-purple-500" /> },
  ];

  const documents = [
    { title: 'Voter Guide 2024', size: '2.4 MB', type: 'PDF' },
    { title: 'Election Protocol Summary', size: '1.1 MB', type: 'PDF' },
    { title: 'Sample Ballot Paper', size: '800 KB', type: 'Image' },
    { title: 'My Quiz Certificates', size: '4.5 MB', type: 'ZIP' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white dark:bg-slate-900 rounded-[3rem] shadow-premium border border-slate-100 dark:border-white/5 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-election-blue to-emerald-500 opacity-10 dark:opacity-20" />
        <div className="relative pt-24 pb-12 px-8 md:px-12 flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="relative group">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white dark:border-slate-900 overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
               {userData.name.charAt(0)}
            </div>
            <button className="absolute bottom-2 right-2 p-2.5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors border border-slate-100 dark:border-white/10">
              <Camera size={20} />
            </button>
          </div>
          
          <div className="flex-grow text-center md:text-left space-y-4">
            <div className="space-y-1">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
                  {userData.name}
                </h1>
                <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-200 dark:border-blue-800">
                  {userData.rank}
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">
                 <div className="flex items-center gap-1.5">
                   <MapPin size={14} className="text-blue-500" />
                   <span>{userData.location}</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <Calendar size={14} className="text-emerald-500" />
                   <span>Member since {userData.joined}</span>
                 </div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium leading-relaxed italic">
              "{userData.bio}"
            </p>
          </div>

          <div className="flex-shrink-0">
             <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl flex items-center space-x-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
             >
               <Edit3 size={20} />
               <span>{language === 'en' ? 'Edit Profile' : 'प्रोफ़ाइल बदलें'}</span>
             </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card / Edit Form */}
          <motion.div 
            layout
            className="glass-card p-10 space-y-10"
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <Shield className="text-blue-500" />
                <span>{isEditing ? (language === 'en' ? 'Edit Your Information' : 'अपनी जानकारी बदलें') : (language === 'en' ? 'Profile Details' : 'प्रोफ़ाइल विवरण')}</span>
              </h3>
              {isEditing && (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={24} />
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  key="edit-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 dark:focus:border-blue-400 font-bold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                    <input 
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 dark:focus:border-blue-400 font-bold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Location</label>
                    <input 
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 dark:focus:border-blue-400 font-bold transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Learner Rank</label>
                    <select 
                      value={editForm.rank}
                      onChange={(e) => setEditForm(prev => ({ ...prev, rank: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 dark:focus:border-blue-400 font-bold transition-all appearance-none"
                    >
                      <option>Pro Learner</option>
                      <option>Elite Elector</option>
                      <option>Democracy Champion</option>
                      <option>Civic Leader</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Short Bio</label>
                    <textarea 
                      rows={4}
                      value={editForm.bio}
                      onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 dark:focus:border-blue-400 font-bold transition-all resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button 
                      onClick={handleSave}
                      className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transform transition-all active:scale-95 flex items-center justify-center space-x-3"
                    >
                       <Save size={20} />
                       <span>{language === 'en' ? 'Save Transformation' : 'परिवर्तन सहेजें'}</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="details-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8"
                >
                  <div className="space-y-2 group">
                    <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <Mail size={12} className="text-blue-500" />
                       <span>Email Address</span>
                    </div>
                    <p className="text-xl font-bold text-slate-950 dark:text-slate-100 pl-1">{userData.email}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <MapPin size={12} className="text-emerald-500" />
                       <span>Primary Location</span>
                    </div>
                    <p className="text-xl font-bold text-slate-950 dark:text-slate-100 pl-1">{userData.location}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <Activity size={12} className="text-purple-500" />
                       <span>Simulator Rank</span>
                    </div>
                    <p className="text-xl font-bold text-slate-950 dark:text-slate-100 pl-1">{userData.simulatorRank}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <Clock size={12} className="text-amber-500" />
                       <span>Average Time Spend</span>
                    </div>
                    <p className="text-xl font-bold text-slate-950 dark:text-slate-100 pl-1">2.4 hrs / week</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 text-center space-y-3 hover:scale-105 transition-transform"
              >
                <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto shadow-inner">
                   {stat.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{stat.value}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Dashboard & Documents */}
        <div className="space-y-8">
          {/* Achievement Progress */}
          <div className="glass-card p-8 bg-slate-950 text-white border-0 overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-20 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
             <div className="relative z-10 space-y-8">
               <div className="flex justify-between items-start">
                 <div className="p-4 bg-white/10 rounded-2xl">
                   <Award size={24} className="text-blue-400" />
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Current Badge</p>
                   <p className="text-lg font-black text-blue-400">Master Elector</p>
                 </div>
               </div>
               
               <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                   <span>Next Level Progress</span>
                   <span className="text-white">75%</span>
                 </div>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500" 
                   />
                 </div>
                 <p className="text-xs text-white/40 font-medium italic">Just 250 more points to reach "Democracy Champion"!</p>
               </div>
             </div>
          </div>

          {/* Document Center */}
          <div className="glass-card p-8 space-y-8" id="documents">
             <div className="flex justify-between items-center">
               <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                 <FileText size={20} className="text-emerald-500" />
                 <span>{language === 'en' ? 'Document Vault' : 'दस्तावेज़ तिजोरी'}</span>
               </h3>
               <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full">{documents.length}</span>
             </div>

             <div className="space-y-4">
                {documents.map((doc, idx) => (
                  <div 
                    key={idx}
                    className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                       <div className="h-10 w-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-emerald-500 shadow-sm transition-transform group-hover:scale-110">
                          <FileText size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[120px]">{doc.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{doc.size} • {doc.type}</p>
                       </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
             </div>

             <button className="w-full py-4 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-dashed border-slate-200 dark:border-white/10">
                View All Archives
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
