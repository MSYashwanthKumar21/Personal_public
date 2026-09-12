"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Mail, Globe, GitBranch, ChevronRight, ExternalLink, Calendar, MapPin, Sparkles, Code2, Cpu, Database, Cloud, Briefcase, X, Play, BookOpen, Terminal, Network, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AIAssistant } from "@/components/AIAssistant";
import { JanathaDetails } from "@/components/JanathaDetails";
import { GestureDriveDetails } from "@/components/GestureDriveDetails";
import { TravelSecureDetails } from "@/components/TravelSecureDetails";

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

const selfLearningData = [
  {
    title: "AI & Generative AI",
    badge: "Advanced Exploration",
    icon: <Cpu className="w-6 h-6 text-primary" />,
    description: "Deep diving into LLM architectures, Autonomous AI Agents, LangChain, LangGraph, RAG pipelines, and vector database integrations.",
    topics: ["LangChain & LangGraph", "AI Agents & RAG", "Prompt Engineering", "OpenCV & Vision"]
  },
  {
    title: "Computer Networking (CCNA)",
    badge: "CCNA Prep",
    icon: <Network className="w-6 h-6 text-primary" />,
    description: "Studying core Cisco networking principles including IPv4/IPv6 subnetting, TCP/IP protocols, VLANs, routing protocols, and network security essentials.",
    topics: ["TCP/IP & OSI Model", "Subnetting & Routing", "Switching & VLANs", "Network Security"]
  },
  {
    title: "Cloud Platforms (Azure & GCP)",
    badge: "Cloud Skills",
    icon: <Cloud className="w-6 h-6 text-primary" />,
    description: "Building practical cloud skills on Microsoft Azure and Google Cloud Platform — compute, storage, serverless, IAM, and deploying AI workloads at scale.",
    topics: ["Azure Compute & Storage", "GCP AI & ML", "Serverless Functions", "Cloud IAM & Security"]
  },
  {
    title: "Linux & System Administration (RHCSA)",
    badge: "RHCSA Focused",
    icon: <Terminal className="w-6 h-6 text-primary" />,
    description: "Mastering Red Hat Enterprise Linux (RHEL) system administration, shell scripting, user management, systemd services, and storage configuration.",
    topics: ["Linux CLI & Bash", "User & Permission Mgmt", "Systemd Services", "LVM & Storage"]
  },
  {
    title: "Semiconductor Validation & Power Management",
    badge: "Professional Domain",
    icon: <Zap className="w-6 h-6 text-primary" />,
    description: "Hands-on professional experience in post-silicon semiconductor validation at UST Global, working with power management ICs for a leading semiconductor client.",
    topics: ["Post Silicon Validation", "Power Management ICs", "Test Plan Execution", "Hardware Debugging"]
  },
  {
    title: "Industrial Automation, SCADA & BESS",
    badge: "Domain Expansion",
    icon: <Zap className="w-6 h-6 text-primary" />,
    description: "Expanding technical breadth into SCADA telemetry, industrial IoT protocols, PLC concepts, and Battery Energy Storage Systems (BESS).",
    topics: ["SCADA & Telemetry", "Industrial IoT", "BESS Architecture", "Control Systems"]
  }
];

