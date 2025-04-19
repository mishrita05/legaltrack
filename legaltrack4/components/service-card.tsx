import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  link: string
}

export default function ServiceCard({ icon, title, description, link }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md border-none bg-white dark:bg-gray-800">
      <Link href={link} className="block h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="mb-4 text-primary bg-primary/10 p-3 rounded-lg w-fit">{icon}</div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors dark:text-white">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 flex-grow dark:text-gray-300">{description}</p>
          <div className="flex items-center text-primary font-medium group-hover:underline">
            Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

