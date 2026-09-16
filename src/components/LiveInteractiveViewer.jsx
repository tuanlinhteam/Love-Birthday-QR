import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Heart, Sparkles, Cake, Gift, ArrowLeft, Download, Mic, MicOff, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { melodyPlayer } from '../utils/melodySynthesizer';
import { generateStandaloneHtml } from '../utils/exportHtml';
import { ttsManager, TTS_VOICE_OPTIONS } from '../utils/ttsVoice';
import { createNeonWordsEngine } from '../utils/neonWordsEngine';

export default function LiveInteractiveViewer({
  isOpen,
  onClose,
  pageData
}) {
  const [isOpened, setIsOpened] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isCardHidden, setIsCardHidden] = useState(false);
  const canvasRef = useRef(null);

  const fullMessage = pageData.message || 'Mỗi khoảnh khắc có em trong cuộc đời đều là một điều kỳ diệu đối với anh... Yêu em rất nhiều! ❤️';
  const memoryPhoto = pageData.photos?.[0] || null;
  const currentVoice = TTS_VOICE_OPTIONS.find(v => v.id === (pageData.ttsVoice || 'google_female_crystal')) || TTS_VOICE_OPTIONS[0];
  const isNeonWords = (!pageData.effect || pageData.effect === 'neon_words');

  // Canvas animation: either 3D Neon Floating Words or Particles
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isNeonWords) {
      const engine = createNeonWordsEngine(canvas, {
        recipient: pageData.recipient,
        sender: pageData.sender,
        date: pageData.date,
        type: pageData.type,
        customWords: pageData.customWords
      });
      engine.start();
      return () => engine.destroy();
    }

    // Fallback: standard particle animation
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const symbols = pageData.type === 'birthday' ? ['🎈', '✨', '⭐', '🎉', '🎁'] : ['❤️', '💖', '💕', '🌸', '✨'];
    const pList = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 80,
      size: Math.random() * 18 + 14,
      speedY: Math.random() * 1.8 + 1,
      speedX: (Math.random() - 0.5) * 1.2,
      char: symbols[Math.floor(Math.random() * symbols.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.6 + 0.4
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pList.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
        if (p.y < -40) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, pageData.type, isNeonWords, pageData.recipient, pageData.sender, pageData.date, pageData.customWords]);

  // Clean up audio & TTS on close
  useEffect(() => {
    if (!isOpen) {
      melodyPlayer.stop();
      ttsManager.stop();
      setIsPlayingMusic(false);
      setIsPlayingTTS(false);
      setIsOpened(false);
      setIsCardHidden(false);
      setTypedText('');
    }
  }, [isOpen]);

  // Typewriter effect
  useEffect(() => {
    if (!isOpened) return;

    let index = 0;
    setTypedText('');
    const timer = setInterval(() => {
      if (index < fullMessage.length) {
        setTypedText(prev => prev + fullMessage.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [isOpened, fullMessage]);

  if (!isOpen) return null;

  const handleOpenSurprise = () => {
    setIsOpened(true);

    // Confetti boom
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Start background melody
    if (pageData.musicStyle === 'birthday_melody') {
      melodyPlayer.playHappyBirthday();
    } else if (pageData.musicStyle === 'canon_piano') {
      melodyPlayer.playCanonInD();
    } else {
      melodyPlayer.playRomanticChords();
    }
    setIsPlayingMusic(true);

    // Start TTS reading with chosen regional voice
    if (pageData.enableTTS !== false) {
      ttsManager.speak(fullMessage, {
        voiceOptionId: pageData.ttsVoice || 'google_female_crystal',
        onStart: () => setIsPlayingTTS(true),
        onEnd: () => setIsPlayingTTS(false)
      });
    }
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      melodyPlayer.stop();
      setIsPlayingMusic(false);
    } else {
      if (pageData.musicStyle === 'birthday_melody') {
        melodyPlayer.playHappyBirthday();
      } else if (pageData.musicStyle === 'canon_piano') {
        melodyPlayer.playCanonInD();
      } else {
        melodyPlayer.playRomanticChords();
      }
      setIsPlayingMusic(true);
    }
  };

  const toggleTTS = () => {
    if (isPlayingTTS) {
      ttsManager.stop();
      setIsPlayingTTS(false);
    } else {
      ttsManager.speak(fullMessage, {
        voiceOptionId: pageData.ttsVoice || 'google_female_crystal',
        onStart: () => setIsPlayingTTS(true),
        onEnd: () => setIsPlayingTTS(false)
      });
    }
  };

  const triggerMoreEffects = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleDownloadStandaloneHtml = () => {
    const htmlCode = generateStandaloneHtml(pageData);
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pageData.type === 'birthday' ? 'chuc_mung_sinh_nhat' : 'to_tinh_yeu_thuong'}_${Date.now()}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${
      isNeonWords
        ? 'bg-gradient-to-br from-[#0a010f] via-[#16041a] to-[#06000c] text-white'
        : (pageData.type === 'birthday'
          ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 text-white'
          : 'bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 text-slate-800')
    }`}>
      {/* Ambient background blur from the 1 memory photo if uploaded */}
      {memoryPhoto && isOpened && !isCardHidden && (
        <div
          className="fixed inset-0 bg-cover bg-center blur-3xl opacity-20 scale-110 pointer-events-none transition-opacity duration-1000"
          style={{ backgroundImage: `url(${memoryPhoto})` }}
        />
      )}

      {/* 3D Floating Neon Words & Particles Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* Top Floating Controls */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between max-w-4xl mx-auto">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur text-slate-700 hover:bg-white text-xs font-semibold shadow-md transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Chỉnh Sửa</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadStandaloneHtml}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 text-xs font-semibold shadow-md shadow-rose-200 transition-all hover:scale-105"
            title="Tải về tệp HTML độc lập để gửi người ấy"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Tải File Web (.html)</span>
          </button>

          {/* Toggle Hide/Show Card to admire the full-screen 3D neon words */}
          {isOpened && (
            <button
              onClick={() => setIsCardHidden(!isCardHidden)}
              className="px-3 py-2 rounded-full bg-white/85 hover:bg-white text-slate-700 shadow-md text-xs font-bold transition-all flex items-center gap-1.5"
              title="Ẩn/Hiện thiệp để ngắm trọn vẹn màn mưa chữ 3D"
            >
              {isCardHidden ? <Eye className="w-4 h-4 text-rose-500" /> : <EyeOff className="w-4 h-4 text-slate-500" />}
              <span className="hidden sm:inline">{isCardHidden ? 'Xem lại thiệp' : 'Ngắm mưa chữ'}</span>
            </button>
          )}

          {/* TTS Voice Reading Toggle Button */}
          {isOpened && (
            <button
              onClick={toggleTTS}
              className={`px-3 py-2 rounded-full flex items-center gap-1.5 shadow-md text-xs font-bold transition-all ${
                isPlayingTTS
                  ? 'bg-rose-600 text-white animate-pulse shadow-rose-300'
                  : 'bg-white/85 text-slate-700 hover:bg-white'
              }`}
              title={`Giọng đọc: ${currentVoice.label}`}
            >
              {isPlayingTTS ? <Mic className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-rose-500" />}
              <span>{isPlayingTTS ? 'Đang đọc...' : `Giọng ${currentVoice.tag}`}</span>
            </button>
          )}

          {/* Music Toggle Button */}
          <button
            onClick={toggleMusic}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
              isPlayingMusic ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/80 text-slate-700'
            }`}
            title="Bật/Tắt Nhạc"
          >
            {isPlayingMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Center Container */}
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative z-20">
        {!isOpened ? (
          /* Initial State: The Romantic Surprise Box / Envelope */
          <div className="max-w-md w-full bg-white/92 backdrop-blur-md rounded-3xl p-8 text-center shadow-2xl border border-rose-200/80 animate-float-slow text-slate-800">
            <div className="text-6xl mb-4 animate-bounce">
              {pageData.type === 'birthday' ? '🎂' : '💌'}
            </div>

            <h2 className="font-handwriting text-3xl font-bold text-rose-600 mb-2">
              {pageData.recipient ? `Gửi ${pageData.recipient} ❤️` : 'Gửi Đến Người Đặc Biệt'}
            </h2>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {pageData.type === 'birthday'
                ? 'Một giai điệu ngọt ngào, giọng đọc ấm áp và bầu trời chữ 3D lung linh đang chờ bạn mở ra...'
                : 'Có một bức thư bí mật cùng mưa chữ tình yêu phát sáng muốn gửi trao đến bạn...'}
            </p>

            <button
              onClick={handleOpenSurprise}
              className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-rose-300 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              {pageData.type === 'birthday' ? (
                <>
                  <Cake className="w-5 h-5" />
                  <span>Thổi Nến & Mở Quà Sinh Nhật 🎈</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-current" />
                  <span>Chạm Để Mở Thư Tình 💖</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Opened State: Celebration Card (or floating pill if card is hidden) */
          isCardHidden ? (
            <button
              onClick={() => setIsCardHidden(false)}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold shadow-2xl shadow-rose-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-white/40 animate-pulse text-sm"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Chạm vào đây để mở lại bức thư tình 💌</span>
            </button>
          ) : (
            <div className={`max-w-xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl border transition-all relative overflow-hidden ${
              isNeonWords
                ? 'bg-black/60 border-rose-500/40 text-white shadow-rose-950/50'
                : (pageData.type === 'birthday'
                  ? 'bg-indigo-900/85 border-amber-400/40 text-white'
                  : 'bg-white/95 border-rose-200 text-slate-800')
            }`}>
              <div className="text-center">
                <div className="inline-block p-3 rounded-2xl bg-rose-500/20 text-rose-400 text-4xl mb-2">
                  {pageData.type === 'birthday' ? '🎉' : '💖'}
                </div>

                <h1 className="font-romantic text-4xl sm:text-5xl text-rose-400 mb-2 font-bold drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]">
                  {pageData.title || (pageData.type === 'birthday' ? 'Happy Birthday to You!' : 'Yêu Em Mãi Mãi')}
                </h1>

                {pageData.date && (
                  <div className="text-xs font-semibold tracking-wider uppercase opacity-85 mb-4 text-pink-200">
                    🗓️ {pageData.date}
                  </div>
                )}
              </div>

              {/* 1 Memory Photo in Romantic Framed Border */}
              {memoryPhoto && (
                <div className="my-5 flex flex-col items-center">
                  <div className="relative p-2.5 bg-gradient-to-tr from-rose-950/60 via-pink-900/30 to-purple-950/60 rounded-3xl shadow-2xl border-2 border-rose-400/60 max-w-sm w-full group">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] font-bold rounded-full shadow-lg shadow-rose-500/50 flex items-center gap-1 z-10 whitespace-nowrap">
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{pageData.type === 'birthday' ? 'Khoảnh Khắc Đẹp Nhất 🎂' : 'Kỷ Niệm Của Chúng Mình ❤️'}</span>
                    </div>

                    <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-rose-300/40 bg-black/40 shadow-inner">
                      <img
                        src={memoryPhoto}
                        alt="Kỷ niệm đẹp"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Typewriter Love Letter Box with TTS indicator */}
              <div className={`my-5 p-5 rounded-2xl font-handwriting text-2xl sm:text-3xl leading-relaxed min-h-[140px] whitespace-pre-wrap relative shadow-inner ${
                isNeonWords
                  ? 'bg-rose-950/30 border border-rose-400/40 text-rose-100'
                  : (pageData.type === 'birthday'
                    ? 'bg-purple-950/70 border border-purple-800 text-pink-100'
                    : 'bg-rose-50/80 border border-rose-200 text-rose-950')
              }`}>
                {/* TTS voice playing animated pill */}
                {isPlayingTTS && (
                  <div className="mb-2 text-xs font-sans font-semibold text-rose-300 flex items-center gap-1.5 animate-pulse bg-rose-900/50 px-2.5 py-1 rounded-full w-fit border border-rose-500/30">
                    <Mic className="w-3.5 h-3.5 text-rose-400" />
                    <span>Đang đọc: Giọng {currentVoice.region} ({currentVoice.gender} - {currentVoice.tag})...</span>
                  </div>
                )}

                {typedText}
                <span className="inline-block w-1.5 h-6 bg-rose-400 animate-pulse ml-1 align-middle"></span>
              </div>

              {/* Sender Signature */}
              {pageData.sender && (
                <div className="text-right font-handwriting text-2xl font-bold text-rose-400 mt-2">
                  — Yêu thương, {pageData.sender} —
                </div>
              )}

              {/* Interactive Buttons */}
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  onClick={triggerMoreEffects}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{pageData.type === 'birthday' ? 'Bắn Thêm Pháo Hoa 🎆' : 'Tung Thêm Trái Tim ❤️'}</span>
                </button>

                <button
                  onClick={() => setIsCardHidden(true)}
                  className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  title="Ẩn khung thư để ngắm trọn vẹn không gian mưa chữ phát sáng"
                >
                  <EyeOff className="w-4 h-4" />
                  <span>Ngắm Toàn Cảnh Mưa Chữ 🌌</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
