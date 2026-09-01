import { useCallback, useEffect, useRef } from "react";
import { type QRCodeRenderersOptions } from "qrcode";
import { generateQRCodeCanvas } from "@/libs/qrGenerator";
import { sanitizeFileName } from "@/libs/utils";
import { SIZE_OPTIONS } from "@/constants/constants";
import { DownloadButton } from "./DownloadButton";

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

  // This will determine the minimum download
  // resolution size based on the content's length.
  const getSizeOptions = () => {
    const stringSize = value.length;

    if (stringSize > 590) {
      return SIZE_OPTIONS.slice(3); // removes 32, 64, 128
    } else if (stringSize >= 120) {
      return SIZE_OPTIONS.slice(2); // removes 32, 64
    } else if (stringSize >= 14) {
      return SIZE_OPTIONS.slice(1); // removes 32
    } else {
      return SIZE_OPTIONS;
    }
  };

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <canvas ref={canvasRef} />

      <DownloadButton
        sizeOptions={getSizeOptions()}
        onDownload={downloadCanvas}
      />
    </div>
  );
}
