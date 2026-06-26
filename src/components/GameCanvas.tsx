import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { GameItem } from '../types';
import { Trophy, RotateCcw, Play, Pause, Sparkles } from 'lucide-react';

interface GameCanvasProps {
  nickname: string;
}

export default function GameCanvas({ nickname }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState<string | null>(null);
  const [unlockedMilestones, setUnlockedMilestones] = useState<number[]>([]);

  // Sound generator
  const playCatchSound = (type: 'lily' | 'heart' | 'potato') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'heart') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.15); // G5
      } else if (type === 'lily') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880.00, audioCtx.currentTime + 0.15); // A5
      } else { // potato
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(392.00, audioCtx.currentTime); // G4
        osc.frequency.exponentialRampToValueAtTime(523.25, audioCtx.currentTime + 0.15); // C5
      }
      
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.18);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      console.log("Audio not allowed yet", e);
    }
  };

  // Mutable game state to use inside requestAnimationFrame loop
  const gameStateRef = useRef({
    basketX: 150,
    basketWidth: 80,
    basketHeight: 25,
    items: [] as GameItem[],
    nextItemId: 0,
    score: 0,
    width: 350,
    height: 450,
    spawnTimer: 0,
    spawnInterval: 45, // frames
    floats: [] as Array<{ x: number; y: number; text: string; timer: number; color: string }>,
  });

  const loveNotes = {
    heart: [
      "My heart beats for you! 💓",
      "Forever in love with you! 🥰",
      "You are my absolute world! 🌍",
      "+1 Infinite Love! 💖"
    ],
    lily: [
      "Pure and beautiful, just like you! 🌸",
      "You bloom brighter than any Lily! 🌹",
      "Breathtaking as a fresh Lily! ✨",
      "You are so elegant! 🌷"
    ],
    potato: [
      "You are my favorite Aalu! 🥔💖",
      "My cute squishy Aalu! 🥔",
      "Always sweet, my little Aalu! 😘",
      "So adorable, Aalu! 🧸"
    ]
  };

  // Adjust canvas size
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const rect = containerRef.current.getBoundingClientRect();
        
        // Ensure bounds are responsive
        const targetWidth = rect.width;
        const targetHeight = Math.min(rect.height, 420);

        canvasRef.current.width = targetWidth * dpr;
        canvasRef.current.height = targetHeight * dpr;
        canvasRef.current.style.width = `${targetWidth}px`;
        canvasRef.current.style.height = `${targetHeight}px`;

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }

        gameStateRef.current.width = targetWidth;
        gameStateRef.current.height = targetHeight;
        
        // Constrain basket
        if (gameStateRef.current.basketX + gameStateRef.current.basketWidth > targetWidth) {
          gameStateRef.current.basketX = targetWidth - gameStateRef.current.basketWidth;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      const step = 20;
      if (e.key === 'ArrowLeft') {
        gameStateRef.current.basketX = Math.max(0, gameStateRef.current.basketX - step);
      } else if (e.key === 'ArrowRight') {
        gameStateRef.current.basketX = Math.min(
          gameStateRef.current.width - gameStateRef.current.basketWidth,
          gameStateRef.current.basketX + step
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Pointer/Touch interactions
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPlaying || gameOver) return;
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      
      // Center the basket on the mouse/finger X coord
      const targetX = clientX - gameStateRef.current.basketWidth / 2;
      gameStateRef.current.basketX = Math.max(
        0,
        Math.min(gameStateRef.current.width - gameStateRef.current.basketWidth, targetX)
      );
    }
  };

  // Core Game loop
  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, fill: string) => {
      c.save();
      c.beginPath();
      c.translate(x, y);
      c.moveTo(0, -size / 4);
      c.bezierCurveTo(size / 2, -size, size, -size / 3, 0, size);
      c.bezierCurveTo(-size, -size / 3, -size / 2, -size, 0, -size / 4);
      c.closePath();
      c.fillStyle = fill;
      c.fill();
      c.strokeStyle = '#fff';
      c.lineWidth = 1;
      c.stroke();
      c.restore();
    };

    const drawLily = (c: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      
      // Draw 5 petals
      c.fillStyle = '#FFCDD2'; // Soft pink petal
      c.strokeStyle = '#E91E63';
      c.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        c.beginPath();
        c.moveTo(0, 0);
        c.bezierCurveTo(-size/2, -size, size/2, -size, 0, 0);
        c.fill();
        c.stroke();
        c.rotate((Math.PI * 2) / 5);
      }

      // Golden center
      c.beginPath();
      c.arc(0, 0, size/4, 0, Math.PI * 2);
      c.fillStyle = '#FFD54F';
      c.fill();
      c.restore();
    };

    const drawPotato = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.save();
      c.translate(x, y);
      
      // Potato shape
      c.beginPath();
      c.ellipse(0, 0, size * 0.9, size * 0.7, 0, 0, Math.PI * 2);
      c.fillStyle = '#D7CCC8';
      c.fill();
      c.strokeStyle = '#8D6E63';
      c.lineWidth = 1.5;
      c.stroke();

      // Eyes
      c.beginPath();
      c.arc(-size * 0.3, -size * 0.1, 1.5, 0, Math.PI * 2);
      c.arc(size * 0.3, -size * 0.1, 1.5, 0, Math.PI * 2);
      c.fillStyle = '#4E342E';
      c.fill();

      // Blushing cheeks
      c.beginPath();
      c.arc(-size * 0.5, size * 0.1, 2.5, 0, Math.PI * 2);
      c.arc(size * 0.5, size * 0.1, 2.5, 0, Math.PI * 2);
      c.fillStyle = '#FF8A80';
      c.fill();

      // Smile
      c.beginPath();
      c.arc(0, size * 0.1, size * 0.2, 0, Math.PI);
      c.stroke();

      c.restore();
    };

    const drawBasket = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      c.save();
      
      // Draw a highly stylized woven basket decorated with a cute bow
      // Basket shadow
      c.shadowColor = 'rgba(233, 30, 99, 0.2)';
      c.shadowBlur = 8;
      c.shadowOffsetY = 4;

      // Outer gold rim
      c.beginPath();
      c.roundRect(x, y, w, h, [0, 0, 10, 10]);
      c.fillStyle = '#F5F5DC'; // cream color
      c.fill();
      c.strokeStyle = '#D4AF37'; // gold trim
      c.lineWidth = 3;
      c.stroke();

      // Woven patterns (grid cross-hatching)
      c.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      c.lineWidth = 1;
      for (let offset = 10; offset < w; offset += 15) {
        c.beginPath();
        c.moveTo(x + offset, y);
        c.lineTo(x + offset, y + h);
        c.stroke();
      }

      // Pink ribbon around the basket
      c.fillStyle = '#F48FB1';
      c.fillRect(x, y + 4, w, h * 0.3);

      // Cute tiny bow in center
      drawHeart(c, x + w / 2, y + 8, 8, '#E91E63');

      c.restore();
    };

    const updateGame = () => {
      const state = gameStateRef.current;
      if (!isPlaying || gameOver) return;

      // Spawn items
      state.spawnTimer++;
      if (state.spawnTimer >= state.spawnInterval) {
        state.spawnTimer = 0;
        const types: Array<'lily' | 'heart' | 'potato'> = ['lily', 'heart', 'potato'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        state.items.push({
          id: state.nextItemId++,
          x: Math.random() * (state.width - 30) + 15,
          y: -20,
          speed: Math.random() * 2 + 1.8 + (state.score * 0.05), // speed slightly increases as score goes up
          size: randomType === 'potato' ? 14 : 16,
          type: randomType,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.03
        });
      }

      // Update falling items
      const basketY = state.height - state.basketHeight - 20;
      
      state.items = state.items.filter((item) => {
        item.y += item.speed;
        item.rotation += item.rotationSpeed;

        // Check catch collision
        const inXRange = item.x >= state.basketX - 10 && item.x <= state.basketX + state.basketWidth + 10;
        const inYRange = item.y >= basketY && item.y <= basketY + state.basketHeight + 15;

        if (inXRange && inYRange) {
          // Item caught!
          playCatchSound(item.type);
          state.score += 1;
          setScore(state.score);

          // Spawn floating romantic note toast
          const options = loveNotes[item.type];
          const randomNote = options[Math.floor(Math.random() * options.length)];
          
          state.floats.push({
            x: item.x,
            y: basketY - 15,
            text: randomNote,
            timer: 45, // frames remaining
            color: item.type === 'heart' ? '#E91E63' : item.type === 'lily' ? '#D81B60' : '#8D6E63'
          });

          return false; // delete item
        }

        // Check miss
        if (item.y > state.height) {
          return false; // delete item
        }

        return true;
      });

      // Update floating texts
      state.floats = state.floats.filter((f) => {
        f.y -= 0.8;
        f.timer--;
        return f.timer > 0;
      });
    };

    const render = () => {
      const state = gameStateRef.current;
      ctx.clearRect(0, 0, state.width, state.height);

      // Gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, state.height);
      grad.addColorStop(0, '#FEF8F8');
      grad.addColorStop(1, '#FFFDF9');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, state.width, state.height);

      // Draw subtle background border
      ctx.strokeStyle = 'rgba(244, 143, 177, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, state.width - 10, state.height - 10);

      // Draw active falling items
      state.items.forEach((item) => {
        if (item.type === 'heart') {
          drawHeart(ctx, item.x, item.y, item.size, '#F48FB1');
        } else if (item.type === 'lily') {
          drawLily(ctx, item.x, item.y, item.size, item.rotation);
        } else {
          drawPotato(ctx, item.x, item.y, item.size);
        }
      });

      // Draw basket
      drawBasket(ctx, state.basketX, state.height - state.basketHeight - 20, state.basketWidth, state.basketHeight);

      // Draw floating text toasts
      state.floats.forEach((f) => {
        ctx.save();
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillStyle = f.color;
        ctx.shadowColor = 'rgba(255,255,255,1)';
        ctx.shadowBlur = 4;
        ctx.textAlign = 'center';
        ctx.fillText(f.text, f.x, f.y);
        ctx.restore();
      });

      // Draw instruction if game not active
      if (!isPlaying && !gameOver) {
        ctx.save();
        ctx.fillStyle = 'rgba(141, 110, 99, 0.7)';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Drag bottom to slide basket!', state.width / 2, state.height / 2 - 20);
        ctx.fillText('Catch Hearts, Lilies & Aalus 🥔', state.width / 2, state.height / 2);
        ctx.restore();
      }
    };

    const tick = () => {
      updateGame();
      render();
      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, gameOver]);

  // Handle milestones based on score
  useEffect(() => {
    if (score === 10 && !unlockedMilestones.includes(10)) {
      setMilestoneMessage(`🌟 Milestone: 10 Love Points! "You caught 10 sweet memories! You make my days bloom like the freshest lilies, baby!"`);
      setUnlockedMilestones([...unlockedMilestones, 10]);
      setIsPlaying(false);
    } else if (score === 19 && !unlockedMilestones.includes(19)) {
      setMilestoneMessage(`👑 Magical 19th Birthday Milestone! "Happy 19th Birthday, my gorgeous Aalu! 19 points for 19 beautiful years! Every single year is a treasure because you exist!"`);
      setUnlockedMilestones([...unlockedMilestones, 19]);
      setIsPlaying(false);
    } else if (score === 30 && !unlockedMilestones.includes(30)) {
      setMilestoneMessage(`💖 Ultimate Lover: 30 Points! "You are an expert Aalu catcher! I promise to capture and protect your heart, forever and ever!"`);
      setUnlockedMilestones([...unlockedMilestones, 30]);
      setIsPlaying(false);
    }
  }, [score, unlockedMilestones]);

  const handleStartRestart = () => {
    if (gameOver) {
      setScore(0);
      gameStateRef.current.score = 0;
      gameStateRef.current.items = [];
      gameStateRef.current.floats = [];
      setGameOver(false);
    }
    setMilestoneMessage(null);
    setIsPlaying(true);
  };

  return (
    <div className="w-full flex flex-col items-center p-3 max-w-md mx-auto">
      
      {/* Game Header Metrics */}
      <div className="w-full flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full text-pink-600 font-medium text-xs shadow-sm">
          <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
          <span>Love Meter: <strong>{score}</strong></span>
        </div>
        
        <div className="flex gap-2">
          {isPlaying ? (
            <button
              id="pause-game-btn"
              onClick={() => setIsPlaying(false)}
              className="p-1 px-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Pause size={12} />
              <span>Pause</span>
            </button>
          ) : (
            <button
              id="play-game-btn"
              onClick={handleStartRestart}
              className="p-1 px-2.5 bg-pink-400 hover:bg-pink-500 text-white rounded-full text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <Play size={12} />
              <span>Play</span>
            </button>
          )}
          
          <button
            id="reset-game-btn"
            onClick={() => {
              gameStateRef.current.score = 0;
              gameStateRef.current.items = [];
              gameStateRef.current.floats = [];
              setScore(0);
              setGameOver(false);
              setMilestoneMessage(null);
              setIsPlaying(false);
            }}
            className="p-1 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/50 rounded-full text-xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Frame */}
      <div 
        ref={containerRef} 
        className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-pink-200/50 shadow-md bg-white cursor-pointer select-none"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          className="block touch-none"
        />

        {/* Milestone Message Popup Overlays */}
        {milestoneMessage && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in z-20">
            <Trophy className="text-amber-500 animate-bounce mb-3" size={44} />
            <h4 className="font-serif text-lg font-bold text-pink-700 mb-2">Milestone Reached!</h4>
            <p className="font-sans text-sm text-amber-900 leading-relaxed max-w-xs mb-5">
              {milestoneMessage}
            </p>
            <button
              id="continue-game-btn"
              onClick={handleStartRestart}
              className="px-6 py-2 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 text-white font-semibold text-xs rounded-full shadow-md cursor-pointer transition-transform active:scale-95"
            >
              Keep Catching Love! 💖
            </button>
          </div>
        )}

        {/* Startup Instruction Overlay */}
        {!isPlaying && !milestoneMessage && score === 0 && (
          <div 
            onClick={handleStartRestart}
            className="absolute inset-0 bg-pink-50/70 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-10 cursor-pointer"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-14 h-14 bg-pink-400 rounded-full flex items-center justify-center text-white mb-3 shadow-lg"
            >
              <Play size={24} className="ml-1" />
            </motion.div>
            <span className="font-serif text-lg text-pink-700 font-semibold mb-1">
              "Our Romantic Memory Catch"
            </span>
            <span className="font-sans text-xs text-gray-500 max-w-xs px-2">
              Help Baby catch falling hearts, lilies, and sweet potato (Aalu). Slide to catch!
            </span>
          </div>
        )}
      </div>

      <div className="w-full text-center mt-2">
        <p className="font-mono text-[10px] text-amber-800/60 uppercase tracking-widest">
          Slide left/right on the box or use arrow keys
        </p>
      </div>
    </div>
  );
}
