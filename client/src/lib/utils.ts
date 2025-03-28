import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to check if a color is dark
export function isColorDark(hexColor: string) {
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if color is dark (luminance < 0.5)
  return luminance < 0.5;
}

// Format price to currency
export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

// Calculate total price based on selected options
export const calculateTotalPrice = (
  plateSelectionPrice: number,
  plateTypePrice: number,
  badgePrice: number,
  textStylePrice: number,
  surroundPrice: number
): number => {
  return plateSelectionPrice + plateTypePrice + badgePrice + textStylePrice + surroundPrice;
};
