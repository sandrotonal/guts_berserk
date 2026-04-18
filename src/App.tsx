import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X, Mail, Github, Twitter, Instagram, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    emailjs
      .sendForm('berserk', 'template_1azqzbd', form.current, {
        publicKey: '1zlvJLZdqkgtTgZsD',
      })
      .then(
        () => {
          alert("Signal Dispatched: Mesajın The Protagonist'e iletildi kanka!");
          form.current?.reset();
          setIsSending(false);
        },
        (error) => {
          alert('Signal FAILED: Bir sorun oluştu, duman sönümsüz kaldı. ' + JSON.stringify(error));
          setIsSending(false);
        }
      );
  };

  // Closes the menu when a link is clicked
  const handleNavClick = () => setIsMenuOpen(false);

  // Mobil menü açılırken kılıç sesi çalması için tetikleyici
  const toggleMenu = () => {
    if (!isMenuOpen) {
      const audio = new Audio('/sword.mp3');
      audio.volume = 0.7; // Ses şiddeti
      audio.play().catch(e => console.log('Kılıç sesi çalınamadı:', e));
    }
    setIsMenuOpen(!isMenuOpen);
  };

  // Splash Screen Zamanlayıcısı
  useEffect(() => {
    // Videonun uzunluğuna göre bu süreyi (milisaniye) dilediğin gibi ayarlayabilirsin
    // Şu an 3.5 saniye ekranda kalıp sonra kaybolacak şekilde ayarladım.
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Tam Ekran ve Mobil Uyumlu Video */}
            <video 
              autoPlay 
              muted 
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              className="absolute inset-0 w-full h-full object-cover opacity-90 contrast-[1.2] pointer-events-none"
            >
              <source src="/gust.mp4" type="video/mp4" />
            </video>

            {/* Hafif Noir Karartması (Videonun üstüne karanlık bir hava katar) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] mix-blend-multiply" />
            
            {/* Alt kısımdan gelen "Açılıyor" yazısı (İsteğe bağlı silebilirsin) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ delay: 1, duration: 2 }}
              className="absolute bottom-16 text-primary tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold z-30 drop-shadow-[0_0_10px_rgba(155,0,0,0.8)]"
            >
              The Brand of Sacrifice
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`bg-background text-foreground font-sans selection:bg-primary/50 selection:text-white transition-opacity duration-1000 ${showSplash ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100 h-auto'}`}>
        {/* Global Noise Overlay for Noir / Manga feel */}
        <div className="bg-noise mix-blend-overlay"></div>

        {/* Navbar Fixed */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 mix-blend-difference pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.1, duration: 1 }} 
            className="font-serif text-2xl tracking-tighter uppercase text-white pointer-events-auto shadow-black drop-shadow-md cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Ömer Özbay<span className="text-primary italic"></span>
          </motion.div>
          
          {/* Desktop Menu */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }} className="hidden md:flex items-center space-x-12 text-[10px] lg:text-xs font-semibold tracking-[0.2em] uppercase text-white pointer-events-auto mb-1">
            <a href="#intro" className="hover:text-primary transition-colors">The Protagonist</a>
            <a href="#tech" className="hover:text-primary transition-colors">The Blades</a>
            <a href="#philosophy" className="hover:text-primary transition-colors">The Abyss</a>
            <a href="#contact" className="hover:text-primary transition-colors">The Pact</a>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }} 
            className="md:hidden text-white pointer-events-auto mr-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-8 h-8 drop-shadow-md" /> : <Menu className="w-8 h-8 drop-shadow-md" />}
          </motion.button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: "-100%" }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 z-40 bg-black backdrop-blur-3xl flex flex-col items-center justify-center space-y-12 border-b border-primary/20"
            >
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-black to-black opacity-60"></div>
              <a href="#intro" onClick={handleNavClick} className="z-10 text-4xl font-serif tracking-tighter text-white hover:text-primary transition-colors uppercase">The Protagonist</a>
              <a href="#tech" onClick={handleNavClick} className="z-10 text-4xl font-serif tracking-tighter text-white hover:text-primary transition-colors uppercase">The Blades</a>
              <a href="#philosophy" onClick={handleNavClick} className="z-10 text-4xl font-serif tracking-tighter text-white hover:text-primary transition-colors uppercase">The Abyss</a>
              <a href="#contact" onClick={handleNavClick} className="z-10 text-4xl font-serif tracking-tighter text-white hover:text-primary transition-colors uppercase">The Pact</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section id="hero" className="relative h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-black">
          {/* BG Video / Vignette */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              controls={false}
              disablePictureInPicture
              className="w-full h-full object-cover grayscale-[0.9] contrast-[1.4] opacity-80 pointer-events-none"
            >
              <source src="/Berserk_Guts_Video_Oluşturma.mp4" type="video/mp4" />
            </video>
            {/* Intense vignette for Noir feel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90 opacity-90" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-4 mt-10 md:mt-16 max-w-screen-xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }} className="flex flex-col items-center">
              <p className="text-primary font-medium tracking-[0.5em] uppercase text-[9px] md:text-xs mb-8 flex items-center gap-6 mix-blend-screen drop-shadow-[0_0_10px_rgba(155,0,0,0.8)]">
                <span className="w-8 md:w-16 h-[1px] bg-primary"></span>
                A Struggler's Sanctuary
                <span className="w-8 md:w-16 h-[1px] bg-primary"></span>
              </p>
              
              <h1 className="font-serif text-6xl sm:text-7xl md:text-[9rem] lg:text-[12rem] xl:text-[14rem] leading-[0.8] tracking-tighter text-white drop-shadow-2xl uppercase">
                 FORGE <br/>
                 <span className="text-primary italic font-light mix-blend-screen drop-shadow-[0_0_20px_rgba(155,0,0,1)]">THROUGH</span><br />
                 THE DARK
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse" }} className="absolute bottom-16 md:bottom-12 text-white/30 mix-blend-screen">
              <ChevronDown className="w-8 h-8 animate-bounce" />
            </motion.div>
          </div>
        </section>

        {/* Intro Section - The Protagonist */}
        <section id="intro" className="relative min-h-screen w-full flex items-center justify-center py-24 md:py-32 overflow-hidden bg-black border-t border-white/5">
          <div className="absolute inset-0 z-0 opacity-70">
             {/* High contrast, grayscale for noir feel */}
             <img src="/guts-berserk-dark-3840x2160-19127.jpg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2000&auto=format&fit=crop"; }} alt="Dark Berserk" className="w-full h-full object-cover object-center grayscale contrast-[1.3] mix-blend-luminosity opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />
             <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>

          <div className="relative z-10 max-w-screen-2xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.5, ease: "easeOut" }}>
                <h2 className="font-serif text-[4rem] sm:text-6xl md:text-8xl lg:text-[7rem] leading-[0.85] tracking-tighter mb-4 md:mb-8 text-white uppercase drop-shadow-xl">
                   THE MAN <br/><span className="italic text-primary drop-shadow-[0_0_10px_rgba(155,0,0,0.8)] hidden md:inline">&nbsp;</span> VS.<br /> THE WORLD.
                </h2>
             </motion.div>
             
             <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }} className="flex flex-col justify-center space-y-6 md:space-y-8 max-w-lg border-l border-primary/30 pl-6 md:pl-10">
                <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base drop-shadow-md bg-black/40 p-2 rounded">
                   I am Ömer Özbay. A Full Stack Developer forging digital realms with the unyielding resolve of a struggler. Modern development is a battlefield fraught with complexity and bloat.
                </p>
                <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base drop-shadow-md bg-black/40 p-2 rounded">
                   My philosophy is brutal: strip away the unnecessary, embrace the shadows, and build web experiences that are as sharp, efficient, and impactful as the Dragonslayer itself.
                </p>
                <div className="pt-6 md:pt-8 flex flex-col gap-4 md:gap-5 border-t border-white/5">
                   <div className="flex justify-between items-center text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/70 font-bold">
                      <span>Focus</span>
                      <span className="text-primary text-right">Minimalism & Brutal Performance</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/70 font-bold">
                      <span>Aesthetic</span>
                      <span className="text-primary text-right">Noir / Sharp / Immersive</span>
                   </div>
                </div>
             </motion.div>
          </div>
        </section>

        {/* Tech Stack Section - The Arsenal */}
        <section id="tech" className="relative min-h-screen w-full flex items-center justify-center py-24 md:py-32 overflow-hidden bg-black border-t border-white/5">
          <div className="absolute inset-0 z-0 opacity-50">
             <img src="/berserk-guts-colored-5k-3840x2160-13633.jpg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop"; }} alt="Colored Berserk" className="w-full h-full object-cover object-top filter grayscale-[0.8] contrast-[1.5]" />
             <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-black/95" />
             <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
          </div>

          <div className="relative z-10 max-w-screen-2xl w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             {/* Mobile header */}
             <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }} className="block lg:hidden text-left">
                <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-bold border-b border-primary/20 pb-2 inline-block">The Arsenal</p>
                <h2 className="font-serif text-[4.5rem] sm:text-7xl leading-[0.85] tracking-tighter text-white uppercase">TOOLS OF <br/><span className="text-gray-500 italic font-light">SURVIVAL</span></h2>
             </motion.div>

             {/* Content card - Brutalist */}
             <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.2, delay: 0.2 }} className="flex flex-col justify-center space-y-10 md:space-y-16">
                <div className="space-y-6 relative pl-6 bg-black/60 p-4 rounded-xl backdrop-blur-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/40"></div>
                  <h3 className="text-sm md:text-base font-serif tracking-[0.1em] text-white/90 uppercase">Frontend Engineering</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 font-light text-sm md:text-base text-gray-300">
                    <li className="flex items-center gap-4 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold"><span className="w-1.5 h-1.5 bg-primary bg-opacity-80 rotate-45"></span> React & Next.js</li>
                    <li className="flex items-center gap-4 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold"><span className="w-1.5 h-1.5 bg-primary bg-opacity-80 rotate-45"></span> TypeScript</li>
                    <li className="flex items-center gap-4 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold"><span className="w-1.5 h-1.5 bg-primary bg-opacity-80 rotate-45"></span> Tailwind CSS</li>
                    <li className="flex items-center gap-4 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold"><span className="w-1.5 h-1.5 bg-primary bg-opacity-80 rotate-45"></span> Framer Motion</li>
                  </ul>
                </div>
                <div className="space-y-6 relative pl-6 bg-black/60 p-4 rounded-xl backdrop-blur-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10"></div>
                  <h3 className="text-sm md:text-base font-serif tracking-[0.1em] text-white/90 uppercase">Backend / Systems</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 font-light text-sm md:text-base text-gray-400">
                    <li className="flex items-center gap-4 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold"><span className="w-1 h-1 bg-white/40 rotate-45"></span> Node.js & Express</li>
                    <li className="flex items-center gap-4 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold"><span className="w-1 h-1 bg-white/40 rotate-45"></span> PostgreSQL</li>
                    <li className="flex items-center gap-4 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold"><span className="w-1 h-1 bg-white/40 rotate-45"></span> Supabase / Firebase</li>
                    <li className="flex items-center gap-4 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold"><span className="w-1 h-1 bg-white/40 rotate-45"></span> Web Architecture</li>
                  </ul>
                </div>
             </motion.div>

             {/* Desktop header */}
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="hidden lg:flex flex-col justify-center items-end text-right">
                <p className="text-primary text-[10px] tracking-[0.4em] uppercase font-bold mb-8 flex items-center gap-6">
                   The Arsenal <span className="w-24 h-[2px] bg-primary/80"></span>
                </p>
                <h2 className="font-serif text-[7rem] xl:text-[9rem] leading-[0.8] tracking-tighter text-white uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                   TOOLS OF <br/><span className="text-gray-300 italic font-light drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">SURVIVAL</span>
                </h2>
             </motion.div>
          </div>
        </section>

        {/* Philosophy Section - The Abyss */}
        <section id="philosophy" className="relative min-h-screen w-full flex items-center justify-center py-24 overflow-hidden bg-[#030303] border-t border-primary/20">
          <div className="absolute inset-0 z-0 opacity-70">
             <img src="/berserk-guts-black-3840x2160-13632.jpg" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1598284643037-cc74bcde8a08?q=80&w=2000&auto=format&fit=crop"; }} alt="Black & White Berserk" className="w-full h-full object-cover object-center grayscale mix-blend-screen opacity-80 filter contrast-[1.4]" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/90" />
             <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black/90" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
          </div>

          <div className="relative z-10 max-w-screen-xl px-6 md:px-12 text-center flex flex-col items-center">
             <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="flex flex-col items-center">
                {/* Brand of Sacrifice minimal geometric interpretation */}
                <div className="relative w-8 h-12 mb-10 opacity-80 flex flex-col items-center justify-center">
                   <div className="w-[2px] h-full bg-primary/80 absolute"></div>
                   <div className="w-6 h-[2px] bg-primary/80 absolute top-2 rotate-45 transform origin-left"></div>
                   <div className="w-6 h-[2px] bg-primary/80 absolute top-2 -rotate-45 transform origin-right"></div>
                   <div className="w-4 h-[2px] bg-primary/80 absolute top-6 rotate-45 transform origin-left"></div>
                   <div className="w-4 h-[2px] bg-primary/80 absolute top-6 -rotate-45 transform origin-right"></div>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl leading-[1.05] md:leading-[1.05] tracking-tighter max-w-5xl text-white mb-10 md:mb-16 drop-shadow-[0_5px_15px_rgba(0,0,0,1)] uppercase mix-blend-screen">
                   "HE WHO FIGHTS WITH MONSTERS MIGHT TAKE CARE LEST HE THEREBY BECOME A MONSTER. AND IF YOU GAZE FOR LONG INTO AN ABYSS, THE ABYSS GAZES ALSO INTO YOU."
                </h2>
                <div className="h-20 md:h-32 w-[1px] bg-gradient-to-b from-primary via-primary/50 to-transparent mx-auto mb-10 md:mb-12"></div>
                <p className="text-gray-300 font-serif max-w-2xl mx-auto text-lg md:text-xl leading-relaxed selection:bg-white/10 bg-black/90 px-8 py-10 border border-white/10 drop-shadow-lg backdrop-blur-md">
                  Coding is a struggle against entropy. Bugs, legacy systems, and overengineering are the apostles of our era. True mastery lies not in avoiding the struggle, but in walking fiercely into the darkness with a blade forged of logic, patience, and unyielding will.
                </p>
             </motion.div>
          </div>
        </section>

        {/* Dynamic Professional Contact Section - The Pact */}
        <section id="contact" className="relative w-full min-h-screen py-24 md:py-40 bg-black border-t border-white/5 overflow-hidden flex flex-col justify-center items-center">
           <div className="absolute inset-0 z-0 bg-transparent flex justify-center items-center">
               <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(255,255,255,0.01)_1px,rgba(255,255,255,0.01)_2px)] pointer-events-none opacity-50 mix-blend-overlay border-none"></div>
           </div>

           <div className="relative z-10 w-full max-w-screen-xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="flex flex-col">
                 <p className="text-primary text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold mb-6 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-primary"></span> Signal The Smoke
                 </p>
                 <h2 className="font-serif text-[4.5rem] sm:text-6xl lg:text-[7rem] text-white tracking-tighter mb-6 md:mb-8 leading-[0.85] uppercase">
                    INITIATE <br/><span className="text-primary italic font-light drop-shadow-[0_0_15px_rgba(155,0,0,0.5)]">CONTACT</span>
                 </h2>
                 <p className="text-gray-500 font-light mb-12 max-w-md text-sm md:text-base leading-relaxed">
                    Looking to construct a sanctuary out of lines of code, or just wish to share a tale of struggle? My comms are open.
                 </p>

                 <div className="flex flex-wrap gap-4 sm:gap-6 mb-16">
                    <a href="mailto:omeriletisimportfolyo@gmail.com" className="w-14 h-14 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all group bg-black hover:bg-primary/5" title="E-mail" target="_blank" rel="noreferrer">
                       <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://github.com/sandrotonal" className="w-14 h-14 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all group bg-black hover:bg-primary/5" title="GitHub" target="_blank" rel="noreferrer">
                       <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://x.com/gucluyumhe" className="w-14 h-14 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all group bg-black hover:bg-primary/5" title="Twitter" target="_blank" rel="noreferrer">
                       <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://www.instagram.com/00mer04/" className="w-14 h-14 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all group bg-black hover:bg-primary/5" title="Instagram" target="_blank" rel="noreferrer">
                       <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://t.me/islamakhachev" className="w-14 h-14 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all group bg-black hover:bg-primary/5" title="Telegram" target="_blank" rel="noreferrer">
                       <Send className="w-5 h-5 group-hover:scale-110 transition-transform -ml-1" />
                    </a>
                 </div>

                 <div className="inline-block mt-auto">
                    <a 
                       href="https://gucluyumhe.dev" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="liquid-glass border border-primary/40 hover:border-primary text-white px-8 py-5 md:px-12 md:py-6 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold flex items-center justify-between w-fit transition-all duration-500 hover:bg-primary/20 group"
                    >
                       <span>Enter The Sanctuary</span>
                       <ArrowUpRight className="ml-8 w-4 h-4 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                 </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} className="bg-black/80 border border-white/5 p-8 md:p-12 relative">
                 {/* Brutalist accents */}
                 <div className="absolute top-0 left-0 w-4 h-[2px] bg-primary"></div>
                 <div className="absolute top-0 left-0 w-[2px] h-4 bg-primary"></div>
                 <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-primary"></div>
                 <div className="absolute bottom-0 right-0 w-[2px] h-4 bg-primary"></div>

                 <form ref={form} className="flex flex-col space-y-10" onSubmit={sendEmail}>
                    <div className="flex flex-col space-y-3">
                       <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-primary font-bold">Subject Name</label>
                       <input type="text" id="name" name="name" required className="bg-transparent border-b border-white/20 focus:border-primary text-white py-2 text-sm md:text-base outline-none transition-colors rounded-none placeholder:text-gray-700" placeholder="e.g. Guts" />
                    </div>
                    <div className="flex flex-col space-y-3">
                       <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-primary font-bold">Comm Link (Email)</label>
                       <input type="email" id="email" name="email" required className="bg-transparent border-b border-white/20 focus:border-primary text-white py-2 text-sm md:text-base outline-none transition-colors rounded-none placeholder:text-gray-700" placeholder="sword@midland.net" />
                    </div>
                    <div className="flex flex-col space-y-3">
                       <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-primary font-bold">Message</label>
                       <textarea id="message" name="message" rows={4} required className="bg-transparent border-b border-white/20 focus:border-primary text-white py-2 text-sm md:text-base outline-none transition-colors resize-none rounded-none placeholder:text-gray-700" placeholder="We form an alliance..."></textarea>
                    </div>
                    <button type="submit" disabled={isSending} className="bg-white/5 hover:bg-primary/10 disabled:opacity-50 text-white border border-white/10 hover:border-primary/50 uppercase tracking-[0.3em] text-[10px] font-bold py-6 transition-all mt-4">
                       {isSending ? "Dispatching..." : "Dispatch Signal"}
                    </button>
                 </form>
              </motion.div>
           </div>
        </section>

        {/* Footer */}
        <footer className="relative w-full bg-[#000000] pt-20 pb-12 border-t border-primary/20 flex flex-col items-center overflow-hidden">
          {/* Arkaplan Tabandan Gelen Kırmızımsı Dokunuş */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(155,0,0,0.1)_0%,transparent_50%)] pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-screen-xl px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-16 md:mb-8">
            
            {/* Sol: Navigasyon Linkleri (Mobil: Orta) */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <span className="text-primary text-[10px] tracking-[0.3em] font-bold uppercase mb-2 whitespace-nowrap">The Path</span>
              <a href="#hero" className="text-xs md:text-sm text-gray-400 hover:text-white uppercase tracking-widest transition-colors w-fit text-center md:text-left">Home</a>
              <a href="#intro" className="text-xs md:text-sm text-gray-400 hover:text-white uppercase tracking-widest transition-colors w-fit text-center md:text-left">The Protagonist</a>
              <a href="#tech" className="text-xs md:text-sm text-gray-400 hover:text-white uppercase tracking-widest transition-colors w-fit text-center md:text-left">The Blades</a>
              <a href="#philosophy" className="text-xs md:text-sm text-gray-400 hover:text-white uppercase tracking-widest transition-colors w-fit text-center md:text-left">The Abyss</a>
            </div>

            {/* Sağ: İletişim & Yukarı Dön (Mobil: Orta) */}
            <div className="flex flex-col items-center md:items-end space-y-6">
              <div className="flex flex-col items-center md:items-end space-y-4">
                <span className="text-primary text-[10px] tracking-[0.3em] font-bold uppercase pt-2 md:pt-0">Comms</span>
                {/* Sosyal Medya İkonları (Footer) */}
                <div className="flex flex-wrap justify-center md:justify-end gap-4">
                  <a href="mailto:omeriletisimportfolyo@gmail.com" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all bg-black hover:bg-primary/5" title="E-mail" target="_blank" rel="noreferrer">
                     <Mail className="w-4 h-4" />
                  </a>
                  <a href="https://github.com/sandrotonal" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all bg-black hover:bg-primary/5" title="GitHub" target="_blank" rel="noreferrer">
                     <Github className="w-4 h-4" />
                  </a>
                  <a href="https://x.com/gucluyumhe" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all bg-black hover:bg-primary/5" title="Twitter" target="_blank" rel="noreferrer">
                     <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://www.instagram.com/00mer04/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all bg-black hover:bg-primary/5" title="Instagram" target="_blank" rel="noreferrer">
                     <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://t.me/islamakhachev" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all bg-black hover:bg-primary/5" title="Telegram" target="_blank" rel="noreferrer">
                     <Send className="w-4 h-4 -ml-0.5" />
                  </a>
                </div>
              </div>
              
              {/* Sayfa En Üstüne Kaydırma Butonu */}
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-8 flex items-center gap-2 text-xs md:text-sm text-white/50 hover:text-white uppercase tracking-widest transition-colors w-fit group">
                <ArrowUpRight className="w-4 h-4 text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                Return to Surface
              </button>
            </div>
          </div>

          {/* Alt: Copyright */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-screen-xl px-6 md:px-12 text-[9px] md:text-[10px] font-bold text-gray-600 tracking-[0.3em] uppercase border-t border-white/10 pt-8 mt-4 mb-4 text-center">
            <div>© {new Date().getFullYear()} ÖMER ÖZBAY. THE STRUGGLER.</div>
          </div>
        </footer>
      </div>
    </>
  );
}