const hobbiesData = [
  { id: "reading", title: "Reading Books", desc: "Passionate about History and biographies of famous personalities." },
  { id: "volunteering", title: "Volunteering", desc: "Completed 50 hours of volunteering at Youth For Seva. Click to view certificate.", image: "/volunteering.jpeg", longDesc: "I have dedicated 50 hours of volunteering work at Youth For Seva, contributing to various social causes and community development programs. This experience has helped me develop strong communication skills, empathy, and a deeper understanding of grassroots challenges." },
  { id: "current-affairs", title: "Current Affairs", desc: "Staying updated on global tech and socio-economic trends." },
  { id: "gaming", title: "Gaming", desc: "Playing strategic and team-based games." }
];

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
    longDesc: "The Hand Gesture Controlled Robotic Vehicle is an intelligent wireless robotic system that enables users to control a robot using hand gestures detected through a webcam. The system combines Computer Vision, Wireless Communication, Embedded Systems, and Robotics to create a touchless human-machine interaction platform.",
    demoVideo: null,
    snippets: [
      "MediaPipe Hand Landmark Detection",
      "Wireless UDP Command Protocol",
      "Raspberry Pi 5 Motor Control"
    ]
  },
  {
    id: "travelsecure",
    title: "TravelSecure",
    description: "Smart Travel Companion & Safety Platform",
    shortDesc: "A mobile application ensuring traveler safety with real-time location mapping, SOS panic alerts, and AI-powered trip planning.",
    tags: ["React Native", "Firebase", "OpenStreetMap", "Flask Server", "LLM APIs"],
    gradient: "from-blue-500/10",
    hoverTitle: "group-hover:text-blue-400",
    badgeBorder: "border-blue-500/20",
    badgeText: "text-blue-400/80",
    modalSubtitle: "text-blue-400",
    longDesc: "TravelSecure is a premium mobile application designed to protect and assist travelers. It combines real-time location mapping, decentralized walkie-talkie communication, custom budgeting modules, AI-driven trip itinerary planners, and an active emergency beacon system to keep travelers safe and connected.",
    demoVideo: null,
    snippets: [
      "Interactive OpenStreetMap Overpass Red Pins",
      "Custom AI Trip Planners & Budget Estimators",
      "High-Contrast Emergency SOS Alarm Console",
      "Real-Time Community Chats & Speedometer Sync"
    ]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedHobby, setSelectedHobby] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const viewTimerRef = useRef<{ id: string, title: string, startTime: number } | null>(null);

  const hasNotified = useRef(false);
  useEffect(() => {
    if (!hasNotified.current) {
      hasNotified.current = true;
      let visitorName = "Anonymous Visitor";
      try {
        visitorName = localStorage.getItem("visitorName") || "Anonymous Visitor";
      } catch (e) {}
      fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "website_opened", visitorName }),
        cache: "no-store"
      }).catch(console.error);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project.id);
    let visitorName = "Anonymous Visitor";
    try {
      visitorName = localStorage.getItem("visitorName") || "Anonymous Visitor";
    } catch (e) {}
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "view_project", visitorName, projectName: project.title }),
      cache: "no-store"
    }).catch(console.error);
    
    viewTimerRef.current = { id: project.id, title: project.title, startTime: Date.now() };
  };

  const handleCloseModal = () => {
    if (viewTimerRef.current) {
      viewTimerRef.current = null;
    }
    setSelectedProject(null);
    setSelectedHobby(null);
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
                <span>Currently @ UST Global</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-white/5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Bengaluru, India</span>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
                M S Yashwanth <br className="hidden md:block" />
                <span className="gradient-text">Kumar</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-primary/90 tracking-wide">
                AI &amp; Software Engineer | Semiconductor Validation | Networking &amp; Cloud
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Computer Science Engineering graduate with hands-on experience in Post Silicon Semiconductor Validation at UST Global, supporting a Power Management domain client. Skilled in building intelligent software solutions using Generative AI, LangChain, LangGraph, and Python. Experienced across AI-enabled applications, computer vision, Android development, IoT, and full-stack systems. Actively leveling up in computer networking (CCNA), cloud platforms (Azure &amp; GCP), Linux, and SCADA.
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
                <a href="/resume.pdf" download="M_S_Yashwanth_Kumar_Resume.pdf">
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
            <div className="absolute inset-0 rounded-full border-2 border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.5)] overflow-hidden glassmorphism hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(99,102,241,0.7)] transition-all duration-500 cursor-pointer">
              <img 
                src="/profile.jpg" 
                alt="M S Yashwanth Kumar" 
                className="w-full h-full object-cover object-top scale-[0.95] translate-y-[1%] hover:scale-100 transition-transform duration-700 rounded-full"
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
            <CardContent className="p-6 md:p-8 space-y-5">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m <span className="text-foreground font-semibold">M. S. Yashwanth Kumar</span>, a Computer Science Engineer passionate about building <span className="text-primary font-medium">intelligent, reliable, and real-world technology solutions</span> across <span className="text-primary font-medium">AI, software, networking, and semiconductor systems</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I have a strong foundation in <span className="text-foreground font-medium">C, C++, Python, SQL, and computer science fundamentals</span>, with hands-on experience in Generative AI, LangChain, LangGraph, computer vision, full-stack development, Android, IoT, Linux, and networking. I enjoy turning ideas into practical systems that combine software, intelligence, and hardware.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I also have a growing professional interest in <span className="text-primary font-medium">semiconductor engineering and post-silicon validation</span>. I&apos;m particularly interested in <span className="text-foreground font-medium">platform validation, hardware-software interaction, BIOS/UEFI, power management, drivers, USB, PCIe, storage, system stability, and performance validation</span>. Working around semiconductor platforms has strengthened my understanding of how hardware and software work together at the system level.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Alongside semiconductor technologies, I&apos;m expanding my knowledge in <span className="text-primary font-medium">AI/Generative AI, cloud computing, computer networks, Linux, SCADA, and Battery Energy Storage Systems (BESS)</span>. I&apos;m especially interested in areas where <span className="text-foreground font-medium">AI, automation, embedded/connected systems, and semiconductor technology</span> intersect.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe the best way to learn technology is to <span className="text-primary font-medium">build, experiment, troubleshoot, and continuously improve</span>. My goal is to grow into an engineer capable of working across software and hardware domains while building intelligent, scalable, and impactful systems.
              </p>
              <p className="text-foreground font-bold text-lg tracking-wide pt-2">
                Build. Validate. Automate. Innovate.
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
              { title: "AI & LLM", icon: <Cpu className="w-8 h-8 mb-4 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />, skills: ["LangChain", "LangGraph", "OpenCV", "Computer Vision", "RAG Systems", "AI Agents", "Generative AI"] },
              { title: "Networking & Cloud", icon: <Cloud className="w-8 h-8 mb-4 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />, skills: ["Networking (CCNA)", "Azure", "GCP", "Linux (RHCSA)", "REST APIs", "Git", "Firebase"] },
              { title: "Semiconductor & Systems", icon: <Database className="w-8 h-8 mb-4 text-primary drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]" />, skills: ["Post Silicon Validation", "Power Management ICs", "Hardware Debugging", "SCADA", "Industrial Automation", "BESS", "Raspberry Pi", "React Native", "MERN Stack"] }
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

        {/* SELF-LEARNING & SKILL EXPANSION SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            Continuous &amp; Self-Learning
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selfLearningData.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="h-full glassmorphism border-white/5 bg-secondary/30 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500">
                  <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 w-fit">
                        {item.icon}
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 text-xs font-semibold">
                        {item.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl pt-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.topics.map((topic, j) => (
                        <Badge key={j} variant="secondary" className="bg-secondary/60 text-xs font-normal border border-white/5">
                          {topic}
                        </Badge>
                      ))}
                    </div>
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
            {/* UST Global - Current Role */}
            <div className="relative group cursor-pointer">
              <div className="absolute -left-[41px] top-4 h-5 w-5 rounded-full bg-green-500 ring-4 ring-background group-hover:shadow-[0_0_20px_rgba(34,197,94,0.8)] group-hover:scale-125 transition-all duration-500 z-10" />
              <div className="space-y-3 p-6 -mt-6 -ml-4 rounded-2xl border border-transparent group-hover:border-green-500/30 group-hover:bg-green-500/5 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold">Post Silicon Semiconductor Validation Engineer</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                      </span>
                      Current Role
                    </div>
                    <Badge variant="outline" className="w-fit flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Aug 2026 – Present
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-white/20 shadow-sm overflow-hidden">
                    <img src="/ust-logo.webp" alt="UST Global" className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <h4 className="text-green-400 font-medium text-lg leading-tight">UST Global</h4>
                    <p className="text-muted-foreground text-sm">Power Management Domain Client</p>
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside marker:text-green-500/50">
                  <li>Working as a Post Silicon Semiconductor Validation Engineer, supporting a leading Power Management domain client.</li>
                  <li>Performing post-silicon validation and functional testing of power management ICs and semiconductor devices.</li>
                  <li>Collaborating with hardware and firmware teams to identify, debug, and document silicon-level issues.</li>
                  <li>Executing test plans and validation scripts to verify device specifications and power delivery behavior.</li>
                  <li>Analyzing test results and generating reports to ensure product quality and compliance.</li>
                </ul>
              </div>
            </div>

            {/* MindMatrix - Internship */}
            <div className="relative group cursor-pointer">
              <div className="absolute -left-[41px] top-4 h-5 w-5 rounded-full bg-primary ring-4 ring-background group-hover:shadow-[0_0_20px_rgba(99,102,241,0.8)] group-hover:scale-125 transition-all duration-500 z-10" />
              <div className="space-y-3 p-6 -mt-6 -ml-4 rounded-2xl border border-transparent group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold">GenAI Android App Development Intern</h3>
                  <Badge variant="outline" className="w-fit flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Feb 2026 – May 2026
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10 shadow-sm overflow-hidden">
                    <span className="text-primary font-bold text-sm">MM</span>
                  </div>
                  <div>
                    <h4 className="text-primary font-medium text-lg leading-tight">MindMatrix</h4>
                    <p className="text-muted-foreground text-sm">Bengaluru, Karnataka</p>
                  </div>
                </div>
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
                    <CardTitle className={`text-2xl ${project.hoverTitle} transition-colors relative z-10`}>{project.title}</CardTitle>
                    <CardDescription className="relative z-10">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <p className="text-muted-foreground">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className={`${project.badgeBorder} ${project.badgeText} bg-background/50`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className={`pt-2 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${project.modalSubtitle}`}>
                      <ExternalLink className="w-4 h-4" /> View Details
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
            {hobbiesData.map((hobby, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card 
                  className={`glassmorphism bg-secondary/30 border-white/5 h-full hover:border-primary/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500 ${hobby.image ? 'cursor-pointer group' : ''}`}
                  onClick={() => hobby.image && setSelectedHobby(hobby.id)}
                >
                  <CardHeader>
                    <CardTitle className={`text-lg ${hobby.image ? 'group-hover:text-primary transition-colors' : ''}`}>{hobby.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{hobby.desc}</p>
                    {hobby.image && (
                      <div className="mt-4 text-sm text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4" /> View Image
                      </div>
                    )}
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
                  {project.id === "gesture-drive" && <GestureDriveDetails />}
                  {project.id === "travelsecure" && <TravelSecureDetails />}
                  
                  {project.id !== "janatha" && project.id !== "gesture-drive" && project.id !== "travelsecure" && (
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

      {/* HOBBY MODAL */}
      <AnimatePresence>
        {selectedHobby && (() => {
          const hobby = hobbiesData.find(h => h.id === selectedHobby);
          if (!hobby) return null;
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
                      <h3 className="text-3xl font-bold">{hobby.title}</h3>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full hover:bg-white/10" onClick={handleCloseModal}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  {hobby.longDesc && (
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {hobby.longDesc}
                    </p>
                  )}
                  
                  {hobby.image && (
                    <div className="space-y-3">
                      <div className="bg-black/80 rounded-xl overflow-hidden border border-white/10 relative flex items-center justify-center shadow-2xl">
                        <img 
                          src={hobby.image} 
                          alt={hobby.title}
                          className="w-full max-h-[60vh] object-contain" 
                        />
                        <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
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
