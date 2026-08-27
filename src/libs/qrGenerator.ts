import QRCode from "qrcode";

export async function generateQR(text: string) {
  const dataUrl = await QRCode.toDataURL(text, {
    width: 300,
    margin: 2,
  });
  return dataUrl;
}
