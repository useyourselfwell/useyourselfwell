import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    // Vercel Web Analytics track function
    const { track } = window as unknown as {
      track?: (name: string, data?: Record<string, unknown>) => void;
    };
    if (track) {
      track(name, data);
    }
  } catch {
    // Silently fail if analytics not available
  }
}
