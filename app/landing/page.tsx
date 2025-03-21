"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe,
  Laptop,
  Menu,
  Moon,
  Sun,
  X,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

// Floating animation for decorative elements
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

// Pulse animation for accent elements
const pulseAnimation = {
  initial: { scale: 1, opacity: 0.7 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

// Decorative shape component
function DecorativeShape({
  className,
  variant = "circle",
  animate = true,
}: { className: string; variant?: "circle" | "square" | "triangle" | "blob"; animate?: boolean }) {
  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-lg rotate-45",
    triangle: "clip-path-triangle",
    blob: "blob-shape",
  }

  return (
    <motion.div
      className={`absolute ${shapeStyles[variant]} ${className}`}
      initial={animate ? "initial" : {}}
      animate={animate ? "animate" : {}}
      variants={floatingAnimation}
    />
  )
}

function CounterCard({
  value,
  label,
  suffix = "",
  icon,
}: { value: number; label: string; suffix?: string; icon?: React.ReactNode }) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.3 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")

      const duration = 2000 // 2 seconds
      const frameDuration = 1000 / 60 // 60fps
      const totalFrames = Math.round(duration / frameDuration)
      const easeOutQuad = (t: number) => t * (2 - t)

      let frame = 0
      const counter = setInterval(() => {
        frame++
        const progress = easeOutQuad(frame / totalFrames)
        setCount(Math.floor(value * progress))

        if (frame === totalFrames) {
          clearInterval(counter)
          setCount(value)
        }
      }, frameDuration)

      return () => clearInterval(counter)
    }
  }, [controls, inView, value])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
      className="flex flex-col items-center p-6 bg-gradient-to-br from-card to-card/80 rounded-xl shadow-lg border border-green-200 relative overflow-hidden group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -right-6 -top-6 w-12 h-12 bg-green-200/30 rounded-full blur-xl"></div>
      <div className="absolute -left-6 -bottom-6 w-12 h-12 bg-green-200/30 rounded-full blur-xl"></div>

      {icon && <div className="text-green-500 mb-2">{icon}</div>}
      <span className="text-3xl md:text-4xl font-bold text-green-500">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-muted-foreground mt-2 font-medium">{label}</span>
    </motion.div>
  )
}

// Animated section component
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={fadeIn} className={className}>
      {children}
    </motion.div>
  )
}

