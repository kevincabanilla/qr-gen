import { useEffect, useRef } from "react";
import QRCode, { type QRCodeRenderersOptions } from "qrcode";

const DEFAULT_WIDTH = 400;
const DEFAULT_MARGIN = 2;

export interface QRCodeCanvasProps {
  value: string;
  logoUrl: string;
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
      // Generate QR code
      await QRCode.toCanvas(canvas, value, {
        width: DEFAULT_WIDTH,
        margin: DEFAULT_MARGIN,
        errorCorrectionLevel: "H", // Important for logos
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        ...options,
      });

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const logo = new Image();
      logo.crossOrigin = "anonymous";
      logo.src = logoUrl;

      logo.onload = () => {
        const logoSize = (options?.width ?? DEFAULT_WIDTH) * 0.2;
        const x = (canvas.width - logoSize) / 2;
        const y = (canvas.height - logoSize) / 2;

        // White background behind logo
        ctx.fillStyle = "#ffffff";
        if (!roundedLogo)
          ctx.fillRect(x - 10, y - 10, logoSize + 20, logoSize + 20);
        else {
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw logo
        ctx.drawImage(logo, x, y, logoSize, logoSize);
      };
    };

    generate();
  }, [value, logoUrl, roundedLogo, options]);

  return <canvas ref={canvasRef} />;
}
