"use client"

import { motion } from "framer-motion"
import { ArrowRight, Database, Lock, Shield, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

//OCID imports
import { useOCAuth } from "@opencampus/ocid-connect-js"
import LoginButton from "@/components/LoginButton"
import OCIDConnectingAnimation from "../components/OCIDConnectingAnimation";

import { AnimatedButton } from "@/components/ui/animated-button"
import { CardHover } from "@/components/ui/card-hover"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {

  const { authState, ocAuth } = useOCAuth();

  if (authState?.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  if (authState?.isLoading) {
    return <OCIDConnectingAnimation />;
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="flex flex-col">
      {authState?.isAuthenticated ? (
        <>
          <Navbar />
          <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
            <div className="container relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col space-y-6"
                >
                  <div className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-sm">
                    <span className="mr-1 rounded-full bg-dark-red px-1.5 py-0.5 text-xs font-medium">New</span>
                    <span className="text-muted-foreground">Introducing Chrono Tag for DeSci</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight">
                    <span className="block">Secure Your Research with</span>
                    <span className="bg-gradient-to-r from-dark-red via-dark-pink to-blue-primary bg-clip-text text-transparent">
                      Blockchain Technology
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-md">
                    Chrono Tag provides immutable, timestamped records of your intellectual property on the blockchain,
                    ensuring your research is protected and verifiable.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <AnimatedButton size="lg">
                      <Link href="/register" className="flex items-center gap-2">
                        Register Your IP <ArrowRight size={16} />
                      </Link>
                    </AnimatedButton>
                    <AnimatedButton variant="outline" size="lg">
                      <Link href="/search">Search Chrono Tags</Link>
                    </AnimatedButton>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-dark-red to-blue-primary opacity-30 blur-xl animate-pulse-glow"></div>
                  <div className="relative rounded-lg border border-border bg-card p-1 shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden rounded-md">
                      <Image
                        src="/placeholder.svg?height=600&width=800"
                        alt="Chrono Tag Platform"
                        width={800}
                        height={600}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={0}
                className="text-center max-w-2xl mx-auto mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-heading mb-4">
                  Why Choose{" "}
                  <span className="bg-gradient-to-r from-dark-red to-blue-primary bg-clip-text text-transparent">
                    Chrono Tag
                  </span>
                </h2>
                <p className="text-muted-foreground">
                  Our platform offers cutting-edge blockchain technology to secure and verify your research work with
                  timestamped, immutable records.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Lock className="h-10 w-10 text-dark-red" />,
                    title: "Immutable Records",
                    description:
                      "Once registered, your research data cannot be altered, providing permanent proof of your work.",
                  },
                  {
                    icon: <Database className="h-10 w-10 text-dark-pink" />,
                    title: "Decentralized Storage",
                    description: "Your data is stored across a distributed network, eliminating single points of failure.",
                  },
                  {
                    icon: <Shield className="h-10 w-10 text-blue-primary" />,
                    title: "Cryptographic Security",
                    description: "Advanced encryption ensures your intellectual property remains secure and tamper-proof.",
                  },
                  {
                    icon: <Zap className="h-10 w-10 text-blue-secondary" />,
                    title: "Instant Verification",
                    description: "Verify the authenticity and timestamp of any research with a simple search.",
                  },
                  {
                    icon: <Lock className="h-10 w-10 text-dark-red" />,
                    title: "Proof of Existence",
                    description:
                      "Establish undeniable proof that your research existed at a specific point in time, protecting your intellectual property rights.",
                  },
                  {
                    icon: <Zap className="h-10 w-10 text-blue-primary" />,
                    title: "Global Accessibility",
                    description:
                      "Access your research data from anywhere in the world, at any time, with proper authentication.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={index * 0.2 + 1}
                  >
                    <CardHover>
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 rounded-full bg-secondary p-3">{feature.icon}</div>
                        <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </CardHover>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={0}
                className="text-center max-w-2xl mx-auto mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-heading mb-4">
                  How{" "}
                  <span className="bg-gradient-to-r from-dark-red to-blue-primary bg-clip-text text-transparent">
                    It Works
                  </span>
                </h2>
                <p className="text-muted-foreground">
                  Securing your research with Chrono Tag is a simple, three-step process
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Register",
                    description: "Upload your research data and metadata to our secure platform.",
                  },
                  {
                    step: "02",
                    title: "Timestamp",
                    description: "Your data is cryptographically timestamped and recorded on the blockchain.",
                  },
                  {
                    step: "03",
                    title: "Verify",
                    description: "Receive a unique 12-digit Chrono Tag to verify and access your research anytime.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={index * 0.2 + 1}
                  >
                    <div className="relative">
                      <div className="absolute -top-6 -left-6 text-6xl font-bold opacity-10">{step.step}</div>
                      <CardHover className="relative z-10">
                        <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </CardHover>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-dark-red to-blue-primary opacity-90"></div>
                <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 text-center">
                  <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">Ready to Secure Your Research?</h2>
                  <p className="text-white/80 max-w-2xl mx-auto mb-8">
                    Join thousands of researchers who trust Chrono Tag to protect their intellectual property with
                    blockchain technology.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <AnimatedButton className="bg-white text-dark-red hover:bg-white/90" glowOnHover={false} size="lg">
                      <Link href="/register" className="flex items-center gap-2">
                        Register Now <ArrowRight size={16} />
                      </Link>
                    </AnimatedButton>
                    <AnimatedButton
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                      glowOnHover={false}
                      size="lg"
                    >
                      <Link href="/search">Search Existing Tags</Link>
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          <Footer />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  )
}

