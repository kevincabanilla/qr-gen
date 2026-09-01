import { useState } from "react";
import { Check, ChevronDown, Download } from "lucide-react";
import { cn } from "@/libs/utils";
import { DEFAULT_SIZE, SIZE_OPTIONS } from "@/constants/constants";

export interface DownloadButtonProps {
  sizeOptions: number[];
  onDownload: (size: number) => void;
}

export function DownloadButton({
  sizeOptions,
  onDownload,
}: DownloadButtonProps) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(DEFAULT_SIZE);

  if (!sizeOptions.includes(size)) {
    setSize(() => sizeOptions[0]);
  }

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        aria-label="Download button"
        className={cn(
          "inline-flex h-10 items-center gap-2 px-4",
          "bg-white hover:bg-zinc-100 text-zinc-900",
          "shadow-sm transition-colors text-xs md:text-sm font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
          open ? "rounded-tl-lg" : "rounded-l-lg",
        )}
        onClick={() => onDownload(size)}
      >
        <Download size={16} />
        Download
        <span className="text-zinc-500">{size}px</span>
      </button>

      <button
        type="button"
        aria-label="Download options"
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "inline-flex h-10 w-9 items-center justify-center",
          "bg-white hover:bg-zinc-100 text-zinc-900",
          "shadow-sm transition-colors",
          "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-zinc-400",
          open ? "rounded-tr-lg" : "rounded-r-lg",
        )}
        onClick={() => setOpen((value) => !value)}
      >
        <ChevronDown
          size={16}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          {/* Close on outside click */}
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div
            role="menu"
            className={cn(
              "absolute right-0 top-10 z-20 w-full",
              "rounded-b-lg border-t border-zinc-200 bg-white p-1.5",
              "shadow-xl shadow-zinc-950/10",
            )}
          >
            <div className="px-2.5 py-1.5 text-xs font-medium text-zinc-500">
              Image size
            </div>

            {SIZE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                role="menuitem"
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-2",
                  "text-xs md:text-sm text-zinc-700 transition-colors cursor-pointer",
                  "enabled:hover:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-default",
                  size === option && "bg-zinc-200 font-medium",
                )}
                disabled={!sizeOptions.includes(option)}
                onClick={() => {
                  setSize(option);
                  setOpen(false);
                }}
              >
                <span>{option}px</span>

                {size === option && (
                  <Check className="size-4.5 text-green-700" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
