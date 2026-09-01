import { useState, type ComponentProps } from "react";
import { useWatch, type FieldErrors } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { useQRForm, type QRFormData } from "@/hooks/useQRForm";
import { MAX_URL_LENGTH } from "@/constants/constants";
import { cn } from "@/libs/utils";

export interface QRFormProps {
  onGenerate: (data: QRFormData, logo: File | null) => void;
  onError: (errors: FieldErrors<QRFormData>) => void;
}

export default function QRForm({ onGenerate, onError }: QRFormProps) {
  const {
    register,
    handleSubmit,
    // setValue,
    // watch,
    control,
    formState: { errors, isSubmitting },
  } = useQRForm();

  const [logo, setLogo] = useState<File | null>(null);

  const url = useWatch({
    control,
    name: "url",
  });

  const onSubmit = (data: QRFormData) => {
    onGenerate(data, logo);
  };

  return (
    <form
      className="md:w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="mb-6">
        <h2 className="text-sm md:text-xl font-semibold tracking-tight text-zinc-950">
          Generate QR code
        </h2>
        <p className="mt-1 text-xs md:text-sm text-zinc-500">
          Enter your content and customize your QR code.
        </p>
      </div>

      <div className="space-y-5">
        {/* URL or Text */}
        <div>
          <FormLabel htmlFor="qr-value">URL</FormLabel>

          <textarea
            id="qr-value"
            className={cn(
              "w-full resize-none rounded-xl border border-zinc-200",
              "text-xs md:text-sm text-zinc-900 placeholder:text-zinc-400",
              "bg-zinc-50 px-3.5 py-3 outline-none transition",
              "focus:border-zinc-400 focus:bg-white focus:ring-4 focus:ring-zinc-100",
            )}
            placeholder="https://example.com"
            rows={4}
            {...register("url")}
          />

          <ValidationData
            currentLength={url.length}
            maxLength={MAX_URL_LENGTH}
            errorMessage={errors.url?.message}
          />
        </div>

        {/* Size */}
        {/* <div>
          <FormLabel htmlFor="qr-size">Size</FormLabel>

          <select
            id="qr-size"
            className="w-full appearance-none rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:bg-white focus:ring-4 focus:ring-zinc-100"
            {...register("size")}
          >
            {SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>

          <ValidationData errorMessage={errors.size?.message} />
        </div> */}

        {/* Logo Upload */}
        <div>
          <FormLabel>
            Center logo
            <span className="ml-1 font-normal text-zinc-400">(Optional)</span>
          </FormLabel>

          <label
            htmlFor="logo-upload"
            className={cn(
              "flex items-center gap-3 px-4 py-4 bg-zinc-50",
              "rounded-xl border border-dashed border-zinc-300",
              "cursor-pointer transition hover:border-zinc-400 hover:bg-zinc-100",
            )}
          >
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center",
                "rounded-lg bg-white text-zinc-500 shadow-sm ring-1 ring-zinc-200",
              )}
            >
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

            <div className="min-w-0 grow">
              <p className="truncate text-xs md:text-sm font-medium text-zinc-800">
                {!logo ? "Upload an image" : logo.name}
              </p>
              <p className="text-[10px] md:text-xs text-zinc-500">
                PNG, JPG or SVG
              </p>
            </div>

            <input
              id="logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              className="sr-only"
              onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
            />

            {logo && (
              <button
                type="button"
                className={cn(
                  "shrink-0 rounded-lg border border-zinc-200 bg-white px-3 py-2",
                  "font-medium text-zinc-600 transition",
                  "hover:border-red-200 hover:bg-red-50 hover:text-red-600",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setLogo(null);
                }}
              >
                <Trash2 className="size-3.5 md:size-4 " />
              </button>
            )}
          </label>
        </div>

        {/* Circular Logo */}
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            className="size-3 md:size-4 rounded border-zinc-300 accent-zinc-900"
            {...register("circularLogo")}
          />

          <span className="text-xs md:text-sm text-zinc-700">
            Make the center logo circular
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl",
            "text-xs md:text-sm font-medium text-white",
            "shadow-sm transition-all bg-zinc-950 hover:bg-zinc-800",
            "focus:outline-none focus:ring-4 focus:ring-zinc-200 active:scale-[0.99]",
          )}
        >
          {isSubmitting ? "Generating..." : "Generate QR code"}
        </button>
      </div>
    </form>
  );
}

const FormLabel = ({ children, ...props }: ComponentProps<"label">) => {
  return (
    <label
      {...props}
      className="mb-2 block text-xs md:text-sm font-medium text-zinc-900"
    >
      {children}
    </label>
  );
};

export function ValidationData({
  currentLength,
  maxLength,
  errorMessage,
}: {
  currentLength?: number;
  maxLength?: number;
  errorMessage?: string;
}) {
  return (
    <div className="flex gap-2 text-[10px] md:text-xs py-0.5 px-1">
      <div className="grow">
        {errorMessage && <span className="text-rose-500">{errorMessage}</span>}
      </div>
      {maxLength && maxLength > 0 && (
        <div className="shrink-0 text-muted">
          <span>
            {currentLength}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
