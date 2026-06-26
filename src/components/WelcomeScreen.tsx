import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Music } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface WelcomeScreenProps {
  onOpen: () => void;
  nickname: string;
}

export default function WelcomeScreen({ onOpen, nickname }: WelcomeScreenProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number; type: 'petal' | 'heart' | 'potato' }>>([]);

  useEffect(() => {
    // Generate 30 floating particles
    const items: Array<'petal' | 'heart' | 'potato'> = ['petal', 'heart', 'potato'];
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 18 + 12, // size in px
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      type: items[i % items.length]
    }));
    setParticles(newParticles);
  }, []);

  const handleStart = () => {
    // Initialize audio context and play both music box + instrumental track
    romanticAudio.initContext();
    romanticAudio.startMp3();
    romanticAudio.playMusicBox();
    
    // Call the parent open action
    onOpen();
  };

  return (
    <div id="welcome-screen" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-tr from-[#FEF4F4] via-[#FDF5E6] to-[#EBF3E8] p-4 select-none">
      
      {/* Decorative Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: 0.35,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: ['-5vw', '5vw'],
              rotate: [0, 360],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          >
            {p.type === 'petal' && (
              // Beautiful Custom Lily Petal SVG
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C12 2 15 8 18 11C21 14 20 18 16 20C12 22 12 18 12 18C12 18 12 22 8 20C4 18 3 14 6 11C9 8 12 2 12 2Z"
                  fill="#F8BBD0"
                  stroke="#E0F2F1"
                  strokeWidth="1"
                />
                <path d="M12 8C12 8 13 12 15 13" stroke="#F48FB1" strokeWidth="0.8" strokeLinecap="round" />
                <path d="M12 8C12 8 11 12 9 13" stroke="#F48FB1" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            )}
            {p.type === 'heart' && (
              <Heart size={p.size} className="text-pink-300 fill-pink-200" />
            )}
            {p.type === 'potato' && (
              // Blushing Potato SVG
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="12" rx="9" ry="7" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="1" />
                <circle cx="9" cy="11" r="1" fill="#4E342E" />
                <circle cx="15" cy="11" r="1" fill="#4E342E" />
                <circle cx="7.5" cy="12" r="1.5" fill="#FF8A80" opacity="0.6" />
                <circle cx="16.5" cy="12" r="1.5" fill="#FF8A80" opacity="0.6" />
                <path d="M11 13.5Q12 14.5 13 13.5" stroke="#4E342E" strokeWidth="1" strokeLinecap="round" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating subtle bokeh rings */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-100 opacity-20 filter blur-3xl -top-12 -left-12 pointer-events-none"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-emerald-100 opacity-20 filter blur-3xl -bottom-12 -right-12 pointer-events-none"></div>

      {/* Beautiful Welcome Card */}
      <motion.div
        id="welcome-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="z-10 max-w-md w-full text-center bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(244,143,177,0.15)] border border-pink-100/50 flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Sparkles / Gold elements */}
        <div className="absolute top-4 left-4 text-amber-400 opacity-60">
          <Sparkles size={20} className="animate-pulse" />
        </div>
        <div className="absolute bottom-4 right-4 text-pink-400 opacity-60">
          <Sparkles size={24} className="animate-pulse" />
        </div>

        {/* Delicate Lily Floral Ring Header */}
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 border-2 border-dashed border-pink-200/60 rounded-full flex items-center justify-center"
          >
            {/* SVG decorative lilies wrapping around */}
            <svg className="absolute w-full h-full -inset-0" viewBox="0 0 100 100">
              <path d="M50,10 C52,15 48,15 50,10" stroke="#C8E6C9" strokeWidth="2" fill="none" />
              <circle cx="50" cy="8" r="3" fill="#F8BBD0" />
              <path d="M10,50 C15,52 15,48 10,50" stroke="#C8E6C9" strokeWidth="2" fill="none" />
              <circle cx="8" cy="50" r="3" fill="#F8BBD0" />
              <path d="M50,90 C48,85 52,85 50,90" stroke="#C8E6C9" strokeWidth="2" fill="none" />
              <circle cx="50" cy="92" r="3" fill="#F8BBD0" />
              <path d="M90,50 C85,48 85,52 90,50" stroke="#C8E6C9" strokeWidth="2" fill="none" />
              <circle cx="92" cy="50" r="3" fill="#F8BBD0" />
            </svg>
            <Heart size={36} className="text-pink-400 fill-pink-100/50 animate-heartbeat" />
          </motion.div>
        </div>

        {/* Text Details */}
        <h2 className="font-serif text-2xl text-pink-600/90 font-medium tracking-wide mb-2">
          A Magical Garden
        </h2>
        
        <p className="font-cursive text-5xl text-amber-700/80 mb-6 font-semibold select-none leading-relaxed">
          For My Beautiful {nickname}
        </p>

        <p className="font-sans text-sm text-gray-500/90 leading-relaxed mb-8 max-w-xs">
          Step into a whimsical world filled with fresh Lilies, sweet Hearts, and your favorite Aalu. Press below to begin our birthday song.
        </p>

        {/* Romantic Trigger Button */}
        <motion.button
          id="open-with-love-btn"
          onClick={handleStart}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(244,143,177,0.4)' }}
          whileTap={{ scale: 0.98 }}
          className="relative px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-lg rounded-full shadow-[0_10px_20px_rgba(244,143,177,0.25)] flex items-center gap-2 cursor-pointer transition-all duration-300 animate-bounce"
        >
          <span>Open with Love 💖</span>
        </motion.button>

        <div className="mt-6 flex items-center gap-2 text-xs text-pink-400 font-medium">
          <Music size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
          <span>Soft Instrumental Happy Birthday Included!</span>
        </div>
      </motion.div>
    </div>
  );
}
