import React from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, Sparkles, Star, MessageCircle, Gift } from 'lucide-react';
import lilyIllustration from '../assets/images/lily_illustration_1782469268640.jpg';

interface Milestone {
  id: number;
  date: string;
  title: string;
  text: string;
  icon: React.ReactNode;
  badge: string;
}

export default function TimeCapsuleTimeline() {
  const milestones: Milestone[] = [
    {
      id: 1,
      date: "First Connection",
      title: "Our Paths Crossed ✨",
      text: "The beautiful moment our worlds collided. A simple, sweet connection that ignited a spark and changed the course of our lives forever. My heart knew instantly you were special.",
      icon: <Sparkles className="text-amber-500" size={18} />,
      badge: "First Spark"
    },
    {
      id: 2,
      date: "Our First Date",
      title: "Laughs & Sweet Conversations ☕",
      text: "Talking for hours, sharing dreams, and laughing so hard our faces hurt. It was the moment we both realized that this wasn't just a simple date—it was the start of our forever.",
      icon: <Heart className="text-rose-500 fill-rose-100 animate-pulse" size={18} />,
      badge: "First Date"
    },
    {
      id: 3,
      date: "The Potato Tease",
      title: "The Birth of 'Aalu' 🥔",
      text: "The funny day you became my sweet, squishy, comforting little Aalu! What started as a playful tease quickly became my absolute favorite word, my ultimate happy place, and my source of comfort.",
      icon: <MessageCircle className="text-amber-600" size={18} />,
      badge: "Nicknames"
    },
    {
      id: 4,
      date: "Our Confession",
      title: "Three Words, One Heart 💖",
      text: "Whispering those magical three words under the starlit sky. We promised to stay, support, tease, and love each other through all the seasons of life, locking our hearts together.",
      icon: <Star className="text-pink-500 fill-pink-100" size={18} />,
      badge: "I Love You"
    },
    {
      id: 5,
      date: "The Dream Engagement",
      title: "Our Forever Promise 💍",
      text: "The unforgettable day we slipped engagement rings onto each other's fingers. Pledging to walk together forever, engaged as soulmates, and stepping toward our happy married life.",
      icon: <span className="text-lg">💍</span>,
      badge: "Fiancé & Fiancée"
    },
    {
      id: 6,
      date: "Happy 19th Birthday!",
      title: "Celebrating My Stunning Bride-to-be 🎂",
      text: "Today! Celebrating your beautiful 19th year. Stepping into another chapter of your life, blooming brighter than any Lily. I'm so honored to spend today and every single tomorrow celebrating you.",
      icon: <Gift className="text-teal-500" size={18} />,
      badge: "Today"
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F5]/40 rounded-3xl p-6 md:p-10 border border-pink-100/30 shadow-[0_15px_35px_rgba(244,143,177,0.05)] relative overflow-hidden">
      
      {/* Decorative floral backgrounds */}
      <div className="absolute top-4 right-4 w-20 h-20 opacity-10 pointer-events-none">
        <img src={lilyIllustration} className="w-full h-full object-contain" alt="" referrerPolicy="no-referrer" />
      </div>
      <div className="absolute bottom-4 left-4 w-24 h-24 opacity-10 pointer-events-none rotate-180">
        <img src={lilyIllustration} className="w-full h-full object-contain" alt="" referrerPolicy="no-referrer" />
      </div>

      {/* Section header */}
      <div className="text-center mb-12 relative z-10">
        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.25em] flex items-center justify-center gap-1">
          <Calendar size={12} className="text-amber-600 animate-pulse" />
          Romantic Milestones
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-pink-700/90 font-bold mt-1">
          The "Aalu & Baby" Time Capsule Timeline 🕰️
        </h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1.5 leading-relaxed">
          Scroll down memory lane to see the beautiful milestones we've built, alternating with love, leading to our stunning engagement and today!
        </p>
      </div>

      {/* Timeline flow */}
      <div className="relative max-w-2xl mx-auto z-10">
        
        {/* Vertical Center Line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-pink-200 via-amber-200 to-rose-200 rounded-full" />

        {/* Milestone Cards */}
        <div className="flex flex-col gap-10">
          {milestones.map((m, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={m.id} 
                className={`relative flex flex-col md:flex-row items-stretch w-full ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node (Marker) */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 z-20 flex items-center justify-center">
                  <motion.div
                    whileInView={{ scale: [1, 1.2, 1] }}
                    viewport={{ once: true }}
                    className="w-8 h-8 rounded-full bg-white border-2 border-pink-400 flex items-center justify-center shadow-md text-sm"
                  >
                    {m.icon}
                  </motion.div>
                </div>

                {/* Card side container */}
                <div className={`w-full md:w-[46%] pl-12 md:pl-0 ${
                  isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                }`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 90 }}
                    className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-pink-100 shadow-[0_10px_25px_rgba(244,143,177,0.06)] hover:shadow-[0_15px_35px_rgba(244,143,177,0.12)] hover:scale-[1.01] transition-all relative overflow-hidden group"
                  >
                    {/* Heart/Lily corner background decoration */}
                    <div className="absolute -top-3 -right-3 text-pink-100/20 group-hover:text-pink-100/35 transition-colors select-none pointer-events-none">
                      <Heart size={44} className="fill-pink-50/10" />
                    </div>

                    {/* Badge */}
                    <span className="inline-block text-[9px] font-bold font-mono text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2">
                      {m.badge}
                    </span>

                    {/* Date/Milestone header */}
                    <div className="flex flex-col mb-2">
                      <span className="font-mono text-xs font-bold text-amber-700">
                        {m.date}
                      </span>
                      <h4 className="font-serif text-lg text-pink-800 font-bold leading-tight mt-0.5">
                        {m.title}
                      </h4>
                    </div>

                    {/* Text description */}
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">
                      {m.text}
                    </p>
                  </motion.div>
                </div>

                {/* Empty spacing side for layout alignment on desktop */}
                <div className="hidden md:block md:w-[46%]" />

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
