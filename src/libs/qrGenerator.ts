import QRCode, { type QRCodeRenderersOptions } from "qrcode";

const DEFAULT_WIDTH = 400;
const DEFAULT_MARGIN = 2;
const LOGO_RATIO = 0.2;
const LOGO_PADDING_RATIO = 0.025;

export async function generateQR(text: string) {
  const dataUrl = await QRCode.toDataURL(text, {
    width: DEFAULT_WIDTH,
    margin: DEFAULT_MARGIN,
  });
  return dataUrl;
}

export async function generateQRCodeCanvas(
  text: string,
  logoFile?: File | null,
  roundedLogo?: boolean,
  options?: QRCodeRenderersOptions,
): Promise<HTMLCanvasElement> {
  const qrOptions: QRCodeRenderersOptions = {
    width: DEFAULT_WIDTH,
    margin: DEFAULT_MARGIN,
    errorCorrectionLevel: !logoFile ? "M" : "H",
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
    ...options,
  };

  const canvas = document.createElement("canvas");

  // Generate QR code
  await QRCode.toCanvas(canvas, text, qrOptions);

  if (logoFile) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    const logoUrl = URL.createObjectURL(logoFile);

    try {
      const logo = new Image();

      await new Promise<void>((resolve, reject) => {
        logo.onload = () => resolve();
        logo.onerror = () => reject(new Error("Failed to load logo"));
        logo.src = logoUrl;
      });

      // Use the actual rendered canvas size
      const qrSize = Math.min(canvas.width, canvas.height);

      // Logo is always 20% of the QR size
      const logoSize = qrSize * LOGO_RATIO;

      const x = (canvas.width - logoSize) / 2;
      const y = (canvas.height - logoSize) / 2;

      // Padding scales with QR size
      const padding = qrSize * LOGO_PADDING_RATIO;

      ctx.fillStyle = "#ffffff";

      if (!roundedLogo) {
        // Square white background
        ctx.fillRect(
          x - padding,
          y - padding,
          logoSize + padding * 2,
          logoSize + padding * 2,
        );
        // Draw square logo
        ctx.drawImage(logo, x, y, logoSize, logoSize);
      } else {
        // Circular white background
        const radius = (logoSize + padding * 2) / 2;

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.fill();

        // Clip the actual logo to a circle
        ctx.save();

        ctx.beginPath();
        ctx.arc(
          x + logoSize / 2,
          y + logoSize / 2,
          logoSize / 2,
          0,
          Math.PI * 2,
        );
        ctx.clip();

        ctx.drawImage(logo, x, y, logoSize, logoSize);

        ctx.restore();
      }
    } finally {
      URL.revokeObjectURL(logoUrl);
    }
  }

  return canvas;
}
