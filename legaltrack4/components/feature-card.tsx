import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  number: string
  title: string
  description: string
}

export default function FeatureCard({ number, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-none bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
            {number}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

