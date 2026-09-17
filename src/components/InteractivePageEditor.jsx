import React, { useState, useMemo } from 'react';
import { Sparkles, Heart, Cake, Music, Image as ImageIcon, Send, User, Calendar, Wand2, Eye, Mic, Volume2 } from 'lucide-react';
import { SAMPLE_MESSAGES, AUDIO_TRACKS } from '../constants/presets';
import { ttsManager, TTS_VOICE_OPTIONS } from '../utils/ttsVoice';
import { calculateDaysInfo, formatDateVN, formatDateInput, parseDate } from '../utils/dateHelper';

export default function InteractivePageEditor({
  pageData,
  onChangePageData,
  onPreviewInteractive
}) {
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'effects' | 'media'
  const [ttsTesting, setTtsTesting] = useState(false);

  const daysInfo = useMemo(() => calculateDaysInfo(pageData.date, pageData.type), [pageData.date, pageData.type]);

  const handleApplySample = (sampleText) => {
    onChangePageData({ ...pageData, message: sampleText });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onChangePageData({
        ...pageData,
        photos: [event.target.result] // Maximum 1 single memory photo
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    onChangePageData({ ...pageData, photos: [] });
  };

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-rose-100 shadow-sm space-y-5">
      {/* Header with Type selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-rose-100">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <span>Bước 1: Thiết Kế Trang Tương Tác & Lời Chúc</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Người quét mã sẽ được dẫn đến trang kỷ niệm có nhạc & mưa chữ này</p>
        </div>

        {/* Theme Type Switch */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => onChangePageData({
              ...pageData,
              type: 'love',
              effect: 'neon_words',
              musicStyle: 'romantic_chords',
              title: 'Gửi Đến Người Anh Yêu Nhất ❤️',
              customWords: (!pageData.customWords || pageData.customWords.length === 0 || pageData.customWords.includes('Happy Birthday'))
                ? ['Em yêu anh', 'Yêu em nhiều', 'Hạnh phúc', 'Mãi bên nhau']
                : pageData.customWords.filter(w => w !== '1000 Days')
            })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              pageData.type === 'love'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'text-slate-600 hover:text-rose-600'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Tình Yêu</span>
          </button>

          <button
            onClick={() => onChangePageData({
              ...pageData,
              type: 'birthday',
              effect: 'neon_words',
              musicStyle: 'birthday_melody',
              title: 'Happy Birthday to You! 🎂',
              customWords: (!pageData.customWords || pageData.customWords.length === 0 || pageData.customWords.includes('Em yêu anh'))
                ? ['Happy Birthday', 'Tuổi mới rạng rỡ', 'Xinh đẹp', 'Bình an', 'Vạn sự như ý']
                : pageData.customWords.filter(w => w !== '1000 Days')
            })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              pageData.type === 'birthday'
                ? 'bg-white text-amber-600 shadow-sm'
                : 'text-slate-600 hover:text-amber-600'
            }`}
          >
            <Cake className="w-3.5 h-3.5 text-amber-500" />
            <span>Sinh Nhật</span>
          </button>
        </div>
      </div>

      {/* Recipient & Sender Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-rose-500" />
            <span>Tên người nhận (Người ấy / Bạn bè):</span>
          </label>
          <input
            type="text"
            value={pageData.recipient || ''}
            onChange={(e) => onChangePageData({ ...pageData, recipient: e.target.value })}
            placeholder={pageData.type === 'birthday' ? 'VD: Phương Thảo, Minh Anh...' : 'VD: Em Yêu, Bé Bắp...'}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-rose-500" />
            <span>Tên người gửi (Tên của bạn):</span>
          </label>
          <input
            type="text"
            value={pageData.sender || ''}
            onChange={(e) => onChangePageData({ ...pageData, sender: e.target.value })}
            placeholder="VD: Chàng trai của em, Hoàng Nam..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
          />
        </div>
      </div>

      {/* Title & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Tiêu đề trang:</label>
          <input
            type="text"
            value={pageData.title || ''}
            onChange={(e) => onChangePageData({ ...pageData, title: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>Ngày kỷ niệm / Sinh nhật:</span>
            </span>
            {daysInfo && (
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {daysInfo.badge}
              </span>
            )}
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={pageData.date || ''}
              onChange={(e) => onChangePageData({ ...pageData, date: e.target.value })}
              placeholder="VD: 18/09/2026"
              className="w-full px-3.5 py-2 pr-10 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
            />
            {/* Native Date Picker trigger */}
            <input
              type="date"
              value={formatDateInput(pageData.date)}
              onChange={(e) => {
                if (e.target.value) {
                  const d = parseDate(e.target.value);
                  onChangePageData({ ...pageData, date: formatDateVN(d) });
                }
              }}
              className="absolute right-2.5 w-6 h-6 opacity-40 hover:opacity-100 cursor-pointer bg-transparent border-0"
              title="Mở lịch chọn ngày"
            />
          </div>

          {/* Dynamic Days Count Preview */}
          {daysInfo ? (
            <div className="mt-1.5 p-2 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200/80 text-[11px] text-pink-900 flex items-center justify-between shadow-xs">
              <div className="font-semibold flex items-center gap-1.5">
                <span>{daysInfo.isFuture ? '⏳' : '💕'}</span>
                <span>{daysInfo.mainText}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                {daysInfo.secondaryText}
              </span>
            </div>
          ) : (
            <p className="text-[10px] text-slate-400 mt-1">Định dạng: Ngày/Tháng/Năm (VD: 18/09/2026)</p>
          )}

          {/* Quick presets */}
          <div className="flex items-center gap-1 mt-1.5">
            <button
              type="button"
              onClick={() => onChangePageData({ ...pageData, date: formatDateVN(new Date()) })}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-600 transition-colors"
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => {
                const d = new Date();
                d.setDate(d.getDate() - 100);
                onChangePageData({ ...pageData, date: formatDateVN(d) });
              }}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-600 transition-colors"
            >
              100 ngày trước
            </button>
            <button
              type="button"
              onClick={() => {
                const d = new Date();
                d.setFullYear(d.getFullYear() - 1);
                onChangePageData({ ...pageData, date: formatDateVN(d) });
              }}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-600 transition-colors"
            >
              1 năm trước
            </button>
          </div>
        </div>
      </div>

      {/* Message with typewriter preview and Sample Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Lời nhắn bí mật (Hiệu ứng gõ chữ từng câu):</span>
          </label>

          <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
            <Wand2 className="w-3.5 h-3.5" />
            <span>Mẫu gợi ý nhanh:</span>
          </div>
        </div>

        {/* Sample Pills */}
        <div className="flex flex-wrap gap-2 mb-2">
          {(pageData.type === 'birthday' ? SAMPLE_MESSAGES.birthday : SAMPLE_MESSAGES.love).map((msg, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleApplySample(msg)}
              className="text-xs px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 transition-colors truncate max-w-[200px]"
              title={msg}
            >
              Mẫu {i + 1}: {msg.substring(0, 22)}...
            </button>
          ))}
        </div>

        <textarea
          rows={4}
          value={pageData.message || ''}
          onChange={(e) => onChangePageData({ ...pageData, message: e.target.value })}
          placeholder="Nhập tâm sự, lời chúc sinh nhật hoặc lời tỏ tình của bạn tại đây..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white leading-relaxed font-sans"
        ></textarea>
      </div>

      {/* Effect & Music selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-rose-100">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Hiệu ứng bay bổng nền:</span>
            </span>
            {(!pageData.effect || pageData.effect === 'neon_words') && (
              <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                Hot TikTok 🔥
              </span>
            )}
          </label>
          <select
            value={pageData.effect || 'neon_words'}
            onChange={(e) => onChangePageData({ ...pageData, effect: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
          >
            <option value="neon_words">🌟 Mưa Chữ Tên & Lời Yêu 3D Phát Sáng (TikTok) ✨</option>
            <option value="hearts">❤️ Mưa Trái Tim Rơi Lãng Mạn</option>
            <option value="birthday">🎈 Bong Bóng & Pháo Hoa Sinh Nhật</option>
            <option value="sparkles">✨ Sao Băng & Bụi Ánh Sáng Lấp Lánh</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-rose-500" />
            <span>Giai điệu nhạc nền (Tự động phát):</span>
          </label>
          <select
            value={pageData.musicStyle || 'romantic_chords'}
            onChange={(e) => onChangePageData({ ...pageData, musicStyle: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
          >
            <option value="romantic_chords">Giai điệu Lofi Tình Yêu (Hợp âm ngọt ngào) 🎹</option>
            <option value="birthday_melody">Khúc ca Happy Birthday vui nhộn 🎂</option>
            <option value="canon_piano">Canon In D bất hủ lãng mạn 🎼</option>
          </select>
        </div>
      </div>

      {/* Custom Floating Neon Words Input */}
      <div className={`p-3 rounded-xl border space-y-1.5 transition-all ${
        pageData.type === 'birthday'
          ? 'bg-amber-50/70 border-amber-200/80 text-amber-900'
          : 'bg-pink-50/60 border-pink-200/80 text-rose-900'
      }`}>
        <label className="block text-xs font-semibold flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span>✨</span>
            <span>Các từ / cụm từ phát sáng bay xung quanh (Mưa chữ 3D):</span>
          </span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            pageData.type === 'birthday' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-700'
          }`}>
            {pageData.type === 'birthday' ? 'Chủ đề Sinh Nhật 🎂' : 'Chủ đề Tình Yêu ❤️'}
          </span>
        </label>
        <input
          type="text"
          value={pageData.customWords ? (Array.isArray(pageData.customWords) ? pageData.customWords.join(', ') : pageData.customWords) : (pageData.type === 'birthday' ? 'Happy Birthday, Tuổi mới rạng rỡ, Xinh đẹp, Vạn sự như ý, Bình an' : 'Em yêu anh, Yêu em nhiều, Hạnh phúc, Mãi bên nhau')}
          onChange={(e) => {
            const words = e.target.value.split(',').map(w => w.trim()).filter(Boolean);
            onChangePageData({ ...pageData, customWords: words });
          }}
          placeholder={pageData.type === 'birthday' ? 'VD: Happy Birthday, Tuổi mới rạng rỡ, Xinh đẹp, Vạn sự như ý, Bình an...' : 'VD: Em yêu anh, Mãi bên nhau, Bé iu, Hạnh phúc...'}
          className={`w-full px-3 py-1.5 rounded-lg border text-xs bg-white focus:ring-2 ${
            pageData.type === 'birthday' ? 'border-amber-200 focus:ring-amber-400' : 'border-pink-200 focus:ring-rose-400'
          }`}
        />
        <p className="text-[10px] text-slate-500">
          💡 Tên người nhận ({pageData.recipient || 'Người nhận'}), tên bạn ({pageData.sender || 'Người gửi'}) và các từ trên sẽ phát sáng neon bay lượn 3D tuyệt đẹp!
        </p>
      </div>

      {/* TTS Voice Reading Option */}
      <div className="pt-2 border-t border-rose-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-rose-500" />
            <span>Giọng đọc truyền cảm (TTS Tiếng Việt):</span>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pageData.enableTTS !== false}
              onChange={(e) => onChangePageData({ ...pageData, enableTTS: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
          </label>
        </div>

        {pageData.enableTTS !== false && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-700">
                Chọn phong cách & chất giọng đọc:
              </label>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                ✨ Công nghệ Studio trong veo & mượt mà
              </span>
            </div>

            {/* AI Studio Voices */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-rose-700 flex items-center gap-1.5">
                <span>🌟 Giọng AI Trong Trẻo & Tự Nhiên (Khuyên Dùng):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TTS_VOICE_OPTIONS.filter(v => v.category === 'AI Cao Cấp').map((voice) => {
                  const isSelected = (pageData.ttsVoice || 'google_female_crystal') === voice.id;
                  const isPlayingThis = ttsTesting === voice.id;
                  return (
                    <div
                      key={voice.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/80 shadow-sm ring-1 ring-rose-300'
                          : 'border-slate-200 hover:border-rose-200 bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onChangePageData({ ...pageData, ttsVoice: voice.id })}
                        className="flex items-center gap-2 text-left flex-1 min-w-0"
                      >
                        <span className="text-xl shrink-0">{voice.icon}</span>
                        <div className="truncate pr-1">
                          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                            <span>{voice.label.split(' (')[0]}</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold shadow-xs">
                              {voice.tag}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {voice.description || voice.label}
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (isPlayingThis) {
                            ttsManager.stop();
                            setTtsTesting(false);
                          } else {
                            setTtsTesting(voice.id);
                            ttsManager.speak(pageData.message || voice.sampleText, {
                              voiceOptionId: voice.id,
                              onEnd: () => setTtsTesting(false)
                            });
                          }
                        }}
                        className={`ml-2 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold shrink-0 flex items-center gap-1 transition-all ${
                          isPlayingThis
                            ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                            : 'bg-white border-rose-200 hover:bg-rose-50 text-rose-600'
                        }`}
                        title="Nghe thử giọng này"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isPlayingThis ? 'animate-bounce' : ''}`} />
                        <span>{isPlayingThis ? 'Dừng' : 'Thử'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Regional Voices */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                <span>🏛️ Giọng Vùng Miền Truyền Cảm (Bắc / Nam):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TTS_VOICE_OPTIONS.filter(v => v.category === 'Vùng Miền').map((voice) => {
                  const isSelected = (pageData.ttsVoice || 'google_female_crystal') === voice.id;
                  const isPlayingThis = ttsTesting === voice.id;
                  return (
                    <div
                      key={voice.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/80 shadow-sm ring-1 ring-rose-300'
                          : 'border-slate-200 hover:border-rose-200 bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onChangePageData({ ...pageData, ttsVoice: voice.id })}
                        className="flex items-center gap-2 text-left flex-1 min-w-0"
                      >
                        <span className="text-xl shrink-0">{voice.icon}</span>
                        <div className="truncate pr-1">
                          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
                            <span>{voice.region} ({voice.gender})</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded-full font-semibold">
                              {voice.tag}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">
                            {voice.description || 'Truyền cảm'}
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (isPlayingThis) {
                            ttsManager.stop();
                            setTtsTesting(false);
                          } else {
                            setTtsTesting(voice.id);
                            ttsManager.speak(pageData.message || voice.sampleText, {
                              voiceOptionId: voice.id,
                              onEnd: () => setTtsTesting(false)
                            });
                          }
                        }}
                        className={`ml-2 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold shrink-0 flex items-center gap-1 transition-all ${
                          isPlayingThis
                            ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                            : 'bg-white border-rose-200 hover:bg-rose-50 text-rose-600'
                        }`}
                        title="Nghe thử giọng này"
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isPlayingThis ? 'animate-bounce' : ''}`} />
                        <span>{isPlayingThis ? 'Dừng' : 'Thử'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1 Memory Photo Attachment with Frame */}
      <div className="pt-2 border-t border-rose-100">
        <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
            <span>Khung ảnh kỷ niệm (Tối đa 1 ảnh):</span>
          </span>
          <span className="text-[11px] text-slate-400">
            {pageData.photos?.[0] ? '1/1 ảnh' : '0/1 ảnh'}
          </span>
        </label>

        {pageData.photos?.[0] ? (
          <div className="flex items-center gap-4 p-3 bg-rose-50/50 rounded-2xl border border-rose-200">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-md group shrink-0">
              <img src={pageData.photos[0]} alt="Ảnh kỷ niệm" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700">Đã chọn ảnh kỷ niệm</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Ảnh sẽ xuất hiện lồng trong khung viền lãng mạn và làm nền mờ thiệp</p>
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="mt-2 text-xs text-rose-600 hover:text-rose-800 font-semibold underline"
              >
                Xóa / Đổi ảnh khác
              </button>
            </div>
          </div>
        ) : (
          <label className="w-full py-4 rounded-2xl border-2 border-dashed border-rose-300 hover:border-rose-400 bg-rose-50/40 hover:bg-rose-50 text-rose-600 flex flex-col items-center justify-center cursor-pointer transition-colors">
            <ImageIcon className="w-6 h-6 mb-1 text-rose-500" />
            <span className="text-xs font-bold">+ Tải 1 ảnh kỷ niệm lồng vào khung viền</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Hỗ trợ JPG, PNG, WEBP</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Network Host URL for Phone Scanners */}
      <div className="pt-2 border-t border-rose-100">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="text-sm">🌐</span>
            <span>Địa chỉ mở web khi điện thoại quét mã:</span>
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            Tự động tối ưu
          </span>
        </label>

        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChangePageData({ ...pageData, customHost: 'http://192.168.1.5:5173' })}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                pageData.customHost === 'http://192.168.1.5:5173' || !pageData.customHost
                  ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              📶 Wi-Fi Nội Bộ (192.168.1.5:5173)
            </button>
            <button
              type="button"
              onClick={() => onChangePageData({ ...pageData, customHost: window.location.origin })}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                pageData.customHost === window.location.origin && pageData.customHost !== 'http://192.168.1.5:5173'
                  ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              💻 Trình duyệt hiện tại ({window.location.host})
            </button>
          </div>

          <input
            type="text"
            value={pageData.customHost || 'http://192.168.1.5:5173'}
            onChange={(e) => onChangePageData({ ...pageData, customHost: e.target.value })}
            placeholder="http://192.168.1.5:5173 hoặc https://ten-web-cua-ban.vercel.app"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-rose-400 bg-white"
          />
          <p className="text-[11px] text-slate-500">
            💡 Lưu ý: Khi quét bằng điện thoại, máy tính và điện thoại cùng kết nối 1 mạng Wi-Fi (IP: 192.168.1.5:5173) để điện thoại mở được trang web.
          </p>
        </div>
      </div>

      {/* Button to Live Preview Interactive Webpage */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onPreviewInteractive}
          className="w-full py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-bold rounded-xl shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
        >
          <Eye className="w-4 h-4" />
          <span>Xem Trước Trang Web Tỏ Tình / Sinh Nhật Ngay Bây Giờ</span>
        </button>
      </div>
    </div>
  );
}
