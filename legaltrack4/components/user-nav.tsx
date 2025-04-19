"use client"

import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

export function UserNav() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full hover:bg-primary/10 transition-colors duration-200"
        aria-label="Information"
      >
        <Info className="h-5 w-5" />
      </Button>
    </div>
  )
}
