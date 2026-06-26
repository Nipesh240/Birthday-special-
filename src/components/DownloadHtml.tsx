import { useState, useEffect } from 'react';
import { Download, Copy, Check, FileText, Sparkles } from 'lucide-react';

interface DownloadHtmlProps {
  name: string;
  nickname: string;
  defaultPhotoUrl: string;
  userUploadedPhoto: string | null;
}

export default function DownloadHtml({ name, nickname, defaultPhotoUrl, userUploadedPhoto }: DownloadHtmlProps) {
  const [copied, setCopied] = useState(false);
  const [embeddedPhotoBase64, setEmbeddedPhotoBase64] = useState<string>('');

  useEffect(() => {
    if (userUploadedPhoto) {
      setEmbeddedPhotoBase64(userUploadedPhoto);
    } else if (defaultPhotoUrl) {
      // Fetch defaultPhotoUrl and convert to Base64 data url for direct embedding
      fetch(defaultPhotoUrl)
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setEmbeddedPhotoBase64(reader.result as string);
          };
          reader.readAsDataURL(blob);
        })
        .catch(err => {
          console.error("Failed to load default engagement photo for embedding:", err);
        });
    }
  }, [defaultPhotoUrl, userUploadedPhoto]);

  // Standalone HTML template containing all CSS, JS and SVGs inside it
  const generateHtmlContent = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Happy 19th Birthday, My Beautiful Baby!</title>
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --font-sans: 'Inter', sans-serif;
            --font-serif: 'Playfair Display', serif;
            --font-cursive: 'Great Vibes', cursive;
            --color-pink: #F48FB1;
            --color-rose: #E91E63;
            --color-gold: #D4AF37;
            --color-bg-light: #FAF6F0;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: var(--font-sans);
            background: linear-gradient(135deg, #FEF4F4 0%, #FDF5E6 50%, #EBF3E8 100%);
            color: #4E342E;
            overflow-x: hidden;
            min-height: 100vh;
        }

        /* --- Splash Screen --- */
        #splash-screen {
            position: fixed;
            inset: 0;
            background: linear-gradient(135deg, #FEF4F4 0%, #FDF5E6 50%, #EBF3E8 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            transition: opacity 1s ease, transform 1s ease;
            padding: 20px;
        }

        #splash-screen.fade-out {
            opacity: 0;
            pointer-events: none;
            transform: scale(1.05);
        }

        .splash-card {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(244, 143, 177, 0.3);
            border-radius: 30px;
            padding: 40px 30px;
            width: 100%;
            max-width: 440px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(244, 143, 177, 0.15);
            position: relative;
        }

        .heart-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
            animation: heartbeat 2s infinite ease-in-out;
        }

        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
        }

        .cursive-title {
            font-family: var(--font-cursive);
            font-size: 3.2rem;
            color: #8D6E63;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .serif-sub {
            font-family: var(--font-serif);
            font-size: 1.5rem;
            color: var(--color-rose);
            margin-bottom: 25px;
        }

        .btn-open {
            padding: 15px 35px;
            background: linear-gradient(135deg, var(--color-pink) 0%, var(--color-rose) 100%);
            color: white;
            font-size: 1.1rem;
            font-weight: 500;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 10px 20px rgba(244, 143, 177, 0.3);
            transition: all 0.3s;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
            60% { transform: translateY(-4px); }
        }

        .btn-open:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 25px rgba(244, 143, 177, 0.45);
        }

        /* --- Main Content Section --- */
        #main-content {
            opacity: 0;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            transition: opacity 1.5s ease;
            display: none;
        }

        #main-content.visible {
            display: block;
            opacity: 1;
        }

        header {
            text-align: center;
            margin-bottom: 40px;
        }

        .main-heading {
            font-family: var(--font-serif);
            font-size: 2.2rem;
            color: var(--color-rose);
            margin-bottom: 10px;
            line-height: 1.2;
            text-shadow: 0 2px 4px rgba(244, 143, 177, 0.1);
        }

        .subtitle {
            font-size: 0.95rem;
            color: #6D4C41;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        /* --- Frame Layout --- */
        .card-container {
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(244, 143, 177, 0.2);
            backdrop-filter: blur(8px);
            border-radius: 24px;
            padding: 30px;
            margin-bottom: 40px;
            box-shadow: 0 15px 35px rgba(141, 110, 99, 0.08);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Glowing Lily Frame */
        .image-frame-wrapper {
            position: relative;
            width: 250px;
            height: 250px;
            border-radius: 50%;
            padding: 10px;
            background: linear-gradient(135deg, var(--color-pink) 0%, var(--color-gold) 100%);
            box-shadow: 0 10px 30px rgba(244, 143, 177, 0.3);
            margin-bottom: 25px;
            cursor: pointer;
        }

        .image-frame {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            background: #FFF8F8;
            border: 4px solid white;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .image-frame img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .image-frame .placeholder-svg {
            width: 100px;
            height: 100px;
            opacity: 0.6;
        }

        .frame-label {
            font-size: 0.75rem;
            color: var(--color-rose);
            font-weight: 500;
            margin-top: -15px;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* --- Love Letter Scroll / Book --- */
        .letter-box {
            width: 100%;
            background: var(--color-bg-light);
            border-radius: 20px;
            padding: 30px;
            border: 1px solid rgba(141, 110, 99, 0.15);
            box-shadow: inset 0 0 15px rgba(141, 110, 99, 0.05);
            min-height: 280px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .letter-title {
            font-family: var(--font-serif);
            font-size: 1.6rem;
            color: var(--color-rose);
            margin-bottom: 15px;
            font-weight: 600;
        }

        .letter-body {
            font-size: 0.95rem;
            line-height: 1.6;
            color: #5D4037;
            margin-bottom: 25px;
            min-height: 120px;
        }

        .letter-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(141, 110, 99, 0.1);
            padding-top: 15px;
        }

        .btn-nav {
            background: none;
            border: 1px solid rgba(141, 110, 99, 0.2);
            color: #5D4037;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.8rem;
            transition: all 0.2s;
        }

        .btn-nav:hover:not(:disabled) {
            background: var(--color-pink);
            color: white;
            border-color: var(--color-pink);
        }

        .btn-nav:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        .letter-dots {
            display: flex;
            gap: 6px;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #E0D4C3;
            cursor: pointer;
        }

        .dot.active {
            background: var(--color-rose);
            width: 18px;
            border-radius: 10px;
        }

        /* --- Memory Catch Game --- */
        .game-section {
            background: white;
            border-radius: 24px;
            border: 1px solid rgba(244, 143, 177, 0.2);
            padding: 25px;
            margin-bottom: 40px;
            box-shadow: 0 15px 35px rgba(244, 143, 177, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .game-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .game-title {
            font-family: var(--font-serif);
            font-size: 1.2rem;
            color: var(--color-rose);
            font-weight: 600;
        }

        .score-badge {
            background: #FFF0F5;
            color: var(--color-rose);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid #FFC0CB;
        }

        .game-canvas-wrapper {
            position: relative;
            width: 100%;
            max-width: 360px;
            height: 350px;
            border-radius: 16px;
            border: 1px solid rgba(244, 143, 177, 0.2);
            overflow: hidden;
            box-shadow: inset 0 2px 8px rgba(0,0,0,0.03);
            background: #FFFDF9;
        }

        canvas {
            display: block;
            touch-action: none;
            width: 100%;
            height: 100%;
        }

        .game-overlay {
            position: absolute;
            inset: 0;
            background: rgba(255, 240, 245, 0.85);
            backdrop-filter: blur(2px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
            z-index: 10;
        }

        .btn-play {
            background: var(--color-rose);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 15px;
            box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
        }

        /* --- Audio Floating Controls --- */
        #music-pill {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(5px);
            border: 1px solid rgba(244, 143, 177, 0.3);
            border-radius: 50px;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            z-index: 99;
            font-size: 0.8rem;
            color: #5D4037;
        }

        .music-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--color-rose);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Particles background setup */
        #particle-canvas {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 1;
        }

        .relative-section {
            position: relative;
            z-index: 5;
        }
    </style>
</head>
<body>

    <!-- Floating Canvas Particles for petals and hearts -->
    <canvas id="particle-canvas"></canvas>

    <!-- Welcome / Splash Trigger Screen -->
    <div id="splash-screen">
        <div class="splash-card">
            <svg class="heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#F48FB1"/>
            </svg>
            <h1 class="cursive-title">My Beautiful ${nickname}</h1>
            <p class="serif-sub">A Magical Birthday Garden</p>
            <button class="btn-open" onclick="openEnvelope()">Open with Love 💖</button>
        </div>
    </div>

    <!-- Main Content App Screen -->
    <div id="main-content" class="relative-section">
        <header>
            <h1 class="main-heading">Happy 19th Birthday, My Beautiful Baby!</h1>
            <p class="subtitle">Just for My Favorite Aalu 🌸</p>
        </header>

        <!-- Dynamic Visual Frame Card -->
        <div class="card-container">
            <div class="image-frame-wrapper" onclick="triggerImageUpload()">
                <div class="image-frame">
                    <!-- Standard placeholder. User can tap to select her actual photo -->
                    <img id="custom-photo" src="${embeddedPhotoBase64 || 'uploaded-image.jpg'}" onerror="showPlaceholder(this)" alt="Your Photo">
                    <div id="upload-placeholder" class="placeholder-svg" style="display:none; position: absolute; top:0; left:0; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; background:#FFF8F8;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <path d="M21 15l-5-5L5 21"/>
                        </svg>
                        <span style="font-size:0.65rem; color:#8D6E63; margin-top:5px;">Tap to select photo</span>
                    </div>
                </div>
            </div>
            <p class="frame-label">📷 Tap frame to upload your photo</p>
            <input type="file" id="file-uploader" style="display:none" accept="image/*" onchange="loadPhoto(event)">

            <!-- Love Letter Cards -->
            <div class="letter-box">
                <div>
                    <h3 class="letter-title" id="letter-title">Dear Karuna,</h3>
                    <p class="letter-body" id="letter-body">Loading your love letter...</p>
                </div>
                <div class="letter-controls">
                    <div class="letter-dots" id="letter-dots"></div>
                    <div>
                        <button class="btn-nav" id="btn-prev" onclick="prevPage()">Prev</button>
                        <button class="btn-nav" id="btn-next" onclick="nextPage()">Next</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mini Catch Game Section -->
        <div class="game-section">
            <div class="game-header">
                <h3 class="game-title">"Memory Catch" Game 🥔</h3>
                <div class="score-badge">Love Points: <span id="game-score">0</span></div>
            </div>
            
            <div class="game-canvas-wrapper" id="canvas-container">
                <canvas id="game-canvas"></canvas>
                <div class="game-overlay" id="game-start-overlay">
                    <p style="font-family:var(--font-serif); font-size:1.1rem; color:var(--color-rose); margin-bottom:5px; font-weight:600;">Romantic Memory Catch</p>
                    <p style="font-size:0.75rem; color:#8D6E63; max-width:260px; margin-bottom:10px;">Drag bottom to slide basket. Catch falling Hearts, Lilies, and cute Potatoes!</p>
                    <button class="btn-play" onclick="startGame()">Start Catching Love! 💖</button>
                </div>
                <div class="game-overlay" id="game-milestone-overlay" style="display: none;">
                    <h4 style="font-family:var(--font-serif); font-size:1.2rem; color:var(--color-rose); margin-bottom:10px;">Milestone Cleared! 🌟</h4>
                    <p id="milestone-text" style="font-size:0.8rem; color:#5D4037; margin-bottom:15px; max-width:280px;"></p>
                    <button class="btn-play" onclick="resumeGame()">Keep Catching!</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Floating Audio Pill -->
    <div id="music-pill">
        <span>🎵 Birthday Song</span>
        <button class="music-btn" onclick="togglePlayMusic()">
            <svg id="music-play-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <svg id="music-pause-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="6" y="4" width="4" height="16"/>
                <rect x="14" y="4" width="4" height="16"/>
            </svg>
        </button>
    </div>

    <!-- Hidden audio element playing beautiful instrumental track -->
    <audio id="bg-music" loop>
        <source src="https://cdn.pixabay.com/audio/2022/05/27/audio_18084a511e.mp3" type="audio/mpeg">
    </audio>

    <script>
        // Audio Controls & Synthesizer Backup
        const bgMusic = document.getElementById('bg-music');
        let audioCtx = null;
        let isMusicBoxPlaying = false;
        let musicBoxTimeout = null;

        function playHappyBirthdaySynth() {
            try {
                if (!audioCtx) {
                    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }
                if (audioCtx.state === 'suspended') {
                    audioCtx.resume();
                }
                
                const tempo = 450;
                const melody = [
                    [392.00, 0.5], [392.00, 0.5], [440.00, 1], [392.00, 1], [523.25, 1], [493.88, 2],
                    [392.00, 0.5], [392.00, 0.5], [440.00, 1], [392.00, 1], [587.33, 1], [523.25, 2],
                    [392.00, 0.5], [392.00, 0.5], [783.99, 1], [659.25, 1], [523.25, 1], [493.88, 1], [440.00, 1.5],
                    [698.46, 0.5], [698.46, 0.5], [659.25, 1], [523.25, 1], [587.33, 1], [523.25, 2.5]
                ];

                let timeOffset = 50;
                isMusicBoxPlaying = true;

                function playNote(freq, duration) {
                    if (!isMusicBoxPlaying || !audioCtx) return;
                    const osc = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                    
                    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (duration / 1000));
                    
                    osc.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    osc.start();
                    osc.stop(audioCtx.currentTime + (duration / 1000));
                }

                let currentNoteIndex = 0;
                function tickMelody() {
                    if (!isMusicBoxPlaying) return;
                    if (currentNoteIndex >= melody.length) currentNoteIndex = 0;
                    
                    const [freq, durationBeats] = melody[currentNoteIndex];
                    const durationMs = durationBeats * tempo;
                    playNote(freq, durationMs);
                    
                    musicBoxTimeout = setTimeout(tickMelody, durationMs + 60);
                    currentNoteIndex++;
                }

                tickMelody();
            } catch(e) {
                console.log("Audio API issue", e);
            }
        }

        function stopHappyBirthdaySynth() {
            isMusicBoxPlaying = false;
            if (musicBoxTimeout) {
                clearTimeout(musicBoxTimeout);
                musicBoxTimeout = null;
            }
        }

        function startAudioFlow() {
            // Trigger music
            bgMusic.play().catch(e => {
                console.log("MP3 autoplay blocked. Firing synthesized Music Box chime fallback...");
                playHappyBirthdaySynth();
            });
        }

        function togglePlayMusic() {
            const playIcon = document.getElementById('music-play-icon');
            const pauseIcon = document.getElementById('music-pause-icon');

            if (bgMusic.paused && !isMusicBoxPlaying) {
                bgMusic.play().catch(() => playHappyBirthdaySynth());
                playIcon.style.display = "none";
                pauseIcon.style.display = "block";
            } else {
                bgMusic.pause();
                stopHappyBirthdaySynth();
                playIcon.style.display = "block";
                pauseIcon.style.display = "none";
            }
        }

        // --- Custom Image File Persistence ---
        function triggerImageUpload() {
            document.getElementById('file-uploader').click();
        }

        function loadPhoto(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.getElementById('custom-photo');
                    img.src = e.target.result;
                    img.style.display = "block";
                    document.getElementById('upload-placeholder').style.display = "none";
                    localStorage.setItem('birthday_photo', e.target.result);
                }
                reader.readAsDataURL(file);
            }
        }

        function showPlaceholder(img) {
            img.style.display = "none";
            document.getElementById('upload-placeholder').style.display = "flex";
        }

        // --- Love Letter Slider ---
        const letterPages = [
            {
                title: "My Dearest Karuna,",
                text: "Today, the world celebrates the birth of an absolute angel. But my heart celebrates something even deeper—the day the love of my life, my absolute favorite person, was brought into this universe. Happy 19th Birthday, my beautiful Baby! I wish I could wrap you in my arms right now and whisper these words into your ear, but until then, let this digital garden bring you all the warmth of my love."
            },
            {
                title: "My Graceful Lily",
                text: "You are like a lily flower—so elegant, pure, and blooming with grace. Every single day, your gentle presence brings calm and fragrance to my messy world. Watching you grow, dream, and bloom is my greatest privilege. As you step into your 19th year, I want you to know how deeply you are cherished, not just for your breathtaking beauty, but for the beautiful, kind, and sparkling soul you have."
            },
            {
                title: "My Favorite Aalu 🥔",
                text: "Yes, you are my elegant lily, but let's be honest—you'll always be my sweet, cute, round little Aalu too! You have this adorable, squishy, comforting nature that is my ultimate happy place. You are the only potato in the world who can make my heart beat like crazy just by smiling. Thank you for being my constant comfort, my silly partner, and the one who always understands my heart."
            },
            {
                title: "My Promise to You",
                text: "On this beautiful milestone, I want to make a promise to you. I promise to stand by you through every storm and sunshine. I promise to support your dreams and hold your hand through every path you walk. I promise to love you, cherish you, tease you, and water our beautiful garden so that we bloom brighter together, year after year."
            },
            {
                title: "Forever & Always",
                text: "Happy 19th Birthday, my precious Karuna! May this year bring you endless laughter, success, and the happiest moments. Remember that you are loved beyond measure, more than all the stars in the night sky. Blow your virtual candles, play my silly game, and know that my heart belongs entirely to you.\\n\\nWith all my love,\\nYours forever, Baby 💖"
            }
        ];

        let currentLetterPage = 0;

        function updateLetter() {
            const page = letterPages[currentLetterPage];
            document.getElementById('letter-title').innerText = page.title;
            document.getElementById('letter-body').innerText = page.text;
            
            document.getElementById('btn-prev').disabled = currentLetterPage === 0;
            document.getElementById('btn-next').disabled = currentLetterPage === letterPages.length - 1;

            // Update dots
            const dotsContainer = document.getElementById('letter-dots');
            dotsContainer.innerHTML = "";
            letterPages.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = "dot" + (i === currentLetterPage ? " active" : "");
                dot.onclick = () => { currentLetterPage = i; updateLetter(); };
                dotsContainer.appendChild(dot);
            });
        }

        function nextPage() {
            if (currentLetterPage < letterPages.length - 1) {
                currentLetterPage++;
                updateLetter();
            }
        }

        function prevPage() {
            if (currentLetterPage > 0) {
                currentLetterPage--;
                updateLetter();
            }
        }

        // --- Falling background particles ---
        const particleCanvas = document.getElementById('particle-canvas');
        const pCtx = particleCanvas.getContext('2d');
        let particles = [];

        function resizeParticleCanvas() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeParticleCanvas);
        resizeParticleCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * -50;
                this.size = Math.random() * 12 + 8;
                this.speedY = Math.random() * 1.5 + 1;
                this.speedX = Math.random() * 0.8 - 0.4;
                this.rotation = Math.random() * Math.PI;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                this.type = Math.floor(Math.random() * 3); // 0=petal, 1=heart, 2=potato
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.rotation += this.rotationSpeed;
                if (this.y > particleCanvas.height) {
                    this.y = -20;
                    this.x = Math.random() * particleCanvas.width;
                }
            }

            draw() {
                pCtx.save();
                pCtx.translate(this.x, this.y);
                pCtx.rotate(this.rotation);
                
                if (this.type === 0) { // Petal
                    pCtx.beginPath();
                    pCtx.moveTo(0, -this.size / 2);
                    pCtx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
                    pCtx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, -this.size / 2);
                    pCtx.fillStyle = '#F8BBD0';
                    pCtx.fill();
                } else if (this.type === 1) { // Heart
                    pCtx.beginPath();
                    pCtx.moveTo(0, -this.size / 4);
                    pCtx.bezierCurveTo(this.size / 2, -this.size, this.size, -this.size / 3, 0, this.size);
                    pCtx.bezierCurveTo(-this.size, -this.size / 3, -this.size / 2, -this.size, 0, -this.size / 4);
                    pCtx.fillStyle = 'rgba(244, 143, 177, 0.4)';
                    pCtx.fill();
                } else { // Potato
                    pCtx.beginPath();
                    pCtx.ellipse(0, 0, this.size * 0.7, this.size * 0.5, 0, 0, Math.PI * 2);
                    pCtx.fillStyle = 'rgba(215, 204, 200, 0.5)';
                    pCtx.fill();
                }
                pCtx.restore();
            }
        }

        function setupParticles() {
            particles = [];
            for (let i = 0; i < 30; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        // --- Memory Catch Game Loop ---
        const gameCanvas = document.getElementById('game-canvas');
        const gCtx = gameCanvas.getContext('2d');
        let gameActive = false;
        let gameScore = 0;
        let basketX = 140;
        const basketWidth = 70;
        const basketHeight = 20;
        let fallingItems = [];
        let floatNotes = [];
        let gameTimer = 0;
        let gameUnlockedMilestones = [];

        function resizeGameCanvas() {
            const container = document.getElementById('canvas-container');
            gameCanvas.width = container.clientWidth;
            gameCanvas.height = 350;
        }
        window.addEventListener('resize', resizeGameCanvas);
        resizeGameCanvas();

        function triggerChimeSound(type) {
            try {
                const ctxSound = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctxSound.createOscillator();
                const gain = ctxSound.createGain();
                osc.connect(gain);
                gain.connect(ctxSound.destination);
                
                if (type === 1) { // heart
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(523.25, ctxSound.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(783.99, ctxSound.currentTime + 0.15);
                } else if (type === 0) { // lily
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(587.33, ctxSound.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(880.00, ctxSound.currentTime + 0.15);
                } else { // potato
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(392.00, ctxSound.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(523.25, ctxSound.currentTime + 0.15);
                }
                
                gain.gain.setValueAtTime(0.12, ctxSound.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctxSound.currentTime + 0.18);
                osc.start();
                osc.stop(ctxSound.currentTime + 0.2);
            } catch(e) {}
        }

        const gameLoveNotes = [
            "Baby, you are gorgeous! 💖",
            "Blooming like a fresh Lily! 🌸",
            "My favorite sweet Aalu! 🥔",
            "+1 Infinite Love! 😘",
            "Happy 19th Birthday! 🌟"
        ];

        class GameItem {
            constructor() {
                this.x = Math.random() * (gameCanvas.width - 30) + 15;
                this.y = -20;
                this.size = 14;
                this.speed = Math.random() * 1.5 + 2 + (gameScore * 0.05);
                this.type = Math.floor(Math.random() * 3); // 0=lily, 1=heart, 2=potato
                this.rotation = Math.random() * Math.PI;
                this.rotationSpeed = (Math.random() - 0.5) * 0.04;
            }

            update() {
                this.y += this.speed;
                this.rotation += this.rotationSpeed;
            }

            draw() {
                gCtx.save();
                gCtx.translate(this.x, this.y);
                gCtx.rotate(this.rotation);
                
                if (this.type === 1) { // Heart
                    gCtx.beginPath();
                    gCtx.moveTo(0, -this.size / 4);
                    gCtx.bezierCurveTo(this.size / 2, -this.size, this.size, -this.size / 3, 0, this.size);
                    gCtx.bezierCurveTo(-this.size, -this.size / 3, -this.size / 2, -this.size, 0, -this.size / 4);
                    gCtx.fillStyle = '#F48FB1';
                    gCtx.fill();
                } else if (this.type === 0) { // Lily
                    gCtx.fillStyle = '#FFCDD2';
                    for (let i = 0; i < 5; i++) {
                        gCtx.beginPath();
                        gCtx.moveTo(0, 0);
                        gCtx.bezierCurveTo(-this.size/2, -this.size, this.size/2, -this.size, 0, 0);
                        gCtx.fill();
                        gCtx.rotate((Math.PI * 2) / 5);
                    }
                    gCtx.beginPath();
                    gCtx.arc(0,0, this.size/4, 0, Math.PI * 2);
                    gCtx.fillStyle = '#FFD54F';
                    gCtx.fill();
                } else { // Potato
                    gCtx.beginPath();
                    gCtx.ellipse(0, 0, this.size * 0.9, this.size * 0.7, 0, 0, Math.PI * 2);
                    gCtx.fillStyle = '#D7CCC8';
                    gCtx.fill();
                    gCtx.strokeStyle = '#8D6E63';
                    gCtx.lineWidth = 1;
                    gCtx.stroke();
                    gCtx.beginPath();
                    gCtx.arc(-this.size * 0.3, -this.size * 0.1, 1, 0, Math.PI * 2);
                    gCtx.arc(this.size * 0.3, -this.size * 0.1, 1, 0, Math.PI * 2);
                    gCtx.fillStyle = '#4E342E';
                    gCtx.fill();
                }
                gCtx.restore();
            }
        }

        function startGame() {
            document.getElementById('game-start-overlay').style.display = "none";
            document.getElementById('game-milestone-overlay').style.display = "none";
            gameScore = 0;
            document.getElementById('game-score').innerText = gameScore;
            fallingItems = [];
            floatNotes = [];
            gameUnlockedMilestones = [];
            gameActive = true;
        }

        function resumeGame() {
            document.getElementById('game-milestone-overlay').style.display = "none";
            gameActive = true;
        }

        // Mouse & Touch input handlers
        gameCanvas.addEventListener('pointermove', function(e) {
            if (!gameActive) return;
            const rect = gameCanvas.getBoundingClientRect();
            const clientX = e.clientX - rect.left;
            basketX = Math.max(0, Math.min(gameCanvas.width - basketWidth, clientX - basketWidth / 2));
        });

        // Touch drag fallback
        gameCanvas.addEventListener('touchmove', function(e) {
            if (!gameActive) return;
            e.preventDefault();
            const rect = gameCanvas.getBoundingClientRect();
            const touch = e.touches[0];
            const clientX = touch.clientX - rect.left;
            basketX = Math.max(0, Math.min(gameCanvas.width - basketWidth, clientX - basketWidth / 2));
        }, {passive: false});

        function gameTick() {
            gCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            
            // Draw gradient background
            const gr = gCtx.createLinearGradient(0,0,0,gameCanvas.height);
            gr.addColorStop(0, '#FFFDF9');
            gr.addColorStop(1, '#FEF6F8');
            gCtx.fillStyle = gr;
            gCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

            if (gameActive) {
                // Spawning falling items
                gameTimer++;
                if (gameTimer % 45 === 0) {
                    fallingItems.push(new GameItem());
                }

                const basketY = gameCanvas.height - basketHeight - 20;

                // Update falling items
                fallingItems = fallingItems.filter(item => {
                    item.update();
                    item.draw();

                    // Check catch
                    const caughtX = item.x >= basketX - 10 && item.x <= basketX + basketWidth + 10;
                    const caughtY = item.y >= basketY && item.y <= basketY + basketHeight + 15;

                    if (caughtX && caughtY) {
                        triggerChimeSound(item.type);
                        gameScore++;
                        document.getElementById('game-score').innerText = gameScore;

                        // Float message
                        const randomNote = gameLoveNotes[Math.floor(Math.random() * gameLoveNotes.length)];
                        floatNotes.push({
                            x: item.x,
                            y: basketY - 10,
                            text: randomNote,
                            timer: 45
                        });

                        // Check Milestones
                        if (gameScore === 10 && !gameUnlockedMilestones.includes(10)) {
                            triggerMilestone(10, '🌟 10 Points! You make my days bloom like fresh lilies, my sweet baby!');
                        } else if (gameScore === 19 && !gameUnlockedMilestones.includes(19)) {
                            triggerMilestone(19, '👑 19 Points! Happy 19th Birthday, my beautiful Aalu! I promise to hold your heart forever!');
                        } else if (gameScore === 30 && !gameUnlockedMilestones.includes(30)) {
                            triggerMilestone(30, '💖 30 Points! You are the ultimate master of my heart. I love you!');
                        }

                        return false;
                    }
                    return item.y <= gameCanvas.height;
                });

                // Draw floating notes
                floatNotes = floatNotes.filter(f => {
                    f.y -= 0.8;
                    f.timer--;
                    gCtx.save();
                    gCtx.font = "bold 11px sans-serif";
                    gCtx.fillStyle = "#E91E63";
                    gCtx.textAlign = "center";
                    gCtx.fillText(f.text, f.x, f.y);
                    gCtx.restore();
                    return f.timer > 0;
                });
            }

            // Draw Basket
            const bY = gameCanvas.height - basketHeight - 20;
            gCtx.save();
            gCtx.beginPath();
            gCtx.roundRect(basketX, bY, basketWidth, basketHeight, [0, 0, 10, 10]);
            gCtx.fillStyle = "#FFF";
            gCtx.fill();
            gCtx.strokeStyle = "#D4AF37";
            gCtx.lineWidth = 2;
            gCtx.stroke();
            // Ribbon on basket
            gCtx.fillStyle = "#F48FB1";
            gCtx.fillRect(basketX, bY + 3, basketWidth, 6);
            gCtx.restore();

            requestAnimationFrame(gameTick);
        }

        function triggerMilestone(points, text) {
            gameActive = false;
            gameUnlockedMilestones.push(points);
            document.getElementById('milestone-text').innerText = text;
            document.getElementById('game-milestone-overlay').style.display = "flex";
        }

        // --- Envelope Opening Event ---
        function openEnvelope() {
            const splash = document.getElementById('splash-screen');
            splash.classList.add('fade-out');
            
            const main = document.getElementById('main-content');
            main.style.display = "block";
            setTimeout(() => {
                main.classList.add('visible');
            }, 50);

            // Trigger music background safely
            startAudioFlow();
        }

        // --- Document Boot ---
        window.onload = function() {
            // Load saved photo if any
            const savedPhoto = localStorage.getItem('birthday_photo');
            if (savedPhoto) {
                const img = document.getElementById('custom-photo');
                img.src = savedPhoto;
                img.style.display = "block";
                document.getElementById('upload-placeholder').style.display = "none";
            }

            setupParticles();
            animateParticles();
            updateLetter();
            gameTick();
        }
    </script>
</body>
</html>`;

  const handleDownload = () => {
    const htmlContent = generateHtmlContent();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Karunas_Magical_19th_Birthday.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const htmlContent = generateHtmlContent();
    navigator.clipboard.writeText(htmlContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div id="download-exporter" className="w-full bg-[#FAF6F0] border border-amber-200/50 rounded-3xl p-6 md:p-8 shadow-[0_15px_30px_rgba(217,119,6,0.06)] flex flex-col justify-between max-w-lg mx-auto relative overflow-hidden">
      
      {/* Decorative Gold Stars */}
      <div className="absolute top-4 right-4 text-amber-500 opacity-60">
        <Sparkles size={18} className="animate-pulse" />
      </div>

      <div className="flex gap-4 items-start mb-4">
        <div className="p-3 bg-amber-100 rounded-2xl text-amber-800">
          <FileText size={28} />
        </div>
        <div>
          <h4 className="font-serif text-lg font-bold text-amber-900 mb-1">
            Download Standalone Birthday Website! 🎁
          </h4>
          <p className="font-sans text-xs text-amber-800/80 leading-relaxed">
            I have pre-compiled the entire experience (styles, scripts, animations, and inline assets) into a single, light standalone HTML file. You can download or copy it instantly to send to Karuna directly as a beautiful personal link or file!
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-3 flex-wrap">
        <button
          id="download-html-file-btn"
          onClick={handleDownload}
          className="flex-1 min-w-[140px] py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-xs rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <Download size={15} />
          <span>Download HTML File</span>
        </button>

        <button
          id="copy-html-code-btn"
          onClick={handleCopy}
          className={`flex-1 min-w-[140px] py-3 px-4 border text-xs font-medium rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 ${
            copied
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-white border-amber-200 text-amber-900 hover:bg-amber-50'
          }`}
        >
          {copied ? (
            <>
              <Check size={15} />
              <span>Copied Successfully!</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              <span>Copy Single-File Code</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 border-t border-amber-200/40 pt-3 text-[10px] text-amber-700/60 leading-relaxed text-center">
        💡 <strong>Tip:</strong> The standalone file has a file picker built-in! If you send her the file, she can tap the photo frame on her phone to upload her favorite picture, which saves permanently in her browser's storage!
      </div>
    </div>
  );
}
