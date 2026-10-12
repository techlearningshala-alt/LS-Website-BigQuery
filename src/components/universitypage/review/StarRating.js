import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StarRating({ value = 0, max = 5, size = 15 }) {
  return (
    <span className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => {
        const ratingValue = i + 1
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              value >= ratingValue
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            )}
          />
        )
      })}
    </span>
  )
}
