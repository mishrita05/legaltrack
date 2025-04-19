"use client"

import { Phone, HeadphonesIcon, ShieldAlert, UserRound, Stethoscope, Baby, UserPlus, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const helplines = [
  {
    icon: <ShieldAlert className="h-8 w-8 text-primary" />,
    title: "Police",
    number: "100",
    description: "Emergency police assistance",
  },
  {
    icon: <Stethoscope className="h-8 w-8 text-primary" />,
    title: "Ambulance",
    number: "102",
    description: "Medical emergency services",
  },
  {
    icon: <UserRound className="h-8 w-8 text-primary" />,
    title: "Women Helpline",
    number: "1091",
    description: "Support for women in distress",
  },
  {
    icon: <Baby className="h-8 w-8 text-primary" />,
    title: "Child Helpline",
    number: "1098",
    description: "Support for children in distress",
  },
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: "Senior Citizens",
    number: "14567",
    description: "Elderly care helpline",
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8 text-primary" />,
    title: "Legal Track",
    number: "1800-123-4567",
    description: "Our dedicated helpline",
  },
]

export default function HelplineNumbers() {
  const { toast } = useToast()
  const [copiedIndex, setCopiedIndex] = useState(-1)

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index)
      toast({
        title: "Number Copied!",
        description: `${text} has been copied to clipboard.`,
        duration: 2000,
      })

      setTimeout(() => {
        setCopiedIndex(-1)
      }, 2000)
    })
  }

  return (
    <section className="py-16 px-4 bg-accent/30">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <Phone className="h-6 w-6 text-primary mr-3" />
          <h2 className="text-3xl font-bold">Essential Legal Helpline Numbers</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {helplines.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-white hover:shadow-md transition-shadow group dark:bg-black/50"
            >
              <div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg section-text">{item.title}</h3>
              <div className="relative">
                <p className="text-primary font-bold">{item.number}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-7 top-0 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(item.number, index)}
                >
                  {copiedIndex === index ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <p className="text-sm section-text mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

