import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Sparkles, Heart, Gift, ArrowRight } from 'lucide-react';

interface BirthdayWishProps {
  onComplete: () => void;
  nickname: string;
}

export default function BirthdayWish({ onComplete, nickname }: BirthdayWishProps) {
  const [candles, setCandles] = useState<boolean[]>(Array(19).fill(true));
  const [micGranted, setMicGranted] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [blowLevel, setBlowLevel] = useState<number>(0);
  const [isBlownOut, setIsBlownOut] = useState<boolean>(false);
  const [showLetter, setShowLetter] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; size: number; delay: number }>>([]);
  const [wishMade, setWishMade] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const javascriptNodeRef = useRef<ScriptProcessorNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Generate Confetti when candles are blown
  const triggerConfetti = () => {
    const colors = ['#FF8A80', '#FF80AB', '#FF4081', '#F50057', '#F48FB1', '#FFF59D', '#A5D6A7', '#90CAF9'];
    const newConfetti = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      color: colors[Math.random() * colors.length | 0],
      size: Math.random() * 8 + 6,
      delay: Math.random() * 2,
    }));
    setConfetti(newConfetti);
  };

  // Start microphone listening
  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicGranted(true);
      setIsListening(true);

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyser = audioCtx.createAnalyser();
      const microphone = audioCtx.createMediaStreamSource(stream);
      const javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioCtx.destination);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
      microphoneRef.current = microphone;
      javascriptNodeRef.current = javascriptNode;

      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;
        const length = array.length;
        for (let i = 0; i < length; i++) {
          values += array[i];
        }
        const average = values / length;
        // Map average volume (0 to 120) to blow level (0 to 100)
        const mappedLevel = Math.min(100, Math.round((average / 80) * 100));
        setBlowLevel(mappedLevel);
      };
    } catch (err) {
      console.warn("Microphone access denied or failed:", err);
      setMicGranted(false);
      setIsListening(false);
    }
  };

  // Stop microphone
  const stopMic = () => {
    if (javascriptNodeRef.current) javascriptNodeRef.current.disconnect();
    if (microphoneRef.current) {
      const stream = microphoneRef.current.mediaStream;
      stream.getTracks().forEach(track => track.stop());
      microphoneRef.current.disconnect();
    }
    if (analyserRef.current) analyserRef.current.disconnect();
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setIsListening(false);
    setBlowLevel(0);
  };

  // Handle Blow detection
  useEffect(() => {
    if (isListening && blowLevel > 55 && !isBlownOut) {
      // Extinguish candles gradually
      const interval = setInterval(() => {
        setCandles(prev => {
          const litIndices = prev.map((lit, idx) => lit ? idx : -1).filter(idx => idx !== -1);
          if (litIndices.length === 0) {
            clearInterval(interval);
            return prev;
          }
          // Extinguish 2-3 candles at a time
          const next = [...prev];
          const countToExtinguish = Math.min(litIndices.length, 3);
          for (let i = 0; i < countToExtinguish; i++) {
            const randomLitIdx = litIndices[Math.floor(Math.random() * litIndices.length)];
            next[randomLitIdx] = false;
          }
          return next;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [blowLevel, isListening, isBlownOut]);

  // Check if all candles blown
  useEffect(() => {
    const activeCount = candles.filter(lit => lit).length;
    if (activeCount === 0 && !isBlownOut) {
      setIsBlownOut(true);
      stopMic();
      triggerConfetti();
      setTimeout(() => {
        setShowLetter(true);
      }, 1200);
    }
  }, [candles, isBlownOut]);

  // Manual fallback to blow out candles
  const handleManualBlow = () => {
    setCandles(prev => prev.map(() => false));
  };

  // Clean up mic on unmount
  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-tr from-[#FEF2F2] via-[#FFFDF9] to-[#ECFDF5] flex flex-col items-center justify-center py-10 px-4 overflow-hidden select-none">
      
      {/* Falling Confetti Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute rounded-full"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              backgroundColor: c.color,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [`${c.x - 5}%`, `${c.x + 5}%`],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              delay: c.delay,
              ease: 'easeOut',
              repeat: 0,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showLetter ? (
          <motion.div
            key="cake-screen"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full flex flex-col items-center text-center z-10"
          >
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-2"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 border border-pink-200/60 rounded-full text-pink-600 font-semibold text-xs tracking-wider uppercase mb-3">
                <Sparkles size={12} className="animate-pulse text-amber-500" />
                <span>Make A 19th Birthday Wish</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-pink-700/90 font-bold tracking-tight">
                Your Digital Cake, {nickname}! 🎂
              </h2>
              <p className="text-gray-500 text-sm mt-2 font-sans max-w-sm mx-auto leading-relaxed">
                Before stepping into our secret memory garden, close your eyes, make your deepest wish, and blow out the 19 magical candles!
              </p>
            </motion.div>

            {/* Candle blowing status feedback */}
            <div className="my-5 min-h-[40px] flex items-center justify-center">
              {isListening ? (
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-wider animate-pulse">
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                    <span>Mic Listening... Blow HARD! 💨</span>
                  </div>
                  {/* Micro volume bar */}
                  <div className="w-48 h-2 bg-pink-100 rounded-full overflow-hidden border border-pink-200/30 mt-1">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                      style={{ width: `${blowLevel}%` }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-pink-500 font-medium tracking-wide">
                  🕯️ Click each candle, use your mic, or tap below to blow!
                </p>
              )}
            </div>

            {/* THE CAKE CONTAINER */}
            <div className="relative w-72 h-80 flex flex-col items-center justify-end mb-8 mt-2 select-none">
              
              {/* THE 19 CANDLES */}
              <div className="absolute top-0 inset-x-0 h-28 flex flex-wrap justify-center items-end gap-x-2.5 gap-y-1 px-4 z-10 pointer-events-auto">
                {candles.map((lit, idx) => (
                  <div 
                    key={idx} 
                    className="relative flex flex-col items-center cursor-pointer select-none group"
                    onClick={() => {
                      setCandles(prev => {
                        const next = [...prev];
                        next[idx] = false;
                        return next;
                      });
                    }}
                    title="Click to blow out this candle!"
                  >
                    {/* Candle Flame */}
                    <AnimatePresence>
                      {lit && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.15, 0.95, 1.1, 1] }}
                          exit={{ 
                            y: -15, 
                            opacity: 0, 
                            scale: 0.5,
                            transition: { duration: 0.4 } 
                          }}
                          className="absolute -top-7 w-3.5 h-6 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                          style={{
                            transformOrigin: 'bottom center',
                            animation: `flicker ${0.4 + Math.random() * 0.4}s ease-in-out infinite alternate`
                          }}
                        >
                          {/* Inside light core */}
                          <div className="w-1 h-3 rounded-full bg-white opacity-80 mx-auto mt-1" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Smoke trail when blown out */}
                    {!lit && (
                      <motion.div
                        initial={{ opacity: 0.8, y: -5, x: 0 }}
                        animate={{ opacity: 0, y: -25, x: (Math.random() - 0.5) * 15 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="absolute -top-6 w-1.5 h-5 bg-gray-400/50 rounded-full blur-[2px]"
                      />
                    )}

                    {/* Candle stick */}
                    <div className={`w-2.5 h-12 rounded-t-sm shadow-sm transition-all duration-300 ${
                      idx % 3 === 0 ? 'bg-gradient-to-b from-pink-300 to-pink-400' :
                      idx % 3 === 1 ? 'bg-gradient-to-b from-amber-200 to-amber-300' :
                      'bg-gradient-to-b from-teal-300 to-teal-400'
                    } ${!lit ? 'brightness-75' : ''}`}>
                      {/* Spirals */}
                      <div className="w-full h-1 bg-white/40 rotate-12 mt-2" />
                      <div className="w-full h-1 bg-white/40 rotate-12 mt-2" />
                    </div>
                  </div>
                ))}
              </div>

              {/* 3D CAKE LAYERS */}
              {/* TOP LAYER */}
              <div className="w-44 h-14 bg-gradient-to-r from-pink-400 to-pink-500 rounded-t-2xl shadow-md border-t border-white/40 flex flex-col justify-between overflow-hidden relative z-0">
                {/* Dripping frosting */}
                <div className="flex justify-between w-full">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-5 h-5 bg-pink-100 rounded-b-full -mt-1 shadow-sm shrink-0" 
                      style={{ height: `${8 + (i % 3 === 0 ? 8 : i % 3 === 1 ? 4 : 11)}px` }}
                    />
                  ))}
                </div>
                {/* Small white strawberry decorative dots */}
                <div className="flex justify-around px-4 mb-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-inner animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>

              {/* MIDDLE LAYER */}
              <div className="w-56 h-16 bg-gradient-to-r from-amber-100 to-amber-200/90 rounded-t-xl shadow-md flex flex-col justify-between overflow-hidden relative border-t border-amber-300/20">
                {/* Cream sprinkles */}
                <div className="flex justify-around pt-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full ${
                        i % 2 === 0 ? 'bg-pink-400' : 'bg-teal-400'
                      }`} 
                    />
                  ))}
                </div>
                {/* Peach cream band */}
                <div className="w-full h-4 bg-gradient-to-r from-rose-300/80 to-pink-400/80" />
              </div>

              {/* BASE LAYER */}
              <div className="w-68 h-20 bg-gradient-to-r from-pink-100 to-pink-200 rounded-t-xl shadow-lg border-t border-pink-300/20 flex flex-col justify-between overflow-hidden relative">
                {/* Sprinkles on base */}
                <div className="flex justify-between w-full px-6 pt-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 h-3 bg-amber-400 rounded-full rotate-45 transform" 
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    />
                  ))}
                </div>
                <div className="text-center font-serif text-lg font-bold text-pink-700/85 mb-1.5 tracking-wide">
                  HAPPY 19TH BIRTHDAY
                </div>
              </div>

              {/* CAKE STAND */}
              <div className="w-72 h-4 bg-slate-300/80 rounded-full shadow-md border-b border-slate-400/40" />
              <div className="w-28 h-5 bg-gradient-to-b from-slate-200 to-slate-300 rounded-b-md shadow-inner" />
            </div>

            {/* CONTROLS */}
            <div className="flex flex-col gap-3 w-full max-w-xs z-10">
              <div className="flex gap-2">
                <button
                  id="grant-mic-btn"
                  onClick={isListening ? stopMic : startMic}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-full font-sans text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-300 cursor-pointer ${
                    isListening 
                      ? 'bg-rose-500 text-white hover:bg-rose-600 ring-2 ring-rose-200' 
                      : 'bg-white hover:bg-pink-50 border border-pink-200 text-pink-600'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff size={15} />
                      <span>Stop Mic</span>
                    </>
                  ) : (
                    <>
                      <Mic size={15} />
                      <span>Blow with Mic</span>
                    </>
                  )}
                </button>

                <button
                  id="instant-blow-btn"
                  onClick={handleManualBlow}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles size={15} />
                  <span>Blow All!</span>
                </button>
              </div>
              <span className="text-[10px] text-gray-400 tracking-wider">
                Tip: If mic doesn't trigger, click 'Blow All!' or click individual candles.
              </span>
            </div>
          </motion.div>
        ) : (
          /* HIDDEN BIRTHDAY LOVE LETTER FADES INTO VIEW */
          <motion.div
            key="wish-letter"
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 22, stiffness: 90 }}
            className="max-w-xl w-full bg-[#FAF6F0] rounded-3xl p-6 md:p-8 shadow-[0_25px_55px_rgba(219,39,119,0.18)] border border-amber-100/70 relative z-10 text-center flex flex-col justify-between overflow-hidden"
          >
            {/* Elegant Top Border */}
            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-pink-300 via-amber-200 to-emerald-300" />
            
            {/* Heart floating accents in background */}
            <div className="absolute top-8 left-8 text-pink-200/40 select-none pointer-events-none">
              <Heart size={44} className="fill-pink-100/30" />
            </div>
            <div className="absolute bottom-8 right-8 text-pink-200/40 select-none pointer-events-none">
              <Heart size={54} className="fill-pink-100/30" />
            </div>

            <div>
              {/* Confetti celebration sticker */}
              <motion.div 
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto shadow-md mb-5"
              >
                <Gift size={26} className="text-white animate-bounce" style={{ animationDuration: '2s' }} />
              </motion.div>

              <h2 className="font-serif text-3xl text-pink-700/90 font-bold mb-4">
                Your 19th Birthday Wish is Sent! 💖✨
              </h2>

              <p className="font-cursive text-2xl text-amber-800 font-semibold mb-6">
                "Dear My Beautiful Aalu..."
              </p>

              <div className="font-sans text-gray-700 leading-relaxed text-sm md:text-base space-y-4 text-left max-w-md mx-auto max-h-[300px] overflow-y-auto pr-2 custom-scrollbar bg-amber-50/40 p-5 rounded-2xl border border-amber-100/50">
                <p>
                  As you blew out your candles, the universe heard the beat of my heart wishing for nothing but your absolute happiness, success, and beautiful smiles.
                </p>
                <p>
                  At 19, you are blooming into the most beautiful lily this world has ever seen—so full of grace, passion, and kindness. Every single day, your simple presence in my life is a reminder of how incredibly lucky I am.
                </p>
                <p>
                  I promise to always be the one watering our little garden, shielding you from the harsh winds, and holding you close whenever you need warmth. 
                </p>
                <p>
                  We are engaged, my love, and this birthday marks the start of another gorgeous year together as we prepare for a lifetime of beautiful moments side by side.
                </p>
                <p className="font-cursive text-xl text-pink-600 font-bold text-center pt-2">
                  - Yours Forever, Baby 💍🥔
                </p>
              </div>
            </div>

            {/* BUTTON TO UNLOCK THE MAIN GARDEN */}
            <div className="mt-8">
              <button
                id="enter-garden-btn"
                onClick={onComplete}
                className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-sans text-sm font-bold uppercase tracking-wider shadow-[0_10px_25px_rgba(244,143,177,0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer group"
              >
                <span>Enter Our Magical Garden</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
