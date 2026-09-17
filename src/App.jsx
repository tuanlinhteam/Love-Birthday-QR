import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import InteractivePageEditor from './components/InteractivePageEditor';
import QRStyleEditor from './components/QRStyleEditor';
import QRPreview from './components/QRPreview';
import CardMockupGenerator from './components/CardMockupGenerator';
import LiveInteractiveViewer from './components/LiveInteractiveViewer';
import TipsGuideModal from './components/TipsGuideModal';
import { COLOR_PRESETS, SAMPLE_MESSAGES } from './constants/presets';
import { generateStandaloneHtml } from './utils/exportHtml';

export default function App() {
  // Mode: 'interactive' | 'text' | 'link'
  const [mode, setMode] = useState('interactive');

  // Interactive page data
  const [pageData, setPageData] = useState({
    type: 'love',
    title: 'Gửi Đến Người Anh Yêu Nhất ❤️',
    recipient: 'Em Yêu',
    sender: 'Anh của em',
    date: '14/02/2026',
    message: SAMPLE_MESSAGES.love[0],
    effect: 'neon_words',
    musicStyle: 'romantic_chords',
    enableTTS: true,
    ttsVoice: 'google_female_crystal',
    customWords: ['1000 Days', 'Em yêu anh', 'Hạnh phúc', 'Mãi bên nhau'],
    photos: []
  });

  // QR Styling state
  const [selectedPreset, setSelectedPreset] = useState(COLOR_PRESETS[0]);
  const [dotType, setDotType] = useState('rounded');
  const [cornerSquareType, setCornerSquareType] = useState('extra-rounded');
  const [cornerDotType, setCornerDotType] = useState('dot');
  const [logoId, setLogoId] = useState('heart');
  const [customLogoUrl, setCustomLogoUrl] = useState(null);
  const [frameId, setFrameId] = useState('love_gift');

  // Modals state
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isMockupOpen, setIsMockupOpen] = useState(false);
  const [isLiveViewerOpen, setIsLiveViewerOpen] = useState(false);

  // Check URL parameters to see if opened directly via scanned QR code in interactive view!
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('d');
    if (encoded || params.get('view') === '1' || params.get('card') === '1') {
      if (encoded) {
        try {
          const raw = JSON.parse(decodeURIComponent(escape(atob(encoded))));
          const decoded = {
            type: raw.type || (raw.t === 2 ? 'birthday' : 'love'),
            title: raw.title || raw.ti || (raw.t === 2 ? 'Happy Birthday to You! 🎂' : 'Gửi Đến Người Anh Yêu Nhất ❤️'),
            recipient: raw.recipient || raw.r || '',
            sender: raw.sender || raw.s || '',
            date: raw.date || raw.d || '',
            message: raw.message || raw.m || '',
            effect: raw.effect || raw.e || 'neon_words',
            musicStyle: raw.musicStyle || raw.mu || (raw.t === 2 ? 'birthday_melody' : 'romantic_chords'),
            enableTTS: raw.enableTTS !== undefined ? raw.enableTTS : (raw.tts !== 0),
            ttsVoice: raw.ttsVoice || raw.v || 'google_female_crystal',
            customWords: raw.customWords || raw.w || [],
            photos: raw.photos || raw.p || []
          };
          setPageData(decoded);
          setIsLiveViewerOpen(true);
        } catch (e) {
          console.error('Failed to parse encoded data from QR URL:', e);
        }
      } else if (params.get('view') === '1') {
        setIsLiveViewerOpen(true);
      }
    }
  }, []);

  // Compute final QR Data string for Interactive Page
  const qrData = useMemo(() => {
    try {
      const miniData = {
        t: pageData.type === 'birthday' ? 2 : 1,
        ti: pageData.title,
        r: pageData.recipient,
        s: pageData.sender,
        d: pageData.date,
        m: pageData.message,
        e: pageData.effect,
        mu: pageData.musicStyle,
        tts: pageData.enableTTS ? 1 : 0,
        v: pageData.ttsVoice,
        w: pageData.customWords
      };
      const serialized = btoa(unescape(encodeURIComponent(JSON.stringify(miniData))));
      
      // Default to deployed Vercel domain so QR codes work worldwide on any phone / 4G / Wi-Fi / Zalo
      const defaultHost = 'https://love-birthday-qr.vercel.app';
      const host = pageData.customHost || (window.location.origin.includes('vercel.app') ? window.location.origin : defaultHost);
      const cleanHost = host.endsWith('/') ? host.slice(0, -1) : host;
      return `${cleanHost}/?view=1&d=${serialized}`;
    } catch (e) {
      return window.location.href;
    }
  }, [pageData]);

  // Standalone HTML download
  const handleDownloadStandaloneHtml = () => {
    const htmlCode = generateStandaloneHtml(pageData);
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pageData.type === 'birthday' ? 'chuc_mung_sinh_nhat' : 'to_tinh_yeu_thuong'}_${Date.now()}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 text-slate-800">
      <Navbar
        onOpenTips={() => setIsTipsOpen(true)}
        onOpenMockup={() => setIsMockupOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Intro banner */}
        <div className="mb-6 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <span>Tạo Mã QR Tình Yêu & Lời Chúc Sinh Nhật</span>
              <span className="text-2xl animate-pulse">💖</span>
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Thiết kế mã QR nghệ thuật tặng người yêu, tỏ tình hoặc mừng sinh nhật. Tích hợp trang web tương tác với hiệu ứng pháo hoa, bóng bay, nhạc nền du dương và công cụ ghép thiệp quà tặng.
            </p>
          </div>

          <button
            onClick={() => setIsTipsOpen(true)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl text-xs font-bold transition-all border border-white/30 shrink-0"
          >
            Xem Mẹo Tặng Quà 💡
          </button>
        </div>

        {/* Main Grid: Left is Configuration, Right is QR Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Step 1: Content & 3D Words, Step 2: QR Style) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Step 1: Content Editor (Interactive Page with 3D neon words & TTS) */}
            <InteractivePageEditor
              pageData={pageData}
              onChangePageData={setPageData}
              onPreviewInteractive={() => setIsLiveViewerOpen(true)}
            />

            {/* Step 2: QR Code Styling Editor */}
            <QRStyleEditor
              selectedPreset={selectedPreset}
              onSelectPreset={setSelectedPreset}
              dotType={dotType}
              onChangeDotType={setDotType}
              cornerSquareType={cornerSquareType}
              onChangeCornerSquareType={setCornerSquareType}
              logoId={logoId}
              onSelectLogo={setLogoId}
              customLogoUrl={customLogoUrl}
              onChangeCustomLogoUrl={setCustomLogoUrl}
              frameId={frameId}
              onSelectFrame={setFrameId}
            />
          </div>

          {/* Right Column (Live QR Preview & Download Actions) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <QRPreview
              qrData={qrData}
              pageData={pageData}
              preset={selectedPreset}
              dotType={dotType}
              cornerSquareType={cornerSquareType}
              cornerDotType={cornerDotType}
              logoId={logoId}
              customLogoUrl={customLogoUrl}
              frameId={frameId}
              mode="interactive"
              onOpenMockup={() => setIsMockupOpen(true)}
              onDownloadHtml={handleDownloadStandaloneHtml}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-rose-100 bg-white/60 text-center text-xs text-slate-500">
        <p>Tạo bằng cả yêu thương ❤️ • Ứng dụng Tạo Mã QR Tình Yêu & Lời Chúc Sinh Nhật</p>
      </footer>

      {/* Modals */}
      <CardMockupGenerator
        isOpen={isMockupOpen}
        onClose={() => setIsMockupOpen(false)}
        qrData={qrData}
        preset={selectedPreset}
        dotType={dotType}
        cornerSquareType={cornerSquareType}
        cornerDotType={cornerDotType}
        logoId={logoId}
        customLogoUrl={customLogoUrl}
        pageData={pageData}
      />

      <LiveInteractiveViewer
        isOpen={isLiveViewerOpen}
        onClose={() => setIsLiveViewerOpen(false)}
        pageData={pageData}
      />

      <TipsGuideModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
        onOpenMockup={() => setIsMockupOpen(true)}
      />
    </div>
  );
}
