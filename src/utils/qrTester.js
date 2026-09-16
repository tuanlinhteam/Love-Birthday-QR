import jsQR from 'jsqr';

export function testDecodeQR(imageSource) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        resolve({
          success: true,
          data: code.data,
          location: code.location
        });
      } else {
        // Try with inversion
        const codeInverted = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'onlyInvert',
        });
        if (codeInverted) {
          resolve({
            success: true,
            data: codeInverted.data,
            location: codeInverted.location
          });
        } else {
          resolve({
            success: false,
            error: 'Không tìm thấy mã QR hoặc ảnh có độ tương phản quá thấp.'
          });
        }
      }
    };
    img.onerror = () => {
      resolve({
        success: false,
        error: 'Không thể đọc file ảnh.'
      });
    };
    img.src = imageSource;
  });
}
