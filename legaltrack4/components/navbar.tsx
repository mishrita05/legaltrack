"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  return (
    <ClerkProvider>
      <header
        className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300 ${
          isScrolled ? "bg-background/95 shadow-md" : "bg-background/80"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <Scale className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                Legal Track
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NavLink href="/predict" label="IPC Prediction" />
            <NavLink href="/file-fir" label="File FIR" />
            <NavLink href="/handbook" label="IPC Handbook" />
            <NavLink href="/support" label="Support" />
            <NavLink href="/about" label="About Us" />
          </motion.nav>

          {/* Right Section - Authentication & Theme Toggle */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ThemeToggle />

            {/* Authentication Buttons */}
            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-primary/10 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-4">
                <NavLinkMobile href="/predict" label="IPC Prediction" setIsMenuOpen={setIsMenuOpen} />
                <NavLinkMobile href="/file-fir" label="File FIR" setIsMenuOpen={setIsMenuOpen} />
                <NavLinkMobile href="/handbook" label="IPC Handbook" setIsMenuOpen={setIsMenuOpen} />
                <NavLinkMobile href="/support" label="Support" setIsMenuOpen={setIsMenuOpen} />
                <NavLinkMobile href="/about" label="About Us" setIsMenuOpen={setIsMenuOpen} />
              </nav>

              {/* Authentication Buttons for Mobile */}
              <div className="flex items-center gap-4 pt-2">
                <ThemeToggle />
                <div className="flex gap-2 w-full">
                  <SignedOut>
                    <SignInButton>
                      <Button variant="outline" size="sm" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button variant="outline" size="sm" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </SignedOut>

                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </header>
    </ClerkProvider>
  )
}

// Desktop NavLink Component
function NavLink({ href, label }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`relative text-sm font-medium hover:text-primary transition-colors duration-300 py-1 ${
        isActive ? "text-primary" : ""
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          layoutId="navbar-indicator"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
    </Link>
  )
}

// Mobile NavLink Component
function NavLinkMobile({ href, label, setIsMenuOpen }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium p-2 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  )
}
