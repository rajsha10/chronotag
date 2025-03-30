"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile.jsx"

const navItems = [
  { name: "Home", path: "/" },
  { name: "IP Register", path: "/register" },
  { name: "Search", path: "/search" },
]

const OPEN_CAMPUS_NETWORK_PARAMS = {
  chainId: process.env.NEXT_PUBLIC_OPEN_CAMPUS_CHAIN_ID,
  chainName: process.env.NEXT_PUBLIC_OPEN_CAMPUS_CHAIN_NAME,
  rpcUrls: [process.env.NEXT_PUBLIC_OPEN_CAMPUS_RPC_URL],
  nativeCurrency: {
    name: process.env.NEXT_PUBLIC_OPEN_CAMPUS_CURRENCY_NAME,
    symbol: process.env.NEXT_PUBLIC_OPEN_CAMPUS_CURRENCY_SYMBOL,
    decimals: Number(process.env.NEXT_PUBLIC_OPEN_CAMPUS_CURRENCY_DECIMALS),
  },
  blockExplorerUrls: [process.env.NEXT_PUBLIC_OPEN_CAMPUS_EXPLORER_URL],
}

export default function Navbar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [account, setAccount] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, isMobile])

  const toggleMenu = () => setIsOpen(!isOpen)

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found! Please install MetaMask.")
      return
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])

      const currentChainId = await window.ethereum.request({ method: "eth_chainId" })
      if (currentChainId !== OPEN_CAMPUS_NETWORK_PARAMS.chainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: OPEN_CAMPUS_NETWORK_PARAMS.chainId }],
          })
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [OPEN_CAMPUS_NETWORK_PARAMS],
            })
          } else {
            console.error("Error switching chain:", switchError)
          }
        }
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-blue-600 opacity-75 blur-sm"></div>
            <div className="relative rounded-lg bg-background px-3 py-1 text-xl font-heading">
              <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Chrono Tag
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-primary",
                pathname === item.path ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.name}
              {pathname === item.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </Link>
          ))}
          <Button
            variant="default"
            size="sm"
            onClick={connectWallet}
            className="ml-4 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 transition-all duration-300"
          >
            {account ? account.slice(0, 6) + "..." + account.slice(-4) : "Connect Wallet"}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="flex md:hidden items-center justify-center" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm md:hidden"
        >
          <nav className="container flex flex-col items-center justify-center gap-8 py-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === item.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="default"
              size="lg"
              onClick={connectWallet}
              className="mt-4 w-full max-w-xs bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-700 hover:to-blue-700 transition-all duration-300"
            >
              {account ? account.slice(0, 6) + "..." + account.slice(-4) : "Connect Wallet"}
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
