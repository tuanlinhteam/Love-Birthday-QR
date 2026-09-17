import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Image as ImageIcon, Sparkles, Heart, Cake, Gift, Calendar, User } from 'lucide-react';
import { toPng } from 'html-to-image';
import { createQRInstance } from '../utils/qrHelper';

export default function CardMockupGenerator({
  isOpen,
  onClose,
  qrData,
  preset,
  dotType,
  cornerSquareType,
  cornerDotType,
  logoId,
  customLogoUrl,
  pageData
}) {
  const [template, setTemplate] = useState('polaroid'); // 'polaroid' | 'birthday_card' | 'love_letter' | 'gift_tag'
  const [cardPhoto, setCardPhoto] = useState(pageData.photos?.[0] || null);
  const [cardTitle, setCardTitle] = useState(pageData.title || 'Món Quà Bí Mật Dành Riêng Cho Em');
  const [cardSender, setCardSender] = useState(pageData.sender || 'Người yêu em');
  const [cardRecipient, setCardRecipient] = useState(pageData.recipient || 'Em Yêu');
  const [cardDate, setCardDate] = useState(pageData.date || 'Kỷ Niệm Ngày Yêu');
  const [isExporting, setIsExporting] = useState(false);

  const cardRenderRef = useRef(null);
  const qrContainerRef = useRef(null);

  // Sync card state whenever modal is opened with latest pageData
  useEffect(() => {
    if (isOpen) {
      setCardPhoto(pageData.photos?.[0] || null);
      setCardTitle(pageData.title || (pageData.type === 'birthday' ? 'Mừng Ngày Sinh Nhật Của Bạn 🎂' : 'Món Quà Bí Mật Dành Riêng Cho Em'));
      setCardSender(pageData.sender || (pageData.type === 'birthday' ? 'Bạn của bạn' : 'Người yêu em'));
      setCardRecipient(pageData.recipient || (pageData.type === 'birthday' ? 'Bạn Thân' : 'Em Yêu'));
      setCardDate(pageData.date || (pageData.type === 'birthday' ? 'Sinh Nhật Vui Vẻ' : 'Kỷ Niệm Ngày Yêu'));
    }
  }, [isOpen, pageData]);

  // Render QR Code inside mockup whenever dependencies change
  useEffect(() => {
    if (!isOpen || !qrContainerRef.current) return;
    qrContainerRef.current.innerHTML = '';

    const qr = createQRInstance({
      data: qrData || 'https://love.qr',
      size: 150,
      preset,
      dotType,
      cornerSquareType,
      cornerDotType,
      logoId,
      customLogoUrl
    });

    qr.append(qrContainerRef.current);
  }, [isOpen, template, qrData, preset, dotType, cornerSquareType, cornerDotType, logoId, customLogoUrl]);

  if (!isOpen) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCardPhoto(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleExportCard = async () => {
    if (!cardRenderRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRenderRef.current, {
        quality: 0.98,
        pixelRatio: 3 // High resolution for printing
      });
      const link = document.createElement('a');
      link.download = `thiep_tang_qua_${template}_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting card:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-rose-100 my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-rose-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-rose-500" />
            <h2 className="font-bold text-slate-800 text-lg">Ghép Mã QR Vào Thiệp Quà Tặng & Ảnh Kỷ Niệm</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Chọn mẫu thiệp / tag quà:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTemplate('polaroid')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    template === 'polaroid' ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  📸 Ảnh Polaroid Kỷ Niệm
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('birthday_card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    template === 'birthday_card' ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  🎂 Thiệp Sinh Nhật Sang Trọng
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('love_letter')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    template === 'love_letter' ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  💌 Thiệp Tình Yêu Valentine
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('gift_tag')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    template === 'gift_tag' ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  🏷️ Thẻ Treo Hộp Quà / Hoa
                </button>
              </div>
            </div>

            {/* Photo upload for the card */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Ảnh chụp chung / Ảnh kỷ niệm:</span>
                {cardPhoto && (
                  <button
                    type="button"
                    onClick={() => setCardPhoto(null)}
                    className="text-[11px] text-rose-500 hover:underline"
                  >
                    Bỏ ảnh
                  </button>
                )}
              </label>

              <label className="w-full py-2 px-3 rounded-xl border-2 border-dashed border-rose-200 hover:border-rose-300 bg-rose-50/40 hover:bg-rose-50 text-rose-700 flex items-center justify-center gap-2 cursor-pointer text-xs font-medium transition-colors">
                <ImageIcon className="w-4 h-4" />
                <span>{cardPhoto ? 'Đổi ảnh kỷ niệm khác' : 'Tải ảnh của 2 người lên'}</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>

            {/* Text Inputs for Card */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dòng chữ đề tựa:</label>
                <input
                  type="text"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-400 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gửi tới:</label>
                  <input
                    type="text"
                    value={cardRecipient}
                    onChange={(e) => setCardRecipient(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Người gửi:</label>
                  <input
                    type="text"
                    value={cardSender}
                    onChange={(e) => setCardSender(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-400 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ngày kỷ niệm:</label>
                <input
                  type="text"
                  value={cardDate}
                  onChange={(e) => setCardDate(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-400 bg-white"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleExportCard}
              disabled={isExporting}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Đang xuất thiệp...' : 'Tải Thiệp HD Sẵn Sàng In Ấn'}</span>
            </button>
          </div>

          {/* Card Mockup Visual Render Area */}
          <div className="lg:col-span-7 bg-slate-100 rounded-2xl p-4 sm:p-6 flex items-center justify-center overflow-hidden">
            <div
              ref={cardRenderRef}
              className={`transition-all ${
                template === 'polaroid'
                  ? 'bg-white p-5 rounded-2xl shadow-xl w-[320px] sm:w-[350px] border border-slate-200 flex flex-col items-center text-center'
                  : template === 'birthday_card'
                  ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6 rounded-3xl shadow-xl w-[320px] sm:w-[360px] border-2 border-amber-300/40 flex flex-col items-center text-center'
                  : template === 'love_letter'
                  ? 'bg-gradient-to-b from-rose-50 via-white to-pink-50 p-6 rounded-3xl shadow-xl w-[320px] sm:w-[350px] border-2 border-rose-300 flex flex-col items-center text-center'
                  : 'bg-white p-4 rounded-3xl shadow-xl w-[240px] border-2 border-rose-300 flex flex-col items-center text-center relative'
              }`}
            >
              {/* Polaroid Style */}
              {template === 'polaroid' && (
                <>
                  {/* Tape decoration */}
                  <div className="w-24 h-6 bg-amber-100/90 -mt-8 mb-3 rotate-[-3deg] shadow-sm border-t border-b border-amber-200/50"></div>

                  {/* Photo area */}
                  <div className="w-full h-52 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 mb-4 relative shadow-inner">
                    {cardPhoto ? (
                      <img src={cardPhoto} alt="Kỷ niệm" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4">
                        <Heart className="w-10 h-10 text-rose-300 mb-2 fill-rose-200" />
                        <span className="text-xs">Ảnh kỷ niệm của đôi mình</span>
                      </div>
                    )}
                  </div>

                  {/* Handwritten Title */}
                  <h4 className="font-handwriting text-2xl text-slate-800 font-bold mb-1">
                    {cardTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">{cardDate}</p>

                  {/* QR Box */}
                  <div className="p-2 bg-rose-50/60 rounded-xl border border-rose-200 flex flex-col items-center">
                    <div ref={qrContainerRef}></div>
                    <span className="text-[11px] font-semibold text-rose-600 mt-1">
                      ❤️ Quét để mở điều bất ngờ
                    </span>
                  </div>

                  <div className="w-full flex justify-between items-center mt-4 text-[11px] text-slate-500 font-medium">
                    <span>Gửi: {cardRecipient}</span>
                    <span className="font-handwriting text-base font-bold text-rose-600">{cardSender}</span>
                  </div>
                </>
              )}

              {/* Birthday Card Style */}
              {template === 'birthday_card' && (
                <>
                  <div className="text-3xl mb-1">🎉 🎂 ✨</div>
                  <h3 className="text-xl font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                    Happy Birthday
                  </h3>
                  <p className="font-handwriting text-2xl text-pink-200 mb-4">{cardRecipient}</p>

                  {cardPhoto && (
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-amber-300 shadow-md mb-4">
                      <img src={cardPhoto} alt="Celebrant" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="p-2.5 bg-white rounded-2xl shadow-lg border border-amber-300/60 flex flex-col items-center">
                    <div ref={qrContainerRef}></div>
                    <span className="text-[10px] font-bold text-purple-900 mt-1">
                      Quét mở món quà sinh nhật 🎁
                    </span>
                  </div>

                  <p className="text-xs text-purple-200 mt-4 leading-relaxed italic">
                    "{cardTitle}"
                  </p>
                  <div className="text-xs text-amber-300/90 font-semibold mt-2">
                    Từ: {cardSender} • {cardDate}
                  </div>
                </>
              )}

              {/* Love Letter Style */}
              {template === 'love_letter' && (
                <>
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center mb-2 shadow-md">
                    <Heart className="w-4 h-4 fill-current" />
                  </div>
                  <h3 className="font-romantic text-3xl text-rose-600 mb-0.5">Thư Tình Trao Em</h3>
                  <p className="font-handwriting text-xl text-slate-700 mb-3">{cardRecipient} thân yêu</p>

                  <div className="p-2.5 bg-white rounded-2xl shadow-md border border-rose-200 flex flex-col items-center mb-3">
                    <div ref={qrContainerRef}></div>
                    <span className="text-[10px] font-bold text-rose-600 mt-1">
                      Bí mật cất giữ trong mã QR 💌
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 italic px-2">"{cardTitle}"</p>
                  <div className="w-full text-right mt-3 text-xs font-handwriting text-lg text-rose-600 font-bold">
                    — {cardSender} —
                  </div>
                </>
              )}

              {/* Gift Tag Style */}
              {template === 'gift_tag' && (
                <>
                  {/* Tag hole */}
                  <div className="w-5 h-5 rounded-full bg-slate-200 border-2 border-slate-300 mb-3 shadow-inner"></div>

                  <div className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">
                    FOR YOU
                  </div>
                  <div className="font-handwriting text-2xl text-slate-800 font-bold mb-2">
                    {cardRecipient}
                  </div>

                  <div className="p-2 bg-rose-50 rounded-2xl border border-rose-200 flex flex-col items-center mb-2">
                    <div ref={qrContainerRef}></div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-semibold mt-1">
                    {cardDate}
                  </div>
                  <div className="text-xs font-handwriting text-rose-500 font-bold mt-1">
                    With Love, {cardSender}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
