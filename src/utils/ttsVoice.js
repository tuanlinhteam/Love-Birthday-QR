// Advanced Vietnamese TTS (Text-to-Speech) Manager
// Supports High-Quality Google Neural Audio Streaming (Crystal Clear & Smooth)
// + Web Speech API Regional Natural Voices with Fallback

export const TTS_VOICE_OPTIONS = [
  {
    id: 'google_female_crystal',
    label: 'Nữ AI Trong Veo (Google Studio - Siêu mượt mà, phát âm chuẩn)',
    tag: 'Trong Veo ⭐',
    icon: '🌸',
    category: 'AI Cao Cấp',
    region: 'Toàn Quốc (AI)',
    gender: 'Nữ',
    engine: 'google',
    rate: 0.94,
    description: 'Chất giọng trong trẻo, tự nhiên, phát âm từng thanh điệu êm dịu như người thật.',
    sampleText: 'Từ ngày gặp em, thế giới của anh bỗng trở nên rực rỡ và ngọt ngào hơn rất nhiều.'
  },
  {
    id: 'google_whisper_love',
    label: 'Nữ Ngọt Ngào Thì Thầm (Lãng Mạn - Êm ái, sâu lắng)',
    tag: 'Thì Thầm 💕',
    icon: '💖',
    category: 'AI Cao Cấp',
    region: 'Toàn Quốc (AI)',
    gender: 'Nữ',
    engine: 'google',
    rate: 0.88,
    description: 'Giọng đọc chậm rãi, dịu êm, thủ thỉ như lời tâm tình nhỏ to lúc đêm muộn.',
    sampleText: 'Dù mai này vật đổi sao dời, trái tim anh vẫn luôn hướng về một mình em thôi.'
  },
  {
    id: 'google_birthday_joy',
    label: 'Nữ Tươi Vui Hân Hoan (Sinh Nhật & Chúc Mừng)',
    tag: 'Tươi Sáng 🎈',
    icon: '🎉',
    category: 'AI Cao Cấp',
    region: 'Toàn Quốc (AI)',
    gender: 'Nữ',
    engine: 'google',
    rate: 1.02,
    description: 'Giọng điệu rạng rỡ, tươi mới, tràn ngập năng lượng chúc phúc sinh nhật.',
    sampleText: 'Chúc mừng sinh nhật! Chúc bạn tuổi mới ngập tràn tiếng cười, luôn rạng rỡ và đạt mọi ước mơ nhé!'
  },
  {
    id: 'male_radio',
    label: 'Nam Trầm Ấm Radio (Podcast - Nam tính, tình cảm)',
    tag: 'Trầm Ấm 🎙️',
    icon: '👨‍💼',
    category: 'AI Cao Cấp',
    region: 'Miền Bắc',
    gender: 'Nam',
    engine: 'webspeech_male',
    rate: 0.88,
    pitch: 0.82,
    description: 'Chất giọng nam trầm lắng, đĩnh đạc và ấm áp như phát thanh viên radio.',
    sampleText: 'Cảm ơn em đã bước vào cuộc đời anh. Chúc người anh yêu luôn bình an và ngập tràn hạnh phúc.'
  },
  {
    id: 'female_north',
    label: 'Nữ Hà Nội Dịu Dàng (Hoài My - Thanh lịch)',
    tag: 'Hoài My 👩',
    icon: '👩',
    category: 'Vùng Miền',
    region: 'Miền Bắc',
    gender: 'Nữ',
    engine: 'webspeech',
    rate: 0.92,
    pitch: 1.05,
    description: 'Giọng con gái Hà Nội chuẩn giọng Bắc, êm đềm và thanh thoát.',
    sampleText: 'Hà Nội mùa này đẹp nhất là khi có em sánh bước cùng anh qua từng góc phố.'
  },
  {
    id: 'female_south',
    label: 'Nữ Sài Gòn Dễ Thương (Trong sáng, ngọt ngào)',
    tag: 'Sài Gòn 🌸',
    icon: '🌸',
    category: 'Vùng Miền',
    region: 'Miền Nam',
    gender: 'Nữ',
    engine: 'webspeech',
    rate: 0.94,
    pitch: 1.16,
    description: 'Chất giọng miền Nam ngọt ngào, tươi vui, mang lại cảm giác cực kỳ gần gũi.',
    sampleText: 'Cảm ơn anh đã luôn ở bên cạnh, thương yêu và che chở cho em mỗi ngày nè.'
  },
  {
    id: 'male_north',
    label: 'Nam Hà Nội Điềm Đạm (Nam Minh - Chững chạc)',
    tag: 'Nam Minh 👨',
    icon: '👨',
    category: 'Vùng Miền',
    region: 'Miền Bắc',
    gender: 'Nam',
    engine: 'webspeech',
    rate: 0.88,
    pitch: 0.85,
    description: 'Giọng nam miền Bắc trầm lắng, ấm áp và đáng tin cậy.',
    sampleText: 'Chúc em một ngày sinh nhật thật nhiều niềm vui và luôn hạnh phúc bên anh nhé.'
  },
  {
    id: 'male_south',
    label: 'Nam Sài Gòn Ấm Áp (Chân thành, gần gũi)',
    tag: 'Nam Sài Gòn 🌟',
    icon: '🌟',
    category: 'Vùng Miền',
    region: 'Miền Nam',
    gender: 'Nam',
    engine: 'webspeech',
    rate: 0.92,
    pitch: 0.92,
    description: 'Chất giọng nam phương Nam phóng khoáng, chân thành và ngọt ngào.',
    sampleText: 'Thương chúc em yêu tuổi mới thiệt nhiều sức khỏe, luôn vui vẻ và cười nhiều lên nha.'
  }
];

