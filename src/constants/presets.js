export const COLOR_PRESETS = [
  {
    id: 'sweet-pink',
    name: 'Hồng Ngọt Ngào',
    primary: '#e11d48',
    secondary: '#f43f5e',
    gradient: true,
    bg: '#ffffff',
    gradientType: 'linear',
    rotation: 45,
    previewClass: 'from-rose-600 to-pink-500'
  },
  {
    id: 'passion-red',
    name: 'Đỏ Tình Yêu',
    primary: '#be123c',
    secondary: '#881337',
    gradient: true,
    bg: '#ffffff',
    gradientType: 'linear',
    rotation: 90,
    previewClass: 'from-rose-700 to-rose-950'
  },
  {
    id: 'sunset-glow',
    name: 'Hoàng Hôn Lãng Mạn',
    primary: '#db2777',
    secondary: '#ea580c',
    gradient: true,
    bg: '#ffffff',
    gradientType: 'linear',
    rotation: 45,
    previewClass: 'from-pink-600 to-amber-600'
  },
  {
    id: 'lavender-dream',
    name: 'Tím Thủy Chung',
    primary: '#7c3aed',
    secondary: '#c026d3',
    gradient: true,
    bg: '#ffffff',
    gradientType: 'linear',
    rotation: 60,
    previewClass: 'from-purple-600 to-fuchsia-600'
  },
  {
    id: 'birthday-gold',
    name: 'Sinh Nhật Hoàng Gia',
    primary: '#d97706',
    secondary: '#e11d48',
    gradient: true,
    bg: '#ffffff',
    gradientType: 'linear',
    rotation: 45,
    previewClass: 'from-amber-600 to-rose-600'
  },
  {
    id: 'midnight-romance',
    name: 'Đêm Huyền Bí',
    primary: '#3730a3',
    secondary: '#be185d',
    gradient: true,
    bg: '#ffffff',
    gradientType: 'linear',
    rotation: 120,
    previewClass: 'from-indigo-800 to-pink-700'
  }
];

export const LOGO_OPTIONS = [
  { id: 'none', label: 'Không logo', icon: '🚫' },
  { id: 'heart', label: 'Trái Tim Đỏ', icon: '❤️', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e11d48"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>` },
  { id: 'sparkle-heart', label: 'Trái Tim Lấp Lánh', icon: '💖', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ec4899"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>` },
  { id: 'cake', label: 'Bánh Sinh Nhật', icon: '🎂', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 6a2 2 0 0 0 2-2c0-.38-.1-.73-.29-1.03l-.71-1.12a1 1 0 0 0-1.7 0l-.71 1.12C10.1 3.27 10 3.62 10 4a2 2 0 0 0 2 2zm7 4h-2V9a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1H5a2 2 0 0 0-2 2v2a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-2a2 2 0 0 0-2-2zm-3 7v1a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-1H4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2h-4z"/></svg>` },
  { id: 'gift', label: 'Hộp Quà Bất Ngờ', icon: '🎁', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e11d48"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.62 0-2.95 1.28-3 2.87V5H12v-.13C11.95 3.28 10.62 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1h-2V5c0-.55.45-1 1-1zm-6 0c.55 0 1 .45 1 1v1H8c-.55 0-1-.45-1-1s.45-1 1-1zm4 16H6V13h7v7zm7 0h-5V13h5v7z"/></svg>` },
  { id: 'ring', label: 'Chiếc Nhẫn Cầu Hôn', icon: '💍', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b82f6"><path d="M12 2l2.4 2.4-2.4 2.4-2.4-2.4L12 2zm0 6c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm0 2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/></svg>` },
  { id: 'custom', label: 'Tải Ảnh Của Bạn', icon: '📷' }
];

export const FRAME_OPTIONS = [
  { id: 'none', label: 'Không viền', text: '' },
  { id: 'love_gift', label: 'Quét Mở Quà Bí Mật 🎁', text: 'Quét để mở quà bí mật 🎁', sub: 'Chỉ dành riêng cho người đặc biệt' },
  { id: 'scan_love', label: 'Scan me with Love ❤️', text: 'Scan me with Love ❤️', sub: 'Mở bằng camera điện thoại' },
  { id: 'happy_birthday', label: 'Happy Birthday to You 🎂', text: 'Happy Birthday 🎂', sub: 'Quét để nhận lời chúc bất ngờ' },
  { id: 'for_you', label: 'Gửi Đến Người Thương 💌', text: 'Gửi Đến Người Thương 💌', sub: 'Điều anh muốn nói với em' },
  { id: 'forever', label: 'Forever & Always ✨', text: 'Forever & Always ✨', sub: 'Kỷ niệm tình yêu đôi ta' },
];

export const SAMPLE_MESSAGES = {
  love: [
    "Từ ngày gặp em, thế giới của anh bỗng trở nên ngọt ngào và rực rỡ hơn rất nhiều. Cảm ơn em vì đã đến và làm cho mỗi ngày trôi qua đều là một ngày hạnh phúc. Yêu em rất nhiều! ❤️",
    "Gửi người con gái anh yêu nhất: Nếu có một điều ước, anh chỉ ước được nắm tay em đi qua mọi thăng trầm của cuộc đời. Dù hôm nay hay mãi mãi về sau, tình yêu anh dành cho em vẫn vẹn nguyên như ngày đầu. 💕",
    "Người ta bảo tình yêu là một chuyến hành trình, và may mắn lớn nhất của cuộc đời anh là có em làm bạn đồng hành. Chúc tình yêu của chúng mình luôn bền chặt và ấm áp như thế này nhé! 🌹"
  ],
  birthday: [
    "Chúc mừng sinh nhật người đặc biệt nhất trong lòng tớ! 🎉 Tuổi mới chúc cậu luôn rạng rỡ, xinh đẹp, bình an và gặt hái thật nhiều thành công nhé! 🎂🎈",
    "Happy Birthday My Love! 🎁 Chúc anh tuổi mới thật nhiều sức khỏe, luôn vui vẻ và tiếp tục yêu thương em nhiều hơn mỗi ngày. Mãi bên nhau anh nhé! 💖",
    "Sinh nhật vui vẻ nhé người bạn tuyệt vời! Chúc bạn tuổi mới luôn ngập tràn tiếng cười, hạnh phúc bên những người thân yêu và vạn sự như ý! 🥳✨"
  ],
  confession: [
    "Có những lời anh đã cất giữ trong lòng từ rất lâu rồi... Hôm nay, qua mã QR này, anh muốn can đảm nói với em rằng: Anh thích em rất nhiều! Em có đồng ý làm người yêu anh không? 💌💍",
    "Cậu có biết không? Ánh mắt của cậu là điều khiến tớ xao xuyến nhất. Nếu cậu cũng có cùng cảm xúc như tớ, hãy nhắn lại cho tớ một tin nhắn nhé! ❤️"
  ]
};

export const AUDIO_TRACKS = [
  {
    id: 'lofi_love',
    name: 'Nhạc Lofi Tình Yêu Nhẹ Nhàng 🎵',
    url: 'https://actions.google.com/sounds/v1/ambiences/outdoor_rain.ogg', // Fallback web audio tone will also be generated
    synthStyle: 'romantic_chords'
  },
  {
    id: 'happy_birthday',
    name: 'Giai Điệu Happy Birthday Ngọt Ngào 🎂',
    url: '',
    synthStyle: 'birthday_melody'
  },
  {
    id: 'canon_d',
    name: 'Canon In D - Lãng Mạn Bất Hủ 🎹',
    url: '',
    synthStyle: 'canon_piano'
  }
];
