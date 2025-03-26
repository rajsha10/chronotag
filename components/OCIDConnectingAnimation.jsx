import React, { useState, useEffect } from 'react';

const OCIDConnectingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing connection...");

  // Exact colors from the image
  const colors = {
    background: "#00FFCC", // Bright cyan/turquoise from the circle
    logo: "#0033FF",       // Blue from the bars
  };

  // Simulate connection progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Update status text based on progress
        if (prevProgress >= 80) {
          setStatusText("Almost there...");
        } else if (prevProgress >= 60) {
          setStatusText("Validating credentials...");
        } else if (prevProgress >= 40) {
          setStatusText("Authenticating with OCID...");
        } else if (prevProgress >= 20) {
          setStatusText("Establishing secure connection...");
        }
        
        return prevProgress + 1;
      });
    }, 60);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Connecting to OCID</h1>
        <p className="text-xl text-gray-300">{statusText}</p>
      </div>

      {/* Logo Animation */}
      <div className="relative mb-16">
        {/* Outer pulsing circle */}
        <div 
          className="absolute -inset-8 opacity-20 rounded-full animate-pulse"
          style={{ backgroundColor: colors.background }}
        ></div>
        
        {/* Main circle with OCID logo */}
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: colors.background }}
        >
          {/* SVG Logo - matching the image exactly */}
          <div className="relative z-10 w-20 h-20 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect width="16" height="3" x="4" y="6" rx="1.5" style={{ fill: colors.logo }} />
                <rect width="16" height="3" x="4" y="10.5" rx="1.5" style={{ fill: colors.logo }} />
                <rect width="16" height="3" x="4" y="15" rx="1.5" style={{ fill: colors.logo }} />
              </g>
            </svg>
            
            {/* Rotating dots around the logo */}
            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '8s' }}>
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full opacity-70"
                  style={{
                    backgroundColor: colors.logo,
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-32px) translateX(-50%)`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{ 
            width: `${progress}%`,
            backgroundColor: colors.logo
          }}
        ></div>
      </div>

      <p className="text-gray-400 text-sm">{progress}% complete</p>

      {progress === 100 && (
        <div className="mt-8 animate-fadeIn">
          <p className="text-green-400 font-semibold mb-4">Connection successful!</p>
          <p className="text-gray-300">Redirecting you to dashboard...</p>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default OCIDConnectingAnimation;