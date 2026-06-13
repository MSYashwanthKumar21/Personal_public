import React from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, Smartphone, Server, Database, Lock, Layers, Zap, Users, ArrowRight, ArrowDown, Rocket, Code2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export function JanathaDetails() {
  return (
    <div className="space-y-12 mt-8 mb-4">
      

      {/* Tech Stack Animated Grid */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold flex items-center gap-2"><Layers className="w-5 h-5 text-primary" /> Tech Stack Breakdown</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="p-4 bg-secondary/20 border-white/5 h-full hover:border-primary/50 transition-all duration-500 shadow-[0_0_20px_rgba(99,102,241,0.05)] hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h5 className="font-semibold text-primary flex items-center gap-2 mb-2 relative z-10"><Smartphone className="w-4 h-4" /> Frontend (Android)</h5>
              <p className="text-sm text-muted-foreground relative z-10">Kotlin, Jetpack Compose, Retrofit + OkHttp, osmdroid.</p>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="p-4 bg-secondary/20 border-white/5 h-full hover:border-blue-500/50 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <h5 className="font-semibold text-blue-400 flex items-center gap-2 mb-2 relative z-10"><Server className="w-4 h-4" /> Backend (Node.js)</h5>
              <p className="text-sm text-muted-foreground relative z-10">TypeScript, Express.js, SQLite, JWT Auth, Groq AI SDK.</p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Animated Workflow */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Core Workflow</h4>
        <Card className="p-8 bg-secondary/10 border-white/5 overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] hover:border-primary/30 transition-all duration-500 group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4 relative z-10">
            
            {/* Background line for desktop */}
            <div className="hidden md:block absolute top-10 left-20 right-20 h-0.5 bg-gradient-to-r from-primary/30 via-blue-500/30 to-green-500/30 z-0" />

            {/* Step 1 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center max-w-[200px] relative z-10 group/step">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(99,102,241,0.5)] z-20 group-hover/step:scale-110 transition-transform">1</div>
              <div className="w-20 h-20 rounded-2xl bg-background border-2 border-primary/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover/step:border-primary transition-colors">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h6 className="font-bold text-base text-primary mb-1">Citizen Request</h6>
              <p className="text-xs text-muted-foreground leading-relaxed">User raises a civic issue via the app. Precise GPS location and issue details are captured securely.</p>
            </motion.div>

            {/* Arrow Desktop */}
            <motion.div variants={itemVariants} className="hidden md:flex relative z-10 items-center justify-center bg-background px-2 rounded-full border border-white/10 shadow-inner">
              <ArrowRight className="w-6 h-6 text-muted-foreground animate-[pulse_2s_ease-in-out_infinite]" />
            </motion.div>
            {/* Arrow Mobile */}
            <motion.div variants={itemVariants} className="md:hidden relative z-10 flex items-center justify-center bg-background p-1 rounded-full border border-white/10 shadow-inner">
              <ArrowDown className="w-5 h-5 text-muted-foreground animate-[pulse_2s_ease-in-out_infinite]" />
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center max-w-[200px] relative z-10 group/step">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(59,130,246,0.5)] z-20 group-hover/step:scale-110 transition-transform">2</div>
              <div className="w-20 h-20 rounded-2xl bg-background border-2 border-blue-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover/step:border-blue-500 transition-colors">
                <Server className="w-10 h-10 text-blue-400" />
              </div>
              <h6 className="font-bold text-base text-blue-400 mb-1">AI Categorization</h6>
              <p className="text-xs text-muted-foreground leading-relaxed">Groq AI processes the text, auto-categorizes the department, and determines severity/priority instantly.</p>
            </motion.div>

            {/* Arrow Desktop */}
            <motion.div variants={itemVariants} className="hidden md:flex relative z-10 items-center justify-center bg-background px-2 rounded-full border border-white/10 shadow-inner">
              <ArrowRight className="w-6 h-6 text-muted-foreground animate-[pulse_2s_ease-in-out_infinite]" />
            </motion.div>
            {/* Arrow Mobile */}
            <motion.div variants={itemVariants} className="md:hidden relative z-10 flex items-center justify-center bg-background p-1 rounded-full border border-white/10 shadow-inner">
              <ArrowDown className="w-5 h-5 text-muted-foreground animate-[pulse_2s_ease-in-out_infinite]" />
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center max-w-[200px] relative z-10 group/step">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(34,197,94,0.5)] z-20 group-hover/step:scale-110 transition-transform">3</div>
              <div className="w-20 h-20 rounded-2xl bg-background border-2 border-green-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.2)] group-hover/step:border-green-500 transition-colors">
                <Database className="w-10 h-10 text-green-400" />
              </div>
              <h6 className="font-bold text-base text-green-400 mb-1">MLA Dashboard</h6>
              <p className="text-xs text-muted-foreground leading-relaxed">The optimized request is routed directly to the dashboard of the MLA representing that exact constituency.</p>
            </motion.div>

          </motion.div>
        </Card>
      </div>

      {/* Animated File Structure */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold flex items-center gap-2"><Folder className="w-5 h-5 text-primary" /> Project Architecture</h4>
        <Card className="p-6 bg-[#0d1117] border-white/10 font-mono text-sm overflow-x-auto shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] hover:border-green-500/30 transition-all duration-500 group relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3 min-w-max relative z-10">
            
            <motion.div variants={itemVariants} className="flex items-center gap-2 text-blue-300 font-bold">
              <Folder className="w-5 h-5" /> <span>JanathaAPP/</span>
            </motion.div>

            <div className="border-l border-white/10 ml-2.5 pl-4 space-y-3">
              {/* Frontend */}
              <motion.div variants={itemVariants} className="flex items-center gap-2 text-green-300">
                <Folder className="w-4 h-4" /> <span>app/ <span className="text-muted-foreground/60 text-xs font-sans">(Android Frontend)</span></span>
              </motion.div>
              <div className="border-l border-white/10 ml-2 pl-4 space-y-2">
                <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground">
                  <Folder className="w-4 h-4 text-orange-300/70" /> <span>src/main/java/.../ui/ <span className="text-muted-foreground/50 text-xs font-sans">- Jetpack Compose Dashboards</span></span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground">
                  <Folder className="w-4 h-4 text-orange-300/70" /> <span>src/main/java/.../api/ <span className="text-muted-foreground/50 text-xs font-sans">- Retrofit Client</span></span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-4 h-4 text-gray-400" /> <span>build.gradle.kts <span className="text-muted-foreground/50 text-xs font-sans">- Auto PC IP Injection</span></span>
                </motion.div>
              </div>

              {/* Backend */}
              <motion.div variants={itemVariants} className="flex items-center gap-2 text-yellow-300 pt-2">
                <Folder className="w-4 h-4" /> <span>server/ <span className="text-muted-foreground/60 text-xs font-sans">(Node.js Backend)</span></span>
              </motion.div>
              <div className="border-l border-white/10 ml-2 pl-4 space-y-2">
                <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground">
                  <Folder className="w-4 h-4 text-orange-300/70" /> <span>src/routes/ <span className="text-muted-foreground/50 text-xs font-sans">- auth.ts, issues.ts</span></span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground">
                  <Folder className="w-4 h-4 text-orange-300/70" /> <span>src/middleware/ <span className="text-muted-foreground/50 text-xs font-sans">- JWT Guards</span></span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-4 h-4 text-blue-300/80" /> <span>index.ts <span className="text-muted-foreground/50 text-xs font-sans">- Express Entry</span></span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground">
                  <Database className="w-4 h-4 text-green-300/80" /> <span>janata.db <span className="text-muted-foreground/50 text-xs font-sans">- SQLite DB</span></span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-4 h-4 text-red-300/80" /> <span>.env <span className="text-muted-foreground/50 text-xs font-sans">- Secrets (GROQ_API_KEY)</span></span>
                </motion.div>
              </div>
            </div>

          </motion.div>
        </Card>
      </div>

      {/* Code Snippets Section */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold flex items-center gap-2"><Code2 className="w-5 h-5 text-primary" /> Key Implementations</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Card className="overflow-hidden border-white/10 bg-[#0d1117] shadow-[0_0_30px_rgba(99,102,241,0.15)] group transition-all duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:border-primary/50 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
              <div className="p-3 bg-secondary/80 border-b border-white/5 flex items-center gap-2 relative z-20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">Backend Architecture</span>
              </div>
              <div className="relative overflow-hidden flex items-center justify-center p-4">
                <img src="/janatha-1.png" alt="Backend Code Snippet" className="w-full h-auto max-h-[300px] object-contain group-hover:scale-[1.02] transition-transform duration-500 rounded-md" />
              </div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="overflow-hidden border-white/10 bg-[#0d1117] shadow-[0_0_30px_rgba(59,130,246,0.15)] group transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
              <div className="p-3 bg-secondary/80 border-b border-white/5 flex items-center gap-2 relative z-20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">Frontend Integration</span>
              </div>
              <div className="relative overflow-hidden flex items-center justify-center p-4">
                <img src="/janatha-2.png" alt="Frontend Code Snippet" className="w-full h-auto max-h-[300px] object-contain group-hover:scale-[1.02] transition-transform duration-500 rounded-md" />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Current Status Banner */}
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6 shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.35)] transition-all duration-500 mt-8 group hover:border-primary/40">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <h4 className="text-xl font-bold flex items-center gap-2 text-primary mb-2">
            <Rocket className="w-5 h-5" /> Current Project Status
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Foundation Complete:</strong> The core mechanics and fundamental features of the platform have been successfully implemented. I am currently advancing towards higher-level functionalities, including an online tender bidding system, end-to-end encryption, secure authentication protocols, and advanced database management.
          </p>
        </div>
      </motion.div>

    </div>
  );
}
