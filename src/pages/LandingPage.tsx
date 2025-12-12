import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import {
  BrainCircuit,
  Layers,
  Zap,
  Trophy,
  ChevronRight,
  Code2,
  Lock,
  Unlock,
  GitBranch,
  Target,
  Lightbulb
} from 'lucide-react';
import {
  SignedOut,
  SignInButton,
} from '@clerk/clerk-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const LandingPage: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  return (
    <div className="min-h-screen bg-background text-slate-200 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-primary/20 blur-[120px] rounded-full -z-10 opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-700/50 text-slate-300 text-sm font-medium backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          The new standard for technical interview prep
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Don't Just Solve. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
            Recognize the Pattern.
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Stop grinding 500 random LeetCode problems. Master the 15 underlying patterns that solve 95% of interview questions.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isLoaded && (
            <>
              {isSignedIn ? (
                <Link
                  to="/dashboard"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-primary font-lg rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-slate-900"
                >
                  Start Practicing Now
                  <ChevronRight className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-primary font-lg rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-slate-900">
                    Start Practicing Now
                    <ChevronRight className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
                  </button>
                </SignInButton>
              )}
            </>
          )}
          <a href="#how-it-works" className="text-slate-400 hover:text-white px-6 py-4 font-medium transition-colors">
            How it works
          </a>
        </motion.div>

        {/* Hero Visual - Code/Pattern Abstraction */}
        <motion.div 
          className="mt-20 w-full max-w-5xl bg-slate-900/50 border border-slate-800 rounded-2xl p-2 sm:p-4 backdrop-blur-xl shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
            <div className="rounded-xl overflow-hidden bg-[#0b0c13] border border-slate-800 relative">
                <div className="absolute top-0 left-0 right-0 h-10 bg-[#161924] flex items-center px-4 border-b border-slate-800 gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    </div>
                </div>
                <div className="p-8 pt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <div className="flex items-start gap-4">
                             <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 mt-1">
                                 <Target size={20} />
                             </div>
                             <div>
                                 <h3 className="text-white font-bold mb-1">Two Pointers Pattern</h3>
                                 <p className="text-slate-500 text-sm">Recognize sorted arrays. Shrink search space from ends.</p>
                             </div>
                        </div>
                         <div className="flex items-start gap-4 opacity-50">
                             <div className="p-2 bg-slate-800 rounded-lg text-slate-600 mt-1">
                                 <GitBranch size={20} />
                             </div>
                             <div>
                                 <h3 className="text-slate-400 font-bold mb-1">Sliding Window</h3>
                                 <p className="text-slate-600 text-sm">Optimization over a contiguous subarray.</p>
                             </div>
                        </div>
                     </div>
                     <div className="font-mono text-sm text-slate-400 space-y-2">
                         <div className="flex items-center gap-2 text-emerald-400">
                             <span className="text-slate-600">1</span>
                             <span>function twoSum(arr, target) &#123;</span>
                         </div>
                         <div className="flex items-center gap-2 pl-4">
                             <span className="text-slate-600">2</span>
                             <span className="text-purple-400">let</span> left = 0, right = arr.length - 1;
                         </div>
                         <div className="flex items-center gap-2 pl-4">
                             <span className="text-slate-600">3</span>
                             <span className="text-purple-400">while</span> (left &lt; right) &#123;
                         </div>
                          <div className="flex items-center gap-2 pl-8">
                             <span className="text-slate-600">4</span>
                             <span>// Pattern Logic Applied Here</span>
                         </div>
                         <div className="flex items-center gap-2 pl-4">
                             <span className="text-slate-600">5</span>
                             <span>&#125;</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <span className="text-slate-600">6</span>
                             <span>&#125;</span>
                         </div>
                     </div>
                </div>
            </div>
        </motion.div>
      </section>

      {/* Value Props / Philosophy */}
      <section id="how-it-works" className="py-24 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="text-center max-w-3xl mx-auto mb-20"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Engineered for Retention</h2>
                <p className="text-slate-400 text-lg">
                    Most platforms test what you already know. We build the intuition so you can solve problems you've never seen before.
                </p>
            </motion.div>

            <motion.div 
                className="grid md:grid-cols-3 gap-8"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                {/* Card 1 */}
                <motion.div variants={fadeInUp} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-primary/50 transition-colors group">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                        <BrainCircuit size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Pattern-First Curriculum</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Don't memorize solutions. Learn the 15 core patterns (Two Pointers, Sliding Window, DFS/BFS) that govern 95% of algorithmic problems.
                    </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div variants={fadeInUp} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-purple-500/50 transition-colors group">
                     <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                        <Layers size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Progressive Scaffolding</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Stuck? Get a nudge, not a spoiler. Our 4-tier hint system guides you from Mental Model to Pseudocode to Edge Cases.
                    </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div variants={fadeInUp} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group">
                     <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                        <Zap size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Habit Mechanics</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Low-friction start. Addictive streaks. Measurable mastery. Built to transform sporadic study into a daily ritual.
                    </p>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* The 80/20 Rule Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <Lightbulb size={12} />
                        <span>The 80/20 Rule</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                        The Pareto Principle <br />
                        <span className="text-slate-500">of Coding Interviews</span>
                    </h2>
                    <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                        There are over 3,000 problems on LeetCode. Trying to solve them all is a trap that leads to burnout.
                    </p>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                        The truth is, <strong>20% of the patterns solve 80% of the questions</strong>. We stripped away the noise to focus exclusively on these high-ROI mental models.
                    </p>
                    
                    <div className="flex gap-8 border-t border-slate-800 pt-8">
                        <div>
                            <p className="text-4xl font-bold text-white mb-1">3000+</p>
                            <p className="text-sm text-slate-500">Total Problems</p>
                        </div>
                        <div className="h-12 w-px bg-slate-800"></div>
                        <div>
                            <p className="text-4xl font-bold text-primary mb-1">15</p>
                            <p className="text-sm text-slate-500">Core Patterns</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Visual */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Visual representation */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative z-10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Random Grinding</span>
                                    <span className="text-slate-600">Low ROI</span>
                                </div>
                                <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-700 w-full opacity-30"></div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white font-medium">Pattern Mastery</span>
                                    <span className="text-emerald-400 font-bold">High ROI</span>
                                </div>
                                <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "80%" }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                                    />
                                </div>
                                <p className="text-xs text-emerald-400 pt-1">Efficiency x10</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Decorative elements behind */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-primary/20 rounded-3xl blur-2xl -z-10 opacity-50" />
                </motion.div>
            </div>
        </div>
      </section>

      {/* Feature Deep Dive: Progressive Hints */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
               <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7 }}
               >
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                        <Lock size={12} />
                        <span>Scaffolded Learning</span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Hints that teach,<br/>not just tell.</h2>
                   <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                       Traditional platforms give you the answer or nothing. We simulate a senior engineer guiding you through the problem breakdown.
                   </p>
                   
                   <ul className="space-y-4">
                       {[
                           { title: "Level 1: Mental Model", desc: "The strategy without code." },
                           { title: "Level 2: Pseudocode", desc: "The logical structure." },
                           { title: "Level 3: Traps & Edge Cases", desc: "Common mistakes to avoid." },
                       ].map((item, i) => (
                           <li key={i} className="flex items-start gap-4">
                               <div className="mt-1 p-1 bg-slate-800 rounded-full text-primary">
                                   <ChevronRight size={16} />
                               </div>
                               <div>
                                   <strong className="text-white block">{item.title}</strong>
                                   <span className="text-slate-500 text-sm">{item.desc}</span>
                               </div>
                           </li>
                       ))}
                   </ul>
               </motion.div>

               <motion.div
                 className="relative"
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7 }}
               >
                   {/* Mock UI Card for Hints */}
                   <div className="bg-[#161924] border border-slate-700 rounded-2xl p-6 shadow-2xl relative z-10">
                       <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                           <span className="text-slate-300 font-semibold">Hint System</span>
                           <span className="text-xs text-slate-500 font-mono">Problem: 3Sum</span>
                       </div>
                       
                       <div className="space-y-3">
                           <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                               <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase mb-2">
                                   <Unlock size={12} />
                                   <span>Hint 1: Mental Model</span>
                               </div>
                               <p className="text-slate-300 text-sm">Sort the array first. Fix one element, then use Two Pointers to find the other two.</p>
                           </div>
                           
                           <div className="border border-dashed border-slate-700 rounded-lg p-4 opacity-75">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-2">
                                   <Lock size={12} />
                                   <span>Hint 2: Pseudocode</span>
                               </div>
                               <div className="h-2 w-3/4 bg-slate-800 rounded mb-2"></div>
                               <div className="h-2 w-1/2 bg-slate-800 rounded"></div>
                           </div>

                            <div className="border border-dashed border-slate-700 rounded-lg p-4 opacity-50">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-2">
                                   <Lock size={12} />
                                   <span>Hint 3: Traps</span>
                               </div>
                           </div>
                       </div>
                   </div>
                   
                   {/* Decor blobs */}
                   <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full -z-0"></div>
                   <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full -z-0"></div>
               </motion.div>
           </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <motion.div 
            className="max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
                Ready to break the cycle of forgetting?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Join the platform designed for long-term retention and mastery. Build the habit today.
            </p>
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <Link
                    to="/dashboard"
                    className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 md:text-xl text-base ring-1 ring-white/20"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Code2 className="mr-3 size-5 md:size-6 group-hover:rotate-3 transition-transform" />
                    Start Mastering Patterns
                    <ChevronRight className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <SignInButton mode="modal">
                    <button className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 md:text-xl text-base ring-1 ring-white/20">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Code2 className="mr-3 size-5 md:size-6 group-hover:rotate-3 transition-transform" />
                      Start Mastering Patterns
                      <ChevronRight className="ml-2 size-4 md:size-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </SignInButton>
                )}
              </>
            )}
        </motion.div>
      </section>

    </div>
  );
};

export default LandingPage;