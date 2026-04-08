import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ChevronRight, ChevronLeft, Loader2, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { analyzeRiskScore, RiskScoreReport } from '../services/gemini';

const QUESTIONS = [
  {
    id: 'password_reuse',
    question: 'Do you reuse the same password for multiple online accounts?',
    options: ['Yes, for most accounts', 'For some accounts', 'No, I use unique passwords for everything']
  },
  {
    id: 'two_factor',
    question: 'Do you use Two-Factor Authentication (2FA) for your important accounts (Email, Banking, Social Media)?',
    options: ['No, never', 'Only for banking', 'Yes, for all important accounts']
  },
  {
    id: 'unknown_links',
    question: 'How often do you click on links in emails or SMS from unknown senders?',
    options: ['Often, if it looks interesting', 'Rarely, if it seems urgent', 'Never, I always verify first']
  },
  {
    id: 'untrusted_apps',
    question: 'Do you install apps from sources other than the official App Store or Play Store?',
    options: ['Yes, frequently', 'Occasionally', 'No, only from official stores']
  },
  {
    id: 'public_wifi',
    question: 'Do you use public WiFi (like at cafes or airports) for banking or shopping?',
    options: ['Yes, always', 'Only if I have to', 'No, I use my mobile data or a VPN']
  },
  {
    id: 'verify_callers',
    question: 'If someone calls claiming to be from your bank and asks for personal info, what do you do?',
    options: ['I provide the info to resolve the issue', 'I ask them some questions first', 'I hang up and call the bank back on their official number']
  },
  {
    id: 'check_urls',
    question: 'Do you check the website URL (address) before entering your login credentials?',
    options: ['No, I trust the site looks real', 'Sometimes, if it looks suspicious', 'Yes, always']
  }
];

interface RiskScoreQuizProps {
  onComplete: (report: RiskScoreReport) => void;
}

export function RiskScoreQuiz({ onComplete }: RiskScoreQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].question]: option };
    setAnswers(newAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const report = await analyzeRiskScore(answers);
      onComplete(report);
    } catch (err) {
      console.error(err);
      setError('Failed to calculate your risk score. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-cyber-card border border-cyber-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyber-border">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-cyber-neon shadow-[0_0_10px_rgba(0,240,255,0.5)]"
          />
        </div>

        <AnimatePresence mode="wait">
          {!isAnalyzing ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyber-neon uppercase tracking-widest">
                  Question {currentStep + 1} of {QUESTIONS.length}
                </span>
                <h2 className="text-2xl font-display font-bold text-white leading-tight">
                  {QUESTIONS[currentStep].question}
                </h2>
              </div>

              <div className="space-y-3">
                {QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group
                      ${answers[QUESTIONS[currentStep].question] === option 
                        ? 'bg-cyber-neon/10 border-cyber-neon text-white' 
                        : 'bg-black/20 border-cyber-border text-slate-400 hover:border-slate-500 hover:bg-black/40'}`}
                  >
                    <span>{option}</span>
                    <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${answers[QUESTIONS[currentStep].question] === option ? 'text-cyber-neon' : 'text-slate-600'}`} />
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 text-sm font-mono text-slate-500 hover:text-slate-300 disabled:opacity-0 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                {currentStep === QUESTIONS.length - 1 && answers[QUESTIONS[currentStep].question] && (
                  <button
                    onClick={handleSubmit}
                    className="bg-cyber-neon text-black font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all"
                  >
                    Calculate My Score
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyber-neon/20 blur-2xl rounded-full animate-pulse"></div>
                <Loader2 className="w-16 h-16 text-cyber-neon animate-spin relative z-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-display font-bold text-white">Analyzing Your Habits</h3>
                <p className="text-slate-400 max-w-xs mx-auto">
                  Our AI is evaluating your responses against current cyber threat patterns...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="mt-6 p-4 bg-cyber-red/10 border border-cyber-red/30 rounded-xl flex items-start gap-3 text-cyber-red">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
