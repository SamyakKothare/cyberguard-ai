import React from 'react';
import { motion } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle2, Info, ArrowRight, RotateCcw, ShieldAlert, Zap } from 'lucide-react';
import { RiskScoreReport } from '../services/gemini';

interface RiskScoreResultProps {
  report: RiskScoreReport;
  onReset: () => void;
}

export function RiskScoreResult({ report, onReset }: RiskScoreResultProps) {
  const getRiskColor = (level: string) => {
    if (level.includes('Low')) return 'text-cyber-green border-cyber-green shadow-[0_0_15px_rgba(0,255,102,0.3)]';
    if (level.includes('Medium')) return 'text-cyber-yellow border-cyber-yellow shadow-[0_0_15px_rgba(255,204,0,0.3)]';
    return 'text-cyber-red border-cyber-red shadow-[0_0_15px_rgba(255,51,102,0.3)]';
  };

  const getRiskBg = (level: string) => {
    if (level.includes('Low')) return 'bg-cyber-green/10';
    if (level.includes('Medium')) return 'bg-cyber-yellow/10';
    return 'bg-cyber-red/10';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-cyber-card border border-cyber-border rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyber-neon"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyber-neon/10 rounded-xl text-cyber-neon">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-sm font-mono text-cyber-neon uppercase tracking-widest">Personal Cyber Risk Analysis</h2>
              <h1 className="text-3xl font-display font-bold text-white">Your Safety Report</h1>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {report.explanation}
          </p>
        </div>

        <div className={`rounded-2xl border p-8 flex flex-col items-center justify-center text-center ${getRiskColor(report.riskLevel)} ${getRiskBg(report.riskLevel)}`}>
          <div className="relative mb-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="opacity-10"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={364.4}
                initial={{ strokeDashoffset: 364.4 }}
                animate={{ strokeDashoffset: 364.4 - (364.4 * report.score) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-bold text-white">{report.score}</span>
              <span className="text-[10px] font-mono uppercase opacity-60">Safety Score</span>
            </div>
          </div>
          <div className="text-xs font-mono uppercase tracking-widest opacity-80 mb-1">Risk Level</div>
          <div className="text-xl font-display font-bold uppercase tracking-wider">{report.riskLevel}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weaknesses */}
        <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyber-red/10 rounded-lg text-cyber-red">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Key Weaknesses</h3>
          </div>
          <ul className="space-y-4">
            {report.weaknesses.map((weakness, idx) => (
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-cyber-border/50"
              >
                <AlertTriangle className="w-5 h-5 text-cyber-yellow shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{weakness}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyber-green/10 rounded-lg text-cyber-green">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Recommendations</h3>
          </div>
          <ul className="space-y-4">
            {report.recommendations.map((rec, idx) => (
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-cyber-border/50"
              >
                <CheckCircle2 className="w-5 h-5 text-cyber-green shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{rec}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-cyber-border hover:border-cyber-neon hover:text-cyber-neon transition-all font-mono text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
        </button>
      </div>
    </motion.div>
  );
}
