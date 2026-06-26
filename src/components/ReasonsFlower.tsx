import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Smile, Gift, Star, Volume2 } from 'lucide-react';

interface Reason {
  id: number;
  title: string;
  text: string;
  icon: string;
}

const reasonsData: Reason[] = [
  { id: 1, icon: "💖", title: "Your Radiant Smile", text: "Your smile immediately lights up my entire day. It's my absolute favorite view in the whole universe." },
  { id: 2, icon: "👃", title: "Cute Nose Scrunch", text: "The cute, adorable nose scrunch you do whenever you are teasing me. It makes my heart melt instantly!" },
  { id: 3, icon: "📞", title: "Your Comforting Voice", text: "How warm, comfortable, and safe I feel just hearing you talk. It is my ultimate peace after any chaotic day." },
  { id: 4, icon: "🤝", title: "Our Tight Handholds", text: "The way you hold my hand tightly, as if you never want to let go. It makes me feel so incredibly secure." },
  { id: 5, icon: "🌸", title: "Your Generous Heart", text: "Your pure, selfless, loving heart. You always wish the best for everyone and spread so much kindness." },
  { id: 6, icon: "🌙", title: "Midnight Silliness", text: "Our cozy midnight conversations, funny inside jokes, and silly laughter that only we understand." },
  { id: 7, icon: "😂", title: "Carefree Laughs", text: "How breathtakingly beautiful you look when you're laughing out loud, completely happy and carefree." },
  { id: 8, icon: "🥺", title: "Your Adorable Pout", text: "That squishy, cute pout you make when you don't get your way. I can't help but smile and give in!" },
  { id: 9, icon: "🛡️", title: "Unwavering Support", text: "Your incredible patience and support. You are always my pillar of strength when I feel down." },
  { id: 10, icon: "🏡", title: "A Safe Haven", text: "How you represent my ultimate safe place. Being near you makes all the world's noise fade away." },
  { id: 11, icon: "🎓", title: "Your Brilliant Dreams", text: "How passionate, intelligent, and dedicated you are about your goals and building a bright future." },
  { id: 12, icon: "🤔", title: "Thinking Expressions", text: "The cute facial expressions you make when you are deeply focused or thinking about something." },
  { id: 13, icon: "✨", title: "Eyes Shining for Us", text: "That beautiful, starry shine in your eyes whenever we talk about our future dreams and 'us'." },
  { id: 14, icon: "🥔", title: "My Favorite Aalu", text: "Your delicious, warm, comforted, and sweet personality—you're my cozy little Aalu, my happy place!" },
  { id: 15, icon: "🌹", title: "Incredible Kindness", text: "Your gentle soul that treats everyone with deep respect, warmth, and genuine compassion." },
  { id: 16, icon: "💆", title: "Calming My Mind", text: "How you always know exactly what to say to soothe my busy mind and make everything feel okay." },
  { id: 17, icon: "🍷", title: "Quiet Romantic Dates", text: "Our quiet, sweet dates, sharing whispers, holding each other, and simply enjoying our presence." },
  { id: 18, icon: "🎯", title: "Believing in Me", text: "Your constant belief in me. You inspire me to grow, be better, and strive for the best for us." },
  { id: 19, icon: "💍", title: "Our Engagement Promise", text: "The promise we share as fiancé and fiancée. I get to spend my entire lifetime loving and spoiling you! 💍💖" }
];

