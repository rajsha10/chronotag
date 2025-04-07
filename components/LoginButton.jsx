"use client"

import { useOCAuth } from "@opencampus/ocid-connect-js"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Image from "next/image"

export default function LoginButton() {
  const { ocAuth } = useOCAuth()

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" })
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Purple/blue glow effect in background */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-[#8a2be2]/20 blur-[120px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="relative z-10 max-w-md w-full rounded-[22px] border border-[#ffffff10] bg-black/60 backdrop-blur-md p-8 overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-[22px] z-[-1] overflow-hidden">
          <div className="absolute inset-[-2px] bg-gradient-to-r from-[#ff3e9d] via-[#aa55ff] to-[#3c6aff] opacity-50 blur-[2px]" />
        </div>

        <div className="flex flex-col items-center mb-8">
          {/* Logo Container with glow effect */}
          <div className="w-24 h-24 bg-black/60 rounded-full mb-4 flex items-center justify-center p-2 border border-[#ffffff20] relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff3e9d]/30 to-[#3c6aff]/30 blur-md" />
            <Image
              src="/ocid.png"
              alt="OpenCampus ID Logo"
              width={80}
              height={80}
              className="object-contain relative z-10"
            />
          </div>

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3e9d] to-[#3c6aff] mb-2">
            OpenCampus ID
          </h1>
          <p className="text-neutral-400 text-center">Secure authentication for your digital identity</p>
        </div>

        <div className="space-y-6">
          <Button
            onClick={handleLogin}
            className="w-full h-12 relative group overflow-hidden"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff3e9d] to-[#3c6aff] opacity-100 group-hover:opacity-90 transition-opacity" />
            <span className="relative flex items-center justify-center w-full h-full text-white font-semibold">
              <span className="flex-1 text-center">Connect with OpenCampus</span>
              <span className="bg-black/20 rounded-full p-1.5 ml-2">
                <LogIn className="h-4 w-4" />
              </span>
            </span>
          </Button>

          <div className="pt-4 text-center">
            <p className="text-zinc-500 text-sm">Immutable, timestamped, secured authentication</p>
          </div>
        </div>
      </div>

      {/* Small floating particles for tech effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background:
                i % 2 === 0
                  ? "linear-gradient(to right, #ff3e9d, #aa55ff)"
                  : "linear-gradient(to right, #aa55ff, #3c6aff)",
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Add global styles for the floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

