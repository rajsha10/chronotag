import { Mona_Sans as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

//OCID imports
import OCConnectWrapper from '../components/OCConnectWrapper';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../public/assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata = {
  title: "Chrono Tag",
  description: "Register and secure your research work on the blockchain with Chrono Tag",
  icons: {
    icon: '/icon.png', 
  },
}

const opts = {
  redirectUri: 'http://chronotag.vercel.app/redirect',
  referralCode: 'EDUCHAIN',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <OCConnectWrapper opts={opts} sandboxMode={true}>
                {/* <Navbar /> */}
                  <main className="flex-1">{children}</main>
                {/* <Footer /> */}
            </OCConnectWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'