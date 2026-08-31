import { useEffect, useRef } from "react";
import QRCode, { type QRCodeRenderersOptions } from "qrcode";

const DEFAULT_WIDTH = 400;
const DEFAULT_MARGIN = 2;
const LOGO_RATIO = 0.2;
const LOGO_PADDING_RATIO = 0.025;

export interface QRCodeCanvasProps {
  value: string;
  logoFile?: File | null;
  roundedLogo?: boolean;
  options?: QRCodeRenderersOptions;
}

export function QRCodeCanvas({
  value,
  logoFile,
  roundedLogo,
  options,
}: QRCodeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const generate = async () => {
      const qrOptions: QRCodeRenderersOptions = {
        width: DEFAULT_WIDTH,
        margin: DEFAULT_MARGIN,
        errorCorrectionLevel: !logoFile ? "M" : "H", // H is important for logos
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        ...options,
      };

      // Generate QR code
      await QRCode.toCanvas(canvas, value, qrOptions);

      if (logoFile !== undefined && logoFile !== null) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = URL.createObjectURL(logoFile);

        logo.onload = () => {
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
            ctx.arc(
              canvas.width / 2,
              canvas.height / 2,
              radius,
              0,
              Math.PI * 2,
            );
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
        };
      }
    };

    generate();
  }, [value, logoFile, roundedLogo, options]);

  return <canvas ref={canvasRef} />;
}
