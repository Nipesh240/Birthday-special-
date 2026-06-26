import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, MailOpen, Mail } from 'lucide-react';

interface LoveLetterProps {
  name: string;
  nickname: string;
}

export default function LoveLetter({ name, nickname }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);

  const letterPages = [
    {
      title: `My Dearest ${name},`,
      text: "Today, the world celebrates the birth of an absolute angel. But my heart celebrates something even deeper—the day the love of my life, my absolute favorite person, was brought into this universe. Happy 19th Birthday, my beautiful Baby! I wish I could wrap you in my arms right now and whisper these words into your ear, but until then, let this digital garden bring you all the warmth of my love."
    },
    {
      title: "My Graceful Lily",
      text: "You are like a lily flower—so elegant, pure, and blooming with grace. Every single day, your gentle presence brings calm and fragrance to my messy world. Watching you grow, dream, and bloom is my greatest privilege. As you step into your 19th year, I want you to know how deeply you are cherished, not just for your breathtaking beauty, but for the beautiful, kind, and sparkling soul you have."
    },
    {
      title: `My Favorite ${nickname} 🥔`,
      text: "Yes, you are my elegant lily, but let's be honest—you'll always be my sweet, cute, round little Aalu too! You have this adorable, squishy, comforting nature that is my ultimate happy place. You are the only potato in the world who can make my heart beat like crazy just by smiling. Thank you for being my constant comfort, my silly partner, and the one who always understands my heart."
    },
    {
      title: "My Promise to You",
      text: "On this beautiful milestone, I want to make a promise to you. I promise to stand by you through every storm and sunshine. I promise to support your dreams and hold your hand through every path you walk. I promise to love you, cherish you, tease you, and water our beautiful garden of love so that we bloom brighter together, year after year."
    },
    {
      title: "Forever & Always",
      text: `Happy 19th Birthday, my precious Karuna! May this year bring you endless laughter, success, and the happiest moments. Remember that you are loved beyond measure, more than all the stars in the night sky. Blow your virtual candles, play my silly game, and know that my heart belongs entirely to you.\n\nWith all my love,\nYours forever, Baby 💖`
    }
  ];

  const handleNext = () => {
    if (page < letterPages.length - 1) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Sealed Envelope Screen */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative w-full max-w-sm h-64 bg-amber-50/70 border border-amber-200/50 rounded-2xl shadow-[0_15px_30px_rgba(217,119,6,0.1)] flex flex-col items-center justify-center cursor-pointer p-6 hover:shadow-[0_20px_40px_rgba(244,143,177,0.3)] transition-all duration-500 overflow-hidden"
          >
            {/* Elegant botanical stamp background */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#8d6e63_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            
            {/* Wax seal */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }} 
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg border-2 border-amber-200 group-hover:scale-110 transition-transform duration-300"
            >
              <Heart className="text-white fill-white animate-heartbeat" size={24} />
            </motion.div>

            <span className="font-cursive text-3xl text-amber-900 mt-4 font-semibold select-none">
              A Love Letter for Karuna
            </span>
            <span className="font-sans text-xs text-amber-800/60 tracking-wider uppercase mt-1 flex items-center gap-1">
              <Mail size={12} />
              Tap to Open with Love
            </span>
            
            {/* Small floral flourishes on corners */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-amber-300/40"></div>
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-amber-300/40"></div>
          </motion.div>
        ) : (
          /* Unfolded Love Letter Card */
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full max-w-lg bg-[#FAF6F0] rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(141,110,99,0.15)] border border-amber-100 relative min-h-[420px] flex flex-col justify-between"
          >
            {/* Letter Head Background Floral Texture */}
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-pink-200 via-amber-100 to-emerald-200 rounded-t-3xl"></div>
            
            {/* Top Close Button (Folds letter back to envelope) */}
            <button
              id="close-letter-btn"
              onClick={() => { setIsOpen(false); setPage(0); }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-amber-100/50 text-amber-800/60 hover:text-rose-500 transition-colors cursor-pointer text-xs flex items-center gap-1 font-medium font-sans border border-amber-200/40"
            >
              <MailOpen size={14} />
              <span>Fold Back</span>
            </button>

            {/* Letter Pages Content */}
            <div className="mt-6 flex-grow flex flex-col justify-start">
              {/* Page Title */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`title-${page}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="font-serif text-2xl md:text-3xl text-pink-700/90 font-semibold mb-4"
                >
                  {letterPages[page].title}
                </motion.h3>
              </AnimatePresence>

              {/* Page Body */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${page}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.1 }}
                  className="font-sans text-amber-900/85 leading-relaxed text-sm md:text-base whitespace-pre-line tracking-wide"
                  style={{ minHeight: '180px' }}
                >
                  {letterPages[page].text}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 border-t border-amber-200/50 pt-4 flex items-center justify-between">
              {/* Page Dots Indicator */}
              <div className="flex gap-1.5">
                {letterPages.map((_, i) => (
                  <button
                    id={`page-dot-${i}`}
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      page === i ? 'bg-pink-500 w-6' : 'bg-pink-200 hover:bg-pink-300'
                    }`}
                  />
                ))}
              </div>

              {/* Prev/Next Buttons */}
              <div className="flex gap-2">
                <button
                  id="prev-letter-page-btn"
                  onClick={handlePrev}
                  disabled={page === 0}
                  className={`p-2 rounded-full border border-amber-200 transition-colors cursor-pointer ${
                    page === 0 
                      ? 'text-amber-200 cursor-not-allowed border-amber-100' 
                      : 'text-amber-800 hover:bg-pink-100 hover:border-pink-300 hover:text-pink-600'
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  id="next-letter-page-btn"
                  onClick={handleNext}
                  disabled={page === letterPages.length - 1}
                  className={`p-2 rounded-full border border-amber-200 transition-colors cursor-pointer ${
                    page === letterPages.length - 1 
                      ? 'text-amber-200 cursor-not-allowed border-amber-100' 
                      : 'text-amber-800 hover:bg-pink-100 hover:border-pink-300 hover:text-pink-600'
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Subtle vintage watermark at bottom */}
            <div className="absolute bottom-4 left-6 pointer-events-none opacity-10">
              <span className="font-cursive text-xl text-amber-900 font-bold select-none">
                Page {page + 1} of {letterPages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
