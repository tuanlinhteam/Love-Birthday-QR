// 3D Neon Floating Words & Names Canvas Engine (TikTok Viral Style)

export function createNeonWordsEngine(canvas, {
  recipient = '',
  sender = '',
  date = '',
  type = 'love', // 'love' | 'birthday'
  customWords = []
} = {}) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let animId = null;
  let isRunning = false;

  // Build word bank from personalization
  const defaultLoveWords = [
    'Em yêu anh', 'Yêu em nhiều', 'Happy Anniversary', 'Mãi bên nhau',
    'Hạnh phúc', 'Luôn mỉm cười', 'Bình yên', 'Thành công', 'Vững vàng',
    'Forever & Always', 'My Love', '1000 Days', 'Thương em', 'Bên nhau mãi nhé'
  ];

  const defaultBirthdayWords = [
    'Happy Birthday', 'Sinh nhật vui vẻ', 'Tuổi mới rạng rỡ', 'Xinh đẹp',
    'Luôn vui tươi', 'Thành công rực rỡ', 'Bình an', 'Vạn sự như ý',
    'Hạnh phúc viên mãn', 'Ước gì được nấy', 'Mãi tươi trẻ'
  ];

  const baseWords = type === 'birthday' ? defaultBirthdayWords : defaultLoveWords;
  const personalizedList = [];

  if (recipient) personalizedList.push(recipient, `Gửi ${recipient}`, `${recipient} ❤️`);
  if (sender) personalizedList.push(sender, `Yêu ${sender}`, `From ${sender}`);
  if (date) personalizedList.push(date, `Kỷ niệm ${date}`);
  if (customWords && customWords.length) personalizedList.push(...customWords);

  // Combine words and emojis
  const wordPool = [...personalizedList, ...personalizedList, ...baseWords];
  const heartSymbols = type === 'birthday'
    ? ['🎂', '🎈', '🎉', '✨', '🎁', '⭐', '💖']
    : ['❤️', '💖', '💕', '✨', '🌸', '💫'];

  const colors = type === 'birthday' 
    ? ['#fbbf24', '#f472b6', '#c084fc', '#60a5fa', '#fde047', '#ff6b81', '#ffffff']
    : ['#ff2a70', '#ff6584', '#f43f5e', '#fb7185', '#f472b6', '#fda4af', '#ffffff'];

  // Particle 3D-like physics
  class NeonWordParticle {
    constructor(initZ = Math.random() * 800) {
      this.reset(initZ);
    }

    reset(initZ = 800) {
      this.isHeart = Math.random() < 0.28;
      this.text = this.isHeart 
        ? heartSymbols[Math.floor(Math.random() * heartSymbols.length)]
        : wordPool[Math.floor(Math.random() * wordPool.length)];

      this.x = (Math.random() - 0.5) * width * 1.5;
      this.y = (Math.random() - 0.5) * height * 1.5;
      this.z = initZ; // Depth: far (800) to near (0)
      
      this.speedZ = Math.random() * 1.8 + 0.8; // Moving towards screen
      this.vy = (Math.random() - 0.5) * 0.4 - 0.3; // Slight upward drift
      this.vx = (Math.random() - 0.5) * 0.4;
      
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = (Math.random() - 0.5) * 0.3;
      this.rotSpeed = (Math.random() - 0.5) * 0.005;
      
      // Base font size
      this.baseSize = this.isHeart ? 24 : (Math.random() * 14 + 18);
    }

    update() {
      this.z -= this.speedZ;
      this.y += this.vy * 2;
      this.x += this.vx * 2;
      this.rotation += this.rotSpeed;

      // When particle flies past camera or goes out of view, respawn at back
      if (this.z <= 10) {
        this.reset(800);
      }
    }

    draw() {
      // 3D Perspective Projection
      const fov = 400;
      const scale = fov / (fov + this.z);
      const projX = width / 2 + this.x * scale;
      const projY = height / 2 + this.y * scale;

      if (projX < -150 || projX > width + 150 || projY < -150 || projY > height + 150) {
        return;
      }

      const fontSize = Math.max(10, Math.floor(this.baseSize * scale * 1.6));
      const opacity = Math.min(1, Math.max(0.1, (1 - (this.z / 850)) * 1.1));

      ctx.save();
      ctx.translate(projX, projY);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = opacity;

      if (this.isHeart) {
        ctx.font = `${fontSize * 1.3}px serif`;
        ctx.fillText(this.text, 0, 0);
      } else {
        // Neon Glow Effect
        ctx.font = `bold ${fontSize}px 'Dancing Script', 'Great Vibes', cursive, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Outer glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = scale > 0.6 ? 16 : 8;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, 0, 0);

        // Inner bright core
        if (scale > 0.5) {
          ctx.shadowBlur = 4;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(this.text, 0, 0);
        }
      }

      ctx.restore();
    }
  }

  // Create particle pool
  const count = width < 640 ? 38 : 60;
  const particles = Array.from({ length: count }, () => new NeonWordParticle(Math.random() * 800));

  function onResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', onResize);

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    // Sort by depth (far away drawn first)
    particles.sort((a, b) => b.z - a.z);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animId = requestAnimationFrame(render);
  }

  return {
    start() {
      if (isRunning) return;
      isRunning = true;
      render();
    },
    stop() {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, width, height);
    },
    destroy() {
      this.stop();
      window.removeEventListener('resize', onResize);
    }
  };
}
