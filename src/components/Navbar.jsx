import React from 'react';
import { Heart, Sparkles, BookOpen, Gift } from 'lucide-react';

export default function Navbar({ onOpenTips, onOpenMockup }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-md shadow-rose-200">
            <Heart className="w-6 h-6 fill-current animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1.5">
              Love & Birthday QR
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 font-semibold uppercase tracking-wider">
                Pro
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Tạo mã QR Tình Yêu & Lời Chúc Sinh Nhật Tương Tác
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenTips}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <BookOpen className="w-4 h-4 text-rose-500" />
            <span className="hidden sm:inline">Mẹo Tặng Quà</span>
          </button>

          <button
            onClick={onOpenMockup}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-md shadow-rose-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Gift className="w-4 h-4" />
            <span>Ghép Thiệp & Quà</span>
          </button>
        </div>
      </div>
    </header>
  );
}
