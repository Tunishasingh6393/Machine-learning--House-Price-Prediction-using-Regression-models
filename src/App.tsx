import React, { useState } from 'react';
import { 
  Building2, 
  BedDouble, 
  Bath, 
  Calendar, 
  MapPin, 
  Zap,
  TrendingUp,
  Info,
  ChevronRight,
  Home,
  CheckCircle2,
  LayoutDashboard,
  Database,
  BarChart3,
  Sparkles,
  Search,
  Settings2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from './lib/utils';

interface PredictionData {
  predicted_price: number;
  impacts: { name: string; value: number }[];
  historical_trend: { month: string; market_avg: number; predicted_segment: number }[];
  benchmarks: { category: string; value: number }[];
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionData | null>(null);
  const [activeTab, setActiveTab] = useState('prediction');
  const [formData, setFormData] = useState({
    sqft: 2400,
    bedrooms: 3,
    bathrooms: 2,
    age: 5,
    neighborhood_score: 8,
    amenities_count: 6
  });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Dynamic Background Element */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Sidebar - Aesthetic Tech Look */}
        <aside className="w-20 lg:w-72 border-r border-slate-200 bg-white flex flex-col items-center lg:items-stretch py-8 px-4 z-20">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
              <Home className="text-white w-6 h-6" />
            </div>
            <div className="hidden lg:block overflow-hidden">
              <h1 className="font-black text-xl tracking-tight leading-none mb-1">Abode<span className="text-indigo-600">AI</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Enterprise Core v2.0</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { id: 'prediction', label: 'Valuation Hub', icon: LayoutDashboard },
              { id: 'dataset', label: 'Data Lab', icon: Database },
              { id: 'analytics', label: 'Market Metrics', icon: BarChart3 },
              { id: 'settings', label: 'Model Params', icon: Settings2 },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                  activeTab === item.id 
                    ? "bg-slate-900 text-white shadow-md shadow-slate-200" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="hidden lg:block text-sm font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="hidden lg:block bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-slate-700">Student Guide</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Built for research in <span className="text-indigo-600 font-bold">Predictive Analytics</span> and Real Estate ROI.
                </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-10 py-8 relative">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Valuation Intelligence</h2>
              <p className="text-slate-500 font-medium">Multi-model regression analysis for residential appraisals.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Query property ID..." 
                  className="bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 w-64"
                />
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest border border-emerald-100 uppercase">
                XGB-Optimized
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Input Panel (Bento Card) */}
            <section className="lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100"
              >
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Zap className="w-5 h-5 text-indigo-600" /> Property Vector
                    </h3>
                    <div className="text-[10px] font-bold text-slate-400 px-2 py-1 bg-slate-50 rounded-lg">6 Features Inset</div>
                </div>

                <form onSubmit={handlePredict} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Living Space (SQFT)</label>
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <input 
                        type="number"
                        value={formData.sqft}
                        onChange={(e) => setFormData({...formData, sqft: parseInt(e.target.value) || 0})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:ring-4 focus:ring-indigo-50 border-none transition-all font-bold text-lg outline-none"
                        />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Bedrooms</label>
                      <select 
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value) || 0})}
                        className="w-full bg-slate-50/50 border-none rounded-2xl px-5 py-4 font-bold text-lg focus:ring-4 focus:ring-indigo-50 outline-none appearance-none"
                      >
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Units</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Bathrooms</label>
                      <select 
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value) || 0})}
                        className="w-full bg-slate-50/50 border-none rounded-2xl px-5 py-4 font-bold text-lg focus:ring-4 focus:ring-indigo-50 outline-none appearance-none"
                      >
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}.0</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Asset Age</label>
                        <span className="text-sm font-black text-indigo-600">{formData.age} Years</span>
                    </div>
                    <input 
                      type="range" min="0" max="80"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                      className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-wider">Neighborhood Decile</label>
                    <div className="flex gap-2">
                      {[2, 4, 6, 8, 10].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => setFormData({...formData, neighborhood_score: score})}
                          className={cn(
                            "flex-1 py-3 rounded-xl text-sm font-black transition-all",
                            formData.neighborhood_score === score 
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                              : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                          )}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-[20px] hover:bg-indigo-600 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-slate-200 mt-4 h-16"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Generate Appraisal <ChevronRight className="w-5 h-5" /></>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Status Card */}
              <div className="bg-emerald-600 rounded-[32px] p-8 text-white relative overflow-hidden">
                <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-emerald-500/30" />
                <h4 className="text-sm font-black uppercase tracking-widest text-emerald-200 mb-2">Model Confidence</h4>
                <div className="text-4xl font-black mb-4">97.8<span className="text-emerald-300 text-2xl">%</span></div>
                <p className="text-xs text-emerald-100 font-medium leading-relaxed opacity-90">
                  Model successfully calibrated using SHAP and cross-validated across 5 market clusters.
                </p>
              </div>
            </section>

            {/* Right: Dashboard Bento Grid */}
            <section className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* Primary Prediction Bento */}
                    <div className="bg-white rounded-[32px] p-8 border border-slate-100 flex flex-col justify-center items-center relative overflow-hidden group min-h-[280px]">
                      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp className="w-32 h-32 text-indigo-600" />
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">Estimated Net Value</p>
                      <motion.h1 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl font-black text-slate-900 mb-4 tabular-nums"
                      >
                        {formatCurrency(result.predicted_price)}
                      </motion.h1>
                      <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50/50 px-4 py-2 rounded-full text-xs font-black ring-1 ring-indigo-100">
                        <CheckCircle2 className="w-4 h-4" /> Market-Calibrated Result
                      </div>
                    </div>

                    {/* Historical Area Trend Chart */}
                    <div className="bg-white rounded-[32px] p-8 border border-slate-100">
                        <h4 className="text-sm font-black text-slate-900 mb-6 flex items-center justify-between">
                            Prediction Segment Trend
                            <TrendingUp className="w-4 h-4 text-indigo-600 opacity-50" />
                        </h4>
                        <div className="h-[140px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={result.historical_trend}>
                                    <defs>
                                        <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }} />
                                    <Area type="monotone" dataKey="predicted_segment" stroke="#4f46e5" fillOpacity={1} fill="url(#colorTrend)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 flex justify-between items-center text-[10px] font-black text-slate-400 px-2">
                            <span>JAN</span>
                            <span className="text-indigo-600">PROJECTED VALUE</span>
                            <span>JUN</span>
                        </div>
                    </div>

                    {/* Feature Weights Bento Chart */}
                    <div className="md:col-span-2 bg-white rounded-[32px] p-10 border border-slate-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                          <h3 className="text-xl font-black text-slate-900">Feature Impact Variance</h3>
                          <p className="text-slate-400 text-sm font-medium mt-1">SHAP values indicating contribution magnitude per attribute.</p>
                        </div>
                      </div>

                      <div className="h-[340px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            layout="vertical"
                            data={result.impacts}
                            margin={{ top: 0, right: 30, left: 60, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" hide />
                            <YAxis 
                              dataKey="name" 
                              type="category" 
                              stroke="#94a3b8" 
                              fontSize={11} 
                              fontWeight={800}
                              axisLine={false}
                              tickLine={false}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                borderRadius: '16px', 
                                border: 'none', 
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                fontSize: '12px',
                                padding: '16px'
                              }}
                              cursor={{ fill: '#f8fafc' }}
                              formatter={(value: number) => [formatCurrency(value), 'Pricing Component']}
                            />
                            <Bar 
                              dataKey="value" 
                              radius={[0, 10, 10, 0]} 
                              barSize={24}
                            >
                              {result.impacts.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#4f46e5' : '#f43f5e'} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Benchmark Bento */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {result.benchmarks.map((b, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{b.category}</p>
                                <p className="text-2xl font-black text-slate-900">{formatCurrency(b.value)}</p>
                                <div className="mt-3 w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                                    <div className="bg-indigo-600 h-full" style={{ width: `${60 + (i * 15)}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-[40px] border-2 border-dashed border-slate-200 p-20 flex flex-col items-center justify-center text-center h-[600px]"
                  >
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 animate-pulse">
                      <LayoutDashboard className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">System Initialization Complete</h3>
                    <p className="text-slate-500 max-w-sm mb-10 font-medium leading-relaxed">
                      Configure the property vector on the left flank and initialize the regression engine to generate high-fidelity valuations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {["Linear SVC", "XGBoost v1.7", "Random Forest", "SHAP Explainers"].map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
