import Link from "next/link"
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary/5 py-12 border-t">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Legal Track</span>
          </div>
          <p className="text-muted-foreground">Simplifying legal processes with technology and expertise.</p>
          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <Link
              href="#facebook"
              className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="#twitter"
              className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="#instagram"
              className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#linkedin"
              className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/predict" className="text-muted-foreground hover:text-primary transition-colors">
                IPC Section Prediction
              </Link>
            </li>
            <li>
              <Link href="/file-fir" className="text-muted-foreground hover:text-primary transition-colors">
                Online FIR Filing
              </Link>
            </li>
            <li>
              <Link href="/handbook" className="text-muted-foreground hover:text-primary transition-colors">
                IPC Handbook
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                Legal Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-primary">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">123 Legal Avenue, New Delhi, India - 110001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <span className="text-muted-foreground">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span className="text-muted-foreground">support@legaltrack.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Legal Track. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

