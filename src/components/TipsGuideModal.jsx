import React from 'react';
import { X, Gift, Heart, Sparkles, Smartphone, Lightbulb, Printer, Music } from 'lucide-react';

export default function TipsGuideModal({ isOpen, onClose, onOpenMockup }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-rose-100 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-100 flex items-center justify-between bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-slate-800 text-lg">Mẹo Tạo Mã QR Tình Yêu & Sinh Nhật Đầy Ý Nghĩa</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Tip 1 */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">1. Giấu mã QR dưới đáy hộp quà hoặc bó hoa</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Khi người ấy nhận quà thật (như gấu bông, socola, đồng hồ...), hãy dán mã QR bí mật ở nắp trong hoặc dưới đáy hộp với dòng chữ "Quét để nhận món quà thứ hai". Người ấy quét mã sẽ xúc động vì bất ngờ!
              </p>
            </div>
          </div>

          {/* Tip 2 */}
          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-pink-200">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">2. Ghép vào ảnh Polaroid in ra kẹp ví</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Dùng tính năng "Ghép Thiệp & Quà" có sẵn trong ứng dụng để ghép ảnh kỷ niệm của hai bạn với mã QR theo phong cách Polaroid. Bạn có thể in ra kẹp ví của người ấy để bất cứ khi nào nhớ nhau đều có thể quét nghe nhạc và đọc thư tình.
              </p>
            </div>
          </div>

          {/* Tip 3 */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">3. Gửi mã QR đúng 00:00 ngày sinh nhật</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Gửi mã QR qua tin nhắn đúng 00:00 kèm tin nhắn ngắn "Quét ngay nhé!". Khi mở ra, khúc ca Happy Birthday tự động cất lên kèm pháo hoa và bức tâm thư tuổi mới sẽ là lời chúc đầu tiên và ý nghĩa nhất.
              </p>
            </div>
          </div>

          {/* Tip 4 */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-200">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">4. Kiểm tra quét trước khi gửi hoặc in</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Sau khi tạo mã QR, luôn dùng camera điện thoại quét thử trực tiếp trên màn hình xem mã đọc tốt và hiển thị đúng ý trước khi đem đi in ấn hoặc dán lên thiệp quà.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenMockup();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-md shadow-rose-200 hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            Thử Ghép Vào Thiệp Ngay
          </button>
        </div>
      </div>
    </div>
  );
}
