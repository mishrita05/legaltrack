"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Scale } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  // Redirect to home page if already signed in
  useEffect(() => {
    if (isLoaded && signIn.status === "complete") {
      router.push("/")
    }
  }, [isLoaded, signIn, router])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-accent/30">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <Scale className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-3xl font-bold">Legal Track</h1>
            </div>
            <p className="text-muted-foreground mt-2">Sign in to your account</p>
          </div>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>

              <Button type="button" className="w-full btn-blue-gradient">
                Sign in with Email
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <span className="relative bg-background px-2 text-sm text-muted-foreground">Or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Google</Button>
                <Button variant="outline">GitHub</Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center w-full">
                <span className="text-sm text-muted-foreground">Don't have an account? </span>
                <Link href="/sign-up" className="text-sm text-primary hover:underline">
                  Register now
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

