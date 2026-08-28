import { useState, type ComponentProps } from "react";

const SIZE_OPTIONS = [32, 64, 128, 512, 1080];

export default function QRForm() {
  const [value, setValue] = useState("");
  const [size, setSize] = useState("256");
  const [logo, setLogo] = useState<File | null>(null);
  const [circularLogo, setCircularLogo] = useState(false);

  return (
    <form className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
          Generate QR code
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Enter your content and customize your QR code.
        </p>
      </div>

      <div className="space-y-5">
        {/* URL or Text */}
        <div>
          <FormLabel htmlFor="qr-value">URL</FormLabel>

          <textarea
            id="qr-value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://example.com"
            rows={4}
            className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-4 focus:ring-zinc-100"
          />
        </div>

        {/* Size */}
        <div>
          <FormLabel htmlFor="qr-size">Size</FormLabel>

          <select
            id="qr-size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-4 focus:ring-zinc-100"
          >
            {SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size} px
              </option>
            ))}
          </select>
        </div>

        {/* Logo Upload */}
        <div>
          <FormLabel>
            Center logo
            <span className="ml-1 font-normal text-zinc-400">(Optional)</span>
          </FormLabel>

          <label
            htmlFor="logo-upload"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-4 transition hover:border-zinc-400 hover:bg-zinc-100"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm ring-1 ring-zinc-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0L8 8m4-4 4 4M5 20h14"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-800">
                {!logo ? "Upload an image" : logo.name}
              </p>
              <p className="text-xs text-zinc-500">PNG, JPG or SVG</p>
            </div>

            <input
              id="logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="sr-only"
              onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        {/* Circular Logo */}
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={circularLogo}
            onChange={(e) => setCircularLogo(e.target.checked)}
            className="size-4 rounded border-zinc-300 accent-zinc-900"
          />

          <span className="text-sm text-zinc-700">
            Make the center logo circular
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-200 active:scale-[0.99]"
        >
          Generate QR code
        </button>
      </div>
    </form>
  );
}

const FormLabel = ({ children, ...props }: ComponentProps<"label">) => {
  return (
    <label {...props} className="mb-2 block text-sm font-medium text-zinc-900">
      {children}
    </label>
  );
};
