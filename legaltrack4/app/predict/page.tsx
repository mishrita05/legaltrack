"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"
import { useRouter } from "next/navigation"

export default function PredictPage() {
  const [incidentType, setIncidentType] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [evidence, setEvidence] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // For speech recognition
  const recognitionRef = useRef(null)
  const transcriptRef = useRef("")

  // Store the current transcript to avoid losing it on pauses
  useEffect(() => {
    transcriptRef.current = description
  }, [description])

  // Update the speech recognition implementation
  const startRecording = () => {
    if (!isRecording) {
      // Check if browser supports speech recognition
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        toast({
          title: "Speech Recognition Not Supported",
          description: "Your browser doesn't support speech recognition. Please try using Chrome or Edge.",
          variant: "destructive",
        })
        return
      }

      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      // Configure recognition
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-IN"

      // Set up event handlers
      recognitionRef.current.onstart = () => {
        setIsRecording(true)
        toast({
          title: "Recording Started",
          description: "Speak clearly to describe your case details.",
        })
      }

      // Improved transcript handling to avoid duplicates
      let finalTranscript = transcriptRef.current
      let interimTranscript = ""

      recognitionRef.current.onresult = (event) => {
        interimTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript

          if (event.results[i].isFinal) {
            // Process final results to avoid duplicates
            const words = transcript.trim().split(/\s+/)
            const uniqueWords = []

            // Simple deduplication for consecutive identical words
            for (let j = 0; j < words.length; j++) {
              if (j === 0 || words[j].toLowerCase() !== words[j - 1].toLowerCase()) {
                uniqueWords.push(words[j])
              }
            }

            finalTranscript += " " + uniqueWords.join(" ")
            finalTranscript = finalTranscript.trim()

            // Update state with deduplicated text
            setDescription(finalTranscript)
            transcriptRef.current = finalTranscript
          } else {
            interimTranscript += transcript
          }
        }

        // Show interim results
        setDescription(finalTranscript + " " + interimTranscript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setIsRecording(false)
        setIsProcessing(false)
        toast({
          title: "Recording Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        })
      }

      recognitionRef.current.onend = () => {
        setIsRecording(false)
        setIsProcessing(false)
      }

      // Start recording
      setIsProcessing(true)
      recognitionRef.current.start()
    } else {
      stopRecording()
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      setIsProcessing(false)
      toast({
        title: "Recording Stopped",
        description: "Your speech has been converted to text.",
      })
    }
  }

  const handleReset = () => {
    setIncidentType("")
    setLocation("")
    setDate("")
    setDescription("")
    setEvidence("")
    transcriptRef.current = ""
  }

  const handlePredictIPC = async () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please provide a detailed description of the incident.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsPredicting(true)

      // Store the prediction data in sessionStorage
      const predictionData = {
        incidentType,
        location,
        date,
        description,
        evidence,
      }

      // Make sure to stringify the object
      sessionStorage.setItem("predictionData", JSON.stringify(predictionData))

      // Navigate to the results page
      router.push("/predict/result")
    } catch (error) {
      console.error("Error storing prediction data:", error)
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPredicting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">IPC Section Prediction</h1>
              <p className="text-lg text-enhanced">
                Describe your case details below and our AI will suggest the most relevant IPC sections
              </p>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Case Details</CardTitle>
                <CardDescription>Provide as much information as possible for accurate predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Label htmlFor="incident-type">Incident Type</Label>
                  <Select value={incidentType} onValueChange={setIncidentType}>
                    <SelectTrigger id="incident-type">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theft">Theft/Robbery</SelectItem>
                      <SelectItem value="assault">Assault/Battery</SelectItem>
                      <SelectItem value="fraud">Fraud/Cheating</SelectItem>
                      <SelectItem value="property">Property Dispute</SelectItem>
                      <SelectItem value="cybercrime">Cybercrime</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Label htmlFor="location">Incident Location</Label>
                  <Input
                    id="location"
                    placeholder="Where did the incident occur?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Label htmlFor="date">Incident Date</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="flex justify-between items-center">
                    <Label htmlFor="description">Detailed Description</Label>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="description"
                      placeholder="Describe what happened in detail..."
                      className="min-h-[150px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {isRecording && (
                      <div className="absolute bottom-3 right-3">
                        <span className="flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className={`rounded-full h-10 w-10 ${isRecording ? "bg-red-100 text-red-600 border-red-300" : ""}`}
                      onClick={startRecording}
                      disabled={isProcessing && !isRecording}
                    >
                      <AnimatePresence mode="wait">
                        {isProcessing && !isRecording ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : isRecording ? (
                          <motion.div
                            key="recording"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                          >
                            <MicOff className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="not-recording"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                          >
                            <Mic className="h-5 w-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Label htmlFor="evidence">Available Evidence (Optional)</Label>
                  <Select value={evidence} onValueChange={setEvidence}>
                    <SelectTrigger id="evidence">
                      <SelectValue placeholder="Select evidence type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="witness">Witness Statements</SelectItem>
                      <SelectItem value="cctv">CCTV Footage</SelectItem>
                      <SelectItem value="documents">Documents/Records</SelectItem>
                      <SelectItem value="photos">Photographs</SelectItem>
                      <SelectItem value="medical">Medical Reports</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 bg-primary/5 border-t">
                <Button variant="outline" onClick={handleReset} className="btn-outline-gradient">
                  Reset
                </Button>
                <Button onClick={handlePredictIPC} className="btn-blue-gradient" disabled={isPredicting}>
                  {isPredicting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Predict IPC Sections"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  )
}

