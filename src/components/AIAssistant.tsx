"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Bot, X, Send, User, Sparkles, Briefcase, Code, Terminal, Command, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const suggestedQuestions = [
  "Can I download your resume?",
  "What is his experience with LangChain?",
  "Summarize his resume in 30 seconds."
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { visitorName: isNameSet ? visitorName : "Anonymous" },
  });

  const handleDownload = () => {
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "download_resume", visitorName: isNameSet ? visitorName : "Anonymous" }),
    }).catch(console.error);
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      aiTimerRef.current = Date.now();
    } else {
      if (aiTimerRef.current) {
        const durationSec = Math.floor((Date.now() - aiTimerRef.current) / 1000);
        if (durationSec >= 2) {
          fetch("/api/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              action: "ai_chat_duration", 
              visitorName: isNameSet ? visitorName : "Anonymous", 
              duration: durationSec 
            }),
          }).catch(console.error);
        }
        aiTimerRef.current = null;
      }
    }
  }, [isOpen, isNameSet, visitorName]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isMounted) return null;

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-8 right-8 z-[110] group"
      >
        {/* Soft gold glowing aura */}
        <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-1000" />
        
        {/* Rotating gold edge ring */}
        <div className="absolute -inset-0.5 bg-gradient-to-tr from-amber-200 via-amber-600 to-yellow-900 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-700 animate-[spin_4s_linear_infinite]" />
        
        {/* Inner black mask to create a border from the spinning ring */}
        <div className="absolute inset-[1.5px] bg-zinc-950 rounded-full z-0 pointer-events-none" />

        {/* Minimalist, elegant tooltip (VIP Gold theme) */}
        {!isOpen && (
          <div className="absolute -top-14 right-2 bg-zinc-950/90 backdrop-blur-xl border border-amber-500/30 text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-[0_10px_40px_rgba(245,158,11,0.15)] text-amber-400 font-medium whitespace-nowrap pointer-events-none transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:-translate-y-1">
            Ask AI
          </div>
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="relative h-16 w-16 rounded-full bg-transparent shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-700 hover:scale-105 overflow-hidden border-0 hover:bg-zinc-950/50"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-amber-400 relative z-10 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" strokeWidth={1.5} />
          ) : (
            <Command className="h-6 w-6 text-amber-400 relative z-10 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" strokeWidth={1.5} />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] z-[100]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-white/10 bg-background/70 backdrop-blur-2xl overflow-hidden relative transition-all duration-500 hover:shadow-[0_0_50px_rgba(245,158,11,0.15)] hover:border-amber-500/20">
              {/* Decorative background gradients for the chat window */}
              <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-amber-500/20 rounded-full blur-[50px] pointer-events-none z-0" />
              <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 bg-amber-500/20 rounded-full blur-[50px] pointer-events-none z-0" />
              
              <CardHeader className="bg-background/40 backdrop-blur-md border-b border-white/10 pb-4 z-10 relative">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="p-1.5 bg-transparent rounded-lg opacity-80">
                    <Command className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent font-bold tracking-wide">Yashwanth's AI</span>
                </CardTitle>
                <div className="mt-1.5 space-y-1">
                  <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-[0.15em] pl-10">
                    Built completely by Yashwanth
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ask anything about my experience, skills, or projects.
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden z-10 relative">
                {!isNameSet ? (
                  <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-6">
                    <div className="bg-amber-500/10 p-4 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      <Briefcase className="h-10 w-10 text-amber-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">Welcome!</h3>
                      <p className="text-sm text-muted-foreground">Before we start, could you please tell me your name and company?</p>
                    </div>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (visitorName.trim()) setIsNameSet(true);
                      }}
                      className="w-full flex flex-col gap-3"
                    >
                      <Input
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="e.g. John Doe from Google"
                        className="text-center rounded-xl bg-secondary/50 border-white/10"
                        autoFocus
                      />
                      <Button type="submit" disabled={!visitorName.trim()} className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-zinc-950 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.3)] border-0 transition-all">
                        Start Chatting <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar relative">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70 mt-10">
                      <Command className="h-10 w-10 text-amber-500 animate-pulse drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                      <p className="text-sm">Hi! I'm Yashwanth's AI Agent. How can I help you evaluate his profile today?</p>
                      
                      <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {suggestedQuestions.map((q, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="cursor-pointer bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-400 hover:text-zinc-950 hover:shadow-[0_0_15px_rgba(251,191,36,0.6)] hover:-translate-y-0.5 transition-all duration-300 font-medium"
                            onClick={() => handleInputChange({ target: { value: q } } as any)}
                          >
                            {q}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 pb-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex gap-2 max-w-[80%] ${
                              message.role === "user" ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <div className="flex-shrink-0 mt-1">
                              {message.role === "user" ? (
                                <div className="h-8 w-8 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-600 shadow-sm">
                                  <User className="h-4 w-4 text-zinc-300" strokeWidth={2.5} />
                                </div>
                              ) : (
                                <div className="h-8 w-8 bg-amber-500/5 rounded-full flex items-center justify-center border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.05)] opacity-90">
                                  <Command className="h-4 w-4 text-amber-500" strokeWidth={1.5} />
                                </div>
                              )}
                            </div>
                            <div
                              className={`p-3.5 rounded-2xl text-sm shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] ${
                                message.role === "user"
                                  ? "bg-zinc-800 text-zinc-200 font-medium rounded-tr-sm border border-zinc-700"
                                  : "glassmorphism text-foreground rounded-tl-sm border border-white/10"
                              }`}
                            >
                              {message.content.includes("[DOWNLOAD_RESUME]") ? (
                                <div className="flex flex-col">
                                  <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                      ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                                      ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
                                      p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                      strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                      a: ({node, ...props}) => <a className="underline decoration-primary/50 hover:decoration-primary transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                                    }}
                                  >
                                    {message.content.replace("[DOWNLOAD_RESUME]", "")}
                                  </ReactMarkdown>
                                  <a 
                                    href="/resume.pdf" 
                                    download="Yashwanth_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={handleDownload}
                                    className="flex w-fit items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-zinc-950 font-bold rounded-xl hover:from-amber-400 hover:to-yellow-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer hover:scale-105"
                                  >
                                    <Download className="h-4 w-4" /> Download Resume
                                  </a>
                                </div>
                              ) : (
                                <ReactMarkdown 
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1 my-2" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal ml-4 space-y-1 my-2" {...props} />,
                                    p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                                    strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                    a: ({node, ...props}) => <a className="underline decoration-primary/50 hover:decoration-primary transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                                  }}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex gap-2 max-w-[80%]">
                            <div className="flex-shrink-0 mt-1">
                                <div className="h-8 w-8 bg-amber-500/5 rounded-full flex items-center justify-center border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.05)] opacity-90">
                                  <Command className="h-4 w-4 text-amber-500" strokeWidth={1.5} />
                                </div>
                            </div>
                            <div className="p-3.5 rounded-2xl text-sm glassmorphism text-foreground rounded-tl-sm border border-white/10 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-amber-500/80 rounded-full animate-bounce shadow-[0_0_5px_rgba(245,158,11,0.8)]" style={{ animationDelay: '0ms' }} />
                              <span className="w-1.5 h-1.5 bg-amber-500/80 rounded-full animate-bounce shadow-[0_0_5px_rgba(245,158,11,0.8)]" style={{ animationDelay: '150ms' }} />
                              <span className="w-1.5 h-1.5 bg-amber-500/80 rounded-full animate-bounce shadow-[0_0_5px_rgba(245,158,11,0.8)]" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} className="h-1" />
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-background border-t border-white/5">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(e, {
                        data: {
                          visitorName: isNameSet ? visitorName : "Anonymous"
                        }
                      });
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask about Yashwanth..."
                      className="flex-1 rounded-full border-white/20 bg-background/50 backdrop-blur-sm focus-visible:ring-primary shadow-inner"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="rounded-full shrink-0 bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all border-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
                </>
              )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
