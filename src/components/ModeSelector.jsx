import React from 'react';
import { Sparkles, Mail, Link as LinkIcon } from 'lucide-react';

export default function ModeSelector({ currentMode, onSelectMode }) {
  const modes = [
    {
      id: 'interactive',
      title: 'Trang Web Tương Tác',
      desc: 'Mở hộp thư/quà, nhạc lofi/sinh nhật, mưa tim & pháo hoa',
      icon: Sparkles,
      tag: 'Khuyên Dùng ⭐',
      color: 'from-rose-500 to-pink-500'
    },
    {
      id: 'text',
      title: 'Bức Thư / Lời Chúc Bí Mật',
      desc: 'Quét để đọc ngay lời chúc tình yêu hoặc thơ lãng mạn',
      icon: Mail,
      tag: 'Ngoại Tuyến',
      color: 'from-amber-500 to-rose-500'
    },
    {
      id: 'link',
      title: 'Liên Kết Kỷ Niệm',
      desc: 'Dẫn tới Video YouTube, TikTok kỷ niệm hoặc Album ảnh',
      icon: LinkIcon,
      tag: 'Video & Album',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-sm">
      <div className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center justify-between">
        <span>Bước 1: Chọn Hình Thức Quét Mã</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = currentMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-500 bg-rose-50/70 shadow-sm ring-2 ring-rose-200'
                  : 'border-slate-200/80 bg-white hover:border-rose-200 hover:bg-slate-50/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-tr ${mode.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {mode.tag}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{mode.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{mode.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
