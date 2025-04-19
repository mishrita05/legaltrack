"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MessageSquare } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import ChatbotButton from "@/components/chatbot-button"

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Support Center</h1>
              <p className="text-lg section-text">Get help with Legal Track services and features</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Tabs defaultValue="contact">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="contact">Contact Us</TabsTrigger>
                  <TabsTrigger value="faq">FAQs</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="contact">
                  <motion.div
                    className="grid gap-8 md:grid-cols-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="dark:bg-black/50">
                        <CardHeader>
                          <CardTitle>Contact Information</CardTitle>
                          <CardDescription className="section-text">
                            Reach out to us through any of these channels
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-start gap-4">
                            <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Phone Support</h3>
                              <p className="section-text">+91 98765 43210</p>
                              <p className="text-sm section-text">Available Mon-Fri, 9AM-6PM</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Email Support</h3>
                              <p className="section-text">support@legaltrack.com</p>
                              <p className="text-sm section-text">We respond within 24 hours</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium">Live Chat</h3>
                              <p className="section-text">Available on our website</p>
                              <p className="text-sm section-text">
                                24/7 automated support, with live agents during business hours
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="dark:bg-black/50">
                        <CardHeader>
                          <CardTitle>Send a Message</CardTitle>
                          <CardDescription className="section-text">
                            Fill out the form and we'll get back to you
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter your name" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="What is your query about?" />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Describe your issue or question in detail..."
                              className="min-h-[120px]"
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Send Message</Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="faq">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="dark:bg-black/50">
                      <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription className="section-text">
                          Find answers to common questions about Legal Track
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {[
                            {
                              question: "How accurate is the IPC section prediction?",
                              answer:
                                "Our AI-powered prediction system has an accuracy rate of approximately 95% based on the information provided. The system is trained on thousands of legal cases and continuously updated with the latest legal precedents. However, we always recommend consulting with a legal professional for final verification.",
                            },
                            {
                              question: "Is the online FIR filing legally valid?",
                              answer:
                                "Yes, the online FIR filing through Legal Track is legally valid. We work in coordination with local police departments to ensure that your FIR is properly registered. You will receive an official FIR number and confirmation once your report is processed by the relevant police station.",
                            },
                            {
                              question: "How long does it take to process an online FIR?",
                              answer:
                                "The processing time for an online FIR typically ranges from 24 to 48 hours. Once submitted, your FIR is forwarded to the appropriate police jurisdiction for verification and processing. You will receive updates via email and SMS throughout the process.",
                            },
                            {
                              question: "Is my personal information secure?",
                              answer:
                                "Yes, we take data security very seriously. All personal information is encrypted and stored securely in compliance with data protection regulations. We do not share your information with any third parties except the relevant law enforcement agencies for FIR processing.",
                            },
                            {
                              question: "Can I track the status of my FIR?",
                              answer:
                                'Yes, you can track the status of your FIR through your Legal Track account dashboard. Simply log in and navigate to the "My FIRs" section where you can view real-time updates on your filed reports.',
                            },
                            {
                              question: "What if I need to modify my FIR after submission?",
                              answer:
                                "If you need to modify your FIR after submission but before it's processed by the police, you can contact our support team immediately. Once the FIR is processed, any modifications will need to be made through a supplementary statement at the police station.",
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <AccordionItem value={`item-${index + 1}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>
                                  <p className="section-text">{item.answer}</p>
                                </AccordionContent>
                              </AccordionItem>
                            </motion.div>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="resources">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="dark:bg-black/50">
                      <CardHeader>
                        <CardTitle>Legal Resources</CardTitle>
                        <CardDescription className="section-text">
                          Helpful guides and resources for legal assistance
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <motion.div
                          className="grid gap-6 md:grid-cols-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                        >
                          {[
                            {
                              title: "Understanding IPC Sections",
                              description: "A comprehensive guide to common IPC sections and their applications",
                            },
                            {
                              title: "FIR Filing Guide",
                              description: "Step-by-step instructions for filing an effective FIR",
                            },
                            {
                              title: "Legal Rights Handbook",
                              description: "Know your rights during legal proceedings and police investigations",
                            },
                            {
                              title: "Evidence Collection Guide",
                              description: "How to properly collect and preserve evidence for your case",
                            },
                          ].map((resource, index) => (
                            <motion.div
                              key={index}
                              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors dark:border-primary/20 dark:hover:bg-primary/10"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              <h3 className="font-medium mb-2">{resource.title}</h3>
                              <p className="text-sm section-text mb-3">{resource.description}</p>
                              <Button variant="link" className="p-0 h-auto text-primary">
                                Download PDF
                              </Button>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.div
                          className="mt-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <h3 className="font-semibold text-lg mb-4">Video Tutorials</h3>
                          <div className="grid gap-4 md:grid-cols-2">
                            {[
                              { title: "How to Use Legal Track", duration: "5:32" },
                              { title: "Understanding Your Legal Options", duration: "8:15" },
                            ].map((video, index) => (
                              <motion.div
                                key={index}
                                className="border rounded-lg overflow-hidden dark:border-primary/20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                              >
                                <div className="aspect-video bg-muted flex items-center justify-center">
                                  <span className="section-text">Video Thumbnail</span>
                                </div>
                                <div className="p-3">
                                  <h4 className="font-medium">{video.title}</h4>
                                  <p className="text-sm section-text">{video.duration}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  )
}

