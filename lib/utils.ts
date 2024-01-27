import { type ClassValue, clsx } from "clsx"; // Importing ClassValue type and clsx function from clsx library
import { twMerge } from "tailwind-merge"; // Importing twMerge function from tailwind-merge library

// Define a function named cn that takes any number of ClassValue inputs and returns a string
export function cn(...inputs: ClassValue[]) {
  // Merge the class names using clsx to combine and normalize them
  // Then, use twMerge to apply Tailwind CSS class names to the combined classes
  return twMerge(clsx(inputs));
}
