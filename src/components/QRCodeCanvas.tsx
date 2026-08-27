import { useEffect, useRef } from "react";
import QRCode, { type QRCodeRenderersOptions } from "qrcode";

const DEFAULT_WIDTH = 400;
const DEFAULT_MARGIN = 2;
const LOGO_RATIO = 0.2;
const LOGO_PADDING_RATIO = 0.025;

export interface QRCodeCanvasProps {
  value: string;
  logoUrl?: string;
  roundedLogo?: boolean;
  options?: QRCodeRenderersOptions;
}

export function QRCodeCanvas({
  value,
  logoUrl,
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
        errorCorrectionLevel: !logoUrl ? "M" : "H", // H is important for logos
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        ...options,
      };

      // Generate QR code
      await QRCode.toCanvas(canvas, value, qrOptions);

      if (logoUrl !== undefined && logoUrl !== null) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.src = logoUrl;

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
          }

          // Draw logo
          ctx.drawImage(logo, x, y, logoSize, logoSize);
        };
      }
    };

    generate();
  }, [value, logoUrl, roundedLogo, options]);

  return <canvas ref={canvasRef} />;
}
