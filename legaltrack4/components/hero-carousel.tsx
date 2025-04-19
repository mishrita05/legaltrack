"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Navigate Legal Complexities with AI",
    description: "Our advanced AI predicts accurate IPC sections for your case, simplifying the legal process.",
    bgColor: "from-blue-900 to-indigo-800",
    buttonText: "Try IPC Prediction",
    buttonLink: "/predict",
    icon: "/5088267762aa7ad9345544be7dd143b8.jpg",
  },
  {
    id: 2,
    title: "File FIRs Online in Minutes",
    description: "Skip the police station visits. File your First Information Report directly from your device.",
    bgColor: "from-purple-900 to-indigo-800",
    buttonText: "File FIR Now",
    buttonLink: "/file-fir",
    icon: "/e1e12912660ffe9e33883058f09b718e.jpg",
  },
  {
    id: 3,
    title: "Comprehensive IPC Handbook",
    description: "Access detailed information about Indian Penal Code sections and their applications.",
    bgColor: "from-indigo-900 to-blue-800",
    buttonText: "Explore Handbook",
    buttonLink: "/handbook",
    icon: "/indian-penal-code-set-of-04-volumes-original-imaf8ysktzbmfvxn.jpg",
  },
  {
    id: 4,
    title: "24/7 Legal Support Available",
    description: "Get assistance from our legal experts whenever you need it, day or night.",
    bgColor: "from-blue-800 to-indigo-900",
    buttonText: "Contact Support",
    buttonLink: "/support",
    icon: "/Ankara İcra Avukatı.jpg",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}></div>
          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>

          <div className="relative z-20 h-full container mx-auto flex items-center">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-6">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur-xl">
                  <span className="mr-2 rounded-full bg-white h-2 w-2"></span>
                  Legal Track
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{slide.title}</h1>
                <p className="text-xl opacity-90">{slide.description}</p>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <a href={slide.buttonLink}>{slide.buttonText}</a>
                </Button>
              </div>
              <div className="hidden md:flex justify-center items-center relative h-[350px]">
                <div className="relative z-10 h-[300px] w-[300px] rounded-lg overflow-hidden border border-white/20 backdrop-blur-sm bg-white/5">
                  <Image
                    src={slide.icon}
                    alt={slide.title}
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