// Split text into natural sentence chunks (max ~120 chars) for Google TTS API limits
export function splitTextIntoChunks(text, maxLen = 120) {
  if (!text) return [];
  // Split on sentence punctuation or newlines
  const parts = text.replace(/([.?!;\n]+)/g, '$1|').split('|').map(s => s.trim()).filter(Boolean);
  const chunks = [];

  for (const part of parts) {
    if (part.length <= maxLen) {
      chunks.push(part);
    } else {
      // Split by commas or words if a sentence is too long
      const subParts = part.replace(/([,:]+)/g, '$1|').split('|').map(s => s.trim()).filter(Boolean);
      for (const sp of subParts) {
        if (sp.length <= maxLen) {
          chunks.push(sp);
        } else {
          // Break by words
          const words = sp.split(' ');
          let current = '';
          for (const w of words) {
            if ((current + ' ' + w).trim().length <= maxLen) {
              current = current ? current + ' ' + w : w;
            } else {
              if (current) chunks.push(current);
              current = w;
            }
          }
          if (current) chunks.push(current);
        }
      }
    }
  }
  return chunks.length ? chunks : [text.substring(0, maxLen)];
}

class TTSManager {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.currentAudio = null;
    this.audioQueue = [];
    this.currentChunkIndex = 0;
    this.voicesLoaded = false;
    this.cachedVoices = [];

    // Pre-cache voices when browser is ready
    if (typeof window !== 'undefined' && this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return [];
    this.cachedVoices = this.synth.getVoices();
    this.voicesLoaded = this.cachedVoices.length > 0;
    return this.cachedVoices;
  }

  getVietnameseVoices() {
    const voices = this.loadVoices();
    return voices.filter(v => 
      v.lang.toLowerCase().includes('vi') || 
      v.lang.toLowerCase().includes('vn') ||
      v.name.toLowerCase().includes('vietnamese')
    );
  }

