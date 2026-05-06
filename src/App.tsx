import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  Dumbbell, 
  Utensils, 
  BrainCircuit, 
  AlertTriangle, 
  ChevronRight,
  Loader2,
  Sparkles,
  Info
} from "lucide-react";
import { 
  UserProfile, 
  FitnessGoal, 
  ActivityLevel, 
  WorkoutPreference, 
  PromptStrategy, 
  FitnessPlan 
} from "./types";
import { generateFitnessPlan } from "./services/aiService";

// Types are imported from ./types.ts

export default function App() {
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    gender: "Male",
    weight: 75,
    height: 180,
    goal: FitnessGoal.FAT_LOSS,
    activityLevel: ActivityLevel.MODERATELY_ACTIVE,
    dietaryPreference: "High Protein",
    workoutPreference: WorkoutPreference.GYM,
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [strategy, setStrategy] = useState<PromptStrategy>(PromptStrategy.ROLE_BASED);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateFitnessPlan(profile, strategy);
      setPlan(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-neon-red p-3 rounded-xl rotate-3">
            <Activity className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter">
            TITAN<span className="text-neon-red">AI</span>
          </h1>
        </div>
        <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 gap-2 text-sm text-gray-400">
          <Sparkles className="w-4 h-4 text-neon-green" />
          Powered by Gemini AI Engine
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form */}
        <section className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 neon-border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-neon-blue" />
              Biometric Profile
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Age</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mt-1 focus:ring-1 focus:ring-neon-red outline-none transition-all"
                    value={profile.age}
                    onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Gender</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mt-1 outline-none"
                    value={profile.gender}
                    onChange={e => setProfile({...profile, gender: e.target.value})}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Weight (kg)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mt-1 focus:ring-1 focus:ring-neon-red outline-none"
                    value={profile.weight}
                    onChange={e => setProfile({...profile, weight: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Height (cm)</label>
                  <input 
                    type="number" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mt-1 focus:ring-1 focus:ring-neon-red outline-none"
                    value={profile.height}
                    onChange={e => setProfile({...profile, height: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Primary Goal</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {Object.values(FitnessGoal).map(goal => (
                    <button
                      key={goal}
                      onClick={() => setProfile({...profile, goal})}
                      className={`p-2 text-xs rounded-lg border transition-all ${profile.goal === goal ? 'bg-neon-red border-neon-red text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Activity Level</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mt-1 outline-none"
                  value={profile.activityLevel}
                  onChange={e => setProfile({...profile, activityLevel: e.target.value as ActivityLevel})}
                >
                  {Object.values(ActivityLevel).map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Dietary Preferences</label>
                <input 
                  type="text" 
                  placeholder="e.g. Keto, Vegetarian, No dairy..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 mt-1 focus:ring-1 focus:ring-neon-red outline-none"
                  value={profile.dietaryPreference}
                  onChange={e => setProfile({...profile, dietaryPreference: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Prompt Strategy (Compare AI Logic)</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {Object.values(PromptStrategy).map(s => (
                    <button
                      key={s}
                      onClick={() => setStrategy(s)}
                      className={`p-2 text-xs rounded-lg border transition-all ${strategy === s ? 'bg-neon-blue border-neon-blue text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 mt-2 italic px-1">
                  *Different strategies demonstrate how "Prompt Engineering" affects AI output quality.
                </p>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary w-full mt-4 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Build My Titan Plan
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Right: Results Display */}
        <section className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!plan && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 bg-dashed border-2 border-dashed border-white/10 rounded-2xl min-h-[500px]"
              >
                <div className="bg-white/5 p-6 rounded-full mb-4">
                  <BrainCircuit className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-400">Ready to transform?</h3>
                <p className="text-gray-500 max-w-sm mt-2">
                  Fill out your bio and biometric data on the left to generate your custom AI fitness protocol.
                </p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-neon-red/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
                  <Loader2 className="w-16 h-16 text-neon-red animate-spin relative" />
                </div>
                <p className="mt-6 text-xl font-medium text-gray-300 animate-pulse uppercase tracking-[0.2em]">
                  Analyzing Biometrics...
                </p>
              </motion.div>
            )}

            {plan && !loading && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Result Cards */}
                <div className="glass-card p-6 border-l-4 border-l-neon-green">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Dumbbell className="w-5 h-5 text-neon-green" />
                    7-Day Training Protocol
                  </h3>
                  <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                    {plan.workoutPlan}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card p-6 border-l-4 border-l-neon-blue">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                      <Utensils className="w-5 h-5 text-neon-blue" />
                      Nutrition Guide
                    </h3>
                    <div className="text-gray-300 whitespace-pre-wrap text-sm">
                      {plan.mealSuggestions}
                    </div>
                  </div>

                  <div className="glass-card p-6 border-l-4 border-l-pink-500">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                      <BrainCircuit className="w-5 h-5 text-pink-500" />
                      Wellness & Recovery
                    </h3>
                    <div className="text-gray-300 whitespace-pre-wrap text-sm">
                      {plan.wellnessAdvice}
                    </div>
                  </div>
                </div>

                {/* Performance Disclaimer */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                  <p className="text-xs text-yellow-500/80 italic">
                    <span className="font-bold">MEDICAL DISCLAIMER:</span> {plan.disclaimer || "Consult with a physician before beginning any exercise program. This AI-generated plan is for educational purposes only."}
                  </p>
                </div>

                {/* Prompt Meta Info */}
                <div className="text-[10px] text-gray-600 flex justify-end gap-4 uppercase tracking-widest px-2">
                  <span>Strategy: {plan.promptStrategy}</span>
                  <span>Model: Gemini 2.0 Flash</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
      
      <footer className="mt-20 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
        &copy; 2026 TITAN AI Labs. Driven by Prompt Engineering.
      </footer>
    </div>
  );
}
