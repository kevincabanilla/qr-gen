import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeFileName(input: string, fallback?: string): string {
  return (
    input
      // Normalize Unicode characters into a canonical form.
      // For example, some visually identical characters can have
      // different internal representations.
      .normalize("NFKC")
      .replace("://", "_")

      // Replace characters that should not appear in a filename:
      // - \p{Cc} = Unicode control characters
      // - \p{Cf} = Unicode format characters
      // - <>:"/\\|?* = characters invalid/problematic in filenames
      // The "g" flag replaces all matches, "u" enables Unicode
      // property escapes.
      .replace(/[\p{Cc}\p{Cf}<>:"/\\|?*]/gu, "_")

      // Remove whitespace from the beginning and end.
      .trim()

      // Remove leading or trailing dots.
      // This prevents names such as ".hidden" or "file."
      // and helps avoid problematic names such as "..".
      .replace(/^\.+|\.+$/g, "")

      // Limit the filename to 200 characters.
      // This prevents excessively long filenames.
      .slice(0, 200) ||
    // If everything was removed (for example, the input was
    // only invalid characters), use fallback provided by caller instead
    // or "download" if fallback was not specified.
    fallback ||
    "download"
  );
}
