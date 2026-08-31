import { useCallback, useEffect, useRef } from "react";
import { type QRCodeRenderersOptions } from "qrcode";
import { generateQRCodeCanvas } from "../libs/qrGenerator";
import { DownloadButton } from "./DownloadButton";
import { sanitizeFileName } from "../libs/utils";

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
    let cancelled = false;

    generateQRCodeCanvas(value, logoFile, roundedLogo, options).then(
      (canvas) => {
        if (cancelled || !canvasRef.current) return;

        canvasRef.current.replaceWith(canvas);
        canvasRef.current = canvas;
      },
    );

    return () => {
      cancelled = true;
    };
  }, [value, logoFile, roundedLogo, options]);

  const downloadCanvas = useCallback(
    (size: number) => {
      generateQRCodeCanvas(value, logoFile, roundedLogo, {
        ...options,
        width: size,
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          if (!blob) return;

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");

          const fileName = sanitizeFileName(value);

          link.href = url;
          link.target = "_blank";
          link.download = `qrcode-${fileName}-${size}px.png`;
          link.click();

          URL.revokeObjectURL(url);
        }, "image/png");
      });
    },
    [value, logoFile, roundedLogo, options],
  );

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <canvas ref={canvasRef} />

      <DownloadButton onDownload={downloadCanvas} />
    </div>
  );
}
