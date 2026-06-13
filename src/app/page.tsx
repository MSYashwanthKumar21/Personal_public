"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Globe, GitBranch, ChevronRight, ExternalLink, Calendar, MapPin, Sparkles, Code2, Cpu, Database, Cloud, Briefcase, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AIAssistant } from "@/components/AIAssistant";
import { JanathaDetails } from "@/components/JanathaDetails";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const projectsData = [
  {
    id: "janatha",
    title: "Janatha App",
    description: "Your Voice | Our responsibility | Better tomorrow",
    shortDesc: "AI-powered platform to bridge citizens and elected representatives.",
    tags: ["Kotlin", "Node.js", "SQLite", "Groq AI"],
    gradient: "from-primary/10",
    hoverTitle: "group-hover:text-primary",
    badgeBorder: "border-primary/20",
    badgeText: "text-primary/80",
    modalSubtitle: "text-primary",
    longDesc: "Janatha App is a civic engagement platform designed to bridge the gap between citizens and their elected representatives. It allows citizens to raise local issues or complaints, which are automatically categorized and prioritized using Artificial Intelligence, and then routed directly to the dashboards of the appropriate MLA (Member of Legislative Assembly) or the CM (Chief Minister) for resolution.",
    demoVideo: "/janatha_demo.mp4",
    snippets: [
      "Intelligent Issue Triage via Groq LLM",
      "Automated Geolocation-Based Routing Engine",
      "Real-Time Analytics & MLA Command Dashboard"
    ]
  },
  {
    id: "gesture-drive",
    title: "Gesture-Drive",
    description: "AI + IoT Vehicle Control System",
    shortDesc: "A hardware-software integrated system using Computer Vision and Raspberry Pi to control vehicles with high accuracy.",
    tags: ["OpenCV", "Raspberry Pi", "Computer Vision", "94% Accuracy"],
    gradient: "from-primary/10",
    hoverTitle: "group-hover:text-primary",
    badgeBorder: "border-primary/20",
    badgeText: "text-primary/80",
    modalSubtitle: "text-primary",
    longDesc: "A hardware-software integrated system using Computer Vision and Raspberry Pi to control vehicles with high accuracy. Implements deep learning models for real-time hand gesture recognition.",
    demoVideo: null,
    snippets: []
  },
  {
    id: "travelsecure",
    title: "TravelSecure",
    description: "Group Travel Safety Application",
    shortDesc: "A mobile application ensuring group travel safety with live tracking, panic alerts, and expense management.",
    tags: ["React Native", "Firebase", "Mapbox API", "GPS Tracking"],
    gradient: "from-blue-500/10",
    hoverTitle: "group-hover:text-blue-400",
    badgeBorder: "border-blue-500/20",
    badgeText: "text-blue-400/80",
    modalSubtitle: "text-blue-400",
    longDesc: "A mobile application ensuring group travel safety with live tracking, panic alerts, and expense management. Provides real-time synchronization across group members.",
    demoVideo: null,
    snippets: []
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const viewTimerRef = useRef<{ id: string, title: string, startTime: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project.id);
    const visitorName = localStorage.getItem("visitorName") || "Anonymous Visitor";
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "view_project", visitorName, projectName: project.title })
    }).catch(console.error);
    
    viewTimerRef.current = { id: project.id, title: project.title, startTime: Date.now() };
  };

  const handleCloseModal = () => {
    if (viewTimerRef.current) {
      const durationSec = Math.floor((Date.now() - viewTimerRef.current.startTime) / 1000);
      const visitorName = localStorage.getItem("visitorName") || "Anonymous Visitor";
      
      if (durationSec >= 2) {
        fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            action: "close_project", 
            visitorName, 
            projectName: viewTimerRef.current.title,
            duration: durationSec
          })
        }).catch(console.error);
      }
      viewTimerRef.current = null;
    }
    setSelectedProject(null);
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Custom Glowing Cursor */}
      <div 
        className="hidden md:block pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.15), transparent 40%)`
        }}
      />
      
      {/* Background Particles/Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24 space-y-32 relative z-10">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="pt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12"
        >
          {/* Left Content */}
          <div className="space-y-8 flex-1">
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span>Available for Hire</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-white/5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Bengaluru, India</span>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                M S Yashwanth <br className="hidden md:block" />
                <span className="gradient-text">Kumar</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                AI Engineer & Full Stack Developer building intelligent systems and dynamic web applications.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full shadow-xl shadow-primary/20" asChild>
                <a href="mailto:yashwanth@example.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full glassmorphism" asChild>
                <a href="/resume.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
              <div className="flex gap-2 md:ml-auto">
                <Button size="icon" variant="ghost" className="rounded-full" asChild>
                  <a href="https://linkedin.com/in/msyashwanthkumar" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="rounded-full" asChild>
                  <a href="https://github.com/msyashwanthkumar" target="_blank" rel="noopener noreferrer">
                    <GitBranch className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div variants={fadeInUp} className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.5)] overflow-hidden glassmorphism hover:scale-105 hover:shadow-[0_0_50px_rgba(99,102,241,0.7)] transition-all duration-500 cursor-pointer">
              <img 
                src="/profile.jpg" 
                alt="M S Yashwanth Kumar" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="hidden md:flex justify-center -mt-16 pb-12"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
            <span className="text-xs uppercase tracking-widest font-semibold text-primary">Scroll Down</span>
            <ChevronRight className="w-5 h-5 rotate-90 text-primary" />
          </div>
        </motion.div>

        {/* ABOUT SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Cpu className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            About Me
          </h2>
          <Card className="glassmorphism border-white/5 bg-secondary/30 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500">
            <CardContent className="p-6 md:p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Computer Science Engineering graduate with strong foundations in Data Structures, Algorithms, OOP, Operating Systems, and Computer Networks. Passionate about AI agents, LangChain, LangGraph, and building LLM-powered applications that solve real-world problems.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold flex items-center gap-2">
            <Code2 className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            Technical Arsenal
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Languages", icon: <Code2 className="w-8 h-8 mb-4 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />, skills: ["Python", "C++", "C", "SQL"] },
              { title: "AI & LLM", icon: <Cpu className="w-8 h-8 mb-4 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />, skills: ["LangChain", "LangGraph", "OpenCV", "Computer Vision", "RAG Systems", "AI Agents"] },
              { title: "Mobile & Web", icon: <Database className="w-8 h-8 mb-4 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />, skills: ["React Native", "Firebase", "MERN Stack", "JavaScript", "HTML", "CSS"] },
              { title: "Cloud & Tools", icon: <Cloud className="w-8 h-8 mb-4 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />, skills: ["Azure", "GCP", "Git", "REST APIs", "Power BI", "Raspberry Pi"] }
            ].map((category, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full glassmorphism border-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500">
                  <CardHeader>
                    {category.icon}
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {category.skills.map((skill, j) => (
                      <Badge key={j} variant="secondary" className="bg-secondary/50">
                        {skill}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EXPERIENCE SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            Experience
          </h2>
          <div className="relative pl-8 border-l border-white/10 space-y-12">
            <div className="relative group cursor-pointer">
              <div className="absolute -left-[41px] top-4 h-5 w-5 rounded-full bg-primary ring-4 ring-background group-hover:shadow-[0_0_20px_rgba(99,102,241,0.8)] group-hover:scale-125 transition-all duration-500 z-10" />
              <div className="space-y-3 p-6 -mt-6 -ml-4 rounded-2xl border border-transparent group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold">GenAI Android App Development Intern</h3>
                  <Badge variant="outline" className="w-fit flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Feb 2026 – May 2026
                  </Badge>
                </div>
                <h4 className="text-primary font-medium text-lg">MindMatrix</h4>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside marker:text-primary/50">
                  <li>Integrated LLM APIs for intelligent mobile features.</li>
                  <li>Built AI-enabled Android applications from scratch.</li>
                  <li>Designed responsive and intuitive mobile interfaces.</li>
                  <li>Worked in Agile teams to deliver features quickly.</li>
                  <li>Optimized deployment workflows for faster iterations.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold flex items-center gap-2">
            <ExternalLink className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <motion.div variants={fadeInUp} key={project.id}>
                <Card 
                  className="h-full glassmorphism group overflow-hidden relative cursor-pointer border-white/5 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all duration-500"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardHeader>
                    <CardTitle className={`text-2xl ${project.hoverTitle} transition-colors`}>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className={`${project.badgeBorder} ${project.badgeText}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* HOBBIES SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            Hobbies & Extracurriculars
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Reading Books", desc: "Passionate about History and biographies of famous personalities." },
              { title: "Volunteering", desc: "Completed 50 hours of volunteering at Youth For Seva." },
              { title: "Current Affairs", desc: "Staying updated on global tech and socio-economic trends." },
              { title: "Gaming", desc: "Playing strategic and team-based games." }
            ].map((hobby, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="glassmorphism bg-secondary/30 border-white/5 h-full hover:border-primary/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-lg">{hobby.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{hobby.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* EDUCATION SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <MapPin className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            Education
          </h2>
          <Card className="glassmorphism p-6 md:p-8 space-y-6 border-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-bold">B.E Computer Science Engineering</h3>
                <p className="text-primary mt-1">RN Shetty Institute of Technology</p>
              </div>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">CGPA: 7.7</Badge>
            </div>
            <Separator className="bg-white/10" />
            <div>
              <h3 className="text-lg font-semibold">PUC (PCMB)</h3>
              <p className="text-muted-foreground">ASC Independent PU College</p>
            </div>
            <Separator className="bg-white/10" />
            <div>
              <h3 className="text-lg font-semibold">CBSE Class X</h3>
              <p className="text-muted-foreground">Sri Chaitanya Techno School</p>
            </div>
          </Card>
        </motion.section>

      </div>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (() => {
          const project = projectsData.find(p => p.id === selectedProject);
          if (!project) return null;
          return (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-white/10 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto glassmorphism relative"
              >
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="pr-8">
                      {project.id === "janatha" && (
                        <div className="mb-6 flex items-center gap-4">
                          <img src="/janatha_logo.png" alt="Janatha App Logo" className="w-24 h-24 rounded-2xl object-contain bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20 p-2" />
                          <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">Official App</Badge>
                        </div>
                      )}
                      <h3 className="text-3xl font-bold">{project.title}</h3>
                      <p className={`${project.modalSubtitle} mt-2 font-medium`}>{project.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full hover:bg-white/10" onClick={handleCloseModal}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.longDesc}
                  </p>
                  
                  {project.demoVideo && (
                    <div className="space-y-3">
                      <h4 className="text-xl font-semibold flex items-center gap-2"><Play className="w-5 h-5 text-primary" /> Demo Video</h4>
                      <div className="bg-black/80 rounded-xl overflow-hidden border border-white/10 relative flex items-center justify-center shadow-2xl">
                        <video 
                          src={project.demoVideo} 
                          controls 
                          className="w-full max-h-[60vh] object-contain" 
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
                      </div>
                    </div>
                  )}

                  {project.snippets && project.snippets.length > 0 && (
                    <div className="space-y-4 pt-2">
                      <h4 className="text-xl font-semibold flex items-center gap-2 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]"><Code2 className="w-6 h-6" /> Key Architectural Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
                        {project.snippets.map((snippet, idx) => (
                          <li key={idx} className="flex items-center gap-3 bg-secondary/10 p-3 rounded-xl border border-white/5 hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 group cursor-default">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                              <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium group-hover:text-primary/90 transition-colors">{snippet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.id === "janatha" && <JanathaDetails />}
                  
                  {project.id !== "janatha" && (
                    <div className="pt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-secondary/40 hover:bg-secondary/60 transition-colors border border-white/5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* AI ASSISTANT WIDGET */}
      <AIAssistant />
    </main>
  );
}
