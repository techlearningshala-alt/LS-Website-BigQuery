import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// it will change 2025-10-28T09:28:26.000Z to 28-10-2025
// export function formatDate(dateString) {
//   if (!dateString) return "N/A";
//   const d = new Date(dateString);

//   const day = String(d.getDate()).padStart(2, "0");
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const year = d.getFullYear();

//   return `${day}-${month}-${year}`;
// }



export function formatDate(dateString) {
  if (!dateString) return "N/A";

  const d = new Date(dateString);

  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
