"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

// Testimonial data structure
interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  rating: number
  review: string
}

// Sample testimonial data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "New Delhi",
    avatar: "/Screenshot 2025-03-26 at 10.07.47 AM.png",
    rating: 5,
    review:
      "Legal Track helped me understand the relevant IPC sections for my property dispute case. The AI prediction was spot on and saved me hours of research!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    avatar: "/Screenshot 2025-03-26 at 10.08.13 AM.png",
    rating: 4,
    review:
      "Filing an FIR online was so convenient. The process was smooth and I received confirmation within hours. The 24/7 support team was very helpful with my questions.",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    avatar: "/Screenshot 2025-03-26 at 10.08.39 AM.png",
    rating: 5,
    review:
      "The IPC Handbook feature is incredibly detailed and easy to navigate. As a law student, this has become my go-to resource for quick reference during my studies.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Users Say</h2>
          <p className="text-lg section-text max-w-2xl mx-auto">
            Hear from people who have used Legal Track to navigate their legal challenges
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 border-none shadow-md bg-white/80 backdrop-blur-sm dark:bg-black/50 hover:shadow-lg transition-all">
                <CardContent className="pt-6 space-y-4 h-full flex flex-col">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold section-text">{testimonial.name}</h4>
                      <p className="text-sm section-text">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <p className="italic section-text flex-grow">"{testimonial.review}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