export default function ReasonsFlower() {
  const [clickedPetals, setClickedPetals] = useState<number[]>([]);
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);

  const handlePetalClick = (reason: Reason) => {
    if (!clickedPetals.includes(reason.id)) {
      setClickedPetals(prev => [...prev, reason.id]);
    }
    setSelectedReason(reason);
  };

  const isCompleted = clickedPetals.length === 19;

  // Render a petal on a concentric ring:
  // Ring indices: 
  // - Inner ring: 5 petals (IDs: 1 to 5)
  // - Middle ring: 6 petals (IDs: 6 to 11)
  // - Outer ring: 8 petals (IDs: 12 to 19)
  const getPetalPosition = (id: number) => {
    let radius = 110; // default for outer
    let angle = 0;
    let rotation = 0;

    if (id <= 5) {
      // Inner ring: 5 petals
      radius = 45;
      const index = id - 1;
      angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
      rotation = (index * 360) / 5;
    } else if (id <= 11) {
      // Middle ring: 6 petals
      radius = 80;
      const index = id - 6;
      angle = (index * 2 * Math.PI) / 6 - Math.PI / 2 + Math.PI / 6;
      rotation = (index * 360) / 6 + 30;
    } else {
      // Outer ring: 8 petals
      radius = 115;
      const index = id - 12;
      angle = (index * 2 * Math.PI) / 8 - Math.PI / 2 + Math.PI / 8;
      rotation = (index * 360) / 8 + 22.5;
    }

    return { radius, angle, rotation };
  };

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-[0_20px_40px_rgba(244,143,177,0.08)] border border-pink-100/40 flex flex-col items-center">
      
      {/* Title Header */}
      <div className="text-center mb-6">
        <span className="text-[10px] font-bold text-pink-500 uppercase tracking-[0.25em] flex items-center justify-center gap-1">
          <Sparkles size={11} className="text-amber-400" />
          Interactive Blooms
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-pink-700/90 font-bold mt-1">
          The "19 Reasons I Love My Aalu" Lily 🌸
        </h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto mt-1.5 leading-relaxed">
          Every layer of a Lily petal holds a piece of my heart. Click each petal to watch it bloom, glow, and reveal a special reason why I love you!
        </p>
      </div>

      {/* Flower & Panel Board layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-4">
        
        {/* LEFT/CENTER: THE INTERACTIVE FLOWER */}
        <div className="md:col-span-6 flex flex-col items-center justify-center min-h-[340px] relative">
          
          {/* Circular Progress border ring */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-pink-100/40 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[290px] h-[290px] rounded-full border-2 border-dashed border-pink-200/20" />
          </div>

          {/* FLOWER CANVAS */}
          <div className="relative w-72 h-72 flex items-center justify-center select-none">
            
            {/* RENDER THE 19 PETALS */}
            {reasonsData.map((reason) => {
              const { radius, rotation } = getPetalPosition(reason.id);
              const isClicked = clickedPetals.includes(reason.id);
              const isSelected = selectedReason?.id === reason.id;

              return (
                <motion.div
                  key={reason.id}
                  className="absolute"
                  style={{
                    transformOrigin: 'bottom center',
                    bottom: '50%',
                    transform: `rotate(${rotation}deg)`,
                    height: `${reason.id <= 5 ? '55px' : reason.id <= 11 ? '70px' : '85px'}`,
                    width: `${reason.id <= 5 ? '26px' : reason.id <= 11 ? '32px' : '38px'}`,
                  }}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  onClick={() => handlePetalClick(reason)}
                >
                  {/* Petal Graphic */}
                  <div
                    className={`w-full h-full cursor-pointer transition-all duration-500 rounded-b-none ${
                      reason.id <= 5 
                        ? 'rounded-t-[100%_120%] shadow-[0_-3px_8px_rgba(244,143,177,0.15)]' 
                        : reason.id <= 11 
                        ? 'rounded-t-[120%_140%] shadow-[0_-4px_10px_rgba(244,143,177,0.12)]' 
                        : 'rounded-t-[140%_160%] shadow-[0_-5px_12px_rgba(244,143,177,0.1)]'
                    } ${
                      isSelected
                        ? 'bg-gradient-to-t from-pink-400 via-amber-300 to-amber-200 ring-2 ring-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] z-40'
                        : isClicked
                        ? 'bg-gradient-to-t from-rose-300/80 via-pink-400/90 to-pink-200 shadow-[0_0_8px_rgba(244,143,177,0.3)]'
                        : 'bg-gradient-to-t from-pink-50 via-pink-100 to-rose-50 border border-pink-200/50 hover:bg-gradient-to-t hover:from-pink-100 hover:to-rose-100'
                    }`}
                  >
                    {/* Tiny Petal Vein details */}
                    <div className="w-[1px] h-3/5 bg-pink-300/30 mx-auto mt-2 rounded-full" />
                    
                    {/* Heart badge for clicked petals */}
                    {isClicked && (
                      <div className="absolute top-2 inset-x-0 flex justify-center text-[8px] text-pink-600">
                        {reason.id === 19 ? "💍" : "💖"}
                      </div>
                    )}

                    {/* Petal ID Label */}
                    <span className="absolute bottom-2 inset-x-0 text-center text-[9px] font-bold font-mono text-pink-700/70 pointer-events-none">
                      {reason.id}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* FLOWER CENTER (Pistil / Core) */}
            <motion.div 
              className="absolute w-12 h-12 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full border-2 border-white shadow-md flex items-center justify-center z-50 cursor-pointer"
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: isCompleted 
                  ? '0 0 25px rgba(245, 158, 11, 0.7)' 
                  : '0 0 10px rgba(245, 158, 11, 0.2)'
              }}
            >
              {isCompleted ? (
                <Gift className="text-pink-600 animate-bounce" size={20} />
              ) : (
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[10px] font-bold text-amber-900 leading-none">
                    {clickedPetals.length}
                  </span>
                  <span className="text-[7px] text-amber-800 font-bold uppercase leading-none mt-0.5">
                    / 19
                  </span>
                </div>
              )}
            </motion.div>

          </div>

          {/* Progress bar and counter */}
          <div className="mt-4 flex flex-col items-center gap-1.5 w-48">
            <div className="flex justify-between w-full font-mono text-[10px] text-gray-500">
              <span>PETALS BLOOMED</span>
              <span className="font-bold text-pink-600">{clickedPetals.length} / 19</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 border border-gray-200/50 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${(clickedPetals.length / 19) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT: PETAL DETAILS DISPLAY PANEL */}
        <div className="md:col-span-6 flex flex-col items-center justify-center w-full min-h-[300px]">
          <AnimatePresence mode="wait">
            {selectedReason ? (
              <motion.div
                key={selectedReason.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-gradient-to-tr from-rose-50/50 to-pink-50/40 rounded-3xl p-6 border border-pink-100/60 shadow-inner flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl p-2 bg-white rounded-2xl shadow-sm border border-pink-100/30">
                      {selectedReason.icon}
                    </span>
                    <div>
                      <span className="font-mono text-[9px] font-bold text-pink-500 uppercase tracking-widest block">
                        Reason #{selectedReason.id}
                      </span>
                      <h4 className="font-serif text-lg md:text-xl text-pink-800 font-bold">
                        {selectedReason.title}
                      </h4>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-gray-700 leading-relaxed bg-white/75 p-4 rounded-2xl border border-pink-50 shadow-sm">
                    "{selectedReason.text}"
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] text-pink-500 font-semibold tracking-wider uppercase">
                  <span className="flex items-center gap-1">
                    <Heart size={10} className="fill-pink-500" />
                    <span>Always & Forever</span>
                  </span>
                  <span>Petal #{selectedReason.id} clicked</span>
                </div>
              </motion.div>
            ) : (
              /* Instructions/Default State */
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full bg-[#FCFBF8] border border-dashed border-pink-200/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[220px] select-none"
              >
                <div className="w-14 h-14 bg-pink-50 rounded-full flex items-center justify-center text-pink-400 mb-3.5 border border-pink-100">
                  <Star size={24} className="animate-spin text-amber-400" style={{ animationDuration: '8s' }} />
                </div>
                <p className="font-serif text-md text-pink-800 font-bold">
                  Tap any petal to start!
                </p>
                <p className="font-sans text-xs text-gray-400 max-w-xs mt-1.5 leading-relaxed">
                  Clicking each petal on the Lily will gather and complete "Aalu's Perfect Bouquet," unlocking a sweet surprise when all 19 are clicked!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BUNDLE ACHIEVEMENT CARD */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full bg-gradient-to-r from-amber-500 to-rose-500 text-white p-5 rounded-3xl shadow-lg mt-5 text-center flex flex-col items-center border border-amber-400 relative overflow-hidden"
              >
                {/* Gold glitter effects */}
                <div className="absolute top-2 left-2 text-white/30"><Sparkles size={16} /></div>
                <div className="absolute bottom-2 right-2 text-white/30"><Sparkles size={16} /></div>

                <h4 className="font-serif text-md font-bold tracking-wide flex items-center gap-1.5 uppercase text-yellow-100">
                  <Gift size={16} className="animate-bounce" />
                  <span>Bouquet Completed! 💐</span>
                </h4>
                <p className="font-cursive text-xl text-white mt-1">
                  You have bloomed all 19 petals of love, my beautiful Aalu!
                </p>
                <p className="font-sans text-[11px] text-yellow-50/90 leading-normal mt-2 max-w-sm">
                  "You are the most precious flower in my garden. Thank you for filling my life with sweet fragrances, bright smiles, and pure happiness. I am yours forever."
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
