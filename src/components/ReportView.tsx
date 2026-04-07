import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, AlertTriangle, Info, ShieldCheck, Activity, Scale, PhoneCall, Lightbulb, BrainCircuit, ChevronRight } from 'lucide-react';
import { CyberReport } from '../services/gemini';

interface ReportViewProps {
  report: CyberReport;
}

export function ReportView({ report }: ReportViewProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-cyber-red border-cyber-red shadow-[0_0_15px_rgba(255,51,102,0.3)]';
      case 'HIGH': return 'text-orange-500 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]';
      case 'MEDIUM': return 'text-cyber-yellow border-cyber-yellow shadow-[0_0_15px_rgba(255,204,0,0.3)]';
      case 'LOW': return 'text-cyber-green border-cyber-green shadow-[0_0_15px_rgba(0,255,102,0.3)]';
      default: return 'text-cyber-neon border-cyber-neon shadow-[0_0_15px_rgba(0,240,255,0.3)]';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-cyber-red/10';
      case 'HIGH': return 'bg-orange-500/10';
      case 'MEDIUM': return 'bg-cyber-yellow/10';
      case 'LOW': return 'bg-cyber-green/10';
      default: return 'bg-cyber-neon/10';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto space-y-6"
    >
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          animate={{ 
            boxShadow: report.threat_visualization.animation_intensity === '4' 
              ? ['0px 0px 0px rgba(255,51,102,0)', '0px 0px 20px rgba(255,51,102,0.5)', '0px 0px 0px rgba(255,51,102,0)'] 
              : 'none'
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="md:col-span-2 bg-cyber-card border border-cyber-border rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-cyber-neon"></div>
          <h2 className="text-sm font-mono text-cyber-neon mb-1 uppercase tracking-wider">Detected Threat</h2>
          <h1 className="text-3xl font-display font-bold text-white mb-2">{report.cybercrime_type}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {report.category_tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-cyber-border/50 text-slate-300 text-xs font-mono rounded-md border border-cyber-border">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-slate-400 text-sm">{report.incident_explanation}</p>
        </motion.div>

        <div className={`border rounded-xl p-6 flex flex-col justify-center items-center text-center ${getRiskColor(report.risk_level)} ${getRiskBg(report.risk_level)}`}>
          <AlertTriangle className="w-10 h-10 mb-2" />
          <div className="text-xs font-mono uppercase tracking-widest opacity-80 mb-1">Risk Level</div>
          <div className="text-2xl font-display font-bold uppercase tracking-wider">{report.risk_level}</div>
          <div className="mt-4 w-full bg-black/40 rounded-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: report.scam_probability }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full ${report.risk_level === 'CRITICAL' || report.risk_level === 'HIGH' ? 'bg-cyber-red' : report.risk_level === 'MEDIUM' ? 'bg-cyber-yellow' : 'bg-cyber-green'}`}
            />
          </div>
          <div className="text-xs font-mono mt-2 opacity-80">{report.scam_probability} Scam Probability</div>
        </div>
      </div>

      {/* Immediate Actions - High Priority */}
      <div className="bg-cyber-red/5 border border-cyber-red/30 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyber-red/50"></div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyber-red/20 rounded-lg text-cyber-red">
            <Activity className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-display font-bold text-white">Immediate Actions Required</h3>
        </div>
        <ul className="space-y-3">
          {report.immediate_actions.map((action, idx) => (
            <motion.li 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              key={idx} 
              className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-cyber-red/10"
            >
              <ChevronRight className="w-5 h-5 text-cyber-red shrink-0 mt-0.5" />
              <span className="text-slate-200">{action}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mechanics & Psychology */}
        <div className="space-y-6">
          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyber-neon/10 rounded-lg text-cyber-neon">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white">How This Scam Works</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{report.how_the_scam_works}</p>
            
            <div className="mt-4 pt-4 border-t border-cyber-border/50">
              <h4 className="text-sm font-mono text-slate-400 mb-3 uppercase tracking-wider">Attack Timeline</h4>
              <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyber-border before:to-transparent">
                {report.attack_timeline.map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border border-cyber-neon bg-cyber-dark text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-1.5 h-1.5 bg-cyber-neon rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-cyber-border bg-cyber-dark/50 text-sm text-slate-300">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white">Psychological Tricks Used</h3>
            </div>
            <ul className="space-y-2">
              {report.psychological_tricks.map((trick, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <span>{trick}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white">Estimated Damage Risk</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{report.estimated_damage_risk}</p>
          </div>
        </div>

        {/* Legal, Reporting, Prevention */}
        <div className="space-y-6">
          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white">Legal Awareness</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{report.legal_awareness}</p>
          </div>

          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyber-yellow/10 rounded-lg text-cyber-yellow">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white">Where to Report</h3>
            </div>
            <ul className="space-y-2">
              {report.where_to_report.map((channel, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-yellow mt-1.5 shrink-0" />
                  <span>{channel}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyber-green/10 rounded-lg text-cyber-green">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white">Prevention Tips</h3>
            </div>
            <ul className="space-y-2">
              {report.prevention_tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-green mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
