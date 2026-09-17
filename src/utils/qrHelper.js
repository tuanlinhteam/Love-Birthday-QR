import QRCodeStyling from 'qr-code-styling';
import { LOGO_OPTIONS } from '../constants/presets';

export function createQRInstance({
  data,
  size = 320,
  preset,
  dotType = 'rounded',
  cornerSquareType = 'extra-rounded',
  cornerDotType = 'dot',
  logoId = 'heart',
  customLogoUrl = null,
  margin = undefined
}) {
  let imageSource = null;

  if (logoId === 'custom' && customLogoUrl) {
    imageSource = customLogoUrl;
  } else if (logoId !== 'none') {
    const selectedLogo = LOGO_OPTIONS.find(l => l.id === logoId);
    if (selectedLogo && selectedLogo.svg) {
      imageSource = `data:image/svg+xml;utf8,${encodeURIComponent(selectedLogo.svg)}`;
    }
  }

  const effectiveMargin = margin !== undefined ? margin : (size >= 800 ? 36 : 22);

  const qrOptions = {
    width: size,
    height: size,
    type: 'canvas',
    data: data || 'https://love.qr',
    margin: effectiveMargin, // Ample quiet zone ensures Zalo & all phone cameras detect boundaries immediately
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'Q' // 25% redundancy provides great logo tolerance with significantly lower density than H
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.20, // 20% width ensures logo looks cute while preserving 85%+ decodable space
      margin: 4,
      crossOrigin: 'anonymous'
    },
    dotsOptions: {
      type: dotType,
      color: preset.primary,
      gradient: preset.gradient ? {
        type: preset.gradientType || 'linear',
        rotation: (preset.rotation || 45) * (Math.PI / 180),
        colorStops: [
          { offset: 0, color: preset.primary },
          { offset: 1, color: preset.secondary }
        ]
      } : undefined
    },
    backgroundOptions: {
      color: '#ffffff', // Pure white background gives maximum contrast for phone camera sensors
    },
    // The 3 corner eyes MUST be solid and high-contrast for phone cameras to lock on
    cornersSquareOptions: {
      type: cornerSquareType,
      color: preset.primary
    },
    cornersDotOptions: {
      type: cornerDotType,
      color: preset.primary
    }
  };

  if (imageSource) {
    qrOptions.image = imageSource;
  }

  return new QRCodeStyling(qrOptions);
}
