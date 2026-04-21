/// <reference types="vite/client" />
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Github, Linkedin, Instagram, FileText, Printer } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Custom Home Icon to match the image
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

// Apple-like smooth easing curve
const APPLE_EASE: any = [0.16, 1, 0.3, 1];

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 400, mass: 0.15 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Identify hover on specific elements or elements with pointer cursor natively
      const isClickable = target.closest('a, button, [class*="cursor-pointer"]');
      setIsHovering(!!isClickable);
      
      // We also check for elements inside our project links just to be sure
      if (window.getComputedStyle(target).cursor === 'pointer' && !isClickable) {
         setIsHovering(true);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Inner precise dot */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
      
      {/* Outer springy ring */}
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "transparent"
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
};

const backgroundShapes = [
  {
    className: "absolute top-1/2 left-1/2 w-[40vw] h-[40vw] -ml-[20vw] -mt-[20vw] border-[3px] border-[#990000]/40",
    variants: {
      "0": { x: "-25vw", y: "-25vh", scale: 1, rotate: 0, borderRadius: "50%", opacity: 0.32 },
      "1": { x: "20vw", y: "0vh", scale: 1.1, rotate: 45, borderRadius: "10%", opacity: 0.38 },
      "2": { x: "-30vw", y: "20vh", scale: 0.8, rotate: 90, borderRadius: "40%", opacity: 0.25 },
      "project": { opacity: 0, scale: 0.5, rotate: 0 },
      "cv": { x: "15vw", y: "-15vh", scale: 1.3, rotate: 135, borderRadius: "30%", opacity: 0.32 }
    }
  },
  {
    className: "absolute top-1/2 left-1/2 w-[25vw] h-[25vw] -ml-[12.5vw] -mt-[12.5vw] bg-[#4a0000]/40 shadow-[0_0_50px_rgba(74,0,0,0.5)]",
    variants: {
      "0": { x: "30vw", y: "30vh", scale: 1.2, rotate: 45, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", opacity: 0.38 },
      "1": { x: "-20vw", y: "-30vh", scale: 0.9, rotate: 180, borderRadius: "50%", opacity: 0.45 },
      "2": { x: "30vw", y: "-20vh", scale: 1.4, rotate: 90, borderRadius: "10%", opacity: 0.32 },
      "project": { opacity: 0, scale: 0.5, rotate: 0 },
      "cv": { x: "-25vw", y: "20vh", scale: 1, rotate: 270, borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%", opacity: 0.38 }
    }
  },
  {
    className: "absolute top-1/2 left-1/2 w-[30vw] h-[30vw] -ml-[15vw] -mt-[15vw] border-[2px] border-[#ff0000]/30",
    variants: {
      "0": { x: "-10vw", y: "35vh", scale: 1, rotate: 15, borderRadius: "20%", opacity: 0.32 },
      "1": { x: "-35vw", y: "15vh", scale: 1.3, rotate: 60, borderRadius: "50%", opacity: 0.38 },
      "2": { x: "20vw", y: "35vh", scale: 0.9, rotate: 120, borderRadius: "30%", opacity: 0.25 },
      "project": { opacity: 0, scale: 0.5, rotate: 0 },
      "cv": { x: "30vw", y: "25vh", scale: 1.1, rotate: 45, borderRadius: "10%", opacity: 0.38 }
    }
  },
  {
    className: "absolute top-1/2 left-1/2 w-[15vw] h-[15vw] -ml-[7.5vw] -mt-[7.5vw] bg-[#990000]/35 blur-xl",
    variants: {
      "0": { x: "20vw", y: "-20vh", scale: 1, rotate: 0, borderRadius: "50%", opacity: 0.44 },
      "1": { x: "10vw", y: "30vh", scale: 1.5, rotate: 45, borderRadius: "20%", opacity: 0.38 },
      "2": { x: "-20vw", y: "0vh", scale: 1.2, rotate: 90, borderRadius: "60% 40% 30% 70%", opacity: 0.32 },
      "project": { opacity: 0, scale: 0.5, rotate: 0 },
      "cv": { x: "-35vw", y: "-10vh", scale: 0.8, rotate: 135, borderRadius: "50%", opacity: 0.44 }
    }
  },
  {
    className: "absolute top-1/2 left-1/2 w-[50vw] h-[50vw] -ml-[25vw] -mt-[25vw] border-[1px] border-[#ff0000]/20",
    variants: {
      "0": { x: "15vw", y: "10vh", scale: 1, rotate: 0, borderRadius: "10%", opacity: 0.25 },
      "1": { x: "-10vw", y: "-15vh", scale: 1.1, rotate: 30, borderRadius: "40%", opacity: 0.32 },
      "2": { x: "-5vw", y: "-10vh", scale: 1.2, rotate: -30, borderRadius: "50%", opacity: 0.25 },
      "project": { opacity: 0, scale: 0.5, rotate: 0 },
      "cv": { x: "5vw", y: "15vh", scale: 1, rotate: 45, borderRadius: "20%", opacity: 0.32 }
    }
  },
  {
    className: "absolute top-1/2 left-1/2 w-[20vw] h-[20vw] -ml-[10vw] -mt-[10vw] bg-[#2a0000]/60",
    variants: {
      "0": { x: "-35vw", y: "10vh", scale: 1, rotate: 60, borderRadius: "30%", opacity: 0.38 },
      "1": { x: "35vw", y: "-20vh", scale: 1.2, rotate: 120, borderRadius: "50%", opacity: 0.45 },
      "2": { x: "35vw", y: "10vh", scale: 0.8, rotate: 180, borderRadius: "10%", opacity: 0.32 },
      "project": { opacity: 0, scale: 0.5, rotate: 0 },
      "cv": { x: "-15vw", y: "35vh", scale: 1.4, rotate: 240, borderRadius: "40%", opacity: 0.38 }
    }
  },
  {
    className: "absolute top-1/2 left-1/2 w-[10vw] h-[30vw] -ml-[5vw] -mt-[15vw] bg-gradient-to-b from-[#990000]/30 to-transparent",
    variants: {
      "0": { x: "40vw", y: "0vh", scale: 1, rotate: 15, borderRadius: "100px", opacity: 0.32 },
      "1": { x: "0vw", y: "35vh", scale: 1.2, rotate: 90, borderRadius: "100px", opacity: 0.25 },
      "2": { x: "-40vw", y: "-15vh", scale: 0.9, rotate: -45, borderRadius: "100px", opacity: 0.38 },
      "project": { opacity: 0, scale: 0.5, rotate: 0 },
      "cv": { x: "35vw", y: "-25vh", scale: 1.1, rotate: 30, borderRadius: "100px", opacity: 0.32 }
    }
  }
];

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

interface Project {
  id_proyect: number;
  name: string;
  url: string;
  short_description: string;
  bg_photo: string | null;
  long_description: string;
}

interface Skill {
  id?: number;
  name: string;
}

// Reusable animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.125, delayChildren: 0.3 }
  }
};

