import React from 'react';
import { Mail, Link as LinkIcon, Sparkles } from 'lucide-react';
import { SAMPLE_MESSAGES } from '../constants/presets';

export default function SimpleContentEditor({
  mode,
  textContent,
  onChangeTextContent,
  linkContent,
  onChangeLinkContent
}) {
  if (mode === 'link') {
    return (
      <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-rose-100 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-purple-600" />
            <span>Bước 2: Nhập Đường Link Kỷ Niệm</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dán link Video YouTube, TikTok, Album Google Photos, hoặc bài hát bạn muốn người ấy xem
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Đường dẫn URL (Link web):
          </label>
          <input
            type="url"
            value={linkContent}
            onChange={(e) => onChangeLinkContent(e.target.value)}
            placeholder="https://youtu.be/... hoặc https://photos.app.goo.gl/..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
          />
        </div>

        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-800 space-y-1">
          <p className="font-semibold">💡 Mẹo hay cho bạn:</p>
          <p>• Bạn có thể làm một video ngắn trên CapCut/TikTok kỷ niệm ngày yêu rồi copy link dán vào đây.</p>
          <p>• Quét mã QR bằng điện thoại sẽ tự động mở thẳng ứng dụng YouTube/TikTok hoặc trình duyệt web.</p>
        </div>
      </div>
    );
  }

  // Text message mode
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-rose-100 shadow-sm space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Mail className="w-4 h-4 text-rose-500" />
          <span>Bước 2: Viết Lời Nhắn / Thơ Bí Mật</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Khi người ấy quét mã, nội dung này sẽ hiện ngay trên màn hình điện thoại mà không cần kết nối mạng
        </p>
      </div>

      {/* Quick samples */}
      <div>
        <div className="flex items-center gap-1 text-xs text-rose-600 font-medium mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chọn nhanh mẫu tin nhắn lãng mạn:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[...SAMPLE_MESSAGES.love, ...SAMPLE_MESSAGES.birthday].slice(0, 4).map((msg, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onChangeTextContent(msg)}
              className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 transition-colors truncate max-w-[220px]"
              title={msg}
            >
              {msg.substring(0, 26)}...
            </button>
          ))}
        </div>
      </div>

      <div>
        <textarea
          rows={5}
          value={textContent}
          onChange={(e) => onChangeTextContent(e.target.value)}
          placeholder="Nhập bức tâm thư, bài thơ tình yêu, hoặc lời chúc mừng sinh nhật..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white leading-relaxed"
        ></textarea>
      </div>

      <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-xs text-rose-800">
        <p className="font-semibold">✨ Ưu điểm:</p>
        <p>Thông điệp được mã hóa trực tiếp trong mã QR. Người nhận quét bằng camera iPhone hoặc ứng dụng Zalo/Camera Android là đọc được ngay lập tức!</p>
      </div>
    </div>
  );
}
