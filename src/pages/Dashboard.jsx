import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { TrendingUp, Users, MapPin, Calendar, Info, Globe, Activity, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { electionData } from '../services/electionData';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { language } = useLanguage();
  const { isDark } = useTheme();
  const data = electionData[language].dashboardStats;

  const COLORS = ['#2563EB', '#EC4899', '#F59E0B', '#10B981', '#8B5CF6'];
  const chartTextColor = isDark ? '#94A3B8' : '#64748B';
  const gridColor = isDark ? '#334155' : '#E2E8F0';

  const stats = [
    { label: language === 'en' ? 'Total Voters' : 'कुल मतदाता', value: data.totalVoters, icon: <Users className="text-blue-500" />, trend: '+8%' },
    { label: language === 'en' ? 'Female Voters' : 'महिला मतदाता', value: '471 Million', icon: <Users className="text-pink-500" />, trend: '+9.3%' },
    { label: language === 'en' ? 'Young Voters (18-19)' : 'युवा मतदाता', value: '18.4 Million', icon: <Activity className="text-emerald-500" />, trend: 'New' },
    { label: language === 'en' ? 'Polling Stations' : 'मतदान केंद्र', value: data.pollingStations, icon: <MapPin className="text-amber-500" />, trend: 'Global High' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 blur-[100px]" />
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-widest">
            <Globe size={14} className="animate-spin-slow" />
            <span>{language === 'en' ? "World's Largest Democratic Exercise" : "दुनिया का सबसे बड़ा लोकतांत्रिक उत्सव"}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
            {language === 'en' ? 'Electoral ' : 'चुनावी '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500">
              {language === 'en' ? 'Intelligence' : 'इंटेलिजेंस'}
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
            {language === 'en' 
              ? 'Real-time data insights into the scale, participation, and historic trends of Indian General Elections.' 
              : 'भारतीय आम चुनावों के पैमाने, भागीदारी और ऐतिहासिक रुझानों में रीयल-टाइम डेटा अंतर्दृष्टि।'}
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-black px-6 py-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-500 dark:text-white/50 border border-slate-100 dark:border-white/10 uppercase tracking-widest shadow-inner">
          <Calendar size={16} />
          <span>Latest Update: 2024 Gen. Election</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-8 group hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-default overflow-hidden relative"
          >
            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:scale-125 transition-transform">
               {stat.icon}
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                {stat.trend}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter tabular-nums">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Turnout Area Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 space-y-10 border-blue-500/5 group"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-2xl font-black flex items-center space-x-3 text-slate-900 dark:text-white">
                <TrendingUp size={24} className="text-blue-500" />
                <span>{language === 'en' ? 'Voter Participation Trend' : 'मतदाता भागीदारी रुझान'}</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Historical percentage turnout across decades.</p>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.voterTurnout}>
                <defs>
                  <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} opacity={0.2} />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: chartTextColor, fontSize: 12, fontWeight: '900'}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: chartTextColor, fontSize: 12, fontWeight: '900'}} 
                  domain={[55, 70]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="turnout" 
                  stroke="#2563EB" 
                  strokeWidth={5}
                  fillOpacity={1} 
                  fill="url(#colorTurnout)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Age Demographics Radar Chart */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className="glass-card p-10 space-y-10 border-purple-500/5"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-2xl font-black flex items-center space-x-3 text-slate-900 dark:text-white">
                <Users size={24} className="text-purple-500" />
                <span>{language === 'en' ? 'Age Demographics' : 'आयु जनसांख्यिकी'}</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Percentage distribution of the electorate by age group.</p>
            </div>
          </div>

          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.ageGroups}>
                <PolarGrid stroke={gridColor} />
                <PolarAngleAxis dataKey="group" tick={{ fill: chartTextColor, fontSize: 13, fontWeight: '900' }} />
                <PolarRadiusAxis angle={30} domain={[0, 45]} tick={false} axisLine={false} />
                <Radar
                   name="Electorate %"
                   dataKey="percentage"
                   stroke="#8B5CF6"
                   fill="#8B5CF6"
                   fillOpacity={0.5}
                   animationDuration={2000}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Layout: Gender Parity & Global Scale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-10 space-y-8 flex flex-col justify-between border-pink-500/10 group"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{language === 'en' ? 'Gender Distribution' : 'लिंग वितरण'}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total registered voters by gender category.</p>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.genderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {data.genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-pink-50 dark:bg-pink-900/10 p-6 rounded-3xl border border-pink-100 dark:border-pink-800/30">
            <p className="text-xs text-pink-700 dark:text-pink-300 leading-relaxed font-black uppercase tracking-widest italic">
              "Gender gap in participation has reduced to just 0.1% in 2024."
            </p>
          </div>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="lg:col-span-2 glass-card p-12 bg-slate-950 text-white overflow-hidden relative group border-0"
        >
          <div className="absolute top-0 right-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <ShieldCheck size={400} className="text-blue-500" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-center space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-blue-400 text-xs font-black uppercase tracking-[0.3em]">
                 <span className="w-8 h-[2px] bg-blue-500" />
                 <span>Strategic Integrity</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter">
                Global Scale of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Election Logistics</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                Managing nearly a billion voters requires 15 million election officials and polling staff, 
                over 5.5 million EVMs, and 1.05 million polling stations. It's the world's largest logistics exercise during peace time.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
               <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-blue-400 text-2xl font-black">1.1M+</div>
                  <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">Vehicles Used</div>
               </div>
               <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-emerald-400 text-2xl font-black">15M</div>
                  <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">Election Staff</div>
               </div>
               <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="text-purple-400 text-2xl font-black">5.5M+</div>
                  <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">EVM Units</div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
