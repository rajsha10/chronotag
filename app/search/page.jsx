"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, FileText, Calendar, User, Tag, ArrowRight, AlertCircle } from "lucide-react"

import { AnimatedButton } from "@/components/ui/animated-button"
import { CardHover } from "@/components/ui/card-hover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    setError(null)

    if (!searchQuery.trim()) {
      setError("Please enter a Chrono Tag ID")
      return
    }

    // Validate format (simple validation for demo)
    if (!searchQuery.startsWith("CT-") || searchQuery.length !== 15) {
      setError("Invalid Chrono Tag format. Please use format: CT-XXXXXXXXXXXX")
      return
    }

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)

      // For demo purposes, show a result if the query starts with CT-1
      if (searchQuery.startsWith("CT-1")) {
        setSearchResult({
          id: searchQuery,
          title: "Novel Approach to Quantum Computing Using Entangled Photons",
          authors: "Dr. Jane Smith, Dr. Robert Chen",
          date: "2023-11-15 14:32:45 UTC",
          abstract:
            "This research presents a groundbreaking approach to quantum computing that leverages entangled photons to achieve unprecedented computational speeds. Our method demonstrates a 300% improvement in qubit stability compared to traditional approaches.",
          keywords: ["Quantum Computing", "Entangled Photons", "Qubit Stability"],
          status: "verified",
        })
      } else {
        setError("No records found for this Chrono Tag")
        setSearchResult(null)
      }
    }, 1500)
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
            <span className="bg-gradient-to-r from-dark-red to-blue-primary bg-clip-text text-transparent">Search</span>{" "}
            Chrono Tag Records
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter a 12-digit Chrono Tag ID to verify and retrieve research information from the blockchain.
          </p>
        </motion.div>

        <CardHover className="p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter Chrono Tag (e.g., CT-123456789012)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>

            {error && (
              <div className="flex items-center p-3 bg-destructive/10 text-destructive rounded-md">
                <AlertCircle size={16} className="mr-2" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-center">
              <AnimatedButton type="submit" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <span className="mr-2">Searching</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  </>
                ) : (
                  <>
                    Search <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </AnimatedButton>
            </div>
          </form>
        </CardHover>

        {searchResult && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <CardHover className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-medium">Research Information</h2>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    searchResult.status === "verified"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {searchResult.status === "verified" ? "Verified" : "Pending Verification"}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FileText size={20} className="text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Research Title</h3>
                      <p className="font-medium">{searchResult.title}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <User size={20} className="text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Authors</h3>
                      <p>{searchResult.authors}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar size={20} className="text-primary mr-3 mt-1" />
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Timestamp</h3>
                      <p>{searchResult.date}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Abstract</h3>
                  <p className="text-sm">{searchResult.abstract}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center bg-secondary rounded-full px-3 py-1 text-xs">
                        <Tag size={12} className="mr-1" />
                        {keyword}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4 flex items-start">
                  <AlertCircle size={20} className="text-primary mr-3 mt-0.5" />
                  <p className="text-sm">
                    This record was verified on the blockchain at block #7,294,103. The cryptographic hash ensures this
                    data has not been tampered with since registration.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">View Blockchain Certificate</Button>
                </div>
              </div>
            </CardHover>
          </motion.div>
        )}
      </div>
    </div>
  )
}

