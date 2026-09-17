import { calculateDaysInfo } from './dateHelper';

// Generate a standalone, self-contained interactive Romantic / Birthday HTML page with 3D Neon Floating Words, TTS Voice & 1-Photo Framed Border

export function generateStandaloneHtml(data) {
  const {
    title = 'Điều Bất Ngờ Dành Cho Bạn',
    type = 'love', // 'love' | 'birthday' | 'confession'
    sender = '',
    recipient = '',
    message = '',
    date = '',
    photos = [],
    effect = 'neon_words',
    musicStyle = 'romantic_chords',
    enableTTS = true,
    ttsVoice = 'female_north',
    customWords = []
  } = data;

  const daysInfo = calculateDaysInfo(date, type);
  const memoryPhoto = photos?.[0] || '';
  const safeMessage = JSON.stringify(message || '');
  const safeTitle = JSON.stringify(title || '');
  const safeRecipient = JSON.stringify(recipient || '');
  const safeSender = JSON.stringify(sender || '');
  const safeCustomWords = JSON.stringify(customWords || []);
  const isNeon = (!effect || effect === 'neon_words');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${title || 'Điều Ngọt Ngào Dành Cho Bạn ❤️'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Great+Vibes&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      min-height: 100vh;
      background: ${isNeon ? 'linear-gradient(135deg, #09010e 0%, #15031a 50%, #05000a 100%)' : (type === 'birthday' ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)' : 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 50%, #fbcfe8 100%)')};
      color: ${isNeon || type === 'birthday' ? '#ffffff' : '#881337'};
      overflow-x: hidden;
      position: relative;
    }
    .ambient-bg {
      position: fixed;
      top: -10%;
      left: -10%;
      width: 120%;
      height: 120%;
      background-image: url('${memoryPhoto}');
      background-size: cover;
      background-position: center;
      filter: blur(40px);
      opacity: 0.22;
      pointer-events: none;
      z-index: 0;
      display: ${memoryPhoto ? 'block' : 'none'};
    }
    .canvas-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    .container {
      position: relative;
      z-index: 10;
      max-width: 520px;
      margin: 0 auto;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
    }
    .card {
      background: ${isNeon ? 'rgba(15, 2, 22, 0.72)' : (type === 'birthday' ? 'rgba(30, 27, 75, 0.88)' : 'rgba(255, 255, 255, 0.94)')};
      backdrop-filter: blur(16px);
      border-radius: 28px;
      padding: 32px 24px;
      width: 100%;
      box-shadow: 0 20px 45px rgba(0,0,0,0.25);
      border: 2px solid ${isNeon ? 'rgba(244, 63, 94, 0.35)' : (type === 'birthday' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(251, 113, 133, 0.35)')};
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .font-handwriting { font-family: 'Dancing Script', cursive; }
    .font-romantic { font-family: 'Great Vibes', cursive; }
    .btn-open {
      background: ${type === 'birthday' ? 'linear-gradient(135deg, #f59e0b, #ec4899)' : 'linear-gradient(135deg, #e11d48, #fb7185)'};
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 9999px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(225, 29, 72, 0.35);
      transition: all 0.3s ease;
      margin-top: 20px;
    }
    .btn-open:hover { transform: scale(1.05); }
    .pulse-icon {
      font-size: 64px;
      display: inline-block;
      animation: heartBeat 1.4s infinite;
    }
    @keyframes heartBeat {
      0%, 100% { transform: scale(1); }
      15% { transform: scale(1.25); }
      30% { transform: scale(1); }
      45% { transform: scale(1.15); }
    }
    .typewriter-text {
      font-size: 22px;
      line-height: 1.8;
      white-space: pre-wrap;
      text-align: left;
      margin: 18px 0;
      min-height: 80px;
      padding: 16px;
      background: ${isNeon ? 'rgba(244, 63, 94, 0.12)' : (type === 'birthday' ? 'rgba(88, 28, 135, 0.4)' : 'rgba(255, 241, 242, 0.7)')};
      border-radius: 18px;
      border: 1px solid ${isNeon ? 'rgba(244, 63, 94, 0.3)' : (type === 'birthday' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(251, 113, 133, 0.3)')};
      color: ${isNeon ? '#ffe4e6' : 'inherit'};
    }
    .photo-frame-wrap {
      margin: 18px 0;
      display: flex;
      justify-content: center;
      position: relative;
    }
    .photo-frame {
      position: relative;
      padding: 10px;
      background: ${isNeon ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, #fff1f2, #ffffff, #ffe4e6)'};
      border-radius: 24px;
      box-shadow: 0 12px 28px rgba(0,0,0,0.2);
      border: 2px solid rgba(244, 63, 94, 0.45);
      max-width: 340px;
      width: 100%;
    }
    .photo-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #e11d48, #f43f5e);
      color: white;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 9999px;
      box-shadow: 0 4px 12px rgba(225, 29, 72, 0.4);
      white-space: nowrap;
    }
    .photo-frame img {
      width: 100%;
      height: 260px;
      object-fit: cover;
      border-radius: 18px;
      display: block;
    }
    .top-controls {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 50;
      display: flex;
      gap: 10px;
    }
    .control-btn {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(8px);
      color: #e11d48;
      border: none;
      padding: 10px 14px;
      border-radius: 9999px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tts-pill {
      font-size: 12px;
      font-weight: 600;
      color: #fda4af;
      background: rgba(225, 29, 72, 0.3);
      padding: 4px 12px;
      border-radius: 9999px;
      display: inline-block;
      margin-bottom: 8px;
      animation: pulse 1.5s infinite;
      border: 1px solid rgba(244, 63, 94, 0.4);
    }
    .floating-reopen-btn {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 40;
      background: linear-gradient(135deg, #e11d48, #f43f5e);
      color: white;
      font-weight: 700;
      padding: 12px 24px;
      border-radius: 9999px;
      border: none;
      box-shadow: 0 10px 25px rgba(225, 29, 72, 0.4);
      cursor: pointer;
      font-size: 14px;
    }
    .hidden-state { display: none !important; }
  </style>
</head>
<body>
  <div class="ambient-bg" id="ambientBg"></div>
  <canvas id="particlesCanvas" class="canvas-bg"></canvas>

  <div class="top-controls">
    <button id="cardToggleBtn" class="control-btn hidden-state">👁️ Ngắm Mưa Chữ</button>
    <button id="ttsToggle" class="control-btn hidden-state">🎙️ Đọc Lời Nhắn</button>
    <button id="musicToggle" class="control-btn" title="Bật/Tắt Nhạc">🎵 Nhạc</button>
  </div>

  <button id="reopenCardBtn" class="floating-reopen-btn hidden-state">Chạm vào đây để mở lại thư tình 💌</button>

  <div class="container">
    <!-- Screen 1: The Surprise Gift Box / Envelope -->
    <div id="introCard" class="card">
      <div class="pulse-icon">${type === 'birthday' ? '🎂' : '💌'}</div>
      <h2 style="font-size: 28px; margin: 16px 0 8px;" class="font-handwriting">
        ${recipient ? 'Gửi ' + recipient + ' ❤️' : 'Gửi Người Đặc Biệt'}
      </h2>
      ${date ? `<div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 9999px; background: rgba(244,63,94,0.2); border: 1px solid rgba(244,63,94,0.35); font-size: 12px; color: #fecdd3; margin-bottom: 12px;">🗓️ ${date} ${daysInfo ? `• <b style="color: #fde047;">${daysInfo.badge}</b>` : ''}</div>` : ''}
      <p style="opacity: 0.85; font-size: 15px; margin-bottom: 24px;">
        ${type === 'birthday' ? 'Một lời chúc sinh nhật bất ngờ, bầu trời chữ 3D lung linh đang chờ bạn...' : 'Có một bức thư bí mật cùng mưa chữ tình yêu phát sáng muốn gửi trao tới bạn...'}
      </p>
      <button id="openSurpriseBtn" class="btn-open">
        ${type === 'birthday' ? 'Thổi Nến & Mở Quà 🎈' : 'Chạm Để Mở Thư 💖'}
      </button>
    </div>

    <!-- Screen 2: The Romantic / Birthday Celebration Content -->
    <div id="contentCard" class="card hidden-state">
      <div style="font-size: 32px;" class="pulse-icon">${type === 'birthday' ? '🎉' : '💖'}</div>
      <h1 style="font-size: 34px; margin-top: 10px; color: #ff6584;" class="font-romantic">${title}</h1>
      
      ${date ? `
      <div style="margin: 8px 0 16px; display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <div style="font-size: 13px; opacity: 0.85; color: #fda4af;">🗓️ ${date}</div>
        ${daysInfo ? `
        <div style="display: inline-block; padding: 5px 14px; border-radius: 9999px; background: rgba(244,63,94,0.25); border: 1px solid rgba(244,63,94,0.45); font-size: 13px; font-weight: 700; color: #fecdd3;">
          ✨ ${daysInfo.mainText} ✨
        </div>` : ''}
      </div>` : ''}

      <!-- 1 Memory Photo Frame -->
      ${memoryPhoto ? `
      <div class="photo-frame-wrap">
        <div class="photo-frame">
          <div class="photo-badge">❤️ Kỷ Niệm Của Chúng Mình</div>
          <img src="${memoryPhoto}" alt="Kỷ niệm đẹp" />
        </div>
      </div>` : ''}

      <!-- TTS Indicator & Typewriter Letter -->
      <div id="ttsStatusPill" class="tts-pill hidden-state">🎙️ Đang đọc lời nhắn bằng giọng nói...</div>
      <div id="typewriterBox" class="typewriter-text font-handwriting"></div>

      <!-- Sender Signature -->
      ${sender ? `<div style="text-align: right; margin-top: 16px; font-weight: 700; color: #ff6584;" class="font-handwriting" style="font-size: 24px;">— Yêu thương, ${sender} —</div>` : ''}

      <div style="margin-top: 24px; display: flex; justify-content: center; gap: 10px;">
        <button id="replayEffectBtn" class="btn-open" style="margin-top: 0; padding: 10px 20px; font-size: 14px;">
          ${type === 'birthday' ? 'Bắn Pháo Hoa 🎆' : 'Tung Trái Tim ❤️'}
        </button>
        <button id="hideCardInnerBtn" class="btn-open" style="margin-top: 0; padding: 10px 20px; font-size: 14px; background: rgba(255,255,255,0.2);">
          Ngắm Toàn Cảnh 🌌
        </button>
      </div>
    </div>
  </div>

  <script>
    const fullMessage = ${safeMessage};
    const effectType = '${effect || "neon_words"}';
    const musicMode = '${musicStyle}';
    const enableTTS = ${enableTTS !== false};
    const recipient = ${safeRecipient};
    const sender = ${safeSender};
    const date = '${date || ""}';
    const customWords = ${safeCustomWords};

    // 3D Neon Floating Words Canvas
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const isNeonWords = (effectType === 'neon_words');
    const particles = [];

    if (isNeonWords) {
      const defaultLove = ['Em yêu anh', 'Yêu em nhiều', 'Happy Anniversary', 'Mãi bên nhau', 'Hạnh phúc', 'Luôn mỉm cười', 'Bình yên', 'Thành công', 'Vững vàng', 'Forever & Always', 'My Love', 'Bên nhau mãi nhé'];
      const personalized = [];
      if (recipient) personalized.push(recipient, 'Gửi ' + recipient, recipient + ' ❤️');
      if (sender) personalized.push(sender, 'Yêu ' + sender);
      if (date) {
        personalized.push(date, 'Kỷ niệm ' + date);
        ${daysInfo && daysInfo.floatingWords ? `personalized.push(${daysInfo.floatingWords.map(w => JSON.stringify(w)).join(', ')});` : ''}
      }
      if (customWords && customWords.length) personalized.push(...customWords);

      const wordPool = [...personalized, ...personalized, ...defaultLove];
      const heartSymbols = ['❤️', '💖', '💕', '✨', '🌸'];
      const colors = ['#ff2a70', '#ff6584', '#f43f5e', '#fb7185', '#f472b6', '#ffffff'];

      class NeonWordParticle {
        constructor(initZ = Math.random() * 800) {
          this.reset(initZ);
        }
        reset(initZ = 800) {
          this.isHeart = Math.random() < 0.28;
          this.text = this.isHeart ? heartSymbols[Math.floor(Math.random() * heartSymbols.length)] : wordPool[Math.floor(Math.random() * wordPool.length)];
          this.x = (Math.random() - 0.5) * width * 1.5;
          this.y = (Math.random() - 0.5) * height * 1.5;
          this.z = initZ;
          this.speedZ = Math.random() * 1.8 + 0.8;
          this.vy = (Math.random() - 0.5) * 0.4 - 0.3;
          this.vx = (Math.random() - 0.5) * 0.4;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.rotation = (Math.random() - 0.5) * 0.3;
          this.rotSpeed = (Math.random() - 0.5) * 0.005;
          this.baseSize = this.isHeart ? 24 : (Math.random() * 14 + 18);
        }
        update() {
          this.z -= this.speedZ;
          this.y += this.vy * 2;
          this.x += this.vx * 2;
          this.rotation += this.rotSpeed;
          if (this.z <= 10) this.reset(800);
        }
        draw() {
          const fov = 400;
          const scale = fov / (fov + this.z);
          const projX = width / 2 + this.x * scale;
          const projY = height / 2 + this.y * scale;
          if (projX < -150 || projX > width + 150 || projY < -150 || projY > height + 150) return;

          const fontSize = Math.max(10, Math.floor(this.baseSize * scale * 1.6));
          const opacity = Math.min(1, Math.max(0.1, (1 - (this.z / 850)) * 1.1));

          ctx.save();
          ctx.translate(projX, projY);
          ctx.rotate(this.rotation);
          ctx.globalAlpha = opacity;

          if (this.isHeart) {
            ctx.font = (fontSize * 1.3) + 'px serif';
            ctx.fillText(this.text, 0, 0);
          } else {
            ctx.font = 'bold ' + fontSize + "px 'Dancing Script', cursive, sans-serif";
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = this.color;
            ctx.shadowBlur = scale > 0.6 ? 16 : 8;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, 0, 0);
            if (scale > 0.5) {
              ctx.shadowBlur = 4;
              ctx.fillStyle = '#ffffff';
              ctx.fillText(this.text, 0, 0);
            }
          }
          ctx.restore();
        }
      }

      const count = width < 640 ? 38 : 60;
      for (let i = 0; i < count; i++) {
        particles.push(new NeonWordParticle(Math.random() * 800));
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.sort((a, b) => b.z - a.z);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Built-in Music Box Synthesizer
    let audioCtx = null;
    let isPlayingAudio = false;
    let audioLoopTid = null;

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playTone(freq, time, dur) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = musicMode === 'birthday_melody' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.2, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(time);
      osc.stop(time + dur);
    }

    function startMelody() {
      initAudio();
      isPlayingAudio = true;
      document.getElementById('musicToggle').innerText = '🔊 Nhạc';

      if (musicMode === 'birthday_melody') {
        const notes = [
          { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.8 }, { f: 261.63, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 329.63, d: 1.2 },
          { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 293.66, d: 0.8 }, { f: 261.63, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 349.23, d: 1.2 },
          { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.4 }, { f: 523.25, d: 0.8 }, { f: 440.00, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 329.63, d: 0.8 }, { f: 293.66, d: 1.0 },
          { f: 466.16, d: 0.4 }, { f: 466.16, d: 0.4 }, { f: 440.00, d: 0.8 }, { f: 349.23, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 349.23, d: 1.6 }
        ];
        let t = audioCtx.currentTime + 0.1;
        notes.forEach(n => { playTone(n.f, t, n.d); t += n.d * 0.9; });
        audioLoopTid = setTimeout(() => { if (isPlayingAudio) startMelody(); }, (t - audioCtx.currentTime) * 1000);
      } else {
        const chords = [
          [261.63, 329.63, 392.00, 523.25],
          [246.94, 293.66, 392.00, 493.88],
          [220.00, 261.63, 329.63, 440.00],
          [174.61, 261.63, 349.23, 440.00]
        ];
        let t = audioCtx.currentTime + 0.1;
        chords.forEach(c => {
          c.forEach((n, idx) => { playTone(n, t + idx * 0.35, 1.8); });
          t += 1.6;
        });
        audioLoopTid = setTimeout(() => { if (isPlayingAudio) startMelody(); }, (t - audioCtx.currentTime) * 1000);
      }
    }

    function stopMelody() {
      isPlayingAudio = false;
      document.getElementById('musicToggle').innerText = '🔇 Nhạc';
      clearTimeout(audioLoopTid);
    }

    document.getElementById('musicToggle').addEventListener('click', () => {
      if (isPlayingAudio) stopMelody();
      else startMelody();
    });

    // Advanced TTS Voice Player with Google Neural Streaming + Web Speech Fallback
    let isSpeakingTTS = false;
    let currentTtsAudio = null;
    let ttsQueue = [];
    let ttsChunkIndex = 0;

    const ttsVoiceId = '${ttsVoice || "google_female_crystal"}';
    const voiceProfiles = {
      google_female_crystal: { engine: 'google', rate: 0.94, tag: 'Nữ AI Trong Veo ⭐' },
      google_whisper_love: { engine: 'google', rate: 0.88, tag: 'Nữ Thì Thầm 💕' },
      google_birthday_joy: { engine: 'google', rate: 1.02, tag: 'Nữ Tươi Vui 🎈' },
      male_radio: { engine: 'webspeech', gender: 'male', pitch: 0.82, rate: 0.88, tag: 'Nam Trầm Ấm 🎙️' },
      female_north: { engine: 'webspeech', gender: 'female', pitch: 1.05, rate: 0.92, tag: 'Hoài My (Nữ Bắc)' },
      male_north: { engine: 'webspeech', gender: 'male', pitch: 0.85, rate: 0.88, tag: 'Nam Minh (Nam Bắc)' },
      female_south: { engine: 'webspeech', gender: 'female', pitch: 1.16, rate: 0.94, tag: 'Nữ Sài Gòn 🌸' },
      male_south: { engine: 'webspeech', gender: 'male', pitch: 0.92, rate: 0.92, tag: 'Nam Sài Gòn 🌟' }
    };
    const currentProfile = voiceProfiles[ttsVoiceId] || voiceProfiles.google_female_crystal;

    function splitChunks(text, maxLen = 120) {
      if (!text) return [];
      const parts = text.replace(/([.?!;\n]+)/g, '$1|').split('|').map(s => s.trim()).filter(Boolean);
      const chunks = [];
      for (const p of parts) {
        if (p.length <= maxLen) chunks.push(p);
        else {
          const sps = p.replace(/([,:]+)/g, '$1|').split('|').map(s => s.trim()).filter(Boolean);
          for (const sp of sps) {
            if (sp.length <= maxLen) chunks.push(sp);
            else {
              const words = sp.split(' ');
              let cur = '';
              for (const w of words) {
                if ((cur + ' ' + w).trim().length <= maxLen) cur = cur ? cur + ' ' + w : w;
                else { if (cur) chunks.push(cur); cur = w; }
              }
              if (cur) chunks.push(cur);
            }
          }
        }
      }
      return chunks.length ? chunks : [text];
    }

    function playTTS() {
      stopTTS();
      isSpeakingTTS = true;
      document.getElementById('ttsToggle').innerText = '🔊 Đang Đọc';
      document.getElementById('ttsStatusPill').innerText = '🎙️ Đang đọc: ' + currentProfile.tag + '...';
      document.getElementById('ttsStatusPill').classList.remove('hidden-state');

      if (currentProfile.engine === 'google') {
        ttsQueue = splitChunks(fullMessage, 120);
        ttsChunkIndex = 0;

        function playChunk() {
          if (!isSpeakingTTS) return;
          if (ttsChunkIndex >= ttsQueue.length) {
            stopTTS();
            return;
          }
          const chunk = ttsQueue[ttsChunkIndex];
          const url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=' + encodeURIComponent(chunk);
          const audio = new Audio(url);
          audio.playbackRate = currentProfile.rate || 0.95;
          currentTtsAudio = audio;

          // Preload next chunk
          if (ttsChunkIndex + 1 < ttsQueue.length) {
            const nextAudio = new Audio('https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=' + encodeURIComponent(ttsQueue[ttsChunkIndex + 1]));
            nextAudio.preload = 'auto';
          }

          audio.onended = () => {
            ttsChunkIndex++;
            playChunk();
          };

          audio.onerror = () => {
            playWebSpeechFallback();
          };

          audio.play().catch(() => {
            playWebSpeechFallback();
          });
        }

        playChunk();
      } else {
        playWebSpeechFallback();
      }
    }

    function playWebSpeechFallback() {
      if (!window.speechSynthesis) {
        stopTTS();
        return;
      }
      const u = new SpeechSynthesisUtterance(fullMessage);
      u.lang = 'vi-VN';
      u.rate = currentProfile.rate || 0.9;
      u.pitch = currentProfile.pitch || 1.0;

      const voices = window.speechSynthesis.getVoices().filter(v => v.lang.includes('vi') || v.lang.includes('VN') || v.name.includes('Vietnamese'));
      if (voices.length > 0) {
        let matched = null;
        if (currentProfile.gender === 'male') {
          matched = voices.find(v => v.name.toLowerCase().includes('namminh') || v.name.toLowerCase().includes('male')) || voices[voices.length - 1];
        } else {
          matched = voices.find(v => v.name.toLowerCase().includes('hoaimy') || v.name.toLowerCase().includes('linh') || v.name.toLowerCase().includes('female')) || voices[0];
        }
        if (matched) u.voice = matched;
      }

      u.onend = () => stopTTS();
      u.onerror = () => stopTTS();
      window.speechSynthesis.speak(u);
    }

    function stopTTS() {
      isSpeakingTTS = false;
      if (currentTtsAudio) {
        try { currentTtsAudio.pause(); currentTtsAudio = null; } catch(e) {}
      }
      ttsQueue = [];
      ttsChunkIndex = 0;
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch(e) {}
      }
      document.getElementById('ttsToggle').innerText = '🎙️ ' + currentProfile.tag;
      document.getElementById('ttsStatusPill').classList.add('hidden-state');
    }

    document.getElementById('ttsToggle').addEventListener('click', () => {
      if (isSpeakingTTS) stopTTS();
      else playTTS();
    });

    // Hide/Show Card to admire 3D floating words
    function setCardVisible(visible) {
      if (visible) {
        document.getElementById('contentCard').classList.remove('hidden-state');
        document.getElementById('reopenCardBtn').classList.add('hidden-state');
        document.getElementById('cardToggleBtn').innerText = '👁️ Ngắm Mưa Chữ';
      } else {
        document.getElementById('contentCard').classList.add('hidden-state');
        document.getElementById('reopenCardBtn').classList.remove('hidden-state');
        document.getElementById('cardToggleBtn').innerText = '💌 Xem Lại Thiệp';
      }
    }

    document.getElementById('cardToggleBtn').addEventListener('click', () => {
      const isHidden = document.getElementById('contentCard').classList.contains('hidden-state');
      setCardVisible(isHidden);
    });

    document.getElementById('hideCardInnerBtn').addEventListener('click', () => {
      setCardVisible(false);
    });

    document.getElementById('reopenCardBtn').addEventListener('click', () => {
      setCardVisible(true);
    });

    // Open Surprise Button
    document.getElementById('openSurpriseBtn').addEventListener('click', () => {
      document.getElementById('introCard').classList.add('hidden-state');
      document.getElementById('contentCard').classList.remove('hidden-state');
      document.getElementById('ttsToggle').classList.remove('hidden-state');
      document.getElementById('cardToggleBtn').classList.remove('hidden-state');
      startMelody();

      if (enableTTS) {
        setTimeout(playTTS, 500);
      }

      // Typewriter effect
      const box = document.getElementById('typewriterBox');
      let i = 0;
      box.innerHTML = '';
      function typeNext() {
        if (i < fullMessage.length) {
          box.innerHTML += fullMessage.charAt(i);
          i++;
          setTimeout(typeNext, 45);
        }
      }
      typeNext();
    });

    document.getElementById('replayEffectBtn').addEventListener('click', () => {
      if (isNeonWords) {
        for (let i = 0; i < 15; i++) {
          particles.push(new NeonWordParticle(Math.random() * 400 + 400));
        }
      }
    });
  </script>
</body>
</html>`;
}
