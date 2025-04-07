"use client"

import { useState, useEffect } from "react"

const OCIDConnectingAnimation = () => {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Initializing connection...")

  // Colors matching Chrono-Tag theme
  const colors = {
    pink: "#ff3e9d",
    purple: "#aa55ff",
    blue: "#3c6aff",
    darkBg: "#000000",
    glowPurple: "#8a2be2",
  }

  // Simulate connection progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }

        // Update status text based on progress
        if (prevProgress >= 80) {
          setStatusText("Verifying blockchain records...")
        } else if (prevProgress >= 60) {
          setStatusText("Validating digital signature...")
        } else if (prevProgress >= 40) {
          setStatusText("Authenticating with OCID...")
        } else if (prevProgress >= 20) {
          setStatusText("Establishing secure connection...")
        }

        return prevProgress + 1
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-[#8a2be2]/20 blur-[120px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3e9d] to-[#3c6aff] mb-4">
          Connecting to OCID
        </h1>
        <p className="text-xl text-gray-300">{statusText}</p>
      </div>

      {/* Logo Animation */}
      <div className="relative mb-16">
        {/* Outer pulsing circle with gradient */}
        <div
          className="absolute -inset-8 opacity-30 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.purple}40, ${colors.blue}00)`,
          }}
        ></div>

        {/* Main circle with OCID logo */}
        <div className="w-32 h-32 rounded-full flex items-center justify-center relative overflow-hidden">
          {/* Gradient background */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${colors.pink}, ${colors.blue})`,
              opacity: 0.8,
            }}
          ></div>

          {/* Rotating overlay */}
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              background: `conic-gradient(from 0deg, ${colors.pink}00, ${colors.blue}40, ${colors.pink}00)`,
              animationDuration: "8s",
            }}
          ></div>

          {/* SVG Logo */}
          <div className="relative z-10 w-20 h-20 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect width="16" height="3" x="4" y="6" rx="1.5" fill="#ffffff" />
                <rect width="16" height="3" x="4" y="10.5" rx="1.5" fill="#ffffff" />
                <rect width="16" height="3" x="4" y="15" rx="1.5" fill="#ffffff" />
              </g>
            </svg>

            {/* Rotating dots around the logo */}
            <div className="absolute inset-0 animate-spin-reverse" style={{ animationDuration: "12s" }}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? colors.pink : colors.blue,
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 45}deg) translateY(-32px) translateX(-50%)`,
                    boxShadow: `0 0 8px ${i % 2 === 0 ? colors.pink : colors.blue}`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar with gradient */}
      <div className="w-64 h-3 bg-gray-900 rounded-full overflow-hidden mb-4 border border-gray-800">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(to right, ${colors.pink}, ${colors.blue})`,
          }}
        ></div>
      </div>

      <p className="text-gray-400 text-sm">{progress}% complete</p>

      {progress === 100 && (
        <div className="mt-8 animate-fadeIn">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3e9d] to-[#3c6aff] font-semibold mb-4 text-lg">
            Connection successful!
          </p>
          <p className="text-gray-300">Redirecting to secure blockchain environment...</p>
        </div>
      )}

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
                  ? `linear-gradient(to right, ${colors.pink}, ${colors.purple})`
                  : `linear-gradient(to right, ${colors.purple}, ${colors.blue})`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
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
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default OCIDConnectingAnimation

