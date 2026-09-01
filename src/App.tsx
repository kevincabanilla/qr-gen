import { useState } from "react";
import "./App.css";
import { ArrowLeft } from "lucide-react";
import { QRCodeCanvas } from "./components/QRCodeCanvas";
import QRForm from "./components/QRForm";
import type { QRFormData } from "./hooks/useQRForm";
import { cn } from "./libs/utils";

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
      <div className="h-screen w-screen max-h-screen flex flex-col lg:flex-row justify-center items-center gap-4 p-4 overflow-auto">
        <div className={cn(showQR && "hidden lg:block")}>
          <QRForm onGenerate={generateQR} onError={() => setShowQR(false)} />
        </div>

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

        {showQR && (
          <div className="lg:hidden w-full flex fixed bottom-0 px-3 py-4">
            <button
              type="button"
              className={cn(
                "flex-1 inline-flex items-center justify-center gap-2",
                "px-3.5 py-2 rounded-lg text-xs font-medium",
                "bg-zinc-950 text-white shadow-sm transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2",
                "active:bg-zinc-700",
              )}
              onClick={() => setShowQR(false)}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              <div className="grow">Back</div>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