const textReveal = {
  hidden: { y: "120%", rotate: 2, opacity: 0 },
  visible: { 
    y: 0, 
    rotate: 0, 
    opacity: 1,
    transition: { duration: 1.25, ease: APPLE_EASE } 
  }
};

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 1.25, ease: APPLE_EASE } 
  }
};

const InteractiveWord = ({ text, className }: { text: string; className?: string }) => {
  return (
    <motion.h2 variants={textReveal} className={`flex ${className}`}>
      {text.split("").map((char, index) => (
        char === " " ? (
          <span key={index} className="whitespace-pre">&nbsp;</span>
        ) : (
          <motion.span
            key={index}
            whileHover={{
              color: "#990000",
              y: -10,
              rotate: (index % 2 === 0 ? 1 : -1) * (10 + (index % 5)),
              scale: 1.15
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="inline-block cursor-default transition-colors duration-200"
          >
            {char}
          </motion.span>
        )
      ))}
    </motion.h2>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const isScrolling = useRef(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [initStatus, setInitStatus] = useState<"loading" | "error" | "complete">("loading");
  const [progress, setProgress] = useState(0);

  const handlePrint = () => window.open('https://drive.google.com/file/d/11nczQcN9Gfn_VOHpnzg4B6IKOZXnXFaT/view', '_blank');

  // Disable right-click across the entire app
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  const totalPages = 3 + Math.max(1, projects.length) + 1;
  const isProjectPage = currentPage >= 3 && currentPage < totalPages - 1;
  const bgState = isProjectPage ? "project" : (currentPage === totalPages - 1 ? "cv" : currentPage.toString());

  // Initialize App and Fetch Data
  useEffect(() => {
    async function initializeApp() {
      try {
        setProgress(10);
        
        if (!supabase) {
          setProgress(50);
          setProjects([{
            id_proyect: 1,
            name: "THRE´S NO PROYECTS HERE :(",
            url: "https://google.com",
            short_description: "Sample Text",
            bg_photo: null,
            long_description: "Sample Text"
          }]);
          setSkills([{ name: "React" }, { name: ".NET" }, { name: "SQL" }, { name: "C#" }, { name: "TypeScript" }]);
          await new Promise(r => setTimeout(r, 800)); // Simulate loading delay
          setProgress(100);
          setTimeout(() => setInitStatus("complete"), 600);
          return;
        }

        // Fetch Projects
        setProgress(30);
        const { data: projectsData, error: projectsError } = await supabase
          .from("Proyects")
          .select("*")
          .order("id_proyect", { ascending: true });

        if (projectsError) throw projectsError;
        
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData);
        } else {
          setProjects([{
            id_proyect: 1,
            name: "THRE´S NO PROYECTS HERE :(",
            url: "https://google.com",
            short_description: "Sample Text",
            bg_photo: null,
            long_description: "Sample Text"
          }]);
        }

        setProgress(60);

        // Fetch Skills
        const { data: skillsData, error: skillsError } = await supabase
          .from("skill")
          .select("name");

        if (skillsError) throw skillsError;
        if (skillsData) setSkills(skillsData);

        // Fetch Profile Picture from Storage
        let pfpUrl = null;
        try {
          // Pre-emptively try the exact path suggested by the user
          const { data: directData } = supabase
            .storage
            .from('profile_picture')
            .getPublicUrl('profile_picture.JPG');
          
          // Check if it exists by trying to 'fetch' or just trust the list first?
          // Since getPublicUrl doesn't verify existence, we'll still list to be safe
          // but prioritize the user's specific mention.
          
          const { data: files, error: storageError } = await supabase
            .storage
            .from('profile_picture')
            .list('', { limit: 20 });

          if (!storageError && files && files.length > 0) {
            // Priority 1: Exact match as specified by user
            // Priority 2: Contains 'profile_picture'
            // Priority 3: Any image
            const profileFile = 
              files.find(f => f.name === 'profile_picture.JPG') ||
              files.find(f => f.name.toLowerCase() === 'profile_picture.jpg') ||
              files.find(f => f.name.toLowerCase().includes('profile_picture') && f.name.match(/\.(jpg|jpeg|png)$/i)) ||
              files.find(f => f.name.match(/\.(jpg|jpeg|png)$/i));

            if (profileFile) {
              const { data } = supabase
                .storage
                .from('profile_picture')
                .getPublicUrl(profileFile.name);
              
              if (data?.publicUrl) {
                pfpUrl = data.publicUrl;
                setProfilePic(pfpUrl);
              }
            }
          } else if (directData?.publicUrl) {
            // Fallback if list fails but we have a direct URL to try
            pfpUrl = directData.publicUrl;
            setProfilePic(pfpUrl);
          }
        } catch (err) {
          console.warn("Storage fetch failed:", err);
        }

        setProgress(80);

        // Preload valid background images
        const imageUrls = projectsData?.map(p => p.bg_photo).filter(Boolean) as string[] || [];
        if (pfpUrl) imageUrls.push(pfpUrl);
        
        if (imageUrls.length > 0) {
          await Promise.all(imageUrls.map(url => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = url;
              // We won't reject on image load error to avoid crashing the whole portfolio for a single broken image, 
              // but we wait for the process to finish.
              img.onload = resolve;
              img.onerror = () => {
                console.warn(`Failed to preload image: ${url}`);
                resolve(null);
              };
            });
          }));
        }

        setProgress(100);
        setTimeout(() => setInitStatus("complete"), 800);

      } catch (err) {
        console.error("Failed to initialize:", err);
        setInitStatus("error");
      }
    }

    initializeApp();
  }, []);

  // Handle scroll and touch for horizontal page navigation
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const scrollToDirection = (direction: number) => {
      const nextPage = Math.max(0, Math.min(totalPages - 1, currentPage + direction));
      if (nextPage !== currentPage) {
        isScrolling.current = true;
        setCurrentPage(nextPage);
        setTimeout(() => {
          isScrolling.current = false;
        }, 1250); 
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      // Threshold to ignore tiny trackpad movements
      if (Math.abs(e.deltaY) < 20) return;

      // Determine direction: down -> forward, up -> backward
      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToDirection(direction);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      if (isScrolling.current) return;
      
      const swipeThreshold = 50;
      if (touchEndX.current < touchStartX.current - swipeThreshold) {
        // swipe left -> forward
        scrollToDirection(1);
      }
      if (touchEndX.current > touchStartX.current + swipeThreshold) {
        // swipe right -> backward
        scrollToDirection(-1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentPage, totalPages]);

  const scrollToPage = (index: number) => {
    if (isScrolling.current || index === currentPage) return;
    isScrolling.current = true;
    setCurrentPage(index);
    setTimeout(() => {
      isScrolling.current = false;
    }, 1250);
  };

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {initStatus !== "complete" && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: APPLE_EASE }}
            className="fixed inset-0 z-[100] bg-[#05070a] flex flex-col items-center justify-center text-white"
          >
            <div className="w-64 md:w-80 flex flex-col items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[#990000] font-bold tracking-[0.3em] uppercase mb-8 text-center"
              >
                Loading, it may take a while
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full h-[2px] bg-[#4a0000]/30 overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#ff0000]"
                  initial={{ width: "0%" }}
                  animate={{ width: initStatus === "error" ? progress + "%" : progress + "%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Percentage Indicator */}
              <motion.div 
                className="mt-2 text-[0.625rem] font-bold tracking-widest text-[#ff0000]/80 tabular-nums"
                animate={{ opacity: progress > 0 ? 1 : 0 }}
              >
                {Math.round(progress)}%
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {initStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center text-sm text-gray-400"
                  >
                    It happened an error loading the page, try refreshing your browser. Sorry :(
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Subtle Loading Background Geometrics */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
               <motion.div
                 className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] -ml-[20vw] -mt-[20vw] bg-[#990000]/10 blur-3xl rounded-full"
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               />
               <motion.div
                 className="absolute top-[10%] left-[20%] w-[25vw] h-[25vw] border-[1px] border-[#ff0000]/20 rounded-full"
                 animate={{ rotate: [0, 360], scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               />
               <motion.div
                 className="absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] border-[2px] border-[#4a0000]/30 rounded-full"
                 animate={{ rotate: [360, 0], x: [0, 30, 0], y: [0, -30, 0] }}
                 transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
               />
               <motion.div
                 className="absolute top-[60%] right-[15%] w-[15vw] h-[15vw] bg-[#4a0000]/30 blur-2xl rounded-full"
                 animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.2, 0.6, 0.2] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               />
               <motion.div
                 className="absolute bottom-[40%] left-[10%] w-[10vw] h-[10vw] border-[1px] border-[#990000]/40 rounded-full"
                 animate={{ y: [0, -50, 0], rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#05070a] text-white selection:bg-brand-red/30">
      {/* Global Dynamic Geometric Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {backgroundShapes.map((shape, i) => (
          <motion.div
            key={i}
            className={shape.className}
            variants={shape.variants as any}
            initial="0"
            animate={bgState}
            transition={{ duration: 1.2, ease: APPLE_EASE }}
          />
        ))}
      </div>

      {/* Page indicators */}
      <div className="fixed top-12 left-12 z-50 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          {((currentPage === 2) || (currentPage >= 3 && currentPage < totalPages - 1)) && (
            <motion.div
              key={currentPage === 2 ? "myself" : "mywork"}
              initial={{ y: 30, opacity: 0, x: -10 }}
              animate={{ y: 0, opacity: 1, x: 0 }}
              exit={{ y: -30, opacity: 0, x: 10 }}
              transition={{ duration: 0.4, ease: APPLE_EASE }}
            >
              <span className="text-[#990000] font-bold tracking-[0.3em] block">
                {currentPage === 2 ? "Myself" : "My Work"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main horizontal sliding container */}
      <motion.div
        className="flex h-full relative z-10"
        style={{ width: `500vw` }}
        animate={{ 
          x: `-${
            currentPage < 3 
              ? currentPage * 100 
              : currentPage >= 3 && currentPage < totalPages - 1 
                ? 300 
                : 400
          }vw` 
        }}
        transition={{ duration: 1.25, ease: APPLE_EASE }}
      >
        {/* Page 1: Intro (Image 6) */}
        <section className="w-screen h-screen overflow-y-auto no-scrollbar flex-shrink-0 flex flex-col justify-center px-6 sm:px-16 md:px-32 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={currentPage === 0 ? "visible" : "hidden"}
            className="space-y-0"
          >
            <div className="overflow-hidden py-2">
              <motion.h1 variants={textReveal} className="text-6xl sm:text-7xl lg:text-8xl 2xl:text-[10rem] font-bold tracking-tighter leading-[0.8]">Esteban</motion.h1>
            </div>
            <div className="overflow-hidden py-2">
              <motion.h1 variants={textReveal} className="text-6xl sm:text-7xl lg:text-8xl 2xl:text-[10rem] font-bold tracking-tighter leading-[0.8] text-[#990000]">Erazo Narváez</motion.h1>
            </div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-lg sm:text-2xl lg:text-3xl 2xl:text-5xl font-bold text-[#4a0000] pt-8">
              <span>Ingeniero en Sistemas</span>
              <span>Especialista en Seguridad Informática</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={currentPage === 0 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: APPLE_EASE, delay: 0.75 }}
            style={{ originX: 0 }}
            className="absolute bottom-16 left-16 md:left-32 right-16 md:right-32"
          >
             <div className="h-[1px] bg-[#4a0000] w-full mb-12" />
             <div className="flex justify-end">
                <motion.div 
                  animate={{ x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="text-[#990000] w-12 h-12" strokeWidth={3} />
                </motion.div>
             </div>
          </motion.div>
        </section>

        {/* Page 2: Phrase (Image 5) */}
        {/*rem Generar impacto para la frase, puede ir en escalada*/}
        <section className="w-screen h-screen overflow-y-auto no-scrollbar flex-shrink-0 flex flex-col justify-center px-6 sm:px-16 md:px-32 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={currentPage === 1 ? "visible" : "hidden"}
            className="space-y-2 mt-20"
          >
            <div className="overflow-hidden flex">
              <InteractiveWord text="NO LLORES PORQUE" className="text-3xl sm:text-5xl md:text-7xl lg:text-[4rem] font-bold tracking-tighter leading-none" />
            </div>
            <div className="overflow-hidden ml-8 sm:ml-24 md:ml-48 flex">
              <InteractiveWord text="TERMINÓ, SONRIE" className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none" />
            </div>
            <div className="overflow-hidden flex">
              <InteractiveWord text="PORQUE SUCEDIÓ" className="text-4xl sm:text-7xl md:text-[9rem] lg:text-[12rem] font-bold tracking-tighter leading-none" />
            </div>
          </motion.div>
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            animate={currentPage === 1 ? "visible" : "hidden"}
            className="absolute bottom-32 sm:bottom-24 right-8 sm:right-16 md:right-32 text-right"
          >
            <p className="text-xl font-bold opacity-80">Dr. Seuss / 1980 (Aprox.)</p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={currentPage === 1 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.25, ease: APPLE_EASE, delay: 1.0 }}
              style={{ originX: 1 }}
              className="h-[1px] bg-[#4a0000] w-64 mt-4" 
            />
          </motion.div>
        </section>

        {/* Page 3: About (Image 1) */}
        <section className="w-screen h-screen overflow-y-auto no-scrollbar flex-shrink-0 flex items-start md:items-center px-6 sm:px-16 md:px-32 relative py-24 md:py-0">
          <div className="flex flex-col md:flex-row w-full items-stretch justify-center gap-8 md:gap-0">
            
            {/* Column 1 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={currentPage === 2 ? "visible" : "hidden"}
              className="flex-1 flex flex-col justify-start md:pr-12 md:border-r-[3px] border-[#4a0000] py-4 md:py-0"
            >
              <div className="overflow-hidden py-2">
                <motion.h3 variants={textReveal} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none tracking-tighter">¿Quién<br className="hidden md:block" />soy?</motion.h3>
              </div>
              <motion.div variants={fadeUp} className="mt-8 space-y-4 text-sm md:text-base text-white/70 font-medium leading-relaxed">
                <p>
                  Soy <strong className="text-white">Esteban Erazo Narváez</strong>, un apasionado de la tecnología y estudiante de noveno semestre de Ingeniería de Sistemas en la Universidad CESMAG. Mi perfil combina una sólida base técnica en desarrollo de software empresarial con el framework <strong className="text-white">.NET</strong> y la administración de bases de datos relacionales.
                </p>
                <p>
                  Cuento con un nivel de inglés certificado <strong className="text-white">C1.2 (IELTS)</strong>, lo que me permite desempeñarme eficazmente en entornos técnicos bilingües. Además de mi formación académica, poseo experiencia en liderazgo y comunicación asertiva, habilidades que aplico tanto en el desarrollo de soluciones tecnológicas como en la gestión de proyectos y atención al cliente.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Column 2 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={currentPage === 2 ? "visible" : "hidden"}
              className="flex-1 flex flex-col justify-start md:px-12 md:border-r-[3px] border-[#4a0000] py-4 md:py-0"
            >
              <div className="overflow-hidden py-2">
                <motion.h3 variants={textReveal} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none tracking-tighter">¿Qué es lo<br className="hidden md:block" />que me motiva?</motion.h3>
              </div>
              <motion.div variants={fadeUp} className="mt-8 space-y-4 text-sm md:text-base text-white/70 font-medium leading-relaxed">
                <p>
                  Lo que me impulsa es la capacidad de transformar problemas complejos en soluciones funcionales y eficientes a través del código. Me motiva el aprendizaje continuo y la aplicación de nuevas tecnologías para optimizar procesos empresariales, garantizando siempre la calidad y la seguridad de la información.
                </p>
                <p>
                  Busco constantemente retos que me permitan integrar mis habilidades técnicas con mi capacidad de liderazgo, con el objetivo de contribuir al crecimiento de organizaciones innovadoras y seguir evolucionando profesionalmente en el ciclo completo de desarrollo de aplicaciones.
                </p>
              </motion.div>
            </motion.div>

            {/* Column 3 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={currentPage === 2 ? "visible" : "hidden"}
              className="flex-1 flex flex-col justify-start md:pl-12 py-4 md:py-0"
            >
              <div className="overflow-hidden py-2">
                <motion.h3 variants={textReveal} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none tracking-tighter">Mis <br className="hidden md:block" />Habilidades</motion.h3>
              </div>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <div 
                    key={i}
                    className="px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#4a0000]/50 text-white/90 font-bold text-xs uppercase tracking-wider hover:border-[#990000] hover:bg-[#990000]/10 transition-all cursor-default"
                  >
                    {skill.name}
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* Dynamic Project Pages (Morphing Container) */}
        <section className="w-screen h-screen flex-shrink-0 relative overflow-hidden">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              const pageIndex = 3 + index;
              if (currentPage !== pageIndex) return null;

              return (
                <motion.div 
                  key={project.id_proyect} 
                  initial={{ opacity: 0, filter: "blur(15px)", scale: 1.05 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
                  transition={{ duration: 1.2, ease: APPLE_EASE }}
                  className="absolute inset-0 flex items-center px-16 md:px-32 cursor-pointer group"
                  onClick={() => window.open(project.url, "_blank")}
                >
                  {/* Background Graphic / Photo */}
                  <div className="absolute inset-0 pointer-events-none">
                    <img 
                      src={project.bg_photo || "https://picsum.photos/seed/portfolio/1920/1080"} 
                      alt={project.name}
                      className="w-full h-full object-cover opacity-50 transition-opacity duration-700 group-hover:opacity-40"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    
                    {!project.bg_photo && (
                      <>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] border border-white/30 rounded-lg">
                          <div className="flex gap-2 p-4 border-b border-white/30">
                              <div className="w-2 h-2 rounded-full bg-white/30" />
                              <div className="w-2 h-2 rounded-full bg-white/30" />
                              <div className="w-2 h-2 rounded-full bg-white/30" />
                          </div>
                        </div>
                        <motion.div 
                          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[6.25rem]" 
                        />
                        <motion.div 
                          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#990000]/10 rounded-full blur-[5rem]" 
                        />
                      </>
                    )}
                  </div>

                  <div className="relative z-10 space-y-8 md:space-y-12">
                    <div className="space-y-0">
                      <div className="overflow-hidden py-2">
                        <motion.h4 
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -50, opacity: 0 }}
                          transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.1 }}
                          className="text-5xl sm:text-7xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] uppercase"
                        >
                          {project.name}
                        </motion.h4>
                      </div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.2 }}
                      className="space-y-4"
                    >
                      <p className="text-xl sm:text-3xl text-[#990000] font-bold tracking-tight">{project.short_description}</p>
                      <p className="text-base sm:text-xl text-white/50 max-w-2xl font-medium">
                        {project.long_description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

        {/* Final Page: CV (Image 3) */}
        <section className="w-screen h-screen overflow-y-auto no-scrollbar flex-shrink-0 flex items-start md:items-center justify-center px-6 sm:px-16 md:px-32 relative py-24 md:py-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={currentPage === totalPages - 1 ? "visible" : "hidden"}
            className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
          >
            {/* Left Column: Contact Info */}
            <motion.div variants={fadeUp} className="md:col-span-4 flex flex-col items-center text-center space-y-6">
              {/* Profile Picture */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden shadow-[0_0_1.875rem_rgba(153,0,0,0.3)]">
                <img 
                  src={profilePic || "https://picsum.photos/seed/esteban/400/400"} 
                  alt="Esteban Erazo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "https://picsum.photos/seed/esteban/400/400") {
                      target.src = "https://picsum.photos/seed/esteban/400/400";
                    }
                  }}
                />
              </div>
              
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-[#990000]">Esteban Erazo N.</h2>
                <p className="text-lg text-white/90">Ingeniero en Sistemas</p>
              </div>

              <div className="space-y-4 pt-4">
                <p className="text-sm text-white/90 max-w-[15.625rem] leading-relaxed">
                  If you're interested in contacting me here's my personal information:
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium">narvaezerazo@hotmail.com</p>
                  <p className="text-sm font-medium">+573156667795</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <p className="text-sm text-white/90">Also you can find me in:</p>
                <div className="flex justify-center gap-4">
                  <a href="https://github.com/St3phen27" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                    <Github className="w-7 h-7" />
                  </a>
                  <a href="https://www.linkedin.com/in/estebanerazonarvaez/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                    <Linkedin className="w-7 h-7" />
                  </a>
                  <a href="https://www.instagram.com/narvaezest_/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                    <Instagram className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Column: CV PDF */}
            <motion.div variants={fadeUp} className="md:col-span-8 flex flex-col h-[60vh] md:h-[80vh] w-full">
              <div className="overflow-hidden py-2 mb-6">
                <motion.h5 variants={textReveal} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-center">Curriculum Vitae</motion.h5>
              </div>
              
              <div className="flex-1 flex flex-col shadow-2xl w-full border-2 border-black rounded-lg overflow-hidden group/pdf">
                {/* Control Panel / Toolbar */}
                <div className="bg-[#b0b0b0] p-3 flex items-center justify-between px-4 border-b-2 border-black">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-black rounded shadow-inner">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-black font-medium text-sm md:text-base tracking-wide font-sans">CV_Esteban_Erazo_Narvaez.pdf</span>
                  </div>
                  
                  <div className="flex items-center gap-1 md:gap-3">
                    <button 
                      onClick={handlePrint}
                      className="p-1.5 px-3 bg-black hover:bg-gray-800 text-white rounded-md transition-all active:scale-95 shadow-md flex items-center gap-2" 
                      title="Read / Print in new tab"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">Read / Print</span>
                      <Printer className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-[#333333] relative p-4 md:p-8 flex justify-center overflow-auto no-scrollbar">
                  {/* The actual viewer area */}
                  <div className="w-full h-full max-w-4xl bg-white shadow-[0_1.25rem_3.125rem_rgba(0,0,0,0.5)] relative">
                    <iframe 
                      src="https://drive.google.com/file/d/11nczQcN9Gfn_VOHpnzg4B6IKOZXnXFaT/preview" 
                      className="absolute inset-0 w-full h-full border-none"
                      title="CV PDF"
                      allow="autoplay"
                    ></iframe>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Text */}
          <motion.div 
             className="absolute bottom-12 left-16 md:left-32 text-[0.625rem] md:text-xs font-bold tracking-widest text-[#990000]/60 uppercase select-none"
             initial={{ opacity: 0 }}
             animate={currentPage === totalPages - 1 ? { opacity: 1 } : { opacity: 0 }}
             transition={{ duration: 1, delay: 1 }}
          >
            ● 2026 ESTEBAN ERAZO - Made With Love
          </motion.div>
        </section>
      </motion.div>

      {/* Dynamic Page Indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50">
        <div className="flex items-center gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              onClick={() => scrollToPage(index)}
              className="cursor-pointer py-2 px-2 -mx-2 flex items-center justify-center"
            >
              <motion.div 
                animate={{ 
                  width: currentPage === index ? 32 : 12,
                  backgroundColor: currentPage === index ? "#ff0000" : "rgba(255, 255, 255, 0.3)"
                }}
                className="h-2 rounded-full transition-all"
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
        
        {/* Page counter */}
        <motion.div 
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[0.625rem] md:text-xs font-bold tracking-[0.2em] text-[#ff0000]/60 uppercase select-none"
        >
          Page {currentPage + 1}
        </motion.div>
      </div>

      {/* Home Button (Image 1, 2, 3, 4, 5 corner) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={currentPage > 0 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.8, ease: APPLE_EASE }}
        onClick={() => scrollToPage(0)}
        className={`fixed bottom-12 right-12 text-[#990000] hover:text-[#ff0000] transition-colors z-50 ${currentPage > 0 ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <HomeIcon />
      </motion.button>
    </main>
    </>
  );
}
