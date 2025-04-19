"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, Info, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"
import { useToast } from "@/components/ui/use-toast"

// Fallback prediction results in case the API fails
const fallbackResults = [
  {
    section: "IPC 420",
    description: "Cheating and dishonestly inducing delivery of property",
    confidence: 98,
    punishment:
      "Imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.",
    relevance: "The case involves deception to obtain property, which is a key element of IPC 420.",
  },
  {
    section: "IPC 406",
    description: "Punishment for criminal breach of trust",
    confidence: 85,
    punishment:
      "Imprisonment of either description for a term which may extend to three years, or with fine, or with both.",
    relevance: "The property was entrusted to the accused who then misappropriated it, constituting a breach of trust.",
  },
  {
    section: "IPC 34",
    description: "Acts done by several persons in furtherance of common intention",
    confidence: 72,
    punishment: "Each person is liable for the act in the same manner as if it were done by him alone.",
    relevance: "Multiple individuals were involved in the execution of the offense with a shared intention.",
  },
]

export default function PredictionResultPage() {
  const [activeTab, setActiveTab] = useState("sections")
  const [predictionData, setPredictionData] = useState(null)
  const [predictionResults, setPredictionResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Retrieve the prediction data from sessionStorage
    const storedData = sessionStorage.getItem("predictionData")

    if (storedData) {
      try {
        const data = JSON.parse(storedData)
        setPredictionData(data)

        // Call the API to get predictions
        fetchPredictions(data.description)
      } catch (error) {
        console.error("Error parsing stored data:", error)
        handleFetchError("Invalid prediction data")
      }
    } else {
      // If no data is found, show an error and use fallback data
      handleFetchError("No prediction data found")
    }
  }, [])

  const fetchPredictions = async (description) => {
    try {
      setIsLoading(true)

      const response = await fetch("/api/predict-ipc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const data = await response.json()

      if (data.predictions && data.predictions.length > 0) {
        setPredictionResults(data.predictions)
      } else {
        throw new Error("No predictions returned from API")
      }
    } catch (error) {
      console.error("Error fetching predictions:", error)
      handleFetchError(`Failed to get predictions: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFetchError = (errorMessage) => {
    toast({
      title: "Prediction Notice",
      description: `${errorMessage}. Using sample predictions for demonstration.`,
      variant: "destructive",
    })

    // Use fallback data
    setPredictionResults(fallbackResults)
    setIsLoading(false)

    // If no prediction data, create a placeholder
    if (!predictionData) {
      setPredictionData({
        incidentType: "sample",
        description: "This is a sample case description for demonstration purposes.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-12 px-4 bg-accent/30">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <h2 className="text-2xl font-bold">Analyzing your case...</h2>
              <p className="text-muted-foreground mt-2">
                Our AI is processing your description to identify relevant IPC sections.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 bg-accent/30">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Link href="/predict" className="inline-flex items-center text-primary hover:underline mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Prediction Form
            </Link>
            <h1 className="text-3xl font-bold">IPC Section Prediction Results</h1>
            <p className="text-muted-foreground">
              Based on your case details, our AI has identified the following relevant IPC sections
            </p>
          </div>

          <div className="grid gap-8">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-primary/5 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Case Summary</CardTitle>
                    <CardDescription>
                      {predictionData?.incidentType && predictionData.incidentType !== "sample"
                        ? `${predictionData.incidentType.charAt(0).toUpperCase() + predictionData.incidentType.slice(1)} incident`
                        : "Case analysis based on your description"}
                    </CardDescription>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {predictionResults.length > 0
                      ? `${predictionResults[0].confidence}% Confidence`
                      : "Analysis Complete"}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-primary" />
                      Case Details
                    </h3>
                    <p className="text-muted-foreground">{predictionData?.description || "No description provided"}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                      Important Note
                    </h3>
                    <p className="text-sm bg-amber-50 border border-amber-200 p-3 rounded-md dark:bg-amber-950/30 dark:border-amber-800">
                      This prediction is based on the information provided and should be used as guidance only. We
                      recommend consulting with a legal professional for final verification.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="sections" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="sections">Predicted Sections</TabsTrigger>
                <TabsTrigger value="next-steps">Recommended Next Steps</TabsTrigger>
              </TabsList>

              <TabsContent value="sections" className="space-y-6">
                {predictionResults.map((result, index) => (
                  <Card key={index} className="border-none shadow-md overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{result.section}</CardTitle>
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {result.confidence}% Match
                        </div>
                      </div>
                      <CardDescription className="text-base font-medium">{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Punishment</h3>
                        <p className="text-muted-foreground">{result.punishment}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Relevance to Your Case</h3>
                        <p className="text-muted-foreground">{result.relevance}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="next-steps">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle>Recommended Next Steps</CardTitle>
                    <CardDescription>Based on our analysis, here are the recommended actions</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">File an FIR</h3>
                          <p className="text-muted-foreground">
                            File a First Information Report at your local police station or use our online FIR filing
                            service.
                          </p>
                          <Button className="btn-blue-gradient mt-3" asChild>
                            <Link href="/file-fir">File FIR Online</Link>
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Consult a Lawyer</h3>
                          <p className="text-muted-foreground">
                            Speak with a legal professional to understand your options and the strength of your case.
                          </p>
                          <Button variant="outline" className="mt-3 btn-outline-gradient">
                            Find Legal Counsel
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Gather Evidence</h3>
                          <p className="text-muted-foreground">
                            Collect all relevant documents, communications, and witness statements to support your case.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Explore Mediation</h3>
                          <p className="text-muted-foreground">
                            Consider mediation as an alternative to court proceedings for faster resolution.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between">
              <Button variant="outline" asChild className="btn-outline-gradient">
                <Link href="/predict">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  New Prediction
                </Link>
              </Button>
              <Button asChild className="btn-blue-gradient">
                <Link href="/file-fir">
                  <FileText className="h-4 w-4 mr-2" />
                  File FIR
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  )
}

