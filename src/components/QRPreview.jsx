import React, { useEffect, useRef, useState } from 'react';
import { Download, Sparkles, Gift, Smartphone, CheckCircle, AlertTriangle, Upload, Eye, FileCode, Copy, Check, Share2, MessageCircle } from 'lucide-react';
import { createQRInstance } from '../utils/qrHelper';
import { FRAME_OPTIONS } from '../constants/presets';
import { toPng } from 'html-to-image';
import { testDecodeQR } from '../utils/qrTester';

export default function QRPreview({
  qrData,
  pageData,
  preset,
  dotType,
  cornerSquareType,
  cornerDotType,
  logoId,
  customLogoUrl,
  frameId,
  mode,
  onOpenMockup,
  onDownloadHtml
}) {
  const qrRef = useRef(null);
  const cardFrameRef = useRef(null);
  const [qrInstance, setQrInstance] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingFrame, setIsExportingFrame] = useState(false);
  const [copiedZalo, setCopiedZalo] = useState(false);

  // Scan Verification state
  const [scanStatus, setScanStatus] = useState(null); // { success: boolean, data?: string, error?: string }
  const [isVerifying, setIsVerifying] = useState(false);

  // Initialize or update QR instance
  useEffect(() => {
    if (!qrRef.current) return;

    qrRef.current.innerHTML = '';

    const qr = createQRInstance({
      data: qrData || 'https://love.qr',
      size: 280,
      preset,
      dotType,
      cornerSquareType,
      cornerDotType,
      logoId,
      customLogoUrl
    });

    qr.append(qrRef.current);
    setQrInstance(qr);
    setScanStatus(null); // Reset test status on change
  }, [qrData, preset, dotType, cornerSquareType, cornerDotType, logoId, customLogoUrl]);

  // Copy full message with clickable direct link for Zalo
  const handleCopyZaloMessage = () => {
    const title = pageData?.title || (pageData?.type === 'birthday' ? 'Happy Birthday to You! 🎂' : 'Gửi Đến Người Anh Yêu Nhất ❤️');
    const recipientText = pageData?.recipient ? `Gửi đến: ${pageData.recipient}\n` : '';
    const senderText = pageData?.sender ? `Từ: ${pageData.sender}\n` : '';
    const textToCopy = `💌 ${title}\n${recipientText}${senderText}Có một trang thiệp bất ngờ kèm nhạc nền du dương, mưa chữ 3D và giọng đọc truyền cảm dành riêng cho bạn nè!\n👉 Chạm vào link này để mở thiệp ngay nhé:\n${qrData}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    } else {
      const ta = document.createElement('textarea');
      ta.value = textToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    setCopiedZalo(true);
    setTimeout(() => setCopiedZalo(false), 3500);
  };

  // Direct share to Zalo / mobile share sheet
  const handleShareZalo = () => {
    if (navigator.share) {
      navigator.share({
        title: pageData?.title || 'Thiệp Bất Ngờ Dành Cho Bạn',
        text: `Có một trang thiệp bất ngờ dành riêng cho bạn nè! ❤️\nChạm vào link để mở nhé:\n`,
        url: qrData
      }).catch(() => {});
    } else {
      window.open('https://chat.zalo.me/', '_blank');
    }
  };

  // 1. Download PURE high-res QR code (1200px, 100% clean, wide quiet-zone specifically for Zalo gallery scan)
  const handleDownloadPureQR = async () => {
    setIsExporting(true);
    try {
      const highResQR = createQRInstance({
        data: qrData || 'https://love-birthday-qr.vercel.app',
        size: 1200,
        preset,
        dotType,
        cornerSquareType,
        cornerDotType,
        logoId,
        customLogoUrl,
        margin: 36
      });

      await highResQR.download({
        name: `ma_qr_chuan_zalo_${Date.now()}`,
        extension: 'png'
      });
    } catch (err) {
      console.error('Error downloading pure QR:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Download framed card image
  const handleDownloadFramedCard = async () => {
    if (!cardFrameRef.current) return;
    setIsExportingFrame(true);
    try {
      const dataUrl = await toPng(cardFrameRef.current, {
        quality: 0.98,
        pixelRatio: 3
      });
      const link = document.createElement('a');
      link.download = `thiep_kem_ma_qr_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading framed card:', err);
    } finally {
      setIsExportingFrame(false);
    }
  };

  // 3. Download Vector SVG
  const handleDownloadSVG = () => {
    if (!qrInstance) return;
    qrInstance.download({
      name: `ma_qr_vector_${Date.now()}`,
      extension: 'svg'
    });
  };

  // Test scan the currently rendered QR canvas
  const handleTestScanCurrentQR = async () => {
    setIsVerifying(true);
    try {
      const canvas = qrRef.current?.querySelector('canvas');
      if (!canvas) {
        setScanStatus({ success: false, error: 'Chưa tìm thấy mã QR để quét thử.' });
        return;
      }
      const dataUrl = canvas.toDataURL('image/png');
      const result = await testDecodeQR(dataUrl);
      setScanStatus(result);
    } catch (e) {
      setScanStatus({ success: false, error: 'Lỗi khi kiểm tra mã QR.' });
    } finally {
      setIsVerifying(false);
    }
  };

  // Allow user to upload any downloaded image from their computer to test if it can be decoded
  const handleUploadAndTest = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsVerifying(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = await testDecodeQR(event.target.result);
      setScanStatus(result);
      setIsVerifying(false);
    };
    reader.readAsDataURL(file);
  };

  const selectedFrame = FRAME_OPTIONS.find(f => f.id === frameId);

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl p-5 border border-rose-100 shadow-lg sticky top-20 flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-rose-100">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>Xem Trước & Tải Mã QR</span>
        </h3>
        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
          <Smartphone className="w-3 h-3" />
          Chuẩn ISO Dễ Quét
        </span>
      </div>

      {/* Frame Container for Preview & Framed Export */}
      <div
        ref={cardFrameRef}
        className={`p-4 rounded-2xl transition-all flex flex-col items-center bg-white shadow-sm border ${
          frameId !== 'none'
            ? 'border-rose-200 bg-gradient-to-b from-rose-50/60 via-white to-pink-50/50 max-w-[320px]'
            : 'border-slate-100'
        }`}
      >
        {/* Frame Top Header if selected */}
        {selectedFrame && selectedFrame.id !== 'none' && (
          <div className="text-center mb-3">
            <p className="text-xs font-bold text-rose-600 tracking-wide uppercase">
              {selectedFrame.text}
            </p>
            {selectedFrame.sub && (
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedFrame.sub}</p>
            )}
          </div>
        )}

        {/* Pure QR Code Canvas */}
        <div
          ref={qrRef}
          className="p-3 bg-white rounded-2xl shadow-inner border border-rose-100 flex items-center justify-center overflow-hidden"
        ></div>

        {/* Frame Bottom Footer if selected */}
        {selectedFrame && selectedFrame.id !== 'none' && (
          <div className="text-center mt-3 pt-2 border-t border-rose-100/60 w-full">
            <span className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1">
              ❤️ Dùng camera điện thoại hoặc Zalo quét
            </span>
          </div>
        )}
      </div>

      {/* Instant In-App Scan Verification Result */}
      <div className="w-full mt-4">
        {scanStatus ? (
          scanStatus.success ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-emerald-700">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Mã QR quét cực tốt & nhận diện ngay!</span>
              </div>
              <div className="text-[11px] text-slate-600 truncate">
                <span className="font-medium">Nội dung giải mã:</span> {scanStatus.data}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-amber-700">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Cần điều chỉnh để dễ quét hơn:</span>
              </div>
              <p className="text-[11px] text-amber-700">
                {scanStatus.error || 'Hãy chọn kiểu chấm "Bo Tròn Mềm" hoặc giảm độ dài nội dung để camera nhận diện tốt nhất.'}
              </p>
            </div>
          )
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleTestScanCurrentQR}
              disabled={isVerifying}
              className="flex-1 py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-rose-500" />
              <span>{isVerifying ? 'Đang kiểm tra...' : 'Kiểm tra độ nhạy quét'}</span>
            </button>

            <label className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer" title="Tải ảnh QR bạn vừa lưu để kiểm tra">
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>Test file ảnh</span>
              <input type="file" accept="image/*" onChange={handleUploadAndTest} className="hidden" />
            </label>
          </div>
        )}
      </div>

      {/* Zalo Direct 1-Click Link Sharing (Tap to open immediately without scanning) */}
      <div className="w-full mt-3.5 p-3.5 bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/80 border border-blue-200/90 rounded-2xl shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span>Gửi Qua Zalo (Người Nhận Ấn Vào Là Mở Ngay):</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500 text-white shadow-xs">
            Khuyên dùng ✨
          </span>
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed">
          <b>Không cần quét mã!</b> Khi gửi link này qua Zalo, Zalo sẽ tự tạo <b>Thẻ thiệp xem trước</b> cực đẹp. Người ấy chỉ cần <b>chạm 1 lần vào tin nhắn</b> là trang web lập tức mở ra có nhạc, mưa chữ 3D và giọng đọc!
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopyZaloMessage}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm ${
              copiedZalo
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            {copiedZalo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedZalo ? 'Đã sao chép! Hãy dán vào Zalo' : 'Sao Chép Tin Nhắn & Link Zalo'}</span>
          </button>

          <button
            type="button"
            onClick={handleShareZalo}
            className="px-3 py-2.5 rounded-xl border border-blue-300 bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
            title="Mở ứng dụng hoặc chia sẻ ngay"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Chia sẻ</span>
          </button>
        </div>

        {copiedZalo && (
          <p className="text-[11px] text-emerald-700 font-semibold text-center animate-in fade-in">
            ✨ Bạn chỉ cần mở Zalo và dán (Paste / Ctrl+V) vào cuộc trò chuyện là xong!
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2 mt-4">
        {/* BUTTON 1: Pure High-Res QR (Recommended for reliable scanning everywhere) */}
        <button
          type="button"
          onClick={handleDownloadPureQR}
          disabled={isExporting}
          className="w-full py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Đang tạo ảnh...' : 'Tải Riêng Mã QR (PNG Chuẩn 1200px - Quét Trên Zalo & Camera)'}</span>
        </button>

        {/* Zalo Scanning Instructions Box */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
          <div className="font-semibold text-slate-800 flex items-center gap-1">
            <span>💡 Cách quét mã QR từ ảnh khi gửi qua Zalo:</span>
          </div>
          <p>
            1. Khi gửi ảnh QR trong Zalo, nhớ <b>tick chọn [HD]</b> để ảnh giữ độ nét gốc.
          </p>
          <p>
            2. Người nhận bấm mở ảnh trong Zalo ➜ <b>Nhấn giữ vào ảnh</b> (hoặc bấm biểu tượng <b>[Quét mã QR]</b> ở góc trên màn hình Zalo) là mở thiệp được ngay!
          </p>
        </div>

        {/* BUTTON 2: Framed Card Image */}
        {frameId !== 'none' && (
          <button
            type="button"
            onClick={handleDownloadFramedCard}
            disabled={isExportingFrame}
            className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-rose-500" />
            <span>{isExportingFrame ? 'Đang xuất ảnh...' : 'Tải Ảnh Kèm Khung Lời Nhắn'}</span>
          </button>
        )}

        {/* BUTTON 3: Card Mockup Generator */}
        <button
          type="button"
          onClick={onOpenMockup}
          className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-purple-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
        >
          <Gift className="w-4 h-4" />
          <span>Ghép Vào Thiệp Quà Tặng & Ảnh Polaroid</span>
        </button>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Download SVG */}
          <button
            type="button"
            onClick={handleDownloadSVG}
            className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            title="Định dạng vector không vỡ nét khi phóng to in ấn"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Tải Vector (SVG)</span>
          </button>

          {/* Download Standalone HTML if interactive mode */}
          {mode === 'interactive' ? (
            <button
              type="button"
              onClick={onDownloadHtml}
              className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-xl border border-amber-200/60 transition-colors flex items-center justify-center gap-1.5"
              title="Tải trang web tỏ tình/sinh nhật độc lập để gửi Zalo hoặc lưu máy"
            >
              <FileCode className="w-3.5 h-3.5 text-amber-600" />
              <span>Tải Web (.html)</span>
            </button>
          ) : (
            <div className="flex items-center justify-center text-[11px] text-slate-400">
              Độ nét chuẩn Ultra HD
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
