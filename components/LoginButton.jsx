import React from 'react';
import { useOCAuth } from "@opencampus/ocid-connect-js"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-[#0A2342] to-[#134611] flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          {/* Logo Placeholder */}
          <div className="w-24 h-24 bg-white/20 rounded-full mb-4 flex items-center justify-center">
            <img src='/ocid.png' className="text-white text-2xl font-bold"></img>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">OpenCampus ID</h1>
          <p className="text-white/70 text-center">Make your OCID Proof</p>
        </div>
        
        <div className="space-y-6">
          <Button 
            onClick={handleLogin} 
            className="w-full bg-[#2437ae] hover:bg-[#388eda] text-white font-semibold py-3 transition-colors duration-300"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Continue with OpenCampus
          </Button>
        </div>
      </div>
    </div>
  )
}