  getMatchedVoice(gender = 'female') {
    const viVoices = this.getVietnameseVoices();
    if (viVoices.length === 0) return null;

    // Prefer Natural / Online neural voices if available (Edge / Chrome)
    const naturalViVoices = viVoices.filter(v => 
      v.name.toLowerCase().includes('natural') || 
      v.name.toLowerCase().includes('online') ||
      v.name.toLowerCase().includes('google')
    );
    const candidateList = naturalViVoices.length > 0 ? naturalViVoices : viVoices;

    if (gender === 'male') {
      return candidateList.find(v =>
        v.name.toLowerCase().includes('namminh') ||
        v.name.toLowerCase().includes('male') ||
        (v.name.toLowerCase().includes('nam') && !v.name.toLowerCase().includes('vietnam'))
      ) || viVoices.find(v => v.name.toLowerCase().includes('namminh')) || viVoices[viVoices.length - 1];
    } else {
      return candidateList.find(v =>
        v.name.toLowerCase().includes('hoaimy') ||
        v.name.toLowerCase().includes('linh') ||
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('google')
      ) || viVoices[0];
    }
  }

  speak(text, { voiceOptionId = 'google_female_crystal', onStart, onEnd } = {}) {
    if (!text) return;
    this.stop();

    const selectedOption = TTS_VOICE_OPTIONS.find(o => o.id === voiceOptionId) || TTS_VOICE_OPTIONS[0];

    // Check if voice uses Google Neural Cloud stream
    if (selectedOption.engine === 'google') {
      this.playGoogleNeuralStream(text, selectedOption, onStart, onEnd);
    } else {
      this.playWebSpeech(text, selectedOption, onStart, onEnd);
    }
  }

  playGoogleNeuralStream(text, selectedOption, onStart, onEnd) {
    const chunks = splitTextIntoChunks(text, 120);
    if (!chunks.length) return;

    this.isSpeaking = true;
    this.audioQueue = chunks;
    this.currentChunkIndex = 0;

    let hasStarted = false;

    const playNextChunk = () => {
      if (!this.isSpeaking) return;

      if (this.currentChunkIndex >= this.audioQueue.length) {
        this.isSpeaking = false;
        if (onEnd) onEnd();
        return;
      }

      const chunkText = this.audioQueue[this.currentChunkIndex];
      const encoded = encodeURIComponent(chunkText);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;

      const audio = new Audio(url);
      audio.playbackRate = selectedOption.rate || 0.95;
      this.currentAudio = audio;

      // Preload next chunk for seamless gapless playback
      if (this.currentChunkIndex + 1 < this.audioQueue.length) {
        const nextText = this.audioQueue[this.currentChunkIndex + 1];
        const nextUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(nextText)}`;
        const preloadAudio = new Audio(nextUrl);
        preloadAudio.preload = 'auto';
      }

      audio.onplay = () => {
        if (!hasStarted) {
          hasStarted = true;
          if (onStart) onStart();
        }
      };

      audio.onended = () => {
        this.currentChunkIndex++;
        playNextChunk();
      };

      audio.onerror = (err) => {
        console.warn('Google TTS audio stream error, falling back to Web Speech API:', err);
        // Fallback to browser Web Speech API seamlessly
        this.currentAudio = null;
        this.playWebSpeech(text, selectedOption, onStart, onEnd);
      };

      audio.play().catch(err => {
        console.warn('Audio play failed (maybe autoplay restriction):', err);
        // Fallback to Web Speech API
        this.playWebSpeech(text, selectedOption, onStart, onEnd);
      });
    };

    playNextChunk();
  }

  playWebSpeech(text, selectedOption, onStart, onEnd) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = selectedOption.rate || 0.9;
    utterance.pitch = selectedOption.pitch || 1.0;

    const gender = (selectedOption.gender === 'Nam' || selectedOption.engine === 'webspeech_male') ? 'male' : 'female';
    const matchedVoice = this.getMatchedVoice(gender);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.synth.speak(utterance);
  }

  stop() {
    this.isSpeaking = false;

    // Stop Google TTS Audio stream
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
      } catch (e) {
        // ignore
      }
    }
    this.audioQueue = [];
    this.currentChunkIndex = 0;

    // Stop Web Speech
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.currentUtterance = null;
  }
}

export const ttsManager = new TTSManager();
