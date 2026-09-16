import React, { useRef } from 'react';
import { Palette, Heart, Image as ImageIcon, Sparkles, Check, Sliders } from 'lucide-react';
import { COLOR_PRESETS, LOGO_OPTIONS, FRAME_OPTIONS } from '../constants/presets';

export default function QRStyleEditor({
  selectedPreset,
  onSelectPreset,
  customColors,
  onChangeCustomColors,
  dotType,
  onChangeDotType,
  cornerSquareType,
  onChangeCornerSquareType,
  logoId,
  onSelectLogo,
  customLogoUrl,
  onChangeCustomLogoUrl,
  frameId,
  onSelectFrame
}) {
  const fileInputRef = useRef(null);

  const handleCustomLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChangeCustomLogoUrl(event.target.result);
        onSelectLogo('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const dotOptions = [
    { id: 'rounded', label: 'Bo Tròn Mềm', sample: 'Mịn màng' },
    { id: 'dots', label: 'Chấm Tròn', sample: 'Dễ thương' },
    { id: 'classy-rounded', label: 'Cánh Hoa', sample: 'Lãng mạn' },
    { id: 'classy', label: 'Hiện Đại', sample: 'Sắc nét' },
    { id: 'square', label: 'Cổ Điển', sample: 'Truyền thống' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-rose-100 shadow-sm space-y-5">
      <div>
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Palette className="w-4 h-4 text-rose-500" />
          <span>Bước 2: Tùy Chỉnh Giao Diện Mã QR</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Chọn màu sắc lãng mạn, hình dạng điểm chấm và logo trái tim/ảnh của 2 người
        </p>
      </div>

      {/* 1. Color Presets */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Bảng màu & Gradient lãng mạn:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {COLOR_PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectPreset(preset)}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/50 shadow-sm ring-2 ring-rose-200'
                    : 'border-slate-200 hover:border-rose-200 bg-white'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${preset.previewClass} shadow-inner flex items-center justify-center text-white text-xs`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
                <span className="text-xs font-semibold text-slate-700 truncate">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Center Logo */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
          <span>Logo biểu tượng ở giữa mã QR:</span>
          {logoId === 'custom' && (
            <span className="text-[11px] text-rose-600 font-medium">Đang dùng ảnh tự tải</span>
          )}
        </label>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {LOGO_OPTIONS.map((logo) => {
            const isSelected = logoId === logo.id;

            if (logo.id === 'custom') {
              return (
                <button
                  key={logo.id}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50 shadow-sm ring-2 ring-rose-200'
                      : 'border-dashed border-rose-300 hover:border-rose-400 bg-white'
                  }`}
                >
                  {customLogoUrl ? (
                    <img src={customLogoUrl} alt="custom" className="w-6 h-6 rounded-full object-cover mb-1 border border-rose-200" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-rose-500 mb-1" />
                  )}
                  <span className="text-[10px] font-bold text-slate-700">Tải Ảnh</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleCustomLogoUpload}
                    className="hidden"
                  />
                </button>
              );
            }

            return (
              <button
                key={logo.id}
                type="button"
                onClick={() => onSelectLogo(logo.id)}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50 shadow-sm ring-2 ring-rose-200'
                    : 'border-slate-200 hover:border-rose-200 bg-white'
                }`}
              >
                <span className="text-xl mb-1">{logo.icon}</span>
                <span className="text-[10px] font-medium text-slate-700 truncate w-full">{logo.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Dot Pattern Style */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Kiểu họa tiết điểm ảnh (Dots):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {dotOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChangeDotType(opt.id)}
              className={`p-2 rounded-xl border text-center transition-all ${
                dotType === opt.id
                  ? 'border-rose-500 bg-rose-50 shadow-sm ring-2 ring-rose-200'
                  : 'border-slate-200 hover:border-rose-200 bg-white'
              }`}
            >
              <div className="text-xs font-bold text-slate-800">{opt.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{opt.sample}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Frame / Call-to-action */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-2">
          Khung viền thông điệp gợi ý quét:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FRAME_OPTIONS.map((frame) => {
            const isSelected = frameId === frame.id;
            return (
              <button
                key={frame.id}
                type="button"
                onClick={() => onSelectFrame(frame.id)}
                className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50 shadow-sm ring-2 ring-rose-200'
                    : 'border-slate-200 hover:border-rose-200 bg-white'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-800">{frame.label}</div>
                  {frame.sub && <div className="text-[10px] text-slate-400 mt-0.5">{frame.sub}</div>}
                </div>
                {isSelected && <Check className="w-4 h-4 text-rose-500" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
