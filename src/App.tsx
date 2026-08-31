import { useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "./components/QRCodeCanvas";
import QRForm from "./components/QRForm";
import type { QRFormData } from "./hooks/useQRForm";

function App() {
  const [qrValue, setQrValue] = useState("");
  const [size, setSize] = useState(0);
  const [logo, setLogo] = useState<File | null>(null);
  const [circularLogo, setCircularLogo] = useState(false);

  const [showQR, setShowQR] = useState(false);

  const generateQR = (data: QRFormData, logo: File | null) => {
    setQrValue(data.url);
    setSize(data.size);
    setLogo(logo);
    setCircularLogo(data.circularLogo ?? false);
    setShowQR(true);
  };

  return (
    <main>
      <div className="h-screen w-screen flex flex-col md:flex-row justify-center items-center gap-4">
        <QRForm onGenerate={generateQR} onError={() => setShowQR(false)} />

        {showQR && (
          <QRCodeCanvas
            value={qrValue}
            logoFile={logo}
            roundedLogo={circularLogo}
            options={{
              width: size,
            }}
          />
        )}
      </div>
    </main>
  );
}

export default App;
