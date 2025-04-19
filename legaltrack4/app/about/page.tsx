"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Scale, Mail, Phone, MapPin, Github, Linkedin, Twitter, FileText, Lightbulb } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Arnav Shukla",
      avatar: "/Screenshot 2025-03-26 at 2.15.31 AM.png",
      bio: "Expert in Web Development and Data Science, bringing technical expertise to simplify legal processes.",
      social: {
        github: "#",
        linkedin: "https://www.linkedin.com/in/arnav-shukla-61aab8281/",
        twitter: "#",
      },
    },
    {
      name: "Mishrita",
      avatar: "/Screenshot 2025-03-26 at 2.14.26 AM.png",
      bio: "AI expert with a keen interest in web development, focused on creating intelligent legal tech solutions.",
      social: {
        github: "#",
        linkedin: "https://www.linkedin.com/in/mishrita-0bb3b4280/",
        twitter: "#",
      },
    },
    {
      name: "Krish Sapra",
      avatar: "/Screenshot 2025-03-26 at 2.19.43 AM.png",
      bio: "Expert in AI and design, ensuring our platform delivers intuitive, perplexing and amazing user experiences.",
      social: {
        github: "#",
        linkedin: "https://www.linkedin.com/in/krish-sapra-14v/",
        twitter: "#",
      },
    },
    {
      name: "Kartik Bansal",
      avatar: "/Screenshot 2025-03-26 at 2.18.23 AM.png",
      bio: "UI/UX expert and a skilled developer, developing innovative algorithms for our IPC prediction system.",
      social: {
        github: "#",
        linkedin: "https://www.linkedin.com/in/kartik-bansal-486530281/",
        twitter: "#",
      },
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">About Legal Track</h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl section-text leading-relaxed mb-6">
                Legal Track is a pioneering platform designed to bridge the gap between complex legal systems and
                everyday citizens. Our mission is to make legal processes more accessible, understandable, and efficient
                for everyone.
              </p>

              <p className="section-text leading-relaxed mb-6">
                I, Arnav, along with my friends Mishrita, Krish, and Kartik, have all worked on this idea and developed
                this project from the ground up. We hope to help many people with this product of ours and the service
                provided to our users. We also hope to reach greater heights and achieve huge success from this project
                and venture of ours.
              </p>

              <p className="section-text leading-relaxed mb-6">
                Our platform leverages cutting-edge AI technology to predict relevant IPC sections based on case
                descriptions, simplifies the FIR filing process, and provides comprehensive information about Indian
                Penal Code sections. We believe that understanding your legal rights and options shouldn't require a law
                degree.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="section-text">
                  Making legal resources available to everyone regardless of background or location
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                <p className="section-text">
                  Transforming complex legal processes into straightforward, user-friendly experiences
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="section-text">
                  Using technology to revolutionize how people interact with the legal system
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow dark:bg-black/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 border-4 border-primary/20 mb-4">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xl">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold">{member.name}</h3>
                        <p className="section-text mb-4">{member.bio}</p>
                        <div className="flex space-x-3">
                          <a
                            href={member.social.github}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                          <a
                            href={member.social.linkedin}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                          <a
                            href={member.social.twitter}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="section-text mb-8">
              We're always looking to improve our platform and welcome your feedback and suggestions.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="section-text">support@legaltrack.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="section-text">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="section-text">New Delhi, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  )
}

