import React, { useState } from 'react';
import { Shield, Loader2, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeIncident, CyberReport } from './services/gemini';
import { ReportView } from './components/ReportView';
import AetherFlowHero from './components/ui/aether-flow-hero';

export default function App() {
  const [showHero, setShowHero] = useState(true);
  const [incidentDescription, setIncidentDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<CyberReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentDescription.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setReport(null);

    try {
      const result = await analyzeIncident(incidentDescription);
      setReport(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the incident. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (showHero) {
    return <AetherFlowHero onGetStarted={() => setShowHero(false)} />;
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-300 font-sans selection:bg-cyber-neon selection:text-black flex flex-col relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(to right, rgba(30, 45, 61, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 45, 61, 0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark via-transparent to-cyber-dark"></div>
      </div>

      {/* Navbar */}
      <header className="border-b border-cyber-border bg-cyber-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => {
              setShowHero(true);
              setReport(null);
              setIncidentDescription('');
            }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="p-1.5 bg-cyber-neon/10 rounded-lg">
              <Shield className="w-6 h-6 text-cyber-neon" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              CyberGuard <span className="text-cyber-neon">AI</span>
            </span>
          </button>
          <div className="text-xs font-mono text-slate-500 hidden sm:block">
            AI Cybercrime Advisor System v1.0
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
        {!report && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-neon/10 border border-cyber-neon/20 text-cyber-neon text-sm font-mono mb-6">
              <Shield className="w-4 h-4" />
              <span>AI-Powered Threat Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Describe the incident.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon to-blue-500">
                Get immediate guidance.
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Have you experienced a suspicious online activity, scam, or hack? 
              Describe what happened in your own words, and our AI will analyze the situation, 
              assess the risk, and tell you exactly what to do next.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!report ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyber-neon to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-cyber-card border border-cyber-border rounded-2xl p-2 shadow-2xl">
                  <textarea
                    value={incidentDescription}
                    onChange={(e) => setIncidentDescription(e.target.value)}
                    placeholder="E.g., I received an SMS saying my electricity bill is overdue and my power will be cut off tonight. They included a link to pay via UPI..."
                    className="w-full h-48 bg-transparent text-white placeholder-slate-500 p-4 focus:outline-none resize-none font-sans text-lg"
                    disabled={isAnalyzing}
                  />
                  <div className="flex justify-between items-center p-2 border-t border-cyber-border/50 mt-2">
                    <div className="text-xs text-slate-500 font-mono px-2 flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      Your data is analyzed securely
                    </div>
                    <button
                      type="submit"
                      disabled={isAnalyzing || !incidentDescription.trim()}
                      className="bg-cyber-neon hover:bg-cyber-neon/90 text-black font-medium px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Analyze Incident
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-cyber-red/10 border border-cyber-red/30 rounded-xl flex items-start gap-3 text-cyber-red"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="report" className="space-y-8">
              <button 
                onClick={() => setReport(null)}
                className="text-sm font-mono text-slate-400 hover:text-cyber-neon transition-colors flex items-center gap-2 mb-4"
              >
                ← Analyze another incident
              </button>
              <ReportView report={report} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
