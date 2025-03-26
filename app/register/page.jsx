"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, FileText, Upload, Check, AlertCircle } from "lucide-react"
import Link from "next/link"

import { AnimatedButton } from "@/components/ui/animated-button"
import { CardHover } from "@/components/ui/card-hover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    abstract: "",
    keywords: "",
    file: null,
  })

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 2000)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="pt-24 pb-16">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-heading mb-4">
                <span className="bg-gradient-to-r from-dark-red to-blue-primary bg-clip-text text-transparent">
                  Register
                </span>{" "}
                Your Intellectual Property
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Secure your research with blockchain technology. Fill out the form below to register your intellectual
                property and receive a unique Chrono Tag.
              </p>
            </motion.div>

            <div className="mb-8">
              <div className="flex justify-between">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        step >= i
                          ? "bg-gradient-to-r from-dark-red to-blue-primary text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {step > i ? <Check size={18} /> : i}
                    </div>
                    <span className={`text-sm ${step >= i ? "text-primary" : "text-muted-foreground"}`}>
                      {i === 1 ? "Research Details" : i === 2 ? "Upload Files" : "Confirmation"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-secondary rounded-full"></div>
                <div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-dark-red to-blue-primary rounded-full transition-all duration-500"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            <CardHover className="p-8">
              {step === 1 && (
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <h2 className="text-xl font-medium mb-6">Research Details</h2>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Research Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter the title of your research"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authors">Authors</Label>
                      <Input
                        id="authors"
                        name="authors"
                        placeholder="Enter author names (separated by commas)"
                        value={formData.authors}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="abstract">Abstract</Label>
                      <Textarea
                        id="abstract"
                        name="abstract"
                        placeholder="Enter a brief abstract of your research"
                        rows={5}
                        value={formData.abstract}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        name="keywords"
                        placeholder="Enter keywords (separated by commas)"
                        value={formData.keywords}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <AnimatedButton onClick={nextStep}>
                        Next Step <ArrowRight size={16} className="ml-2" />
                      </AnimatedButton>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <h2 className="text-xl font-medium mb-6">Upload Files</h2>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center">
                        <Upload size={48} className="text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Drag and drop your files here</h3>
                        <p className="text-muted-foreground mb-4">or click to browse (PDF, DOCX, ZIP up to 50MB)</p>
                        <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                        <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                          Browse Files
                        </Button>
                      </div>
                    </div>

                    {formData.file && (
                      <div className="flex items-center p-3 bg-secondary rounded-lg">
                        <FileText size={24} className="text-primary mr-3" />
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">{formData.file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setFormData({ ...formData, file: null })}>
                          Remove
                        </Button>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <AnimatedButton onClick={nextStep}>
                        Next Step <ArrowRight size={16} className="ml-2" />
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && !isSuccess && (
                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                  <h2 className="text-xl font-medium mb-6">Confirm Registration</h2>
                  <div className="space-y-6">
                    <div className="bg-secondary rounded-lg p-6 space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Research Title</h3>
                        <p>{formData.title || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Authors</h3>
                        <p>{formData.authors || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Abstract</h3>
                        <p className="line-clamp-3">{formData.abstract || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Keywords</h3>
                        <p>{formData.keywords || "Not provided"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Files</h3>
                        <p>{formData.file ? formData.file.name : "No file uploaded"}</p>
                      </div>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4 flex items-start">
                      <AlertCircle size={20} className="text-primary mr-3 mt-0.5" />
                      <p className="text-sm">
                        By registering your research, you confirm that you are the rightful owner of this intellectual
                        property and agree to our{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <AnimatedButton onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Processing</span>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          </>
                        ) : (
                          <>Register on Blockchain</>
                        )}
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.div>
              )}

              {isSuccess && (
                <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <Check size={32} />
                  </div>
                  <h2 className="text-2xl font-medium mb-4">Registration Successful!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your research has been successfully registered on the blockchain.
                  </p>
                  <div className="bg-secondary rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-medium mb-2">Your Chrono Tag</h3>
                    <div className="flex items-center justify-center">
                      <div className="bg-background px-4 py-2 rounded-md font-mono text-xl tracking-wider">
                        CT-{Math.floor(100000000000 + Math.random() * 900000000000)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Save this tag for future reference and verification.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <AnimatedButton>
                      <Link href="/search">Verify Your Tag</Link>
                    </AnimatedButton>
                    <Button variant="outline">
                      <Link href="/">Return to Home</Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardHover>
          </div>
    </div>
  )
}

