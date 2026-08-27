import { useEffect, useState } from "react";
import { generateQR } from "../libs/qrGenerator";

export function QRCodeImage({ value }: { value: string }) {
  const [QRData, setQRData] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const qr = await generateQR(value);
      setQRData(qr);
    };

    loadData();
  }, [value]);

  return QRData && <img src={QRData} />;
}