// Section divider component
function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-24 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-md flex items-center justify-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-green-300/50 to-transparent"></div>
          <div className="absolute">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center text-white"
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  // Features data
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Comprehensive Dashboard",
      description: "Get a complete overview of your freelance business with real-time metrics and analytics.",
    },
    {
      icon: <FileText className="h-10 w-10" />,
      title: "Invoice Management",
      description: "Create, send, and track professional invoices. Get paid faster with automated reminders.",
    },
    {
      icon: <Laptop className="h-10 w-10" />,
      title: "Project Tracking",
      description: "Manage all your projects in one place. Track progress, deadlines, and client communications.",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Client Portal",
      description: "Provide a professional experience for your clients with a dedicated portal for project updates.",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      quote:
        "This platform has completely transformed how I manage my freelance business. I've increased my revenue by 30% in just three months!",
      author: "Sarah Johnson",
      role: "Web Developer",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The invoice management system alone has saved me hours every week. I can't imagine running my business without it now.",
      author: "Michael Chen",
      role: "Graphic Designer",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "As my client list grew, I was struggling to keep track of everything. This platform solved that problem instantly.",
      author: "Emma Rodriguez",
      role: "Marketing Consultant",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Pricing plans
  const pricingPlans = [
    {
      name: "Starter",
      price: "$12",
      description: "Perfect for freelancers just getting started",
      features: ["5 active projects", "Basic invoicing", "Client management", "Email support"],
    },
    {
      name: "Professional",
      price: "$29",
      description: "For established freelancers with growing business",
      features: ["Unlimited projects", "Advanced invoicing", "Client portal", "Priority support", "Custom reports"],
      popular: true,
    },
    {
      name: "Agency",
      price: "$79",
      description: "For teams and agencies managing multiple clients",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "White-label options",
        "API access",
        "Dedicated account manager",
      ],
    },
  ]

  return (
    <div>
      <div className="flex min-h-screen flex-col bg-background text-foreground overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container px-6 sm:px-8 md:px-10 flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-green-300 p-1.5 rounded-lg">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Freelance Hub</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6">
              <Link href="#features" className="text-sm font-medium transition-colors hover:text-green-500">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-green-500">
                Pricing
              </Link>
              <Link href="#contact" className="text-sm font-medium transition-colors hover:text-green-500">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="outline" className="hidden md:flex rounded-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="hidden md:flex rounded-full bg-green-300 hover:bg-green-400 text-green-900 border-0">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
              >
                <div className="container flex h-16 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-300 p-1.5 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl">Freelance Hub</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeMenu} className="rounded-full">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="container bg-white grid gap-6 p-6">
                  <Link href="#features" className="text-lg font-medium" onClick={closeMenu}>
                    Features
                  </Link>
                  <Link href="#pricing" className="text-lg font-medium" onClick={closeMenu}>
                    Pricing
                  </Link>
                  <Link href="#contact" className="text-lg font-medium" onClick={closeMenu}>
                    Contact
                  </Link>
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full rounded-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button className="w-full rounded-full bg-green-300 hover:bg-green-400 text-green-900 border-0">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden py-20 md:py-32">
            {/* Decorative background elements */}
            <div className="absolute inset-0 z-0">
              <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-green-200/20 blur-3xl"></div>
              <div className="absolute top-60 -left-40 h-96 w-96 rounded-full bg-green-200/20 blur-3xl"></div>
              <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-green-200/20 blur-3xl"></div>
            </div>

            {/* Floating decorative elements */}
            <DecorativeShape className="top-20 right-[20%] w-8 h-8 bg-green-200" variant="circle" />
            <DecorativeShape className="top-40 left-[15%] w-12 h-12 bg-green-200" variant="square" />
            <DecorativeShape className="bottom-32 right-[10%] w-10 h-10 bg-green-200" variant="circle" />
            <DecorativeShape className="bottom-40 left-[25%] w-6 h-6 bg-green-200" variant="square" />

            <div className="container px-6 sm:px-8 md:px-10 flex flex-col items-center justify-center space-y-4 text-center relative z-10">
              <AnimatedSection>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 mb-6 border border-green-200">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Revolutionizing Freelance Management</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Manage Your Freelance Business <span className="text-green-500">Effortlessly</span>
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-muted-foreground md:text-xl">
                  All-in-one platform for freelancers to manage projects, track time, send invoices, and grow their
                  business.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto rounded-full bg-green-300 hover:bg-green-400 text-green-900 border-0 shadow-lg shadow-green-200/30"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto rounded-full border-green-200 hover:bg-green-50"
                    >
                      See Features
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection className="mt-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <CounterCard value={5000} label="Freelancers" icon={<Users className="h-6 w-6" />} />
                  <CounterCard value={25000} label="Projects Managed" icon={<Laptop className="h-6 w-6" />} />
                  <CounterCard value={15} label="Million Hours Saved" icon={<Clock className="h-6 w-6" />} />
                  <CounterCard value={99.9} label="% Uptime" suffix="%" icon={<Shield className="h-6 w-6" />} />
                </div>
              </AnimatedSection>

              <AnimatedSection className="mt-16 w-full">
                <div className="relative">
                  <motion.div
                    className="absolute -inset-0.5 bg-green-300 rounded-2xl blur-sm"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                  <div className="relative rounded-xl overflow-hidden border shadow-2xl">
                    <Image
                      src="/placeholder.svg?height=600&width=1200"
                      width={1200}
                      height={600}
                      alt="Dashboard Preview"
                      className="w-full object-cover"
                    />
                  </div>

                  <motion.div
                    className="absolute -top-6 -right-6 w-24 h-24 bg-green-200/40 rounded-full blur-2xl"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  ></motion.div>

                  <motion.div
                    className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200/40 rounded-full blur-2xl"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      delay: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <SectionDivider />

          {/* Features Section */}
          <section id="features" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
            <div className="container px-6 sm:px-8 md:px-10 relative z-10">
              <AnimatedSection>
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4 border border-green-200">
                    <Zap className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Powerful Features</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Everything You Need to <span className="text-green-500">Succeed</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                    Powerful tools designed specifically for freelancers and independent professionals.
                  </p>
                </div>
              </AnimatedSection>

              <motion.div
                className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                          delay: index * 0.1,
                        },
                      },
                    }}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Card className="h-full transition-all hover:shadow-lg border-green-200 bg-gradient-to-b from-card to-card/80 overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute -right-6 -top-6 w-12 h-12 bg-green-200/30 rounded-full blur-xl"></div>

                      <CardHeader>
                        <motion.div
                          className="mb-2 w-12 h-12 rounded-full bg-gradient-to-br from-green-200/30 to-green-100/20 flex items-center justify-center text-green-600"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {feature.icon}
                        </motion.div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <AnimatedSection>
                <div className="mt-24 grid gap-12 md:grid-cols-2 items-center">
                  <div className="relative z-10">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4 border border-green-200">
                      <Laptop className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Project Management</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                      Track Your Projects from <span className="text-green-500">Start to Finish</span>
                    </h3>
                    <p className="mt-4 text-muted-foreground">
                      Keep all your projects organized and on schedule. Monitor progress, manage tasks, and collaborate
                      with clients all in one place.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        "Project timelines",
                        "Task management",
                        "Client collaboration",
                        "File sharing",
                        "Progress tracking",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="mr-2 h-5 w-5 rounded-full bg-green-300 flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Link href="/dashboard" className="mt-6 inline-block">
                      <Button className="rounded-full bg-green-300 hover:bg-green-400 text-green-900 border-0 shadow-lg shadow-green-200/30 group">
                        Learn More
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-0.5 bg-green-300 rounded-2xl blur-sm"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    ></motion.div>
                    <div className="relative rounded-xl overflow-hidden border shadow-xl">
                      <Image
                        src="/placeholder.svg?height=500&width=600"
                        width={600}
                        height={500}
                        alt="Project Management"
                        className="w-full object-cover"
                      />
                    </div>

                    <motion.div
                      className="absolute -top-6 -right-6 w-24 h-24 bg-green-200/40 rounded-full blur-2xl"
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    ></motion.div>

                    <DecorativeShape className="bottom-12 -right-6 w-12 h-12 bg-green-200" variant="circle" />
                    <DecorativeShape className="-bottom-6 left-12 w-8 h-8 bg-green-200" variant="square" />
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="mt-24 grid gap-12 md:grid-cols-2 items-center">
                  <div className="order-2 md:order-1 relative">
                    <motion.div
                      className="absolute -inset-0.5 bg-green-300 rounded-2xl blur-sm"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    ></motion.div>
                    <div className="relative rounded-xl overflow-hidden border shadow-xl">
                      <Image
                        src="/placeholder.svg?height=500&width=600"
                        width={600}
                        height={500}
                        alt="Smart Invoice Creator"
                        className="w-full object-cover"
                      />
                    </div>

                    <motion.div
                      className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-200/40 rounded-full blur-2xl"
                      initial={{ opacity: 0.5 }}
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    ></motion.div>

                    <DecorativeShape className="top-12 -left-6 w-12 h-12 bg-green-200" variant="circle" />
                    <DecorativeShape className="-top-6 right-12 w-8 h-8 bg-green-200" variant="square" />
                  </div>
                  <div className="order-1 md:order-2 relative z-10">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4 border border-green-200">
                      <FileText className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Invoice Creation</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                      <span className="text-green-500">Smart Invoice Creator</span>
                    </h3>
                    <p className="mt-4 text-muted-foreground">
                      Create professional invoices in seconds with our intuitive invoice generator. Customize templates,
                      add your branding, and generate PDF invoices ready to send to clients.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        "Professional templates",
                        "Custom branding options",
                        "Line item management",
                        "Tax calculation",
                        "PDF export & email sending",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="mr-2 h-5 w-5 rounded-full bg-green-300 flex items-center justify-center">
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Link href="/dashboard" className="mt-6 inline-block">
                      <Button className="rounded-full bg-green-300 hover:bg-green-400 text-green-900 border-0 shadow-lg shadow-green-200/30 group">
                        Learn More
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <SectionDivider />

          {/* Customer Portal Section */}
          <section className="py-24 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
            <div className="container px-6 sm:px-8 md:px-10 relative z-10">
              <div className="text-center mb-16">
                <AnimatedSection>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4 border border-green-200">
                    <Globe className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Client Experience</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    <span className="text-green-500">Dedicated Client Portal</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                    Give your clients a professional experience with a dedicated portal to view project progress and
                    communicate efficiently.
                  </p>
                </AnimatedSection>
              </div>

              <div className="grid gap-12 md:grid-cols-2 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative z-10"
                >
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-card to-card/80 border border-green-200 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="mt-1 bg-gradient-to-br from-green-200/30 to-green-100/20 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Project Transparency</h3>
                        <p className="text-muted-foreground">
                          Clients can view project status, milestones, and deliverables in real-time.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-card to-card/80 border border-green-200 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="mt-1 bg-gradient-to-br from-green-200/30 to-green-100/20 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Document Sharing</h3>
                        <p className="text-muted-foreground">
                          Securely share files and documents with version control and approval workflows.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-card to-card/80 border border-green-200 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="mt-1 bg-gradient-to-br from-green-200/30 to-green-100/20 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Streamlined Communication</h3>
                        <p className="text-muted-foreground">
                          Built-in messaging keeps all project communication in one place, eliminating email chaos.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-card to-card/80 border border-green-200 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="mt-1 bg-gradient-to-br from-green-200/30 to-green-100/20 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Invoice History</h3>
                        <p className="text-muted-foreground">
                          Clients can access their complete invoice history and download past invoices.
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8">
                    <Button
                      size="lg"
                      className="rounded-full bg-green-300 hover:bg-green-400 text-green-900 border-0 shadow-lg shadow-green-200/30 group"
                    >
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative"
                >
                  <motion.div
                    className="absolute -inset-0.5 bg-green-300 rounded-2xl blur-sm"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  ></motion.div>

                  <div className="relative z-10 rounded-xl border bg-card shadow-xl overflow-hidden">
                    <div className="border-b p-4 bg-green-100/30">
                      <h3 className="font-medium">Client Portal Dashboard</h3>
                    </div>
                    <Image
                      src="/placeholder.svg?height=600&width=800"
                      width={800}
                      height={600}
                      alt="Client Portal Interface"
                      className="w-full object-cover"
                    />
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Project Status</h4>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-green-300 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Started: Jan 15, 2024</span>
                          <span>Due: Mar 30, 2024</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Recent Files</span>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View All
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                          <span className="text-xs">final-design-v2.pdf</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                          <span className="text-xs">project-timeline.xlsx</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="absolute -top-10 -left-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  ></motion.div>

                  <motion.div
                    className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      delay: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  ></motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Testimonials Section */}
          <section id="testimonials" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
            <div className="container px-6 sm:px-8 md:px-10 relative z-10">
              <AnimatedSection>
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4 border border-green-200">
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Success Stories</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Trusted by <span className="text-green-500">Freelancers Worldwide</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                    See what other freelancers are saying about our platform.
                  </p>
                </div>
              </AnimatedSection>

              <motion.div
                className="mt-16 grid gap-8 md:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.2,
                        },
                      },
                    }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Card className="h-full border-green-200 bg-gradient-to-br from-card to-card/80 relative overflow-hidden">
                      <div className="absolute -right-6 -top-6 w-12 h-12 bg-green-200/30 rounded-full blur-xl"></div>
                      <CardContent className="pt-6">
                        <div className="mb-4 text-green-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-green-500">
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="mb-6 italic">{testimonial.quote}</p>
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="absolute -inset-0.5 bg-green-300 rounded-full blur-[1px]"></div>
                            <Image
                              src={testimonial.avatar || "/placeholder.svg"}
                              width={60}
                              height={60}
                              alt={testimonial.author}
                              className="rounded-full relative"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <SectionDivider />

          {/* Pricing Section */}
          <section id="pricing" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background"></div>
            <div className="container px-6 sm:px-8 md:px-10 relative z-10">
              <AnimatedSection>
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 mb-4 border border-green-200">
                    <Zap className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Pricing Plans</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Simple, <span className="text-green-500">Transparent Pricing</span>
                  </h2>
                  <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                    Choose the plan that works best for your freelance business.
                  </p>
                </div>
              </AnimatedSection>

              <motion.div
                className="mt-16 grid gap-8 md:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {pricingPlans.map((plan, index) => (
                  <motion.div key={index} variants={fadeIn}>
                    <Card
                      className={`h-full border-green-200 bg-gradient-to-br from-card to-card/80 relative ${plan.popular ? "border-green-400 shadow-lg" : ""}`}
                    >
                      <div className="absolute -right-6 -top-6 w-12 h-12 bg-green-200/30 rounded-full blur-xl"></div>

                      {plan.popular && (
                        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-green-300 px-3 py-1 text-xs font-medium text-green-900">
                          Most Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-bold text-green-500">{plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <div className="mr-2 h-5 w-5 rounded-full bg-green-300 flex items-center justify-center">
                                <CheckCircle2 className="h-3 w-3 text-white" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className={`w-full rounded-full ${plan.popular ? "bg-green-300 hover:bg-green-400 text-green-900 border-0 shadow-lg shadow-green-200/30" : "bg-green-100 hover:bg-green-200 text-green-700 border-green-200"}`}
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <AnimatedSection>
                <div className="mt-16 rounded-lg border border-green-200 bg-gradient-to-br from-card to-card/80 p-8 text-center relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-12 h-12 bg-green-200/30 rounded-full blur-xl"></div>
                  <div className="absolute -left-6 -bottom-6 w-12 h-12 bg-green-200/30 rounded-full blur-xl"></div>

                  <h3 className="text-xl font-bold">Need a custom plan?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Contact us for a custom solution tailored to your specific needs.
                  </p>
                  <Button className="mt-6 rounded-full bg-green-300 hover:bg-green-400 text-green-900 border-0 shadow-lg shadow-green-200/30">
                    Contact Sales
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <SectionDivider />

          {/* CTA Section */}
          <section className="py-24 overflow-hidden">
            <div className="container px-6 sm:px-8 md:px-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl bg-green-300 p-8 md:p-12 lg:p-16 text-center text-green-900 relative overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 0.1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white blur-2xl"
                />
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 0.1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white blur-2xl"
                />

                <DecorativeShape className="top-12 right-12 w-8 h-8 bg-white/20" variant="circle" />
                <DecorativeShape className="bottom-24 left-24 w-12 h-12 bg-white/20" variant="square" />
                <DecorativeShape className="top-32 left-[20%] w-6 h-6 bg-white/20" variant="circle" />
                <DecorativeShape className="bottom-12 right-[30%] w-10 h-10 bg-white/20" variant="square" />

                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative z-10">
                  Ready to Transform Your Freelance Business?
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] md:text-xl relative z-10">
                  Join thousands of freelancers who are growing their business with our platform.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center relative z-10">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="rounded-full bg-white text-green-700 hover:bg-white/90 border-0"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer id="contact" className="border-t border-green-200 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-6 sm:px-8 md:px-10 py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-300 p-1.5 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl">Freelance Hub</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  The all-in-one platform for freelancers to manage their business and grow their client base.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Product</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Company</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Legal</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-green-500 transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-green-200 pt-6 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Freelance Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

