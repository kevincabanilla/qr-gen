import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DEFAULT_SIZE,
  // IMG_FILE_TYPES,
  MAX_URL_LENGTH,
  SIZE_OPTIONS,
} from "@/constants/constants";

const qrFormSchema = zod.object({
  url: zod
    .string()
    .trim()
    .min(1, "Please enter a URL or some text.")
    .max(
      MAX_URL_LENGTH,
      `Content must be ${MAX_URL_LENGTH} characters or less.`,
    ),

  size: zod.coerce
    .number<number>()
    .refine((size) => SIZE_OPTIONS.includes(size), {
      message: "Please select a valid size.",
    }),

  /* logo: zod
    // .file()
    // 1. Check if the input is an instance of FileList
    .instanceof(FileList, { message: "File is required" })
    .optional()
    // 2. Ensure at least one file was selected
    .refine((files) => (files?.length ?? 0) > 0, "File is required")
    // 3. Transform the FileList into a single File object
    .transform((files) => files![0])
    // 4. Validate file size
    // .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    // 5. Validate file type
    .refine(
      (file) => IMG_FILE_TYPES.includes(file.type),
      "Logo must be a PNG, JPG, or SVG image.",
    ), */

  circularLogo: zod.boolean().optional(),
});

// export type QRFormData = zod.infer<typeof qrFormSchema>;

export type QRFormInput = zod.input<typeof qrFormSchema>;

// What comes out after Zod parsing/transformation
export type QRFormData = zod.output<typeof qrFormSchema>;

export function useQRForm(defaultValues?: QRFormInput) {
  const form = useForm<QRFormInput, unknown, QRFormData>({
    resolver: zodResolver(qrFormSchema),
    defaultValues: {
      url: "",
      size: DEFAULT_SIZE,
      circularLogo: false,
      ...defaultValues,
    },
  });

  return form;
}
